<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCriterioEvaluacionTestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criterio_evaluacion_test', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_criterio_evaluacion')->references('id')->on('criterio_evaluacion')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('id_test')->references('id')->on('test')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('criterio_evaluacion_test');
    }
}
