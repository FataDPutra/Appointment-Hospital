<?php

namespace App\Http\Controllers;

use App\Models\DaftarPoli;
use App\Models\Obat;
use App\Models\Periksa;
use App\Models\DetailPeriksa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeriksaController extends Controller
{
public function index()
{
    // Ambil dokter yang sedang login
    $dokter = auth()->user(); // Asumsi dokter sudah login, bisa sesuaikan jika pakai middleware yang lain

    // Ambil semua daftar poli yang terhubung dengan jadwal yang sesuai dengan dokter dan belum diperiksa
    $daftarPoli = DaftarPoli::whereHas('jadwal', function ($query) use ($dokter) {
        // Pastikan hanya jadwal yang terhubung dengan dokter yang sedang login
        $query->where('id_dokter', $dokter->id);
    })
    ->with(['pasien', 'jadwal']) // Memuat relasi pasien dan jadwal
    ->withTrashed() // Termasuk yang soft deleted
    ->orderByRaw("CASE WHEN deleted_at IS NULL THEN 0 ELSE 1 END, created_at ASC") // Urutkan berdasarkan status dan waktu
    ->paginate(8); // Menambahkan pagination dengan 8 item per halaman

    // Menggunakan map untuk menentukan status
    $daftarPoli->getCollection()->map(function ($item) {
        // Tentukan status apakah sudah diperiksa atau belum
        $item->status = $item->deleted_at ? 'Sudah Diperiksa' : 'Belum Diperiksa';
        return $item;
    });

    return Inertia::render('Periksa/Index', [
        'daftarPoli' => $daftarPoli,
    ]);
}

    public function show(DaftarPoli $daftarPoli)
    {
        // Menampilkan halaman detail untuk pemeriksaan pasien dengan mengambil data pasien
        $daftarPoli = DaftarPoli::with('pasien')->find($daftarPoli->id);  // Ambil data daftar poli beserta data pasien

        if (!$daftarPoli || !$daftarPoli->pasien) {
            // Jika tidak ditemukan, redirect dengan error
            return redirect()->route('periksa.index')->with('error', 'Daftar Poli atau Pasien tidak ditemukan');
        }

        $obat = Obat::all();  // Ambil semua obat untuk dipilih

        return Inertia::render('Periksa/Show', [
            'daftarPoli' => $daftarPoli,
            'obat' => $obat,
            'pasien' => $daftarPoli->pasien,  // Mengirimkan data pasien
        ]);
    }

    public function store(Request $request, DaftarPoli $daftarPoli)
    {
        // Validasi input
        $request->validate([
            'catatan' => 'nullable|string',
            'obat' => 'array',
            'obat.*' => 'exists:obat,id',
        ]);

        // Hitung total biaya obat yang dipilih
        $totalBiayaObat = Obat::whereIn('id', $request->obat)->sum('harga');
        $biayaPeriksa = 150000 + $totalBiayaObat;

        // Simpan pemeriksaan
        $periksa = Periksa::create([
            'id_daftar_poli' => $daftarPoli->id,
            'tgl_periksa' => now(),
            'catatan' => $request->catatan,
            'biaya_periksa' => $biayaPeriksa,
        ]);

        // Soft delete daftar poli yang telah diperiksa
        $daftarPoli->delete();

        // Simpan detail pemeriksaan untuk obat yang dipilih
        foreach ($request->obat as $idObat) {
            DetailPeriksa::create([
                'id_periksa' => $periksa->id,
                'id_obat' => $idObat,
            ]);
        }

        // Redirect ke halaman daftar periksa dengan pesan sukses
        return redirect()->route('periksa.index')->with('success', 'Pemeriksaan selesai.');
    }

    public function edit(Periksa $periksa)
    {
        // Ambil data pemeriksaan beserta detail obat yang dipilih
        $detailPeriksa = $periksa->detailPeriksa;
        $obat = Obat::all();  // Ambil semua obat untuk dipilih

        return Inertia::render('Periksa/Edit', [
            'periksa' => $periksa,
            'obat' => $obat,
            'detailPeriksa' => $detailPeriksa,
        ]);
    
    }

    public function update(Request $request, Periksa $periksa)
    {
        // Validasi input
        $request->validate([
            'catatan' => 'nullable|string',
            'obat' => 'array',
            'obat.*' => 'exists:obat,id',
        ]);

        // Hitung total biaya obat yang dipilih
        $totalBiayaObat = Obat::whereIn('id', $request->obat)->sum('harga');
        $biayaPeriksa = 150000 + $totalBiayaObat;

        // Update data pemeriksaan
        $periksa->update([
            'catatan' => $request->catatan,
            'biaya_periksa' => $biayaPeriksa,
        ]);

        // Hapus detail pemeriksaan obat sebelumnya
        $periksa->detailPeriksa()->delete();

        // Simpan detail pemeriksaan untuk obat yang dipilih
        foreach ($request->obat as $idObat) {
            DetailPeriksa::create([
                'id_periksa' => $periksa->id,
                'id_obat' => $idObat,
            ]);
        }

        // Redirect ke halaman daftar periksa dengan pesan sukses
        return redirect()->route('periksa.index')->with('success', 'Pemeriksaan berhasil diupdate.');
    }
}
