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
        Schema::create('detalle_pedido', function (Blueprint $table) {
            $table->id();
            $table->integer('Cantidad');
            $table->decimal('PrecioUnitario', 10, 2);
            $table->decimal('Total', 10, 2);

            $table->bigInteger('IdPedido')->unsigned()->nullable(false);
            $table->bigInteger('IdProducto')->unsigned()->nullable(false);

            $table->foreign('IdPedido')->references('id')->on('pedido')->onDelete('cascade');
            $table->foreign('IdProducto')->references('id')->on('producto')->onDelete('restrict');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_pedido');
    }
};
