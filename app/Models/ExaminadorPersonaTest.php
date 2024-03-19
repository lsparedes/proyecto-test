<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ExaminadorPersonaTest extends Model
{
    use HasFactory;

    protected $table = 'examinador_persona_test';

    protected $fillable = [
        'users_id',
        'test_id',
        'persons_id',
        'observacion',
        'fecha_observacion',
        'fecha_termino',
        'puntuacion',
        'duracion',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function test()
    {
        return $this->belongsTo(Test::class, 'test_id');
    }

    public function person()
    {
        return $this->belongsTo(Person::class, 'persons_id');
    }
}
