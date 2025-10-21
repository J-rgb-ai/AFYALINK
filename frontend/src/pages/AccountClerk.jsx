import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AccountClerkDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'account_clerk') {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: "url('https://thumbs.dreamstime.com/z/female-surgeon-operating-assistants-surgeons-work-blue-filter-modern-medicine-professional-doctors-female-surgeon-180933368.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontFamily: 'Inter, system-ui, Segoe UI, Roboto, Arial',
      color: '#0f1720'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'rgba(0,0,0,0.7)',
        borderRadius: '0 0 24px 24px',
        color: '#fff'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>AFYALINK - Account Clerk Dashboard</h1>
          <div style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>
            {currentUser ? `Welcome, ${currentUser.fullName} (${currentUser.uniqueId})` : 'Account Clerk'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={{
              background: '#f6ad55',
              color: '#2a4365',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
            onClick={() => { if (confirm('Sign out?')) { localStorage.clear(); navigate('/login'); } }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }}>
        <main>
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            borderRadius: '12px',
            padding: '1.5rem',
            color: '#fff'
          }}>
            <h2 style={{ marginTop: 0 }}>Account Clerk Overview</h2>
            <p>Manage billing, insurance claims, and financial records.</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3>Pending Bills</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>25</p>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3>Insurance Claims</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>18</p>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3>Revenue This Month</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>$45K</p>
              </div>
            </div>
            <div>
              <h3>Quick Actions</h3>
              <button style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                background: '#10b981',
                color: '#fff',
                cursor: 'pointer',
                marginRight: '1rem'
              }}>Process Bill</button>
              <button style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                background: '#3b82f6',
                color: '#fff',
                cursor: 'pointer',
                marginRight: '1rem'
              }}>Submit Claim</button>
              <button style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                background: '#f59e0b',
                color: '#fff',
                cursor: 'pointer'
              }}>View Reports</button>
            </div>
          </div>
        </main>
      </div>

      <footer style={{
        padding: '2rem 4vw',
        color: '#fff',
        textAlign: 'center',
        background: 'rgba(44,62,80,0.7)',
        borderRadius: '24px 24px 0 0',
        marginTop: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} style={{ color: '#f6ad55' }} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} style={{ color: '#f6ad55' }} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} style={{ color: '#f6ad55' }} /></a>
        </div>
        <div style={{ fontSize: '1rem', color: '#e2e8f0' }}>
          &copy; {new Date().getFullYear()} AFYALINK. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AccountClerkDashboard;
