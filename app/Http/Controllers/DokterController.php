<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\JadwalPeriksa;
use App\Models\DaftarPoli;
use Illuminate\Http\Request;

class DokterController extends Controller
{
    public function index()
    {
        // Ambil data dokter yang sedang login
        $dokter = auth()->user();

        // Ambil data poli yang terkait dengan dokter
        $poli = $dokter->poli;  // Relasi dengan model Poli

        // Ambil jadwal yang aktif untuk dokter ini
        $jadwals = JadwalPeriksa::active()
            ->where('id_dokter', $dokter->id)
            ->get();

        // Ambil jumlah pasien yang sudah diperiksa dan yang belum diperiksa per jadwal
        $jadwals = $jadwals->map(function ($jadwal) {
        // Ambil pasien yang terkait dengan jadwal ini
        $jumlah_pasiens = DaftarPoli::where('id_jadwal', $jadwal->id)
            ->whereNull('deleted_at') // hanya pasien yang belum dihapus
            ->get();

        // Pisahkan jumlah pasien yang sudah diperiksa
        $jumlah_diperiksa = $jumlah_pasiens->filter(function ($daftarPoli) {
            return $daftarPoli->periksa !== null; // Memastikan relasi periksa sudah ada
        })->count();

        // Jumlah pasien yang belum diperiksa
        $jumlah_belum_diperiksa = $jumlah_pasiens->count() - $jumlah_diperiksa;

        // Menambahkan data jumlah pasien ke dalam objek jadwal
        $jadwal->jumlah_diperiksa = $jumlah_diperiksa;
        $jadwal->jumlah_belum_diperiksa = $jumlah_belum_diperiksa;

        return $jadwal;
    });


        // Kirimkan data ke halaman dashboard
        return inertia('Dokter/Dashboard', [
            'dokter' => $dokter,  // Kirim data dokter
            'poli' => $poli,      // Kirim data poli
            'jadwals' => $jadwals, // Kirim data jadwal beserta jumlah pasien
        ]);
    }
}
