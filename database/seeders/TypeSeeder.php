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
            ['name' => 'Sedan'],
            ['name' => 'SUV'],
            ['name' => 'Hatchback'],
            ['name' => 'Convertible'],
            ['name' => 'Coupe'],
            ['name' => 'Wagon'],
            ['name' => 'Van'],
            ['name' => 'Pickup Truck'],
            ['name' => 'Crossover'],
            ['name' => 'Electric'],
        ]);
    }
}
