// Description: Main entry point for the server. 
// This file is responsible for setting up the server and connecting to the database.
// The code below imports the required modules: express, mongoose, and body-parser.
// The code then creates an instance of the express app and sets up the body-parser middleware.
// The code connects to the MongoDB database using the MONGO_URI environment variable.
// The code registers the auth and characters routes and starts the server on the specified port.
// The code listens for incoming requests and responds with 
// "API Running" when the root endpoint is accessed.

const express = require('express'); // Import express
const mongoose = require('mongoose'); // Import mongoose
const bodyParser = require('body-parser'); // Import body-parser
require('dotenv').config(); // Import dotenv

const app = express(); // Create express app

app.use(bodyParser.json()); // Use body-parser middleware

const db = process.env.MONGO_URI; // Get MongoDB URI from environment

mongoose.connect(db) // Connect to MongoDB
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('API Running'));

// Import routes
const auth = require('./routes/auth'); // Import auth route
const characters = require('./routes/characters'); // Import characters route

// Use routes
app.use('/api/auth', auth); // Use auth route
app.use('/api/characters', characters); // Use characters route

console.log('Registered routes: /api/auth and /api/characters');

const PORT = process.env.PORT || 5000; // Get port from environment or use 5000
app.listen(PORT, () => { // Start server
console.log(`Server started on port ${PORT}`);
});
