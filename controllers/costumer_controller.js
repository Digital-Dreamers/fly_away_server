const customer = require('express').Router()
const db = require('../models')

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

// Update Flights PUT and reservation
customer.get('/update-flight', async (req,res) =>{
    try {
        res.status(200).json({
            message: 'Information about'
        })
    } catch (error) {
        
    }
})

customer.put('/update-flight', async (req, res) => {
    try {
        res.status(200).json({
            message: 'flight updated',
            updatedFlight: 'Updated flight object'
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

// Cancel Flights DELETE(reservation) PUT(Seat)
customer.delete('/delete', async (req, res) => {
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