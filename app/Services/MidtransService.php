<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;

class MidtransService
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production', false);
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function createTransaction($transaction)
    {
        // ✅ Generate order_id konsisten: {transaction_id}-{timestamp}
        $orderId = $transaction->id . '-' . time();

        // Item mobil
        $items = [
            [
                'id'       => $transaction->car_id,
                'price'    => (int) $transaction->price_per_hour,
                'quantity' => $transaction->total_hours,
                'name'     => $transaction->car_name,
            ],
        ];

        // Item diskon (jika ada)
        if ($transaction->discount > 0) {
            $items[] = [
                'id'       => 'DISCOUNT',
                'price'    => -(int) $transaction->discount,
                'quantity' => 1,
                'name'     => 'Discount ' . ($transaction->discount_code ?? ''),
            ];
        }

        $params = [
            'transaction_details' => [
                'order_id'      => $orderId,
                'gross_amount'  => (int) $transaction->total_price,
            ],
            'customer_details' => [
                'first_name' => $transaction->user->name,
                'email'      => $transaction->user->email,
            ],
            'item_details' => $items,
        ];

        // ✅ Call Midtrans Snap
        $snapResponse = Snap::createTransaction($params);

        // ✅ Gabungkan supaya ada order_id + snap info
        return (object) [
            'order_id'     => $orderId,
            'token'        => $snapResponse->token ?? null,
            'redirect_url' => $snapResponse->redirect_url ?? null,
        ];
    }
}
