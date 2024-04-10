<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFuenteAndIconoToTipoTest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tipo_test', function (Blueprint $table) {
            $table->string('fuente')->nullable()->after('audio_instruccion');
            $table->string('icono')->nullable()->after('fuente');
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
            $table->dropColumn('icono');
            $table->dropColumn('fuente');
        });
    }
}

