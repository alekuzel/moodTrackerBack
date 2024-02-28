const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid password');

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  // Send JSON response with token
  res.json({ token });
}

module.exports = { loginUser };
