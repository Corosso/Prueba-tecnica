<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\ReservaController;

Route::post('/reservas', [ReservaController::class, 'store']);


Route::middleware(['custom-cors'])->group(function () {
    Route::post('/reservas', [ReservaController::class, 'store']);
});
