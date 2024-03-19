<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToTipoTestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tipo_test', function (Blueprint $table) {
            $table->integer('num_test')->after('descripcion');
            $table->text('descripcion_test')->after('num_test');
            $table->text('instruccion_test')->after('descripcion_test');
            $table->string('audio_instruccion')->default(null)->after('instruccion_test');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tipo_test', function (Blueprint $table) {
            //
        });
    }
}
