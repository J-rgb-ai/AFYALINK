
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
<<<<<<< HEAD

import React from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaHospital, FaHeartbeat, FaLock, FaBolt, FaBrain, FaMobileAlt, FaChartBar, FaCheckCircle, FaStar, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function LandingPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
      {/* Overlay for blue gradient effect */}
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-900/90 via-blue-700/80 to-blue-500/80 flex flex-col">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-blue-800/80 to-blue-600/80 rounded-b-3xl shadow-lg">
          <div className="font-bold text-2xl text-white tracking-wide flex items-center">
            <FaHeartbeat className="mr-2 text-blue-300" /> AFYALINK
          </div>
          <div className="flex gap-8 items-center">
            <Link to="/" className="text-white font-medium hover:underline">Home</Link>
            <a href="#services" className="text-white font-medium hover:underline">Services</a>
            <a href="#about" className="text-white font-medium hover:underline">About</a>
            <a href="#portfolio" className="text-white font-medium hover:underline">Portfolio</a>
            <a href="#contact" className="text-white font-medium hover:underline">Get in Touch</a>
            <Link to="/login"><button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold text-base ml-2 transition-colors">Login</button></Link>
            <Link to="/register"><button className="bg-blue-300 hover:bg-blue-400 text-blue-900 px-4 py-2 rounded font-semibold text-base ml-2 transition-colors">Register</button></Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-wrap items-center justify-between px-8 py-12">
          <div className="flex-1 min-w-[320px] text-white mr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Simplify Healthcare Referrals with AFYALINK</h1>
            <p className="text-lg mb-8 text-blue-100">Streamline your workflow and boost patient outcomes with our secure, digital referral platform connecting clinics, hospitals, and specialists for faster, smarter care.</p>
            <div className="flex gap-4">
              <a href="#contact"><button className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-6 py-3 rounded font-semibold text-lg transition-colors">Get in Touch</button></a>
            </div>
          </div>
        </section>

        {/* Benefits Section with Hovering Cards */}
        <section id="services" className="px-8 py-8 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <FaLock className="text-3xl mb-3 text-blue-600" />
              <span className="font-bold text-lg mb-1 text-blue-900">Secure & Confidential</span>
              <span className="text-blue-700 text-center">HIPAA compliant data handling.</span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <FaBolt className="text-3xl mb-3 text-blue-600" />
              <span className="font-bold text-lg mb-1 text-blue-900">Real-Time Tracking</span>
              <span className="text-blue-700 text-center">Know exactly where each referral stands.</span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <FaBrain className="text-3xl mb-3 text-blue-600" />
              <span className="font-bold text-lg mb-1 text-blue-900">Smart Matching</span>
              <span className="text-blue-700 text-center">Automatically suggests the best facility based on location and specialty.</span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <FaMobileAlt className="text-3xl mb-3 text-blue-600" />
              <span className="font-bold text-lg mb-1 text-blue-900">Mobile-Friendly</span>
              <span className="text-blue-700 text-center">Refer patients from any device, anywhere.</span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <FaChartBar className="text-3xl mb-3 text-blue-600" />
              <span className="font-bold text-lg mb-1 text-blue-900">Analytics Dashboard</span>
              <span className="text-blue-700 text-center">Monitor referral patterns and outcomes.</span>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="about" className="px-8 py-8 text-white">
          <h2 className="text-2xl font-bold mb-5 text-center">What they say about us</h2>
          <div className="bg-white rounded-xl p-6 max-w-xl mx-auto shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <FaUserMd size={32} className="text-blue-600" />
              <span className="font-semibold text-blue-900">Dr. Dickson, Meru</span>
              <FaStar className="text-blue-400 ml-2" />
              <span className="text-blue-600 font-medium">4.8/5</span>
            </div>
            <div className="italic text-blue-700 text-lg">
              “AFYALINK has transformed how we coordinate patient care, referrals are faster, and our patients get help sooner.”
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-8 py-8 text-white text-center">
          <div className="bg-white rounded-xl p-8 max-w-xl mx-auto shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Let's Start</h2>
            <div className="flex flex-col gap-2 items-center mb-4">
              <span className="flex items-center text-blue-700 font-medium"><FaEnvelope className="mr-2" /> info@afyalink.com</span>
              <span className="flex items-center text-blue-700 font-medium"><FaPhoneAlt className="mr-2" /> +254 700 000 000</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-semibold text-lg transition-colors">Contact Us</button>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-8 text-white text-center bg-gradient-to-r from-blue-800/80 to-blue-600/80 rounded-t-3xl mt-8">
          <div className="flex justify-center gap-6 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} className="text-blue-200" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} className="text-blue-200" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} className="text-blue-200" /></a>
          </div>
          <div className="text-base text-blue-100">&copy; {new Date().getFullYear()} AFYALINK. All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
}

=======
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
>>>>>>> ac1f904e5041b17bb0d0cba0d4951966d63a69b3
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD
=======
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/landingpage" element={<LandingPage/>} />
>>>>>>> ac1f904e5041b17bb0d0cba0d4951966d63a69b3
      </Routes>
    </Router>
  );
}

export default App;

