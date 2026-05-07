<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Modulo3SubtestSeeder extends Seeder
{
    public function run()
    {
        $catalog = require database_path('seeders/data/neurotest_catalog.php');
        $validColumns = array_flip(Schema::getColumnListing('modulo3_subtests'));

        foreach ($catalog['modulo3_subtests'] ?? [] as $subtest) {
            $subtest = array_intersect_key($subtest, $validColumns);
            DB::table('modulo3_subtests')->updateOrInsert(
                ['id' => $subtest['id']],
                array_merge($subtest, ['id' => $subtest['id']])
            );
        }
    }
}
