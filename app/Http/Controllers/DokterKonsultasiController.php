<?php

namespace App\Http\Controllers;

use App\Models\Konsultasi;
use Illuminate\Http\Request;

class DokterKonsultasiController extends Controller
{
    public function index()
    {
        // Mengambil semua konsultasi yang terkait dengan dokter yang sedang login
        $konsultasis = Konsultasi::where('id_dokter', auth()->user()->id)
            ->with('pasien', 'dokter') // Mengambil relasi pasien dan dokter
            ->paginate(10); // Menggunakan pagination

        return inertia('Dokter/Konsultasi/Index', [
            'konsultasi' => $konsultasis
        ]);
    }

    // Tambahkan aksi lainnya sesuai kebutuhan, seperti edit dan delete
}
