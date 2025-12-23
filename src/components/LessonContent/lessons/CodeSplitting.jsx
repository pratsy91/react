import { lazy, Suspense, useState } from 'react';

// Lazy loaded components
const LazyComponent = lazy(() => import('./LazyLoadedComponent'));
const LazyHeavyComponent = lazy(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./LazyLoadedComponent'));
    }, 1000);
  })
);

function CodeSplitting() {
  const [showLazy, setShowLazy] = useState(false);
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Code Splitting</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Code Splitting</h3>
        <p className="text-blue-800 mb-2">
          Code splitting is a technique for splitting your JavaScript bundle into smaller chunks that can be loaded on demand. 
          This reduces the initial bundle size, improving load time and user experience. React.lazy and dynamic imports enable 
          code splitting in React applications.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Bundle Size:</strong> Split large bundles into smaller, loadable chunks</li>
            <li><strong>Lazy Loading:</strong> Load code only when needed (on-demand)</li>
            <li><strong>Dynamic Imports:</strong> Use import() syntax for dynamic component loading</li>
            <li><strong>React.lazy:</strong> Wrapper around dynamic imports for React components</li>
            <li><strong>Suspense Required:</strong> Lazy components must be wrapped in Suspense</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Smaller initial bundle size - faster first load</li>
            <li>Better performance - only load what's needed</li>
            <li>Improved user experience - faster time to interactive</li>
            <li>Reduced memory usage - load components on demand</li>
            <li>Better caching - changed components don't invalidate entire bundle</li>
          </ul>
          <p className="mt-2"><strong>When to Use Code Splitting:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Route-based splitting (split by page/route)</li>
            <li>Large, heavy components that aren't always visible</li>
            <li>Third-party libraries that aren't always needed</li>
            <li>Modal dialogs, tabs, accordions with hidden content</li>
            <li>Any feature that's conditionally rendered</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">React.lazy</h3>
        <p className="text-gray-700 mb-4">
          React.lazy lets you load components lazily, reducing the initial bundle size.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <button
              onClick={() => setShowLazy(!showLazy)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showLazy ? 'Hide' : 'Load'} Lazy Component
            </button>
            {showLazy && (
              <Suspense fallback={<div className="mt-4 p-4 bg-yellow-50 rounded">Loading component...</div>}>
                <LazyComponent />
              </Suspense>
            )}
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`import { lazy } from 'react';

const LazyComponent = lazy(() => import('./Component'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Suspense Boundary</h3>
        <p className="text-gray-700 mb-4">
          Suspense provides a fallback UI while lazy components are loading.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <button
              onClick={() => setShowHeavy(!showHeavy)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {showHeavy ? 'Hide' : 'Load'} Heavy Component (1s delay)
            </button>
            {showHeavy && (
              <Suspense fallback={
                <div className="mt-4 p-4 bg-blue-50 rounded animate-pulse">
                  <p>⏳ Loading heavy component...</p>
                </div>
              }>
                <LazyHeavyComponent />
              </Suspense>
            )}
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Dynamic Imports</h3>
        <p className="text-gray-700 mb-4">
          React.lazy uses dynamic imports under the hood to split code.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Static import (bundled immediately)
import HeavyComponent from './HeavyComponent';

// Dynamic import (loaded on demand)
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// With named exports
const Component = lazy(() => 
  import('./Component').then(module => ({
    default: module.Component
  }))
);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Route-Based Splitting</h3>
        <p className="text-gray-700 mb-4">
          Split code by routes to load only what's needed for each page.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Component-Based Splitting</h3>
        <p className="text-gray-700 mb-4">
          Split heavy components that aren't immediately visible.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Split heavy modals, charts, editors
const Chart = lazy(() => import('./Chart'));
const Editor = lazy(() => import('./Editor'));
const Modal = lazy(() => import('./Modal'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<Spinner />}>
          <Chart />
        </Suspense>
      )}
    </>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Boundaries with Lazy Loading</h3>
        <p className="text-gray-700 mb-4">
          Wrap lazy components with error boundaries to handle loading failures.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ErrorBoundaryExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}

<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>`}</pre>
        </div>
      </section>
    </div>
  );
}

// Error Boundary Example (simplified)
function ErrorBoundaryExample() {
  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm text-gray-700">
        Error boundaries catch errors in lazy-loaded components and show fallback UI.
      </p>
      <p className="text-xs text-gray-600 mt-2">
        Check browser DevTools Network tab to see code splitting in action!
      </p>
    </div>
  );
}

export default CodeSplitting;

