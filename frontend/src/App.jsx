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
import LabTechDashboard from "./pages/LabtechNew";
import LabtechNew from "./pages/LabtechNew";
import ReferralManager from "./pages/ReferralManager";
import AdminDashboard from "./pages/Admin";
import SecretaryDashboard from "./pages/Secretary";
import SurgeonDashboard from "./pages/Surgeon";
import AccountClerkDashboard from "./pages/AccountClerk";

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
        <Route path="/labtech-new" element={<LabtechNew />} />
        <Route path="/referral-manager" element={<ReferralManager />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/secretary" element={<SecretaryDashboard />} />
        <Route path="/surgeon" element={<SurgeonDashboard />} />
        <Route path="/account_clerk" element={<AccountClerkDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
