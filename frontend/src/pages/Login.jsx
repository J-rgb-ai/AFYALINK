import React, { useState } from 'react';
import { FaHeartbeat, FaEnvelope, FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login submitted!');
  };

  return (
    <div 
      style={{ 
        fontFamily: 'Segoe UI, Arial, sans-serif', 
        background: '#f7f9fc', 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0 
      }}
    >
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #2a4365 0%, #805ad5 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ background: 'rgba(44,62,80,0.85)', borderRadius: 16, padding: '2.5rem 2rem', maxWidth: 400, width: '100%', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FaHeartbeat style={{ marginRight: 8, color: '#f6ad55', fontSize: '2rem' }} />
              <span style={{ fontWeight: 700, fontSize: '2rem', color: '#fff', letterSpacing: 1 }}>AFYALINK</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label htmlFor="email" style={{ color: '#e2e8f0', fontWeight: 500, display: 'block', marginBottom: 6 }}>Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: 'none', fontSize: '1rem', background: '#f7fafc', color: '#2a4365', marginBottom: 4 }}
                />
              </div>
              <div style={{ marginBottom: '1.2rem' }}>
                <label htmlFor="password" style={{ color: '#e2e8f0', fontWeight: 500, display: 'block', marginBottom: 6 }}>Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: 'none', fontSize: '1rem', background: '#f7fafc', color: '#2a4365', marginBottom: 4 }}
                />
              </div>
              <button type="submit" style={{ background: '#f6ad55', color: '#2a4365', padding: '0.75rem 1.5rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', width: '100%', marginBottom: '1rem' }}>Login</button>
            </form>
            <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
              <span style={{ color: '#e2e8f0' }}>Don't have an account? </span>
              <a href="/register" style={{ color: '#f6ad55', textDecoration: 'underline', fontWeight: 500 }}>Register</a>
            </div>
            <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
              <a href="/forgot-password" style={{ color: '#f6ad55', textDecoration: 'underline', fontWeight: 500 }}>Forgot Password?</a>
            </div>
          </div>
        </div>
        {/* Contact Section */}
        <section style={{ padding: '2rem 0', color: '#fff', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(90deg, #805ad5 0%, #f6ad55 100%)', borderRadius: 16, padding: '1.2rem', maxWidth: 400, margin: '2rem auto 0 auto', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.7rem', color: '#2a4365' }}>Let's Start</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', marginBottom: '0.7rem' }}>
              <FaEnvelope style={{ color: '#2a4365', marginRight: 8 }} /> <span style={{ color: '#2a4365', fontWeight: 500 }}>info@afyalink.com</span>
              <FaPhoneAlt style={{ color: '#2a4365', marginRight: 8 }} /> <span style={{ color: '#2a4365', fontWeight: 500 }}>+254 700 000 000</span>
            </div>
            <button style={{ background: '#2a4365', color: '#fff', padding: '0.6rem 1.2rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Contact Us</button>
          </div>
        </section>
        {/* Footer */}
        <footer style={{ padding: '1.2rem 0', color: '#fff', textAlign: 'center', background: 'rgba(44,62,80,0.7)', borderRadius: '24px 24px 0 0', marginTop: '1.5rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginBottom: '0.7rem' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} style={{ color: '#f6ad55' }} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={20} style={{ color: '#f6ad55' }} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} style={{ color: '#f6ad55' }} /></a>
          </div>
          <div style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>
            &copy; {new Date().getFullYear()} AFYALINK. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LoginForm;
