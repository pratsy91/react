import { useState, memo } from 'react';

// Regular component (re-renders on every parent render)
function RegularChild({ name, count }) {
  console.log('RegularChild rendered');
  return (
    <div className="p-3 bg-red-50 rounded">
      <p className="text-sm">Regular: {name} - Count: {count}</p>
    </div>
  );
}

// Memoized component (only re-renders when props change)
const MemoizedChild = memo(function MemoizedChild({ name, count }) {
  console.log('MemoizedChild rendered');
  return (
    <div className="p-3 bg-green-50 rounded">
      <p className="text-sm">Memoized: {name} - Count: {count}</p>
    </div>
  );
});

// Component with custom comparison
const CustomMemoizedChild = memo(
  function CustomMemoizedChild({ user }) {
    console.log('CustomMemoizedChild rendered');
    return (
      <div className="p-3 bg-blue-50 rounded">
        <p className="text-sm">User: {user.name} ({user.age})</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props are different (re-render)
    return prevProps.user.name === nextProps.user.name &&
           prevProps.user.age === nextProps.user.age;
  }
);

function ReactMemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  const [otherState, setOtherState] = useState(0);
  const [user, setUser] = useState({ name: 'Alice', age: 25 });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React.memo</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Component Memoization</h3>
        <p className="text-gray-700 mb-4">
          React.memo is a higher-order component that memoizes the result, preventing re-renders when props haven't changed.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">Count: {count} | Name: {name} | Other: {otherState}</p>
            <div className="space-x-2 mb-4">
              <button
                onClick={() => setCount(count + 1)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Change Count
              </button>
              <button
                onClick={() => setName(name === 'John' ? 'Jane' : 'John')}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Change Name
              </button>
              <button
                onClick={() => setOtherState(otherState + 1)}
                className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
              >
                Change Other
              </button>
            </div>
            <div className="space-y-2">
              <RegularChild name={name} count={count} />
              <MemoizedChild name={name} count={count} />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Check console - RegularChild re-renders on every state change, 
              MemoizedChild only when name or count changes
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Regular component
function Child({ name }) {
  return <div>{name}</div>;
}

// Memoized component
const MemoizedChild = memo(function Child({ name }) {
  return <div>{name}</div>;
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Comparison Functions</h3>
        <p className="text-gray-700 mb-4">
          You can provide a custom comparison function to control when the component should re-render.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">
              User: {user.name} ({user.age})
            </p>
            <div className="space-x-2 mb-4">
              <button
                onClick={() => setUser({ ...user, name: user.name === 'Alice' ? 'Bob' : 'Alice' })}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Change Name
              </button>
              <button
                onClick={() => setUser({ ...user, age: user.age + 1 })}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Change Age
              </button>
              <button
                onClick={() => setUser({ name: user.name, age: user.age })}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
              >
                Same Object (Different Reference)
              </button>
            </div>
            <CustomMemoizedChild user={user} />
            <p className="text-xs text-gray-600 mt-2">
              Custom comparison only checks name and age, ignores object reference
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const Memoized = memo(
  Component,
  (prevProps, nextProps) => {
    // Return true if equal (skip re-render)
    // Return false if different (re-render)
    return prevProps.user.name === nextProps.user.name;
  }
);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">When to Use memo</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Good Use Cases:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Expensive components that render frequently</li>
            <li>Components that receive the same props often</li>
            <li>List items that don't change often</li>
            <li>Components with many child components</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">✗ Don't Use For:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Simple components (memo has its own cost)</li>
            <li>Components that always receive new props</li>
            <li>Premature optimization</li>
            <li>Components with frequently changing props</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Shallow Comparison</h3>
        <p className="text-gray-700 mb-4">
          React.memo uses shallow comparison by default - it compares props using Object.is().
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ShallowComparisonExample />
        </div>
      </section>
    </div>
  );
}

// Shallow Comparison Example
function ShallowComparisonExample() {
  const [count, setCount] = useState(0);
  
  // New object on every render
  const obj1 = { value: count };
  
  // Same object reference
  const obj2 = useState({ value: 0 })[0];

  const MemoizedWithObject = memo(function MemoizedWithObject({ data }) {
    console.log('MemoizedWithObject rendered');
    return <div className="p-2 bg-yellow-50 rounded text-sm">Value: {data.value}</div>;
  });

  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm text-gray-700 mb-2">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm mb-4"
      >
        Increment
      </button>
      <div className="space-y-2">
        <div>
          <p className="text-xs text-gray-600 mb-1">New object every render (re-renders):</p>
          <MemoizedWithObject data={obj1} />
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Same object reference (doesn't re-render):</p>
          <MemoizedWithObject data={obj2} />
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-2">
        Shallow comparison checks object reference, not deep equality
      </p>
    </div>
  );
}

export default ReactMemo;

