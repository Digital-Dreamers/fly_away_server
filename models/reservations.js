const mongoose = require('mongoose')
const reservationSchema = new mongoose.Schema({
    flightNumber:{
        type: String,
        required: true
    },
    seatNumber:{
        type: String,
        required: true
    },
    totalPrice: {
        type:Number,
        required: true
    }, 

})

module.exports = mongoose.model ('Reservation', reservationSchema)