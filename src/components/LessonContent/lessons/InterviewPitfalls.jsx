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
          </div>
        </div>
      </section>

      {/* Stale Closures */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Stale Closures in Hooks</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Problem:</p>
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
          </div>
        </div>
      </section>

      {/* Missing Dependencies */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Missing Dependencies in useEffect</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Problem:</p>
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
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Include all dependencies
  
  return <div>{user?.name}</div>;
}`}
            </pre>
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

