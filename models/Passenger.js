const mongoose = require('mongoose')

const passengerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  reservationNumber: {
    type: Number,
    required: false,
  },
})

const Passenger = mongoose.model('Passenger', passengerSchema)
module.exports = Passenger
