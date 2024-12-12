<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    // public function store(LoginRequest $request): RedirectResponse
    // {
    //     // Proses autentikasi pengguna
    //     $request->authenticate();

    //     // Regenerasi session untuk mencegah session fixation
    //     $request->session()->regenerate();

    //     // Setelah login, periksa role pengguna
    //     $user = Auth::user();

    //     // Redirect berdasarkan role
    //     if ($user->role === 'admin') {
    //         return redirect()->route('admin.dashboard'); // Halaman dashboard admin
    //     } elseif ($user->role === 'dokter') {
    //         return redirect()->route('dokter.dashboard'); // Halaman dashboard dokter
    //     }

    //     // Jika role tidak dikenali atau valid, logout dan redirect
    //     Auth::logout();
    //     return redirect()->route('login')->withErrors(['role' => 'You do not have permission to access this area.']);
    // }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();
        
        // Gunakan switch atau if-else berdasarkan role
        switch ($user->role) {
            case 'admin':
                return redirect()->route('admin.dashboard');
            case 'dokter':
                return redirect()->route('dokter.dashboard');
            default:
                Auth::logout();
                return redirect()->route('login')->withErrors(['role' => 'Anda tidak memiliki izin akses']);
        }
    }
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
