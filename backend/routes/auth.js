const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Correctly import the specific controller functions by destructuring them
const {
  register,
  login,
  getLoggedInUser
} = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   GET api/auth/me
// @desc    Get the logged-in user's data
// @access  Private
router.get('/me', auth, getLoggedInUser);


module.exports = router;