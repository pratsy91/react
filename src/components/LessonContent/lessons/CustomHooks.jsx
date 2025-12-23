import { useState, useEffect, useCallback, useRef } from 'react';

// Custom Hook: useCounter
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(c => c + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(c => c - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
}

// Custom Hook: useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue];
}

// Custom Hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!cancelled) {
          setData({ message: 'Data loaded successfully!', url });
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Custom Hook: usePrevious
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Custom Hook: useDebounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Custom Hook: useWindowSize
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function CustomHooks() {
  const { count, increment, decrement, reset } = useCounter(0, 1);
  const [name, setName] = useLocalStorage('name', '');
  const { data, loading, error } = useFetch('https://api.example.com/data');
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500);
  const previousCount = usePrevious(count);
  const { width, height } = useWindowSize();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Custom Hooks</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Custom Hooks</h3>
        <p className="text-blue-800 mb-2">
          Custom Hooks are JavaScript functions that start with "use" and can call other Hooks. They allow you to extract 
          component logic into reusable functions, making your code more modular, testable, and maintainable.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Naming Convention:</strong> Must start with "use" (e.g., useCounter, useFetch)</li>
            <li><strong>Reusability:</strong> Share stateful logic between components</li>
            <li><strong>Composition:</strong> Can call other Hooks (useState, useEffect, etc.)</li>
            <li><strong>Isolation:</strong> Each component using a custom Hook has independent state</li>
            <li><strong>Abstraction:</strong> Hide complex logic behind a simple interface</li>
          </ul>
          <p className="mt-2"><strong>When to Create Custom Hooks:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>When you have logic that's used in multiple components</li>
            <li>To extract complex component logic into smaller, focused pieces</li>
            <li>To create reusable stateful logic</li>
            <li>To separate concerns and improve code organization</li>
          </ul>
          <p className="mt-2"><strong>Rules of Hooks Apply:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Only call Hooks at the top level (not in loops, conditions, or nested functions)</li>
            <li>Only call Hooks from React function components or custom Hooks</li>
            <li>Custom Hooks should return values or functions that components can use</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Creating Custom Hooks</h3>
        <p className="text-gray-700 mb-4">
          Custom hooks let you extract component logic into reusable functions.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Count: {count}</p>
            {previousCount !== undefined && (
              <p className="text-sm text-gray-600">Previous: {previousCount}</p>
            )}
            <div className="space-x-2">
              <button
                onClick={increment}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
              <button
                onClick={decrement}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Usage
const { count, increment } = useCounter(0, 1);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Hook Composition</h3>
        <p className="text-gray-700 mb-4">
          Custom hooks can use other hooks, allowing you to compose complex logic.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <HookCompositionExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Common Custom Hooks Patterns</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">1. useLocalStorage</h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type and refresh - value persists!"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <p className="text-xs text-gray-600">Value: {name || '(empty)'}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">2. useFetch</h4>
            {loading && <p className="text-blue-600">Loading...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}
            {data && <p className="text-green-600">{data.message}</p>}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">3. useDebounce</h4>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type quickly - debounced value updates after 500ms"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <p className="text-sm text-gray-600">
              Input: {input} | Debounced: {debouncedInput}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">4. useWindowSize</h4>
            <p className="text-sm text-gray-700">
              Window size: {width} x {height}
            </p>
            <p className="text-xs text-gray-600">Resize the window to see it update</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Sharing Logic Between Components</h3>
        <p className="text-gray-700 mb-4">
          Custom hooks allow multiple components to share the same stateful logic.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Shared hook
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(v => !v);
  return [value, toggle];
}

// Component 1
function Component1() {
  const [isOpen, toggle] = useToggle();
  return <button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</button>;
}

// Component 2 - same logic!
function Component2() {
  const [isOpen, toggle] = useToggle();
  return <div>{isOpen ? 'Visible' : 'Hidden'}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Hook Testing</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

test('increments count', () => {
  const { result } = renderHook(() => useCounter(0));
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Naming Convention</h3>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-800">
            <strong>Important:</strong> Custom hooks must start with "use" (e.g., useCounter, useFetch).
            This convention allows React to apply the Rules of Hooks correctly.
          </p>
        </div>
      </section>
    </div>
  );
}

// Hook Composition Example
function HookCompositionExample() {
  const { count, increment } = useCounter(0);
  const debouncedCount = useDebounce(count, 500);

  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm text-gray-700 mb-2">
        Count: {count} | Debounced: {debouncedCount}
      </p>
      <button
        onClick={increment}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment Rapidly
      </button>
      <p className="text-xs text-gray-600 mt-2">
        Notice: Count updates immediately, debounced value updates after 500ms
      </p>
    </div>
  );
}

export default CustomHooks;

