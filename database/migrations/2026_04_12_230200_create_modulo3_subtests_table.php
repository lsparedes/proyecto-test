<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('modulo3_subtests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('modulo3_part_id')->constrained('modulo3_parts')->cascadeOnDelete();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->text('instructions')->nullable();
            $table->string('status', 50)->default('placeholder');
            $table->text('placeholder_note')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('modulo3_subtests');
    }
};
