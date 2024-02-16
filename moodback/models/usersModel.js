const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Define your schema as normal.
const userSchema = mongoose.Schema({
  name: String,
  lastname: String,
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true }
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);




// Define User model
const User = mongoose.model('User', userSchema);

module.exports = User;
