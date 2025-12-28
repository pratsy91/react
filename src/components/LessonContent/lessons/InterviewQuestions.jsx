function InterviewQuestions() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Interview Questions & Answers</h2>
        <p className="text-gray-700">Most commonly asked React interview questions with detailed answers</p>
      </div>

      {/* Core Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Core Concepts</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What is React and why use it?</p>
            <div className="mt-2 space-y-2">
              <p className="text-gray-700"><strong>A:</strong> React is a JavaScript library for building user interfaces. Key benefits:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Component-based architecture for reusability</li>
                <li>Virtual DOM for efficient updates</li>
                <li>Unidirectional data flow</li>
                <li>Large ecosystem and community</li>
                <li>Strong developer tools</li>
                <li>Works well with TypeScript</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: Explain Virtual DOM</p>
            <div className="mt-2 space-y-2">
              <p className="text-gray-700"><strong>A:</strong> Virtual DOM is an in-memory representation of the real DOM. React uses it to:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Create a lightweight copy of the DOM</li>
                <li>Compare old and new virtual trees (diffing)</li>
                <li>Update only changed nodes in the real DOM</li>
                <li>Batch updates for better performance</li>
                <li>Avoid expensive direct DOM manipulation</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: Difference between state and props?</p>
            <div className="mt-2">
              <p className="text-gray-700"><strong>A:</strong></p>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="font-semibold">Props:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Passed from parent</li>
                    <li>Immutable (read-only)</li>
                    <li>Configuration</li>
                    <li>Cannot be changed</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">State:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Internal to component</li>
                    <li>Mutable</li>
                    <li>Dynamic data</li>
                    <li>Updated with setState</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What is JSX?</p>
            <p className="text-gray-700 mt-2"><strong>A:</strong> JSX (JavaScript XML) is a syntax extension that allows writing HTML-like code in JavaScript. It's transpiled to React.createElement() calls by Babel. JSX makes React code more readable and declarative.</p>
          </div>
        </div>
      </section>

      {/* Hooks Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React Hooks</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What are React Hooks?</p>
            <p className="text-gray-700 mt-2"><strong>A:</strong> Hooks are functions that let you use state and other React features in function components. They allow you to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
              <li>Add state to function components</li>
              <li>Use lifecycle methods</li>
              <li>Share logic between components</li>
              <li>Access context</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: Explain useEffect and its dependencies</p>
            <div className="mt-2 space-y-2">
              <p className="text-gray-700"><strong>A:</strong> useEffect handles side effects. Dependency array controls when it runs:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>[]:</strong> Runs once on mount</li>
                <li><strong>[dep1, dep2]:</strong> Runs when dependencies change</li>
                <li><strong>No array:</strong> Runs on every render (avoid!)</li>
              </ul>
              <p className="text-gray-700 mt-2">Missing dependencies can cause stale closures and bugs.</p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What are the Rules of Hooks?</p>
            <div className="mt-2">
              <p className="text-gray-700"><strong>A:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4 mt-2">
                <li>Only call hooks at the top level (not in loops, conditions, or nested functions)</li>
                <li>Only call hooks from React functions (components or custom hooks)</li>
                <li>Custom hooks must start with "use"</li>
              </ol>
              <p className="text-gray-700 mt-2">React relies on hook call order, so breaking these rules causes bugs.</p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: useCallback vs useMemo - when to use?</p>
            <div className="mt-2">
              <p className="text-gray-700"><strong>A:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
                <li><strong>useCallback:</strong> Memoize functions, use when passing callbacks to memoized children</li>
                <li><strong>useMemo:</strong> Memoize values, use for expensive calculations or referential equality</li>
              </ul>
              <p className="text-gray-700 mt-2">Don't overuse - only optimize when you have a measured performance problem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Component Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Components & Patterns</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: Controlled vs Uncontrolled components?</p>
            <div className="mt-2">
              <p className="text-gray-700"><strong>A:</strong></p>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="font-semibold">Controlled:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Value controlled by React state</li>
                    <li>onChange updates state</li>
                    <li>Single source of truth</li>
                    <li>Recommended</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Uncontrolled:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Value in DOM</li>
                    <li>Use refs to access</li>
                    <li>Less React code</li>
                    <li>Useful for file inputs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What are keys in React and why are they important?</p>
            <p className="text-gray-700 mt-2"><strong>A:</strong> Keys help React identify which items changed, were added, or removed. They should be stable, unique identifiers. Using index as key is only acceptable for static lists. Keys enable efficient reconciliation and prevent bugs.</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What are Error Boundaries?</p>
            <p className="text-gray-700 mt-2"><strong>A:</strong> Error Boundaries are class components that catch JavaScript errors in child component trees. They use getDerivedStateFromError and componentDidCatch. They don't catch errors in event handlers, async code, or during SSR.</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: Explain Higher-Order Components (HOC)</p>
            <p className="text-gray-700 mt-2"><strong>A:</strong> HOC is a function that takes a component and returns a new component. It's used for code reuse and logic sharing. Modern approach prefers custom hooks, but HOCs are still useful for certain patterns.</p>
          </div>
        </div>
      </section>

      {/* State Management Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">State Management</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: When should you use Redux?</p>
            <p className="text-gray-700 mt-2"><strong>A:</strong> Use Redux when you have: complex state logic, need time-travel debugging, middleware requirements, or state shared across many components. For simpler apps, useState/Context may be sufficient.</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What are the downsides of Context API?</p>
            <p className="text-gray-700 mt-2"><strong>A:</strong> Context can cause unnecessary re-renders, isn't optimized for frequent updates, can be harder to debug, and may lead to overuse. Split contexts and memoize values to mitigate issues.</p>
          </div>
        </div>
      </section>

      {/* Performance Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Performance</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you optimize React performance?</p>
            <div className="mt-2">
              <p className="text-gray-700"><strong>A:</strong> Strategies include:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
                <li>React.memo for component memoization</li>
                <li>useMemo and useCallback for expensive operations</li>
                <li>Code splitting with React.lazy</li>
                <li>Virtualization for large lists</li>
                <li>Debouncing/throttling event handlers</li>
                <li>Bundle size optimization</li>
                <li>Image optimization</li>
                <li>Profiling with React DevTools</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: When should you use React.memo?</p>
            <p className="text-gray-700 mt-2"><strong>A:</strong> Use React.memo when a component renders frequently with the same props, has expensive rendering, or is a child of a frequently re-rendering parent. Don't use it everywhere - measure first.</p>
          </div>
        </div>
      </section>

      {/* React 18/19 Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React 18 & 19 Features</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What are the new features in React 18?</p>
            <div className="mt-2">
              <p className="text-gray-700"><strong>A:</strong> Key features:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
                <li>Concurrent rendering</li>
                <li>Automatic batching</li>
                <li>Suspense for data fetching</li>
                <li>useTransition and useDeferredValue</li>
                <li>useId hook</li>
                <li>Server Components</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What's new in React 19?</p>
            <div className="mt-2">
              <p className="text-gray-700"><strong>A:</strong> React 19 features:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
                <li>React Compiler</li>
                <li>Actions and form handling</li>
                <li>useOptimistic hook</li>
                <li>use hook for promises</li>
                <li>Document metadata</li>
                <li>Ref as prop</li>
                <li>Context as provider</li>
                <li>Async components</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Coding Challenges */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Coding Challenges</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Challenge 1: Implement a Counter</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> This demonstrates basic state management with useState hook. useState(0) initializes count state to 0. setCount updates the state, triggering re-render. Using functional updates setCount(c => c + 1) ensures we use the current state value, which is important for correct behavior. The component re-renders when state changes, displaying the updated count value.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  );
}`}
            </pre>
          </div>

          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Challenge 2: Fetch and Display Data</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> This demonstrates data fetching with useEffect hook. Empty dependency array [] ensures fetch runs once on mount. useState manages both data and loading states. loading starts as true, showing loading UI. After fetch completes, setData updates the data and setLoading(false) hides loading state. Conditional rendering shows different UI based on loading state. Note: This example lacks error handling - in production, add try-catch or .catch() to handle fetch errors.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewQuestions;

