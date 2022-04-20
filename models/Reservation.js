const mongoose = require('mongoose')
const reservationSchema = new mongoose.Schema({
  flightNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
  },
  seatNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat',
  },
})

const Reservation = mongoose.model('Reservation', reservationSchema)
module.exports = Reservation
