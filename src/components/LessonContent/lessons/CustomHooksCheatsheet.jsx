import React from 'react';

function CustomHooksCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Custom Hooks Patterns Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Custom Hooks for Interviews</h3>
        <p className="text-blue-800 mb-2">
          Custom hooks allow you to extract component logic into reusable functions. 
          Essential pattern for React interviews.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Hook Rules</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ul className="space-y-2 text-gray-700">
            <li>• Must start with "use" (e.g., useCounter, useFetch)</li>
            <li>• Can call other hooks</li>
            <li>• Follow same rules as regular hooks</li>
            <li>• Return values, functions, or objects</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Common Custom Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// useCounter
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  return { count, increment, decrement, reset };
}

// useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// useDebounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Practices</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <ul className="space-y-2 text-gray-800">
            <li>• Extract reusable logic into custom hooks</li>
            <li>• Keep hooks focused on single responsibility</li>
            <li>• Return consistent API (object or array)</li>
            <li>• Use TypeScript for better type safety</li>
            <li>• Document hook purpose and parameters</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CustomHooksCheatsheet;

