<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Konsultasi extends Model
{
    //
    use HasFactory;

    protected $table = 'konsultasi';

    protected $fillable = [
        'subject',
        'pertanyaan',
        'jawaban',
        'tgl_konsultasi',
        'id_pasien',
        'id_dokter'
    ];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class, 'id_pasien');
    }

    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'id_dokter');
    }
}
