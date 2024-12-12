<?php

// app/Http/Middleware/CheckDokterRole.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckDokterRole
{
    public function handle($request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role === 'dokter') {
            return $next($request);
        }

        return redirect('/')->with('error', 'Unauthorized access');
    }
}