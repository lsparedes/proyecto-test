<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCriterioEvaluacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criterio_evaluacion', function (Blueprint $table) {
            $table->id();
            $table->string('Nombre_Criterio', 50);
            $table->string('Descripcion_Criterio', 255)->nullable();
            $table->timestamps(); // Esto agregará las columnas created_at y updated_at automáticamente
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('criterio_evaluacion');
    }
}
