<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    public function store(Request $request)
    {
        // Validar los datos
        $validatedData = $request->validate([
            'nombre_cliente' => 'required|string',
            'email' => 'required|email',
            'adultos' => 'required|integer',
            'ninos' => 'required|integer',
            'infantes' => 'required|integer',
            'ciudad_salida' => 'required|string',
            'ciudad_destino' => 'required|string',
            'fecha_hora_vuelo' => 'required|string',
            'detalles_vuelo' => 'required|json',
        ]);

        // Crear una nueva reserva
        $reserva = Reserva::create($validatedData);

        return response()->json(['message' => 'Reserva guardada con éxito', 'reserva' => $reserva], 201);
    }
}
