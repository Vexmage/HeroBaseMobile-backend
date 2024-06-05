const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const db = process.env.MONGO_URI;

mongoose.connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('API Running'));

// Import routes
const auth = require('./routes/auth');
const characters = require('./routes/characters');

// Use routes
app.use('/api/auth', auth);
app.use('/api/characters', characters);

console.log('Registered routes: /api/auth and /api/characters');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});
