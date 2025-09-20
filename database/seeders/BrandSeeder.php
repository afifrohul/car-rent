<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Brand::insert([
            [
                'name' => 'Toyota',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [   'name' => 'Honda',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ford',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Chevrolet',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'BMW',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mercedes-Benz',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Audi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Volkswagen',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Nissan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hyundai',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
