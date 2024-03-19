<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Metrica extends Model
{
    use HasFactory;

    protected $table = 'metrica';

    protected $fillable = [
        'nombre_metrica',
        'peso_metrica',
        'descripcion_metrica',
        'id_criterio_evaluacion',
    ];

    public function criterioEvaluacion()
    {
        return $this->belongsTo(CriterioEvaluacion::class, 'id_criterio_evaluacion');
    }
}
