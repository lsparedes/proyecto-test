<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoTestTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {


        DB::table('tipo_test')->delete();

        DB::table('tipo_test')->insert(array (
            0 =>
            array (
                'id' => 1,
                'descripcion' => 'Metacognition',
                'num_test' => 2,
                'descripcion_test' => 'El test de metacognición en discriminación perceptiva tiene como propósito evaluar la capacidad de los individuos para monitorizar y regular su propio proceso cognitivo durante tareas específicas de discriminación perceptiva.',
                'instruccion_test' => 'Para realizar este test, debes mantenerte enfocado durante toda la duración de este, para así lograr un puntaje optimo, su duración es de 5 minutos.',
                'audio_instruccion' => '1707315549.mp3',
                'created_at' => '2024-02-07 14:19:09',
                'updated_at' => '2024-02-07 14:19:09',
            ),
            1 =>
            array (
                'id' => 2,
                'descripcion' => 'Decision making',
                'num_test' => 3,
            'descripcion_test' => 'El problema implica un tomador de decisiones (agente) que se enfrenta a la elección entre dos acciones u opciones, cada una asociada con una distribución de recompensas desconocida. El objetivo del tomador de decisiones es aprender cuál acción proporciona la mayor recompensa esperada y utilizar este conocimiento para maximizar las recompensas.',
                'instruccion_test' => 'Para realizar este test, debes mantenerte enfocado durante toda la duración de este, para así lograr un puntaje optimo, su duración es de 5 minutos.',
                'audio_instruccion' => '1707315572.mp3',
                'created_at' => '2024-02-07 14:19:32',
                'updated_at' => '2024-02-07 14:19:32',
            ),
            2 =>
            array (
                'id' => 3,
                'descripcion' => 'Cancellation tasks',
                'num_test' => 7,
            'descripcion_test' => 'Los Tareas de Cancelación son pruebas neuropsicológicas diseñadas para evaluar diferentes aspectos de la atención, concentración y funciones ejecutivas. En el contexto de "Letters & Bells", estas tareas suelen implicar la búsqueda y marcado de objetivos específicos (como letras o símbolos) entre distracciones.',
                'instruccion_test' => 'Para realizar este test, debes mantenerte enfocado durante toda la duración de este, para así lograr un puntaje optimo, su duración es de 5 minutos.',
                'audio_instruccion' => '1707315591.mp3',
                'created_at' => '2024-02-07 14:19:51',
                'updated_at' => '2024-02-07 14:19:51',
            ),
            3 =>
            array (
                'id' => 4,
                'descripcion' => 'VIENNA',
                'num_test' => 13,
                'descripcion_test' => 'La Virtual Environments Navigation Assessment es una herramienta utilizada para evaluar las habilidades de navegación de las personas en entornos virtuales. Estos entornos pueden ser simulaciones de lugares reales, como calles o edificios, o mundos completamente ficticios creados por ordenador.',
                'instruccion_test' => 'Para realizar este test, debes mantenerte enfocado durante toda la duración de este, para así lograr un puntaje optimo, su duración es de 5 minutos.',
                'audio_instruccion' => '1707315716.mp3',
                'created_at' => '2024-02-07 14:21:56',
                'updated_at' => '2024-02-07 14:21:56',
            ),
            4 =>
            array (
                'id' => 5,
                'descripcion' => 'Glasgow face matching test',
                'num_test' => 15,
                'descripcion_test' => 'Es una medida de la capacidad de los participantes para identificar si dos caras son la misma persona o no. Cada pregunta presenta dos imágenes de la misma persona o de dos personas diferentes. Los participantes deben responder a cada par de caras indicando si las dos caras son la misma persona o dos personas diferentes.',
                'instruccion_test' => 'Para realizar este test, debes mantenerte enfocado durante toda la duración de este, para así lograr un puntaje optimo, su duración es de 5 minutos.',
                'audio_instruccion' => '1707315747.mp3',
                'created_at' => '2024-02-07 14:22:27',
                'updated_at' => '2024-02-07 14:22:27',
            ),
        ));


    }
}
