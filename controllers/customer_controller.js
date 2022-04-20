const customer = require('express').Router()
const db = require('../models')
const { Flight, Passenger, Reservation, Seat } = db

// Search Flights GET
customer.get('/search',async (req, res)  => {
    try {
        const flights = await Flight.find()
        res.status(200).json({
            message: "Search results will be here",
            flights: flights
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

// Book Flights POST
customer.post('/book', async (req, res) => {
    try {
        res.status(200).json({
            message: 'Flight successfully booked',
            reservation: 'Will send back reservation object'
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

// Update Records and flights all affect reservation Model
// reservation info GET req.
customer.get('/reservation', async (req,res) =>{
    try {
        res.status(200).json({
            message: 'Information about Reservations'
        })
    } catch (error) {
        
    }
})

// Handles passenger information update
customer.put('/update-passenger', async (req, res) => {
    try {
        res.status(200).json({
            message: 'Passenger info updated',
            updatedFlight: 'Updated passenger object'
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

// Handles seat information update
customer.put('/update-seat', async (req, res) => {
    try {
        res.status(200).json({
            message: 'Seat updated',
            updatedFlight: 'Updated seat object'
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

// Handles flight information update
customer.put('/update-flight', async (req, res) => {
    // req.body ={flightNo, newFlightNo, seatNo,newSeatNo}
    try {
        // parsing data received form client
        const { flightNo, newFlightNo, seatNo, newSeatNo, reservationId } = req.body
        
        // updating Seats
        const currentSeat = await Seat.findOne({flightnumber: flightNo, seatnumber: seatNo})
        currentSeat.available = true
        currentSeat.save()

        const newSeat = await Seat.findOne({flightnumber: newFlightNo, seatnumber: newSeatNo})
        newSeat.available = false
        currentSeat.save()

        // Updating Flights
        const currentFlight = await Flight.findOne({ flightNumber: flightNo})
        currentFlight.totalSeats = currentFlight.totalSeats + 1
        currentFlight.save()

        const newFlight = await Flight.findOne({flightNumber: newFlightNo })
        newFlight.totalSeats = currentFlight.totalSeats - 1
        newFlight.save()

        // updating Reservation
        const reservation = await Reservation.findById(reservationId)
        reservation.flightNumber = newFlightNo
        reservation.seatNumber = newSeatNo
        reservation.save()

        res.status(200).json({
            message: 'Flight updated',
            updatedFlight: newFlight,
            updatedSeat: newSeat,
            updatedRes: reservation
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

// Cancel Flights DELETE(reservation) PUT(Seat)
customer.delete('/cancellation', async (req, res) => {
    try {
        res.status(200).json({
            message: 'Flight Canceled'
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

// export module

module.exports = customer;