<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExaminadorPersonaTest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examinador_persona_test', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('test_id')->references('id')->on('test')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('persons_id')->references('id')->on('persons')->onUpdate('cascade')->onDelete('cascade');
            $table->text('observacion');
            $table->text('fecha_observacion');
            $table->integer('puntuacion');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('examinador_persona_test');
    }
}
