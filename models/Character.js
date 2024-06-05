const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  ancestry: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  characterClass: {
    type: String,
    required: true
  },
  stats: {
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
