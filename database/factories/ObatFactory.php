<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Obat>
 */
class ObatFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
        'nama_obat' => $this->faker->randomElement([
    'Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Cetirizine', 'Metformin',
    'Ranitidine', 'Ciprofloxacin', 'Omeprazole', 'Azithromycin', 'Salbutamol',
    'Diclofenac', 'Dexamethasone', 'Amlodipine', 'Simvastatin', 'Furosemide',
    'Clopidogrel', 'Loratadine', 'Mefenamic Acid', 'Ketoprofen', 'Gabapentin',
    'Alprazolam', 'Diazepam', 'Tramadol', 'Prednisone', 'Losartan',
    'Spironolactone', 'Tamsulosin', 'Levothyroxine', 'Metronidazole', 'Domperidone',
    'Pantoprazole', 'Lansoprazole', 'Atorvastatin', 'Captopril', 'Glibenclamide',
    'Sulfasalazine', 'Hydrocortisone', 'Fenofibrate', 'Lisinopril', 'Propranolol',
    'Carbamazepine', 'Pregabalin', 'Terbutaline', 'Warfarin', 'Allopurinol',
    'Isosorbide Dinitrate', 'Nitroglycerin', 'Clindamycin', 'Ceftriaxone', 'Erythromycin'
            ]),
            'kemasan' => $this->faker->randomElement([
                'Tablet 500mg', 
                'Kapsul 250mg', 
                'Syrup 100ml', 
                'Suspensi 60ml', 
                'Injeksi 10mg/ml'
            ]),
            'harga' => $this->faker->numberBetween(5000, 100000), // Harga acak dalam rentang Rp 2.000 - Rp 100.000
        ];
    }
}
