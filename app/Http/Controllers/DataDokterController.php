<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\Poli;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DataDokterController extends Controller
{
public function index()
{
    $dokters = Dokter::with('poli')->orderBy('created_at', 'desc')->paginate(10);
    return Inertia::render('Dokter/Index', ['dokters' => $dokters]);
}
    public function create()
    {
        $poli = Poli::all();
        return Inertia::render('Dokter/Create', ['poli' => $poli]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'no_hp' => 'required|string|max:15',
            'id_poli' => 'required|exists:poli,id',
            'email' => 'required|email|unique:dokter,email',
            'password' => 'required|min:8',
        ]);

        Dokter::create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'no_hp' => $request->no_hp,
            'id_poli' => $request->id_poli,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('dokter.index')->with('success', 'Dokter berhasil ditambahkan.');
    }

    public function edit(Dokter $dokter)
    {
        $poli = Poli::all();
        return Inertia::render('Dokter/Edit', ['dokter' => $dokter, 'poli' => $poli]);
    }

    public function update(Request $request, Dokter $dokter)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'no_hp' => 'required|string',
            'id_poli' => 'required|exists:poli,id',
            'email' => 'required|email|unique:dokter,email,' . $dokter->id,
            'password' => 'nullable|min:8',
        ]);

        $dokter->update([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'no_hp' => $request->no_hp,
            'id_poli' => $request->id_poli,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $dokter->password,
        ]);

        return redirect()->route('dokter.index')->with('success', 'Data dokter berhasil diubah.');
    }

    public function destroy(Dokter $dokter)
    {
        $dokter->delete();
        return redirect()->route('dokter.index')->with('success', 'Data dokter berhasil dihapus.');
    }
}
