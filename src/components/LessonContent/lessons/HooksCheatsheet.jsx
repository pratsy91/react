import React from 'react';

function HooksCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React Hooks Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Complete Hooks Reference for Interviews</h3>
        <p className="text-blue-800 mb-2">
          All React hooks with syntax, use cases, and common interview questions. 
          Essential for React developer interviews.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Rules of Hooks</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <ul className="space-y-2 text-gray-800">
            <li><strong>1. Only call hooks at the top level</strong> - Not inside loops, conditions, or nested functions</li>
            <li><strong>2. Only call hooks from React functions</strong> - Function components or custom hooks</li>
            <li><strong>3. Call hooks in the same order</strong> - React relies on call order</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">State Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// useState - Basic state
const [count, setCount] = useState(0);
const [name, setName] = useState('');

// Functional updates (recommended)
setCount(prev => prev + 1);

// Lazy initial state
const [value, setValue] = useState(() => expensiveComputation());

// useReducer - Complex state
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT' });`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Effect Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// useEffect - Side effects
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup
  };
}, [dependencies]);

// Empty deps - runs once on mount
useEffect(() => {
  fetchData();
}, []);

// With deps - runs when deps change
useEffect(() => {
  updateData(id);
}, [id]);

// No deps - runs on every render (avoid!)
useEffect(() => {
  console.log('render');
});

// useLayoutEffect - Synchronous, before paint
useLayoutEffect(() => {
  // DOM measurements, synchronous updates
}, []);

// useInsertionEffect - Before DOM mutations (CSS-in-JS)
useInsertionEffect(() => {
  // Inject styles
}, []);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context & Ref Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// useContext - Consume context
const theme = useContext(ThemeContext);

// useRef - DOM refs and mutable values
const inputRef = useRef(null);
const countRef = useRef(0); // Mutable value

inputRef.current.focus();
countRef.current += 1; // Doesn't trigger re-render

// useImperativeHandle - Customize ref
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus()
}));`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// useMemo - Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback - Memoize functions
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// React.memo - Memoize components
const MemoizedComponent = memo(Component);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">React 18+ Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// useTransition - Non-urgent updates
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setNonUrgentState(newValue);
});

// useDeferredValue - Defer value updates
const deferredValue = useDeferredValue(value);

// useId - Unique IDs (SSR-safe)
const id = useId();

// useSyncExternalStore - External store subscription
const value = useSyncExternalStore(subscribe, getSnapshot);

// use() - Unwrap promises/context (React 19)
const data = use(promise);
const context = use(Context);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">React 19 Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// useOptimistic - Optimistic updates
const [optimisticState, addOptimistic] = useOptimistic(
  state,
  (current, optimisticValue) => ({ ...current, ...optimisticValue })
);

// useActionState - Form actions with state
const [state, formAction] = useActionState(action, initialState);

// useFormStatus - Form submission status
const { pending, data, method, action } = useFormStatus();`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Other Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// useDebugValue - DevTools label
useDebugValue(isOnline ? 'Online' : 'Offline');

// useReducer - Complex state logic
const [state, dispatch] = useReducer(reducer, initialState);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Common Interview Questions</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <div className="space-y-4 text-gray-800">
            <div>
              <p className="font-semibold mb-2">Q: What are the rules of hooks?</p>
              <p className="text-sm">A: Only call at top level, only from React functions, call in same order every render.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Q: useState vs useReducer?</p>
              <p className="text-sm">A: useState for simple state, useReducer for complex state logic with multiple sub-values.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Q: useEffect dependencies?</p>
              <p className="text-sm">A: Empty [] = mount only, [dep] = when dep changes, no array = every render (avoid).</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Q: useCallback vs useMemo?</p>
              <p className="text-sm">A: useCallback memoizes functions, useMemo memoizes values. Both prevent unnecessary re-renders.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Q: When to use useLayoutEffect?</p>
              <p className="text-sm">A: When you need synchronous DOM measurements or updates before browser paint.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HooksCheatsheet;

