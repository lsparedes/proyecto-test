<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInstruccionesAdicionalesAndEnlaceDescargaToTipoTestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tipo_test', function (Blueprint $table) {
            $table->string('instrucciones_adicionales')->nullable()->after('instruccion_test');
            $table->string('enlace_descarga')->nullable()->after('instrucciones_adicionales');
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
            $table->dropColumn('instrucciones_adicionales');
            $table->dropColumn('enlace_descarga');
        });
    }
}
