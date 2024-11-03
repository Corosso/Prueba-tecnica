<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $fillable = [
        'nombre_cliente',
        'email',
        'adultos',
        'ninos',
        'infantes',
        'ciudad_salida',
        'ciudad_destino',
        'fecha_hora_vuelo',
        'detalles_vuelo',
    ];
}
