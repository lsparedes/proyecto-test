<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('test', function (Blueprint $table) {
            $table->text('descripcion_individual')->nullable()->after('nombre_espa');
        });
    }

    public function down(): void
    {
        Schema::table('test', function (Blueprint $table) {
            $table->dropColumn('descripcion_individual');
        });
    }
};