const customer = require('express').Router()
const db = require('../models')
const { Flight, Passenger, Reservation, Seat } = db

// Search Flights GET
customer.get('/search',async (req, res)  => {
    try {
        const {departure, destination, departureDate, numberSeat } = req.body

        const flights = await Flight.find({
            'departure': departure,
            'destination': destination,
            'departureDate': departureDate,
        }).where('totalSeats').gte(numberSeat)

        if(flights.length > 0){
            res.status(200).json({
                message: "Flights Found",
                flights: flights
            })
        } else {
            res.status(404).json({
                message: "No Flights Found"
            })
        }
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
        const { reservationId, flightNo, newFlightNo, seatNo, newSeatNo } = req.body
        console.log(flightNo, seatNo)
        
        // updating Seats
        const currentSeat = await Seat.findOne({flightNumber: flightNo, seatnumber: seatNo})
        console.log(currentSeat)
        currentSeat.available = true
        await currentSeat.save()

        const newSeat = await Seat.findOne({flightNumber: newFlightNo, seatnumber: newSeatNo})
        console.log(newSeat)
        newSeat.available = false
        await currentSeat.save()

        // Updating Flights
        const currentFlight = await Flight.findById(flightNo)
        console.log(currentFlight)
        currentFlight.totalSeats = currentFlight.totalSeats + 1
        await currentFlight.save()

        const newFlight = await Flight.findById(newflightNo)
        console.log(newFlight)
        newFlight.totalSeats = currentFlight.totalSeats - 1
        await newFlight.save()

        // updating Reservation
        const reservation = await Reservation.findById(reservationId)
        console.log(reservation)
        reservation.flightNumber = newFlightNo
        reservation.seatNumber = newSeatNo
        await reservation.save()

        res.status(200).json({
            message: 'Flight updated',
            // updatedFlight: newFlight,
            // updatedSeat: newSeat,
            // updatedRes: reservation
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


module.exports = customer;