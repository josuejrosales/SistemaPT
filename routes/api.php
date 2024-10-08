<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\DetallePedidoController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\MetodoPagoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\SubCategoriaController;

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::resource("/categorias", CategoriaController::class);
    Route::resource("/subcategorias", SubCategoriaController::class);
    Route::resource("/productos", ProductoController::class);
    Route::resource("/clientes", ClienteController::class);

    Route::resource("/metodo_pago", MetodoPagoController::class);
    Route::resource("/detalle_pedido", DetallePedidoController::class);
    Route::resource("/pedidos", PedidoController::class);
    Route::get("/productos-filters", [ProductoController::class, 'filters']);

    Route::post("/producto-image/{id}", [ImageController::class, 'storeProducto']);
});
