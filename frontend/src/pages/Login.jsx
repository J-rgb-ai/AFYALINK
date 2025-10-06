import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  root: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Inter, system-ui, Segoe UI, Roboto, Arial',
    color: '#0f1720',
    backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80')",
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
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
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
};

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
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
    // For now, restrict login to users with role 'Doctor' only
    if (formData.role === 'Doctor') {
      setError('');
      alert('Login successful!');
      navigate('/doctor-dashboard');
    } else {
      setError('Access restricted: Only Doctors can login for now.');
    }
  };

  return (
    <div style={styles.root}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
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
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="" disabled>Select Role</option>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Lab Tec">Lab Tec</option>
          <option value="Patient">Patient</option>
        </select>
        <button type="submit" style={styles.button}>Login</button>
        {error && <p style={styles.error}>{error}</p>}
        <Link to="/register" style={styles.link}>Don't have an account? Register here</Link>
      </form>
    </div>
  );
}

export default LoginForm;
