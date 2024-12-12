<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Tampilkan halaman profil.
     */
    public function edit()
    {
        return inertia('Profile/Edit', [
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Update informasi profil.
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:dokter,email,' . $user->id,
            'no_hp' => 'nullable|string|max:15',
            'alamat' => 'nullable|string|max:255',
        ]);

        $user->update($validated);

        return back()->with('status', 'Profil berhasil diperbarui.');
    }

    /**
     * Hapus akun.
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user->delete();

        Auth::logout();

        return redirect('/login');
    }
}
