import { useState, useDebugValue } from 'react';

// Custom hook with useDebugValue
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  useDebugValue(count, count => `Count: ${count}`);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Custom hook with formatted debug value
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  useDebugValue(value, value => 
    value ? 'ON' : 'OFF'
  );

  const toggle = () => setValue(v => !v);
  return [value, toggle];
}

// Custom hook with expensive debug formatting
function useExpensiveDebug(complexData) {
  const [data, setData] = useState(complexData);

  // Only format in dev mode
  useDebugValue(data, data => {
    // This only runs when React DevTools inspect the hook
    return `Items: ${data.items?.length || 0}, Status: ${data.status}`;
  });

  return [data, setData];
}

function UseDebugValueHook() {
  const { count, increment, decrement, reset } = useCounter(5);
  const [isOn, toggle] = useToggle(false);
  const [complexData] = useExpensiveDebug({ items: [1, 2, 3], status: 'active' });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useDebugValue Hook</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Hook Debugging</h3>
        <p className="text-gray-700 mb-4">
          useDebugValue provides a label for custom hooks in React DevTools.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Open React DevTools and inspect the components below to see useDebugValue in action!
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Count: {count}</p>
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
            <p className="text-xs text-gray-600 mt-2">
              Check React DevTools - you'll see "Count: {count}" label
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);
  
  useDebugValue(count, count => \`Count: \${count}\`);
  
  return { count, increment, decrement };
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Formatting Debug Values</h3>
        <p className="text-gray-700 mb-4">
          You can format the debug value for better readability in DevTools.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Toggle: {isOn ? 'ON' : 'OFF'}</p>
            <button
              onClick={toggle}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Toggle
            </button>
            <p className="text-xs text-gray-600 mt-2">
              Check DevTools - shows "ON" or "OFF" instead of true/false
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  useDebugValue(value, value => value ? 'ON' : 'OFF');
  
  return [value, toggle];
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">DevTools Integration</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">How to View useDebugValue:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Open React DevTools (browser extension)</li>
            <li>Select a component that uses the custom hook</li>
            <li>Look at the "Hooks" section</li>
            <li>You'll see the formatted debug value</li>
          </ol>
          <div className="mt-4 p-3 bg-white rounded">
            <p className="text-sm text-gray-700 mb-2">
              Example: In DevTools you might see:
            </p>
            <pre className="text-xs bg-gray-100 p-2 rounded">{`Hooks:
  useState: 5
  useCounter: Count: 5  ← This is from useDebugValue!`}</pre>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Consideration</h3>
        <p className="text-gray-700 mb-4">
          The formatter function only runs when React DevTools inspect the hook, not on every render.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-gray-700">
              Complex data: {JSON.stringify(complexData)}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              The expensive formatting only happens when DevTools inspects it
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Expensive formatting is safe
useDebugValue(complexData, data => {
  // This only runs when DevTools inspects
  return expensiveFormatting(data);
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
            <li>Only use in custom hooks, not regular components</li>
            <li>Use simple labels for simple values</li>
            <li>Use formatter function for complex values</li>
            <li>Don't worry about performance - formatter only runs in DevTools</li>
            <li>Helps other developers understand your hooks</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default UseDebugValueHook;

