function InterviewPerformance() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Optimization - Interview Cheatsheet</h2>
        <p className="text-gray-700">Complete guide to React performance optimization for interviews</p>
      </div>

      {/* React.memo */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React.memo</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Memoize component to prevent unnecessary re-renders</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React.memo is a higher-order component that memoizes the result. It does shallow comparison of props - if props haven't changed, it reuses the previous render result. This prevents re-renders when parent re-renders but props are the same. Custom comparison function allows fine-grained control over when to re-render. Only use when you have a measured performance problem - memoization has overhead. Works best with primitive props or stable object references.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const MyComponent = React.memo(function MyComponent({ name }) {
  return <div>{name}</div>;
});

// Custom comparison
const MyComponent = React.memo(
  function MyComponent({ name }) {
    return <div>{name}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name;
  }
);`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Shallow compares props. Skips re-render if props unchanged. Custom comparison for fine control. Only use when needed. Has overhead - measure first.</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">When to Use:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Component renders often with same props</li>
              <li>Expensive rendering</li>
              <li>Props are primitive values</li>
              <li>Parent re-renders frequently</li>
            </ul>
          </div>
        </div>
      </section>

      {/* useMemo vs useCallback */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useMemo vs useCallback</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">useMemo:</p>
              <p className="text-gray-700 text-sm mb-2">Memoizes <strong>values</strong></p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
                <p className="text-gray-700 text-sm"><strong>Theory:</strong> useMemo memoizes the result of an expensive computation. It only recalculates when dependencies change. This prevents expensive operations from running on every render. Also useful for maintaining referential equality of objects/arrays passed to memoized children. The function runs during render, so it must be pure. Don't overuse - memoization has overhead.</p>
              </div>
              <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const expensiveValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);`}
              </pre>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Memoizes computed values. Only recalculates when deps change. Use for expensive calculations. Also for referential equality. Has overhead - measure first.</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">useCallback:</p>
              <p className="text-gray-700 text-sm mb-2">Memoizes <strong>functions</strong></p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
                <p className="text-gray-700 text-sm"><strong>Theory:</strong> useCallback memoizes a function, returning the same function reference if dependencies haven't changed. Without it, a new function is created on every render, causing memoized children to re-render unnecessarily. Useful when passing callbacks to React.memo components or when callbacks are in dependency arrays. Only use when you have a performance problem - overuse can hurt performance.</p>
              </div>
              <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const memoizedCallback = useCallback(
  () => doSomething(a, b),
  [a, b]
);`}
              </pre>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Memoizes function references. Prevents unnecessary re-renders of memoized children. Use when callbacks in dependency arrays. Only when needed. Overuse can hurt performance.</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Important:</p>
            <p className="text-gray-700">Don't overuse! Only optimize when you have a measured performance problem. Premature optimization can make code harder to read.</p>
          </div>
        </div>
      </section>

      {/* Code Splitting */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Code Splitting Strategies</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Route-based Splitting:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Code splitting loads code on-demand instead of all at once. React.lazy creates a lazy-loaded component. The import() function returns a promise that resolves to the module. Suspense component shows fallback while component loads. This reduces initial bundle size, improving initial load time. Route-based splitting loads code when user navigates to that route. Each route becomes a separate chunk loaded on demand.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

<Routes>
  <Route path="/" element={
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  } />
</Routes>`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> lazy() creates lazy component. import() returns promise. Suspense shows fallback. Reduces initial bundle. Loads code on navigation.</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Component-based Splitting:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Load</button>
      {show && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Virtualization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Virtualization / Windowing</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Render only visible items in large lists</p>
            <div className="bg-blue-50 p-4 rounded mt-2">
              <p className="font-semibold mb-2">Libraries:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>react-window</li>
                <li>react-virtualized</li>
                <li>@tanstack/react-virtual</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Debouncing & Throttling */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Debouncing & Throttling</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Debounce:</p>
              <p className="text-gray-700 text-sm mb-2">Execute after delay when user stops</p>
              <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Search input
const debouncedSearch = debounce(
  (query) => search(query),
  300
);`}
              </pre>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Throttle:</p>
              <p className="text-gray-700 text-sm mb-2">Execute at most once per period</p>
              <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Scroll handler
const throttledScroll = throttle(
  () => handleScroll(),
  100
);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Optimization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Bundle Size Optimization</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Strategies:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Tree shaking (remove unused code)</li>
              <li>Code splitting</li>
              <li>Dynamic imports</li>
              <li>Analyze bundle (webpack-bundle-analyzer)</li>
              <li>Use smaller alternatives (date-fns vs moment)</li>
              <li>Lazy load heavy libraries</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Image Optimization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Image Optimization</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Techniques:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Lazy loading (loading="lazy")</li>
              <li>Responsive images (srcset)</li>
              <li>Modern formats (WebP, AVIF)</li>
              <li>Image CDN</li>
              <li>Blur placeholders</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Re-render Optimization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Re-render Optimization</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">Techniques:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>React.memo for components</li>
              <li>useMemo for expensive calculations</li>
              <li>useCallback for function props</li>
              <li>Split contexts to reduce re-renders</li>
              <li>Move state down (closer to where it's used)</li>
              <li>Use key prop correctly</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Profiling */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Profiling with React DevTools</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Steps:</strong></p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Open React DevTools</li>
              <li>Go to Profiler tab</li>
              <li>Click record</li>
              <li>Interact with your app</li>
              <li>Stop recording</li>
              <li>Analyze which components re-rendered</li>
              <li>Look for components with long commit times</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Performance Checklist */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Optimization Checklist</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">✅ Do:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Measure before optimizing</li>
              <li>Use React.memo for expensive components</li>
              <li>Code split large bundles</li>
              <li>Lazy load images and components</li>
              <li>Optimize images</li>
              <li>Use production builds</li>
              <li>Profile with DevTools</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Don't:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Optimize prematurely</li>
              <li>Memoize everything</li>
              <li>Create components in render</li>
              <li>Use index as key (unless static)</li>
              <li>Forget to measure</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: When should you use React.memo?</p>
            <p className="text-gray-700">A: When a component renders frequently with the same props, has expensive rendering, or is a child of a frequently re-rendering parent.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What's the difference between useMemo and useCallback?</p>
            <p className="text-gray-700">A: useMemo memoizes values, useCallback memoizes functions. Both prevent unnecessary recalculations/recreations.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you optimize a large list?</p>
            <p className="text-gray-700">A: Use virtualization (react-window), pagination, or infinite scroll. Only render visible items.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewPerformance;

