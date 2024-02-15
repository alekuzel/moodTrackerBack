const mongoose = require('mongoose');

// Define Mood schema
const moodSchema = new mongoose.Schema({
  high: Number,
  low: Number,
  sleep: Number,
  move: Number,
  date: Date,
  userid: Number
});

// Define Mood model
const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;
