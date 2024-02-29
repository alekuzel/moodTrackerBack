const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usersModel');

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET is not defined' });
  }

  try {
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    
    // Send JSON response with token
    res.status(200).json({ token });
  } catch (err) {
    // Handle error
    console.error('Error generating JWT token:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { loginUser };
