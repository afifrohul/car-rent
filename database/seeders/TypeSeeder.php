<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Type::insert([
            [
                'name' => 'Sedan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'SUV',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hatchback',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Convertible',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Coupe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Minivan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pickup Truck',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
