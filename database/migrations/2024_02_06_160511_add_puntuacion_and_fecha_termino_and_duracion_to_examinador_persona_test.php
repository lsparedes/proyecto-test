<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPuntuacionAndFechaTerminoAndDuracionToExaminadorPersonaTest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('examinador_persona_test', function (Blueprint $table) {
            $table->integer('fecha_termino')->nullable()->after('fecha_observacion');
            $table->integer('puntuacion')->nullable()->after('fecha_termino');
            $table->integer('duracion')->nullable()->after('puntuacion');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('examinador_persona_test', function (Blueprint $table) {
            $table->dropColumn('fecha_termino');
            $table->dropColumn('puntuacion');
            $table->dropColumn('duracion');
        });
    }
}

