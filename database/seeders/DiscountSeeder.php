<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiscountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Discount::insert([
            [
                'code' => 'SUMMER21',
                'desc' => '15% off for summer rentals',
                'discount_type' => 'percentage',
                'discount_value' => 15.00,
                'min_transaction' => 100.00,
                'start_date' => '2025-09-01 00:00:00',
                'end_date' => '2025-10-01 23:59:59',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'WELCOME10',
                'desc' => '10% off for first-time customers',
                'discount_type' => 'percentage',
                'discount_value' => 10.00,
                'min_transaction' => 50.00,
                'start_date' => '2025-09-01 00:00:00',
                'end_date' => '2025-10-01 23:59:59',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'VIP20',
                'desc' => '20% off for VIP members',
                'discount_type' => 'percentage',
                'discount_value' => 20.00,
                'min_transaction' => 200.00,
                'start_date' => '2025-09-01 00:00:00',
                'end_date' => '2025-10-01 23:59:59',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
