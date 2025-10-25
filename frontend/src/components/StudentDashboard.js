import React, { useEffect, useState, useCallback } from 'react';
import api from '../utils/api';

function StudentDashboard({ user, logout }) {
  const [todayStatus, setTodayStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTodayStatus = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await api.get('/attendance/today'); 
      setTodayStatus(res.data.status || 'Not Marked Yet');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setTodayStatus('Not Marked Yet');
      } else {
        setError('Failed to fetch today\'s attendance');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodayStatus();
  }, [fetchTodayStatus]);

  const getStatusClassName = () => {
    if (todayStatus === 'Present') return 'status-present';
    if (todayStatus === 'Absent') return 'status-absent';
    return 'status-default';
  };

  return (
    <div className="dashboard-container">
      <h1>My University Portal</h1>
      <h2>Welcome, {user.name}</h2>
      <p>Email: <span>{user.email}</span></p>
      
      {error && <p className="error-message">{error}</p>}

      <div className="attendance-status-box">
        <h3>Today's Attendance</h3>
        {isLoading ? (
          <p>Loading status...</p>
        ) : (
          <p className={`status-text ${getStatusClassName()}`}>{todayStatus}</p>
        )}
        <button onClick={fetchTodayStatus} className="refresh-btn" disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh Status'}
        </button>
      </div>

      <button onClick={logout} className="logout-btn">Logout</button>
    </div>
  );
}

export default StudentDashboard;