<?php

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::get('/login', LoginController::class)->name('login');
Route::post('/login-in', [LoginController::class, 'LoginIn'])->name('LoginIn');
Route::get('/login-close', [LoginController::class, 'LoginClose']);


Route::fallback(fn() => view('welcome'))->middleware(['auth', 'web-access']);
