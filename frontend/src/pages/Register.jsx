import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1470&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '40px',
    borderRadius: '12px',
    width: '360px',
    color: '#fff',
    boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
    fontFamily: 'Inter, system-ui, Segoe UI, Roboto, Arial',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '14px',
  },
  select: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
  },
  linkContainer: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#ccc',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  error: {
    color: '#f87171',
    marginTop: '10px',
    textAlign: 'center',
  },
};

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    // Store the selected role in localStorage for demo purposes
    localStorage.setItem('userRole', formData.role);
    // Store user data in localStorage
    const userData = {
      fullName: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      idNumber: formData.idNumber,
      role: formData.role,
      uniqueId: `ID${Date.now()}`
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    alert(`Registration submitted for role: ${formData.role}`);
    navigate('/login');
  };

  return (
    <div style={styles.root}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <div style={styles.title}>AFYALINK</div>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          id="idNumber"
          name="idNumber"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="labtech">Lab Tech</option>
          <option value="secretary">Secretary</option>
          <option value="surgeon">Surgeon</option>
          <option value="account_clerk">Account Clerk</option>
          <option value="referral_manager">Referral Manager</option>
          <option value="patient">Patient</option>
        </select>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.linkContainer}>
          Already have an account?
          <Link to="/login" style={styles.link}>Login here</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
