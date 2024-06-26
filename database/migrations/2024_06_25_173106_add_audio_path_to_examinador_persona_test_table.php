<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAudioPathToExaminadorPersonaTestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('examinador_persona_test', function (Blueprint $table) {
            $table->json('audio_path')->nullable()->after('image_path'); // Añade la columna después de image_path
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
            $table->dropColumn('audio_path');
        });
    }
}
