const mongoose = require('mongoose')
const reservationSchema = new mongoose.Schema({
  flightNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  seatNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat',
    required: true,
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Passeger',
    required: true,
  },
})

const Reservation = mongoose.model('Reservation', reservationSchema)
module.exports = Reservation