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
        'nama' => 'required|string|max:255|unique:dokter,nama', // Nama harus unik
        'alamat' => 'nullable|string',
        'no_hp' => 'required|string|max:15',
        'id_poli' => 'required|exists:poli,id',
        'email' => 'required|email|unique:dokter,email',
        'password' => 'required|min:8',
        //         'password' => [
        //     'required',
        //     'min:8',
        //     'regex:/[a-z]/', // Minimal ada satu huruf kecil
        //     'regex:/[A-Z]/', // Minimal ada satu huruf besar
        // ],
    ], [
        
        'nama.unique' => 'Nama dokter sudah terdaftar.',
        'nama.required' => 'Nama dokter harus diisi.',
        'no_hp.required' => 'Nomor HP harus diisi.',
        'id_poli.required' => 'Poli harus dipilih.',
        'email.required' => 'Email harus diisi.',
        'email.unique' => 'Email sudah terdaftar.',
        'password.required' => 'Password harus diisi.',
        'password.min' => 'Password harus minimal 8 karakter.',
        // 'password.regex' => 'Password harus mengandung huruf besar dan kecil.',
    ]);

    try {
        Dokter::create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'no_hp' => $request->no_hp,
            'id_poli' => $request->id_poli,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('dokter.index')->with('success', 'Dokter berhasil ditambahkan.');
    } catch (\Exception $e) {
        return back()->withErrors(['error' => 'Terjadi kesalahan saat menambahkan dokter.'])->withInput();
    }
}

    public function edit(Dokter $dokter)
    {
        $poli = Poli::all();
        return Inertia::render('Dokter/Edit', ['dokter' => $dokter, 'poli' => $poli]);
    }

    public function update(Request $request, Dokter $dokter)
{
    $request->validate([
        'nama' => 'required|string|max:255|unique:dokter,nama,' . $dokter->id, // Cek unik kecuali untuk data yang sedang diupdate
        'alamat' => 'nullable|string',
        'no_hp' => 'required|string|max:15',
        'id_poli' => 'required|exists:poli,id',
        'email' => 'required|email|unique:dokter,email,' . $dokter->id,
        'password' => 'nullable|min:8',
        // 'password' => [
        //     'required',
        //     'min:8',
        //     'regex:/[a-z]/', // Minimal ada satu huruf kecil
        //     'regex:/[A-Z]/', // Minimal ada satu huruf besar
        // ],
    ], [
        'nama.unique' => 'Nama dokter sudah terdaftar.',
        'nama.required' => 'Nama dokter harus diisi.',
        'no_hp.required' => 'Nomor HP harus diisi.',
        'id_poli.required' => 'Poli harus dipilih.',
        'email.required' => 'Email harus diisi.',
        'email.unique' => 'Email sudah terdaftar.',
        'password.min' => 'Password harus minimal 8 karakter.',
        //  'password.regex' => 'Password harus mengandung huruf besar dan kecil.',

    ]);

    try {
        $dokter->update([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'no_hp' => $request->no_hp,
            'id_poli' => $request->id_poli,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $dokter->password,
        ]);

        return redirect()->route('dokter.index')->with('success', 'Data dokter berhasil diubah.');
    } catch (\Exception $e) {
        return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data dokter.'])->withInput();
    }
}

    public function destroy(Dokter $dokter)
    {
        $dokter->delete();
        return redirect()->route('dokter.index')->with('success', 'Data dokter berhasil dihapus.');
    }
}
