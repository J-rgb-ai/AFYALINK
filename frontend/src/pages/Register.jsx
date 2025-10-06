import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  root: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Inter, system-ui, Segoe UI, Roboto, Arial',
    color: '#0f1720',
    backgroundImage: "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1470&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(12,20,30,0.1)',
  },
  form: {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '12px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#0066cc',
    color: '#fff',
    cursor: 'pointer',
  },
  link: {
    display: 'block',
    marginTop: '10px',
    textAlign: 'center',
    color: '#0066cc',
    cursor: 'pointer',
    textDecoration: 'underline',
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration submitted for role: ${formData.role}`);
    navigate('/login');
  };

  return (
    <div style={styles.root}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Register</h2>
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
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Lab Tec">Lab Tec</option>
          <option value="Patient">Patient</option>
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
        <Link to="/login" style={styles.link}>Already have an account? Login here</Link>
      </form>
    </div>
  );
}

export default Register;
