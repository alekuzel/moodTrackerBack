const bcrypt = require('bcrypt');
const User = require('../models/usersModel');

async function registerUser(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during registration');
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid password');

  // Here you would typically generate a session token or JWT and send it to the client
  res.send('Login successful');
}

module.exports = { registerUser, loginUser };
