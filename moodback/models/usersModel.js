const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: String,
  lastname: String,
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

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

// Override toJSON method to return _id as a string
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
