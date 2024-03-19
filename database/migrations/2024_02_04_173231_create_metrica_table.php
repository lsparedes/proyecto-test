<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMetricaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('metrica', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_metrica', 50);
            $table->float('peso_metrica');
            $table->string('descripcion_metrica', 255);
            $table->foreignId('id_criterio_evaluacion')->references('id')->on('criterio_evaluacion')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('metrica');
    }
}
