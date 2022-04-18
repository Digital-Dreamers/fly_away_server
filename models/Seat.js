const mongoose = require('mongoose')

// Seat Schema
const seatSchema = new mongoose.Schema({
  flightnumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
  },
  seatnumber: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: false,
    required: true,
  },
  seatclass: {
    type: String,
    required: true,
  },
  charge: {
    type: Number,
    requried: true,
  },
})

const Seat = mongoose.model('Seat', seatSchema)

module.exports = Seat
