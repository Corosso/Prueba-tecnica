<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


use App\Http\Controllers\ReservaController;


//ruta para el post para ingresar la reserva a la base de datos
Route::post('/reservas', [ReservaController::class, 'store']);


//ruta para autorizar el CORS
Route::middleware(['custom-cors'])->group(function () {
    Route::post('/reservas', [ReservaController::class, 'store']);
});
