const customer = require('express').Router()
const db = require('../models')

const { Flight, Passenger, Reservation, Seat } = db

// Search Flights GET
customer.get('/search', async (req, res) => {
  try {
    const { departure, destination, departureDate, numberOfSeat } = req.body

    const flights = await Flight.find({
      departure,
      destination,
      departureDate,
    })
      .where('totalSeats')
      .gte(numberOfSeat)

    if (flights.length > 0) {
      res.status(200).json({
        message: 'Flights Found',
        flights: flights,
      })
    } else {
      res.status(404).json({
        message: 'No Flights Found',
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Book Flights POST
customer.post('/book', async (req, res) => {
  const { firstName, lastName, age, address, city, state, reservationNumber } =
    req.body
  const { flightNumber, seatNumber, passenger } = req.body

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
  const checkForReservation = await Reservation.findById(req.params.id)

  if (!checkForReservation) {
    return res
      .status(400)
      .json({ Message: `Reservation ${req.params.id} Not Found` })
  }
  try {
    const reservation = await Reservation.findById(req.params.id).populate([
      { path: 'passenger', model: 'Passenger' },
      { path: 'seatNumber', model: 'Seat' },
      { path: 'flightNumber', model: 'Flight' },
    ])
    res.status(201).json(reservation)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Handles passenger information update
customer.put('/update-passenger/:id', async (req, res) => {
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
customer.put('/update-seat', async (req, res) => {
  try {
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
customer.delete('/reservations/cancellation/:id', async (req, res) => {
  const reservation = await Reservation.findById(req.params.id)
  if (!reservation) {
    return res.status(400).json('Reservation not found')
  }
  try {
    await reservation.deleteOne()
    res.status(200).json(`Reservation ${reservation._id.toString()} Deleted`)
  } catch (error) {
    res.status(500).json({
      message: 'Reservation Not Deleted',
    })
  }
})

module.exports = customer
