<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPasienLogin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): mixed
    {
        if (!session('pasien')) {
            return redirect()->route('pasien.login');
        }

        return $next($request);
    }
}
