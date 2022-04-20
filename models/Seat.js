const mongoose = require('mongoose')

// Seat Schema
const seatSchema = new mongoose.Schema({
  flightNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
  },
  seatNumber: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: false,
    required: true,
  },
  seatClass: {
    type: String,
    required: true,
  },
  charge: {
    type: Number,
    required: true,
  },
})

const Seat = mongoose.model('Seat', seatSchema)

module.exports = Seat
