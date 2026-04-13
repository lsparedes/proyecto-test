<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddModuloToTestsTable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('test') || Schema::hasColumn('test', 'modulo')) {
            return;
        }

        Schema::table('test', function (Blueprint $table) {
            $table->unsignedTinyInteger('modulo')->default(1)->after('tipotest_id');
        });
    }

    public function down()
    {
        if (!Schema::hasTable('test') || !Schema::hasColumn('test', 'modulo')) {
            return;
        }

        Schema::table('test', function (Blueprint $table) {
            $table->dropColumn('modulo');
        });
    }
}
