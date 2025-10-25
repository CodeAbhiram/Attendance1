import React, { useState } from 'react';
import api from '../utils/api';

function Register({ setUser }) {
  // --- Form State ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student'); // Role state, defaults to student
  
  // Student-specific state
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // --- Frontend Validation ---
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    // --- Prepare Registration Data ---
    const registrationData = {
      name,
      email,
      password,
      role, // Use the selected role
    };

    // Add student-specific fields only if the role is 'student'
    if (role === 'student') {
      registrationData.studentId = studentId;
      registrationData.department = department;
    }

    // --- API Call ---
    try {
      const { data } = await api.post('/auth/register', registrationData);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err) {
      setError(err.response?.data.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container"> 
      {/* Dynamic Title */}
      <h2>{role === 'student' ? 'Student Registration' : 'Faculty Registration'}</h2>
      
      {error && <p className="error-message">{error}</p>}

      {/* --- Role Selector --- */}
      <select value={role} onChange={e => setRole(e.target.value)} required>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </select>
      
      <input
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="University Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      
      {/* --- Conditional Fields for Students --- */}
      {role === 'student' && (
        <>
          <input
            placeholder="Student ID / Roll Number"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            required
          />
          <select value={department} onChange={e => setDepartment(e.target.value)} required>
            <option value="" disabled>-- Select Department --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Biotechnology">Biotechnology</option>
          </select>
        </>
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      />
      
      <button type="submit" className="submit-btn">Register</button>
    </form>
  );
}

export default Register;