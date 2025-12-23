import { useState, useEffect, useLayoutEffect, useRef } from 'react';

function UseLayoutEffectHook() {
  const [count, setCount] = useState(0);
  const [width, setWidth] = useState(0);
  const divRef = useRef(null);

  // useEffect - runs after paint (async)
  useEffect(() => {
    console.log('useEffect: After paint');
    if (divRef.current) {
      const measuredWidth = divRef.current.offsetWidth;
      console.log('useEffect measured width:', measuredWidth);
    }
  }, [count]);

  // useLayoutEffect - runs before paint (synchronous)
  useLayoutEffect(() => {
    console.log('useLayoutEffect: Before paint');
    if (divRef.current) {
      const measuredWidth = divRef.current.offsetWidth;
      setWidth(measuredWidth);
      console.log('useLayoutEffect measured width:', measuredWidth);
    }
  }, [count]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useLayoutEffect Hook</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding useLayoutEffect</h3>
        <p className="text-blue-800 mb-2">
          useLayoutEffect is identical to useEffect, but it runs synchronously after all DOM mutations and before the browser 
          paints the screen. This makes it perfect for DOM measurements and updates that need to happen before the user sees 
          the visual change, preventing layout shifts and visual flicker.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Differences from useEffect:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Timing:</strong> Runs synchronously before paint (useEffect runs asynchronously after paint)</li>
            <li><strong>Blocking:</strong> Blocks browser painting until it completes</li>
            <li><strong>Use Case:</strong> DOM measurements and synchronous DOM updates</li>
            <li><strong>Performance:</strong> Can block rendering, so use sparingly</li>
            <li><strong>API:</strong> Same API as useEffect (function, dependencies)</li>
          </ul>
          <p className="mt-2"><strong>When to Use useLayoutEffect:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Measuring DOM elements (width, height, position)</li>
            <li>Updating DOM before paint to prevent flicker</li>
            <li>Tooltip positioning based on element measurements</li>
            <li>Animation setup that needs to happen before first paint</li>
            <li>Any DOM manipulation that must be synchronous</li>
          </ul>
          <p className="mt-2"><strong>When NOT to Use:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Data fetching (use useEffect instead)</li>
            <li>Event subscriptions (use useEffect instead)</li>
            <li>Any non-urgent side effect (use useEffect instead)</li>
            <li>Most use cases - useEffect is preferred for performance</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Synchronous Effects</h3>
        <p className="text-gray-700 mb-4">
          useLayoutEffect runs synchronously after all DOM mutations but before the browser paints.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <div
              ref={divRef}
              className="p-4 bg-blue-100 rounded mb-2"
              style={{ width: count * 50 + 100 }}
            >
              Width: {width}px (measured with useLayoutEffect)
            </div>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Change Width (Count: {count})
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Check console to see execution order
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`useLayoutEffect(() => {
  // Runs synchronously BEFORE browser paints
  // Good for DOM measurements and mutations
}, [dependencies]);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">DOM Measurements</h3>
        <p className="text-gray-700 mb-4">
          useLayoutEffect is perfect for measuring DOM elements before the browser paints.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <DOMMeasurementExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useLayoutEffect vs useEffect</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">useEffect</th>
                <th className="text-left p-2">useLayoutEffect</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Timing</td>
                <td className="p-2">After paint (async)</td>
                <td className="p-2">Before paint (sync)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Blocking</td>
                <td className="p-2">Non-blocking</td>
                <td className="p-2">Blocks paint</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Use Case</td>
                <td className="p-2">Data fetching, subscriptions</td>
                <td className="p-2">DOM measurements, visual updates</td>
              </tr>
              <tr>
                <td className="p-2">Performance</td>
                <td className="p-2">Better (non-blocking)</td>
                <td className="p-2">Can block UI if slow</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Use Cases and Performance</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <h4 className="font-semibold mb-2">✓ Good Use Cases:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-800 ml-4">
              <li>Measuring DOM elements (scroll position, size)</li>
              <li>Animations that need to start immediately</li>
              <li>Preventing visual flicker</li>
              <li>Tooltip positioning</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="font-semibold mb-2">⚠️ Performance Warning:</h4>
            <p className="text-sm text-yellow-800">
              useLayoutEffect blocks the browser from painting. Keep it fast! 
              If your effect is slow, it will make the UI feel sluggish.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Execution Order Example</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ExecutionOrderExample />
        </div>
      </section>
    </div>
  );
}

// DOM Measurement Example
function DOMMeasurementExample() {
  const [text, setText] = useState('Short');
  const [width, setWidth] = useState(0);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      const measuredWidth = textRef.current.offsetWidth;
      setWidth(measuredWidth);
    }
  }, [text]);

  return (
    <div className="p-4 bg-white rounded">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to change text"
        className="w-full px-3 py-2 border rounded mb-2"
      />
      <div ref={textRef} className="p-2 bg-blue-100 rounded inline-block">
        {text}
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Measured width: {width}px (measured synchronously before paint)
      </p>
    </div>
  );
}

// Execution Order Example
function ExecutionOrderExample() {
  const [count, setCount] = useState(0);

  console.log('1. Render phase');

  useLayoutEffect(() => {
    console.log('2. useLayoutEffect (before paint)');
    return () => {
      console.log('Cleanup useLayoutEffect');
    };
  }, [count]);

  useEffect(() => {
    console.log('3. useEffect (after paint)');
    return () => {
      console.log('Cleanup useEffect');
    };
  }, [count]);

  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm text-gray-700 mb-2">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment (Check console for order)
      </button>
      <p className="text-xs text-gray-600 mt-2">
        Execution order: Render → useLayoutEffect → Paint → useEffect
      </p>
    </div>
  );
}

export default UseLayoutEffectHook;

