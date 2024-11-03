import React, { useState, useEffect } from 'react';

const Buscar = ({ onSearch }) => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [adults, setAdults] = useState(1); // Número de adultos
    const [children, setChildren] = useState(0); // Número de niños
    const [infants, setInfants] = useState(0); // Número de bebés
    const [errors, setErrors] = useState({});
    const [departureSuggestions, setDepartureSuggestions] = useState([]);
    const [arrivalSuggestions, setArrivalSuggestions] = useState([]);

    const fetchAirports = async (query, setSuggestions) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`https://staging.travelflight.aiop.com.co/api/airports/v2?code=${query}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                console.error('Error en la respuesta del servidor:', await response.text());
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();

            if (data && data.cities) {
                const suggestions = data.cities.flatMap(city => city.new_airports || []);
                setSuggestions(suggestions);
            } else {
                console.error('No se encontraron datos de ciudades o aeropuertos:', data);
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Error al buscar aeropuertos:', error);
            setSuggestions([]);
        }
    };

    const handleDepartureChange = (e) => {
        const value = e.target.value;
        setDeparture(value);
        fetchAirports(value, setDepartureSuggestions);
    };

    const handleArrivalChange = (e) => {
        const value = e.target.value;
        setArrival(value);
        fetchAirports(value, setArrivalSuggestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentErrors = {};

        if (!departure) {
            currentErrors.departure = "La ciudad de salida es requerida.";
        }
        if (!arrival) {
            currentErrors.arrival = "La ciudad de llegada es requerida.";
        }
        if (!date) {
            currentErrors.date = "La fecha es requerida.";
        }
        if (!time) {
            currentErrors.time = "La hora es requerida.";
        }
        if (adults < 1) {
            currentErrors.adults = "Debe haber al menos un adulto.";
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        onSearch({ departure, arrival, date, time, adults, children, infants });
        setDeparture('');
        setArrival('');
        setDate('');
        setTime('');
        setAdults(1);
        setChildren(0);
        setInfants(0);
        setErrors({});
        setDepartureSuggestions([]);
        setArrivalSuggestions([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Ciudad de Salida:
                    <input
                        type="text"
                        value={departure}
                        onChange={handleDepartureChange}
                        placeholder="Escriba la ciudad de salida"
                    />
                    {departureSuggestions.length > 0 && (
                        <select
                            onChange={(e) => setDeparture(e.target.value)}
                            value=""
                        >
                            <option value="">Seleccione un aeropuerto</option>
                            {departureSuggestions.map((airport, index) => (
                                <option
                                    key={index}
                                    value={`${airport.nameAirport} (${airport.codeIataAirport})`}
                                >
                                    {airport.nameAirport} ({airport.codeIataAirport})
                                </option>
                            ))}
                        </select>
                    )}
                </label>
                {errors.departure && <span style={{ color: 'red' }}>{errors.departure}</span>}
            </div>

            <div>
                <label>
                    Ciudad de Llegada:
                    <input
                        type="text"
                        value={arrival}
                        onChange={handleArrivalChange}
                        placeholder="Escriba la ciudad de llegada"
                    />
                    {arrivalSuggestions.length > 0 && (
                        <select
                            onChange={(e) => setArrival(e.target.value)}
                            value=""
                        >
                            <option value="">Seleccione un aeropuerto</option>
                            {arrivalSuggestions.map((airport, index) => (
                                <option
                                    key={index}
                                    value={`${airport.nameAirport} (${airport.codeIataAirport})`}
                                >
                                    {airport.nameAirport} ({airport.codeIataAirport})
                                </option>
                            ))}
                        </select>
                    )}
                </label>
                {errors.arrival && <span style={{ color: 'red' }}>{errors.arrival}</span>}
            </div>

            <div>
                <label>
                    Fecha:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
            </div>

            <div>
                <label>
                    Hora:
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </label>
                {errors.time && <span style={{ color: 'red' }}>{errors.time}</span>}
            </div>

            <div>
                <label>
                    Adultos:
                    <input
                        type="number"
                        min="1"
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                    />
                </label>
                {errors.adults && <span style={{ color: 'red' }}>{errors.adults}</span>}
            </div>

            <div>
                <label>
                    Niños:
                    <input
                        type="number"
                        min="0"
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                    />
                </label>
            </div>

            <div>
                <label>
                    Bebés:
                    <input
                        type="number"
                        min="0"
                        value={infants}
                        onChange={(e) => setInfants(Number(e.target.value))}
                    />
                </label>
            </div>

            <button type="submit">Buscar Vuelos</button>
        </form>
    );
};

export default Buscar;
