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
            ['name' => 'New York'],
            ['name' => 'Los Angeles'],
            ['name' => 'Chicago'],
            ['name' => 'Houston'],
            ['name' => 'Phoenix'],
            ['name' => 'Philadelphia'],
            ['name' => 'San Antonio'],
            ['name' => 'San Diego'],
            ['name' => 'Dallas'],
            ['name' => 'San Jose'],
        ]);
    }
}
