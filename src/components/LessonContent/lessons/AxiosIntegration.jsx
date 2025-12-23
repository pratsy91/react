import { useState, useEffect } from 'react';

// Simulated Axios API (since we can't install it)
function createAxiosInstance() {
  const interceptors = {
    request: [],
    response: []
  };

  const axios = {
    get: async (url, config) => {
      // Simulate request interceptor
      let requestConfig = { ...config, url };
      for (const interceptor of interceptors.request) {
        requestConfig = await interceptor(requestConfig);
      }

      // Simulate fetch
      const response = await fetch(url);
      let responseData = { data: await response.json(), status: response.status };

      // Simulate response interceptor
      for (const interceptor of interceptors.response) {
        responseData = await interceptor(responseData);
      }

      return responseData;
    },
    post: async (url, data, config) => {
      // Similar implementation for POST
      return { data: { success: true, ...data }, status: 201 };
    },
    interceptors: {
      request: {
        use: (fulfilled, rejected) => {
          interceptors.request.push(fulfilled);
        }
      },
      response: {
        use: (fulfilled, rejected) => {
          interceptors.response.push(fulfilled);
        }
      }
    }
  };

  return axios;
}

function AxiosIntegration() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Axios Integration</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Axios</h3>
        <p className="text-blue-800 mb-2">
          Axios is a popular, promise-based HTTP client for JavaScript. It provides a simple, clean API for making HTTP requests 
          with features like request/response interceptors, automatic JSON transformation, request cancellation, and better error 
          handling compared to the native Fetch API. It works in both browser and Node.js environments.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Promise-based:</strong> Clean async/await syntax</li>
            <li><strong>Interceptors:</strong> Transform requests/responses globally</li>
            <li><strong>Automatic JSON:</strong> Automatically transforms JSON data</li>
            <li><strong>Request Cancellation:</strong> Cancel requests with CancelToken</li>
            <li><strong>Error Handling:</strong> Better error handling than Fetch</li>
            <li><strong>Request/Response Transformation:</strong> Transform data automatically</li>
          </ul>
          <p className="mt-2"><strong>Benefits Over Fetch:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Automatic JSON transformation</li>
            <li>Request/response interceptors</li>
            <li>Better error handling</li>
            <li>Request cancellation support</li>
            <li>Automatic request body serialization</li>
            <li>More convenient API</li>
          </ul>
          <p className="mt-2"><strong>When to Use Axios:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>When you need interceptors for auth tokens, error handling</li>
            <li>For applications with many API calls</li>
            <li>When you need request cancellation</li>
            <li>For better error handling than Fetch</li>
            <li>When you prefer a more feature-rich HTTP client</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Interceptors</h3>
        <p className="text-gray-700 mb-4">
          Axios interceptors allow you to transform requests and responses globally.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import axios from 'axios';

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    
    // Add timestamp
    config.metadata = { startTime: Date.now() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    // Log response time
    const duration = Date.now() - response.config.metadata.startTime;
    console.log(\`Request took \${duration}ms\`);
    
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Request/Response Handling</h3>
        <p className="text-gray-700 mb-4">
          Axios provides a clean API for handling requests and responses.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import axios from 'axios';

// GET request
const response = await axios.get('/api/users');
console.log(response.data);
console.log(response.status);
console.log(response.headers);

// POST request
const response = await axios.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
});

// PUT request
await axios.put('/api/users/1', { name: 'Jane' });

// DELETE request
await axios.delete('/api/users/1');

// With config
const response = await axios.get('/api/users', {
  params: { page: 1, limit: 10 },
  headers: { 'X-Custom-Header': 'value' },
  timeout: 5000
});

// Error handling
try {
  const response = await axios.get('/api/users');
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('No response received');
  } else {
    // Error setting up request
    console.error('Error:', error.message);
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Hooks with Axios</h3>
        <p className="text-gray-700 mb-4">
          Create reusable hooks that use Axios for data fetching.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook for fetching data
function useAxios(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          ...options,
          cancelToken: source.token
        });
        
        if (!cancelled) {
          setData(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (!axios.isCancel(err) && !cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
      source.cancel('Component unmounted');
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data, loading, error } = useAxios(\`/api/users/\${userId}\`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{data.name}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Axios Instance</h3>
        <p className="text-gray-700 mb-4">
          Create custom Axios instances with default configuration.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import axios from 'axios';

// Create instance with defaults
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptors to instance
apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = \`Bearer \${getToken()}\`;
  return config;
});

// Use instance
const response = await apiClient.get('/users');
const response = await apiClient.post('/users', userData);

// Multiple instances
const publicApi = axios.create({
  baseURL: 'https://public-api.example.com'
});

const privateApi = axios.create({
  baseURL: 'https://private-api.example.com',
  headers: { Authorization: \`Bearer \${token}\` }
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Axios vs Fetch</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">Axios</th>
                <th className="text-left p-2">Fetch</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Browser support</td>
                <td className="p-2">All browsers</td>
                <td className="p-2">Modern browsers</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Request/Response interceptors</td>
                <td className="p-2">✓ Built-in</td>
                <td className="p-2">❌ Manual</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Automatic JSON parsing</td>
                <td className="p-2">✓ Yes</td>
                <td className="p-2">❌ Manual</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Request cancellation</td>
                <td className="p-2">✓ CancelToken</td>
                <td className="p-2">AbortController</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Progress tracking</td>
                <td className="p-2">✓ Built-in</td>
                <td className="p-2">❌ Manual</td>
              </tr>
              <tr>
                <td className="p-2">Bundle size</td>
                <td className="p-2">Larger (~13KB)</td>
                <td className="p-2">Native (0KB)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete Axios Setup</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// api/client.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Usage
import apiClient from './api/client';

const users = await apiClient.get('/users');
const user = await apiClient.post('/users', userData);
const updated = await apiClient.put(\`/users/\${id}\`, updates);
await apiClient.delete(\`/users/\${id}\`);`}</pre>
        </div>
      </section>
    </div>
  );
}

export default AxiosIntegration;

