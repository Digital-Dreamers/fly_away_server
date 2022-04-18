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
module.exports.Passenger = require('./Passenger')
module.exports.Reservation = require('./Reservation')
module.exports.Flight = require('./Flight')
module.exports.Seat = require('./Seat')