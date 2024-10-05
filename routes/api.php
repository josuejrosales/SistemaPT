<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'web-access'])->group(function () {
    Route::get("/getUser", function () {
        return Auth::user();
    });
});
