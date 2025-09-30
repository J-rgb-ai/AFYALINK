import React from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaHospital, FaHeartbeat, FaLock, FaBolt, FaBrain, FaMobileAlt, FaChartBar, FaCheckCircle, FaStar, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f7f9fc', minHeight: '100vh', padding: '2rem' }}>
      {/* Gradient Background */}
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #2a4365 0%, #805ad5 100%)', padding: 0 }}>
        {/* Navigation Bar */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 4vw 1rem 4vw', background: 'rgba(44, 62, 80, 0.7)', borderRadius: '0 0 24px 24px' }}>
          <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#fff', letterSpacing: 1 }}>
            <FaHeartbeat style={{ marginRight: 8, color: '#f6ad55' }} /> AFYALINK
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
            <a href="#services" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Services</a>
            <a href="#about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>About</a>
            <a href="#portfolio" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Portfolio</a>
            <a href="#contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Get in Touch</a>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={{ background: '#f6ad55', color: '#2a4365', padding: '0.5rem 1.2rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Login</button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <button style={{ background: '#38a169', color: '#fff', padding: '0.5rem 1.2rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Register</button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '3rem 4vw 2rem 4vw' }}>
          <div style={{ flex: 1, minWidth: 320, color: '#fff', marginRight: '2rem' }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.1 }}>
              Simplify Healthcare Referrals with AFYALINK
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#e2e8f0' }}>
              Streamline your workflow and boost patient outcomes with our secure, digital referral platform connecting, clinics, hospitals, and specialists for faster, smarter care.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#contact">
                <button style={{ background: '#f6ad55', color: '#2a4365', padding: '0.75rem 1.5rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Get in Touch</button>
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section style={{ padding: '2rem 4vw', color: '#fff' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Key Benefits</h2>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FaLock style={{ color: '#3182ce', marginRight: 12 }} /> <strong>Secure & Confidential:</strong> HIPAA compliant data hamdling. 
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FaBolt style={{ color: '#38a169', marginRight: 12 }} /> <strong>Real-Time Tracking:</strong> Know exactly where each referral stands.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FaBrain style={{ color: '#805ad5', marginRight: 12 }} /> <strong>Smart Matching:</strong> Automatically suggests the best facility based on location and specialty.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FaMobileAlt style={{ color: '#d69e2e', marginRight: 12 }} /> <strong>Mobile-Friendly:</strong> Refer patients from any device, anywhere.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FaChartBar style={{ color: '#e53e3e', marginRight: 12 }} /> <strong>Analytics Dashboard:</strong> Monitor referral patterns and outcomes.
            </li>
          </ul>
        </section>

        {/* Testimonials Section */}
        <section style={{ padding: '2rem 4vw', color: '#fff' }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'center' }}>What they say about us</h2>
          <div style={{ background: 'rgba(44,62,80,0.85)', borderRadius: 16, padding: '1.5rem', maxWidth: 600, margin: '0 auto', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <FaUserMd size={32} style={{ color: '#f6ad55' }} />
              <span style={{ fontWeight: 600, color: '#fff' }}>Dr. Dickson, Meru</span>
              <FaStar style={{ color: '#f6ad55', marginLeft: 8 }} />
              <span style={{ color: '#f6ad55', fontWeight: 500 }}>4.8/5</span>
            </div>
            <div style={{ fontStyle: 'italic', color: '#e2e8f0', fontSize: '1.1rem' }}>
              “AFYALINK has transformed how we coordinate patient care, referrals are faster, and our patients get help sooner.”
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ padding: '2rem 4vw', color: '#fff', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(90deg, #805ad5 0%, #f6ad55 100%)', borderRadius: 16, padding: '2rem', maxWidth: 600, margin: '0 auto', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#2a4365' }}>Let's Start</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
              <FaEnvelope style={{ color: '#2a4365', marginRight: 8 }} /> <span style={{ color: '#2a4365', fontWeight: 500 }}>info@afyalink.com</span>
              <FaPhoneAlt style={{ color: '#2a4365', marginRight: 8 }} /> <span style={{ color: '#2a4365', fontWeight: 500 }}>+254 700 000 000</span>
            </div>
            <button style={{ background: '#2a4365', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Contact Us</button>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '2rem 4vw', color: '#fff', textAlign: 'center', background: 'rgba(44,62,80,0.7)', borderRadius: '24px 24px 0 0', marginTop: '2rem' }}>
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
    </div>
  );
};

export default LandingPage;