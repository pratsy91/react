import { useState } from 'react';

function ServerSentEvents() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Server-Sent Events</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Server-Sent Events (SSE)</h3>
        <p className="text-blue-800 mb-2">
          Server-Sent Events (SSE) is a web standard that enables servers to push data to clients over HTTP. Unlike WebSockets 
          which are bidirectional, SSE is unidirectional - the server sends data to the client, but the client cannot send data 
          back through the same connection. SSE is simpler than WebSockets and perfect for one-way data streaming scenarios.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Unidirectional:</strong> Server to client only (one-way)</li>
            <li><strong>HTTP-based:</strong> Works over standard HTTP connections</li>
            <li><strong>Automatic Reconnection:</strong> Browser automatically reconnects on disconnect</li>
            <li><strong>Event Types:</strong> Support for different event types</li>
            <li><strong>Simple API:</strong> Easy to use with EventSource API</li>
            <li><strong>Text-based:</strong> Sends text data (JSON can be parsed)</li>
          </ul>
          <p className="mt-2"><strong>Use Cases:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Live notifications and updates</li>
            <li>Real-time dashboards</li>
            <li>Live feeds and streams</li>
            <li>Progress updates</li>
            <li>Chat applications (one-way)</li>
            <li>Any scenario needing server-to-client streaming</li>
          </ul>
          <p className="mt-2"><strong>SSE vs WebSockets:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>SSE:</strong> Unidirectional, HTTP-based, simpler, automatic reconnection</li>
            <li><strong>WebSockets:</strong> Bidirectional, TCP-based, more complex, manual reconnection</li>
            <li><strong>SSE:</strong> Better for server-to-client streaming</li>
            <li><strong>WebSockets:</strong> Better for interactive, bidirectional communication</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">EventSource API</h3>
        <p className="text-gray-700 mb-4">
          Use EventSource API for server-to-client streaming.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Basic EventSource
const eventSource = new EventSource('/api/events');

// Listen to messages
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

// Listen to specific events
eventSource.addEventListener('update', (event) => {
  const data = JSON.parse(event.data);
  console.log('Update:', data);
});

// Connection events
eventSource.onopen = () => {
  console.log('Connection opened');
};

eventSource.onerror = (error) => {
  console.error('Error:', error);
  // EventSource automatically reconnects
};

// Close connection
eventSource.close();

// React hook
import { useEffect, useState } from 'react';

function useEventSource(url) {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const eventSource = new EventSource(url);
    
    eventSource.onopen = () => {
      setConnected(true);
      setError(null);
    };
    
    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
      } catch (e) {
        setData(event.data);
      }
    };
    
    eventSource.onerror = (err) => {
      setError(err);
      setConnected(false);
    };
    
    return () => {
      eventSource.close();
    };
  }, [url]);
  
  return { data, connected, error };
}

// Usage
function LiveUpdates() {
  const { data, connected } = useEventSource('/api/events');
  
  return (
    <div>
      <div>Status: {connected ? 'Connected' : 'Disconnected'}</div>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
}

// Multiple event types
function useEventSourceEvents(url) {
  const [events, setEvents] = useState({});
  
  useEffect(() => {
    const eventSource = new EventSource(url);
    
    eventSource.addEventListener('message', (event) => {
      setEvents(prev => ({
        ...prev,
        message: JSON.parse(event.data)
      }));
    });
    
    eventSource.addEventListener('update', (event) => {
      setEvents(prev => ({
        ...prev,
        update: JSON.parse(event.data)
      }));
    });
    
    eventSource.addEventListener('error', (event) => {
      setEvents(prev => ({
        ...prev,
        error: JSON.parse(event.data)
      }));
    });
    
    return () => {
      eventSource.close();
    };
  }, [url]);
  
  return events;
}

// With credentials
const eventSource = new EventSource('/api/events', {
  withCredentials: true
});

// Custom headers (not supported by EventSource)
// Use fetch with ReadableStream instead`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Live Updates</h3>
        <p className="text-gray-700 mb-4">
          Implement live updates using Server-Sent Events.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Live data stream
function useLiveData(url) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const eventSource = new EventSource(url);
    
    eventSource.onmessage = (event) => {
      const newItem = JSON.parse(event.data);
      setData(prev => [...prev, newItem]);
    };
    
    return () => {
      eventSource.close();
    };
  }, [url]);
  
  return data;
}

// Live updates with replace
function useLiveUpdates(url) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const eventSource = new EventSource(url);
    
    eventSource.addEventListener('update', (event) => {
      const updated = JSON.parse(event.data);
      setData(updated);
    });
    
    return () => {
      eventSource.close();
    };
  }, [url]);
  
  return data;
}

// Live list updates
function useLiveList(url) {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const eventSource = new EventSource(url);
    
    eventSource.addEventListener('add', (event) => {
      const item = JSON.parse(event.data);
      setItems(prev => [...prev, item]);
    });
    
    eventSource.addEventListener('update', (event) => {
      const item = JSON.parse(event.data);
      setItems(prev => prev.map(i => i.id === item.id ? item : i));
    });
    
    eventSource.addEventListener('remove', (event) => {
      const { id } = JSON.parse(event.data);
      setItems(prev => prev.filter(i => i.id !== id));
    });
    
    return () => {
      eventSource.close();
    };
  }, [url]);
  
  return items;
}

// Progress updates
function useProgress(url) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const eventSource = new EventSource(url);
    
    eventSource.addEventListener('progress', (event) => {
      const { value } = JSON.parse(event.data);
      setProgress(value);
    });
    
    eventSource.addEventListener('complete', () => {
      setProgress(100);
      eventSource.close();
    });
    
    return () => {
      eventSource.close();
    };
  }, [url]);
  
  return progress;
}

// Notification stream
function useNotifications(url) {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const eventSource = new EventSource(url);
    
    eventSource.addEventListener('notification', (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...prev]);
    });
    
    return () => {
      eventSource.close();
    };
  }, [url]);
  
  return notifications;
}

// Reconnection handling
function useEventSourceWithReconnect(url) {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    let eventSource;
    let reconnectTimeout;
    
    const connect = () => {
      eventSource = new EventSource(url);
      
      eventSource.onopen = () => {
        setConnected(true);
      };
      
      eventSource.onmessage = (event) => {
        setData(JSON.parse(event.data));
      };
      
      eventSource.onerror = () => {
        setConnected(false);
        eventSource.close();
        
        // Reconnect after delay
        reconnectTimeout = setTimeout(() => {
          connect();
        }, 3000);
      };
    };
    
    connect();
    
    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [url]);
  
  return { data, connected };
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ServerSentEvents;

