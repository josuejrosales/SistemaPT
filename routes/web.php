<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get("/", fn() => view("welcome"));

Route::middleware(['auth'])->group(function () {

    Route::get('/login-close', [LoginController::class, 'destroy']);

    Route::group(["prefix" => "/dashboard"], function () {
        Route::get("/{param?}", fn() => view("dashboard"))
            ->where('param', 'reportes|home|productos|clientes|pedidos|mantenimiento');
    });
});

Route::middleware(['not-auth'])->group(function () {

    Route::get('/login', [LoginController::class, "index"])->name("login");

    Route::post('/login', [LoginController::class, "store"]);

    Route::resource('/register', RegisterController::class);
});
