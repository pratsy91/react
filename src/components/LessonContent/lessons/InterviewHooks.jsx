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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useState is a hook that adds state to function components. It returns an array with [currentState, setStateFunction]. The setter function triggers a re-render when called. State persists across re-renders until component unmounts. Lazy initialization (function form) only runs once on mount, useful for expensive calculations.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const [state, setState] = useState(initialValue);
const [state, setState] = useState(() => expensiveInit());`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>How it works:</strong> First call returns initial value. Subsequent calls return current state. setState can take a value or a function (prev => newValue). State updates are batched in React 18 for performance.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useEffect runs after render and commit phases. It's used for side effects that can't happen during render (like API calls, subscriptions, timers). The dependency array controls when the effect runs. Cleanup function runs before effect runs again or on unmount. Effects run asynchronously after paint, so they don't block rendering.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`useEffect(() => {
  // Effect
  return () => {
    // Cleanup
  };
}, [dependencies]);`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Execution flow:</strong> Component renders → Effect runs → User interacts → Dependencies change → Cleanup runs → Effect runs again. Missing dependencies can cause stale closures. Empty array [] means effect runs once on mount.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Context API provides a way to share data without prop drilling. createContext creates a context object. Provider component supplies the value to all descendants. useContext hook reads the context value from nearest Provider. If no Provider found, useContext returns default value. Context causes re-renders when value changes.</p>
            </div>
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
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Context value can be any type (string, object, function). All consumers re-render when Provider value changes. Use multiple contexts to avoid unnecessary re-renders. Context is not optimized for frequently changing data.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useReducer manages complex state logic using the reducer pattern. A reducer is a pure function (state, action) => newState. It's predictable - same state and action always produce same result. dispatch sends actions to the reducer. This pattern is inspired by Redux and is useful when state logic is complex or involves multiple sub-values.</p>
            </div>
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
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Reducer must be pure (no side effects). Always return new state object (don't mutate). Actions are objects with type property. Default case returns current state. Use when state logic is complex or when next state depends on previous.</p>
            </div>
          </div>
        </div>
      </section>

      {/* useCallback */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useCallback</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Memoize functions to prevent unnecessary re-renders</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useCallback returns a memoized version of the callback that only changes if dependencies change. Without useCallback, a new function is created on every render, causing child components wrapped in React.memo to re-render unnecessarily. It's useful when passing callbacks to memoized children or when callbacks are in dependency arrays.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Returns same function reference if dependencies unchanged. Prevents unnecessary re-renders of memoized children. Only use when you have a performance problem. Overuse can hurt performance (memoization has cost).</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useMemo memoizes the result of an expensive computation. It only recalculates when dependencies change. This prevents expensive operations from running on every render. It's also useful for maintaining referential equality of objects/arrays passed as props to memoized components.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]);`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Only recalculates when dependencies change. Use for expensive calculations or referential equality. Don't overuse - memoization has overhead. The function runs during render, so it must be pure.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useRef returns a mutable ref object with a .current property. Refs persist across re-renders but don't trigger re-renders when changed. For DOM refs, .current points to the DOM element. For mutable values, .current stores any value. Unlike state, changing .current doesn't cause re-render, making it perfect for storing values that don't affect UI.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const inputRef = useRef(null);
const countRef = useRef(0); // Mutable value`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> .current property persists across renders. Changing .current doesn't trigger re-render. Use for DOM access, timer IDs, previous values, or any mutable value that shouldn't cause re-render. Refs are created once per component instance.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useLayoutEffect runs synchronously after all DOM mutations but before the browser paints. This means it blocks painting until it completes. Use it when you need to read layout (like measurements) and synchronously update DOM to prevent visual flicker. It has the same API as useEffect but different timing.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`useLayoutEffect(() => {
  // Runs synchronously after DOM mutations
  // but before browser paint
}, [deps]);`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Runs synchronously (blocks paint). Use for DOM measurements and synchronous updates. Can cause performance issues if overused. Prefer useEffect unless you need synchronous execution.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useId generates unique IDs that are stable across server and client renders. This solves the hydration mismatch problem when using IDs. It's perfect for connecting labels to inputs, ARIA attributes, and other accessibility features. The ID is unique per component instance.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const id = useId();
<input id={id} />`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> IDs are stable across renders. Works with SSR (no hydration mismatch). Use for accessibility (label-input pairs). Don't use for list keys (use data IDs instead).</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useTransition</p>
            <p className="text-gray-700 mb-2">Mark updates as non-urgent transitions</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useTransition marks state updates as transitions (non-urgent). React can interrupt these updates to keep UI responsive. isPending indicates if a transition is in progress. This allows React to prioritize urgent updates (like user input) over non-urgent ones (like filtering a list). Improves perceived performance.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const [isPending, startTransition] = useTransition();
startTransition(() => {
  setNonUrgentState(newValue);
});`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Marks updates as non-urgent. Can be interrupted by urgent updates. isPending shows transition state. Use for expensive updates that can wait. Keeps UI responsive during heavy work.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useDeferredValue</p>
            <p className="text-gray-700 mb-2">Defer non-urgent value updates</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useDeferredValue defers updating a value until React has time for it. It returns a deferred version that "lags behind" the original. Useful for expensive rendering based on a value. React keeps showing the old value while preparing the new one, then switches when ready. Similar to debouncing but integrated with React's scheduler.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const deferredValue = useDeferredValue(value);`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Defers value updates. Shows old value while new one prepares. Useful for expensive renders. Automatically manages the deferral. Better than manual debouncing for React.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useOptimistic allows showing optimistic UI immediately while async operation completes. It takes current state and a reducer function. addOptimistic immediately updates UI optimistically. If operation fails, React reverts to actual state. This provides instant feedback to users, improving perceived performance.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const [optimisticState, addOptimistic] = useOptimistic(
  state,
  (currentState, optimisticValue) => {
    // Update logic
  }
);`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Shows optimistic UI immediately. Automatically reverts on error. Improves user experience. Works with Suspense. Use for mutations that usually succeed.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">use</p>
            <p className="text-gray-700 mb-2">Unwrap promises and read context</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> The use hook can unwrap promises and read context. When used with a promise, it suspends the component until promise resolves. When used with context, it reads the context value. This provides a unified way to handle async data and context. It integrates with Suspense for loading states.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const data = use(promise);
const context = use(MyContext);`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Can unwrap promises (suspends until resolved). Can read context. Integrates with Suspense. Provides unified async handling. Must be called unconditionally (like all hooks).</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Custom hooks are functions that start with "use" and can call other hooks. They allow extracting and reusing stateful logic between components. Custom hooks can use any React hooks internally. They're a way to share logic without render props or HOCs. The "use" prefix is required so React can identify them and apply hook rules.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function useCustomHook(param) {
  const [state, setState] = useState();
  
  useEffect(() => {
    // Logic
  }, [param]);
  
  return { state, setState };
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Must start with "use". Can use any hooks inside. Return any value (object, array, primitive). Share logic between components. Testable in isolation. Follow hook rules.</p>
            </div>
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

