const mongoose = require('mongoose')
const Seat = require('../Models/Seat')

// Connect to MongoDB
mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('DB connected'))
.catch(error => console.log(error));

const seedSeats = [
    // Seats for Flight #1
    {
        seatNumber: '1A',
        available: true,
        seatClass: 'business',
        charge: 50
    },
    {
        seatNumber: '1B',
        available: true,
        seatClass: 'business',
        charge: 50
    },
    {
        seatNumber: '2A',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '2B',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '3A',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '3B',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '4A',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '4B',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    // Seats for Flight #2
    {
        seatNumber: '1A',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '2A',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '3A',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '4A',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '5A',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '1B',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '2B',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '3B',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    // Seats for Flight #3
    {
        seatNumber: '3B',
        available: true,
        seatClass: 'business',
        charge: 75
    },
    {
        seatNumber: '4C',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '5A',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '7H',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '11G',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    // Seats for Flight #4
    {
        seatNumber: '1A',
        available: true,
        seatClass: 'business',
        charge: 55
    },
    {
        seatNumber: '2A',
        available: true,
        seatClass: 'business',
        charge: 55
    },
    {
        seatNumber: '1B',
        available: true,
        seatClass: 'business',
        charge: 55
    },
    {
        seatNumber: '2B',
        available: true,
        seatClass: 'business',
        charge: 55
    },
    // Seats for Flight #5
    {
        seatNumber: '1A',
        available: true,
        seatClass: 'business',
        charge: 60
    },
    {
        seatNumber: '2A',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '1B',
        available: true,
        seatClass: 'business',
        charge: 60
    },
    {
        seatNumber: '2B',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '1C',
        available: true,
        seatClass: 'business',
        charge: 60
    },
    {
        seatNumber: '2C',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: '1D',
        available: true,
        seatClass: 'business',
        charge: 60
    },
    {
        seatNumber: '2D',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    // Seats for Flight #6
    {
        seatNumber: 'A1',
        available: true,
        seatClass: 'business',
        charge: 55
    },
    {
        seatNumber: 'A2',
        available: true,
        seatClass: 'business',
        charge: 45
    },
    {
        seatNumber: 'A3',
        available: true,
        seatClass: 'business',
        charge: 45
    },
    {
        seatNumber: 'B1',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: 'B2',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: 'B3',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: 'C1',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: 'C2',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    // Seats for Flight #7
    {
        seatNumber: 'AA1',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: 'AA2',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: 'AB1',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: 'AB2',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    {
        seatNumber: 'BB1',
        available: true,
        seatClass: 'coach',
        charge: 0
    },
    // Seats for light #8
    {
        seatNumber: 'AAA',
        available: true,
        seatClass: 'business',
        charge: 0
    },
    {
        seatNumber: 'BBB',
        available: true,
        seatClass: 'business',
        charge: 0
    },
    {
        seatNumber: 'CCC',
        available: true,
        seatClass: 'business',
        charge: 0
    },
    {
        seatNumber: 'DDD',
        available: true,
        seatClass: 'business',
        charge: 0
    },
]

// Insert data
const seedDB = async () => {
    // Uncomment next line to delete records first
    await Seat.deleteMany({})
    await Seat.insertMany(seedSeats)
}

// After data loaded close DB
seedDB().then(() => {
    mongoose.connection.close()
})