<?php

namespace App\Http\Controllers;

use App\Models\Konsultasi;
use App\Models\DaftarPoli;
use App\Models\Poli;
use App\Models\Dokter;
use App\Models\JadwalPeriksa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KonsultasiController extends Controller
{
    public function index()
    {
        $pasien = session('pasien');
        if (!$pasien) {
            return redirect()->route('pasien.login');
        }

        $konsultasi = Konsultasi::with(['dokter'])->where('id_pasien', $pasien['id'])->orderBy('created_at', 'desc')->paginate(8);

        // $daftarPoli = DaftarPoli::with([
        //     'jadwal.dokter.poli',
        //     'konsultasi', // Menampilkan data pemeriksaan terkait
        //     'periksa.detailPeriksa.obat' // Menampilkan detail obat yang diberikan
        // ])
        //     ->where('id_pasien', $pasien['id'])
        //     ->withTrashed() // Mengambil data, termasuk yang sudah di-soft delete
        //     ->orderBy('created_at', 'desc') // Mengurutkan data terbaru di bagian atas
        //     ->paginate(8); // Menambahkan pagination dengan 8 data per halaman

        return Inertia::render('Konsultasi/Index', [
            // 'daftarPoli' => $daftarPoli,
            'konsultasi' => $konsultasi
        ]);
    }

    public function create()
    {
        $dokter = Dokter::with(['poli'])->get();
        $poli = Poli::all();
        return Inertia::render('Konsultasi/Create', [
            'dokter' => $dokter,
            'poli' => $poli,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:50',
            'pertanyaan' => 'required|string|max:255',
            'jawaban' => 'nullable|string|max:255',
            'id_dokter' => 'required|exists:dokter,id',

        ], [
            'subject.required' => "Subjek harus diisi",
            'pertanyaan.required' => "Pertanyaan harus diisi",
            'id_dokter.required' => 'Pilih dokter yang tersedia.',
        ]);

        $pasien = session('pasien');
        if (!$pasien) {
            return redirect()->route('pasien.login');
        }

        Konsultasi::create([
            'subject' => $request->subject,
            'pertanyaan' => $request->pertanyaan,
            'jawaban' => $request->jawaban,
            'tgl_konsultasi' => now(),
            'id_dokter' => $request->id_dokter,
            'id_pasien' => $pasien['id'],
        ]);

        return redirect()->route('konsultasi.index')->with('success', 'Konsultasi berhasil!');
    }

   public function edit($id)
{
    $konsultasi = Konsultasi::with('dokter')->findOrFail($id);

    return Inertia::render('Konsultasi/Edit', [
        'konsultasi' => $konsultasi,
    ]);
}


    public function update(Request $request, $id)
    {
        $request->validate([
            'subject' => 'required|string|max:50',
            'pertanyaan' => 'required|string|max:255',
            'jawaban' => 'nullable|string|max:255',
            'id_dokter' => 'required|exists:dokter,id',
        ], [
            'subject.required' => "Subjek harus diisi",
            'pertanyaan.required' => "Pertanyaan harus diisi",
            'id_dokter.required' => 'Pilih dokter yang tersedia.',
        ]);

        $konsultasi = Konsultasi::findOrFail($id);
        $konsultasi->update($request->all());

        return redirect()->route('konsultasi.index');
    }

    public function destroy($id)
    {
        $konsultasi = Konsultasi::findOrFail($id);
        $konsultasi->delete();

        return redirect()->route('konsultasi.index');
    }
}
