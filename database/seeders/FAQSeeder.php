<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FAQSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\FAQ::insert([
            [
                'question' => 'What is the minimum age to rent a car?',
                'answer' => 'The minimum age to rent a car is 21 years old. Drivers under 25 may be subject to a young driver surcharge.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question' => 'Do I need insurance to rent a car?',
                'answer' => 'Yes, you must have valid insurance to rent a car. You can either use your own insurance or purchase coverage through us at the time of rental.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question' => 'Can I add an additional driver to my rental?',
                'answer' => 'Yes, you can add an additional driver for an extra fee. Both drivers must meet the rental requirements and present valid driver\'s licenses.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question' => 'What is your fuel policy?',
                'answer' => 'Our fuel policy is full-to-full. You will receive the car with a full tank of gas and are expected to return it with a full tank.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question' => 'What should I do in case of an accident?',
                'answer' => 'In case of an accident, ensure everyone is safe, contact emergency services if needed, and report the incident to us as soon as possible.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
