import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bell, UserCircle, FileText, FlaskConical, Activity, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";

const LabTechDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    activePatients: 0,
    activeTests: 0,
    ongoingSurgeries: 0,
    departmentVisits: 0,
    genderData: [],
    testStatus: []
  });
  const [patientVisit, setPatientVisit] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [doctorRequests, setDoctorRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ["#007bff", "#ff4d4f", "#ffc107"];

  const API_BASE = 'http://localhost:8083/api/labtech';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    // Directly use mock data since API is unavailable
    setDashboardData({
      activePatients: 1864,
      activeTests: 364,
      ongoingSurgeries: 164,
      departmentVisits: 120,
      genderData: [
        { gender: "Male", value: 62 },
        { gender: "Female", value: 38 },
      ],
      testStatus: [
        { status: "Completed", value: 134 },
        { status: "Pending", value: 56 },
        { status: "Critical", value: 14 },
      ]
    });
    setPatientVisit([
      { month: "Jan", count: 5 },
      { month: "Feb", count: 8 },
      { month: "Mar", count: 6 },
      { month: "Apr", count: 9 },
      { month: "May", count: 7 },
      { month: "Jun", count: 10 },
    ]);
    setInventory([
      { item: 'Reagents', status: 'Sufficient', level: 'High' },
      { item: 'Slides', status: 'Low', level: 'Medium' },
      { item: 'Test Tubes', status: 'OK', level: 'High' },
      { item: 'Syringes', status: 'Critical', level: 'Low' }
    ]);
    setRecentActivities([
      { description: "Blood sample analyzed (Neurology)", timestamp: "10 Oct, 11:30AM" },
      { description: "Urine test result uploaded", timestamp: "10 Oct, 2:15PM" },
      { description: "Sample sent to pathology", timestamp: "11 Oct, 9:45AM" }
    ]);
    setDoctorRequests([
      { id: 1, patient_id: 2541, reason: "CBC test", doctor_fname: "Achieng", doctor_lname: "" },
      { id: 2, patient_id: 2558, reason: "Urine analysis", doctor_fname: "Patel", doctor_lname: "" }
    ]);
    setError(null);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <XCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lab Technician Dashboard</h1>
        <div className="flex items-center gap-4">
          <Bell className="text-gray-600 w-6 h-6" />
          <UserCircle className="text-gray-600 w-8 h-8" />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-800">Active Patients</h3>
          <p className="text-3xl font-bold text-gray-800">{dashboardData.activePatients.toLocaleString()}</p>
          <p className="text-sm text-green-600">+3.1% this week</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-800">Active Tests</h3>
          <p className="text-3xl font-bold text-gray-800">{dashboardData.activeTests}</p>
          <p className="text-sm text-red-600">-1.3% this week</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-800">Ongoing Surgeries</h3>
          <p className="text-3xl font-bold text-gray-800">{dashboardData.ongoingSurgeries}</p>
          <p className="text-sm text-green-600">+2.4%</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-800">Department Visits</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.genderData}
                  dataKey="value"
                  nameKey="gender"
                  outerRadius={45}
                >
                  {dashboardData.genderData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2 text-gray-800">Weekly Patient Visits</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={patientVisit}>
              <Bar dataKey="count" fill="#007bff" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2 text-gray-800">Test Results Summary</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={dashboardData.testStatus}
                dataKey="value"
                nameKey="status"
                outerRadius={70}
                label
              >
                {dashboardData.testStatus.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2 text-gray-800">Recent Activities</h3>
          <ul className="space-y-3">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-gray-800">{activity.description}</span>
                <span className="text-gray-500 text-sm">{new Date(activity.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Row Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <FlaskConical className="w-5 h-5" /> Lab Inventory Status
          </h3>
          <ul className="space-y-2">
            {inventory.map((item, index) => (
              <li key={index} className="text-gray-800">
                {item.item}: <span className={getStatusColor(item.status)}>{item.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Test Reports
          </h3>
          <ul className="space-y-2">
            <li className="text-gray-800">🩺 Hematology Results - <span className="text-blue-600 underline">View</span></li>
            <li className="text-gray-800">🧬 Biochemistry Report - <span className="text-blue-600 underline">Download</span></li>
            <li className="text-gray-800">🧫 Pathology Summary - <span className="text-blue-600 underline">Upload</span></li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <Activity className="w-5 h-5" /> Doctor Requests
          </h3>
          <ul className="space-y-2">
            {doctorRequests.map((request, index) => (
              <li key={index} className="text-gray-800">
                {request.reason} for patient #{request.patient_id} by Dr. {request.doctor_fname} {request.doctor_lname}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LabTechDashboard;
