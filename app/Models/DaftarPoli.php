<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DaftarPoli extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'daftar_poli';

    protected $fillable = [
        'id_pasien',
        'id_jadwal',
        'keluhan',
        'no_antrian',
        'deleted_at'
    ];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class, 'id_pasien');
    }

    // public function jadwal()
    // {
    //     return $this->belongsTo(JadwalPeriksa::class, 'id_jadwal');
    // }

    public function jadwal()
{
    return $this->belongsTo(JadwalPeriksa::class, 'id_jadwal')->withTrashed();
}

        public function periksa()
    {
        return $this->hasOne(Periksa::class, 'id_daftar_poli');
    }
}
