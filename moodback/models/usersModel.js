const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String
});

// Define User model
const User = mongoose.model('User', userSchema);

module.exports = User;
