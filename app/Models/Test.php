<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    protected $table = 'test';

    protected $fillable = [
        'name_test',
        'points',
        'duracion_minutos',
        'tipotest_id',
        'url_test',
        'url_adicional',
    ];

    // Relación con el modelo TipoTest
    public function tipoTest()
    {
        return $this->belongsTo(TipoTest::class, 'tipotest_id');
    }

    public function pregunta()
    {
        return $this->hasMany(Pregunta::class, 'id_test');
    }
}
