const express = require('express')
const db = require('../models')
const admin = express.Router()
const { Flight, Passenger, Reservation, Seat } = db

//  ALL FLIGHTS ROUTES ///////////////////////////////////

// GET ALL FLIGHT ROUTE
admin.get('/search/flights', async (req, res) => {
  try {
    const flight = await Flight.find()
    res.status(200).json(flight)
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
})

// CREATE ONE FLIGHT ROUTE
admin.post('/create-flight', async (req, res) => {
  const {
    flightnumber,
    schedule,
    departure,
    destination,
    departingDate,
    departingTime,
    arrivalDate,
    arrivalTime,
    totalSeatCount,
  } = req.body

  if (
    !flightnumber ||
    !schedule ||
    !departure ||
    !destination ||
    !departingDate ||
    !departingTime ||
    !arrivalDate ||
    !arrivalTime ||
    !totalSeatCount
  ) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  try {
    const newFlight = await Flight.create({
      flightnumber,
      schedule,
      departure,
      destination,
      departingDate,
      departingTime,
      arrivalDate,
      arrivalTime,
      totalSeatCount,
    })
    res.status(201).json(newFlight)
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
})

// UPDATE ONE FLIGHT ROUTE
admin.put('/update-flight/:flightId', async (req, res) => {
  const flight = await findById(req.params.flightId)
  if (!flight) {
    res.status(400)
    throw new Error('Flight not found')
  }
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.flightId,
      req.body,
      {
        new: true,
      }
    )
    res.status(201).json(updatedFlight)
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
})

// DELETE ONE FLIGHT ROUTE
admin.delete('/delete-flight/:flightId', async (req, res) => {
  const flight = await Flight.findById(req.params.flightId)
  if (!flight) {
    res.status(400)
    throw new Error('Flight not found')
  }
  try {
    await flight.deleteOne()
    res.status(200).json(flight)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// ALL PASSENGERS ROUTES //////////////////////////////////////

// GET ALL PASSENGERS ROUTE
admin.get('/search/passengers', async (req, res) => {
  try {
    const allPassengers = await Passenger.find()
    res.status(200).json(allPassengers)
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
})

// CREATE PASSENGER ROUTE
admin.post('/create-passenger', async (req, res) => {})

// UPDATE ONE PASSENGER ROUTE
admin.put('/update-passenger/:passengerId', async (req, res) => {
  const passenger = await Passenger.findById(req.params.passengerId)
  if (!passenger) {
    res.status(400)
    throw new Error('Passenger not found')
  }

  try {
    const updateCustomerInfo = await Passenger.findByIdAndUpdate(
      req.params.passengerId,
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

// DELETE PASSENGER ROUTE
admin.delete('/delete-passenger/:passengerId', async (req, res) => {
  const passengers = await Passenger.findById(res.params.passengerId)
  if (!passengers) {
    res.status(400)
    throw new Error('Passenger not found')
  }
  try {
    await passengers.deleteOne()
    res.status(200).json(passengers)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// ALL SEAT ROUTES  //////////////////////////////////////////////

// GET ONE SEAT ROUTE
admin.get('/search-seat/:seatId', async (req, res) => {
  try {
    const seatsByFlight = await Seat.find(req.params.id)
    res.status(201).json(seatsByFlight)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// GET ALL SEATS ROUTE
admin.get('/search/seats', async (req, res) => {
  try {
    const allSeats = await Seat.find()
    res.status(201).json(allSeats)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// CREATE ONE SEAT ROUTE
admin.post('/create-seats', async (req, res) => {
  const { seatNumber, available, seatClass, charge } = req.body
  try {
    const seat = await Seat.create({
      seatNumber,
      available,
      seatClass,
      charge,
    })
    res.status(200).json(seat)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// UPDATE ONE SEAT ROUTE
admin.put('/update-seats/:seatId', async (req, res) => {
  const seat = await Seat.findById(req.params.seatId)
  if (!seat) {
    res.status(400)
    throw new Error('Seat not found')
  }
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(201).json(updatedSeat)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// DELETE ONE SEAT ROUTE
admin.delete('/delete-seats/:seatId', async (req, res) => {
  const seat = await Seat.findById(req.params.seatId)
  if (!seat) {
    res.status(400)
    throw new Error('Seat not found')
  }
  try {
    await seat.deleteOne()
    res.status(201).json({ id: req.params.seatId })
  } catch {
    res.status(400).json({ message: error })
  }
})

// ALL RESERVATION ROUTES /////////////////////////////////////////

// GET ALL RESERVATIOINS ROUTE
admin.get('/search/reservations', async (req, res) => {
  try {
    const flight = await Reservation.find()
    res.status(200).json(flight)
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
})

// CREATE ONE RESERVATION ROUTE
admin.post('/book-reservation', async (req, res) => {
  //   console.log(req.body)
  const createManyDocuments = async () => {
    try {
      const { flightNumberId } = req.body[0]
      const passengerInfo = await Passenger.create(req.body)
      return { flightNumberId, passengerInfo }
    } catch (error) {
      res.status(400).json({
        message: error,
      })
    }
  }
  const many = await createManyDocuments()

  try {
    if (many.passengerInfo.length > 1) {
      const reservation = await Reservation.create({
        flightNumberId: many.flightNumberId,
        seatNumberId: [req.body[0].seatNumberId, req.body[1].seatNumberId],
        passengerId: [
          many.passengerInfo[0]._id.toString(),
          many.passengerInfo[1]._id.toString(),
        ],
      })
      return res.status(200).json({ many, reservation })
    } else {
      const reservation = await Reservation.create({
        flightNumberId: many.flightNumberId,
        seatNumberId: [req.body[0].seatNumberId],
        passengerId: [many.passengerInfo[0]._id.toString()],
      })
      return res.status(200).json({ many, reservation })
    }
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// UPDATE ONE RESERVATION ROUTE
admin.put('/update-reservation/:reservationId', (req, res) => {})

// DELETE RESERVATION ROUTE
admin.delete('/delete-reservation/:reservationId', async (req, res) => {
  const reservation = await Reservation.findById(req.params.reservationId)
  if (!reservation) {
    res.status(400)
    throw new Error('Reservation not found')
  }
  try {
    await reservation.deleteOne()
    res.status(200).json(reservation)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

module.exports = admin
