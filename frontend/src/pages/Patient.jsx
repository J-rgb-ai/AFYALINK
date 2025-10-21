import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const chartRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setUser(storedUser);
    if (!storedUser || storedUser.role !== 'patient') {
      navigate('/login');
      return;
    }
    // Initialize chart
    try {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Aug 1','Aug 15','Sep 1','Sep 15','Oct 1'],
          datasets: [{
            label: 'Symptom severity (1-10)',
            data: [6,5,4,3,3],
            tension: 0.35,
            fill: true,
            backgroundColor: 'rgba(37,99,235,0.08)',
            borderColor: '#2563eb',
            pointRadius:4
          }]
        },
        options: {
          responsive:true,
          scales: {
            y: { beginAtZero:true, suggestedMax:10 }
          },
          plugins:{legend:{display:false}}
        }
      });
    } catch (error) {
      console.error('Error initializing chart:', error);
    }
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const downloadSummary = () => {
    const summary = `Patient: ${user?.fullName || 'Unknown'}\nMember ID: PT-2025-00045\nActive referrals: REF-1023 (Pending)\nRecent labs: CBC (2025-10-01): Normal`;
    const blob = new Blob([summary], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'patient-summary.txt'; a.click(); URL.revokeObjectURL(url);
  };

  const requestReferral = () => {
    alert('Referral request flow would open here (in a live system you would select condition and target specialist).');
  };

  const signOut = () => {
    if (confirm('Sign out?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const isVisible = (id) => {
    const visibilityMap = {
      dashboard: ['next-appointment', 'prescriptions', 'messages'],
      appointments: ['next-appointment', 'appointments'],
      referrals: ['referrals', 'active-referrals'],
      records: ['records', 'lab-results', 'vitals', 'trends'],
      messages: ['messages'],
      meds: ['prescriptions']
    };
    return visibilityMap[activeTab]?.includes(id) || false;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root{
          --bg:#f5f7fb; --card:#ffffff; --accent:#2563eb; --muted:#6b7280; --success:#10b981;
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
        }
        *{box-sizing:border-box}
        body{margin:0;color:#0f172a;font-size:15px;backgroundColor:'gold'}
        .app{display:flex;min-height:100vh}
        /* Sidebar */
        .sidebar{width:260px;background:linear-gradient(180deg,#0f172a, #081028);color:#fff;padding:22px 18px}
        .brand{display:flex;align-items:center;gap:12px;margin-bottom:18px}
        .avatar{width:48px;height:48px;border-radius:10px;background:#fff3;display:inline-flex;align-items:center;justify-content:center;font-weight:700}
        .nav{margin-top:18px}
        .nav a{display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px;color:rgba(255,255,255,0.9);text-decoration:none;margin-bottom:6px}
        .nav a.active{background:#0b63d6}
        .muted{color:rgba(255,255,255,0.75);font-size:13px}
        /* Main */
        .main{flex:1;padding:22px}
        header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
        .search{display:flex;gap:8px;align-items:center;background:var(--card);padding:8px;border-radius:8px;box-shadow:0 1px 2px rgba(2,6,23,0.06)}
        .search input{border:0;outline:0;background:transparent}
        .widgets{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:18px}
        .card{background:var(--card);padding:14px;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.06)}
        .card h3{margin:0 0 8px 0;font-size:14px}
        .flex{display:flex;gap:12px;align-items:center}
        .pill{padding:6px 10px;background:#eef2ff;color:var(--accent);border-radius:999px;font-weight:600;font-size:13px}
        /* Appointments & Referrals */
        .grid-2{display:grid;grid-template-columns:1fr 420px;gap:14px}
        .table{width:100%;border-collapse:collapse}
        .table th,.table td{padding:10px;text-align:left;border-bottom:1px solid #eef1f6}
        .small{font-size:13px;color:var(--muted)}
        .status-pill{padding:6px 8px;border-radius:8px;font-weight:600;font-size:13px}
        .status-pending{background:#fff7ed;color:#c2410c}
        .status-complete{background:#ecfdf5;color:var(--success)}
        /* Messages */
        .messages{display:flex;flex-direction:column;gap:8px}
        .message-item{display:flex;gap:10px;align-items:flex-start;padding:8px;border-radius:8px}
        .message-item:hover{background:#f8fafc}
        /* Responsive */
        @media (max-width:900px){.grid-2{grid-template-columns:1fr} .sidebar{display:none} .main{padding:14px}}
      ` }} />
      <div className="app" role="application" aria-label="Patient dashboard for e-referral system">
        {/* SIDEBAR */}
        <nav className="sidebar" aria-label="Main navigation">
          <div className="brand">
            <div className="avatar" aria-hidden="true">PO</div>
            <div>
              <div style={{fontWeight:700}}>Patient Portal</div>
              <div className="muted" style={{marginTop:'4px',fontSize:'13px'}}>e-Referral Health Network</div>
            </div>
          </div>
          <div className="nav" role="navigation">
            <a href="#" className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => handleTabClick('dashboard')}>🏠 Dashboard</a>
            <a href="#appointments" onClick={() => handleTabClick('appointments')}>📅 Appointments</a>
            <a href="#referrals" onClick={() => handleTabClick('referrals')}>🔁 Referrals</a>
            <a href="#messages" onClick={() => handleTabClick('messages')}>✉️ Messages</a>
            <a href="#results" onClick={() => handleTabClick('records')}>🧪 Lab Results</a>
            <a href="#meds" onClick={() => handleTabClick('meds')}>💊 Prescriptions</a>
            <a href="#records" onClick={() => handleTabClick('records')}>📁 Medical Records</a>
            <a href="ps.html">⚙️ Settings</a>
            <div style={{marginTop:'14px'}}><span className="muted">Support:</span><div style={{marginTop:'8px'}}><a className="pill" href="#support">Contact care team</a></div></div>
          </div>
        </nav>
        {/* MAIN CONTENT */}
        <main className="main">
          <header>
              <div style={{display:'flex',gap:'14px',alignItems:'center'}}>
                <div style={{fontSize:'20px',fontWeight:700}}>Welcome back, <span id="patient-name">{user?.fullName || 'Patient'}</span></div>
                <div className="muted small">Member ID: <strong>PT-2025-00045</strong></div>
              </div>
            <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
              <div className="search" role="search" aria-label="Search dashboard">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 21l-4.35-4.35" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="11" r="6" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <input aria-label="Search" placeholder="Search referrals, messages, results..." />
              </div>
              <button className="pill" aria-haspopup="true" aria-expanded="false">Notifications <span style={{marginLeft:'8px',opacity:0.9}} id="notif-count">2</span></button>
              <button className="pill" onClick={signOut}>Sign out</button>
              <div style={{width:'44px',height:'44px',borderRadius:'10px',background:'linear-gradient(90deg,#e0f2fe,#dbeafe)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>P.O</div>
            </div>
          </header>
          {/* SUMMARY WIDGETS */}
          <section className="widgets" aria-label="Quick summary">
            <div className="card" id="next-appointment" role="region" aria-label="Upcoming appointment" style={{display: isVisible('next-appointment') ? 'block' : 'none'}}>
              <h3>Next Appointment</h3>
              <div className="flex" style={{justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <div style={{fontWeight:700}}>General Clinic — Referral to ENT</div>
                  <div className="small">Tue, Oct 7, 2025 — 10:30 AM</div>
                  <div className="small" style={{marginTop:'6px'}}>Location: Nairobi County Hospital — Outpatient</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="pill">Confirmed</div>
                  <div style={{marginTop:'8px'}} className="small">Dr. K. Mwangi</div>
                </div>
              </div>
            </div>
            <div className="card" id="active-referrals" role="region" aria-label="Active referrals" style={{display: isVisible('active-referrals') ? 'block' : 'none'}}>
              <h3>Active Referrals</h3>
              <div style={{display:'flex',flexDirection:'column',gap:'8px',marginTop:'8px'}}>
                <div className="flex" style={{justifyContent:'space-between'}}><div>ENT Specialist — urgent</div><div className="small status-pill status-pending">Pending</div></div>
                <div className="flex" style={{justifyContent:'space-between'}}><div>Physiotherapy — follow-up</div><div className="small status-pill status-complete">Accepted</div></div>
              </div>
            </div>
            <div className="card" id="lab-results" role="region" aria-label="Recent lab results" style={{display: isVisible('lab-results') ? 'block' : 'none'}}>
              <h3>Recent Lab Results</h3>
              <div className="small">Latest: CBC — Oct 1, 2025</div>
              <div style={{marginTop:'8px',fontWeight:700}}>All values within normal range</div>
              <a href="#results" style={{display:'inline-block',marginTop:'8px',color:'var(--accent)'}}>View all results →</a>
            </div>
            <div className="card" id="prescriptions" role="region" aria-label="Medications" style={{display: isVisible('prescriptions') ? 'block' : 'none'}}>
              <h3>Active Prescriptions</h3>
              <div className="small">Amoxicillin — complete on Oct 5, 2025</div>
              <div style={{marginTop:'8px'}}>Paracetamol PRN</div>
              <a href="#meds" style={{display:'inline-block',marginTop:'8px',color:'var(--accent)'}}>Request renewal →</a>
            </div>
          </section>
          {/* MAIN GRID */}
          <section className="grid-2" aria-label="Main panels">
            {/* LEFT COLUMN */}
            <div>
              <div className="card" id="appointments" role="region" aria-label="Upcoming appointments" style={{display: isVisible('appointments') ? 'block' : 'none'}}>
                <h3>Upcoming Appointments</h3>
                <table className="table" aria-describedby="appointments-desc">
                  <caption id="appointments-desc" className="small">Shows scheduled and referred appointments.</caption>
                  <thead>
                    <tr><th>Date</th><th>Clinic / Specialist</th><th>Type</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Oct 7, 2025<br/><span className="small">10:30 AM</span></td><td>Nairobi County Hospital — ENT</td><td className="small">Referral</td><td><span className="status-pill status-pending">Pending</span></td></tr>
                    <tr><td>Sep 18, 2025<br/><span className="small">02:00 PM</span></td><td>Clinic A — Physiotherapy</td><td className="small">Follow up</td><td><span className="status-pill status-complete">Completed</span></td></tr>
                  </tbody>
                </table>
                <div style={{marginTop:'10px'}}><a href="#appointments" className="small">See full appointments →</a></div>
              </div>
              <div className="card" id="referrals" style={{marginTop:'14px',display: isVisible('referrals') ? 'block' : 'none'}} role="region" aria-label="Referrals history">
                <h3>Referrals</h3>
                <div className="small" style={{marginBottom:'8px'}}>Most recent referrals and their status (click a row to view details)</div>
                <table className="table">
                  <thead><tr><th>Ref. ID</th><th>To</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr><td>REF-1023</td><td>ENT, Nairobi County Hospital</td><td>2025-09-30</td><td><span className="status-pill status-pending">Pending</span></td></tr>
                    <tr><td>REF-0987</td><td>Physio, Clinic A</td><td>2025-08-14</td><td><span className="status-pill status-complete">Accepted</span></td></tr>
                  </tbody>
                </table>
              </div>
              <div className="card" id="records" style={{marginTop:'14px',display: isVisible('records') ? 'block' : 'none'}} role="region" aria-label="Medical summary">
                <h3>Health Summary</h3>
                <div className="small">Key conditions & notes</div>
                <ul style={{marginTop:'8px'}}>
                  <li>Chronic allergic rhinitis — under review</li>
                  <li>Allergies: Penicillin</li>
                </ul>
                <div style={{marginTop:'10px'}} className="small">Care team: Dr. K. Mwangi (Referring), Dr. L. Otieno (Receiving)</div>
              </div>
            </div>
            {/* RIGHT COLUMN */}
            <aside>
              <div className="card" id="messages" role="region" aria-label="Secure messages" style={{display: isVisible('messages') ? 'block' : 'none'}}>
                <h3>Messages</h3>
                <div className="messages" aria-live="polite">
                  <div className="message-item" tabIndex="0" role="article" aria-label="Message from Dr. Mwangi">
                    <div style={{width:'44px',height:'44px',borderRadius:'8px',background:'#eef2ff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>KM</div>
                    <div>
                      <div style={{fontWeight:700}}>Dr. K. Mwangi <span className="small muted">— Sep 30, 2025</span></div>
                      <div className="small">Please bring previous ENT notes. If you have any urgent symptoms, reply here.</div>
                    </div>
                  </div>
                  <div className="message-item" tabIndex="0" role="article" aria-label="Message from Clinic Admin">
                    <div style={{width:'44px',height:'44px',borderRadius:'8px',background:'#feefef',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>CA</div>
                    <div>
                      <div style={{fontWeight:700}}>Clinic Admin <span className="small muted">— Sep 15, 2025</span></div>
                      <div className="small">Your physiotherapy referral was accepted. Appointment completed. Visit summary uploaded to records.</div>
                    </div>
                  </div>
                </div>
                <div style={{marginTop:'8px',textAlign:'right'}}><button className="btn small" onClick={() => navigate('/chat')}>Open Secure Inbox →</button></div>
              </div>
              <div className="card" id="vitals" style={{marginTop:'14px',display: isVisible('vitals') ? 'block' : 'none'}} role="region" aria-label="Care timeline & vitals">
                <h3>Recent Vitals</h3>
                <div className="small">Last captured: Oct 1, 2025</div>
                <div style={{display:'flex',gap:'12px',marginTop:'8px'}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700}}>Blood Pressure</div>
                    <div className="small">118/76 mmHg</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700}}>Weight</div>
                    <div className="small">68 kg</div>
                  </div>
                </div>
                <div style={{marginTop:'10px'}}><a href="#records" className="small">View full vitals →</a></div>
              </div>
              <div className="card" id="trends" style={{marginTop:'14px',display: isVisible('trends') ? 'block' : 'none'}} role="region" aria-label="Health trends chart">
                <h3>Symptoms trend</h3>
                <canvas ref={chartRef} id="trendChart" width="360" height="200" aria-label="Symptom severity trend chart" role="img"></canvas>
                <div style={{marginTop:'8px',textAlign:'right'}}><a className="small" href="#records">Export data →</a></div>
              </div>
            </aside>
          </section>
          {/* FOOTER / ACTIONS */}
          <div style={{marginTop:'18px',display:'flex',gap:'10px',justifyContent:'flex-end'}}>
            <button className="pill" onClick={downloadSummary}>Download Summary</button>
            <button className="pill" style={{background:'#f1f5f9',color:'#0f172a'}} onClick={requestReferral}>Request new referral</button>
          </div>
        </main>
      </div>
    </>
  );
};

export default PatientDashboard;