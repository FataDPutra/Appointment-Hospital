<?php

namespace App\Http\Controllers;

use App\Models\DaftarPoli;
use App\Models\JadwalPeriksa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DaftarPoliController extends Controller
{
public function index()
{
    $pasien = session('pasien');
    if (!$pasien) {
        return redirect()->route('pasien.login');
    }

    $daftarPoli = DaftarPoli::with([
        'jadwal.dokter.poli',
        'periksa', // Menampilkan data pemeriksaan terkait
        'periksa.detailPeriksa.obat' // Menampilkan detail obat yang diberikan
    ])
        ->where('id_pasien', $pasien['id'])
        ->withTrashed() // Mengambil data, termasuk yang sudah di-soft delete
        ->get();

    return Inertia::render('DaftarPoli/Index', [
        'daftarPoli' => $daftarPoli,
    ]);
}

    public function create()
    {
        // Ambil semua jadwal periksa yang tersedia untuk form pendaftaran
        $jadwal = JadwalPeriksa::with(['dokter.poli'])->get();

        return Inertia::render('DaftarPoli/Create', [
            'jadwal' => $jadwal,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'id_jadwal' => 'required|exists:jadwal_periksa,id',
            'keluhan' => 'nullable|string|max:255',
        ]);

        $pasien = session('pasien');
        if (!$pasien) {
            return redirect()->route('pasien.login');
        }

        // Generate nomor antrian
        $noAntrian = DaftarPoli::where('id_jadwal', $request->id_jadwal)->count() + 1;

        DaftarPoli::create([
            'id_pasien' => $pasien['id'],
            'id_jadwal' => $request->id_jadwal,
            'keluhan' => $request->keluhan,
            'no_antrian' => $noAntrian,
        ]);

        return redirect()->route('daftar-poli.index')->with('success', 'Pendaftaran berhasil!');
    }

public function riwayat($id)
{
    $pasien = session('pasien');
    if (!$pasien) {
        return redirect()->route('pasien.login');
    }

    // Ambil data pendaftaran poli dengan relasi periksa dan detailPeriksa dengan obat
    $riwayat = DaftarPoli::with([
        'jadwal.dokter.poli',
        'periksa' => function ($query) {
            $query->with(['detailPeriksa.obat']); // Eager load detailPeriksa dan obat
        }
    ])
    ->where('id', $id)
    ->where('id_pasien', $pasien['id'])
    ->withTrashed() // Menampilkan data yang di-soft delete
    ->firstOrFail();  // Gunakan firstOrFail untuk memastikan ada data yang ditemukan

    // Debugging: pastikan data periksa dan detailPeriksa terload
    // dd($riwayat->periksa->detailPeriksa); // Uncomment untuk cek data

    return Inertia::render('DaftarPoli/Riwayat', [
        'riwayat' => $riwayat,
    ]);
}



}
