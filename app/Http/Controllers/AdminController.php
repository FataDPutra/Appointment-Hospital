<?php

namespace App\Http\Controllers;

use App\Models\Poli;
use App\Models\Obat;
use App\Models\Pasien;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        // Fetch counts of Poli, Obat, and Pasien
        $totalPoli = Poli::count();
        $totalObat = Obat::count();
        $totalPasien = Pasien::count();

        // Pass the data to the Inertia page
        return inertia('Admin/Dashboard', [
            'totalPoli' => $totalPoli,
            'totalObat' => $totalObat,
            'totalPasien' => $totalPasien,
        ]);
    }
}
