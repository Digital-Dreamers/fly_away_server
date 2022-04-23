const mongoose = require('mongoose')

// Seat Schema
const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
    required: true,
  },
  seatClass: {
    type: String,
    required: false,
  },
  charge: {
    type: Number,
    required: false,
  },
})

const Seat = mongoose.model('Seat', seatSchema)

module.exports = Seat
