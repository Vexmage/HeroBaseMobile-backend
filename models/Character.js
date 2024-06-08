// This is the Character model. It defines the schema for a character in the database.


const mongoose = require('mongoose'); // Import mongoose

const CharacterSchema = new mongoose.Schema({ // Create character schema
  userId: { // User ID
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { // Character name
    type: String,
    required: true
  },
  ancestry: { // Character ancestry
    type: String,
    required: true
  },
  background: { // Character background
    type: String,
    required: true
  },
  characterClass: { // Character class
    type: String,
    required: true
  },
  stats: { // Character stats
    strength: {
      type: Number,
      required: true
    },
    dexterity: {
      type: Number,
      required: true
    },
    constitution: {
      type: Number,
      required: true
    },
    intelligence: {
      type: Number,
      required: true
    },
    wisdom: {
      type: Number,
      required: true
    },
    charisma: {
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('Character', CharacterSchema);
