<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DokterController extends Controller
{
    public function index()
    {
        return inertia('Dokter/Dashboard');  // React component yang akan di-render
    }
}
