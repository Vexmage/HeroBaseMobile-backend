const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Character = require('../models/Character');
const router = express.Router();

// Create a new character
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('ancestry', 'Ancestry is required').not().isEmpty(),
      check('background', 'Background is required').not().isEmpty(),
      check('characterClass', 'Class is required').not().isEmpty(),
      check('stats', 'Stats are required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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

// Get all characters for the logged-in user
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
