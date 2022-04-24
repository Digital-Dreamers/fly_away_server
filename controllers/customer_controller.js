const customer = require('express').Router()
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
    }).where('totalSeats').gt(numberOfSeats)

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
  const { flightNumberId, seatNumberId, passengerId } = req.body

  if (
    !firstName ||
    !lastName ||
    !age ||
    !address ||
    !city ||
    !state ||
    !reservationNumber ||
    !flightNumberId ||
    !seatNumberId
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
      flightNumberId,
      seatNumberId,
      passengerId: passengerInfo._id.toString(),
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
customer.get('/reservations/:reservationId', async (req, res) => {
  const checkForReservation = await Reservation.findById(
    req.params.reservationId
  )

  if (!checkForReservation) {
    return res
      .status(400)
      .json({ Message: `Reservation ${req.params.reservationId} Not Found` })
  }
  try {
    const reservation = await Reservation.findById(
      req.params.reservationId
    ).populate([
      { path: 'passenger', model: 'Passenger' },
      { path: 'flightNumberId', model: 'Flight' },
      //   { path: "totalSeats", model: "Flight" },
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

customer.put(
  '/update-seat/:flightId/:currentSeatId/:newSeatId',
  async (req, res) => {
    const flight = await Flight.findById(req.params.flightId)

    currentSeat_id = req.params.currentSeatId
    flight_id = req.params.flightId
    console.log(currentSeat_id)
    console.log(flight_id)
    try {
      Flight.updateOne(
        {
          _id: ObjectId('6261f984fb80bd3ada64aa0b'),
          'seat._id': '6261f984fb80bd3ada64aa0e',
        },

        { $set: { 'seat.$.number': '1A' } }
      )

      res.status(200).json({
        message: 'Seat updated',
        updatedFlight: 'Updated seat object',
      })
    } catch (error) {
      res.status(500).json({
        message: error,
      })
    }
  }
)

// Handles flight information update
customer.put('/update-flight', async (req, res) => {
  try {
    console.log('PUT request on update-flight')
    
    const { reservationId, flightId, seatId, newFlightId, newSeatId } = req.body
    //getting current flight and updating
    const currentFlight = await Flight.findById(flightId)
    currentFlight.totalSeats =  currentFlight.totalSeats + 1
    await currentFlight.save()

    // // get newFlight and update its seat
    const newFlight = await Flight.findById(newFlightId)
    newFlight.totalSeats = newFlight.totalSeats - 1
    await newFlight.save()

    // get and Update current Seat
    const currentSeat = await Seat.findById(seatId)
    currentSeat.available = true
    await currentSeat.save()

    // // get and update new seat
    const newSeat = await Seat.findById(newSeatId)
    newSeat.available = false
    await newSeat.save()
    console.log(newSeat)
    

    // get reservation and update
    const reservation = await Reservation.findById(reservationId)
    reservation.flightNumberId = newFlightId
    reservation.seatNumber = newSeatId
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

// Cancel Flights DELETE(reservation) PUT(Seat)
customer.delete(
  '/reservations/cancellation/:reservationId/:passengerId',
  async (req, res) => {
    const reservation = await Reservation.findById(req.params.reservationId)
    const passenger = await Passenger.findById(req.params.passengerId)
    if (!reservation) {
      return res.status(400).json('Reservation not found')
    }
    if (!passenger) {
      return res.status(400).json('Passenger not found')
    }
    try {
      await reservation.deleteOne()
      await passenger.deleteOne()
      res.status(200).json(`Reservation ${reservation._id.toString()} Deleted`)
    } catch (error) {
      res.status(500).json({
        message: 'Reservation Not Deleted',
      })
    }
  }
)

module.exports = customer
