<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::updateOrCreate(
            ['email' => 'admin@ejemplo.com'],
            [
                'name' => 'Admin',
                'last_name' => 'Ejemplo',
                'password' => bcrypt('12345678'),
            ]
        );

        $user->assignRole('Admin');
    }
}
