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