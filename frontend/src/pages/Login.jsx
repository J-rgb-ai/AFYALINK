
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

const sampleUsers = [
  { name: 'Admin User', email: 'admin@example.com', password: 'admin', role: 'Admin' },
  { name: 'Patient User', email: 'patient@example.com', password: 'patient', role: 'Patient' },
  { name: 'Doctor User', email: 'doctor@example.com', password: 'doctor', role: 'Doctor' },
  { name: 'Specialist User', email: 'specialist@example.com', password: 'specialist', role: 'Specialist' }
];

function LoginRegister() {
  const [tab, setTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize users in localStorage
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(sampleUsers));
    }
    checkLogin();
    // eslint-disable-next-line
  }, []);

  const switchTab = (tabName) => {
    setTab(tabName);
    setLoginError('');
    setLoginSuccess('');
    setRegisterError('');
    setRegisterSuccess('');
  };

  function checkLogin() {
    if (localStorage.getItem('loggedIn') === 'true') {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }

  function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setRegisterData({ name: '', email: '', password: '', role: '' });
    setTab('login');
  }

  function redirectToDashboard(role) {
    // Simulate dashboard redirection
    alert(`Redirecting to ${role} dashboard...`);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    if (!loginEmail || !loginPassword) {
      setLoginError('Please fill in all fields.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setLoginSuccess('Logged in successfully! Redirecting...');
      setCurrentUser(user);
      setTimeout(() => redirectToDashboard(user.role), 1000);
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    const { name, email, password, role } = registerData;
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
      setTab('login');
      setRegisterData({ name: '', email: '', password: '', role: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
      <div className="container max-w-md w-full">
        <div className="bg-black bg-opacity-60 p-8 rounded-2xl shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-2 text-center tracking-tight">AFYALINK</h2>
          <p className="text-center text-gray-300 mb-6">Sign in to access your dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="loginEmail" className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                id="loginEmail"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="loginPassword" className="block font-semibold mb-1">Password</label>
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {loginError && <div className="text-red-400 text-sm -mt-2 mb-2">{loginError}</div>}
            {loginSuccess && <div className="text-green-400 text-sm mb-2">{loginSuccess}</div>}
            <button type="submit" className="btn w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">Login</button>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-300">Don't have an account? </span>
            <a href="/register" className="text-blue-400 hover:underline font-semibold">Register here</a>
          </div>
          {currentUser && (
            <div className="text-center mt-6">
              <p className="text-gray-300 text-sm mb-2">You are logged in as <span className="font-bold">{currentUser.email}</span> ({currentUser.role})</p>
              <button className="btn bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-6 py-2" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
