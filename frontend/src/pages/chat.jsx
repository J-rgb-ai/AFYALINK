import React, { useState, useEffect, useRef } from 'react';
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
    display: 'flex',
  },
  sidebar: {
    width: '300px',
    background: 'rgba(0,0,0,0.5)',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(12,20,30,0.06)',
    overflowY: 'auto',
    color: '#fff',
    marginRight: '18px',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '12px',
    padding: '12px',
    color: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
    background: 'rgba(0,0,0,0.3)',
    padding: '12px',
    borderRadius: '8px',
  },
  btn: {
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  userList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  userItem: {
    padding: '10px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    borderRadius: '8px',
    marginBottom: '8px',
  },
  userItemActive: {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  message: {
    marginBottom: '10px',
    padding: '8px 12px',
    borderRadius: '8px',
    maxWidth: '70%',
  },
  messageSent: {
    background: '#0066cc',
    color: '#fff',
    marginLeft: 'auto',
  },
  messageReceived: {
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
  },
  inputArea: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'transparent',
    color: '#fff',
  },
  noChat: {
    textAlign: 'center',
    color: '#ccc',
    padding: '40px',
  },
  smallText: {
    color: '#ccc',
    fontSize: '13px',
  },
};

const Chat = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState(JSON.parse(localStorage.getItem('conversations') || '[]'));
  const [allUsers] = useState(JSON.parse(localStorage.getItem('users') || '[]'));
  const [currentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const messagesEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const allowedUsers = getAllowedUsers();
    if (allowedUsers.length > 0) {
      setSelectedUser(allowedUsers[0]);
      loadMessages(allowedUsers[0]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getDashboardUrl = () => {
    switch (currentUser.role) {
      case 'patient': return '/patient-dashboard';
      case 'doctor': return '/doctor-dashboard';
      case 'specialist': return '/specialist-dashboard';
      case 'admin': return '/admin-dashboard';
      case 'nurse': return '/nurse-dashboard';
      case 'secretary': return '/secretary-dashboard';
      case 'surgeon': return '/surgeon-dashboard';
      case 'account_clerk': return '/account-clerk-dashboard';
      case 'referral_manager': return '/referral-manager-dashboard';
      case 'labtech': return '/labtech-dashboard';
      default: return '/login';
    }
  };

  const getAllowedUsers = () => {
    if (currentUser.role === 'patient') {
      return allUsers.filter(u => ['doctor', 'referral_manager', 'nurse'].includes(u.role));
    } else if (currentUser.role === 'doctor') {
      return allUsers.filter(u => ['patient', 'referral_manager', 'nurse', 'labtech'].includes(u.role));
    } else if (currentUser.role === 'referral_manager') {
      return allUsers.filter(u => ['doctor', 'patient'].includes(u.role));
    } else if (currentUser.role === 'nurse') {
      return allUsers.filter(u => ['doctor', 'patient'].includes(u.role));
    } else if (currentUser.role === 'labtech') {
      return allUsers.filter(u => u.role === 'doctor');
    }
    return [];
  };

  const getConversationId = (user1, user2) => {
    const ids = [user1.email, user2.email].sort().join('-');
    return ids;
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    loadMessages(user);
  };

  const loadMessages = (user) => {
    const convId = getConversationId(currentUser, user);
    const conv = conversations.find(c => c.id === convId) || { id: convId, messages: [] };
    setMessages(conv.messages.map(msg => ({
      ...msg,
      isSent: msg.sender === currentUser.email,
      senderName: msg.sender === currentUser.email ? 'You' : user.fullName,
    })));
    // Save back to storage if new conv
    if (!conversations.find(c => c.id === convId)) {
      const newConversations = [...conversations, conv];
      setConversations(newConversations);
      localStorage.setItem('conversations', JSON.stringify(newConversations));
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;
    const convId = getConversationId(currentUser, selectedUser);
    let conv = conversations.find(c => c.id === convId) || { id: convId, messages: [] };
    const newMsg = {
      sender: currentUser.email,
      text: newMessage.trim(),
      timestamp: Date.now(),
    };
    conv.messages.push(newMsg);
    const newConversations = conversations.filter(c => c.id !== convId);
    newConversations.push(conv);
    setConversations(newConversations);
    localStorage.setItem('conversations', JSON.stringify(newConversations));
    setNewMessage('');
    loadMessages(selectedUser);
  };

  const allowedUsers = getAllowedUsers();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={styles.root}>
      <nav style={styles.sidebar}>
        <div style={styles.header}>
          <h3>Inbox</h3>
          <button style={styles.btn} onClick={() => navigate(getDashboardUrl())}>Back</button>
        </div>
        <ul style={styles.userList}>
          {allowedUsers.length === 0 ? (
            <li style={styles.noChat}>No conversations yet. Start a new chat.</li>
          ) : (
            allowedUsers.map(user => (
              <li
                key={user.email}
                style={{
                  ...styles.userItem,
                  ...(selectedUser && selectedUser.email === user.email ? styles.userItemActive : {}),
                }}
                onClick={() => selectUser(user)}
              >
                <strong>{user.fullName}</strong>
                {user.uniqueId && <div style={styles.smallText}>({user.uniqueId})</div>}
              </li>
            ))
          )}
        </ul>
      </nav>
      <main style={styles.main}>
        <div style={styles.header}>
          <h2>{selectedUser ? `${selectedUser.fullName}${selectedUser.uniqueId ? ` (${selectedUser.uniqueId})` : ''}` : 'Select a user to start chatting'}</h2>
        </div>
        <div style={styles.messages}>
          {messages.length === 0 ? (
            <div style={styles.noChat}>No messages yet. Start the conversation!</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.isSent ? styles.messageSent : styles.messageReceived),
                }}
              >
                <strong>{msg.senderName}:</strong> {msg.text}
                <div style={styles.smallText}>{new Date(msg.timestamp).toLocaleString()}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        {selectedUser && (
          <div style={styles.inputArea}>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
            />
            <button style={styles.btn} onClick={sendMessage}>Send</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;
