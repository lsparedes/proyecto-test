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
        'nombre_espa',
        'descripcion_individual',
        'points',
        'duracion_minutos',
        'tipotest_id',
        'modulo',
        'url_test',
        'url_adicional',
        'link_millisecond',
        'link_millisecond2',
        'nombre_url',
        'nombre_url_opcional',
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
