<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Modulo3SystemTestSeeder extends Seeder
{
    public function run()
    {
        $tests = [
            [
                'name_test' => 'Procesos Motores Basicos',
                'nombre_espa' => 'Procesos Motores Basicos',
                'descripcion_individual' => 'Incluye Evaluacion Orofacial y Evaluacion Integrada de la Respiracion, la Fonacion y la Resonancia.',
                'points' => 0,
                'duracion_minutos' => 15,
                'tipotest_id' => 19,
                'modulo' => 3,
                'url_test' => 'tests/modulo3/run.html?part=1',
                'url_adicional' => 'tests/modulo3/run.html?part=2',
                'nombre_url' => 'Parte 1',
                'nombre_url_opcional' => 'Parte 2',
            ],
            [
                'name_test' => 'Evaluacion Motora del Habla',
                'nombre_espa' => 'Evaluacion Motora del Habla',
                'descripcion_individual' => 'Incluye volumen creciente, habla automatica, diadococinesia, lectura, diptongos, palabras polisilabicas, palabras con longitud creciente, pseudopalabras, repeticion de frases y lectura de frases.',
                'points' => 0,
                'duracion_minutos' => 30,
                'tipotest_id' => 21,
                'modulo' => 3,
                'url_test' => null,
                'url_adicional' => null,
                'nombre_url' => 'Abrir parte',
                'nombre_url_opcional' => null,
            ],
            [
                'name_test' => 'Habla Conectada',
                'nombre_espa' => 'Habla Conectada',
                'descripcion_individual' => 'Incluye Descripcion de una imagen, Narracion de una historia y Narracion personal.',
                'points' => 0,
                'duracion_minutos' => 20,
                'tipotest_id' => 21,
                'modulo' => 3,
                'url_test' => null,
                'url_adicional' => null,
                'nombre_url' => 'Abrir parte',
                'nombre_url_opcional' => null,
            ],
        ];

        foreach ($tests as $test) {
            $validColumns = array_flip(Schema::getColumnListing('test'));
            $test = array_intersect_key($test, $validColumns);

            DB::table('test')->updateOrInsert(
                ['name_test' => $test['name_test']],
                array_intersect_key(array_merge($test, [
                    'link_millisecond' => null,
                    'link_millisecond2' => null,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]), $validColumns)
            );
        }
    }
}
