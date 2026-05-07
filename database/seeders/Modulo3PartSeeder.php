<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Modulo3PartSeeder extends Seeder
{
    public function run()
    {
        $catalog = require database_path('seeders/data/neurotest_catalog.php');
        $validColumns = array_flip(Schema::getColumnListing('modulo3_parts'));

        foreach ($catalog['modulo3_parts'] ?? [] as $part) {
            $part = array_intersect_key($part, $validColumns);

            DB::table('modulo3_parts')->updateOrInsert(
                ['id' => $part['id']],
                array_merge($part, ['id' => $part['id']])
            );
        }
    }
}
