import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaFlask, FaCheckCircle, FaClock, FaExclamationTriangle, FaUserMd, FaFileAlt, FaChartBar, FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const styles = {
  root: {
    maxWidth: '1200px',
    margin: '18px auto',
    padding: '18px',
    fontFamily: 'Inter, system-ui, Segoe UI, Roboto, Arial',
    color: '#0f1720',
    backgroundImage: "url('https://thumbs.dreamstime.com/z/female-surgeon-operating-assistants-surgeons-work-blue-filter-modern-medicine-professional-doctors-female-surgeon-180933368.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
    background: 'rgba(0,0,0,0.5)',
    padding: '12px',
    borderRadius: '8px',
    color: '#fff',
  },
  btn: {
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    marginLeft: '8px',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '18px',
  },
  navCard: {
    padding: '12px',
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(12,20,30,0.06)',
    height: 'calc(100vh - 120px)',
    position: 'sticky',
    top: '18px',
    overflow: 'auto',
    color: '#fff',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '0',
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '14px',
  },
  navButtonActive: {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
  },
  mainCard: {
    padding: '12px',
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(12,20,30,0.06)',
    color: '#fff',
  },
  gridTwo: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: '18px',
  },
  flex: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: '#fff',
  },
  thtd: {
    padding: '10px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'left',
  },
  btnPrimary: {
    padding: '8px 10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#0066cc',
    color: '#fff',
    cursor: 'pointer',
  },
  btnDefault: {
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'transparent',
    cursor: 'pointer',
    color: '#fff',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '12px',
  },
  smallText: {
    color: '#ccc',
    fontSize: '13px',
  },
  panel: {
    marginBottom: '12px',
  },
  inboxItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.04)',
    marginBottom: '8px',
  },
  chip: {
    padding: '6px 8px',
    borderRadius: '999px',
    background: 'rgba(0,0,0,0.04)',
    color: '#fff',
    fontSize: '13px',
  },
};

const LabTechDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [today, setToday] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    activePatients: 0,
    activeTests: 0,
    ongoingSurgeries: 0,
    departmentVisits: 0,
    genderData: [],
    testStatus: []
  });
  const [labResults, setLabResults] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [doctorRequests, setDoctorRequests] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [patientVisits, setPatientVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'http://localhost:8083/api/labtech';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'labtech') {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
    setToday(new Date().toLocaleDateString());
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      const [statsRes, visitsRes, inventoryRes, activitiesRes, requestsRes, resultsRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/stats`, { headers }),
        fetch(`${API_BASE}/visits/weekly`, { headers }),
        fetch(`${API_BASE}/inventory`, { headers }),
        fetch(`${API_BASE}/activities`, { headers }),
        fetch(`${API_BASE}/requests`, { headers }),
        fetch(`${API_BASE}/results?status=Pending`, { headers })
      ]);

      if (!statsRes.ok || !visitsRes.ok || !inventoryRes.ok || !activitiesRes.ok || !requestsRes.ok || !resultsRes.ok) {
        throw new Error('Failed to fetch data from API');
      }

      const [stats, visits, inv, activities, requests, results] = await Promise.all([
        statsRes.json(),
        visitsRes.json(),
        inventoryRes.json(),
        activitiesRes.json(),
        requestsRes.json(),
        resultsRes.json()
      ]);

      setDashboardData(stats);
      setPatientVisits(visits);
      setInventory(inv);
      setRecentActivities(activities);
      setDoctorRequests(requests);
      setLabResults(results.results || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      // Fallback to mock data
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
      setPatientVisits([
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
      setLabResults([
        { id: 1, patient_id: 2541, test_type: 'CBC', status: 'Pending', fname: 'John', lname: 'Doe', created_at: '2025-09-24' },
        { id: 2, patient_id: 2558, test_type: 'Urine Analysis', status: 'Completed', fname: 'Jane', lname: 'Smith', created_at: '2025-09-23' }
      ]);
      setError('Using mock data - API unavailable');
    } finally {
      setLoading(false);
    }
  };

  const updateTestStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE}/results/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        alert(`Test status updated to ${status}`);
        fetchDashboardData(); // Refresh data
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating test status:', error);
      alert('Failed to update test status');
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return <FaCheckCircle className="text-green-500" />;
      case 'pending': return <FaClock className="text-yellow-500" />;
      case 'critical': return <FaExclamationTriangle className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'sufficient': case 'ok': return 'text-green-600';
      case 'low': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div style={{ ...styles.root, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <FaFlask className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p style={{ color: '#fff' }}>Loading lab dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div>
          <h1>AFYALINK - Lab Technician</h1>
          <div className="small" style={{ color: '#fff', fontSize: '13px' }}>
            {currentUser ? `Welcome, ${currentUser.fullName} (${currentUser.uniqueId})` : 'Lab Technician'}
          </div>
        </div>
        <div style={styles.flex}>
          <div className="small" style={{ color: '#fff', fontSize: '13px' }}>
            Today: <strong>{today}</strong>
          </div>
          <FaBell style={{ cursor: 'pointer' }} />
          <FaUserCircle style={{ cursor: 'pointer' }} />
          <button style={styles.btn} onClick={() => { if (confirm('Sign out?')) { localStorage.clear(); navigate('/login'); } }}>Sign out</button>
        </div>
      </header>

      <div style={styles.layout}>
        <nav style={styles.navCard} aria-label="Main navigation">
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'lab-results', label: 'Lab Results', icon: '🧪' },
            { key: 'inventory', label: 'Inventory', icon: '📦' },
            { key: 'doctor-requests', label: 'Doctor Requests', icon: '👨‍⚕️' },
            { key: 'analytics', label: 'Analytics', icon: '📈' },
            { key: 'reports', label: 'Reports', icon: '📄' },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              style={{
                ...styles.navButton,
                ...(activeSection === key ? styles.navButtonActive : {}),
              }}
              onClick={() => setActiveSection(key)}
            >
              <span className="icon">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <main>
          {/* OVERVIEW */}
          {activeSection === 'overview' && (
            <section style={styles.mainCard} aria-label="Overview">
              <div style={{ ...styles.flex, justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ margin: 0 }}>Lab Overview</h2>
                  <div style={styles.smallText}>Quick summary of lab activities and pending tests</div>
                </div>
                <div style={styles.flex}>
                  <div style={styles.chip}>Pending Tests: <strong>{dashboardData.activeTests}</strong></div>
                  <div style={styles.chip}>Active Patients: <strong>{dashboardData.activePatients}</strong></div>
                  <div style={styles.chip}>Doctor Requests: <strong>{doctorRequests.length}</strong></div>
                </div>
              </div>

              <div style={{ marginTop: '12px', ...styles.gridTwo }}>
                <div>
                  <div style={styles.panel}>
                    <h3 style={{ marginTop: 0 }}>Pending Lab Results</h3>
                    <div>
                      {labResults.slice(0, 5).map(result => (
                        <div key={result.id} style={styles.inboxItem}>
                          <div>
                            <strong>{result.test_type}</strong>
                            <div style={styles.smallText}>{result.fname} {result.lname} • Patient ID: {result.patient_id}</div>
                            <div style={styles.smallText}>{new Date(result.created_at).toLocaleDateString()}</div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <button style={styles.btnDefault} onClick={() => updateTestStatus(result.id, 'Completed')}>Complete</button>
                            <button style={styles.btnDefault} onClick={() => updateTestStatus(result.id, 'Critical')}>Flag Critical</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ ...styles.panel, marginTop: '12px' }}>
                    <h3 style={{ marginTop: 0 }}>Recent Activities</h3>
                    <ul>
                      {recentActivities.map((activity, index) => (
                        <li key={index} style={{ marginBottom: '8px' }}>
                          {activity.description}
                          <div style={styles.smallText}>{new Date(activity.timestamp).toLocaleString()}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <aside>
                  <div style={styles.panel}>
                    <h3 style={{ marginTop: 0 }}>Inventory Status</h3>
                    <ul>
                      {inventory.map((item, index) => (
                        <li key={index} style={{ marginBottom: '8px' }}>
                          <strong>{item.item}:</strong> <span style={{ color: getStatusColor(item.status) }}>{item.status}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ ...styles.panel, marginTop: '12px' }}>
                    <h3 style={{ marginTop: 0 }}>Doctor Requests</h3>
                    <ul>
                      {doctorRequests.slice(0, 3).map((request, index) => (
                        <li key={index} style={{ marginBottom: '8px' }}>
                          {request.reason} for patient #{request.patient_id}
                          <div style={styles.smallText}>Dr. {request.doctor_fname} {request.doctor_lname}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </div>
            </section>
          )}

          {/* LAB RESULTS */}
          {activeSection === 'lab-results' && (
            <section style={{ ...styles.mainCard }}>
              <h2>Lab Results Management</h2>
              <div style={styles.smallText}>View and update lab test results</div>
              <div style={{ marginTop: '12px' }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.thtd}>Patient</th>
                      <th style={styles.thtd}>Test Type</th>
                      <th style={styles.thtd}>Status</th>
                      <th style={styles.thtd}>Created</th>
                      <th style={styles.thtd}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labResults.map(result => (
                      <tr key={result.id}>
                        <td style={styles.thtd}>{result.fname} {result.lname}</td>
                        <td style={styles.thtd}>{result.test_type}</td>
                        <td style={styles.thtd}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {getStatusIcon(result.status)}
                            {result.status}
                          </div>
                        </td>
                        <td style={styles.thtd}>{new Date(result.created_at).toLocaleDateString()}</td>
                        <td style={styles.thtd}>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {result.status === 'Pending' && (
                              <>
                                <button style={styles.btnDefault} onClick={() => updateTestStatus(result.id, 'Completed')}>Complete</button>
                                <button style={styles.btnDefault} onClick={() => updateTestStatus(result.id, 'Critical')}>Critical</button>
                              </>
                            )}
                            <button style={styles.btnDefault} onClick={() => alert('View details (simulated)')}>View</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* INVENTORY */}
          {activeSection === 'inventory' && (
            <section style={styles.mainCard}>
              <h2>Lab Inventory</h2>
              <div style={styles.smallText}>Monitor and manage lab supplies and equipment</div>
              <div style={{ marginTop: '12px' }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.thtd}>Item</th>
                      <th style={styles.thtd}>Status</th>
                      <th style={styles.thtd}>Level</th>
                      <th style={styles.thtd}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item, index) => (
                      <tr key={index}>
                        <td style={styles.thtd}>{item.item}</td>
                        <td style={styles.thtd}>
                          <span style={{ color: getStatusColor(item.status) }}>{item.status}</span>
                        </td>
                        <td style={styles.thtd}>{item.level}</td>
                        <td style={styles.thtd}>
                          <button style={styles.btnDefault} onClick={() => alert('Reorder item (simulated)')}>Reorder</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* DOCTOR REQUESTS */}
          {activeSection === 'doctor-requests' && (
            <section style={styles.mainCard}>
              <h2>Doctor Requests</h2>
              <div style={styles.smallText}>Pending lab test requests from doctors</div>
              <div style={{ marginTop: '12px' }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.thtd}>Patient ID</th>
                      <th style={styles.thtd}>Reason</th>
                      <th style={styles.thtd}>Doctor</th>
                      <th style={styles.thtd}>Priority</th>
                      <th style={styles.thtd}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorRequests.map(request => (
                      <tr key={request.id}>
                        <td style={styles.thtd}>{request.patient_id}</td>
                        <td style={styles.thtd}>{request.reason}</td>
                        <td style={styles.thtd}>Dr. {request.doctor_fname} {request.doctor_lname}</td>
                        <td style={styles.thtd}>{request.priority}</td>
                        <td style={styles.thtd}>
                          <button style={styles.btnDefault} onClick={() => alert('Process request (simulated)')}>Process</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ANALYTICS */}
          {activeSection === 'analytics' && (
            <section style={styles.mainCard}>
              <h2>Lab Analytics</h2>
              <div style={styles.smallText}>Test completion rates and performance metrics</div>
              <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={styles.mainCard}>
                  <h4>Test Status Summary</h4>
                  <div style={styles.smallText}>
                    {dashboardData.testStatus.map(status => (
                      <div key={status.status}>{status.status}: {status.value}</div>
                    ))}
                  </div>
                </div>
                <div style={styles.mainCard}>
                  <h4>Monthly Test Volume</h4>
                  <div style={styles.smallText}>
                    {patientVisits.map(visit => (
                      <div key={visit.month}>{visit.month}: {visit.count} tests</div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* REPORTS */}
          {activeSection === 'reports' && (
            <section style={styles.mainCard}>
              <h2>Lab Reports</h2>
              <div style={styles.smallText}>Generate and view lab reports</div>
              <div style={{ marginTop: '12px' }}>
                <button style={styles.btnPrimary} onClick={() => alert('Generate daily report (simulated)')}>Daily Report</button>
                <button style={styles.btnDefault} onClick={() => alert('Generate weekly report (simulated)')}>Weekly Report</button>
                <button style={styles.btnDefault} onClick={() => alert('Generate monthly report (simulated)')}>Monthly Report</button>
              </div>
            </section>
          )}
        </main>
      </div>

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
  );
};

export default LabTechDashboard;
