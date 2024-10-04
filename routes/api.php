<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'module-access'])->group(function () {
    Route::get("/hola", function () {
        return "hola mundo";
    });
});
