function InterviewPitfalls() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Pitfalls & Solutions - Interview Cheatsheet</h2>
        <p className="text-gray-700">Common React mistakes and how to avoid them</p>
      </div>

      {/* Infinite Re-render Loops */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Infinite Re-render Loops</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Problem:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Without a dependency array, useEffect runs after every render. If the effect updates state, it triggers a re-render, which runs the effect again, creating an infinite loop. This happens because: render → effect runs → state updates → re-render → effect runs again. The missing dependency array means React treats the effect as needing to run on every render, causing the cycle.</p>
            </div>
            <pre className="bg-gray-800 text-red-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(count + 1); // Infinite loop!
  }); // Missing dependency array
  
  return <div>{count}</div>;
}`}
            </pre>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Solution:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Empty dependency array [] makes effect run only once on mount. For effects that need to update state based on dependencies, use functional updates (prev => newValue) which don't require the state variable in dependencies. This breaks the cycle: effect runs → functional update doesn't depend on current state → no re-trigger. Always include all dependencies or use functional updates to avoid stale closures.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Only run once on mount
  }, []); // Empty dependency array
  
  // Or use functional update
  useEffect(() => {
    setCount(prev => prev + 1);
  }, [someDependency]);
  
  return <div>{count}</div>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Empty array runs once. Functional updates don't need state in deps. Prevents infinite loops. Always include dependencies or use functional updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stale Closures */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Stale Closures in Hooks</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Problem:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Stale closure occurs when a function captures an old value of a variable. The effect runs once (empty deps), creating a closure over count=0. The interval callback always sees count=0 because it was captured at effect creation time. Even when count updates, the interval callback still references the old value. This is a closure - the function "closes over" the value from when it was created.</p>
            </div>
            <pre className="bg-gray-800 text-red-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count); // Always logs 0!
    }, 1000);
    
    return () => clearInterval(interval);
  }, []); // Missing count dependency
  
  return <div>{count}</div>;
}`}
            </pre>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Solution:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Functional updates solve stale closures. setCount(prev => prev + 1) doesn't depend on the count variable - it receives the current state as prev parameter. React guarantees prev is always the latest state, so no stale closure. This pattern is essential for intervals, timeouts, and async operations that need current state but shouldn't re-run when state changes.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1); // Use functional update
    }, 1000);
    
    return () => clearInterval(interval);
  }, []); // No dependency needed with functional update
  
  return <div>{count}</div>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Functional updates avoid stale closures. prev is always current state. No dependency needed. Essential for intervals/timeouts. Prevents bugs with async code.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Missing Dependencies */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Missing Dependencies in useEffect</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Problem:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Missing dependencies cause bugs. When userId prop changes, the effect doesn't re-run because userId isn't in the dependency array. The component shows stale user data for the old userId. React's exhaustive-deps rule warns about this. All values from component scope used inside effect must be in dependencies, or React can't track when effect should re-run.</p>
            </div>
            <pre className="bg-gray-800 text-red-400 p-4 rounded overflow-x-auto text-sm">
{`function Component({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // Missing userId dependency!
  
  return <div>{user?.name}</div>;
}`}
            </pre>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Solution:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Including all dependencies ensures effect runs when dependencies change. When userId changes, effect re-runs and fetches new user. This keeps data in sync with props. ESLint exhaustive-deps rule automatically detects missing dependencies. Always include all values from component scope used in effect, unless you intentionally want to ignore them (rare).</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Include all dependencies
  
  return <div>{user?.name}</div>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Include all dependencies. Effect re-runs when deps change. Keeps data in sync. ESLint catches missing deps. Prevents stale data bugs.</p>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">💡 Tip:</p>
            <p className="text-gray-700">Use ESLint rule exhaustive-deps to catch missing dependencies automatically.</p>
          </div>
        </div>
      </section>

      {/* Mutating State Directly */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Mutating State Directly</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Problem:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React uses shallow comparison to detect state changes. Mutating the array directly (items.push) changes the array but keeps the same reference. setItems(items) passes the same array reference, so React sees no change and doesn't re-render. React requires immutable updates - create a new array/object so React can detect the change. Mutations also break React's reconciliation and can cause bugs with concurrent features.</p>
            </div>
            <pre className="bg-gray-800 text-red-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const [items, setItems] = useState([1, 2, 3]);
  
  const addItem = () => {
    items.push(4); // Mutating state directly!
    setItems(items); // Won't trigger re-render
  };
  
  return <button onClick={addItem}>Add</button>;
}`}
            </pre>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Solution:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const [items, setItems] = useState([1, 2, 3]);
  
  const addItem = () => {
    setItems([...items, 4]); // Create new array
    // Or
    setItems(prev => [...prev, 4]);
  };
  
  return <button onClick={addItem}>Add</button>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Forgetting Keys */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Forgetting Keys in Lists</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Problem:</p>
            <pre className="bg-gray-800 text-red-400 p-4 rounded overflow-x-auto text-sm">
{`function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li>{item.name}</li> // Missing key!
      ))}
    </ul>
  );
}`}
            </pre>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Solution:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li> // Use stable ID
      ))}
    </ul>
  );
}`}
            </pre>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">⚠️ Using Index as Key:</p>
            <p className="text-gray-700">Only acceptable for static lists that never reorder. For dynamic lists, use stable IDs.</p>
          </div>
        </div>
      </section>

      {/* Memory Leaks */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Memory Leaks</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Problem:</p>
            <pre className="bg-gray-800 text-red-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('tick');
    }, 1000);
    // Missing cleanup!
  }, []);
  
  return <div>Component</div>;
}`}
            </pre>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Solution:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('tick');
    }, 1000);
    
    return () => clearInterval(interval); // Cleanup
  }, []);
  
  return <div>Component</div>;
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Common Leaks:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Intervals/timeouts without cleanup</li>
              <li>Event listeners without removal</li>
              <li>Subscriptions without unsubscribe</li>
              <li>Abort controllers for fetch</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Performance Issues */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Issues</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Common Mistakes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Creating components inside render</li>
              <li>Not memoizing expensive calculations</li>
              <li>Passing new object/array props every render</li>
              <li>Overusing Context for frequently changing data</li>
              <li>Not code splitting large bundles</li>
            </ul>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Solutions:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Define components outside render</li>
              <li>Use useMemo for expensive calculations</li>
              <li>Memoize object/array props with useMemo</li>
              <li>Split contexts or use state management library</li>
              <li>Code split with React.lazy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Context Overuse */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Context Overuse</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Problem:</p>
            <pre className="bg-gray-800 text-red-400 p-4 rounded overflow-x-auto text-sm">
{`// Single context with everything
const AppContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [theme, setTheme] = useState();
  const [cart, setCart] = useState();
  // All in one context - causes re-renders!
  
  return (
    <AppContext.Provider value={{ user, theme, cart }}>
      <App />
    </AppContext.Provider>
  );
}`}
            </pre>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Solution:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Split contexts by concern
const UserContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();

// Or use state management library for frequently changing data`}
            </pre>
          </div>
        </div>
      </section>

      {/* Debugging Strategies */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Debugging Strategies</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Tools & Techniques:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>React DevTools Profiler</li>
              <li>Console.log with component names</li>
              <li>Why Did You Render library</li>
              <li>Strict Mode for double-render detection</li>
              <li>ESLint exhaustive-deps rule</li>
              <li>Browser DevTools Performance tab</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Best Practices to Avoid Pitfalls</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Always:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Include all dependencies in useEffect</li>
              <li>Clean up subscriptions, intervals, listeners</li>
              <li>Use functional updates when state depends on previous</li>
              <li>Create new objects/arrays for state updates</li>
              <li>Use stable keys in lists</li>
              <li>Enable ESLint rules</li>
              <li>Use React DevTools</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewPitfalls;

