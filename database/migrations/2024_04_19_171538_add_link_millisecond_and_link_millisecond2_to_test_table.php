<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLinkMillisecondAndLinkMillisecond2ToTestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('test', function (Blueprint $table) {
            $table->string('link_millisecond')->nullable()->after('url_adicional');
            $table->string('link_millisecond2')->nullable()->after('link_millisecond');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('test', function (Blueprint $table) {
            $table->dropColumn('link_millisecond');
            $table->dropColumn('link_millisecond2');
        });
    }
}
