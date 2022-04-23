const mongoose = require('mongoose')
const Reservation = require('../Models/reservations')

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.mgprw.mongodb.net/MILESTONE_PROJECT_2?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('DB connected'))
.catch(error => console.log(error));

const seedReservations = [
    {
        flightNumber: ObjectId('6261f984fb80bd3ada64aa17'),
        passenger: ObjectId('6261fa0209c87cf5047ebe10')
    },
    {
        flightNumber: ObjectId('6261f984fb80bd3ada64aa17'),
        passenger: ObjectId('6261fa0209c87cf5047ebe11')
    },
    {
        flightNumber: ObjectId('6261f984fb80bd3ada64aa11'),
        passenger: ObjectId('6261fa0209c87cf5047ebe12')
    },
    {
        flightNumber: ObjectId('6261f984fb80bd3ada64aa02'),
        passenger: ObjectId('6261fa0209c87cf5047ebe13')
    },
    {
        flightNumber: ObjectId('6261f984fb80bd3ada64aa02'),
        passenger: ObjectId('6261fa0209c87cf5047ebe14')
    },
]

// Insert data
const seedDB = async () => {
    // Uncomment next line to delete records first
    await Reservation.deleteMany({})
    await Reservation.insertMany(seedReservations)
}

// After data loaded close DB
seedDB().then(() => {
    mongoose.connection.close()
})