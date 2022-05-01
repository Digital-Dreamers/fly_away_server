const express = require('express')
const db = require('../models')
const admin = express.Router()
const { Flight, Passenger, Reservation, Seat } = db

// ALL FLIGHT ROUTES /////////////////////////////////

// GET ROUTE FOR ALL FLIGHTS
admin.get('/search/flights', async (req, res) => {
  try {
    const flight = await Flight.find()
    res.status(200).json(flight)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})
admin.get('/search/passengers', async (req, res) => {
  try {
    const flight = await Passenger.find()
    res.status(200).json(flight)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// CREATE A SINGLE FLIGHT ROUTE
admin.post('/index', async (req, res) => {
  //   const {
  //     flightnumber,
  //     schedule,
  //     departure,
  //     destination,
  //     departingDate,
  //     departingTime,
  //     arrivalDate,
  //     arrivalTime,
  //     totalSeatCount,
  //   } = req.body;

  //   if (
  //     !flightnumber ||
  //     !schedule ||
  //     !departure ||
  //     !destination ||
  //     !departingDate ||
  //     !departingTime ||
  //     !arrivalDate ||
  //     !arrivalTime ||
  //     !totalSeatCount
  //   ) {
  //     res.status(400);
  //     throw new Error("Please add all fields");
  //   }
  //   const newFlight = await Flight.create({
  //     flightnumber,
  //     schedule,
  //     departure,
  //     destination,
  //     departingDate,
  //     departingTime,
  //     arrivalDate,
  //     arrivalTime,
  //     totalSeatCount,
  //   });
  //   res.status(201).json(newFlight);

  res.status(201).json({ message: 'New flight created' })
})

// UPDATE FLIGHT ROUTE
admin.post('/update-flight/:flightId', async (req, res) => {
  const updateFlight = await findById(req.params.id).then((flight) => {
    Seat.create(req.body)
      .then((seat) => {
        flight.seat.push(seat.id)
        flight.save()
      })
      .catch((err) => {
        res.status('error404')
      })
  })

  res
    .status(201)
    .json({ message: `Flight number ${req.params.id} was updated` })
})

// DELETE FLIGHT ROUTE
admin.delete('/index/:id', async (req, res) => {
  // const flight = await Flight.findById(req.params.id);
  // if (!flight) {
  //   res.status(400);
  //   throw new Error("Flight not found");
  // }
  // await flight.deleteOne();
  // res.status(201).json({ id: req.params.id });

  res
    .status(201)
    .json({ message: `Flight number ${req.params.id} was deleted` })
})

// ALL SEAT ROUTES /////////////////////////////////

// GET ROUTE FOR ALL SEATS THAT BELONG TO A PARTICULAR FLIGHT
admin.get('/seats/:id', async (req, res) => {
  // const seatsByFlight = await Seat.find(req.params.id)
  // res.status(201).json(seatsByFlight)
  res
    .status(201)
    .json({ message: `Got all seats that belong to flight ${req.params.id}` })
})

// CREATE A SEAT ROUTE

admin.post('/create/seats', async (req, res) => {
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
admin.put('/seats/:id', async (req, res) => {
  // const seat = await Seat.findById(req.params.id);
  // if (!seat) {
  //   res.status(400);
  //   throw new Error("Seat not found");
  // }

  // const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });
  // res.status(201).json(updatedSeat);

  res.status(201).json({ message: `Seat number ${req.params.id} was updated` })
})

admin.delete('/seats/:id', async (req, res) => {
  // const seat = await Seat.findById(req.params.id);
  // if (!seat) {
  //   res.status(400);
  //   throw new Error("Seat not found");
  // }
  // await seat.deleteOne();
  // res.status(201).json({ id: req.params.id });

  res.status(201).json({ message: `Seat number ${req.params.id} was deleted` })
})

// REMOVE AFTER TESTING !!!!!!!!!!!
admin.delete('/passengers', async (req, res) => {
  try {
    const passengers = await Passenger.deleteMany()
    res.status(200).json(passengers)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// REMOVE AFTER TESTING !!!!!!!!!!!
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
