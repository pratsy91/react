import { useState, useEffect } from 'react';

function ErrorHandlingPatterns() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Try-catch in event handlers
  const handleClick = () => {
    try {
      // Simulate error
      throw new Error('Error in event handler!');
    } catch (err) {
      console.error('Caught in event handler:', err);
      alert('Error handled: ' + err.message);
    }
  };

  // Error handling in async code
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            reject(new Error('API request failed!'));
          } else {
            resolve({ message: 'Data loaded successfully!' });
          }
        }, 1000);
      }).then(result => {
        setData(result);
        setLoading(false);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Error in useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data:', data);
      } catch (error) {
        console.error('Error in useEffect:', error);
        // Handle error (set state, show notification, etc.)
      }
    };

    // fetchData(); // Commented out to avoid actual fetch
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Error Handling Patterns</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Try-Catch in Event Handlers</h3>
        <p className="text-gray-700 mb-4">
          Use try-catch blocks in event handlers to handle errors that error boundaries don't catch.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Trigger Error (Handled with try-catch)
          </button>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`function handleClick() {
  try {
    // Code that might throw
    throw new Error('Something went wrong');
  } catch (error) {
    // Handle error
    console.error(error);
    showErrorNotification(error.message);
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Handling in Async Code</h3>
        <p className="text-gray-700 mb-4">
          Always wrap async operations in try-catch blocks.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Loading...' : 'Fetch Data (May Fail)'}
            </button>
            {data && (
              <div className="mt-2 p-3 bg-green-50 rounded">
                <p className="text-green-800">{data.message}</p>
              </div>
            )}
            {error && (
              <div className="mt-2 p-3 bg-red-50 rounded">
                <p className="text-red-800">Error: {error}</p>
              </div>
            )}
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  } catch (error) {
    setError(error.message);
    // Log to error service
    logError(error);
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Graceful Degradation</h3>
        <p className="text-gray-700 mb-4">
          Provide fallback functionality when features fail.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <GracefulDegradationExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Logging Services Integration</h3>
        <p className="text-gray-700 mb-4">
          Integrate with error logging services to track and monitor errors.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ErrorLoggingExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// Example: Sentry integration
import * as Sentry from '@sentry/react';

try {
  // Your code
} catch (error) {
  Sentry.captureException(error);
  // Show user-friendly message
}

// Example: Custom error service
async function logError(error, context) {
  await fetch('/api/errors', {
    method: 'POST',
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      context: context
    })
  });
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Handling Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Do:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Use try-catch for async operations</li>
            <li>Provide user-friendly error messages</li>
            <li>Log errors for debugging</li>
            <li>Implement graceful degradation</li>
            <li>Use error boundaries for component errors</li>
            <li>Validate input before processing</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">✗ Don't:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Swallow errors silently</li>
            <li>Show technical error messages to users</li>
            <li>Forget to handle promise rejections</li>
            <li>Rely only on error boundaries</li>
            <li>Ignore network errors</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Handling Patterns Summary</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Error Type</th>
                <th className="text-left p-2">Handling Method</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Component errors</td>
                <td className="p-2">Error Boundaries</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Event handler errors</td>
                <td className="p-2">Try-catch</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Async/await errors</td>
                <td className="p-2">Try-catch</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Promise rejections</td>
                <td className="p-2">.catch() or try-catch</td>
              </tr>
              <tr>
                <td className="p-2">Network errors</td>
                <td className="p-2">Try-catch + retry logic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Graceful Degradation Example
function GracefulDegradationExample() {
  const [featureAvailable, setFeatureAvailable] = useState(true);
  const [data, setData] = useState(null);

  const loadFeature = async () => {
    try {
      // Simulate feature that might fail
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            reject(new Error('Feature unavailable'));
          } else {
            resolve({ content: 'Advanced feature loaded!' });
          }
        }, 1000);
      }).then(result => {
        setData(result);
        setFeatureAvailable(true);
      });
    } catch (error) {
      setFeatureAvailable(false);
      // Graceful degradation - show basic version
    }
  };

  return (
    <div className="p-4 bg-white rounded">
      <button
        onClick={loadFeature}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Load Feature
      </button>
      {featureAvailable && data ? (
        <div className="p-3 bg-green-50 rounded">
          <p className="text-green-800">{data.content}</p>
        </div>
      ) : !featureAvailable ? (
        <div className="p-3 bg-yellow-50 rounded">
          <p className="text-yellow-800">
            Advanced feature unavailable. Showing basic version.
          </p>
          <button className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded text-sm">
            Use Basic Version
          </button>
        </div>
      ) : null}
    </div>
  );
}

// Error Logging Example
function ErrorLoggingExample() {
  const [errors, setErrors] = useState([]);

  const simulateError = () => {
    try {
      throw new Error('Simulated error for logging');
    } catch (error) {
      // Log to console (in real app, send to service)
      console.error('Error logged:', error);
      
      // Simulate sending to error service
      const errorLog = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      };
      
      setErrors(prev => [...prev, errorLog]);
      
      // In real app:
      // Sentry.captureException(error);
      // or
      // logErrorToService(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded">
      <button
        onClick={simulateError}
        className="px-4 py-2 bg-red-500 text-white rounded mb-4"
      >
        Simulate Error (Check Console)
      </button>
      {errors.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Logged Errors ({errors.length}):</p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {errors.map((err, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                <p className="font-semibold">{err.message}</p>
                <p className="text-gray-600">{err.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ErrorHandlingPatterns;

