// auth.js
const express = require('express');
const router = express.Router();

// Importing loginUser function from authController
const { loginUser } = require('../controllers/authController');

// Correct usage of post method with loginUser as a callback function
router.post('/login', loginUser);

module.exports = router;
