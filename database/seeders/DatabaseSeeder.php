<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Invitado',
            'email' => 'invitado@example.com',
            'password'=> '$2y$10$5dVBGMMge2BJ6OKfR8I5neO1QyMDR55yIAgaNZm2.S8GUKvGpKi8.'
        ]);
    }
}
