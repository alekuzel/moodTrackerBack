const mongoose = require('mongoose');

// Define Notes schema
const noteSchema = new mongoose.Schema({
  title: String,
  text: String,
  date: Date,
  userid: String //that is user who created the note
});

// Define User model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
