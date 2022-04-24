const mongoose = require('mongoose')
const reservationSchema = new mongoose.Schema({
  flightNumberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  seatNumberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat',
    required: true,
  },
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Passenger',
    required: true,
  },
})

const Reservation = mongoose.model('Reservation', reservationSchema)
module.exports = Reservation
