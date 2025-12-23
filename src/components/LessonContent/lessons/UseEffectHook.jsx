import { useState, useEffect } from 'react';

function UseEffectHook() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showTimer, setShowTimer] = useState(true);

  // Basic effect - runs after every render
  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  // Effect with empty dependency array - runs once on mount
  useEffect(() => {
    console.log('Component mounted!');
    return () => {
      console.log('Component will unmount!');
    };
  }, []);

  // Effect with dependencies - runs when count changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]);

  // Cleanup function example
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetching data with useEffect
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!cancelled) {
          setData({ message: 'Data loaded successfully!' });
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Error:', error);
        }
      }
    };

    fetchData();

    // Cleanup: prevent state update if component unmounts
    return () => {
      cancelled = true;
    };
  }, []);

  // Multiple effects
  useEffect(() => {
    console.log('Effect 1: Runs on every render');
  });

  useEffect(() => {
    console.log('Effect 2: Runs only on mount');
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useEffect Hook</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding useEffect</h3>
        <p className="text-blue-800 mb-2">
          useEffect is a Hook that lets you perform side effects in function components. Side effects are operations 
          that interact with the outside world: data fetching, subscriptions, timers, manually changing the DOM, etc.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Side Effects:</strong> Operations that don't affect the component's output directly</li>
            <li><strong>After Render:</strong> Effects run after the browser has painted the screen</li>
            <li><strong>Dependency Array:</strong> Controls when the effect re-runs</li>
            <li><strong>Cleanup:</strong> Functions returned from effects clean up subscriptions, timers, etc.</li>
            <li><strong>Multiple Effects:</strong> Split different concerns into separate effects</li>
          </ul>
          <p className="mt-2"><strong>Common Use Cases:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Fetching data from APIs</li>
            <li>Setting up subscriptions or event listeners</li>
            <li>Manually changing the DOM</li>
            <li>Timers and intervals</li>
            <li>Logging and analytics</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Basic Effects</h3>
        <p className="text-gray-700 mb-4">
          useEffect lets you perform side effects in function components. It runs after every render by default.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Count: {count}</p>
            <p className="text-sm text-gray-600 mb-2">
              Check the browser tab title - it updates with the count!
            </p>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Increment
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`useEffect(() => {
  document.title = \`Count: \${count}\`;
}); // Runs after every render`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Cleanup Functions</h3>
        <p className="text-gray-700 mb-4">
          Return a cleanup function from useEffect to clean up subscriptions, timers, or event listeners.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">Window Width: {windowWidth}px</p>
          <p className="text-sm text-gray-600 mb-2">
            Resize the window to see the width update. Check console for cleanup messages.
          </p>
          <pre className="text-sm bg-white p-2 rounded">{`useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Dependency Arrays</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Empty Array [] - Runs Once on Mount</h4>
            <pre className="text-sm bg-white p-2 rounded">{`useEffect(() => {
  console.log('Runs only once');
}, []); // Empty array = run once`}</pre>
            <p className="text-sm text-gray-600 mt-2">Check console - "Component mounted!" appears once</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">With Dependencies - Runs When Dependencies Change</h4>
            <pre className="text-sm bg-white p-2 rounded">{`useEffect(() => {
  console.log(\`Count: \${count}\`);
}, [count]); // Runs when count changes`}</pre>
            <p className="text-sm text-gray-600 mt-2">Click increment button and check console</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">No Array - Runs After Every Render</h4>
            <pre className="text-sm bg-white p-2 rounded">{`useEffect(() => {
  // Runs after every render
}); // No dependency array`}</pre>
            <p className="text-sm text-yellow-700 mt-2">
              ⚠️ Use with caution - can cause performance issues!
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Multiple Effects</h3>
        <p className="text-gray-700 mb-4">
          You can use multiple useEffect hooks to separate concerns. Each effect handles a different side effect.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Separate effects for different concerns
useEffect(() => {
  // Handle document title
  document.title = \`Count: \${count}\`;
});

useEffect(() => {
  // Handle window resize
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Effect Execution Timing</h3>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Timing:</strong> Effects run after the browser has painted the screen.
          </p>
          <p className="text-sm text-blue-800">
            This ensures effects don't block the browser from updating the screen.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Component renders</li>
            <li>Browser paints the screen</li>
            <li>useEffect runs</li>
            <li>If cleanup function exists, it runs before the next effect</li>
          </ol>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Fetching Data with useEffect</h3>
        <p className="text-gray-700 mb-4">
          useEffect is perfect for fetching data when a component mounts or when dependencies change.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            {data ? (
              <p className="text-green-600 font-semibold">{data.message}</p>
            ) : (
              <p className="text-gray-600">Loading data...</p>
            )}
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`useEffect(() => {
  let cancelled = false;

  const fetchData = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    
    if (!cancelled) {
      setData(data);
    }
  };

  fetchData();

  // Cleanup: prevent state update if component unmounts
  return () => {
    cancelled = true;
  };
}, []);`}</pre>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Always handle cleanup to prevent state updates on unmounted components (race conditions).
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Race Conditions in Effects</h3>
        <p className="text-gray-700 mb-4">
          When fetching data, multiple requests can complete out of order. Use cleanup to ignore stale responses.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`useEffect(() => {
  let cancelled = false;

  async function fetchData() {
    const data = await fetch('/api/data');
    
    // Only update if component is still mounted
    if (!cancelled) {
      setData(data);
    }
  }

  fetchData();

  // Cleanup marks request as cancelled
  return () => {
    cancelled = true;
  };
}, [userId]); // Re-fetch when userId changes`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Effect Dependencies Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <h4 className="font-semibold mb-2">✓ Include all values from component scope</h4>
            <pre className="text-sm bg-white p-2 rounded">{`const [count, setCount] = useState(0);
const [name, setName] = useState('');

useEffect(() => {
  console.log(count, name);
}, [count, name]); // Include all dependencies`}</pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">✓ Use ESLint rule: exhaustive-deps</h4>
            <p className="text-sm text-gray-600">
              React's ESLint plugin will warn you about missing dependencies.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">✓ Functions as dependencies</h4>
            <pre className="text-sm bg-white p-2 rounded">{`const fetchUser = useCallback(() => {
  // fetch logic
}, []);

useEffect(() => {
  fetchUser();
}, [fetchUser]); // Include function if it's a dependency`}</pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UseEffectHook;

