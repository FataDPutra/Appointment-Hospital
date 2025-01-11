<?php

namespace App\Http\Controllers;

use App\Models\Poli;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PoliController extends Controller
{
    // Menampilkan daftar poli
    public function index()
    {
    $polis = Poli::orderBy('created_at', 'desc')->paginate(8);
        return Inertia::render('Poli/Index', [
            'polis' => $polis
        ]);
    }

    // Menampilkan form tambah poli
    public function create()
    {
        return Inertia::render('Poli/Create');
    }

    // Menyimpan data poli baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_poli' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ], [
            'nama_poli.required' => 'Nama poli harus diisi.',
        ]);

        Poli::create([
            'nama_poli' => $request->nama_poli,
            'keterangan' => $request->keterangan,
        ]);

        return redirect()->route('polis.index')->with('success', 'Poli berhasil ditambahkan.');
    }


    // Menampilkan detail poli berdasarkan id
    public function show($id)
    {
        $poli = Poli::findOrFail($id);
        return Inertia::render('Poli/Show', [
            'poli' => $poli
        ]);
    }

    // Menampilkan form untuk mengedit poli
    public function edit($id)
    {
        $poli = Poli::findOrFail($id);
        return Inertia::render('Poli/Edit', [
            'poli' => $poli
        ]);
    }

    // Mengupdate data poli
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_poli' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ],[
            'nama_poli.required' => 'Nama poli harus diisi.',
        ]);

        $poli = Poli::findOrFail($id);
        $poli->update([
            'nama_poli' => $request->nama_poli,
            'keterangan' => $request->keterangan,
        ]);

        return redirect()->route('polis.index');  // Redirect ke daftar poli setelah berhasil update
    }

    // Menghapus data poli
    public function destroy($id)
    {
        $poli = Poli::findOrFail($id);
        $poli->delete();

        return redirect()->route('polis.index');  // Redirect ke daftar poli setelah berhasil hapus
    }
}
