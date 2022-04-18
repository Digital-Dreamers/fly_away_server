// Import Dependencies
const express = require('express')
const app = express();
require('dotenv').config()
const portNumber = process.env.PORT

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Controllers
app.use('/admin', require('./controllers/admin_controller'))

// Root
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});
// Start server

app.listen(portNumber, () => console.log(`Listening to port ${portNumber}`));
