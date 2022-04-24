const mongoose = require('mongoose')

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

// Export flight model
const Seat = mongoose.model('Seat', seatSchema)

module.exports = Seat
