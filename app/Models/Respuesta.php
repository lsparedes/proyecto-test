<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Respuesta extends Model
{
    use HasFactory;

    protected $table = 'respuesta';

    protected $fillable = [
        'texto_respuesta',
        'id_pregunta',
        'id_test',
    ];

    public function pregunta()
    {
        return $this->belongsTo(Pregunta::class, 'id_pregunta');
    }

    public function test()
    {
        return $this->belongsTo(Test::class, 'id_test');
    }

}
