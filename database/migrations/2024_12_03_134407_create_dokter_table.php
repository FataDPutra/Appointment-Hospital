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
        Schema::create('dokter', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            // $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('nama');
            $table->string('alamat');
            $table->string('no_hp');
            $table->integer('id_poli')->nullable();
            $table->enum('role', ['admin', 'dokter'])->default('dokter');

            // $table->integer('id_user');
            $table->rememberToken();
            $table->timestamps();

            // $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_poli')->references('id')->on('poli')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokter');
    }
};
