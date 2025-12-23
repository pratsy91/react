import React from 'react';

function PerformanceCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Performance Optimization Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Performance Optimization Quick Reference</h3>
        <p className="text-blue-800 mb-2">
          Essential performance optimization techniques for React interviews. 
          Know when and how to use each technique.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Memoization Techniques</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// React.memo - Memoize components
const MemoizedComponent = memo(Component);

// useMemo - Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback - Memoize functions
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// When to use:
// - React.memo: Component re-renders with same props
// - useMemo: Expensive calculations
// - useCallback: Functions passed to memoized children`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Code Splitting</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// React.lazy - Lazy load components
const LazyComponent = lazy(() => import('./LazyComponent'));

// Usage with Suspense
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>

// Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Optimization Checklist</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <ul className="space-y-2 text-gray-800">
            <li>✓ Use React.memo for expensive components</li>
            <li>✓ Memoize expensive calculations with useMemo</li>
            <li>✓ Memoize callbacks with useCallback</li>
            <li>✓ Split code with React.lazy</li>
            <li>✓ Virtualize long lists (react-window)</li>
            <li>✓ Debounce/throttle event handlers</li>
            <li>✓ Optimize images and assets</li>
            <li>✓ Use production builds</li>
            <li>✓ Profile with React DevTools</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default PerformanceCheatsheet;

