import React, { useState } from 'react';
import Buscar from './components/Buscar';
import Resultados from './components/Resultados';
import Reserva from './components/Reserva';
import axios from 'axios';

axios.defaults.withCredentials = true;  // Esto permite enviar cookies con cada solicitud


const App = () => {
    const [searchParams, setSearchParams] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [reservationData, setReservationData] = useState(null);

    const handleSearch = (params) => {
        try {
            // Extraer solo el código IATA de los valores de departure y arrival
            const extractIataCode = (input) => {
                const match = input.match(/\(([^)]+)\)/);
                return match ? match[1] : input; // Devuelve el código IATA si lo encuentra, o el input completo
            };

            // Calcula el total de pasajeros
            const totalPassengers = (params.adults || 1) + (params.children || 0) + (params.infants || 0);

            // Ajusta el payload incluyendo qtyPassengers
            const formattedParams = {
                direct: false,
                currency: "COP",
                searchs: 50,
                class: false,
                qtyPassengers: totalPassengers, // Total de pasajeros
                adult: params.adults || 1,
                child: params.children || 0,
                baby: params.infants || 0,
                seat: 0,
                itinerary: [
                    {
                        departureCity: extractIataCode(params.departure),
                        arrivalCity: extractIataCode(params.arrival),
                        hour: `${params.date}T${params.time}:00.000Z`
                    }
                ]
            };

            console.log('Parámetros de búsqueda:', JSON.stringify(formattedParams, null, 2));
            setSearchParams(formattedParams);
        } catch (error) {
            console.error("Error formateando los parámetros:", error);
        }
    };

    const handleSelectFlight = (flight) => {
        setSelectedFlight(flight);
    };


    
    const handleSave = async (reservation) => {
        try {
            // Obtener el token CSRF (opcional si usas Sanctum para autenticar la SPA)
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    
            // Definir la reserva formateada
            const formattedReservation = {
                nombre_cliente: reservation.passengerName,
                email: reservation.email,
                adultos: 1,
                ninos: 0,
                infantes: 0,
                ciudad_salida: reservation.flightDetails.departureCity,
                ciudad_destino: reservation.flightDetails.arrivalCity,
                fecha_hora_vuelo: reservation.flightDetails.date + reservation.flightDetails.time,
                detalles_vuelo: JSON.stringify(reservation.flightDetails)
            };
    
            // Realizar la solicitud POST para guardar la reserva
            const response = await axios.post('http://localhost:8000/api/reservas', formattedReservation, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('Reserva guardada en el servidor:', response.data);
        } catch (error) {
            if (error.response) {
                console.error('Respuesta del servidor:', error.response.data);
            } else if (error.request) {
                console.error('Solicitud realizada, sin respuesta:', error.request);
            } else {
                console.error('Error configurando la solicitud:', error.message);
            }
        }
    };
    

    return (
        <div>
            <h1>Sistema de Reservas de Vuelos</h1>
            <Buscar onSearch={handleSearch} />
            {searchParams && (
                <Resultados
                    searchParams={searchParams}
                    onSelectFlight={handleSelectFlight}
                />
            )}
            {selectedFlight && (
                <Reserva
                    onSave={handleSave}
                    flightDetails={selectedFlight}
                />
            )}
            {reservationData && (
                <div>
                    <h2>Detalles de la Reserva Guardada</h2>
                    <pre>{JSON.stringify(reservationData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
