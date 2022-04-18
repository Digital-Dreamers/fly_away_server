const customer = require('express').Router()
// const db = require('../models')

// Search Flights GET
customer.get('/search',async (req, res)  => {
    try {
        res.status(200).json({
            message: "Search results will be here"
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

// export module

module.exports = customer;