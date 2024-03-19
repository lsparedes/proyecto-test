<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {


        DB::table('test')->delete();

        DB::table('test')->insert(array (
            0 =>
            array (
                'id' => 1,
                'name_test' => 'Perceptual Discrimination',
                'points' => 20,
                'duracion_minutos' => 16,
                'tipotest_id' => 1,
                'created_at' => '2024-02-07 14:20:09',
                'updated_at' => '2024-02-07 14:20:09',
            ),
            1 =>
            array (
                'id' => 2,
                'name_test' => 'two-armed bandit',
                'points' => 50,
                'duracion_minutos' => 15,
                'tipotest_id' => 2,
                'created_at' => '2024-02-07 14:20:21',
                'updated_at' => '2024-02-07 14:20:21',
            ),
            2 =>
            array (
                'id' => 3,
                'name_test' => 'Letters & Bells',
                'points' => 60,
                'duracion_minutos' => 20,
                'tipotest_id' => 3,
                'created_at' => '2024-02-07 14:20:37',
                'updated_at' => '2024-02-07 14:20:37',
            ),
            3 =>
            array (
                'id' => 5,
                'name_test' => 'VIENNA',
                'points' => 30,
                'duracion_minutos' => 16,
                'tipotest_id' => 4,
                'created_at' => '2024-02-07 14:23:18',
                'updated_at' => '2024-02-07 14:23:18',
            ),
            4 =>
            array (
                'id' => 6,
                'name_test' => 'GFMT2-LOW',
                'points' => 40,
                'duracion_minutos' => 20,
                'tipotest_id' => 5,
                'created_at' => '2024-02-07 14:23:32',
                'updated_at' => '2024-02-07 14:23:32',
            ),
        ));


    }
}
