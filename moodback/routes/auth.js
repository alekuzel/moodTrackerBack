// auth.js
const express = require('express');
const router = express.Router();

// Importing loginUser function from authController
const { loginUser } = require('../controllers/authController');


router.post('/login', loginUser);

module.exports = router;
