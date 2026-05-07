<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TipoTestTableSeeder extends Seeder
{
    public function run()
    {
        $validColumns = array_flip(Schema::getColumnListing('tipo_test'));

        foreach ($this->rowsFromCatalog('tipo_test') as $row) {
            $row = array_intersect_key($row, $validColumns);

            DB::table('tipo_test')->updateOrInsert(
                ['id' => $row['id']],
                array_merge($row, ['id' => $row['id']])
            );
        }
    }

    private function rowsFromCatalog(string $table): array
    {
        $catalog = require database_path('seeders/data/neurotest_catalog.php');

        return $catalog[$table] ?? [];
    }
}
