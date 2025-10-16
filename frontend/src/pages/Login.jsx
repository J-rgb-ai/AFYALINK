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
  subtitle: {
    fontSize: '14px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#ccc',
  },
  input: {
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

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    // Since role is not selected here, assume email check or other logic
    if (formData.email.endsWith('@doctor.com')) {
      setError('');
      alert('Login successful!');
      navigate('/doctor-dashboard');
    } else {
      setError('Access restricted: Only Doctors can login for now.');
    }
  };

  return (
    <div style={styles.root}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <div style={styles.title}>AFYALINK</div>
        <div style={styles.subtitle}>Sign in to access your dashboard</div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.linkContainer}>
          Don't have an account?
          <Link to="/register" style={styles.link}>Register here</Link> |
          <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
