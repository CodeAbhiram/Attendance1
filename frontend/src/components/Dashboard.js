import React from 'react';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';

function Dashboard({ user, logout }) {
  if (user.role === 'faculty') {
    return (
      <div>
        <FacultyDashboard user={user} />
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
    );
  }

  return <StudentDashboard user={user} logout={logout} />;
}

export default Dashboard;