import { useState, useEffect, useRef } from 'react';

function NativeFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(1);
  const abortControllerRef = useRef(null);

  // Basic fetch with useEffect
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = { id: userId, name: `User ${userId}`, email: `user${userId}@example.com` };
        
        if (!cancelled) {
          setData(mockData);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Fetch with AbortController
  const fetchWithAbort = async () => {
    // Abort previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/${userId}`, {
        signal: abortControllerRef.current.signal
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Native Fetch</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding the Fetch API</h3>
        <p className="text-blue-800 mb-2">
          The Fetch API is a modern JavaScript interface for making HTTP requests. It's built into browsers and provides a 
          Promise-based API that's cleaner and more powerful than the older XMLHttpRequest. When used with React's useEffect, 
          it enables data fetching in function components.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Promise-based:</strong> Returns a Promise, making async/await easy to use</li>
            <li><strong>Streaming:</strong> Supports request and response streaming</li>
            <li><strong>CORS:</strong> Handles CORS properly (unlike some XMLHttpRequest setups)</li>
            <li><strong>AbortController:</strong> Can cancel requests to prevent race conditions</li>
            <li><strong>Cleanup:</strong> Need to handle cleanup in useEffect to prevent memory leaks</li>
          </ul>
          <p className="mt-2"><strong>Common Patterns:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Fetching data on component mount</li>
            <li>Fetching when dependencies change</li>
            <li>Handling loading and error states</li>
            <li>Canceling requests to prevent race conditions</li>
            <li>Error handling and retry logic</li>
          </ul>
          <p className="mt-2"><strong>Best Practices:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Always handle errors (try-catch or .catch())</li>
            <li>Clean up requests in useEffect cleanup function</li>
            <li>Check if component is still mounted before setting state</li>
            <li>Use AbortController for cancelable requests</li>
            <li>Handle loading states for better UX</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Fetch API with useEffect</h3>
        <p className="text-gray-700 mb-4">
          Use the native Fetch API with useEffect to fetch data when components mount or dependencies change.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-semibold">User ID:</label>
              <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
                min="1"
                className="w-20 px-2 py-1 border rounded"
              />
            </div>
            {loading && <p className="text-blue-600">Loading...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}
            {data && !loading && (
              <div className="p-3 bg-green-50 rounded">
                <p className="text-sm"><strong>Name:</strong> {data.name}</p>
                <p className="text-sm"><strong>Email:</strong> {data.email}</p>
              </div>
            )}
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`useEffect(() => {
  let cancelled = false;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      
      if (!cancelled) {
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      if (!cancelled) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  fetchData();

  return () => {
    cancelled = true; // Cleanup
  };
}, [userId]);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Abort Controllers</h3>
        <p className="text-gray-700 mb-4">
          AbortController allows you to cancel fetch requests to prevent race conditions.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <button
              onClick={fetchWithAbort}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Fetch with AbortController
            </button>
            <button
              onClick={() => {
                if (abortControllerRef.current) {
                  abortControllerRef.current.abort();
                  setLoading(false);
                }
              }}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Abort Request
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const abortControllerRef = useRef(null);

const fetchData = async () => {
  // Abort previous request
  if (abortControllerRef.current) {
    abortControllerRef.current.abort();
  }

  abortControllerRef.current = new AbortController();

  try {
    const response = await fetch('/api/data', {
      signal: abortControllerRef.current.signal
    });
    const data = await response.json();
    setData(data);
  } catch (error) {
    if (error.name !== 'AbortError') {
      // Handle real error
      setError(error.message);
    }
    // AbortError is expected when cancelling
  }
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Handling</h3>
        <p className="text-gray-700 mb-4">
          Proper error handling is crucial for a good user experience.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ErrorHandlingExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`async function fetchData() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request aborted');
      return null;
    }
    
    // Network error
    if (error.message === 'Failed to fetch') {
      setError('Network error. Please check your connection.');
      return null;
    }
    
    // Other errors
    setError(error.message);
    throw error;
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Loading States</h3>
        <p className="text-gray-700 mb-4">
          Provide visual feedback during data fetching.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <LoadingStatesExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <DataDisplay data={data} />;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Caching Strategies</h3>
        <p className="text-gray-700 mb-4">
          Implement caching to avoid unnecessary API calls.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <CachingExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// Simple cache with Map
const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) {
    const { data, timestamp } = cache.get(url);
    // Cache valid for 5 minutes
    if (Date.now() - timestamp < 5 * 60 * 1000) {
      return data;
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

// With React state
const [cache, setCache] = useState(new Map());

function useCachedFetch(url) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (cache.has(url)) {
      setData(cache.get(url));
      return;
    }
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCache(prev => new Map(prev).set(url, data));
        setData(data);
      });
  }, [url]);
}`}</pre>
        </div>
      </section>
    </div>
  );
}

// Error Handling Example
function ErrorHandlingExample() {
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState('network');

  const simulateError = async () => {
    setError(null);
    
    try {
      if (errorType === 'network') {
        throw new Error('Failed to fetch');
      } else if (errorType === 'http') {
        throw new Error('HTTP error! status: 404');
      } else {
        throw new Error('Unknown error occurred');
      }
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setError({ type: 'network', message: 'Network error. Please check your connection.' });
      } else if (err.message.includes('HTTP error')) {
        setError({ type: 'http', message: 'Resource not found (404)' });
      } else {
        setError({ type: 'unknown', message: err.message });
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded">
      <div className="mb-4">
        <select
          value={errorType}
          onChange={(e) => setErrorType(e.target.value)}
          className="px-3 py-2 border rounded mb-2"
        >
          <option value="network">Network Error</option>
          <option value="http">HTTP Error</option>
          <option value="unknown">Unknown Error</option>
        </select>
        <button
          onClick={simulateError}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Simulate Error
        </button>
      </div>
      {error && (
        <div className={`p-3 rounded ${
          error.type === 'network' ? 'bg-red-50 text-red-800' :
          error.type === 'http' ? 'bg-yellow-50 text-yellow-800' :
          'bg-gray-50 text-gray-800'
        }`}>
          <p className="text-sm font-semibold">{error.type.toUpperCase()} Error</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}
    </div>
  );
}

// Loading States Example
function LoadingStatesExample() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setData(null);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setData({ message: 'Data loaded successfully!' });
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded">
      <button
        onClick={fetchData}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {loading && (
        <div className="mt-4 flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-sm text-gray-600">Loading data...</p>
        </div>
      )}
      {data && !loading && (
        <div className="mt-4 p-3 bg-green-50 rounded">
          <p className="text-sm text-green-800">{data.message}</p>
        </div>
      )}
    </div>
  );
}

// Caching Example
function CachingExample() {
  const [cache, setCache] = useState(new Map());
  const [data, setData] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  const fetchWithCache = async (url) => {
    // Check cache
    if (cache.has(url)) {
      const cached = cache.get(url);
      if (Date.now() - cached.timestamp < 5000) { // 5 second cache
        setData(cached.data);
        setFromCache(true);
        return;
      }
    }

    // Fetch new data
    setFromCache(false);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newData = { url, timestamp: Date.now() };
    
    setCache(prev => new Map(prev).set(url, { data: newData, timestamp: Date.now() }));
    setData(newData);
  };

  return (
    <div className="p-4 bg-white rounded">
      <button
        onClick={() => fetchWithCache('/api/data')}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Fetch Data (with cache)
      </button>
      {data && (
        <div className={`p-3 rounded ${fromCache ? 'bg-green-50' : 'bg-blue-50'}`}>
          <p className="text-sm">
            {fromCache ? '✓ From cache' : '✓ Fresh data'}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Click again within 5 seconds to see cache hit
          </p>
        </div>
      )}
    </div>
  );
}

export default NativeFetch;

