const customer = require('express').Router()
const getPassengerId = require('../utility/utilityFunctions')
const db = require('../models')
const { Flight, Passenger, Reservation, Seat } = db

// Search Flights GET
customer.get('/search', async (req, res) => {
  try {
    const { departure, destination, departureDate, numberOfSeats } = req.query

    const flights = await Flight.find({
      departure,
      destination,
      departureDate,
    })
      .where('totalSeats')
      .gt(numberOfSeats)

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

// Update Records and flights all affect reservation Model
// reservation info GET req.
customer.get('/reservations/:reservationId', async (req, res) => {
  const checkForReservation = await Reservation.findById(
    req.params.reservationId
  )

  try {
    const reservation = await Reservation.findById(
      req.params.reservationId
    ).populate([
      { path: 'passengerId', model: 'Passenger' },
      { path: 'flightNumberId', model: 'Flight' },
      { path: 'seatNumberId', model: 'Seat' },
    ])

    res.status(201).json(reservation)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Get all available seats
customer.get('/search/flight/available-seats/:flightId', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId).populate([
      { path: 'seats', model: 'Seat' },
    ])
    res.status(200).json(flight)
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
    console.log('PUT request on update-flight')

    const { reservationId, seatId, newSeatId } = req.body
    // get and Update current Seat
    const currentSeat = await Seat.findById(seatId)
    currentSeat.available = true
    await currentSeat.save()

    // // get and update new seat
    const newSeat = await Seat.findById(newSeatId)
    newSeat.available = false
    await newSeat.save()

    // get reservation and update
    const reservation = await Reservation.findById(reservationId)
    reservation.seatNumberId = newSeatId
    await reservation.save()

    // ,{"flightNumberId": newFlightId, "seatNumber": newSeatId}

    console.log('PUT Completed')

    res.status(200).json({
      message: 'Flight updated',
      updatedReservation: reservation,
    })
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Handles **OLD** seat information update
customer.put('/update-old-seat', async (req, res) => {
  try {
    if (req.body.oldSeatId.length === 2) {
      const seatStatusOne = await Seat.findByIdAndUpdate(
        req.body.oldSeatId[0],
        req.body
      )
      const seatStatusTwo = await Seat.findByIdAndUpdate(
        req.body.oldSeatId[1],
        req.body
      )
      return res.status(200).json({
        message: `Seats ${seatStatusOne} and ${seatStatusTwo} were updated to available true`,
      })
    } else {
      const seatStatusOne = await Seat.findByIdAndUpdate(
        req.body.oldSeatId[0],
        req.body
      )
      return res.status(200).json({
        message: `Seat ${seatStatusOne} was updated to available true`,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
})

// Cancel Flights DELETE(reservation)
customer.delete(
  '/reservations/cancellation/:reservationId/:passengerId',
  async (req, res) => {
    const array = []
    const getPassengerId = (string) => {
      const firstPassengerId = string.slice(0, 24)
      const secondPassengerId = string.slice(25, 49)
      array.push(firstPassengerId)
      array.push(secondPassengerId)
    }
    getPassengerId(req.params.passengerId)

    const reservation = await Reservation.findById(req.params.reservationId)
    const passengerOne = await Passenger.findById(array[0])
    if (!reservation) {
      return res.status(400).json('Reservation not found')
    }
    if (!passengerOne) {
      return res.status(400).json('Passenger not found')
    }
    try {
      if (array[1].length === 0) {
        await reservation.deleteOne()
        await passengerOne.deleteOne()
      } else {
        const passengerTwo = await Passenger.findById(array[1])
        await reservation.deleteOne()
        await passengerOne.deleteOne()
        await passengerTwo.deleteOne()
      }

      res.status(200).json(`Reservation ${reservation._id.toString()} Deleted`)
    } catch (error) {
      res.status(400).json({
        message: 'Reservation Not Deleted',
      })
    }
  }
)

// REMOVE AFTER TESTING !!!!!!!!!!!
customer.get('/search/flights', async (req, res) => {
  try {
    const flight = await Flight.find()
    res.status(200).json(flight)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// REMOVE AFTER TESTING !!!!!!!!!!!
customer.get('/search/seats', async (req, res) => {
  try {
    const seat = await Seat.find()
    res.status(200).json(seat)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})
// REMOVE AFTER TESTING !!!!!!!!!!!
customer.get('/search/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id)
    res.status(200).json(seat)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

module.exports = customer
