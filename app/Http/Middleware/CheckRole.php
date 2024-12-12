<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        // Periksa apakah user terautentikasi dan memiliki role yang sesuai
        if (auth()->check() && auth()->user()->role === $role) {
            return $next($request);
        }

        // Jika tidak sesuai role, redirect ke halaman sebelumnya dengan pesan error
        return redirect('/')
            ->withErrors(['access' => 'Anda tidak memiliki izin untuk mengakses halaman ini.']);
    }
}

