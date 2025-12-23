function InterviewHooks() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete React Hooks Reference - Interview Cheatsheet</h2>
        <p className="text-gray-700">Comprehensive guide to all React hooks for interviews</p>
      </div>

      {/* useState */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useState</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Manage component state</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const [state, setState] = useState(initialValue);
const [state, setState] = useState(() => expensiveInit());`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Key Points:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Returns [value, setter] array</li>
              <li>Use functional updates for state based on previous state</li>
              <li>State updates are batched in React 18</li>
              <li>Lazy initialization with function</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Interview Tip:</p>
            <p className="text-gray-700">Always use functional updates when new state depends on previous: <code className="bg-gray-200 px-1 rounded">setCount(prev => prev + 1)</code></p>
          </div>
        </div>
      </section>

      {/* useEffect */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useEffect</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Handle side effects (API calls, subscriptions, DOM manipulation)</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`useEffect(() => {
  // Effect
  return () => {
    // Cleanup
  };
}, [dependencies]);`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Dependency Array:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>[]:</strong> Run once on mount</li>
              <li><strong>[dep1, dep2]:</strong> Run when dependencies change</li>
              <li><strong>No array:</strong> Run on every render (avoid!)</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Common Interview Question:</p>
            <p className="text-gray-700">Q: What happens if you forget dependencies in useEffect?</p>
            <p className="text-gray-700 mt-2">A: You get stale closures and bugs. ESLint exhaustive-deps rule helps catch this.</p>
          </div>
        </div>
      </section>

      {/* useContext */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useContext</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Access context value</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const value = useContext(MyContext);`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Usage Pattern:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Component />
    </ThemeContext.Provider>
  );
}

function Component() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* useReducer */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useReducer</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Manage complex state logic</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const [state, dispatch] = useReducer(reducer, initialState);
const [state, dispatch] = useReducer(reducer, initialArg, init);`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">When to Use:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Complex state logic with multiple sub-values</li>
              <li>Next state depends on previous state</li>
              <li>Better than useState for complex updates</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Example:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });`}
            </pre>
          </div>
        </div>
      </section>

      {/* useCallback */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useCallback</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Memoize functions to prevent unnecessary re-renders</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">When to Use:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Passing callbacks to memoized child components</li>
              <li>Functions in dependency arrays</li>
              <li>Expensive function creation</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Interview Tip:</p>
            <p className="text-gray-700">Don't overuse useCallback. Only use when you have a performance problem or passing to memoized components.</p>
          </div>
        </div>
      </section>

      {/* useMemo */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useMemo</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Memoize expensive calculations</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]);`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">When to Use:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Expensive calculations</li>
              <li>Referential equality for objects/arrays</li>
              <li>Preventing child re-renders</li>
            </ul>
          </div>
        </div>
      </section>

      {/* useRef */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useRef</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Access DOM elements or store mutable values</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const inputRef = useRef(null);
const countRef = useRef(0); // Mutable value`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Use Cases:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>DOM element references</li>
              <li>Storing previous values</li>
              <li>Mutable values that don't trigger re-renders</li>
              <li>Timer IDs, interval IDs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* useLayoutEffect */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useLayoutEffect</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Synchronous effect that runs before browser paint</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`useLayoutEffect(() => {
  // Runs synchronously after DOM mutations
  // but before browser paint
}, [deps]);`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">When to Use:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>DOM measurements</li>
              <li>Preventing visual flicker</li>
              <li>When you need synchronous execution</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">useEffect vs useLayoutEffect:</p>
            <p className="text-gray-700">useEffect: asynchronous, after paint. useLayoutEffect: synchronous, before paint.</p>
          </div>
        </div>
      </section>

      {/* React 18 Hooks */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React 18 Hooks</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useId</p>
            <p className="text-gray-700 mb-2">Generate unique IDs for accessibility</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const id = useId();
<input id={id} />`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useTransition</p>
            <p className="text-gray-700 mb-2">Mark updates as non-urgent transitions</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const [isPending, startTransition] = useTransition();
startTransition(() => {
  setNonUrgentState(newValue);
});`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useDeferredValue</p>
            <p className="text-gray-700 mb-2">Defer non-urgent value updates</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const deferredValue = useDeferredValue(value);`}
            </pre>
          </div>
        </div>
      </section>

      {/* React 19 Hooks */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React 19 Hooks</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useOptimistic</p>
            <p className="text-gray-700 mb-2">Optimistic UI updates</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const [optimisticState, addOptimistic] = useOptimistic(
  state,
  (currentState, optimisticValue) => {
    // Update logic
  }
);`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">use</p>
            <p className="text-gray-700 mb-2">Unwrap promises and read context</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const data = use(promise);
const context = use(MyContext);`}
            </pre>
          </div>
        </div>
      </section>

      {/* Hook Rules */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Rules of Hooks</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="font-semibold mb-2">Critical Rules:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li><strong>Only call hooks at the top level</strong> - Don't call inside loops, conditions, or nested functions</li>
            <li><strong>Only call hooks from React functions</strong> - React components or custom hooks</li>
            <li><strong>Custom hooks must start with "use"</strong> - This allows React to identify them</li>
          </ol>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-4">
          <p className="font-semibold mb-2">Common Interview Question:</p>
          <p className="text-gray-700">Q: Why can't you call hooks conditionally?</p>
          <p className="text-gray-700 mt-2">A: React relies on the order of hook calls. Conditional calls break this order and cause bugs.</p>
        </div>
      </section>

      {/* Custom Hooks */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Hooks</h3>
        <div className="bg-blue-50 p-4 rounded">
          <p className="font-semibold mb-2">Pattern:</p>
          <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function useCustomHook(param) {
  const [state, setState] = useState();
  
  useEffect(() => {
    // Logic
  }, [param]);
  
  return { state, setState };
}`}
          </pre>
        </div>
        <div className="bg-gray-50 p-4 rounded mt-4">
          <p className="font-semibold mb-2">Benefits:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Reusable logic</li>
            <li>Share stateful logic between components</li>
            <li>Keep components clean</li>
            <li>Testable in isolation</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default InterviewHooks;

