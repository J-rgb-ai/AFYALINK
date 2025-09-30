import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add forgot password logic here (e.g., send reset link)
    setSubmitted(true);
  };

  return (
    <div className="registration-page-outer">
      <div className="registration-container">
        <h1 className="project-title">AFYALINK</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <label htmlFor="email"><b>Email Address</b></label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="submit-btn">Send Reset Link</button>
        </form>
        {submitted && (
          <div style={{ marginTop: '1rem', color: '#1a73e8' }}>
            If this email is registered, a password reset link will be sent.
          </div>
        )}
        <div style={{ marginTop: '1rem' }}>
          <a href="/login" style={{ color: '#1a73e8', textDecoration: 'underline' }}>Back to Login</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;