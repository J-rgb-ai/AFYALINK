import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const NurseDashboard = () => {
  const navigate = useNavigate();
  // State for data
  const [user, setUser] = useState({});
  const [samplePatients, setSamplePatients] = useState([
    {id:101,admit:'2025-09-25',patient:'Jane Wanjiru (MRN001)',priority:'Critical',ward:'ICU',status:'Admitted',notes:'Post-op monitoring',vitals:[{bp:'120/80',hr:72,temp:98.6}],meds:[{name:'Morphine',time:'08:00'}]},
    {id:102,admit:'2025-09-24',patient:'John Otieno (MRN002)',priority:'Stable',ward:'Ward 2',status:'Monitoring',notes:'Diabetes management',vitals:[{bp:'118/76',hr:68,temp:97.8}],meds:[{name:'Insulin',time:'12:00'}]},
    {id:103,admit:'2025-09-23',patient:'Mary Achieng (MRN003)',priority:'Stable',ward:'Ward 1',status:'Admitted',notes:'Routine check',vitals:[{bp:'122/78',hr:70,temp:98.2}],meds:[{name:'Aspirin',time:'06:00'}]}
  ]);
  const [messages] = useState([
    {id:1,from:'Dr. Mwangi',text:'Check vitals for 101',when:'08:20'},
    {id:2,from:'Admin',text:'New patient 104 admitted',when:'07:15'}
  ]);
  const [referrals] = useState([
    {id:1,patient:'Jane Wanjiru',specialty:'Cardiology',status:'Pending',when:'2025-09-25'},
    {id:2,patient:'John Otieno',specialty:'Endocrinology',status:'Accepted',when:'2025-09-24'}
  ]);
  const [activity, setActivity] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [offlineDrafts, setOfflineDrafts] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterWard, setFilterWard] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [careNotes, setCareNotes] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [updateStatusSelect, setUpdateStatusSelect] = useState('Admitted');
  const [mewsInputs, setMewsInputs] = useState({bp: '', hr: '', rr: '', temp: '', avpu: ''});
  const [mewsScore, setMewsScore] = useState(0);
  const [currentLang, setCurrentLang] = useState('en');
  const [translations] = useState({
    en: {
      title: 'Nurse Dashboard',
      subtitle: 'Manage patient care, monitoring, vitals & medication',
      user: 'Nurse Specialist • Dept: Nursing',
      filters: 'Patient Filters',
      priority: 'Priority',
      status: 'Status',
      ward: 'Ward',
      dept: 'Department',
      refresh: '🔄 Refresh',
      quickActions: 'Quick actions',
      assignRounds: '🤖 Assign rounds',
      openCalendar: '📅 Open calendar',
      patientList: 'Patient List',
      patientsUnderCare: 'Patients under care',
      patientViewer: 'Patient #',
      patMeta: 'Ward • Status • Priority',
      requestInfo: 'Request more info',
      recordVitals: 'Record Vitals',
      administerMed: 'Administer Med',
      patientSummary: 'Patient Summary',
      recentVitals: 'Recent Vitals',
      medSchedule: 'Medication Schedule',
      careTimeline: 'Care Timeline',
      mewsCalc: 'MEWS Calculator',
      calcMews: 'Calculate MEWS',
      mewsScore: 'Score: 0',
      guidelines: 'Clinical Guidelines',
      careNotes: 'Care Notes',
      saveNotes: 'Save Notes',
      saveDraft: 'Save Draft',
      addAttachment: 'Attach file',
      actions: 'Actions',
      updateStatus: 'Update Status',
      update: 'Update',
      escalate: 'Escalate',
      startTele: 'Start Telehealth',
      messageDoctor: 'Message Doctor',
      notesActivity: 'Notes & Activity',
      recentCare: 'Recent care notes and activity log',
      tasks: 'Tasks',
      addTask: 'Add',
      calendar: 'Calendar (today)',
      messages: 'Messages',
      openChat: 'Open Chat →',
      analytics: 'Analytics',
      statMonitored: 'Patients monitored: ',
      statVitals: 'Vitals recorded: ',
      statReferrals: 'Referrals pending: ',
      exportReport: 'Export Report',
      referrals: 'Referrals',
      offlineDrafts: 'Offline Drafts',
      signout: 'Sign out'
    },
    sw: {
      title: 'Dashibodi ya Muuguzi',
      subtitle: 'Dhibiti utunzaji wa wagonjwa, ufuatiliaji, dalili za muhimu & dawa',
      user: 'Muuguzi Mtaalamu • Idara: Nursing',
      filters: 'Vichujio vya Wagonjwa',
      priority: 'Kipaumbele',
      status: 'Hali',
      ward: 'Wadi',
      dept: 'Idara',
      refresh: '🔄 Sasisha',
      quickActions: 'Hatua za haraka',
      assignRounds: '🤖 Weka raundi',
      openCalendar: '📅 Fungua kalenda',
      patientList: 'Orodha ya Wagonjwa',
      patientsUnderCare: 'Wagonjwa chini ya utunzaji',
      patientViewer: 'Mgoniwa #',
      patMeta: 'Wadi • Hali • Kipaumbele',
      requestInfo: 'Omba maelezo zaidi',
      recordVitals: 'Rekodi Dalili Muhimu',
      administerMed: 'Toa Dawa',
      patientSummary: 'Muhtasari wa Mgoniwa',
      recentVitals: 'Dalili Muhimu za Hivi Karibuni',
      medSchedule: 'Ratiba ya Dawa',
      careTimeline: 'Muda wa Utunzaji',
      mewsCalc: 'Kikokotoo cha MEWS',
      calcMews: 'Hesabu MEWS',
      mewsScore: 'Alama: 0',
      guidelines: 'Miongozo ya Kliniki',
      careNotes: 'Maelezo ya Utunzaji',
      saveNotes: 'Hifadhi Maelezo',
      saveDraft: 'Hifadhi Rasimu',
      addAttachment: 'Ongeza faili',
      actions: 'Hatua',
      updateStatus: 'Sasisha Hali',
      update: 'Sasisha',
      escalate: 'Paza Juu',
      startTele: 'Anza Telehealth',
      messageDoctor: 'Tuma Ujumbe kwa Daktari',
      notesActivity: 'Maelezo & Shughuli',
      recentCare: 'Maelezo ya utunzaji wa hivi karibuni na rekodi ya shughuli',
      tasks: 'Majukumu',
      addTask: 'Ongeza',
      calendar: 'Kalenda (leo)',
      messages: 'Mjumbe',
      openChat: 'Fungua Chat →',
      analytics: ' Uchambuzi',
      statMonitored: 'Wagonjwa wanaofuatiwa: ',
      statVitals: 'Dalili muhimu zilizorekodiwa: ',
      statReferrals: 'Rejea zinazosubiri: ',
      exportReport: 'Hamisha Ripoti',
      referrals: 'Rejea',
      offlineDrafts: 'Rasimu za Nje ya Mtandao',
      signout: 'Ondoka'
    }
  });

  // Refs for DOM elements that need direct access (minimized)
  const patientViewerRef = useRef(null);
  const activityLogRef = useRef(null);
  const msgListRef = useRef(null);
  const taskListRef = useRef(null);
  const referralsListRef = useRef(null);
  const offlineDraftsRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!storedUser || storedUser.role !== 'nurse') {
      navigate('/login');
      return;
    }
    setUser(storedUser);

    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([
        { fullName: 'Test Patient 1', email: 'patient1@test.com', role: 'patient' },
        { fullName: 'Test Patient 2', email: 'patient2@test.com', role: 'patient' }
      ]));
    }

    const storedTasks = JSON.parse(localStorage.getItem('nurseTasks') || '[]');
    setTasks(storedTasks);

    const storedDrafts = JSON.parse(localStorage.getItem('offlineDrafts') || '[]');
    setOfflineDrafts(storedDrafts);

    // Set department for patients
    setSamplePatients(prev => prev.map(p => ({...p, department: 'Nursing'})));
  }, [navigate]);


  const openPatient = (id) => {
    const p = samplePatients.find(x => x.id === id);
    if (!p) return;
    setCurrentPatient(p);
    // Update displayed elements via state or refs
    // Since JSX, the viewer is conditional on currentPatient
  };

  const monitorPatient = (id) => {
    setSamplePatients(prev => prev.map(p => p.id === id ? {...p, status: 'Monitoring'} : p));
    setActivity(prev => [{when: new Date().toLocaleString(), text: `Started monitoring patient ${id}`}, ...prev]);
    localStorage.setItem('samplePatients', JSON.stringify(samplePatients));
    updateAnalytics();
  };

  const recordVitals = () => {
    if (!currentPatient) return;
    const bp = prompt('Enter BP (e.g., 120/80):');
    const hr = prompt('Enter HR:');
    const temp = prompt('Enter Temp (°F):');
    if (!bp || !hr || !temp) return;
    setSamplePatients(prev => prev.map(p => p.id === currentPatient.id ? {...p, vitals: [{bp, hr: +hr, temp: +temp}, ...p.vitals]} : p));
    setActivity(prev => [{when: new Date().toLocaleString(), text: `Vitals recorded for ${currentPatient.id}`}, ...prev]);
    localStorage.setItem('samplePatients', JSON.stringify(samplePatients));
    updateAnalytics();
  };

  const administerMed = () => {
    if (!currentPatient) return;
    const med = prompt('Administer which med?');
    if (!med) return;
    setActivity(prev => [{when: new Date().toLocaleString(), text: `Administered ${med} to ${currentPatient.id}`}, ...prev]);
    alert('Medication administered (simulated)');
  };

  const updateStatus = () => {
    if (!currentPatient) return;
    setSamplePatients(prev => prev.map(p => p.id === currentPatient.id ? {...p, status: updateStatusSelect} : p));
    setActivity(prev => [{when: new Date().toLocaleString(), text: `Status updated for ${currentPatient.id} to ${updateStatusSelect}`}, ...prev]);
    updateAnalytics();
  };

  const requestInfo = () => {
    if (!currentPatient) return;
    const reason = prompt('What additional info do you need?');
    if (!reason) return;
    setActivity(prev => [{when: new Date().toLocaleString(), text: `Requested more info for ${currentPatient.id}: ${reason}`}, ...prev]);
    alert('Request sent (simulated)');
  };

  const saveNotes = () => {
    if (!currentPatient || !careNotes.trim()) return;
    setActivity(prev => [{when: new Date().toLocaleString(), text: `Care note saved for ${currentPatient.id}: ${careNotes.substring(0, 50)}...`}, ...prev]);
    setCareNotes('');
    alert('Note saved (simulated)');
  };

  const saveDraft = () => {
    if (!currentPatient || !careNotes.trim()) return;
    const newDraft = {id: Date.now(), patient: currentPatient.patient, note: careNotes};
    setOfflineDrafts(prev => [...prev, newDraft]);
    localStorage.setItem('offlineDrafts', JSON.stringify([...offlineDrafts, newDraft]));
    alert('Draft saved (simulated)');
  };

  const addAttachment = () => {
    if (!currentPatient) return;
    const name = prompt('Attachment name (simulate upload)');
    if (!name) return;
    setSamplePatients(prev => prev.map(p => p.id === currentPatient.id ? {...p, attachments: [...(p.attachments || []), {name}]} : p));
    setActivity(prev => [{when: new Date().toLocaleString(), text: `Attachment ${name} added to ${currentPatient.id}`}, ...prev]);
  };

  const startTele = () => {
    alert('Starting telehealth session (simulated). Integrate WebRTC/Third-party link in production.');
  };

  const refreshPatients = () => {
    alert('Patients refreshed (simulated)');
  };

  const assignRounds = () => {
    setSamplePatients(prev => prev.map(p => p.status === 'Admitted' ? {...p, status: 'Monitoring'} : p));
    alert('Rounds assigned (simulated)');
    updateAnalytics();
  };

  const openCalendar = () => {
    alert('Open calendar (integrate with calendar component in production)');
  };

  const messageDoctor = () => {
    if (!currentPatient) return;
    const msg = prompt('Message to doctor:');
    if (!msg) return;
    setActivity(prev => [{when: new Date().toLocaleString(), text: `Message to doctor for ${currentPatient.id}: ${msg}`}, ...prev]);
    alert('Message sent (simulated)');
  };

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks(prev => [...prev, taskInput]);
    localStorage.setItem('nurseTasks', JSON.stringify([...tasks, taskInput]));
    setTaskInput('');
  };

  const deleteTask = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
    localStorage.setItem('nurseTasks', JSON.stringify(tasks.filter((_, i) => i !== index)));
  };

  const editDraft = (id) => {
    const draft = offlineDrafts.find(d => d.id === id);
    if (draft) setCareNotes(draft.note);
  };

  const calcMews = () => {
    const {bp, hr, rr, temp, avpu} = mewsInputs;
    let score = 0;
    // Simplified MEWS
    if (bp < 70 || bp > 200) score += 3;
    else if (bp < 100 || bp > 180) score += 2;
    else if (bp < 110 || bp > 160) score += 1;

    if (hr < 40 || hr > 130) score += 3;
    else if (hr < 50 || hr > 110) score += 2;
    else if (hr < 60 || hr > 100) score += 1;

    if (rr < 8 || rr > 30) score += 3;
    else if (rr < 10 || rr > 25) score += 2;
    else if (rr < 12 || rr > 20) score += 1;

    if (temp < 35 || temp > 39) score += 3;
    else if (temp < 36 || temp > 38) score += 2;
    else if (temp < 36.1 || temp > 38.4) score += 1;

    score += +avpu || 0;

    setMewsScore(score);
    if (score >= 5) alert('High MEWS score! Escalate care immediately.');
  };

  const escalate = () => {
    if (!currentPatient) return;
    setActivity(prev => [{when: new Date().toLocaleString(), text: `Escalated patient ${currentPatient.id}`}, ...prev]);
    alert('Patient escalated (simulated)');
  };

  const exportReport = () => {
    const data = {
      monitored: samplePatients.filter(s => s.status === 'Monitoring').length,
      vitals: samplePatients.reduce((sum, p) => sum + p.vitals.length, 0),
      referrals: referrals.filter(r => r.status === 'Pending').length,
      timestamp: new Date().toLocaleString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nurse-report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const switchLanguage = () => {
    setCurrentLang(prev => prev === 'en' ? 'sw' : 'en');
    // In full impl, update all textContent; here, re-render will use currentLang in JSX
  };

  const signOut = () => {
    if (confirm('Sign out?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const updateAnalytics = () => {
    // Analytics displayed in JSX based on state
  };

  const lang = translations[currentLang];

  // Render messages
  const renderedMessages = messages.map(m => (
    <div key={m.id} className="small" style={{padding: '6px', borderBottom: '1px solid rgba(0,0,0,0.04)'}}>
      <strong>{m.from}</strong>
      <div className="muted">{m.text}</div>
      <div className="small">{m.when}</div>
    </div>
  ));

  // Render tasks
  const renderedTasks = tasks.map((t, i) => (
    <li key={i}>
      {t} <button className="btn" onClick={() => deleteTask(i)}>Done</button>
    </li>
  ));

  // Render referrals
  const renderedReferrals = referrals.map(r => (
    <div key={r.id} className="small" style={{padding: '6px', borderBottom: '1px solid rgba(0,0,0,0.04)'}}>
      <strong>{r.patient}</strong>
      <div className="muted">{r.specialty}</div>
      <div className={`small status-${r.status.toLowerCase()}`}>{r.status} • {r.when}</div>
    </div>
  ));

  // Render offline drafts
  const renderedOfflineDrafts = offlineDrafts.map(d => (
    <div key={d.id} className="offline-draft">
      <strong>{d.patient}</strong>
      <div className="small">{d.note}</div>
      <button className="btn" onClick={() => editDraft(d.id)}>Edit</button>
    </div>
  ));

  // Render activity
  const renderedActivity = activity.slice(0, 5).map((a, i) => (
    <div key={i} className="small" style={{marginBottom: '6px'}}>
      {a.when} • {a.text}
    </div>
  ));

  // Render patients list
  const filteredPatients = samplePatients.filter(p => {
    if (filterPriority !== 'all' && p.priority.toLowerCase() !== filterPriority) return false;
    if (filterStatus !== 'all' && p.status.toLowerCase() !== filterStatus.toLowerCase()) return false;
    if (filterWard && !p.ward.toLowerCase().includes(filterWard.toLowerCase())) return false;
    if (filterDept !== 'all' && p.department !== filterDept) return false;
    return true;
  });

  const patientItems = filteredPatients.map(p => (
    <div key={p.id} className="queue-item">
      <div>
        <strong>{p.patient}</strong>
        <div className="small">{p.ward} • {p.admit}</div>
        <div className="small">{p.notes}</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'6px',alignItems:'flex-end'}}>
        <div className="small-pill">{p.priority}</div>
        <div style={{display:'flex',gap:'6px'}}>
          <button className="btn" onClick={() => openPatient(p.id)}>View</button>
          <button className="btn" onClick={() => monitorPatient(p.id)}>Monitor</button>
        </div>
      </div>
    </div>
  ));

  // Patient viewer content
  const patientViewerContent = currentPatient ? (
    <>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div>
          <h3>{lang.patientViewer} {currentPatient.patient}</h3>
          <div className="small">{currentPatient.ward} • {currentPatient.status} • {currentPatient.priority}</div>
        </div>
        <div className="row">
          <button className="btn" onClick={requestInfo}>{lang.requestInfo}</button>
          <button className="btn primary" onClick={recordVitals}>{lang.recordVitals}</button>
          <button className="btn" onClick={administerMed}>{lang.administerMed}</button>
        </div>
      </div>
      <hr style={{margin: '12px 0'}} />
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:'12px'}}>
        <div>
          <h4>{lang.patientSummary}</h4>
          <div className="small" style={{marginTop:'6px'}}>Patient summary (mock): {currentPatient.patient} — allergies: none • meds: {currentPatient.meds.map(m => m.name).join(', ')}</div>

          <h4 style={{marginTop:'10px'}}>{lang.recentVitals}</h4>
          <div className="small" style={{marginTop:'6px'}}>
            {currentPatient.vitals.slice(0, 3).map((v, i) => (
              <div key={i}>BP: {v.bp}, HR: {v.hr}, Temp: {v.temp}°F</div>
            ))}
          </div>

          <h4 style={{marginTop:'10px'}}>{lang.medSchedule}</h4>
          <div className="small" style={{marginTop:'6px'}}>
            {currentPatient.meds.map((m, i) => (
              <div key={i}>{m.name} at {m.time}</div>
            ))}
          </div>

          <h4 style={{marginTop:'10px'}}>{lang.careTimeline}</h4>
          <ul className="timeline">
            {/* Timeline items would be from state */}
          </ul>

          <h4 style={{marginTop:'10px'}}>{lang.mewsCalc}</h4>
          <div className="mews-form">
            <input type="number" className="mews-input" placeholder="Systolic BP" value={mewsInputs.bp} onChange={(e) => setMewsInputs(prev => ({...prev, bp: e.target.value}))} />
            <input type="number" className="mews-input" placeholder="Heart Rate" value={mewsInputs.hr} onChange={(e) => setMewsInputs(prev => ({...prev, hr: e.target.value}))} />
            <input type="number" className="mews-input" placeholder="Respiratory Rate" value={mewsInputs.rr} onChange={(e) => setMewsInputs(prev => ({...prev, rr: e.target.value}))} />
            <input type="number" className="mews-input" placeholder="Temperature" value={mewsInputs.temp} onChange={(e) => setMewsInputs(prev => ({...prev, temp: e.target.value}))} />
            <input type="number" className="mews-input" placeholder="AVPU (1-5)" value={mewsInputs.avpu} onChange={(e) => setMewsInputs(prev => ({...prev, avpu: e.target.value}))} />
            <button className="btn" onClick={calcMews}>{lang.calcMews}</button>
            <div className="mews-score">{lang.mewsScore.replace('0', mewsScore.toString())}</div>
          </div>

          <div className="guidelines">
            <h5>{lang.guidelines}</h5>
            <p>Follow standard protocols for patient monitoring and medication administration.</p>
          </div>

          <h4 style={{marginTop:'10px'}}>{lang.careNotes}</h4>
          <textarea className="textarea" placeholder="Enter care notes, observations..." value={careNotes} onChange={(e) => setCareNotes(e.target.value)} />
          <div style={{marginTop:'8px'}} className="row">
            <button className="btn primary" onClick={saveNotes}>{lang.saveNotes}</button>
            <button className="btn" onClick={saveDraft}>{lang.saveDraft}</button>
            <button className="btn" onClick={addAttachment}>{lang.addAttachment}</button>
          </div>
        </div>

        <aside>
          <div className="card" style={{padding:'10px'}}>
            <h4>{lang.actions}</h4>
            <label className="small" style={{marginTop:'6px'}}>Update Status</label>
            <select value={updateStatusSelect} onChange={(e) => setUpdateStatusSelect(e.target.value)} style={{width:'100%',padding:'8px',marginTop:'6px',borderRadius:'6px'}}>
              <option>Admitted</option>
              <option>Monitoring</option>
              <option>Discharged</option>
            </select>
            <div style={{marginTop:'8px'}} className="row">
              <button className="btn" onClick={updateStatus}>{lang.update}</button>
              <button className="btn" onClick={escalate}>{lang.escalate}</button>
            </div>

            <hr style={{margin:'10px 0'}} />
            <h4>{lang.quickActions}</h4>
            <div style={{marginTop:'8px'}} className="row">
              <button className="btn" onClick={startTele}>{lang.startTele}</button>
              <button className="btn" onClick={messageDoctor}>{lang.messageDoctor}</button>
            </div>
          </div>
        </aside>
      </div>
    </>
  ) : null;

  // Analytics
  const monitored = samplePatients.filter(s => s.status === 'Monitoring').length;
  const vitalsCount = samplePatients.reduce((sum, p) => sum + p.vitals.length, 0);
  const pendingReferrals = referrals.filter(r => r.status === 'Pending').length;

  return (
    <>
      <style>{`
        :root{--bg:#f6f8fb;--card:#fff;--muted:#6b7280;--accent:#075985;--ok:#059669;--danger:#b91c1c;--radius:12px;--shadow:0 8px 24px rgba(12,20,30,0.06);--container:1200px;font-family:Inter,system-ui,Segoe UI,Roboto,Arial}
        *{box-sizing:border-box}
        body{margin:0;background:var(--bg) url('https://thumbs.dreamstime.com/z/female-surgeon-operating-assistants-surgeons-work-blue-filter-modern-medicine-professional-doctors-female-surgeon-180933368.jpg') no-repeat center center / cover;color:#0b1220}
        .wrap{max-width:var(--container);margin:18px auto;padding:18px}
        header{display:flex;justify-content:space-between;align-items:center}
        h1{margin:0;font-size:18px}
        .small{color:#e5e7eb;font-size:13px}
        .layout{display:grid;grid-template-columns:260px 1fr 360px;gap:18px;margin-top:12px}
        nav.card{padding:12px;background:rgba(0,0,0,0.5);color:#fff;border-radius:var(--radius);box-shadow:var(--shadow);height:calc(100vh - 110px);position:sticky;top:18px;overflow:auto}
        nav button{display:flex;align-items:center;gap:10px;width:100%;padding:10px;border-radius:8px;border:0;background:transparent;text-align:left;cursor:pointer}
        nav button.active{background:linear-gradient(90deg, rgba(7,89,133,0.08), rgba(7,89,133,0.04));}
        .card{padding:12px;background:rgba(0,0,0,0.5);color:#fff;border-radius:var(--radius);box-shadow:var(--shadow)}
        .panel{margin-bottom:12px}
        .queue-item{display:flex;justify-content:space-between;align-items:flex-start;padding:10px;border-radius:8px;border:1px solid rgba(0,0,0,0.04);margin-bottom:8px}
        .btn{padding:8px 10px;border-radius:8px;border:1px solid rgba(0,0,0,0.06);background:transparent;cursor:pointer}
        .btn.primary{background:var(--accent);color:#fff;border:none}
        .badge{display:inline-block;padding:4px 8px;border-radius:999px;background:#eef6ff;color:var(--accent);font-size:12px}
        .notification-badge{background:var(--danger);color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:12px;position:absolute;top:-5px;right:-5px}
        .status-critical{background:var(--danger);color:#fff}
        .status-stable{background:var(--ok);color:#fff}
        .status-pending{background:#fbbf24;color:#000}
        .status-accepted{background:var(--accent);color:#fff}
        .status-completed{background:var(--ok);color:#fff}
        .status-urgent{background:var(--danger);color:#fff}
        .flag-missed{background:var(--danger);color:#fff;padding:2px 4px;border-radius:4px;font-size:10px}
        .timeline{list-style:none;padding:0;margin:10px 0}
        .timeline li{padding:8px 0;border-left:2px solid var(--muted);margin-left:10px;position:relative}
        .timeline li:before{content:'';position:absolute;left:-6px;top:8px;width:12px;height:12px;border-radius:50%;background:var(--accent)}
        .guidelines{background:#f0f9ff;padding:10px;border-radius:8px;margin-top:10px}
        .mews-form{display:grid;gap:8px;margin-top:10px}
        .mews-input{padding:6px;border-radius:4px;border:1px solid var(--muted)}
        .mews-score{background:var(--accent);color:#fff;padding:4px;border-radius:4px;text-align:center}

        .offline-draft{background:#fff3cd;padding:8px;border-radius:8px;margin:10px 0}
        .muted{color:var(--muted)}
        table{width:100%;border-collapse:collapse}
        th,td{padding:8px;border-bottom:1px solid rgba(0,0,0,0.04);text-align:left}
        .hidden{display:none}
        .file-list div{padding:8px;border-radius:8px;border:1px dashed rgba(0,0,0,0.06);margin-bottom:6px}
        .textarea{width:100%;min-height:100px;padding:8px;border-radius:8px;border:1px solid rgba(0,0,0,0.06)}
        .small-pill{font-size:12px;padding:4px 6px;border-radius:8px;background:rgba(0,0,0,0.04)}
        .row{display:flex;gap:8px;align-items:center}
        @media (max-width:1100px){.layout{grid-template-columns:1fr}.right-col{display:none}}
      `}</style>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 4vw', background: 'rgba(44, 62, 80, 0.7)', borderRadius: '0 0 24px 24px', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#fff', letterSpacing: 1 }}>
          <FaHeartbeat style={{ marginRight: 8, color: '#f6ad55' }} /> AFYALINK
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#patientList" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Patients</a>
          <a href="#tasks" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Tasks</a>
          <a href="#messages" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Messages</a>
          <a href="#analytics" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Analytics</a>
          <a href="#referrals" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Referrals</a>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#fff' }}>
          <span className="small">{user.role === 'nurse' ? `Nurse ${user.fullName || 'Specialist'}` : 'Nurse'}</span>
          <button className="btn" onClick={signOut} style={{background: '#f6ad55', color: '#2a4365'}}>Sign Out</button>
          <button className="btn" onClick={switchLanguage} id="langSwitch" style={{background: '#f6ad55', color: '#2a4365'}}>{currentLang.toUpperCase()}</button>
        </div>
      </nav>
      <div className="wrap">

        <div className="layout">
          <nav className="card" aria-label="Navigation & filters">
            <h3 style={{marginTop:0}}>{lang.filters}</h3>
            <div style={{marginBottom:'8px'}}>
              <label className="small" htmlFor="filterPriority">{lang.priority}</label>
              <select id="filterPriority" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={{width:'100%',padding:'8px',borderRadius:'6px'}}>
                <option value="all">All</option>
                <option value="critical">Critical</option>
                <option value="stable">Stable</option>
              </select>
            </div>
            <div style={{marginBottom:'8px'}}>
              <label className="small" htmlFor="filterStatus">{lang.status}</label>
              <select id="filterStatus" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{width:'100%',padding:'8px',borderRadius:'6px'}}>
                <option value="all">All</option>
                <option>Admitted</option>
                <option>Monitoring</option>
                <option>Discharged</option>
              </select>
            </div>
            <div style={{marginBottom:'8px'}}>
              <label className="small" htmlFor="filterWard">{lang.ward}</label>
              <input id="filterWard" placeholder="Ward name" value={filterWard} onChange={(e) => setFilterWard(e.target.value)} style={{width:'100%',padding:'8px',borderRadius:'6px'}} />
            </div>
            <div style={{marginBottom:'8px'}}>
              <label className="small" htmlFor="filterDept">{lang.dept}</label>
              <select id="filterDept" value={filterDept} onChange={(e) => setFilterDept(e.target.value)} style={{width:'100%',padding:'8px',borderRadius:'6px'}}>
                <option value="all">All</option>
                <option>Nursing</option>
                <option>ICU</option>
              </select>
            </div>
            <div style={{marginTop:'12px'}}><button className="btn" onClick={refreshPatients}>{lang.refresh}</button></div>

            <hr style={{margin:'12px 0'}} />
            <h4 style={{margin:0}}>{lang.quickActions}</h4>
            <div style={{marginTop:'8px'}}><button className="btn primary" onClick={assignRounds}>{lang.assignRounds}</button></div>
            <div style={{marginTop:'12px'}}><button className="btn" onClick={openCalendar}>{lang.openCalendar}</button></div>
          </nav>

          <main>
            <section className="card panel" id="patientList">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h2 style={{margin:0}}>{lang.patientList}</h2>
                <div className="small">{lang.patientsUnderCare}</div>
              </div>
              <div style={{marginTop:'12px'}}>
                {patientItems}
              </div>
            </section>

            {currentPatient && (
              <section className="card panel" ref={patientViewerRef}>
                {patientViewerContent}
              </section>
            )}

            <section className="card panel">
              <h3 style={{margin:0}}>{lang.notesActivity}</h3>
              <div className="small" style={{marginTop:'6px'}}>{lang.recentCare}</div>
              <div style={{marginTop:'8px'}} ref={activityLogRef}>
                {renderedActivity}
              </div>
            </section>
          </main>

          <aside className="card right-col">
            <h3 style={{marginTop:0}} id="tasks">{lang.tasks}</h3>
            <ul className="small" ref={taskListRef}>
              {renderedTasks}
            </ul>
            <div style={{marginTop:'8px'}} className="row">
              <input id="taskInput" placeholder="New task" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} style={{flex:1,padding:'8px',borderRadius:'6px',border:'1px solid rgba(0,0,0,0.06)'}} />
              <button className="btn" onClick={addTask}>{lang.addTask}</button>
            </div>

            <hr style={{margin:'12px 0'}} />
            <h3 style={{margin:0}}>{lang.calendar}</h3>
            <div id="calendarToday" className="small" style={{marginTop:'8px'}}>09:00 - Rounds • 11:00 - Med admin • 14:00 - Patient check</div>

            <hr style={{margin:'12px 0'}} />
            <h3 style={{margin:0}} id="messages">{lang.messages} <span className="notification-badge" id="msgBadge">2</span></h3>
            <div ref={msgListRef} style={{marginTop:'8px',maxHeight:'200px',overflow:'auto'}}>
              {renderedMessages}
            </div>
            <div style={{marginTop:'8px'}}><button className="btn" onClick={() => navigate('/chat')}>{lang.openChat}</button></div>

            <hr style={{margin:'12px 0'}} />
            <h3 style={{margin:0}} id="analytics">{lang.analytics}</h3>
            <div className="small" style={{marginTop:'6px'}}>{lang.statMonitored}<strong>{monitored}</strong></div>
            <div className="small">{lang.statVitals}<strong>{vitalsCount}</strong></div>
            <div className="small">{lang.statReferrals}<strong>{pendingReferrals}</strong></div>
            <div style={{marginTop:'8px'}}><button className="btn" onClick={exportReport}>{lang.exportReport}</button></div>

            <hr style={{margin:'12px 0'}} />
            <h3 style={{margin:0}} id="referrals">{lang.referrals}</h3>
            <div ref={referralsListRef} className="small" style={{marginTop:'8px'}}>
              {renderedReferrals}
            </div>

            <hr style={{margin:'12px 0'}} />
            <h3 style={{margin:0}}>{lang.offlineDrafts}</h3>
            <div ref={offlineDraftsRef} className="small" style={{marginTop:'8px'}}>
              {renderedOfflineDrafts}
            </div>
          </aside>
        </div>
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
    </>
  );
};

export default NurseDashboard;