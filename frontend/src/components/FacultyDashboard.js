import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function FacultyDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get('/users/students'); 
        setStudents(data);
      } catch (err) {
        setError('Failed to fetch students. Please ensure you are logged in as faculty.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleMarkAttendance = async (studentId, status) => {
    try {
      await api.post('/attendance/mark', { studentId, status });
      setMessage(`Attendance marked as '${status}' for the student.`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to mark attendance.');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return <p>Loading student list...</p>;
  }

  return (
    <div className="faculty-dashboard">
      <h1>Faculty Dashboard</h1>
      <p>Mark daily attendance for students.</p>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <ul className="student-list">
        {students.length > 0 ? (
          students.map(student => (
            <li key={student._id} className="student-list-item">
              <div className="student-info">
                {student.name}
                <span>ID: {student.studentId || 'N/A'}</span>
              </div>
              <div className="attendance-actions">
                <button 
                  onClick={() => handleMarkAttendance(student._id, 'Present')}
                  className="present-btn"
                >
                  Present
                </button>
                <button 
                  onClick={() => handleMarkAttendance(student._id, 'Absent')}
                  className="absent-btn"
                >
                  Absent
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </ul>
    </div>
  );
}

export default FacultyDashboard;