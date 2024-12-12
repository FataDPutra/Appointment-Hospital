<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JadwalPeriksa extends Model
{
    use SoftDeletes;

    protected $table = 'jadwal_periksa';

    protected $fillable = ['id_dokter', 'hari', 'jam_mulai', 'jam_selesai', 'deleted_at'];

    /**
     * Relasi ke model Dokter.
     */
    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'id_dokter');
    }

    /**
     * Scope untuk mendapatkan jadwal yang aktif.
     */
    public function scopeActive($query)
    {
        return $query->whereNull('deleted_at');
    }

    /**
     * Scope untuk mengecek konflik jadwal (termasuk soft deleted).
     */
    public function scopeTimeConflict($query, $id_dokter, $hari, $jam_mulai, $jam_selesai)
    {
        return $query->withTrashed()
            ->where('id_dokter', $id_dokter)
            ->where('hari', $hari)
            ->where(function ($query) use ($jam_mulai, $jam_selesai) {
                $query->whereBetween('jam_mulai', [$jam_mulai, $jam_selesai])
                    ->orWhereBetween('jam_selesai', [$jam_mulai, $jam_selesai])
                    ->orWhere(function ($query) use ($jam_mulai, $jam_selesai) {
                        $query->where('jam_mulai', '<=', $jam_mulai)
                                ->where('jam_selesai', '>=', $jam_selesai);
                    });
            });
    }

}
