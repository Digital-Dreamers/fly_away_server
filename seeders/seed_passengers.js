const mongoose = require('mongoose')
const Passenger = require('../Models/Passenger')


// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.mgprw.mongodb.net/MILESTONE_PROJECT_2?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('DB connected'))
.catch(error => console.log(error));

// const seedPassengers = [
//     {
//         firstName: 'Lisa',
//         lastName: 'Brown',
//         age: 30,
//         address: '123 Happy Lane',
//         city: 'Raleigh',
//         state: 'NC',
//         reservationNumber: 63289
//     },
//     {
//         firstName: 'Jerry',
//         lastName: 'Brown',
//         age: 30,
//         address: '123 Happy Lane',
//         city: 'Raleigh',
//         state: 'NC',
//         reservationNumber: 63289
//     },
//     {
//         firstName: 'Naheed',
//         lastName: 'Awan',
//         age: 30,
//         address: '89 Green Creek Drive',
//         city: 'Raleigh',
//         state: 'NC',
//         reservationNumber: 657888
//     },
//     {
//         firstName: 'Otto',
//         lastName: 'Jones',
//         age: 35,
//         address: '8459 Prosperity Lane',
//         city: 'Raleigh',
//         state: 'NC',
//         reservationNumber: 22674
//     },
//     {
//         firstName: 'Miguel',
//         lastName: 'Rodriguez',
//         age: 35,
//         address: '2786 High Street',
//         city: 'Raleigh',
//         state: 'NC',
//         reservationNumber: 22675
//     }
// ]

// Insert data
const seedDB = async () => {
    // Uncomment next line to delete records first
    await Passenger.deleteMany({})
    // await Passenger.insertMany(seedPassengers)
}

// After data loaded close DB
seedDB().then(() => {
    mongoose.connection.close()
})