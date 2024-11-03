<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_cliente');
            $table->string('email');
            $table->integer('adultos');
            $table->integer('ninos');
            $table->integer('infantes');
            $table->string('ciudad_salida');
            $table->string('ciudad_destino');
            $table->string('fecha_hora_vuelo');
            $table->json('detalles_vuelo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
