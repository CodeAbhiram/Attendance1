const Attendance = require('../models/Attendance');

exports.getAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ user: req.user.id }).sort({ date: -1 });
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTodayAttendance = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const record = await Attendance.findOne({ user: req.user.id, date: { $gte: today, $lt: tomorrow } });
    if (record) {
      res.json({ status: record.status });
    } else {
      res.status(404).json({ message: 'No attendance marked for today' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// OPTIONAL: Create attendance record (you can extend later)
exports.createAttendance = async (req, res) => {
  try {
    const { status, date } = req.body;
    const newRecord = new Attendance({
      user: req.user.id,
      status,
      date: date || Date.now()
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Check if already marked
    const existing = await Attendance.findOne({ user: studentId, date: { $gte: today, $lt: tomorrow } });
    if (existing) {
      existing.status = status;
      await existing.save();
      res.json(existing);
    } else {
      const newRecord = new Attendance({ user: studentId, status, date: new Date() });
      await newRecord.save();
      res.status(201).json(newRecord);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
