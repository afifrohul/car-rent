<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\City::insert([
            [
                'name' => 'New York',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Los Angeles',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Chicago',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Houston',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Phoenix',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Philadelphia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'San Antonio',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'San Diego',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dallas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'San Jose',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
