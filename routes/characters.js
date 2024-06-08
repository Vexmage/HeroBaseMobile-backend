// This is the route for creating a new character. It listens for POST requests to the / endpoint.
// When a POST request is received, the code validates the request body using express-validator.
// If there are validation errors, the code returns a 400 response with the errors.

const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Character = require('../models/Character');
const router = express.Router();

// Create a new character
// POST /api/characters
router.post( // Validate request body
  '/',
  [
    auth, // Middleware to verify token
    [
      check('name', 'Name is required').not().isEmpty(),
      check('ancestry', 'Ancestry is required').not().isEmpty(),
      check('background', 'Background is required').not().isEmpty(),
      check('characterClass', 'Class is required').not().isEmpty(),
      check('stats', 'Stats are required').not().isEmpty()
    ]
  ],
  async (req, res) => { // Handle request
    const errors = validationResult(req); // Get validation errors
    if (!errors.isEmpty()) { // If there are errors
      return res.status(400).json({ errors: errors.array() });
    }

// The code below is trying to create a new character. It first extracts the required fields from the request body.
// It then creates a new character object with the extracted fields and the user ID from the request object.
// It saves the character to the database and returns the character in the response.
// If there is an error, it logs the error and returns a 500 response with a message saying "Server error".

    const { name, ancestry, background, characterClass, stats } = req.body;

    try {
      const newCharacter = new Character({
        userId: req.user.id,
        name,
        ancestry,
        background,
        characterClass,
        stats
      });

      const character = await newCharacter.save();
      res.json(character);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Delete a character by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ msg: 'Character not found' });
    }

    // Ensure user owns the character
    if (character.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Character.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Character removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Character not found' });
    }
    res.status(500).send('Server error');
  }
});

// Get all characters for the logged-in user
// GET /api/characters
// The code below is trying to get all characters for the logged-in user. 
// It first tries to find all characters in the database with the user ID from the request object.
// If there are characters, it returns them in the response.
// If there are no characters, it returns an empty array in the response.
// If there is an error, it logs the error and returns a 500 response with a message saying "Server error".

router.get('/', auth, async (req, res) => {
  try {
    const characters = await Character.find({ userId: req.user.id });
    res.json(characters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
