<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;

class Dokter extends Model implements Authenticatable
{
    use HasFactory, AuthenticatableTrait;

    protected $table = 'dokter';

    protected $fillable = [
        'nama',
        'alamat',
        'no_hp',
        'id_poli',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function poli()
    {
        return $this->belongsTo(Poli::class, 'id_poli');
    }
}