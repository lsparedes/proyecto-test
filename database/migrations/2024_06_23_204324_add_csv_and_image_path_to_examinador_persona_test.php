<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCsvAndImagePathToExaminadorPersonaTest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('examinador_persona_test', function (Blueprint $table) {
            $table->string('csv_path')->nullable(); // Nueva columna para el archivo CSV
            $table->json('image_path')->nullable(); // Nueva columna para las rutas de imágenes (usando JSON)
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
            $table->dropColumn('csv_path');
            $table->dropColumn('image_path');
        });
    }
}
