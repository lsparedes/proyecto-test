<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

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
        'csv_path',
        'image_path', // Nombre de la columna en la base de datos
        'audio_path',
    ];

    protected $dates = [
        'fecha_observacion',
        'fecha_termino',
    ];

    // Decodificar el atributo de rutas de imagen cuando se accede
    public function getImagePathAttribute($value)
    {
        return json_decode($value, true) ?: []; // Decodificar el JSON a un array PHP
    }

    // Codificar el atributo de rutas de imagen cuando se guarda
    public function setImagePathAttribute($value)
    {
        $this->attributes['image_path'] = json_encode($value); // Codificar el array PHP a JSON
    }

     // Decodificar el atributo de rutas de audio cuando se accede
     public function getAudioPathAttribute($value)
     {
         return json_decode($value, true) ?: [];
     }

     // Codificar el atributo de rutas de audio cuando se guarda
     public function setAudioPathAttribute($value)
     {
         $this->attributes['audio_path'] = json_encode($value);
     }

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
