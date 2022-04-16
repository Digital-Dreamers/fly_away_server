# Fly Away App

## Description

***
### Routes
- Costumer Controller "/costumer"
    - Search 
        - GET Request
        - "/"
    - Book Flight
        - POST Request
    - Cancel
        - DELETE(Reservation) and PUT(Seat) Request
    - Update
        - PUT Request
- Admin Controller
    - Create Flights
        - POST Request
    - Create Seats
        - POST Request
    - Delete Flights/Seats
        - DELETE Request
### Models
- Passengers Model
    - First Name
    - Last Name
    - Age
    - Address
    - Reservation No.
- Reservation Model
    - Flight No
    - Seat No
    - Class
- Flight Model 
    - Flight No
    - Schedules
    - Departure
    - Destination
    - Departing Date-Time
    - Arrival Date-time
    - No of seats
- Seats Model
    - Flight No
    - Seat Number
    - Available


### Technologies
 - NodeJS
 - Express
 - MongoDB | Mongoose ODM
 - Middle
    - Cors