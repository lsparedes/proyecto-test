<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formula extends Model
{
    use HasFactory;

    protected $table = 'formula';

    protected $fillable = [
        'nombre_formula',
        'expresion_formula',
        'peso_formula',
        'id_criterio_evaluacion',
    ];

    public function criterioEvaluacion()
    {
        return $this->belongsTo(CriterioEvaluacion::class, 'id_criterio_evaluacion');
    }
}
