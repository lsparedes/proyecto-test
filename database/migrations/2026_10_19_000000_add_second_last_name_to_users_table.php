<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSecondLastNameToUsersTable extends Migration
{
    /**
     * Segundo apellido del usuario (examinador), necesario para las iniciales
     * NAA (Nombre, Apellido, Apellido) de los archivos descargados.
     * Es nullable para no afectar a los usuarios ya existentes.
     */
    public function up()
    {
        if (!Schema::hasTable('users') || Schema::hasColumn('users', 'second_last_name')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->string('second_last_name')->nullable()->after('last_name');
        });
    }

    public function down()
    {
        if (!Schema::hasTable('users') || !Schema::hasColumn('users', 'second_last_name')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('second_last_name');
        });
    }
}
