import React, { useState, useEffect } from 'react';

//declaracion de variables 
const Reserva = ({ onSave, flightDetails }) => {
    const [passengerName, setPassengerName] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [filledFlightDetails, setFilledFlightDetails] = useState({
        departureCity: '',
        arrivalCity: '',
        date: '',
        time: ''
    });

    //actualiza el estado de los datos del vuelo
    useEffect(() => {
        if (flightDetails) {
            setFilledFlightDetails({
                departureCity: flightDetails.location[0].locationName,
                arrivalCity: flightDetails.location[1].locationName,
                fechaHoraVuelo: `${flightDetails.productDateTime.dateFormatDeparture} ${flightDetails.productDateTime.timeOfDeparture}`
            });
        }
    }, [flightDetails]);
    
    //manejo de los inputs
    const handleSubmit = (e) => {
        e.preventDefault();
        const currentErrors = {};
    
        if (!passengerName) {
            currentErrors.passengerName = 'El nombre del pasajero es requerido.';
        }
        if (!passportNumber) {
            currentErrors.passportNumber = 'El número de pasaporte es requerido.';
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            currentErrors.email = 'El correo electrónico es inválido o está vacío.';
        }
        if (!phone) {
            currentErrors.phone = 'El número de teléfono es requerido.';
        }
    
        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }
    
        // se crea el objeto con los datos que se van a enviar
        const reservationData = {
            passengerName,
            passportNumber,
            email,
            phone,
            flightDetails: filledFlightDetails
        };
    
        // se llama la función `onSave` de `App.js` para guardar la reserva
        onSave(reservationData);
        console.log('Reserva guardada:', reservationData);
    
        // limpiar el formulario
        setPassengerName('');
        setPassportNumber('');
        setEmail('');
        setPhone('');
        setErrors({});
    };
    
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reservar Pasaje</h2>
            <div>
                <label>
                    Ciudad de Salida:
                    <input
                        type="text"
                        value={filledFlightDetails.departureCity}
                        readOnly
                    />
                </label>
            </div>
            <div>
                <label>
                    Ciudad de Llegada:
                    <input
                        type="text"
                        value={filledFlightDetails.arrivalCity}
                        readOnly
                    />
                </label>
            </div>
            <div>
    <label>
        Fecha y Hora de Vuelo:
        <input
            type="text"
            value={filledFlightDetails.fechaHoraVuelo}
            readOnly
        />
    </label>
</div>


            {/* Campos para el ingreso de datos del pasajero */}
            <div>
                <label>
                    Nombre del Pasajero:
                    <input
                        type="text"
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        placeholder="Nombre completo"
                    />
                </label>
                {errors.passengerName && <span style={{ color: 'red' }}>{errors.passengerName}</span>}
            </div>
            <div>
                <label>
                    Número de Pasaporte:
                    <input
                        type="text"
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                        placeholder="Número de pasaporte"
                    />
                </label>
                {errors.passportNumber && <span style={{ color: 'red' }}>{errors.passportNumber}</span>}
            </div>
            <div>
                <label>
                    Correo Electrónico:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                    />
                </label>
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>
            <div>
                <label>
                    Teléfono:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Número de teléfono"
                    />
                </label>
                {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
            </div>

            <button type="submit">Guardar Reserva</button>
        </form>
    );
};

export default Reserva;
