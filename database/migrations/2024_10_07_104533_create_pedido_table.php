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
        Schema::create('pedido', function (Blueprint $table) {
            $table->id();
            $table->decimal('SubTotal', 8, 2);
            $table->decimal('Descuento', 8, 2)->nullable();
            $table->decimal('Impuesto', 8, 2);
            $table->decimal('Total', 8, 2);
            $table->string('Estado');
            $table->bigInteger('IdMetodoPago')->unsigned()->nullable(false);
            $table->bigInteger('IdCliente')->unsigned()->nullable(false);
            $table->timestamps();

            $table->foreign('IdCliente')->references('id')->on('cliente')->onDelete('restrict');
            $table->foreign('IdMetodoPago')->references('id')->on('metodo_pago')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pedido');
    }
};
