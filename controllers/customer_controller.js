const customer = require('express').Router()
const db = require('../models')

const { Flight, Passenger, Reservation, Seat } = db

// Search Flights GET
customer.get('/search', async (req, res) => {
    try {
        const { departure, destination, departureDate } = req.body

        const flights = await Flight.find({
            departure,
            destination,
            departureDate,
        }).where('totalSeats').gte(numberOfSeats)

        if (flights.length > 0) {
            res.status(200).json({
                message: "Flights Found",
                flights: flights
            })
        } else {
            res.status(404).json({
                message: "No Flights Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

// Book Flights POST
customer.post('/book', async (req, res) => {
  const { firstName, lastName, age, address, city, state, reservationNumber } =
    req.body
  const { flightNumber, seatNumber, passenger } = req.body
  const { Passenger, Reservation } = db
  if (
    !firstName ||
    !lastName ||
    !age ||
    !address ||
    !city ||
    !state ||
    !reservationNumber ||
    !flightNumber ||
    !seatNumber
  ) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  try {
    const passengerInfo = await Passenger.create({
      firstName,
      lastName,
      age,
      address,
      city,
      state,
      reservationNumber,
    })

    console.log(passengerInfo._id.toString())

    const reservation = await Reservation.create({
      flightNumber,
      seatNumber,
      passenger: passengerInfo._id.toString(),
    })

    res.status(200).json({ passengerInfo, reservation })
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Update Records and flights all affect reservation Model
// reservation info GET req.
customer.get('/reservations/:id', async (req, res) => {
  const { Reservation } = db
  try {
    const reservation = await Reservation.findById(req.params.id).populate([
      { path: 'passenger', model: 'Passenger' },
      { path: 'seatNumber', model: 'Seat' },
      { path: 'flightNumber', model: 'Flight' },
    ])
    res.status(200).json(reservation)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Handles passenger information update
customer.put('/update-passenger/:id', async (req, res) => {
  const { Passenger } = db

  const passenger = await Passenger.findById(req.params.id)
  if (!passenger) {
    res.status(400)
    throw new Error('Passenger not found')
  }

  try {
    const updateCustomerInfo = await Passenger.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json(updateCustomerInfo)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Handles seat information update
customer.put('/flight/:id/update-seat/:id', async (req, res) => {
  // const seat = await Flight.findById(req.params.id)
  // if (!seat) {
  //   res.status(400)
  //   throw new Error('Seat not found')
  // }

  try {
    // const updateSeat = await Flight.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   {

    //   }
    // )
    res.status(200).json({
      message: 'Seat updated',
      updatedFlight: 'Updated seat object',
    })
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Handles flight information update
customer.put('/update-flight', async (req, res) => {
  try {
    res.status(200).json({
      message: 'Flight updated',
      updatedFlight: 'Updated flight object',
    })
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Cancel Flights DELETE(reservation) PUT(Seat)
customer.delete('/cancellation', async (req, res) => {
  try {
    res.status(200).json({
      message: 'Flight Canceled',
    })
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})


module.exports = customer
