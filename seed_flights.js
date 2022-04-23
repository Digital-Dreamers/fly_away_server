const mongoose = require('mongoose')
const Flight = require('../Models/flights')

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.mgprw.mongodb.net/MILESTONE_PROJECT_2?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('DB connected'))
.catch(error => console.log(error));

const seedFlights = [
    {
        flightNumber: 'Delta 5051',
        departure: 'RDU',
        destination: 'JFK',
        departureDate: '2022-04-30',
        departureTime: '06:10',
        arrivalDate: '2022-04-30',
        arrivalTime: '07:56',
        totalSeats: 8,
        seatPrice: 150,
        seat: [ 
            {
                number: '1A',
                available: false
            },
            {
                number: '1B',
                available: true
            },
            {
                number: '2A',
                available: false
            },
            {
                number: '2B',
                available: true
            },
            {
                number: '3A',
                available: true
            },
            {
                number: '3B',
                available: true
            },
            {
                number: '4A',
                available: true
            },
            {
                number: '4B',
                available: true
            }
        ]
    },
    {
        flightNumber: 'American 4713',
        departure: 'RDU',
        destination: 'JFK',
        departureDate: '2022-04-30',
        departureTime: '06:54',
        arrivalDate: '2022-04-30',
        arrivalTime: '08:46',
        totalSeats: 5,
        seatPrice: 155,
        seat: [
            {
                number: '1A',
                available: true
            },
            {
                number: '2A',
                available: true
            },
            {
                number: '3A',
                available: true
            },
            {
                number: '4A',
                available: true
            },
            {
                number: '5A',
                available: true
            }
        ]
    },
    {
        flightNumber: 'United 3533',
        departure: 'RDU',
        destination: 'EWR',
        departureDate: '2022-04-27',
        departureTime: '08:44',
        arrivalDate: '2022-04-27',
        arrivalTime: '10:30',
        totalSeats: 5,
        seatPrice: 175,
        seat: [
            {
                number: '3B',
                available: true
            },
            {
                number: '4C',
                available: true
            },
            {
                number: '5A',
                available: true
            },
            {
                number: '7H',
                available: false
            },
            {
                number: '11G',
                available: true
            }
        ]
    },
    {
        flightNumber: 'Jet Blue 686',
        departure: 'RDU',
        destination: 'JFk',
        departureDate: '2022-04-25',
        departureTime: '11:26',
        arrivalDate: '2022-04-25',
        arrivalTime: '12:59',
        totalSeats: 4,
        seatPrice: 125,
        seat: [
            {
                number: '1A',
                available: true
            },
            {
                number: '2A',
                available: true
            },
            {
                number: '1B',
                available: false
            },
            {
                number: '2B',
                available: false
            }
        ]
    }
]

// Insert data
const seedDB = async () => {
    // Uncomment next line to delete records first
    await Flight.deleteMany({})
    await Flight.insertMany(seedFlights)
}

// After data loaded close DB
seedDB().then(() => {
    mongoose.connection.close()
})