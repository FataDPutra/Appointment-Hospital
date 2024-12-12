<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DokterController;
use App\Http\Controllers\PoliController;
use App\Http\Controllers\ObatController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\AuthPasienController;
use App\Http\Middleware\CheckPasienLogin;
use App\Http\Controllers\DataDokterController;
use App\Http\Controllers\JadwalPeriksaController;
use App\Http\Controllers\DaftarPoliController;
use App\Http\Controllers\PeriksaController;
use App\Http\Controllers\RiwayatPasienController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route untuk Admin
Route::middleware(['auth', CheckRole::class.':admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::resource('polis', PoliController::class);  // Menggunakan resource route untuk CRUD poli
    Route::resource('obats', ObatController::class);
    Route::resource('pasiens', PasienController::class);
    Route::resource('dokter', DataDokterController::class);
});


// Route untuk Dokter
Route::middleware(['auth', CheckRole::class.':dokter'])->group(function () {
    Route::get('/dokter/dashboard', [DokterController::class, 'index'])->name('dokter.dashboard');

    // Menampilkan daftar jadwal periksa
    Route::get('/jadwal', [JadwalPeriksaController::class, 'index'])->name('jadwal.index');

    // Menambah jadwal
    Route::get('/jadwal/create', [JadwalPeriksaController::class, 'create'])->name('jadwal.create');
    Route::post('/jadwal', [JadwalPeriksaController::class, 'store'])->name('jadwal.store');

    // Edit jadwal
    Route::get('/jadwal/{id}/edit', [JadwalPeriksaController::class, 'edit'])->name('jadwal.edit');
    Route::put('/jadwal/{id}', [JadwalPeriksaController::class, 'update'])->name('jadwal.update');

    // Restore jadwal
    Route::put('/jadwal/{id}/restore', [JadwalPeriksaController::class, 'restore'])->name('jadwal.restore');

    // Hapus jadwal (soft delete)
    Route::delete('/jadwal/{id}', [JadwalPeriksaController::class, 'destroy'])->name('jadwal.destroy');

    Route::get('/periksa', [PeriksaController::class, 'index'])->name('periksa.index');
    Route::get('/periksa/{daftarPoli}', [PeriksaController::class, 'show'])->name('periksa.show');
    Route::post('/periksa/{daftarPoli}', [PeriksaController::class, 'store'])->name('periksa.store');
    Route::get('/periksa/{periksa}/edit', [PeriksaController::class, 'edit'])->name('periksa.edit');
    Route::put('/periksa/{periksa}', [PeriksaController::class, 'update'])->name('periksa.update');

    Route::get('/riwayat-pasien', [RiwayatPasienController::class, 'index'])->name('riwayat-pasien.index');
    Route::get('/riwayat-pasien/{id}', [RiwayatPasienController::class, 'show'])->name('riwayat-pasien.show');


});


// Route untuk pasien
Route::prefix('pasien')->group(function () {
    Route::get('register', [AuthPasienController::class, 'showRegisterForm'])->name('pasien.register');
    Route::post('register', [AuthPasienController::class, 'register'])->name('pasien.register.submit');
    Route::get('login', [AuthPasienController::class, 'showLoginForm'])->name('pasien.login');
    Route::post('login', [AuthPasienController::class, 'login'])->name('pasien.login.submit');
    Route::post('logout', [AuthPasienController::class, 'logout'])->name('pasien.logout');
    Route::get('dashboard', [AuthPasienController::class, 'dashboard'])->name('pasien.dashboard');

    // Handle the registration form submission
    Route::post('daftar-poli', [DaftarPoliController::class, 'store'])->name('daftar-poli.store');
    Route::get('daftar-poli', [DaftarPoliController::class, 'index'])->name('daftar-poli.index');
    Route::get('daftar-poli/create', [DaftarPoliController::class, 'create'])->name('daftar-poli.create');
    Route::get('riwayat/{id}', [DaftarPoliController::class, 'riwayat'])->name('daftar-poli.riwayat');
});


require __DIR__.'/auth.php';
