<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Obat;

class ObatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obat::truncate();
        // Buat 50 data dummy
        Obat::factory()->count(50)->create();
    }
}
