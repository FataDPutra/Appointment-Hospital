<?php

namespace App\Http\Controllers;

use App\Models\Obat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ObatController extends Controller
{
    // Menampilkan daftar obat
    public function index()
    {
        $obats = Obat::all();
        return Inertia::render('Obat/Index', [
            'obats' => $obats,
        ]);
    }

    // Menampilkan form tambah obat
    public function create()
    {
        return Inertia::render('Obat/Create');
    }

    // Menyimpan data obat baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_obat' => 'required|string|max:255',
            'kemasan' => 'required|string|max:255',
            'harga' => 'required|integer',
        ]);

        Obat::create($request->all());

        return redirect()->route('obats.index');
    }

    // Menampilkan detail obat berdasarkan id
    public function show($id)
    {
        $obat = Obat::findOrFail($id);
        return Inertia::render('Obat/Show', [
            'obat' => $obat,
        ]);
    }

    // Menampilkan form untuk mengedit obat
    public function edit($id)
    {
        $obat = Obat::findOrFail($id);
        return Inertia::render('Obat/Edit', [
            'obat' => $obat,
        ]);
    }

    // Mengupdate data obat
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_obat' => 'required|string|max:255',
            'kemasan' => 'required|string|max:255',
            'harga' => 'required|integer',
        ]);

        $obat = Obat::findOrFail($id);
        $obat->update($request->all());

        return redirect()->route('obats.index');
    }

    // Menghapus data obat
    public function destroy($id)
    {
        $obat = Obat::findOrFail($id);
        $obat->delete();

        return redirect()->route('obats.index');
    }
}