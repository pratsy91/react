import { useState, useEffect } from 'react';

function ComponentLifecycle() {
  const [showChild, setShowChild] = useState(true);
  const [renderCount, setRenderCount] = useState(0);

  // Track renders
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Component Lifecycle</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Mount, Update, Unmount Phases</h3>
        <p className="text-gray-700 mb-4">
          React components go through three main phases during their lifetime.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Component has rendered: {renderCount} times</p>
            <button
              onClick={() => setShowChild(!showChild)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showChild ? 'Unmount' : 'Mount'} Child Component
            </button>
          </div>
          {showChild && <LifecycleDemo />}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Lifecycle Phases Explained</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
            <h4 className="font-semibold text-green-900 mb-2">1. Mount</h4>
            <p className="text-sm text-green-800">
              Component is created and inserted into the DOM for the first time.
            </p>
            <ul className="text-xs text-green-700 mt-2 list-disc list-inside">
              <li>Initial render</li>
              <li>useEffect with [] runs</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
            <h4 className="font-semibold text-blue-900 mb-2">2. Update</h4>
            <p className="text-sm text-blue-800">
              Component re-renders when props or state change.
            </p>
            <ul className="text-xs text-blue-700 mt-2 list-disc list-inside">
              <li>State/props change</li>
              <li>Parent re-renders</li>
              <li>useEffect with deps runs</li>
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
            <h4 className="font-semibold text-red-900 mb-2">3. Unmount</h4>
            <p className="text-sm text-red-800">
              Component is removed from the DOM.
            </p>
            <ul className="text-xs text-red-700 mt-2 list-disc list-inside">
              <li>Component removed</li>
              <li>Cleanup functions run</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Lifecycle Equivalents in Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Class Component</th>
                <th className="text-left p-2">Hooks Equivalent</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2"><code>componentDidMount</code></td>
                <td className="p-2"><code>{'useEffect(() => {}, [])'}</code></td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>componentDidUpdate</code></td>
                <td className="p-2"><code>{'useEffect(() => {})'}</code></td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>componentWillUnmount</code></td>
                <td className="p-2"><code>{'useEffect(() => { return () => {} }, [])'}</code></td>
              </tr>
              <tr>
                <td className="p-2"><code>{'componentDidUpdate(prevProps)'}</code></td>
                <td className="p-2"><code>{'useEffect(() => {}, [prop])'}</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Understanding Re-renders</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">When Components Re-render:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
              <li>State changes (useState, useReducer)</li>
              <li>Props change</li>
              <li>Parent component re-renders</li>
              <li>Context value changes</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">React's Rendering Process:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-4">
              <li>Trigger: State/props change</li>
              <li>Render: Component function runs</li>
              <li>Commit: React updates the DOM</li>
              <li>Effects: useEffect runs after commit</li>
            </ol>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Rendering Behavior</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <h4 className="font-semibold mb-2">React's Rendering Rules:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
              <li><strong>Render is pure:</strong> Same props/state = same output</li>
              <li><strong>Render can be interrupted:</strong> React can pause and resume rendering</li>
              <li><strong>Effects run after render:</strong> Side effects happen after DOM updates</li>
              <li><strong>Batching:</strong> Multiple state updates are batched together</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm text-blue-800">
              <strong>React 18:</strong> Automatic batching groups all state updates, even in async functions and event handlers.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Optimizing Re-renders</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Prevent unnecessary re-renders with React.memo
const MemoizedComponent = React.memo(MyComponent);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Use useCallback for stable function references
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);`}</pre>
        </div>
      </section>
    </div>
  );
}

// Demo component to show lifecycle
function LifecycleDemo() {
  const [count, setCount] = useState(0);

  // Mount
  useEffect(() => {
    console.log('✅ Component mounted');
    return () => {
      console.log('❌ Component will unmount');
    };
  }, []);

  // Update
  useEffect(() => {
    console.log(`🔄 Component updated, count: ${count}`);
  }, [count]);

  return (
    <div className="mt-4 p-4 bg-white rounded border-2 border-blue-300">
      <p className="text-sm text-gray-700 mb-2">Child Component (check console)</p>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Count: {count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          Increment
        </button>
      </div>
    </div>
  );
}

export default ComponentLifecycle;

