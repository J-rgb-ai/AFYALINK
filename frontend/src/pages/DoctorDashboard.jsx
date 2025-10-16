import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
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
  textarea: {
    width: '100%',
    minHeight: '80px',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.06)',
  },
  fileListItem: {
    padding: '6px 8px',
    borderRadius: '8px',
    border: '1px dashed rgba(0,0,0,0.06)',
    marginBottom: '6px',
    color: '#fff',
  },
};

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [today, setToday] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [patients, setPatients] = useState([
    { id: 'MRN001', name: 'Jane Wanjiru', age: 34, lastVisit: '2025-09-20' },
    { id: 'MRN002', name: 'John Otieno', age: 52, lastVisit: '2025-09-22' },
    { id: 'MRN003', name: 'Mary Achieng', age: 29, lastVisit: '2025-09-18' },
  ]);
  const [referrals, setReferrals] = useState([
    { id: 1001, when: '2025-09-24', patientName: 'Jane Wanjiru', mrn: 'MRN001', to: 'Cardiology - County Hospital', status: 'Pending', notes: 'Suspected CHF' },
    { id: 1002, when: '2025-09-23', patientName: 'John Otieno', mrn: 'MRN002', to: 'Orthopedics - Central', status: 'Accepted', notes: 'Knee pain' },
    { id: 1003, when: '2025-09-21', patientName: 'Mary Achieng', mrn: 'MRN003', to: 'Endocrinology - City Clinic', status: 'Completed', notes: 'Follow-up diabetes' },
  ]);
  const [appointments] = useState([
    { when: '2025-09-26 09:00', patient: 'Jane Wanjiru', type: 'Follow-up' },
    { when: '2025-09-26 11:30', patient: 'New: Peter Otieno', type: 'New patient' },
    { when: '2025-09-26 14:00', patient: 'John Otieno', type: 'Review' },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, with: 'Jane Wanjiru', last: 'Can we reschedule?', unread: 1, conversation: [{ from: 'patient', text: 'Can we reschedule?', when: '09:12' }, { from: 'me', text: 'Sure, available 11am', when: '09:15' }] },
    { id: 2, with: 'Dr. Njoroge', last: 'Accepted referral #1001', unread: 0, conversation: [{ from: 'colleague', text: 'Accepted referral #1001', when: '08:40' }] },
  ]);
  const [loginHistory] = useState([
    { when: '2025-09-25 16:00', device: 'Chrome on Windows', ip: '102.12.45.3' },
    { when: '2025-09-22 09:05', device: 'iPad', ip: '102.12.88.11' },
  ]);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('doctorTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [activeConvId, setActiveConvId] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [docFiles, setDocFiles] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'doctor') {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([
        { fullName: 'Test Patient 1', email: 'patient1@test.com', role: 'patient' },
        { fullName: 'Test Patient 2', email: 'patient2@test.com', role: 'patient' }
      ]));
    }
    setToday(new Date().toLocaleDateString());
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('doctorTasks', JSON.stringify(tasks));
  }, [tasks]);

  const openReferral = (id) => {
    const r = referrals.find((x) => x.id === id);
    alert(`Open referral #${id}\nPatient: ${r.patientName}\nMRN: ${r.mrn}\nTo: ${r.to}\nNotes: ${r.notes}`);
  };

  const changeReferralStatus = (id, status) => {
    setReferrals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    alert(`Referral #${id} set to ${status}`);
  };

  const openPatient = (mrn) => {
    const p = patients.find((x) => x.id === mrn);
    alert(`Patient: ${p.name}\nMRN: ${p.id}\nAge: ${p.age}\nLast visit: ${p.lastVisit}`);
  };

  const openConversation = (id) => {
    setActiveConvId(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unread: 0 } : m))
    );
  };

  const sendMessage = () => {
    if (!chatInput.trim() || activeConvId === null) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === activeConvId
          ? {
              ...m,
              conversation: [
                ...m.conversation,
                { from: 'me', text: chatInput.trim(), when: new Date().toLocaleTimeString() },
              ],
              last: chatInput.trim(),
            }
          : m
      )
    );
    setChatInput('');
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [...prev, newTask.trim()]);
    setNewTask('');
  };

  const removeTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDocUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocFiles((prev) => [...prev, ...files]);
  };

  const attachDoc = () => {
    alert('Attach documents to selected patient (simulated)');
  };

  const filteredMessages = messages.filter((m) => true); // For future search filter

  const activeConv = messages.find((m) => m.id === activeConvId);

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div>
          <h1>AFYALINK</h1>
          <div className="small" style={{ color: '#fff', fontSize: '13px' }}>
            {currentUser ? `Welcome, ${currentUser.fullName} (${currentUser.uniqueId})` : 'Welcome, Dr. A.Mwangi'}
          </div>
        </div>
        <div style={styles.flex}>
          <div className="small" style={{ color: '#fff', fontSize: '13px' }}>
            Today: <strong>{today}</strong>
          </div>
          <button style={styles.btn} onClick={() => navigate('/dpd')}>Profile</button>
          <button style={styles.btn} onClick={() => { if (confirm('Sign out?')) { localStorage.clear(); navigate('/login'); } }}>Sign out</button>
        </div>
      </header>

      <div style={styles.layout}>
        <nav style={styles.navCard} aria-label="Main navigation">
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'patients', label: 'Patients', icon: '👥' },
            { key: 'referrals', label: 'Referrals', icon: '🔄' },
            { key: 'appointments', label: 'Appointments', icon: '📅' },
            { key: 'messages', label: 'Messages', icon: '💬' },
            { key: 'documents', label: 'Documents', icon: '📄' },
            { key: 'analytics', label: 'Analytics', icon: '📈' },
            { key: 'security', label: 'Security & Logs', icon: '🔒' },
          ].map(({ key, label, icon, href }) => (
            <button
              key={key}
              style={{
                ...styles.navButton,
                ...(activeSection === key ? styles.navButtonActive : {}),
              }}
              onClick={() => {
                if (key === 'messages') {
                  navigate('/chat');
                } else if (href) {
                  window.location.href = href;
                } else {
                  setActiveSection(key);
                }
              }}
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
                  <h2 style={{ margin: 0 }}>Overview</h2>
                  <div style={styles.smallText}>Quick summary of referrals, patients, and tasks</div>
                </div>
                <div style={styles.flex}>
                  <div style={styles.chip}>Open referrals: <strong>{referrals.filter(r => r.status === 'Pending').length}</strong></div>
                  <div style={styles.chip}>Today's appointments: <strong>{appointments.filter(a => a.when.startsWith(today)).length}</strong></div>
                  <div style={styles.chip}>Unread messages: <strong>{messages.reduce((s, m) => s + m.unread, 0)}</strong></div>
                </div>
              </div>

              <div style={{ marginTop: '12px', ...styles.gridTwo }}>
                <div>
                  <div style={styles.panel}>
                    <h3 style={{ marginTop: 0 }}>Referral Inbox</h3>
                    <div>
                      {referrals.filter(r => r.status === 'Pending' || r.status === 'Accepted').map(r => (
                        <div key={r.id} style={styles.inboxItem}>
                          <div>
                            <strong>{r.patientName}</strong>
                            <div style={styles.smallText}>{r.mrn} • {r.to} • {r.when}</div>
                            <div style={styles.smallText}>{r.notes}</div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <button style={styles.btnDefault} onClick={() => openReferral(r.id)}>Open</button>
                            <button style={styles.btnDefault} onClick={() => changeReferralStatus(r.id, 'Accepted')}>Accept</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ ...styles.panel, marginTop: '12px' }}>
                    <h3 style={{ marginTop: 0 }}>Recent Patients</h3>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.thtd}>Patient</th>
                          <th style={styles.thtd}>MRN</th>
                          <th style={styles.thtd}>Last visit</th>
                          <th style={styles.thtd}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients.map(p => (
                          <tr key={p.id}>
                            <td style={styles.thtd}>{p.name}</td>
                            <td style={styles.thtd}>{p.id}</td>
                            <td style={styles.thtd}>{p.lastVisit}</td>
                            <td style={styles.thtd}>
                              <button style={styles.btnDefault} onClick={() => openPatient(p.id)}>Open</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <aside>
                  <div style={styles.panel}>
                    <h3 style={{ marginTop: 0 }}>Tasks</h3>
                    <ul>
                      {tasks.map((t, i) => (
                        <li key={i}>
                          {t} <button style={styles.btnDefault} onClick={() => removeTask(i)}>Done</button>
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: '8px', ...styles.flex }}>
                      <input
                        placeholder="New task"
                        style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                      />
                      <button style={styles.btn} onClick={addTask}>Add</button>
                    </div>
                  </div>

                  <div style={{ ...styles.panel, marginTop: '12px' }}>
                    <h3 style={{ marginTop: 0 }}>Quick Actions</h3>
                    <div style={{ ...styles.flex, flexDirection: 'column', gap: '8px' }}>
                      <button style={styles.btnPrimary} onClick={() => alert('Create referral (simulated)')}>Create referral</button>
                      <button style={styles.btnDefault} onClick={() => {
                        const note = prompt('Write quick clinical note');
                        if (note) alert('Note saved (simulated)');
                      }}>Write note</button>
                      <button style={styles.btnDefault} onClick={() => alert('Calendar (simulated) - integrate with real calendar or fullcalendar.io in production')}>Open calendar</button>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          )}

          {/* PATIENTS */}
          {activeSection === 'patients' && (
            <section style={{ ...styles.mainCard, display: activeSection === 'patients' ? 'block' : 'none' }}>
              <h2>Patients</h2>
              <div style={styles.smallText}>Search, view and manage assigned patients</div>
              <div style={{ marginTop: '12px', ...styles.flex }}>
                <input
                  id="searchPatient"
                  placeholder="Search patient by name, MRN or ID"
                  style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}
                  onChange={(e) => {
                    const q = e.target.value.toLowerCase();
                    if (!q) {
                      setPatients((prev) => [...prev]);
                      return;
                    }
                    const results = patients.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
                    if (results.length === 0) {
                      alert('No patients found');
                    } else {
                      setPatients(results);
                    }
                  }}
                />
                <button style={styles.btn} onClick={() => { /* Search handled on input change */ }}>Search</button>
              </div>
              <table style={{ marginTop: '12px', ...styles.table }}>
                <thead>
                  <tr>
                    <th style={styles.thtd}>Name</th>
                    <th style={styles.thtd}>MRN</th>
                    <th style={styles.thtd}>Age</th>
                    <th style={styles.thtd}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(p => (
                    <tr key={p.id}>
                      <td style={styles.thtd}>{p.name}</td>
                      <td style={styles.thtd}>{p.id}</td>
                      <td style={styles.thtd}>{p.age}</td>
                      <td style={styles.thtd}>
                        <button style={styles.btnDefault} onClick={() => openPatient(p.id)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* REFERRALS */}
          {activeSection === 'referrals' && (
            <section style={{ ...styles.mainCard }}>
              <h2>Referrals</h2>
              <div style={styles.smallText}>Create, track and communicate about referrals</div>
              <div style={{ marginTop: '12px', ...styles.flex }}>
                <button style={styles.btnPrimary} onClick={() => alert('New Referral (simulated)')}>New Referral</button>
                <select
                  id="filterReferral"
                  style={{ marginLeft: '8px' }}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'all') {
                      setReferrals((prev) => [...prev]);
                    } else {
                      setReferrals((prev) => prev.filter(r => r.status === val));
                    }
                  }}
                >
                  <option value="all">All</option>
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>Completed</option>
                </select>
              </div>
              <table style={{ marginTop: '12px', ...styles.table }}>
                <thead>
                  <tr>
                    <th style={styles.thtd}>When</th>
                    <th style={styles.thtd}>Patient Name</th>
                    <th style={styles.thtd}>MRN</th>
                    <th style={styles.thtd}>To</th>
                    <th style={styles.thtd}>Status</th>
                    <th style={styles.thtd}></th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map(r => (
                    <tr key={r.id}>
                      <td style={styles.thtd}>{r.when}</td>
                      <td style={styles.thtd}>{r.patientName}</td>
                      <td style={styles.thtd}>{r.mrn}</td>
                      <td style={styles.thtd}>{r.to}</td>
                      <td style={styles.thtd}>{r.status}</td>
                      <td style={styles.thtd}>
                        <button style={styles.btnDefault} onClick={() => openReferral(r.id)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* APPOINTMENTS */}
          {activeSection === 'appointments' && (
            <section style={styles.mainCard}>
              <h2>Appointments</h2>
              <div style={styles.smallText}>View and manage your schedule</div>
              <div style={{ marginTop: '12px' }}>
                {appointments.map((a, i) => (
                  <div key={i} style={{ padding: '8px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                    <strong>{a.when}</strong>
                    <div style={styles.smallText}>{a.patient} • {a.type}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* MESSAGES */}
          {activeSection === 'messages' && (
            <section style={styles.mainCard}>
              <h2>Messages & Secure Chat</h2>
              <div style={styles.smallText}>Secure messaging with patients and colleagues</div>
              <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '12px', marginTop: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '12px', color: '#fff' }}>
                  <input
                    id="msgSearch"
                    placeholder="Search conversations"
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}
                    onChange={() => {
                      // Filter conversations by name or last message
                      // For simplicity, not implemented here
                    }}
                  />
                  <div id="conversations" style={{ marginTop: '8px', maxHeight: '420px', overflow: 'auto' }}>
                    {filteredMessages.map(m => (
                      <div
                        key={m.id}
                        style={{ padding: '8px', borderBottom: '1px solid rgba(0,0,0,0.04)', cursor: 'pointer' }}
                        onClick={() => openConversation(m.id)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong>{m.with}</strong>
                            <div style={styles.smallText}>{m.last}</div>
                          </div>
                          {m.unread > 0 && <div style={styles.badge}>{m.unread}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ ...styles.mainCard, padding: '12px', maxHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ ...styles.flex, justifyContent: 'space-between' }}>
                    <div>
                      <strong>{activeConv ? activeConv.with : 'Select conversation'}</strong>
                      <div style={styles.smallText} id="chatMeta"></div>
                    </div>
                    <div>
                      <button style={styles.btnDefault} onClick={() => alert('Telehealth started (simulated) - integrate WebRTC in production')}>Start Telehealth</button>
                    </div>
                  </div>
                  <div
                    id="chatMessages"
                    style={{ marginTop: '12px', flex: 1, overflowY: 'auto', border: '1px solid rgba(0,0,0,0.03)', padding: '8px', borderRadius: '8px', color: '#fff' }}
                  >
                    {!activeConv && <div style={styles.smallText}>Select a conversation</div>}
                    {activeConv && activeConv.conversation.map((msg, i) => (
                      <div key={i} style={{ marginBottom: '8px' }}>
                        <div style={{ fontSize: '13px' }}>
                          <strong>{msg.from === 'me' ? 'You' : msg.from === 'patient' ? 'Patient' : 'Colleague'}</strong>{' '}
                          <span style={styles.smallText}>{msg.when}</span>
                        </div>
                        <div>{msg.text}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '8px', ...styles.flex }}>
                    <input
                      id="chatInput"
                      placeholder="Write a message"
                      style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
                    />
                    <button style={styles.btnPrimary} id="sendMsg" onClick={sendMessage}>Send</button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* DOCUMENTS */}
          {activeSection === 'documents' && (
            <section style={styles.mainCard}>
              <h2>Documents & Uploads</h2>
              <div style={styles.smallText}>View and attach documents to referrals or patient records</div>
              <div style={{ marginTop: '12px', ...styles.flex }}>
                <input type="file" id="docUpload" multiple onChange={handleDocUpload} />
                <button style={styles.btnDefault} id="attachDoc" onClick={attachDoc}>Attach to patient</button>
              </div>
              <div style={{ marginTop: '12px' }}>
                {docFiles.map((f, i) => (
                  <div key={i} style={styles.fileListItem}>
                    <strong>{f.name}</strong>
                    <div style={styles.smallText}>{Math.round(f.size / 1024)} KB</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ANALYTICS */}
          {activeSection === 'analytics' && (
            <section style={styles.mainCard}>
              <h2>Analytics</h2>
              <div style={styles.smallText}>Referral volumes, turnaround times and outcomes</div>
              <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={styles.mainCard}>
                  <h4>Referrals by status</h4>
                  <div style={styles.smallText}>
                    Pending: {referrals.filter(r => r.status === 'Pending').length} • Accepted: {referrals.filter(r => r.status === 'Accepted').length} • Completed: {referrals.filter(r => r.status === 'Completed').length}
                  </div>
                </div>
                <div style={styles.mainCard}>
                  <h4>Average turnaround (days)</h4>
                  <div style={styles.smallText}>2.4 days</div>
                </div>
              </div>
              <div style={{ marginTop: '12px', ...styles.mainCard }}>
                <h4>Referral counts (last 30 days)</h4>
                <div style={styles.smallText}>{referrals.length} referrals in last 30 days</div>
              </div>
            </section>
          )}

          {/* SECURITY */}
          {activeSection === 'security' && (
            <section style={styles.mainCard}>
              <h2>Security & Audit Logs</h2>
              <div style={styles.smallText}>Login history, data access logs and session control</div>
              <div style={{ marginTop: '12px', ...styles.panel, ...styles.mainCard }}>
                <h4>Login History</h4>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.thtd}>When</th>
                      <th style={styles.thtd}>Device</th>
                      <th style={styles.thtd}>IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loginHistory.map((l, i) => (
                      <tr key={i}>
                        <td style={styles.thtd}>{l.when}</td>
                        <td style={styles.thtd}>{l.device}</td>
                        <td style={styles.thtd}>{l.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: '12px', ...styles.panel, ...styles.mainCard }}>
                <h4>Data Access Logs</h4>
                <div style={styles.smallText}>No recent access logs</div>
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

export default DoctorDashboard;