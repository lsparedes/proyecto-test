<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNombreEspAndImplementacionToTipoTestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tipo_test', function (Blueprint $table) {
            $table->string('nombre_esp')->nullable();
            $table->string('implementacion')->nullable();
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
            $table->dropColumn('nombre_esp');
            $table->dropColumn('implementacion'); 
        });
    }
}
