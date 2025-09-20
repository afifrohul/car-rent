<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'car_id',
        'car_name',
        'car_brand',
        'car_type',
        'price_per_hour',
        'start_time',
        'end_time',
        'total_hours',
        'subtotal',
        'discount_id',
        'discount_code',
        'discount',
        'total_price',
        'status',
        'payment_method',
        'payment_status',
        'midtrans_order_id',
        'midtrans_transaction_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }
}
