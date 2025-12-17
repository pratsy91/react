import { useState } from 'react';

function WebSockets() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">WebSockets</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Socket.io Integration</h3>
        <p className="text-gray-700 mb-4">
          Use Socket.io for real-time bidirectional communication.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install socket.io-client

// Basic connection
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// Connection events
socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});

// Emit events
socket.emit('message', { text: 'Hello' });

// Listen to events
socket.on('message', (data) => {
  console.log('Received:', data);
});

// React hook
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function useSocket(url) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    const newSocket = io(url);
    
    newSocket.on('connect', () => {
      setConnected(true);
    });
    
    newSocket.on('disconnect', () => {
      setConnected(false);
    });
    
    setSocket(newSocket);
    
    return () => {
      newSocket.close();
    };
  }, [url]);
  
  return { socket, connected };
}

// Usage
function Chat() {
  const { socket, connected } = useSocket('http://localhost:3000');
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    if (!socket) return;
    
    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    return () => {
      socket.off('message');
    };
  }, [socket]);
  
  const sendMessage = (text) => {
    socket.emit('message', { text });
  };
  
  return (
    <div>
      <div>Status: {connected ? 'Connected' : 'Disconnected'}</div>
      {messages.map((msg, i) => (
        <div key={i}>{msg.text}</div>
      ))}
    </div>
  );
}

// Rooms
socket.emit('join-room', 'room1');
socket.on('room-message', (data) => {
  console.log('Room message:', data);
});

// Namespaces
const adminSocket = io('http://localhost:3000/admin');
const userSocket = io('http://localhost:3000/user');`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Real-time Updates</h3>
        <p className="text-gray-700 mb-4">
          Implement real-time updates in your React app.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Real-time data updates
function useRealtimeData(socket, eventName) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (!socket) return;
    
    socket.on(eventName, (newData) => {
      setData(newData);
    });
    
    return () => {
      socket.off(eventName);
    };
  }, [socket, eventName]);
  
  return data;
}

// Real-time list updates
function useRealtimeList(socket, eventName) {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    if (!socket) return;
    
    socket.on(\`\${eventName}:add\`, (item) => {
      setItems(prev => [...prev, item]);
    });
    
    socket.on(\`\${eventName}:update\`, (item) => {
      setItems(prev => prev.map(i => i.id === item.id ? item : i));
    });
    
    socket.on(\`\${eventName}:remove\`, (id) => {
      setItems(prev => prev.filter(i => i.id !== id));
    });
    
    return () => {
      socket.off(\`\${eventName}:add\`);
      socket.off(\`\${eventName}:update\`);
      socket.off(\`\${eventName}:remove\`);
    };
  }, [socket, eventName]);
  
  return items;
}

// Typing indicators
function useTypingIndicator(socket, roomId) {
  const [typingUsers, setTypingUsers] = useState([]);
  
  useEffect(() => {
    if (!socket) return;
    
    socket.on('user-typing', ({ userId, username }) => {
      setTypingUsers(prev => {
        if (!prev.find(u => u.id === userId)) {
          return [...prev, { id: userId, username }];
        }
        return prev;
      });
      
      setTimeout(() => {
        setTypingUsers(prev => prev.filter(u => u.id !== userId));
      }, 3000);
    });
    
    return () => {
      socket.off('user-typing');
    };
  }, [socket, roomId]);
  
  const startTyping = () => {
    socket.emit('typing', { roomId });
  };
  
  return { typingUsers, startTyping };
}

// Presence
function usePresence(socket) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    if (!socket) return;
    
    socket.on('user-joined', (user) => {
      setUsers(prev => [...prev, user]);
    });
    
    socket.on('user-left', (userId) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    });
    
    socket.on('users-list', (usersList) => {
      setUsers(usersList);
    });
    
    return () => {
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('users-list');
    };
  }, [socket]);
  
  return users;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Reconnection Handling</h3>
        <p className="text-gray-700 mb-4">
          Handle reconnections gracefully.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Automatic reconnection
const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
});

// Reconnection events
socket.on('reconnect', (attemptNumber) => {
  console.log('Reconnected after', attemptNumber, 'attempts');
});

socket.on('reconnect_attempt', (attemptNumber) => {
  console.log('Reconnection attempt', attemptNumber);
});

socket.on('reconnect_error', (error) => {
  console.log('Reconnection error:', error);
});

socket.on('reconnect_failed', () => {
  console.log('Reconnection failed');
});

// Manual reconnection
function useSocketWithReconnect(url) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  
  useEffect(() => {
    const newSocket = io(url, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    
    newSocket.on('connect', () => {
      setConnected(true);
      setReconnecting(false);
    });
    
    newSocket.on('disconnect', () => {
      setConnected(false);
    });
    
    newSocket.on('reconnect_attempt', () => {
      setReconnecting(true);
    });
    
    newSocket.on('reconnect_failed', () => {
      setReconnecting(false);
      // Show error to user
    });
    
    setSocket(newSocket);
    
    return () => {
      newSocket.close();
    };
  }, [url]);
  
  const reconnect = () => {
    if (socket) {
      socket.connect();
    }
  };
  
  return { socket, connected, reconnecting, reconnect };
}

// Queue messages while disconnected
function useQueuedSocket(url) {
  const [socket, setSocket] = useState(null);
  const messageQueue = useRef([]);
  
  useEffect(() => {
    const newSocket = io(url);
    
    newSocket.on('connect', () => {
      // Send queued messages
      while (messageQueue.current.length > 0) {
        const { event, data } = messageQueue.current.shift();
        newSocket.emit(event, data);
      }
    });
    
    setSocket(newSocket);
    
    return () => {
      newSocket.close();
    };
  }, [url]);
  
  const emit = (event, data) => {
    if (socket?.connected) {
      socket.emit(event, data);
    } else {
      messageQueue.current.push({ event, data });
    }
  };
  
  return { socket, emit };
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default WebSockets;

