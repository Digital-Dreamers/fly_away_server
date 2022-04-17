const mongoose = require('mongoose')

const passengerSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        }, lastName: {
            type: String,
            required: true
        }
    },
    age: {
        type: Number,
        required: true
    },
    houseNumber:{
        type: Number
    },
    streetName:{
        type: String
    },
    city: {
        type: String,
        default: 'Anytown'
    },
    state: {
        type: String,
        default: 'USA'
    },
    reservationNumber: {
        type: Number,
        required : true

    }
})

module.export = mongoose.model ('Passenger', passengerSchema)