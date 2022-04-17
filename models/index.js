require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() => console.log('db connected'))
.catch(e => console.log(e))


module.exports.Passenger = require('./passenger')
module.exports.Reservation = require('./reservation')