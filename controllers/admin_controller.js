const express = require('express')
const db = require('../models')
const admin = express.Router()
const { Flight, Passenger, Reservation, Seat } = db

// ALL FLIGHT ROUTES /////////////////////////////////

// GET ROUTE FOR ALL FLIGHTS
admin.get('/index', async (req, res) => {
  // const flights = await Flight.find()
  // res.status(201).json(flights)
  res.status(201).json({ message: 'Got Flights' })
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
admin.post('/seats', async (req, res) => {
  // const { flightNumber, seatNumber, available, seatclass, charge } = req.body
  // if (!flightNumber || !seatNumber || !available) res.status(400)
  // throw new Error('Please add all fields')
  // const newSeat = await Seat.create({
  //   flightNumber,
  //   seatNumber,
  //   available,
  //   seatclass,
  //   charge,
  //   flightnumber: req.flight.id,
  // })
  // res.status(201).json(newSeat)

  res.status(201).json({ message: 'New seat created' })
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
module.exports = admin
