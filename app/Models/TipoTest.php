<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoTest extends Model
{
    use HasFactory;

    protected $table = 'tipo_test';

    protected $fillable = [
        'descripcion',
        'num_test',
        'descripcion_test',
        'instruccion_test',
        'audio_instruccion',
    ];
}
