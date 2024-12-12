<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Dokter;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
public function run()
{
    // Membuat user dengan role admin
    Dokter::create([
        // 'name' => 'Administrator',
        'email' => 'admin@email.com',
        'password' => Hash::make('password'), // ganti dengan password yang lebih aman
        'nama' => 'Admin',
        'alamat' => 'Admin',
        'no_hp' => '9999',
        'role' => 'admin',
        // 'role' => 'admin', // role admin
    ]);

    // Membuat Dokter dengan role dokter
    Dokter::create([
        // 'name' => 'Dokter',
        // 'email' => 'dokter@example.com',
        // 'password' => Hash::make('password'), // ganti dengan password yang lebih aman
        // 'role' => 'dokter', // role dokter

       'email' => 'dokter@email.com',
        'password' => Hash::make('password'), // ganti dengan password yang lebih aman
        'nama' => 'Dokter',
        'alamat' => 'Dokter',
        'no_hp' => '123',
    ]);
}
}
