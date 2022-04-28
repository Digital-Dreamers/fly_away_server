const { ObjectId } = require('bson');
const mongoose = require('mongoose')
const Flight = require('../Models/Flight')

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
        destination: 'HNL',
        departureDate: '2022-05-05',
        departureTime: '06:10',
        arrivalDate: '2022-05-05',
        arrivalTime: '17:56',
        totalSeats: 8,
        seatPrice: 150,
        seats: [
            ObjectId('6269eadea9a454df51cf6d1b'),
            ObjectId('6269eadea9a454df51cf6d1c'),
            ObjectId('6269eadea9a454df51cf6d1d'),
            ObjectId('6269eadea9a454df51cf6d1e'),
            ObjectId('6269eadea9a454df51cf6d1f'),
            ObjectId('6269eadea9a454df51cf6d20'),
            ObjectId('6269eadea9a454df51cf6d21'),
            ObjectId('6269eadea9a454df51cf6d22')
        ]
    },
    {
        flightNumber: 'American 4713',
        departure: 'RDU',
        destination: 'HNL',
        departureDate: '2022-05-05',
        departureTime: '06:54',
        arrivalDate: '2022-05-05',
        arrivalTime: '18:46',
        totalSeats: 8,
        seatPrice: 155,
        seats: [
            ObjectId('6269eadea9a454df51cf6d23'),
            ObjectId('6269eadea9a454df51cf6d24'),
            ObjectId('6269eadea9a454df51cf6d25'),
            ObjectId('6269eadea9a454df51cf6d26'),
            ObjectId('6269eadea9a454df51cf6d27'),
            ObjectId('6269eadea9a454df51cf6d28'),
            ObjectId('6269eadea9a454df51cf6d29'),
            ObjectId('6269eadea9a454df51cf6d2a')
        ]
    },
    {
        flightNumber: 'United 3533',
        departure: 'RDU',
        destination: 'CSL',
        departureDate: '2022-05-02',
        departureTime: '08:44',
        arrivalDate: '2022-05-02',
        arrivalTime: '19:30',
        totalSeats: 5,
        seatPrice: 175,
        seats: [
            ObjectId('6269eadea9a454df51cf6d2b'),
            ObjectId('6269eadea9a454df51cf6d2c'),
            ObjectId('6269eadea9a454df51cf6d2d'),
            ObjectId('6269eadea9a454df51cf6d2e'),
            ObjectId('6269eadea9a454df51cf6d2f')
        ]
    },
    {
        flightNumber: 'Jet Blue 686',
        departure: 'RDU',
        destination: 'CSL',
        departureDate: '2022-05-02',
        departureTime: '11:26',
        arrivalDate: '2022-05-02',
        arrivalTime: '22:59',
        totalSeats: 4,
        seatPrice: 125,
        seats: [
            ObjectId('6269eadea9a454df51cf6d30'),
            ObjectId('6269eadea9a454df51cf6d31'),
            ObjectId('6269eadea9a454df51cf6d32'),
            ObjectId('6269eadea9a454df51cf6d33')
        ]
    },
    {
        flightNumber: 'Delta 5052',
        departure: 'RDU',
        destination: 'HNL',
        departureDate: '2022-05-05',
        departureTime: '06:10',
        arrivalDate: '2022-05-05',
        arrivalTime: '16:56',
        totalSeats: 8,
        seatPrice: 150,
        seats: [
            ObjectId('6269eadea9a454df51cf6d34'),
            ObjectId('6269eadea9a454df51cf6d35'),
            ObjectId('6269eadea9a454df51cf6d36'),
            ObjectId('6269eadea9a454df51cf6d37'),
            ObjectId('6269eadea9a454df51cf6d38'),
            ObjectId('6269eadea9a454df51cf6d39'),
            ObjectId('6269eadea9a454df51cf6d3a'),
            ObjectId('6269eadea9a454df51cf6d3b')
        ]
    },
    {
        flightNumber: 'American 4771',
        departure: 'RDU',
        destination: 'HNL',
        departureDate: '2022-05-05',
        departureTime: '06:54',
        arrivalDate: '2022-05-05',
        arrivalTime: '20:46',
        totalSeats: 8,
        seatPrice: 155,
        seats: [
            ObjectId('6269eadea9a454df51cf6d3c'),
            ObjectId('6269eadea9a454df51cf6d3d'),
            ObjectId('6269eadea9a454df51cf6d3e'),
            ObjectId('6269eadea9a454df51cf6d3f'),
            ObjectId('6269eadea9a454df51cf6d40'),
            ObjectId('6269eadea9a454df51cf6d41'),
            ObjectId('6269eadea9a454df51cf6d42'),
            ObjectId('6269eadea9a454df51cf6d43')
        ]
    },
    {
        flightNumber: 'United 3555',
        departure: 'RDU',
        destination: 'CSL',
        departureDate: '2022-05-02',
        departureTime: '08:44',
        arrivalDate: '2022-05-02',
        arrivalTime: '18:30',
        totalSeats: 5,
        seatPrice: 175,
        seats: [
            ObjectId('6269eadea9a454df51cf6d44'),
            ObjectId('6269eadea9a454df51cf6d45'),
            ObjectId('6269eadea9a454df51cf6d46'),
            ObjectId('6269eadea9a454df51cf6d47'),
            ObjectId('6269eadea9a454df51cf6d48')
        ]
    },
    {
        flightNumber: 'Jet Blue 677',
        departure: 'RDU',
        destination: 'CSL',
        departureDate: '2022-05-02',
        departureTime: '01:26',
        arrivalDate: '2022-05-02',
        arrivalTime: '12:59',
        totalSeats: 4,
        seatPrice: 125,
        seats: [
            ObjectId('6269eadea9a454df51cf6d49'),
            ObjectId('6269eadea9a454df51cf6d4a'),
            ObjectId('6269eadea9a454df51cf6d4b'),
            ObjectId('6269eadea9a454df51cf6d4c')
        ]
    },
]

// Insert data
const seedDB = async () => {
    // Uncomment next line to delete records first *****
    await Flight.deleteMany({})
    await Flight.insertMany(seedFlights)
}

// After data loaded close DB
seedDB().then(() => {
    mongoose.connection.close()
})