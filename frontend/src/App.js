import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const setUserAndStore = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowRegister(false);
  };

  if (user) {
    return <Dashboard user={user} logout={logout} />;
  }

  return (
    <div className="app-container">
      {showRegister ? (
        <>
          <Register setUser={setUserAndStore} />
          <p className="toggle-form-container">
            Already have an account?{' '}
            <button onClick={() => setShowRegister(false)} className="toggle-form-btn">Login</button>
          </p>
        </>
      ) : (
        <>
          <Login setUser={setUserAndStore} />
          <p className="toggle-form-container">
            Don't have an account?{' '}
            <button onClick={() => setShowRegister(true)} className="toggle-form-btn">Register</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;