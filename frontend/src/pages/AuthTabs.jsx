import React, { useState } from "react";

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", role: "" });
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const handleTab = (tab) => {
    setActiveTab(tab);
    setLoginError("");
    setRegisterError("");
    setLoginSuccess("");
    setRegisterSuccess("");
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    // Dummy validation
    if (!loginData.email || !loginData.password) {
      setLoginError("Please fill in all fields.");
      return;
    }
    setLoginSuccess("Logged in successfully! Redirecting...");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.role) {
      setRegisterError("Please fill in all fields.");
      return;
    }
    if (registerData.password.length < 6) {
      setRegisterError("Password must be at least 6 characters.");
      return;
    }
    setRegisterSuccess("Registered successfully! Logging in...");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}
    >
      {/* Overlay for blue gradient effect */}
      <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-blue-900/90 via-blue-700/80 to-blue-500/80 backdrop-blur-sm z-0" />
      <div className="relative z-10 bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 md:mx-0 border border-blue-100 backdrop-blur-md">
        {/* Tabs */}
  <div className="flex mb-6 border-b border-blue-200 rounded-t-xl overflow-hidden">
          <button
            className={`flex-1 py-2 text-lg font-semibold focus:outline-none transition-colors bg-white/80 ${activeTab === "login" ? "text-blue-700 border-b-2 border-blue-600" : "text-blue-400"}`}
            onClick={() => handleTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-lg font-semibold focus:outline-none transition-colors bg-white/80 ${activeTab === "register" ? "text-blue-700 border-b-2 border-blue-600" : "text-blue-400"}`}
            onClick={() => handleTab("register")}
          >
            Register
          </button>
        </div>
        {/* Login Form */}
        {activeTab === "login" && (
          <div>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="loginEmail" className="block text-blue-900 font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="loginPassword" className="block text-blue-900 font-medium mb-1">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow transition-colors">Login</button>
            </form>
            {loginSuccess && <div className="text-green-600 text-center mt-4">{loginSuccess}</div>}
          </div>
        )}
        {/* Register Form */}
        {activeTab === "register" && (
          <div>
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label htmlFor="regName" className="block text-blue-900 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  id="regName"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="regEmail" className="block text-blue-900 font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="regEmail"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="regPassword" className="block text-blue-900 font-medium mb-1">Password</label>
                <input
                  type="password"
                  id="regPassword"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                  placeholder="Enter your password (min 6 chars)"
                  minLength={6}
                  className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="regRole" className="block text-blue-900 font-medium mb-1">Role</label>
                <select
                  id="regRole"
                  name="role"
                  value={registerData.role}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select your role</option>
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Specialist">Specialist</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {registerError && <div className="text-red-600 text-sm">{registerError}</div>}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow transition-colors">Register</button>
            </form>
            {registerSuccess && <div className="text-green-600 text-center mt-4">{registerSuccess}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTabs;
