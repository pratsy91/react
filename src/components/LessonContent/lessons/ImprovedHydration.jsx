import { useState } from 'react';

function ImprovedHydration() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Improved Hydration</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Better Hydration Errors</h3>
        <p className="text-gray-700 mb-4">
          React 19 provides better error messages for hydration mismatches.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Better Hydration Errors
// React 19 provides clearer error messages

// Hydration Mismatch
// Server: <div>Hello</div>
// Client: <div>Hi</div>
// Error: Hydration failed because the initial UI does not match

// Improved Error Message
// React 19 shows:
// - Exact location of mismatch
// - Server-rendered HTML
// - Client-rendered HTML
// - Component tree path
// - Suggestions for fixing

// Example Error
// Error: Hydration failed because the server rendered HTML didn't match the client.
// 
// Server HTML:
//   <div data-reactroot>
//     <span>Server Content</span>
//   </div>
// 
// Client HTML:
//   <div data-reactroot>
//     <span>Client Content</span>
//   </div>
// 
// Component: App > Content > Span
// 
// Common causes:
// - Using Date.now() or Math.random()
// - Browser-only APIs
// - Different data on server/client

// Common Hydration Issues
// 1. Date/Time differences
function Component() {
  // ❌ Different on server and client
  const time = new Date().toLocaleTimeString();
  return <div>{time}</div>;
}

// ✅ Fix: Use useEffect
function Component() {
  const [time, setTime] = useState('');
  
  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);
  
  return <div>{time || 'Loading...'}</div>;
}

// 2. Random values
function Component() {
  // ❌ Different on server and client
  const id = Math.random();
  return <div id={id}>Content</div>;
}

// ✅ Fix: Use useId
function Component() {
  const id = useId();
  return <div id={id}>Content</div>;
}

// 3. Browser APIs
function Component() {
  // ❌ window not available on server
  const width = window.innerWidth;
  return <div>Width: {width}</div>;
}

// ✅ Fix: Check in useEffect
function Component() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  
  return <div>Width: {width}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Messages</h3>
        <p className="text-gray-700 mb-4">
          Improved error messages in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Error Messages
// More helpful and actionable

// Hydration Error Format
// Error: [Error Type]
// 
// [Context]
// Server: [Server HTML]
// Client: [Client HTML]
// 
// Component: [Component Path]
// 
// [Suggestions]

// Example: Attribute Mismatch
// Error: Hydration failed: attribute "class" did not match
// 
// Server: <div class="server-class">
// Client: <div class="client-class">
// 
// Component: App > Container > Div
// 
// Suggestion: Ensure className is consistent between server and client

// Example: Text Content Mismatch
// Error: Hydration failed: text content did not match
// 
// Server: <span>Server Text</span>
// Client: <span>Client Text</span>
// 
// Component: App > Text > Span
// 
// Suggestion: Avoid dynamic content that differs between server and client

// Example: Missing Element
// Error: Hydration failed: expected to find element but didn't
// 
// Server: <div><span>Content</span></div>
// Client: <div></div>
// 
// Component: App > Container > Div
// 
// Suggestion: Ensure conditional rendering is consistent

// Error Recovery
// React 19 attempts to recover from hydration errors
// - Logs error to console
// - Shows error in DevTools
// - Continues rendering (in some cases)
// - Provides recovery suggestions`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Hydration Mismatch Detection</h3>
        <p className="text-gray-700 mb-4">
          Better detection of hydration mismatches.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Hydration Mismatch Detection
// React 19 detects mismatches more accurately

// Automatic Detection
// React automatically detects:
// - Text content differences
// - Attribute differences
// - Element structure differences
// - Missing elements
// - Extra elements

// Strict Mode
// Strict Mode helps catch hydration issues
function App() {
  return (
    <StrictMode>
      <Root />
    </StrictMode>
  );
}

// Strict Mode in React 19:
// - Double-renders components
// - Detects side effects
// - Catches hydration issues
// - Warns about deprecated APIs

// Suppress Hydration Warnings
// Use suppressHydrationWarning for known differences
function Component() {
  return (
    <div suppressHydrationWarning>
      {/* Known to differ between server/client */}
      {typeof window !== 'undefined' && window.innerWidth}
    </div>
  );
}

// Best Practices
// 1. Ensure server and client render same HTML
// 2. Use useEffect for browser-only code
// 3. Use useId for unique IDs
// 4. Avoid Date.now(), Math.random() in render
// 5. Check for browser APIs before using
// 6. Use suppressHydrationWarning sparingly

// Testing Hydration
// Test SSR components for hydration issues
// 1. Render on server
// 2. Hydrate on client
// 3. Check for errors
// 4. Verify HTML matches

// Common Patterns
// Pattern 1: Client-only content
function Component() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  return <div>{/* Client-only content */}</div>;
}

// Pattern 2: Conditional rendering
function Component({ isClient }) {
  if (typeof window === 'undefined') {
    return <div>Server content</div>;
  }
  
  return <div>Client content</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">SSR Improvements</h3>
        <p className="text-gray-700 mb-4">
          Server-Side Rendering improvements in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// SSR Improvements
// Better Server-Side Rendering

// Streaming SSR
// Stream HTML to client as it's generated
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <AsyncComponent />
    </Suspense>
  );
}

// Progressive Hydration
// Hydrate components as they stream
function Page() {
  return (
    <div>
      <StaticContent />
      <Suspense fallback={<Loading />}>
        <InteractiveContent />
      </Suspense>
    </div>
  );
}

// Selective Hydration
// Hydrate only interactive parts
function App() {
  return (
    <div>
      <ServerContent />
      <ClientInteractive />
    </div>
  );
}

// Error Recovery
// Better error handling in SSR
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Content />
    </ErrorBoundary>
  );
}

// Performance
// - Faster initial render
// - Smaller bundle size
// - Better Time to Interactive (TTI)
// - Improved Core Web Vitals

// SEO Benefits
// - Fully rendered HTML
// - Proper meta tags
// - Better crawlability
// - Improved indexing`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Debugging Tools</h3>
        <p className="text-gray-700 mb-4">
          Tools for debugging hydration issues.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Debugging Tools
// Tools to debug hydration

// React DevTools
// - Inspect component tree
// - View props and state
// - Check hydration status
// - Identify mismatches

// Console Warnings
// React logs hydration warnings:
// - Mismatch details
// - Component location
// - Suggestions

// Development Mode
// More detailed errors in development
if (process.env.NODE_ENV === 'development') {
  // Detailed hydration warnings
}

// Hydration Test
// Test hydration in development
function testHydration() {
  // 1. Render on server
  const serverHTML = renderToString(<App />);
  
  // 2. Hydrate on client
  hydrateRoot(container, <App />);
  
  // 3. Check for errors
  // Errors will be logged
}

// Common Debugging Steps
// 1. Check console for errors
// 2. Compare server and client HTML
// 3. Look for dynamic content
// 4. Check for browser APIs
// 5. Verify props consistency
// 6. Test in different browsers

// Tools
// - React DevTools
// - Browser DevTools
// - SSR testing tools
// - Hydration checkers`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ImprovedHydration;

