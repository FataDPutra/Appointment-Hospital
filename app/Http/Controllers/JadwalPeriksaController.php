<?php

namespace App\Http\Controllers;

use App\Models\JadwalPeriksa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JadwalPeriksaController extends Controller
{
    /**
     * Menampilkan daftar jadwal periksa.
     */
public function index()
{
    $jadwal = JadwalPeriksa::where('id_dokter', auth()->id())
        ->with('dokter')
        ->withTrashed() // Termasuk jadwal yang tidak aktif
        ->orderByRaw("CASE hari
            WHEN 'Senin' THEN 1
            WHEN 'Selasa' THEN 2
            WHEN 'Rabu' THEN 3
            WHEN 'Kamis' THEN 4
            WHEN 'Jumat' THEN 5
            WHEN 'Sabtu' THEN 6
            WHEN 'Minggu' THEN 7
            ELSE 8
        END")
        ->orderBy('created_at', 'desc') // Urutkan berdasarkan tanggal terbaru
        ->paginate(8); // Menggunakan pagination dengan 10 item per halaman

    return Inertia::render('Jadwal/Index', [
        'jadwal' => $jadwal
    ]);
}




    /**
     * Menampilkan form tambah jadwal.
     */
    public function create()
    {
        return Inertia::render('Jadwal/Create');
    }

    //KASUS HANYA ADA 1 JADWAL DI 1 HARI

//     public function store(Request $request)
// {
//     $request->validate([
//         'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
//         'jam_mulai' => 'required|date_format:H:i',
//         'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
//     ]);

//     // Cek jika sudah ada jadwal (baik aktif maupun nonaktif) pada hari tersebut
//     $existingSchedule = JadwalPeriksa::withTrashed() // Termasuk jadwal nonaktif
//     ->where('id_dokter', auth()->id())
//     ->where('hari', $request->hari)
//     ->exists();


//     if ($existingSchedule) {
//         return back()->withErrors(['jadwal' => 'Sudah ada jadwal di hari ini, baik aktif maupun nonaktif. Tidak dapat menambahkan jadwal baru.']);
//     }

//     // Simpan jadwal baru
//     JadwalPeriksa::create([
//         'id_dokter' => auth()->id(),
//         'hari' => $request->hari,
//         'jam_mulai' => $request->jam_mulai,
//         'jam_selesai' => $request->jam_selesai,
            // 'deleted_at' => now(), // Tandai langsung sebagai tidak aktif

//     ]);

//     return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil ditambahkan.');
// }

    //kasus hanya ada 1 jadwal yang aktif

    //     /**
    //  * Menyimpan jadwal baru.
    //  */
    public function store(Request $request)
    {
        $request->validate([
            'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
        ],
        [        
            'hari.required' => 'Hari harus dipilih.',
            'jam_mulai.required' => 'Jam mulai harus diisi.',
            'jam_selesai.required' => 'Jam selesai harus diisi.',
            'jam_mulai.date_format' => 'Jam mulai dan jam selesai harus diubah.', // Pesan kustom untuk jam mulai
            'jam_selesai.date_format' => 'Jam mulai dan jam selesai harus diubah.', // Pesan kustom untuk jam selesai
            'jam_selesai.after' => 'Jam selesai harus setelah jam mulai.', // Pesan kustom untuk aturan after
        ]
    );

        // Cek konflik jadwal (termasuk soft deleted)
        if (JadwalPeriksa::timeConflict(auth()->id(), $request->hari, $request->jam_mulai, $request->jam_selesai)->exists()) {
            return back()->withErrors(['jadwal' => 'Jadwal bertumbukan dengan jadwal lain.']);
        }

        // Simpan jadwal baru
        JadwalPeriksa::create([
            'id_dokter' => auth()->id(),
            'hari' => $request->hari,
            'jam_mulai' => $request->jam_mulai,
            'jam_selesai' => $request->jam_selesai,
            'deleted_at' => now(), // Tandai langsung sebagai tidak aktif

        ]);

        return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil ditambahkan.');
    }
    
    
       /**
     * Menyimpan jadwal baru.
     */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
    //         'jam_mulai' => 'required|date_format:H:i',
    //         'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
    //     ]);

    //     // Cek konflik jadwal (termasuk soft deleted)
    //     if (JadwalPeriksa::timeConflict(auth()->id(), $request->hari, $request->jam_mulai, $request->jam_selesai)->exists()) {
    //         return back()->withErrors(['jadwal' => 'Jadwal bertumbukan dengan jadwal lain.']);
    //     }

    //     // Nonaktifkan semua jadwal lain sebelum menambahkan jadwal baru
    //     JadwalPeriksa::where('id_dokter', auth()->id())
    //         ->whereNull('deleted_at')
    //         ->update(['deleted_at' => now()]);

    //     // Simpan jadwal baru
    //     JadwalPeriksa::create([
    //         'id_dokter' => auth()->id(),
    //         'hari' => $request->hari,
    //         'jam_mulai' => $request->jam_mulai,
    //         'jam_selesai' => $request->jam_selesai,
    //     ]);

    //     return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil ditambahkan. Jadwal lain dinonaktifkan.');
    // }

    /**
     * Menampilkan form edit jadwal.
     */
    public function edit($id)
    {
        $jadwal = JadwalPeriksa::withTrashed()
            ->where('id', $id)
            ->where('id_dokter', auth()->id())
            ->firstOrFail();

        return Inertia::render('Jadwal/Edit', [
            'jadwal' => $jadwal
        ]);
    }

// /**
//  * Mengupdate jadwal yang ada.
//  */
// public function update(Request $request, $id)
// {
//     // Validasi input
//     $request->validate([
//         'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
//         'jam_mulai' => 'required|date_format:H:i',
//         'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
//     ]);

//     // Cari jadwal yang akan diupdate
//     $jadwal = JadwalPeriksa::withTrashed()
//         ->where('id', $id)
//         ->where('id_dokter', auth()->id())
//         ->firstOrFail();

//     // Cek jika jadwal adalah untuk hari ini
//     $hariIni = now()->locale('id')->isoFormat('dddd'); // Mengambil nama hari dalam format lokal
//     if ($jadwal->hari === $hariIni) {
//         // Jika hari atau jam diubah, tolak permintaan
//         if ($request->hari !== $jadwal->hari || $request->jam_mulai !== $jadwal->jam_mulai || $request->jam_selesai !== $jadwal->jam_selesai) {
//             return back()->withErrors(['jadwal' => 'Hari atau jam periksa tidak boleh diubah pada hari yang sama.']);
//         }
//     }

//     // Cek konflik jadwal (termasuk soft deleted)
//     if (JadwalPeriksa::timeConflict(auth()->id(), $request->hari, $request->jam_mulai, $request->jam_selesai)
//         ->where('id', '!=', $jadwal->id) // Kecualikan jadwal yang sedang diupdate
//         ->exists()) {
//         return back()->withErrors(['jadwal' => 'Jadwal bertumbukan dengan jadwal lain.']);
//     }

//     // Update jadwal tanpa mengubah status deleted_at
//     $jadwal->update([
//         'hari' => $request->hari,
//         'jam_mulai' => $request->jam_mulai,
//         'jam_selesai' => $request->jam_selesai,
//     ]);

//     return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil diperbarui.');
// }

//kasus jadwal 1 yang aktif
/**
     * Mengupdate jadwal yang ada.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
        ],
        [            
            'hari.required' => 'Hari harus dipilih.',
            'jam_mulai.required' => 'Jam mulai harus diisi.',
            'jam_selesai.required' => 'Jam selesai harus diisi.',
            'jam_mulai.date_format' => 'Jam mulai dan jam selesai harus diubah.', // Pesan kustom untuk jam mulai
            'jam_selesai.date_format' => 'Jam mulai dan jam selesai harus diubah.', // Pesan kustom untuk jam selesai
            'jam_selesai.after' => 'Jam selesai harus setelah jam mulai.', // Pesan kustom untuk aturan after
        ]);

        $jadwal = JadwalPeriksa::withTrashed()
            ->where('id', $id)
            ->where('id_dokter', auth()->id())
            ->firstOrFail();

        // Cek konflik jadwal (termasuk soft deleted)
        if (JadwalPeriksa::timeConflict(auth()->id(), $request->hari, $request->jam_mulai, $request->jam_selesai)
            ->where('id', '!=', $jadwal->id) // Kecualikan jadwal yang sedang diupdate
            ->exists()) {
            return back()->withErrors(['jadwal' => 'Jadwal bertumbukan dengan jadwal lain.']);
        }

        // Nonaktifkan semua jadwal lain sebelum memperbarui jadwal
        JadwalPeriksa::where('id_dokter', auth()->id())
            ->whereNull('deleted_at')
            ->where('id', '!=', $id)
            ->update(['deleted_at' => now()]);

        // Update jadwal
        $jadwal->update([
            'hari' => $request->hari,
            'jam_mulai' => $request->jam_mulai,
            'jam_selesai' => $request->jam_selesai,
        ]);

        return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil diperbarui. Jadwal lain dinonaktifkan.');
    }


    // kasus tidak bisa menambahkan jadwal di hari yang sama
//  public function update(Request $request, $id)
// {
//     $request->validate([
//         'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
//         'jam_mulai' => 'required|date_format:H:i',
//         'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
//     ],        
//     [            
//             'hari.required' => 'Hari harus dipilih.',
//             'jam_mulai.required' => 'Jam mulai harus diisi.',
//             'jam_selesai.required' => 'Jam selesai harus diisi.',
//             'jam_mulai.date_format' => 'Jam mulai dan jam selesai harus diubah.', // Pesan kustom untuk jam mulai
//             'jam_selesai.date_format' => 'Jam mulai dan jam selesai harus diubah.', // Pesan kustom untuk jam selesai
//             'jam_selesai.after' => 'Jam selesai harus setelah jam mulai.', // Pesan kustom untuk aturan after
//         ]
//     );

//     $jadwal = JadwalPeriksa::withTrashed()
//         ->where('id', $id)
//         ->where('id_dokter', auth()->id())
//         ->firstOrFail();

//     // Cek jika sudah ada jadwal lain (termasuk soft deleted) pada hari tersebut
//     $existingSchedule = JadwalPeriksa::withTrashed()
//         ->where('id_dokter', auth()->id())
//         ->where('hari', $request->hari)
//         ->where('id', '!=', $jadwal->id)
//         ->exists();

//     if ($existingSchedule) {
//         return back()->withErrors(['jadwal' => 'Sudah ada jadwal di hari ini, baik aktif maupun nonaktif. Tidak dapat memperbarui jadwal.']);
//     }

//     // Update jadwal
//     $jadwal->update([
//         'hari' => $request->hari,
//         'jam_mulai' => $request->jam_mulai,
//         'jam_selesai' => $request->jam_selesai,
//     ]);

//     return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil diperbarui.');
// }




    // /**
    //  * Mengembalikan jadwal yang telah dihapus (restore).
    //  * Pastikan hanya satu jadwal aktif pada hari yang sama.
    //  */
    // public function restore($id)
    // {
    //     $jadwal = JadwalPeriksa::withTrashed()
    //         ->where('id', $id)
    //         ->where('id_dokter', auth()->id())
    //         ->firstOrFail();

    //     // Nonaktifkan jadwal lain pada hari yang sama
    //     JadwalPeriksa::where('id_dokter', auth()->id())
    //         ->where('hari', $jadwal->hari)
    //         ->whereNull('deleted_at')
    //         ->update(['deleted_at' => now()]);

    //     // Aktifkan jadwal ini
    //     $jadwal->restore();

    //     return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil diaktifkan. Jadwal lain pada hari yang sama dinonaktifkan.');
    // }

        /**
     * Mengembalikan jadwal yang telah dihapus (restore).
     * Pastikan hanya satu jadwal aktif dalam seminggu.
     */
    public function restore($id)
    {
        $jadwal = JadwalPeriksa::withTrashed()
            ->where('id', $id)
            ->where('id_dokter', auth()->id())
            ->firstOrFail();

        // Nonaktifkan semua jadwal lainnya
        JadwalPeriksa::where('id_dokter', auth()->id())
            ->whereNull('deleted_at')
            ->update(['deleted_at' => now()]);

        // Aktifkan jadwal ini
        $jadwal->restore();

        return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil diaktifkan. Jadwal lain dinonaktifkan.');
    }

    /**
     * Nonaktifkan jadwal dengan soft delete.
     */
    public function destroy($id)
    {
        $jadwal = JadwalPeriksa::where('id', $id)
            ->where('id_dokter', auth()->id())
            ->firstOrFail();

        $jadwal->delete();

        return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil dinonaktifkan.');
    }

    /**
 * Menghapus jadwal secara permanen.
 */
public function forceDelete($id)
{
    $jadwal = JadwalPeriksa::withTrashed()
        ->where('id', $id)
        ->where('id_dokter', auth()->id())
        ->firstOrFail();

    // Hapus secara permanen
    $jadwal->forceDelete();

    return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil dihapus secara permanen.');
}
   
}
