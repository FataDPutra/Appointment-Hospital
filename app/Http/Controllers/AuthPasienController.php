<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthPasienController extends Controller
{
    public function showRegisterForm()
    {
        return Inertia::render('Pasien/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_ktp' => 'required|digits:16|unique:pasien',
            'no_hp' => 'required|digits_between:10,15',
        ],[
        'nama.required' => 'Nama pasien harus diisi.',
        'alamat.required' => 'Alamat harus diisi.',
        'no_hp.required' => 'Nomor HP harus diisi.',
        'no_ktp.required' => 'Nomor KTP harus diisi.',
        'no_ktp.unique' => 'Nomor KTP sudah terdaftar untuk pasien lain.',
    ]);

        $no_rm = $this->generateNoRM();

        $pasien = Pasien::create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'no_ktp' => $request->no_ktp,
            'no_hp' => $request->no_hp,
            'no_rm' => $no_rm,
        ]);

        session(['pasien' => $pasien->only(['id', 'nama', 'no_rm'])]);

        return redirect()->route('pasien.dashboard');
    }

    public function showLoginForm()
    {
        return Inertia::render('Pasien/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'no_rm' => 'required|string|exists:pasien,no_rm',
        ],[
            'no_rm.required' => 'No RM harus diisi.',
            'no_rm.exists' => 'No RM tidak ditemukan.', 
        ]);

        $pasien = Pasien::where('no_rm', $request->no_rm)->first();

        session(['pasien' => $pasien->only(['id', 'nama', 'no_rm'])]);

        return redirect()->route('pasien.dashboard');
    }

    public function logout()
    {
        session()->forget('pasien');
        return redirect()->route('pasien.login');
    }

    public function dashboard()
    {
        $pasien = session('pasien');

        if (!$pasien) {
            return redirect()->route('pasien.login');
        }

        return Inertia::render('Pasien/Dashboard', [
            'pasien' => $pasien,
        ]);
    }

    private function generateNoRM()
    {
        $currentYearMonth = date('Ym');

        $lastPasien = Pasien::whereYear('created_at', date('Y'))
            ->whereMonth('created_at', date('m'))
            ->orderBy('created_at', 'desc')
            ->first();

        $lastNumber = $lastPasien ? (int) substr($lastPasien->no_rm, -3) : 0;

        return sprintf('%s-%03d', $currentYearMonth, $lastNumber + 1);
    }
}
