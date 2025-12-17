import { useState } from 'react';

function ErrorBoundariesEnhancements() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Error Boundaries Enhancements</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Improved Error Boundaries</h3>
        <p className="text-gray-700 mb-4">
          React 19 enhances error boundaries with better features.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Improved Error Boundaries
// Better error boundary support in React 19

// Class Component Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Content />
    </ErrorBoundary>
  );
}

// Error Boundary with Recovery
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, retryCount: 0 };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  handleRetry = () => {
    this.setState({ hasError: false, error: null, retryCount: this.state.retryCount + 1 });
  };
  
  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          onRetry={this.handleRetry}
          retryCount={this.state.retryCount}
        />
      );
    }
    return <div key={this.state.retryCount}>{this.props.children}</div>;
  }
}

// Multiple Error Boundaries
function App() {
  return (
    <ErrorBoundary fallback={<AppError />}>
      <Header />
      <ErrorBoundary fallback={<ContentError />}>
        <MainContent />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Recovery</h3>
        <p className="text-gray-700 mb-4">
          Error recovery mechanisms in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Error Recovery
// Recover from errors gracefully

// Retry Mechanism
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, retryKey: 0 };
  }
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  handleRetry = () => {
    this.setState({ hasError: false, retryKey: this.state.retryKey + 1 });
  };
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong</p>
          <button onClick={this.handleRetry}>Retry</button>
        </div>
      );
    }
    return <div key={this.state.retryKey}>{this.props.children}</div>;
  }
}

// Fallback UI
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// Error Recovery with State Reset
function App() {
  const [retryKey, setRetryKey] = useState(0);
  
  return (
    <ErrorBoundary
      fallback={<ErrorFallback onReset={() => setRetryKey(k => k + 1)} />}
      resetKeys={[retryKey]}
    >
      <Content key={retryKey} />
    </ErrorBoundary>
  );
}

// Partial Recovery
// Recover only failed component
function App() {
  return (
    <div>
      <ErrorBoundary fallback={<ComponentError />}>
        <Component1 />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ComponentError />}>
        <Component2 />
      </ErrorBoundary>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Reporting</h3>
        <p className="text-gray-700 mb-4">
          Enhanced error reporting in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Error Reporting
// Better error reporting capabilities

// Error Logging
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to console
    console.error('Error:', error, errorInfo);
    
    // Log to error service
    logErrorToService(error, errorInfo);
    
    // Send to analytics
    analytics.track('error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }
  
  render() {
    // ...
  }
}

// Error Service Integration
function logErrorToService(error, errorInfo) {
  // Send to Sentry, LogRocket, etc.
  if (window.Sentry) {
    window.Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack
        }
      }
    });
  }
}

// Error Context
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    const errorContext = {
      error,
      errorInfo,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    reportError(errorContext);
  }
  
  render() {
    // ...
  }
}

// Development vs Production
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'development') {
      // Detailed error in development
      console.error('Detailed error:', error, errorInfo);
    } else {
      // Minimal logging in production
      logErrorToService(error, errorInfo);
    }
  }
  
  render() {
    // ...
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Fallback UI Patterns</h3>
        <p className="text-gray-700 mb-4">
          Patterns for fallback UI in error boundaries.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Fallback UI Patterns
// Different fallback UI patterns

// Simple Fallback
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Content />
    </ErrorBoundary>
  );
}

// Detailed Fallback
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="error-boundary">
      <h2>Oops! Something went wrong</h2>
      <details>
        <summary>Error details</summary>
        <pre>{error.message}</pre>
      </details>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// Contextual Fallback
function ComponentErrorFallback({ error, componentName }) {
  return (
    <div>
      <p>Failed to load {componentName}</p>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}

// Minimal Fallback
function MinimalFallback() {
  return <div>Error</div>;
}

// Rich Fallback
function RichFallback({ error, onRetry }) {
  return (
    <div className="error-page">
      <h1>Something went wrong</h1>
      <p>We're sorry for the inconvenience.</p>
      <button onClick={onRetry}>Try again</button>
      <button onClick={() => window.location.href = '/'}>Go home</button>
    </div>
  );
}

// Fallback with Suspense
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<Loading />}>
        <AsyncContent />
      </Suspense>
    </ErrorBoundary>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Boundary Composition</h3>
        <p className="text-gray-700 mb-4">
          Composing error boundaries effectively.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Error Boundary Composition
// Compose error boundaries for better error handling

// Nested Boundaries
function App() {
  return (
    <ErrorBoundary fallback={<AppError />}>
      <Header />
      <ErrorBoundary fallback={<ContentError />}>
        <MainContent />
      </ErrorBoundary>
      <ErrorBoundary fallback={<SidebarError />}>
        <Sidebar />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}

// Granular Boundaries
// Isolate errors to specific components
function Dashboard() {
  return (
    <div>
      <ErrorBoundary fallback={<WidgetError />}>
        <Widget1 />
      </ErrorBoundary>
      <ErrorBoundary fallback={<WidgetError />}>
        <Widget2 />
      </ErrorBoundary>
      <ErrorBoundary fallback={<WidgetError />}>
        <Widget3 />
      </ErrorBoundary>
    </div>
  );
}

// Route-Level Boundaries
function App() {
  return (
    <Router>
      <ErrorBoundary fallback={<RouteError />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

// Feature-Level Boundaries
function App() {
  return (
    <div>
      <ErrorBoundary fallback={<AuthError />}>
        <AuthFeature />
      </ErrorBoundary>
      <ErrorBoundary fallback={<DataError />}>
        <DataFeature />
      </ErrorBoundary>
    </div>
  );
}

// Best Practices
// 1. Place boundaries at appropriate levels
// 2. Use granular boundaries for isolation
// 3. Provide meaningful fallback UI
// 4. Log errors appropriately
// 5. Allow error recovery
// 6. Test error scenarios`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ErrorBoundariesEnhancements;

