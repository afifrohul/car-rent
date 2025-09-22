<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Car;
use App\Models\Discount;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Services\MidtransService;
use Midtrans\Notification;
use Midtrans\Config;

class TransactionController extends Controller
{
    // 🔹 Preview untuk hitung total + diskon
    public function preview(Request $request)
    {
        $validated = $request->validate([
            'car_id'      => 'required|exists:cars,id',
            'start_time'  => 'required|date',
            'end_time'    => 'required|date|after:start_time',
            'discount_code' => 'nullable|string',
        ]);

        $car = Car::findOrFail($validated['car_id']);

        // hitung total jam
        $start = Carbon::parse($validated['start_time']);
        $end   = Carbon::parse($validated['end_time']);
        $totalHours = $start->diffInHours($end);

        $subtotal = $totalHours * $car->rental_price;

        $discountAmount = 0;
        $discountId = null;
        $discountCode = null;

        if (!empty($validated['discount_code'])) {
            $discount = Discount::where('code', $validated['discount_code'])
                ->where('is_active', true)
                ->where('start_date', '<=', now())
                ->where('end_date', '>=', now())
                ->first();

            if ($discount && $subtotal >= $discount->min_transaction) {
                $discountAmount = ($discount->discount_value / 100) * $subtotal;
                $discountId = $discount->id;
                $discountCode = $discount->code;
            }
        }

        $totalPrice = $subtotal - $discountAmount;

        return response()->json([
            'car'               => $car->only(['id', 'name', 'brand', 'type', 'rental_price']),
            'total_hours'       => $totalHours,
            'subtotal'          => $subtotal,
            'discount_value'    => $discountAmount,
            'discount_code'     => $discountCode,
            'total_price'       => $totalPrice,
        ]);
    }

    // 🔹 Create transaksi (fix booking)
    public function store(Request $request, MidtransService $midtrans)
    {
        $validated = $request->validate([
            'car_id'       => 'required|exists:cars,id',
            'start_time'   => 'required|date',
            'end_time'     => 'required|date|after:start_time',
            'discount_code'=> 'nullable|string',
        ]);

        $car = Car::findOrFail($validated['car_id']);
        $start = Carbon::parse($validated['start_time']);
        $end   = Carbon::parse($validated['end_time']);
        $totalHours = $start->diffInHours($end);

        $subtotal = $totalHours * $car->rental_price;

        $discountAmount = 0;
        $discountId = null;
        $discountCode = null;

        if (!empty($validated['discount_code'])) {
            $discount = Discount::where('code', $validated['discount_code'])
                ->where('is_active', true)
                ->where('start_date', '<=', now())
                ->where('end_date', '>=', now())
                ->first();

            if ($discount && $subtotal >= $discount->min_transaction) {
                $discountAmount = ($discount->discount_value / 100) * $subtotal;
                $discountId = $discount->id;
                $discountCode = $discount->code;
            }
        }

        $totalPrice = $subtotal - $discountAmount;

        // ✅ Buat transaksi di database
        $transaction = Transaction::create([
            'user_id' => Auth::id(),
            'car_id'  => $car->id,

            'car_name'  => $car->name,
            'car_brand' => $car->brand->name ?? null,
            'car_type'  => $car->type->name ?? null,
            'price_per_hour' => $car->rental_price,

            'start_time'   => $start,
            'end_time'     => $end,
            'total_hours'  => $totalHours,
            'subtotal'     => $subtotal,

            'discount_id'       => $discountId,
            'discount_code'     => $discountCode,
            'discount_value'    => $discountAmount,

            'total_price'    => $totalPrice,
            'status'         => 'pending',
            'payment_status' => 'waiting',
        ]);

        // ✅ Buat transaksi ke Midtrans
        $snapTransaction = $midtrans->createTransaction($transaction);

        // ✅ Update transaksi dengan data dari Midtrans
        $transaction->update([
            'midtrans_order_id'   => $snapTransaction->order_id,
            'midtrans_snap_token' => $snapTransaction->token ?? null
        ]);

        return response()->json([
            'message'     => 'Transaction created successfully',
            'transaction'=> $transaction,
            'midtrans'   => $snapTransaction,
        ], 201);
    }


    // 🔹 List transaksi user
    public function index()
    {
        $transactions = Transaction::where('user_id', Auth::id())->latest()->get();
        return response()->json($transactions);
    }

    // 🔹 Detail transaksi
    public function show($id)
    {
        $transaction = Transaction::where('user_id', Auth::id())->findOrFail($id);
        return response()->json($transaction);
    }

    public function callback(Request $request)
    {

        Config::$serverKey    = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production', false);

        $notif = new Notification();

        $orderId            = $notif->order_id;
        $transactionStatus  = $notif->transaction_status;
        $fraudStatus        = $notif->fraud_status;

        // Karena order_id kita pakai format: {transaction_id}-{timestamp}
        $transactionId = explode('-', $orderId)[0];

        $transaction = Transaction::find($transactionId);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        // ✅ Simpan informasi tambahan dari Midtrans
        $transaction->midtrans_order_id       = $orderId;
        $transaction->midtrans_transaction_id = $notif->transaction_id ?? null;
        $transaction->payment_method          = $notif->issuer ?? null;
        $transaction->payment_type            = $notif->payment_type ?? null;
        $transaction->midtrans_payload        = $request->all();

        // ✅ Update status sesuai notifikasi Midtrans
        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'accept') {
                $transaction->payment_status = 'success';
                $transaction->status = 'confirmed';
            }
        } elseif ($transactionStatus == 'settlement') {
            $transaction->payment_status = 'success';
            $transaction->status = 'confirmed';
        } elseif ($transactionStatus == 'pending') {
            $transaction->payment_status = 'waiting';
            $transaction->status = 'pending';
        } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'])) {
            $transaction->payment_status = 'failed';
            $transaction->status = 'cancelled';
        }

        $transaction->save();

        return response()->json(['message' => 'Callback processed']);
    }

}
