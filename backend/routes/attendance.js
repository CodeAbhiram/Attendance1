const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { auth, isFaculty } = require('../middleware/auth');

router.use(auth);

router.get('/', attendanceController.getAttendance);
router.get('/today', attendanceController.getTodayAttendance);
router.post('/', attendanceController.createAttendance); // Optional
router.post('/mark', isFaculty, attendanceController.markAttendance);

module.exports = router;
