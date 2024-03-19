<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CriterioEvaluacionTest extends Model
{
    use HasFactory;

    protected $table = 'criterio_evaluacion_test';

    protected $fillable = [
        'id_criterio_evaluacion',
        'id_test',
    ];

    public function criterioEvaluacion()
    {
        return $this->belongsTo(CriterioEvaluacion::class, 'id_criterio_evaluacion');
    }

    public function test()
    {
        return $this->belongsTo(Test::class, 'id_test');
    }
}
