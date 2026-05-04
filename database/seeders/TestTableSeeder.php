<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TestTableSeeder extends Seeder
{
    public function run()
    {
        $validColumns = array_flip(Schema::getColumnListing('test'));

        foreach ($this->rowsFromDump('test') as $row) {
            $row = array_intersect_key($row, $validColumns);

            DB::table('test')->updateOrInsert(
                ['id' => $row['id']],
                array_merge($row, ['id' => $row['id']])
            );
        }
    }

    private function rowsFromDump(string $table): array
    {
        $dumpPath = base_path('proyecto_test3.sql');
        if (!file_exists($dumpPath)) {
            throw new \RuntimeException("No se encontro {$dumpPath}; no se puede sembrar {$table} sin desactualizar el catalogo.");
        }

        $sql = file_get_contents($dumpPath);
        $pattern = '/INSERT INTO `' . preg_quote($table, '/') . '` \((.*?)\) VALUES\s*(.*?);/s';
        if (!preg_match($pattern, $sql, $matches)) {
            return [];
        }

        $columns = array_map(
            fn ($column) => trim($column, " `\t\n\r\0\x0B"),
            explode(',', $matches[1])
        );

        preg_match_all('/\((.*?)\)(?:,|$)/s', $matches[2], $rowMatches);
        $rows = [];

        foreach ($rowMatches[1] as $rowSql) {
            $values = str_getcsv($rowSql, ',', "'", "\\");
            $row = [];

            foreach ($columns as $index => $column) {
                $value = $values[$index] ?? null;
                $value = is_string($value) ? trim($value) : $value;
                $row[$column] = strtoupper((string) $value) === 'NULL' ? null : $value;
            }

            foreach (['id', 'modulo', 'points', 'duracion_minutos', 'tipotest_id'] as $integerColumn) {
                if (isset($row[$integerColumn]) && $row[$integerColumn] !== null) {
                    $row[$integerColumn] = (int) $row[$integerColumn];
                }
            }

            $rows[] = $row;
        }

        return $rows;
    }
}
