import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserMd, FaHospital, FaHeartbeat, FaLock, FaBrain, FaMobileAlt,
  FaChartBar, FaCheckCircle, FaStar, FaPhoneAlt, FaEnvelope,
  FaFacebook, FaTwitter, FaLinkedin
} from "react-icons/fa";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import Chat from "./pages/chat";
import NurseDashboard from "./pages/Nurse";
import PatientDashboard from "./pages/Patient";
import LabTechDashboard from "./pages/Labtech";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/nurse-dashboard" element={<NurseDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/labTech-dashboard" element={<LabTechDashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;
