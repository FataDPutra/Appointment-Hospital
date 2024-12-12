<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('daftar_poli', function (Blueprint $table) {
            $table->softDeletes(); // Menambahkan deleted_at untuk soft delete
        });
    }

    public function down()
    {
        Schema::table('daftar_poli', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
