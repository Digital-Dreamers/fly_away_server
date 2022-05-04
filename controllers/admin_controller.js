const express = require('express')
const db = require('../models')
const admin = express.Router()
const { Flight, Passenger, Reservation, Seat } = db

// GET ROUTE FOR ALL FLIGHTS  ////////////////////////////////

// GET ALL FLIGHTS ROUTE
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

// GET ALL PASSENGERS ROUTE
admin.get('/search/passengers', async (req, res) => {
  try {
    const flight = await Passenger.find()
    res.status(200).json(flight)
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
})

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

// CREATE A SINGLE FLIGHT ROUTE
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

// UPDATE FLIGHT ROUTE
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

// DELETE FLIGHT ROUTE
admin.delete('/delete-flight/:flightId', async (req, res) => {
  const flight = await Flight.findById(req.params.flightId)
  if (!flight) {
    res.status(400)
    throw new Error('Flight not found')
  }
  try {
    await flight.deleteOne()
    res.status(201).json({ id: req.params.flightId })
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// ALL SEAT ROUTES /////////////////////////////////

// GET ROUTE FOR ALL SEATS THAT BELONG TO A PARTICULAR FLIGHT
admin.get('/seat/:seatId', async (req, res) => {
  try {
    const seatsByFlight = await Seat.find(req.params.id)
    res.status(201).json(seatsByFlight)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// CREATE A SEAT ROUTE
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

// UPDATE SEATS ROUTE
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

// DELETE SEATS ROUTE
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

admin.delete('/delete-reservation/:reservationId', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(
      req.params.reservationId
    )
    res.status(200).json(reservation)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})
module.exports = admin
