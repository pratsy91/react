import { Component, useState } from 'react';

// Error Boundary Class Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // Example: Send to error reporting service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-300 rounded">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Something went wrong
          </h2>
          <details className="text-sm text-red-700">
            <summary className="cursor-pointer">Error details</summary>
            <pre className="mt-2 text-xs overflow-auto">
              {this.state.error && this.state.error.toString()}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Component that throws an error
function BuggyComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('I crashed!');
  }
  return <div className="p-4 bg-green-50 rounded">Component working fine!</div>;
}

// Component with async error (won't be caught by boundary)
function AsyncErrorComponent() {
  const handleAsyncError = () => {
    setTimeout(() => {
      throw new Error('Async error - not caught by boundary!');
    }, 1000);
  };

  return (
    <button
      onClick={handleAsyncError}
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Trigger Async Error (Not Caught)
    </button>
  );
}

function ErrorBoundaries() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Error Boundaries</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">getDerivedStateFromError</h3>
        <p className="text-gray-700 mb-4">
          This lifecycle method is called during render phase to update state for fallback UI.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ErrorBoundary>
            <BuggyComponent shouldThrow={shouldThrow} />
          </ErrorBoundary>
          <button
            onClick={() => setShouldThrow(!shouldThrow)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {shouldThrow ? 'Fix Component' : 'Break Component'}
          </button>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`static getDerivedStateFromError(error) {
  // Update state to show fallback UI
  return { hasError: true };
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">componentDidCatch (Class-Based)</h3>
        <p className="text-gray-700 mb-4">
          This lifecycle method is called after an error is thrown, perfect for logging.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`componentDidCatch(error, errorInfo) {
  // Log error to service
  logErrorToService(error, errorInfo);
  
  // Update state with error details
  this.setState({
    error,
    errorInfo
  });
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Boundary Placement</h3>
        <p className="text-gray-700 mb-4">
          Place error boundaries strategically to catch errors in specific parts of your app.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ErrorBoundaryPlacementExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Fallback UI</h3>
        <p className="text-gray-700 mb-4">
          Provide a custom fallback UI to show when an error occurs.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ErrorBoundary
            fallback={
              <div className="p-4 bg-purple-50 border border-purple-300 rounded">
                <h3 className="font-semibold text-purple-800">Custom Fallback UI</h3>
                <p className="text-sm text-purple-700">This is a custom error message!</p>
              </div>
            }
          >
            <BuggyComponent shouldThrow={true} />
          </ErrorBoundary>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Reporting</h3>
        <p className="text-gray-700 mb-4">
          Use componentDidCatch to send errors to logging services.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`componentDidCatch(error, errorInfo) {
  // Send to error reporting service
  logErrorToService(error, errorInfo);
  
  // Examples:
  // - Sentry.captureException(error)
  // - LogRocket.captureException(error)
  // - Custom API call
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">React 18+ Error Handling Improvements</h3>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 ml-4">
            <li><strong>Automatic error recovery:</strong> React 18 can recover from some errors automatically</li>
            <li><strong>Better error messages:</strong> More descriptive error information</li>
            <li><strong>Error boundaries in more places:</strong> Better coverage of error scenarios</li>
            <li><strong>Concurrent rendering:</strong> Errors in one part don't crash the whole app</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">What Error Boundaries DON'T Catch</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-800 mb-2">
            <strong>Error boundaries do NOT catch:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 ml-4">
            <li>Errors in event handlers (use try-catch)</li>
            <li>Errors in async code (use try-catch)</li>
            <li>Errors during server-side rendering</li>
            <li>Errors in the error boundary itself</li>
          </ul>
          <div className="mt-4">
            <AsyncErrorComponent />
            <p className="text-xs text-yellow-700 mt-2">
              Click the button above - async errors are not caught by boundaries
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Error Boundary Placement Example
function ErrorBoundaryPlacementExample() {
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);

  return (
    <div className="p-4 bg-white rounded space-y-4">
      <div>
        <p className="text-sm font-semibold mb-2">Strategy 1: Top-level boundary</p>
        <ErrorBoundary>
          <div className="p-2 bg-gray-50 rounded">
            <BuggyComponent shouldThrow={error1} />
            <button
              onClick={() => setError1(!error1)}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Toggle Error
            </button>
          </div>
        </ErrorBoundary>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Strategy 2: Granular boundaries</p>
        <div className="grid grid-cols-2 gap-4">
          <ErrorBoundary>
            <div className="p-2 bg-blue-50 rounded">
              <BuggyComponent shouldThrow={error1} />
            </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <div className="p-2 bg-green-50 rounded">
              <BuggyComponent shouldThrow={error2} />
            </div>
          </ErrorBoundary>
        </div>
        <div className="mt-2 space-x-2">
          <button
            onClick={() => setError1(!error1)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Error 1
          </button>
          <button
            onClick={() => setError2(!error2)}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
          >
            Error 2
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundaries;

