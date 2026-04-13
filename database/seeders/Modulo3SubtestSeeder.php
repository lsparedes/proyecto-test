<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Modulo3SubtestSeeder extends Seeder
{
    public function run()
    {
        $partIds = DB::table('modulo3_parts')->pluck('id', 'slug');

        if ($partIds->isEmpty()) {
            return;
        }

        $subtests = [
            [
                'part_slug' => 'procesos-motores-basicos',
                'slug' => 'evaluacion-orofacial',
                'title' => 'Evaluacion Orofacial',
                'subtitle' => 'Part 1',
                'description' => 'Placeholder para observacion estructurada de funciones orofaciales.',
                'instructions' => 'Aqui se conectaran formularios, assets y criterios clinicos especificos.',
                'sort_order' => 1,
            ],
            [
                'part_slug' => 'procesos-motores-basicos',
                'slug' => 'evaluacion-integrada-respiracion-fonacion-resonancia',
                'title' => 'Evaluacion Integrada de la Respiracion, la Fonacion y la Resonancia',
                'subtitle' => 'Part 1',
                'description' => 'Placeholder para integrar observaciones respiratorias, fonatorias y de resonancia.',
                'instructions' => 'Pendiente de conectar assets, grabacion y logica de evaluacion.',
                'sort_order' => 2,
            ],
            [
                'part_slug' => 'evaluacion-motora-del-habla',
                'slug' => 'volumen-creciente',
                'title' => 'Volumen creciente',
                'subtitle' => 'Part 2',
                'description' => 'Placeholder para una tarea guiada con control progresivo de intensidad.',
                'instructions' => 'Pendiente de instrucciones definitivas y captura de resultados.',
                'sort_order' => 1,
            ],
            [
                'part_slug' => 'evaluacion-motora-del-habla',
                'slug' => 'habla-automatica',
                'title' => 'Habla automatica',
                'subtitle' => 'Part 2',
                'description' => 'Placeholder para secuencias automaticas del habla.',
                'instructions' => 'Pendiente de texto, metrificacion y assets de apoyo.',
                'sort_order' => 2,
            ],
            [
                'part_slug' => 'evaluacion-motora-del-habla',
                'slug' => 'repeticion-de-silabas-diadococinesia',
                'title' => 'Repeticion de silabas - diadococinesia',
                'subtitle' => 'Part 2',
                'description' => 'Placeholder para repeticion secuencial y alternante de silabas.',
                'instructions' => 'Pendiente de cronometraje y captura de desempeno.',
                'sort_order' => 3,
            ],
            [
                'part_slug' => 'evaluacion-motora-del-habla',
                'slug' => 'lectura',
                'title' => 'Lectura',
                'subtitle' => 'Part 2',
                'description' => 'Placeholder para lectura guiada con posterior analisis.',
                'instructions' => 'Pendiente de cargar textos y logica de evaluacion.',
                'sort_order' => 4,
            ],
            [
                'part_slug' => 'evaluacion-motora-del-habla',
                'slug' => 'diptongos',
                'title' => 'Diptongos',
                'subtitle' => 'Part 2',
                'description' => 'Placeholder para tarea focalizada en produccion de diptongos.',
                'instructions' => 'Pendiente de banco de items y scoring.',
                'sort_order' => 5,
            ],
            [
                'part_slug' => 'evaluacion-motora-del-habla',
                'slug' => 'palabras-polisilabicas',
                'title' => 'Palabras polisilabicas',
                'subtitle' => 'Part 2',
                'description' => 'Placeholder para produccion de palabras de mayor complejidad silabica.',
                'instructions' => 'Pendiente de lista de estimulos y criterios de analisis.',
                'sort_order' => 6,
            ],
            [
                'part_slug' => 'evaluacion-motora-del-habla',
                'slug' => 'palabras-con-longitud-creciente',
                'title' => 'Palabras con longitud creciente',
                'subtitle' => 'Part 2',
                'description' => 'Placeholder para serie progresiva de longitud lexical.',
                'instructions' => 'Pendiente de definir escalas y respuesta esperada.',
                'sort_order' => 7,
            ],
            [
                'part_slug' => 'evaluacion-motora-del-habla',
                'slug' => 'pseudopalabras',
                'title' => 'Pseudopalabras',
                'subtitle' => 'Part 2',
                'description' => 'Placeholder para repeticion o lectura de pseudopalabras.',
                'instructions' => 'Pendiente de corpus y metrica de produccion.',
                'sort_order' => 8,
            ],
            [
                'part_slug' => 'evaluacion-motora-del-habla',
                'slug' => 'repeticion-de-frases',
                'title' => 'Repeticion de frases',
                'subtitle' => 'Part 2',
                'description' => 'Placeholder para repeticion guiada de frases.',
                'instructions' => 'Pendiente de materiales y validacion de respuesta.',
                'sort_order' => 9,
            ],
            [
                'part_slug' => 'evaluacion-motora-del-habla',
                'slug' => 'lectura-de-frases',
                'title' => 'Lectura de frases',
                'subtitle' => 'Part 2',
                'description' => 'Placeholder para lectura de frases con analisis posterior.',
                'instructions' => 'Pendiente de assets textuales y logica de evaluacion.',
                'sort_order' => 10,
            ],
            [
                'part_slug' => 'habla-conectada',
                'slug' => 'descripcion-de-una-imagen',
                'title' => 'Descripcion de una imagen',
                'subtitle' => 'Part 3',
                'description' => 'Placeholder para elicitacion discursiva a partir de una imagen.',
                'instructions' => 'Pendiente de conectar imagenes y captura de audio/video.',
                'sort_order' => 1,
            ],
            [
                'part_slug' => 'habla-conectada',
                'slug' => 'narracion-de-una-historia',
                'title' => 'Narracion de una historia',
                'subtitle' => 'Part 3',
                'description' => 'Placeholder para relato estructurado basado en historia.',
                'instructions' => 'Pendiente de assets narrativos y rubricado clinico.',
                'sort_order' => 2,
            ],
            [
                'part_slug' => 'habla-conectada',
                'slug' => 'narracion-personal',
                'title' => 'Narracion personal',
                'subtitle' => 'Part 3',
                'description' => 'Placeholder para produccion de narracion autobiografica guiada.',
                'instructions' => 'Pendiente de prompts y logica de analisis.',
                'sort_order' => 3,
            ],
        ];

        foreach ($subtests as $subtest) {
            $partId = $partIds[$subtest['part_slug']] ?? null;

            if (!$partId) {
                continue;
            }

            DB::table('modulo3_subtests')->updateOrInsert(
                ['slug' => $subtest['slug']],
                [
                    'modulo3_part_id' => $partId,
                    'title' => $subtest['title'],
                    'subtitle' => $subtest['subtitle'],
                    'description' => $subtest['description'],
                    'instructions' => $subtest['instructions'],
                    'status' => 'placeholder',
                    'placeholder_note' => 'Pendiente de integrar assets reales, grabacion y logica final de evaluacion.',
                    'sort_order' => $subtest['sort_order'],
                    'is_active' => true,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }
    }
}
