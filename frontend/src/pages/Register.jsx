import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    const { name, email, password, role } = formData;
    if (!name || !email || !password || !role) {
      setRegisterError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setRegisterError('Password must be at least 6 characters.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      setRegisterError('Email already registered.');
      return;
    }
    users.push({ name, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    setRegisterSuccess('Registered successfully! Please log in.');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
      <div className="container max-w-md w-full">
        <div className="bg-black bg-opacity-60 p-8 rounded-2xl shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-2 text-center tracking-tight">Register</h2>
          <p className="text-center text-gray-300 mb-6">Create your account to access the dashboard</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-semibold mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="Enter your password (min 6 chars)"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="role" className="block font-semibold mb-1">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select your role</option>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Specialist">Specialist</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            {registerError && <div className="text-red-400 text-sm -mt-2 mb-2">{registerError}</div>}
            {registerSuccess && <div className="text-green-400 text-sm mb-2">{registerSuccess}</div>}
            <button type="submit" className="btn w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">Register</button>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-300">Have an account? </span>
            <a href="/login" className="text-blue-400 hover:underline font-semibold">Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
