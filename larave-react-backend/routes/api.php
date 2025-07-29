<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LoadController;
use App\Http\Controllers\Api\SyncController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logoutUser']);
    Route::post('/make-appointment', [SyncController::class, 'make_appointment']);
    Route::post('/get-appointment', [LoadController::class, 'get_appointment']);
    Route::post('/get-all-appointments-user', [LoadController::class, 'get_all_appointments_user']);
});
Route::post('/login', [AuthController::class, 'loginUser']);

Route::get('/companies', [LoadController::class, 'get_companies']);
Route::post('/company', [LoadController::class, 'get_company']);
Route::post('/company-team', [LoadController::class, 'get_company_team']);