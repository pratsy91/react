import { useState, useMemo } from 'react';

// Expensive calculation function
function expensiveCalculation(n) {
  console.log('Calculating...');
  let result = 0;
  for (let i = 0; i < 1000000 * n; i++) {
    result += i;
  }
  return result;
}

function UseMemoHook() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  // Without useMemo - recalculates on every render
  const expensiveValueWithoutMemo = expensiveCalculation(count);

  // With useMemo - only recalculates when count changes
  const expensiveValueWithMemo = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  // Memoized filtered array
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item > 2);
  }, [items]);

  // Memoized object
  const memoizedObject = useMemo(() => ({
    count,
    doubled: count * 2
  }), [count]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useMemo Hook</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding useMemo</h3>
        <p className="text-blue-800 mb-2">
          useMemo is a React Hook that memoizes the result of an expensive computation. It returns the memoized value and 
          only recalculates it when one of the dependencies has changed. This helps optimize performance by avoiding expensive 
          calculations on every render.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Memoization:</strong> Caches the result of a computation</li>
            <li><strong>Dependency Array:</strong> Value is recalculated when dependencies change</li>
            <li><strong>Expensive Calculations:</strong> Use for computationally expensive operations</li>
            <li><strong>Reference Stability:</strong> Useful for object/array references passed as props</li>
            <li><strong>Not Guaranteed:</strong> React may discard memoized values between renders</li>
          </ul>
          <p className="mt-2"><strong>When to Use useMemo:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>For expensive calculations that depend on specific values</li>
            <li>When creating objects/arrays that are dependencies of other hooks</li>
            <li>To prevent unnecessary recalculations in child components</li>
            <li>When filtering, sorting, or transforming large arrays/lists</li>
          </ul>
          <p className="mt-2"><strong>When NOT to Use:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>For simple calculations (overhead isn't worth it)</li>
            <li>For every value (premature optimization)</li>
            <li>When dependencies change frequently (little benefit)</li>
            <li>As a guarantee of referential equality (it's an optimization hint)</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Memoizing Values</h3>
        <p className="text-gray-700 mb-4">
          useMemo returns a memoized value that only recalculates when dependencies change.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Count: {count}</p>
            <p className="text-sm text-gray-600 mb-2">Other State: {otherState}</p>
            <div className="space-x-2">
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Increment Count
              </button>
              <button
                onClick={() => setOtherState(otherState + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Change Other State
              </button>
            </div>
            <p className="text-sm text-yellow-700 mt-4">
              Check console - see when calculations run!
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Expensive Calculations</h3>
        <p className="text-gray-700 mb-4">
          useMemo prevents expensive calculations from running on every render.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">
              Without useMemo: Recalculates on every render (even when otherState changes)
            </p>
            <p className="text-sm text-gray-700 mb-2">
              With useMemo: Only recalculates when count changes
            </p>
            <p className="text-sm font-semibold">
              Memoized Value: {expensiveValueWithMemo}
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// ❌ Without useMemo - runs every render
const value = expensiveCalculation(count);

// ✅ With useMemo - only when count changes
const value = useMemo(() => {
  return expensiveCalculation(count);
}, [count]);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Referential Equality</h3>
        <p className="text-gray-700 mb-4">
          useMemo ensures object/array references stay the same when dependencies don't change.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ReferentialEqualityExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">When to Use useMemo</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Good Use Cases:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Expensive calculations (loops, complex math)</li>
            <li>Creating objects/arrays passed as props to memoized components</li>
            <li>Derived data that's expensive to compute</li>
            <li>Stabilizing references for useEffect dependencies</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">✗ Don't Use For:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Simple calculations (addition, string concatenation)</li>
            <li>Primitive values (numbers, strings, booleans)</li>
            <li>Premature optimization</li>
            <li>Every single value</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Optimization</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">Filtered Items (memoized):</p>
            <ul className="list-disc list-inside ml-4">
              {filteredItems.map((item, index) => (
                <li key={index} className="text-sm">{item}</li>
              ))}
            </ul>
            <button
              onClick={() => setItems([...items, items.length + 1])}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Item
            </button>
            <p className="text-xs text-gray-600 mt-2">
              Check console - filtering only runs when items change
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const filteredItems = useMemo(() => {
  return items.filter(item => item > 2);
}, [items]); // Only recalculates when items change`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Common Patterns</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Memoized Object for Props</h4>
            <pre className="text-sm bg-white p-2 rounded">{`const config = useMemo(() => ({
  theme: 'dark',
  count: count
}), [count]);

<ChildComponent config={config} />`}</pre>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Memoized Array Transformations</h4>
            <pre className="text-sm bg-white p-2 rounded">{`const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a - b);
}, [items]);`}</pre>
          </div>
        </div>
      </section>
    </div>
  );
}

// Referential Equality Example
function ReferentialEqualityExample() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Without useMemo - new object every render
  const objectWithoutMemo = { count, doubled: count * 2 };

  // With useMemo - same object reference when count unchanged
  const objectWithMemo = useMemo(() => ({
    count,
    doubled: count * 2
  }), [count]);

  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm text-gray-700 mb-2">Count: {count} | Other: {other}</p>
      <div className="space-x-2 mb-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Change Count
        </button>
        <button
          onClick={() => setOther(other + 1)}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          Change Other
        </button>
      </div>
      <div className="text-xs text-gray-600 space-y-1">
        <p>Without memo: {objectWithoutMemo === objectWithoutMemo ? 'Same' : 'Different'} (always different on re-render)</p>
        <p>With memo: {objectWithMemo === objectWithMemo ? 'Same' : 'Different'} (same when count unchanged)</p>
      </div>
    </div>
  );
}

export default UseMemoHook;

