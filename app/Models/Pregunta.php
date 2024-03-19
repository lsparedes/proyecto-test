<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pregunta extends Model
{
    use HasFactory;

    protected $table = 'pregunta';

    protected $fillable = [
        'texto_pregunta',
        'tipo_respuesta',
        'respuesta_correcta',
        'id_test',
    ];

    public function test()
    {
        return $this->belongsTo(Test::class, 'id_test');
    }

    public function alternativas()
    {
        return $this->hasMany(Alternativa::class, 'id_pregunta');
    }

}
