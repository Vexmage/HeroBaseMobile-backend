const express = require('express'); // Import express
const bcrypt = require('bcryptjs'); // Import bcrypt
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const User = require('../models/User'); // Import User model
const { check, validationResult } = require('express-validator'); // Import express-validator
const router = express.Router(); // Create router

// The code below is a route that listens for POST requests to the /register endpoint.
// When a POST request is received, the code validates the request body using express-validator.
// If there are validation errors, the code returns a 400 response with the errors. 

// User Registration Route
router.post('/register', [ // Validate request body
  check('username', 'Username is required').not().isEmpty(), // Validate username
  check('password', 'Password is required').isLength({ min: 6 }) // Validate password
], async (req, res) => { // Handle request
  const errors = validationResult(req); // Get validation errors
  if (!errors.isEmpty()) { // If there are errors
    return res.status(400).json({ errors: errors.array() }); // Return errors
  }

  // The code below is trying to register a new user. 
  // It first checks if the user already exists in the database.
  // If the user exists, it returns a 400 response with a message saying "User already exists".
  // If the user does not exist, it creates a new user with the provided username and password.
  // It then saves the user to the database and generates a JWT token with the user's id as the payload.
  // The token is signed with a secret key and returned in the response.

  const { username, password } = req.body; // Get username and password from request body
  try { // Try to register user
    let user = await User.findOne({ username }); // Find user by username
    if (user) { // If user exists
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, password }); // Create new user

    await user.save(); // Save user to database

    const payload = { // Create JWT payload
      user: {
        id: user.id,
      },
    };

    jwt.sign( // Sign JWT token
      payload,
      'yourSecretKey',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// User Login Route
// The code below is a route that listens for POST requests to the /login endpoint.
// When a POST request is received, the code validates the request body using express-validator.
// If there are validation errors, the code returns a 400 response with the errors.
// The code then tries to find the user by username in the database.
// If the user is not found, it returns a 400 response with a message saying "Invalid credentials".
// If the user is found, it compares the password with the hashed password in the database using bcrypt.
// If the passwords match, it generates a JWT token with the user's id as the payload.
router.post('/login', [
  check('username', 'Username is required').not().isEmpty(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  console.log('Received login request:', req.body); // Debug log
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array()); // Debug log
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  // The code below is trying to log in a user.
  try {
    let user = await User.findOne({ username });
    if (!user) {
      console.log('Invalid credentials: user not found'); // Debug log
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isMatch) {
      console.log('Invalid credentials: password mismatch'); // Debug log
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    // Create JWT token
    const payload = { // Create JWT payload
      user: {
        id: user.id,
      },
    };

    jwt.sign( // Sign JWT token
      payload,
      'yourSecretKey', // Secret key
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err; // Handle error
        res.json({ token }); // Return token
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
