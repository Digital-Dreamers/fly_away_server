const mongoose = require('mongoose')
const reservationSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
})

const Reservation = mongoose.model('Reservation', reservationSchema)
module.exports = Reservation
