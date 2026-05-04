<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MakeTestOptionalUrlColumnsNullable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('test')) {
            return;
        }

        Schema::table('test', function (Blueprint $table) {
            if (!Schema::hasColumn('test', 'nombre_url')) {
                $table->string('nombre_url')->nullable()->after('url_adicional');
            }

            if (!Schema::hasColumn('test', 'nombre_url_opcional')) {
                $table->string('nombre_url_opcional')->nullable()->after('nombre_url');
            }
        });

        if (DB::getDriverName() !== 'mysql') {
            return;
        }

        foreach ([
            'url_test',
            'url_adicional',
            'nombre_url',
            'nombre_url_opcional',
            'link_millisecond',
            'link_millisecond2',
        ] as $column) {
            if (Schema::hasColumn('test', $column)) {
                DB::statement("ALTER TABLE `test` MODIFY `{$column}` VARCHAR(255) NULL");
            }
        }
    }

    public function down()
    {
        if (!Schema::hasTable('test')) {
            return;
        }

        Schema::table('test', function (Blueprint $table) {
            if (Schema::hasColumn('test', 'nombre_url_opcional')) {
                $table->dropColumn('nombre_url_opcional');
            }

            if (Schema::hasColumn('test', 'nombre_url')) {
                $table->dropColumn('nombre_url');
            }
        });
    }
}
