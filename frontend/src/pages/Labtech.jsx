import React from "react";
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
import { Bell, UserCircle, FileText, FlaskConical, Activity } from "lucide-react";

const LabTechDashboard = () => {
  const COLORS = ["#007bff", "#ff4d4f", "#ffc107"];
  const patientVisit = [
    { month: "Jan", count: 5 },
    { month: "Feb", count: 8 },
    { month: "Mar", count: 6 },
    { month: "Apr", count: 9 },
    { month: "May", count: 7 },
    { month: "Jun", count: 10 },
  ];
  const genderData = [
    { gender: "Male", value: 62 },
    { gender: "Female", value: 38 },
  ];
  const testStatus = [
    { status: "Completed", value: 134 },
    { status: "Pending", value: 56 },
    { status: "Critical", value: 14 },
  ];

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
          <p className="text-3xl font-bold text-gray-800">1,864</p>
          <p className="text-sm text-green-600">+3.1% this week</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-800">Active Injections</h3>
          <p className="text-3xl font-bold text-gray-800">364</p>
          <p className="text-sm text-red-600">-1.3% this week</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-800">Ongoing Surgeries</h3>
          <p className="text-3xl font-bold text-gray-800">164</p>
          <p className="text-sm text-green-600">+2.4%</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-800">Department Visits</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="gender"
                  outerRadius={45}
                >
                  {genderData.map((entry, index) => (
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
                data={testStatus}
                dataKey="value"
                nameKey="status"
                outerRadius={70}
                label
              >
                {testStatus.map((entry, index) => (
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
            <li className="flex items-center justify-between">
              <span className="text-gray-800">🧬 Blood sample analyzed (Neurology)</span>
              <span className="text-gray-500 text-sm">10 Oct, 11:30AM</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-800">🧪 Urine test result uploaded</span>
              <span className="text-gray-500 text-sm">10 Oct, 2:15PM</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-800">🩸 Sample sent to pathology</span>
              <span className="text-gray-500 text-sm">11 Oct, 9:45AM</span>
            </li>
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
            <li className="text-gray-800">🧪 Reagents: <span className="text-green-600">Sufficient</span></li>
            <li className="text-gray-800">🧫 Slides: <span className="text-yellow-600">Low</span></li>
            <li className="text-gray-800">🧍 Test Tubes: <span className="text-green-600">OK</span></li>
            <li className="text-gray-800">💉 Syringes: <span className="text-red-600">Critical</span></li>
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
            <li className="text-gray-800">🩸 Dr. Achieng requests a CBC test for patient #2541</li>
            <li className="text-gray-800">🧫 Dr. Patel requests urine analysis for patient #2558</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LabTechDashboard;
