const mongoose = require('mongoose')
const reservationSchema = new mongoose.Schema({
    flightNumber:{
        type: Number & String,
        required: true
    },
    seatNumber:{
        type: Number & String,
        required: true
    },
    totalPrice: {
        type:Number,
        required: true
    }, 
    
})

module.export = mongoose.model ('Reservation', reservationSchema)