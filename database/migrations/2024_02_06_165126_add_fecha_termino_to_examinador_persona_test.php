<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFechaTerminoToExaminadorPersonaTest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('examinador_persona_test', function (Blueprint $table) {
            $table->dateTime('fecha_termino')->nullable()->after('fecha_observacion');
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
        });
    }
}
