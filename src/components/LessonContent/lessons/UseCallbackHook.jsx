import { useState, useCallback, memo } from 'react';

function UseCallbackHook() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Without useCallback - new function on every render
  const handleClickWithoutCallback = () => {
    console.log('Clicked without callback');
  };

  // With useCallback - same function reference
  const handleClickWithCallback = useCallback(() => {
    console.log('Clicked with callback');
  }, []); // Empty deps = function never changes

  // With dependencies
  const handleClickWithDeps = useCallback(() => {
    console.log(`Count is: ${count}`);
  }, [count]); // Recreated when count changes

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useCallback Hook</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Memoizing Callbacks</h3>
        <p className="text-gray-700 mb-4">
          useCallback returns a memoized version of the callback that only changes if dependencies change.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type to trigger re-render"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <p className="text-sm text-gray-600 mb-2">Count: {count}</p>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Increment
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const memoizedCallback = useCallback(() => {
  // callback logic
}, [dependencies]);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Dependency Arrays</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Empty Array [] - Never Changes</h4>
            <pre className="text-sm bg-white p-2 rounded">{`const callback = useCallback(() => {
  // This function reference never changes
}, []);`}</pre>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">With Dependencies - Changes When Deps Change</h4>
            <pre className="text-sm bg-white p-2 rounded">{`const callback = useCallback(() => {
  console.log(count);
}, [count]); // Recreated when count changes`}</pre>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">When to Use useCallback</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Good Use Cases:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Passing callbacks to memoized child components</li>
            <li>Callbacks used in useEffect dependencies</li>
            <li>Expensive callback creation</li>
            <li>Preventing unnecessary re-renders</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">✗ Don't Use For:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Simple callbacks that don't cause re-render issues</li>
            <li>Callbacks that change frequently anyway</li>
            <li>Premature optimization</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Implications</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <MemoizedChildExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Common Pitfalls</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="font-semibold mb-2">Pitfall 1: Missing Dependencies</h4>
            <pre className="text-sm bg-white p-2 rounded">{`// ❌ Wrong - missing dependency
const callback = useCallback(() => {
  console.log(count); // Uses count but not in deps
}, []); // Missing count!

// ✅ Correct
const callback = useCallback(() => {
  console.log(count);
}, [count]);`}</pre>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="font-semibold mb-2">Pitfall 2: Overusing useCallback</h4>
            <p className="text-sm text-yellow-800">
              useCallback itself has a small cost. Don't wrap every function - only when it provides real benefit.
            </p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="font-semibold mb-2">Pitfall 3: Stale Closures</h4>
            <pre className="text-sm bg-white p-2 rounded">{`// ❌ Stale closure
const callback = useCallback(() => {
  setCount(count + 1); // Uses stale count
}, []);

// ✅ Functional update
const callback = useCallback(() => {
  setCount(prev => prev + 1); // Always uses latest
}, []);`}</pre>
          </div>
        </div>
      </section>
    </div>
  );
}

// Memoized Child Example
function MemoizedChildExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Without useCallback - child re-renders on every parent render
  const handleClickWithout = () => {
    console.log('Without callback');
  };

  // With useCallback - child only re-renders when count changes
  const handleClickWith = useCallback(() => {
    console.log('With callback, count:', count);
  }, [count]);

  return (
    <div className="p-4 bg-white rounded">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type to trigger re-render"
        className="w-full px-3 py-2 border rounded mb-4"
      />
      <p className="text-sm text-gray-600 mb-4">
        Count: {count} | Name: {name}
      </p>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold mb-2">Without useCallback:</p>
          <MemoizedButton onClick={handleClickWithout} label="Click Me (re-renders always)" />
        </div>
        <div>
          <p className="text-sm font-semibold mb-2">With useCallback:</p>
          <MemoizedButton onClick={handleClickWith} label="Click Me (re-renders only when count changes)" />
        </div>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Increment Count
        </button>
      </div>
    </div>
  );
}

// Memoized button component
const MemoizedButton = memo(({ onClick, label }) => {
  console.log(`Rendering button: ${label}`);
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      {label} (Check console for renders)
    </button>
  );
});

export default UseCallbackHook;

