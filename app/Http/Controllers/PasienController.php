<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasienController extends Controller
{
    // Menampilkan daftar pasien
    public function index()
    {
        $pasiens = Pasien::all();
        return Inertia::render('Pasien/Index', [
            'pasiens' => $pasiens,
        ]);
    }

    // Menampilkan form tambah pasien
    public function create()
    {
        return Inertia::render('Pasien/Create');
    }

    // Menyimpan data pasien baru
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_ktp' => 'required|string|max:20|unique:pasien',
            'no_hp' => 'required|string|max:15',
        ]);

        // Generate No RM
        $no_rm = $this->generateNoRM();
               // Cek apakah no_ktp sudah terdaftar
        if (Pasien::where('no_ktp', $request->no_ktp)->exists()) {

            // Jika no_ktp sudah ada, kembalikan error ke halaman register
            return back()->withErrors([
                'no_ktp' => 'Nomor KTP sudah terdaftar. Silakan Daftarkan Pasien Lain.'
            ]);
        }

        Pasien::create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'no_ktp' => $request->no_ktp,
            'no_hp' => $request->no_hp,
            'no_rm' => $no_rm,
        ]);

        return redirect()->route('pasiens.index');
    }

    // Menampilkan detail pasien berdasarkan id
    public function show($id)
    {
        $pasien = Pasien::findOrFail($id);
        return Inertia::render('Pasien/Show', [
            'pasien' => $pasien,
        ]);
    }

    // Menampilkan form untuk mengedit pasien
    public function edit($id)
    {
        $pasien = Pasien::findOrFail($id);
        return Inertia::render('Pasien/Edit', [
            'pasien' => $pasien,
        ]);
    }

    // Mengupdate data pasien
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_ktp' => 'required|string|max:20|unique:pasien,no_ktp,' . $id,
            'no_hp' => 'required|string|max:15',
        ]);

        $pasien = Pasien::findOrFail($id);
        if (Pasien::where('no_ktp', $request->no_ktp)->exists()) {

            // Jika no_ktp sudah ada, kembalikan error ke halaman register
            return back()->withErrors([
                'no_ktp' => 'Nomor KTP sudah terdaftar. Silakan Daftarkan Pasien Lain.'
            ]);
        }
        $pasien->update($request->all());

        return redirect()->route('pasiens.index');
    }

    // Menghapus data pasien
    public function destroy($id)
    {
        $pasien = Pasien::findOrFail($id);
        $pasien->delete();

        return redirect()->route('pasiens.index');
    }

    // Fungsi untuk generate No RM
    private function generateNoRM()
    {
        $currentYearMonth = date('Ym'); // Format tahun dan bulan
        $count = Pasien::whereYear('created_at', date('Y'))
                        ->whereMonth('created_at', date('m'))
                        ->count();

        // Menentukan urutan pasien
        $urutan = $count + 1; // Urutan pasien keberapa
        return sprintf('%s-%03d', $currentYearMonth, $urutan); // Format No RM
    }
}