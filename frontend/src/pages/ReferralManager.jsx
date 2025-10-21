import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaUserMd, FaHospital, FaPhone, FaEnvelope, FaVideo, FaCheck, FaTimes, FaClock, FaSearch, FaFilter, FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ReferralManager = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [referrals, setReferrals] = useState([
    { id: 1001, patientName: 'Jane Wanjiru', mrn: 'MRN001', from: 'General Practice', to: 'Cardiology', status: 'Pending', priority: 'High', notes: 'Suspected CHF', date: '2025-09-24', assignedTo: null },
    { id: 1002, patientName: 'John Otieno', mrn: 'MRN002', from: 'Emergency', to: 'Orthopedics', status: 'Accepted', priority: 'Medium', notes: 'Knee pain', date: '2025-09-23', assignedTo: 'Dr. Smith' },
    { id: 1003, patientName: 'Mary Achieng', mrn: 'MRN003', from: 'Pediatrics', to: 'Endocrinology', status: 'Completed', priority: 'Low', notes: 'Diabetes follow-up', date: '2025-09-21', assignedTo: 'Dr. Johnson' },
    { id: 1004, patientName: 'Peter Kiprop', mrn: 'MRN004', from: 'Internal Medicine', to: 'Neurology', status: 'Rejected', priority: 'High', notes: 'Headaches', date: '2025-09-20', assignedTo: null },
  ]);
  const [contacts] = useState([
    { id: 1, name: 'Dr. Alice Mwangi', role: 'Cardiologist', department: 'Cardiology', phone: '+254700123456', email: 'alice.mwangi@afyalink.com', available: true },
    { id: 2, name: 'Dr. Bob Otieno', role: 'Orthopedic Surgeon', department: 'Orthopedics', phone: '+254700234567', email: 'bob.otieno@afyalink.com', available: false },
    { id: 3, name: 'Nurse Sarah Achieng', role: 'Nurse Specialist', department: 'Nursing', phone: '+254700345678', email: 'sarah.achieng@afyalink.com', available: true },
    { id: 4, name: 'Dr. Carol Kiprop', role: 'Endocrinologist', department: 'Endocrinology', phone: '+254700456789', email: 'carol.kiprop@afyalink.com', available: true },
    { id: 5, name: 'Admin David Wanjiku', role: 'Administrator', department: 'Admin', phone: '+254700567890', email: 'david.wanjiku@afyalink.com', available: true },
  ]);
  const [messages] = useState([
    { id: 1, from: 'Dr. Alice Mwangi', text: 'Referral #1001 accepted', timestamp: '2025-09-24 10:00', unread: true },
    { id: 2, from: 'Nurse Sarah Achieng', text: 'Patient ready for transfer', timestamp: '2025-09-23 14:30', unread: false },
  ]);
  const [notifications] = useState([
    { id: 1, type: 'urgent', message: 'High priority referral #1001 needs attention', timestamp: '2025-09-24 09:00' },
    { id: 2, type: 'info', message: 'New contact added: Dr. Eve Njoroge', timestamp: '2025-09-23 16:00' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'referral_manager') {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  const updateReferralStatus = (id, status) => {
    setReferrals(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const assignReferral = (id, contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    setReferrals(prev => prev.map(r => r.id === id ? { ...r, assignedTo: contact.name } : r));
  };

  const contactPerson = (contactId, method) => {
    const contact = contacts.find(c => c.id === contactId);
    if (method === 'call') {
      window.open(`tel:${contact.phone}`);
    } else if (method === 'email') {
      window.open(`mailto:${contact.email}`);
    } else if (method === 'video') {
      alert(`Starting video call with ${contact.name} (integrate WebRTC in production)`);
    }
  };

  const filteredReferrals = referrals.filter(r => {
    const matchesSearch = r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || r.status.toLowerCase() === filterStatus;
    const matchesPriority = filterPriority === 'all' || r.priority.toLowerCase() === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return <FaClock className="text-yellow-500" />;
      case 'accepted': return <FaCheck className="text-green-500" />;
      case 'completed': return <FaCheck className="text-blue-500" />;
      case 'rejected': return <FaTimes className="text-red-500" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: "url('https://thumbs.dreamstime.com/z/female-surgeon-operating-assistants-surgeons-work-blue-filter-modern-medicine-professional-doctors-female-surgeon-180933368.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontFamily: 'Inter, system-ui, Segoe UI, Roboto, Arial',
      color: '#0f1720'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'rgba(0,0,0,0.7)',
        borderRadius: '0 0 24px 24px',
        color: '#fff'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>AFYALINK - Referral Manager</h1>
          <div style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>
            {currentUser ? `Welcome, ${currentUser.fullName} (${currentUser.uniqueId})` : 'Referral Manager'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaBell style={{ cursor: 'pointer' }} />
          <FaUserCircle style={{ cursor: 'pointer' }} />
          <button
            style={{
              background: '#f6ad55',
              color: '#2a4365',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
            onClick={() => { if (confirm('Sign out?')) { localStorage.clear(); navigate('/login'); } }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '2rem'
      }}>
        {/* Sidebar */}
        <nav style={{
          background: 'rgba(0,0,0,0.8)',
          borderRadius: '12px',
          padding: '1rem',
          color: '#fff',
          height: 'fit-content'
        }}>
          <h3 style={{ marginTop: 0 }}>Navigation</h3>
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'referrals', label: 'Referrals', icon: '🔄' },
            { key: 'contacts', label: 'Contacts', icon: '👥' },
            { key: 'messages', label: 'Messages', icon: '💬' },
            { key: 'analytics', label: 'Analytics', icon: '📈' },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                background: activeSection === key ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: '0.5rem'
              }}
              onClick={() => setActiveSection(key)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main>
          {/* Overview */}
          {activeSection === 'overview' && (
            <div style={{
              background: 'rgba(0,0,0,0.8)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#fff'
            }}>
              <h2 style={{ marginTop: 0 }}>Overview</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <h3>{referrals.filter(r => r.status === 'Pending').length}</h3>
                  <p>Pending Referrals</p>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <h3>{referrals.filter(r => r.status === 'Accepted').length}</h3>
                  <p>Accepted Referrals</p>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <h3>{contacts.filter(c => c.available).length}</h3>
                  <p>Available Contacts</p>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <h3>{messages.filter(m => m.unread).length}</h3>
                  <p>Unread Messages</p>
                </div>
              </div>
              <div>
                <h3>Recent Notifications</h3>
                {notifications.slice(0, 3).map(n => (
                  <div key={n.id} style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    marginBottom: '0.5rem'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.875rem' }}>{n.message}</p>
                    <small style={{ color: '#ccc' }}>{n.timestamp}</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referrals */}
          {activeSection === 'referrals' && (
            <div style={{
              background: 'rgba(0,0,0,0.8)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#fff'
            }}>
              <h2 style={{ marginTop: 0 }}>Referral Management</h2>
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem',
                alignItems: 'center'
              }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <FaSearch style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                  <input
                    type="text"
                    placeholder="Search referrals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.5rem 0.5rem 2rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#fff'
                    }}
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff'
                  }}
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: '#fff'
                }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Patient</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>From/To</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Status</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Priority</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Assigned To</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReferrals.map(r => (
                      <tr key={r.id}>
                        <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <div>
                            <strong>{r.patientName}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#ccc' }}>{r.mrn}</div>
                          </div>
                        </td>
                        <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <div>{r.from} → {r.to}</div>
                          <div style={{ fontSize: '0.75rem', color: '#ccc' }}>{r.date}</div>
                        </td>
                        <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            {getStatusIcon(r.status)}
                            {r.status}
                          </div>
                        </td>
                        <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            ...getPriorityColor(r.priority)
                          }}>
                            {r.priority}
                          </span>
                        </td>
                        <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          {r.assignedTo || 'Unassigned'}
                        </td>
                        <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            {r.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => updateReferralStatus(r.id, 'Accepted')}
                                  style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    border: 'none',
                                    background: '#10b981',
                                    color: '#fff',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => updateReferralStatus(r.id, 'Rejected')}
                                  style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    border: 'none',
                                    background: '#ef4444',
                                    color: '#fff',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <select
                              onChange={(e) => assignReferral(r.id, parseInt(e.target.value))}
                              style={{
                                padding: '0.25rem',
                                borderRadius: '4px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.1)',
                                color: '#fff'
                              }}
                            >
                              <option value="">Assign to...</option>
                              {contacts.filter(c => c.available).map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Contacts */}
          {activeSection === 'contacts' && (
            <div style={{
              background: 'rgba(0,0,0,0.8)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#fff'
            }}>
              <h2 style={{ marginTop: 0 }}>Contact Directory</h2>
              <p style={{ marginBottom: '1rem' }}>Manage and contact healthcare professionals, specialists, and administrators.</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1rem'
              }}>
                {contacts.map(c => (
                  <div key={c.id} style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <FaUserMd />
                      <div>
                        <h4 style={{ margin: 0 }}>{c.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#ccc' }}>{c.role} - {c.department}</p>
                      </div>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                        <FaPhone />
                        {c.phone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                        <FaEnvelope />
                        {c.email}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
                      <button
                        onClick={() => contactPerson(c.id, 'call')}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          borderRadius: '4px',
                          border: 'none',
                          background: '#10b981',
                          color: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <FaPhone size={12} />
                        Call
                      </button>
                      <button
                        onClick={() => contactPerson(c.id, 'email')}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          borderRadius: '4px',
                          border: 'none',
                          background: '#3b82f6',
                          color: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <FaEnvelope size={12} />
                        Email
                      </button>
                      <button
                        onClick={() => contactPerson(c.id, 'video')}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          borderRadius: '4px',
                          border: 'none',
                          background: '#8b5cf6',
                          color: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <FaVideo size={12} />
                        Video
                      </button>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: c.available ? '#10b981' : '#ef4444'
                      }}></div>
                      {c.available ? 'Available' : 'Unavailable'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {activeSection === 'messages' && (
            <div style={{
              background: 'rgba(0,0,0,0.8)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#fff'
            }}>
              <h2 style={{ marginTop: 0 }}>Messages & Communications</h2>
              <div>
                {messages.map(m => (
                  <div key={m.id} style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong>{m.from}</strong>
                        <p style={{ margin: '0.25rem 0', color: '#e2e8f0' }}>{m.text}</p>
                        <small style={{ color: '#ccc' }}>{m.timestamp}</small>
                      </div>
                      {m.unread && (
                        <span style={{
                          background: '#ef4444',
                          color: '#fff',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '999px',
                          fontSize: '0.75rem'
                        }}>
                          New
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeSection === 'analytics' && (
            <div style={{
              background: 'rgba(0,0,0,0.8)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#fff'
            }}>
              <h2 style={{ marginTop: 0 }}>Analytics & Insights</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  <h4>Referral Success Rate</h4>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>87%</p>
                  <p style={{ fontSize: '0.875rem', color: '#ccc', margin: 0 }}>Last 30 days</p>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  <h4>Average Response Time</h4>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>2.3h</p>
                  <p style={{ fontSize: '0.875rem', color: '#ccc', margin: 0 }}>For accepted referrals</p>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  <h4>Most Requested Specialty</h4>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Cardiology</p>
                  <p style={{ fontSize: '0.875rem', color: '#ccc', margin: 0 }}>45 referrals</p>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  <h4>Contact Utilization</h4>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>92%</p>
                  <p style={{ fontSize: '0.875rem', color: '#ccc', margin: 0 }}>Available contacts engaged</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '2rem 4vw',
        color: '#fff',
        textAlign: 'center',
        background: 'rgba(44,62,80,0.7)',
        borderRadius: '24px 24px 0 0',
        marginTop: '2rem'
      }}>
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

export default ReferralManager;
