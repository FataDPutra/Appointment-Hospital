<?php

namespace App\Http\Controllers;

use App\Models\JadwalPeriksa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JadwalPeriksaController extends Controller
{
    /**
     * Menampilkan daftar jadwal periksa.
     */
    public function index()
    {
        $jadwal = JadwalPeriksa::where('id_dokter', auth()->id())
            ->with('dokter')
            ->withTrashed() // Termasuk jadwal tidak aktif
            ->get();

        return Inertia::render('Jadwal/Index', [
            'jadwal' => $jadwal
        ]);
    }

    /**
     * Menampilkan form tambah jadwal.
     */
    public function create()
    {
        return Inertia::render('Jadwal/Create');
    }

        /**
     * Menyimpan jadwal baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
        ]);

        // Cek konflik jadwal (termasuk soft deleted)
        if (JadwalPeriksa::timeConflict(auth()->id(), $request->hari, $request->jam_mulai, $request->jam_selesai)->exists()) {
            return back()->withErrors(['jadwal' => 'Jadwal bertumbukan dengan jadwal lain.']);
        }

        // Simpan jadwal baru
        JadwalPeriksa::create([
            'id_dokter' => auth()->id(),
            'hari' => $request->hari,
            'jam_mulai' => $request->jam_mulai,
            'jam_selesai' => $request->jam_selesai,
            'deleted_at' => now(), // Tandai langsung sebagai tidak aktif

        ]);

        return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil ditambahkan.');
    }
    
    /**
     * Menampilkan form edit jadwal.
     */
    public function edit($id)
    {
        $jadwal = JadwalPeriksa::withTrashed()
            ->where('id', $id)
            ->where('id_dokter', auth()->id())
            ->firstOrFail();

        return Inertia::render('Jadwal/Edit', [
            'jadwal' => $jadwal
        ]);
    }

/**
 * Mengupdate jadwal yang ada.
 */
public function update(Request $request, $id)
{
    // Validasi input
    $request->validate([
        'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
        'jam_mulai' => 'required|date_format:H:i',
        'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
    ]);

    // Cari jadwal yang akan diupdate
    $jadwal = JadwalPeriksa::withTrashed()
        ->where('id', $id)
        ->where('id_dokter', auth()->id())
        ->firstOrFail();

    // Cek jika jadwal adalah untuk hari ini
    $hariIni = now()->locale('id')->isoFormat('dddd'); // Mengambil nama hari dalam format lokal
    if ($jadwal->hari === $hariIni) {
        // Jika hari atau jam diubah, tolak permintaan
        if ($request->hari !== $jadwal->hari || $request->jam_mulai !== $jadwal->jam_mulai || $request->jam_selesai !== $jadwal->jam_selesai) {
            return back()->withErrors(['jadwal' => 'Hari atau jam periksa tidak boleh diubah pada hari yang sama.']);
        }
    }

    // Cek konflik jadwal (termasuk soft deleted)
    if (JadwalPeriksa::timeConflict(auth()->id(), $request->hari, $request->jam_mulai, $request->jam_selesai)
        ->where('id', '!=', $jadwal->id) // Kecualikan jadwal yang sedang diupdate
        ->exists()) {
        return back()->withErrors(['jadwal' => 'Jadwal bertumbukan dengan jadwal lain.']);
    }

    // Update jadwal tanpa mengubah status deleted_at
    $jadwal->update([
        'hari' => $request->hari,
        'jam_mulai' => $request->jam_mulai,
        'jam_selesai' => $request->jam_selesai,
    ]);

    return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil diperbarui.');
}



    /**
     * Mengembalikan jadwal yang telah dihapus (restore).
     * Pastikan hanya satu jadwal aktif pada hari yang sama.
     */
    public function restore($id)
    {
        $jadwal = JadwalPeriksa::withTrashed()
            ->where('id', $id)
            ->where('id_dokter', auth()->id())
            ->firstOrFail();

        // Nonaktifkan jadwal lain pada hari yang sama
        JadwalPeriksa::where('id_dokter', auth()->id())
            ->where('hari', $jadwal->hari)
            ->whereNull('deleted_at')
            ->update(['deleted_at' => now()]);

        // Aktifkan jadwal ini
        $jadwal->restore();

        return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil diaktifkan. Jadwal lain pada hari yang sama dinonaktifkan.');
    }

    

    /**
     * Nonaktifkan jadwal dengan soft delete.
     */
    public function destroy($id)
    {
        $jadwal = JadwalPeriksa::where('id', $id)
            ->where('id_dokter', auth()->id())
            ->firstOrFail();

        $jadwal->delete();

        return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil dinonaktifkan.');
    }
}
