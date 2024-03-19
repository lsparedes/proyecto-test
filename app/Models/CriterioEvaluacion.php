<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CriterioEvaluacion extends Model
{
    use HasFactory;

    protected $table = 'criterio_evaluacion';

    protected $primaryKey = 'id';

    protected $fillable = [
        'Nombre_Criterio',
        'Descripcion_Criterio',
    ];


}
