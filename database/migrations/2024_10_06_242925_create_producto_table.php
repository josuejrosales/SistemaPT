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
        Schema::create('producto', function (Blueprint $table) {
            $table->id();
            $table->string('Nombre');
            $table->text('Descripcion')->nullable(true);
            $table->decimal('Precio', 10, 2);
            $table->integer('Stock')->default(0);
            $table->text('Photo')->nullable(true);
            $table->bigInteger('IdCategoria')->unsigned()->nullable(false);
            $table->bigInteger('IdSubCategoria')->unsigned()->nullable(false);

            $table->foreign('IdCategoria')->references('id')->on('categoria')->onDelete('restrict');
            $table->foreign('IdSubCategoria')->references('id')->on('sub_categoria')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto');
    }
};
