const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/authController');
const { auth, isFaculty } = require('../middleware/auth');

// This route will first run the `auth` middleware, then `isFaculty`, 
// and only if both pass will it run the `getAllStudents` controller.
router.get('/students', [auth, isFaculty], getAllStudents);

module.exports = router;