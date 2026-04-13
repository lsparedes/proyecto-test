<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Modulo3PartSeeder extends Seeder
{
    public function run()
    {
        $parts = [
            [
                'slug' => 'procesos-motores-basicos',
                'title' => 'Part 1: Procesos Motores Basicos',
                'description' => 'Base estructural para pruebas de evaluacion orofacial y de respiracion, fonacion y resonancia.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'evaluacion-motora-del-habla',
                'title' => 'Part 2: Evaluacion Motora del Habla',
                'description' => 'Contiene placeholders para tareas guiadas de produccion motora del habla.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'habla-conectada',
                'title' => 'Part 3: Habla Conectada',
                'description' => 'Espacio base para tareas de descripcion y narracion en contexto.',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($parts as $part) {
            DB::table('modulo3_parts')->updateOrInsert(
                ['slug' => $part['slug']],
                array_merge($part, [
                    'updated_at' => now(),
                    'created_at' => now(),
                ])
            );
        }
    }
}
