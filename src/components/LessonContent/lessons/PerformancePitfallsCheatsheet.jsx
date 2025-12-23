import React from 'react';

function PerformancePitfallsCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Common Performance Pitfalls</h2>
      
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Avoid These Performance Issues</h3>
        <p className="text-red-800 mb-2">
          Common mistakes that cause performance problems. Know how to identify and fix them.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Unnecessary Re-renders</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// ❌ Bad: New object on every render
<ChildComponent style={{ color: 'red' }} />

// ✅ Good: Memoize or extract
const style = useMemo(() => ({ color: 'red' }), []);
<ChildComponent style={style} />

// ❌ Bad: New function on every render
<ChildComponent onClick={() => handleClick()} />

// ✅ Good: useCallback
const handleClick = useCallback(() => {
  // ...
}, []);
<ChildComponent onClick={handleClick} />`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Expensive Computations</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// ❌ Bad: Recalculates on every render
function Component({ items }) {
  const filtered = items.filter(item => item.active);
  return <List items={filtered} />;
}

// ✅ Good: Memoize
function Component({ items }) {
  const filtered = useMemo(
    () => items.filter(item => item.active),
    [items]
  );
  return <List items={filtered} />;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Memory Leaks</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// ❌ Bad: No cleanup
useEffect(() => {
  const interval = setInterval(() => {
    // ...
  }, 1000);
}, []);

// ✅ Good: Cleanup
useEffect(() => {
  const interval = setInterval(() => {
    // ...
  }, 1000);
  return () => clearInterval(interval);
}, []);`}</pre>
        </div>
      </section>
    </div>
  );
}

export default PerformancePitfallsCheatsheet;

