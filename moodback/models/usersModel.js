const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //plug in for making sure email (or anything else) is unique
const bcrypt = require('bcrypt'); //use it for hashing passwords

// Define your schema as normal.
const userSchema = mongoose.Schema({
  name: String,
  lastname: String,
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true }
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

// here we hash all the password and then save them
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});


// Define User model
const User = mongoose.model('User', userSchema);

module.exports = User;
