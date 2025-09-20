<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Car;
use App\Models\Discount;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

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
            'car'          => $car->only(['id', 'name', 'brand', 'type', 'rental_price']),
            'total_hours'  => $totalHours,
            'subtotal'     => $subtotal,
            'discount'     => $discountAmount,
            'discount_code'=> $discountCode,
            'total_price'  => $totalPrice,
        ]);
    }

    // 🔹 Create transaksi (fix booking)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id'      => 'required|exists:cars,id',
            'start_time'  => 'required|date',
            'end_time'    => 'required|date|after:start_time',
            'discount_code' => 'nullable|string',
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

        $transaction = Transaction::create([
            'user_id' => Auth::id(),
            'car_id'  => $car->id,

            'car_name'  => $car->name,
            'car_brand' => $car->brand->name,
            'car_type'  => $car->type->name,
            'price_per_hour' => $car->rental_price,

            'start_time'   => $start,
            'end_time'     => $end,
            'total_hours'  => $totalHours,
            'subtotal'     => $subtotal,

            'discount_id'   => $discountId,
            'discount_code' => $discountCode,
            'discount'      => $discountAmount,

            'total_price' => $totalPrice,
            'status'      => 'pending',
            'payment_status' => 'waiting',
        ]);

        return response()->json([
            'message' => 'Transaction created successfully',
            'transaction' => $transaction
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
}
