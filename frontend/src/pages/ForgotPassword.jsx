import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
  success: {
    color: '#10b981',
    marginTop: '10px',
    textAlign: 'center',
  },
};

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add forgot password logic here (e.g., send reset link)
    setSubmitted(true);
  };

  return (
    <div style={styles.root}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <div style={styles.title}>AFYALINK</div>
        <div style={styles.subtitle}>Reset your password</div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send Reset Link</button>
        {submitted && (
          <p style={styles.success}>
            If this email is registered, a password reset link will be sent.
          </p>
        )}
        <div style={styles.linkContainer}>
          Remember your password?
          <Link to="/login" style={styles.link}>Login here</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
