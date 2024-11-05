import React, { useState, useEffect } from 'react';

//declaracion de variables 
const Resultados = ({ searchParams, onSelectFlight }) => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ airline: '', date: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 5;
    const [selectedFlight, setSelectedFlight] = useState(null);

    useEffect(() => {
        //funcion para la solicitud post a la API para buscar los vuelos
        const fetchFlights = async (retries = 3) => {
            try {
                setLoading(true);
                const response = await fetch('https://staging.travelflight.aiop.com.co/api/flights/v2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(searchParams),
                });
        
                //manejo por si la API no responde en el primer intento
                if (response.status === 204 && retries > 0) {
                    console.warn('No se encontraron vuelos, reintentando...');
                    setTimeout(() => fetchFlights(retries - 1), 1000);
                    return;
                }
        
                if (!response.ok) {
                    throw new Error('Error en la solicitud de búsqueda');
                }
        
                const data = await response.json();
                setFlights(data.data.Seg1 || []);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        
    
        fetchFlights();
    }, [searchParams]);

    //seleccionar vuelo
    const handleFlightSelect = (flight) => {
        setSelectedFlight(flight);
    };
    //reservar vuelo
    const handleReserveClick = () => {
        if (selectedFlight) {
            onSelectFlight(selectedFlight);
        }
    };

    //filtrar por aerolinea
    const filteredFlights = flights.filter(segment => {
        const airlineMatch = filters.airline ? segment.segments.some(flight => flight.companyId.marketingCarrier === filters.airline) : true;
        const dateMatch = filters.date ? segment.segments.some(flight => flight.productDateTime.dateOfDeparture.includes(filters.date)) : true;
        return airlineMatch && dateMatch;
    });

    const totalPages = Math.ceil(filteredFlights.length / resultsPerPage);
    const currentFlights = filteredFlights.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

    return (
        <div>
            {loading && <p id='loading'>Cargando resultados...</p>}
            {error && <p id='error' style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && (
                <>
                    <div>
                        <label>
                            Filtrar por aerolínea:
                            <input
                                type="text"
                                value={filters.airline}
                                onChange={(e) => setFilters({ ...filters, airline: e.target.value.toUpperCase() })}
                                placeholder="Código de aerolínea (ej. AV)"
                            />
                        </label>
                        <label>
                            Filtrar por fecha:
                            <input
                                type="date"
                                value={filters.date}
                                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                            />
                        </label>
                    </div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Seleccionar</th>
                                <th>Aerolínea</th>
                                <th>Número de vuelo</th>
                                <th>Salida</th>
                                <th>Llegada</th>
                                <th>Equipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFlights.length > 0 ? (
                                currentFlights.map((segment, segmentIndex) => (
                                    segment.segments.map((flight, flightIndex) => (
                                        <tr key={`${segmentIndex}-${flightIndex}`}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleFlightSelect(flight)}
                                                    checked={selectedFlight === flight}
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    src={`https://pics.avs.io/60/60/${flight.companyId.marketingCarrier}.png`}
                                                    alt={flight.companyId.marketingCarrier}
                                                />
                                                {flight.companyId.marketingCarrier}
                                            </td>
                                            <td>{flight.flightOrtrainNumber}</td>
                                            <td>
                                                {flight.location[0].locationName} ({flight.location[0].locationId})<br />
                                                {flight.productDateTime.dateFormatDeparture} {flight.productDateTime.timeOfDeparture}
                                            </td>
                                            <td>
                                                {flight.location[1].locationName} ({flight.location[1].locationId})<br />
                                                {flight.productDateTime.dateFormatArrival} {flight.productDateTime.timeOfArrival}
                                            </td>
                                            <td>{flight.equipment}</td>
                                        </tr>
                                    ))
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No se encontraron resultados</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button id='btnpag'
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                disabled={currentPage === index + 1}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button onClick={handleReserveClick} disabled={!selectedFlight}>Reservar</button>
                    
                </>
            )}
        </div>
    );
};

export default Resultados;
