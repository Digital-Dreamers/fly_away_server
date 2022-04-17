const express = require("express");
const admin = express.Router();

// GET ROUTE FOR ALL FLIGHTS
admin.get("/index", async (req, res) => {
  // const flights = await Flight.find()
  // res.status(201).json(flights)
  res.status(201).json({ message: "Got Flights" });
});

// CREATE A SINGLE FLIGHT ROUTE
admin.post("/index", async (req, res) => {
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

  res.status(201).json({ message: "New flight created" });
});

// GET ROUTE FOR ALL SEATS THAT BELONG TO A PARTICULAR FLIGHT
admin.get("/seats/:id", async (req, res) => {
  // const seatsByFlight = await Seat.find(req.params.id)
  // res.status(201).json(seatsByFlight)
  res.status(201).json({ message: "Got all seats" });
});

// CREATE A SEAT ROUTE
admin.post("/seats", async (req, res) => {
  // const { flightNumber, seatNumber, available } = req.body;
  // if (!flightNumber || !seatNumber || !available) res.status(400);
  // throw new Error("Please add all fields");
  // const newSeat = await Seat.create({
  //   flightNumber,
  //   seatNumber,
  //   available,
  //   user: req.user.id,
  // });
  // res.status(201).json(newSeat);

  res.status(201).json({ message: "New seat created" });
});

module.exports = admin;
