// Dependencies
require('dotenv').config()
const mongoose = require('mongoose')

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('DB connected'))
.catch(error => console.log(error));

// Models to export
module.exports.Passenger = require('./passenger')
module.exports.Reservation = require('./reservation')
module.exports.Flight = require('./flight')
module.exports.Seat = require('./seat')