<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = ['name', 'user_id', 'brand_id', 'type_id', 'city_id', 'desc', 'total_seat', 'gear_system', 'fuel_type', 'engine_hp', 'color', 'car_number', 'rental_price'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }
    
    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
