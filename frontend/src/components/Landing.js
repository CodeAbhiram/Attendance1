import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Landing({ user, setUser }) {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const { data } = await api.get('/attendance');
        setAttendance(data);
      } catch (error) {
        console.error('Failed to fetch attendance:', error);
      }
    };
    fetchAttendance();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name} ({user.role})</h1>
      
      <h2>Your Attendance Records:</h2>
      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <ul>
          {attendance.map(record => (
            <li key={record._id}>
              <b>Date:</b> {new Date(record.date).toLocaleDateString()}, <b>Status:</b> {record.status}
            </li>
          ))}
        </ul>
      )}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Landing;