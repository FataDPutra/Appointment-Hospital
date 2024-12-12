<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\DaftarPoli;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RiwayatPasienController extends Controller
{
    public function index()
    {
        // Ambil dokter yang sedang login
        $dokter = auth()->user();  // Mengambil data dokter yang sedang login

        // Ambil daftar pasien yang sudah pernah diperiksa oleh dokter ini
        $pasiens = DaftarPoli::with('pasien')
            ->whereHas('jadwal.dokter', function ($query) use ($dokter) {
                $query->where('id', $dokter->id);
            })
            ->withTrashed()  // Memastikan pasien yang di-soft delete juga ikut ditampilkan
            ->distinct('id_pasien')  // Pastikan pasien hanya muncul sekali
            ->get()
            ->map(function ($daftarPoli) {
                return [
                    'id' => $daftarPoli->pasien->id,
                    'nama' => $daftarPoli->pasien->nama,
                    'no_ktp' => $daftarPoli->pasien->no_ktp,
                    'no_hp' => $daftarPoli->pasien->no_hp,
                ];
            });

        return Inertia::render('RiwayatPasien/Index', [
            'pasiens' => $pasiens,
        ]);
    }
public function show($id)
{
    // Ambil data dokter yang sedang login
    $dokter = auth()->user();

    // Mengambil riwayat pemeriksaan pasien yang diperiksa oleh dokter yang login
    $riwayat = DaftarPoli::with([
        'periksa',  // Mengambil data pemeriksaan
        'periksa.detailPeriksa.obat',  // Mengambil detail periksa dan obat yang diberikan
        'jadwal.dokter',  // Mengambil data dokter dari jadwal periksa
    ])
    ->where('id_pasien', $id)  // Filter berdasarkan pasien
    ->whereHas('jadwal', function ($query) use ($dokter) {
        // Pastikan hanya jadwal yang terkait dengan dokter yang login
        $query->where('id_dokter', $dokter->id);
    })
    ->withTrashed()  // Pastikan pasien yang di-soft delete tetap muncul
    ->get();

    // Periksa apakah ada data riwayat dan detail periksa
    // dd($riwayat);  // Pastikan detailPeriksa berisi data obat

    // Mengembalikan data ke halaman frontend
    return Inertia::render('RiwayatPasien/Show', [
        'riwayat' => $riwayat,
    ]);
}

}
