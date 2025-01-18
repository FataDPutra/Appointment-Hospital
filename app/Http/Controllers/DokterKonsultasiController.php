<?php

namespace App\Http\Controllers;

use App\Models\Konsultasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function edit($id)
    {
        $konsultasi = Konsultasi::with('dokter', 'pasien')->findOrFail($id);
        return Inertia::render('Dokter/Konsultasi/Edit', [
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

        return redirect()->route('konsultasi-pasien.index');
    }
}
