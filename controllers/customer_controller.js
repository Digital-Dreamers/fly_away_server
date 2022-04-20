const customer = require('express').Router()
const db = require('../models')
const { Flight, Passenger, Reservation, Seat } = db

// Search Flights GET
customer.get('/search', async (req, res) => {
    try {
        const { departure, destination, departureDate, numberOfSeat } = req.body

        const flights = await Flight.find({
            departure,
            destination,
            departureDate,
        }).where('totalSeats').gte(numberOfSeat)

        if (flights.length > 0) {
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
customer.get('/reservation', async (req, res) => {
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
    try {
        res.status(200).json({
            message: 'Flight updated',
            updatedFlight: 'Updated flight object'
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