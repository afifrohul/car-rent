<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Afif Rohul',
            'email' => 'afif@example.com',
        ]);

        $user->assignRole('admin');
        // User::factory(100)->create();
    }
}
