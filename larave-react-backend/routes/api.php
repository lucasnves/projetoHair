<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LoadSync;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logoutUser']);
});

Route::get('/companies', [LoadSync::class, 'getCompanies']);
Route::post('/company', [LoadSync::class, 'getCompany']);
Route::post('/company-hairdressers', [LoadSync::class, 'getCompanyHairdressers']);
Route::post('/login', [AuthController::class, 'loginUser']);