// Dependency
const mongoose = require('mongoose')

// Flight schema
const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    seatPrice: {
        type: Number,
        required: true
    },
    seats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seat'
        }
    ]
})

// Export flight model
const Flight = mongoose.model('Flight', flightSchema)

module.exports = Flight