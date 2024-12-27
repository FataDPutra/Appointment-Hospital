<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Poli>
 */
class PoliFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'nama_poli' => $this->faker->unique()->randomElement([
                'Poli Umum',
                'Poli Gigi',
                'Poli Anak',
                'Poli Kebidanan',
                'Poli Penyakit Dalam',
                'Poli THT',
                'Poli Kulit dan Kelamin',
                'Poli Mata',
                'Poli Bedah',
                'Poli Jantung'
            ]),
            'keterangan' => $this->faker->sentence(8), // Deskripsi acak
        ];
    }
}
