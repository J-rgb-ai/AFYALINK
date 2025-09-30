import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    secondName: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
    alert('Registration submitted!');
    window.location.href = '/login';
  };

  return (
    <div className="registration-page-outer">
      <div className="registration-container">
        <h1 className="project-title">AFYALINK</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <label htmlFor="role"><b>Register As</b></label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="Patient">Patient</option>
              <option value="Specialist">Specialist</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="firstName"><b>First Name</b></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter first name"
            />
          </div>
          <div className="form-row">
            <label htmlFor="secondName"><b>Second Name</b></label>
            <input
              type="text"
              id="secondName"
              name="secondName"
              value={formData.secondName}
              onChange={handleChange}
              required
              placeholder="Enter second name"
            />
          </div>
          <div className="form-row">
            <label htmlFor="idNumber"><b>National ID Number</b></label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
              placeholder="Enter National ID"
            />
          </div>
          <div className="form-row">
            <label htmlFor="phoneNumber"><b>Phone Number</b></label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="e.g. +254700123456"
            />
          </div>
          <div className="form-row">
            <label htmlFor="email"><b>Email Address</b></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-row">
            <label htmlFor="password"><b>Create Password</b></label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter a strong password"
            />
          </div>
          <div className="form-row">
            <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter your password"
            />
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>
        <div style={{ marginTop: '1rem' }}>
          <span>Already have an account? </span>
          <a href="/login" style={{ color: '#1a73e8', textDecoration: 'underline' }}>Login</a>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;

