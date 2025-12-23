import { useState } from 'react';

function StateManagement() {
  // Basic useState
  const [count, setCount] = useState(0);
  
  // State with objects
  const [user, setUser] = useState({ name: 'John', age: 25 });
  
  // State with arrays
  const [items, setItems] = useState(['Apple', 'Banana']);
  
  // Multiple state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Lazy initial state
  const [expensiveValue] = useState(() => {
    console.log('Computing expensive value...');
    return 42 * 2;
  });

  // Functional updates
  const increment = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1); // Batching example
  };

  // Update object state
  const updateUser = () => {
    setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }));
  };

  // Update array state
  const addItem = () => {
    setItems(prevItems => [...prevItems, `Item ${prevItems.length + 1}`]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">State Management (useState)</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding State in React</h3>
        <p className="text-blue-800 mb-2">
          State is data that changes over time in a component. When state changes, React re-renders the component 
          to reflect the new data. The useState hook is the primary way to manage local component state in function components.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Local State:</strong> useState manages state local to the component where it's declared</li>
            <li><strong>Re-renders:</strong> State updates trigger component re-renders with the new values</li>
            <li><strong>Immutability:</strong> State should be treated as immutable - always create new objects/arrays</li>
            <li><strong>Functional Updates:</strong> Use functional form when new state depends on previous state</li>
            <li><strong>Batching:</strong> React batches multiple state updates for performance</li>
          </ul>
          <p className="mt-2"><strong>When to Use State:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Data that changes over time and affects what's rendered</li>
            <li>User input, form data, UI state (open/closed, active/inactive)</li>
            <li>Data fetched from APIs that needs to be displayed</li>
            <li>Any value that when changed should trigger a re-render</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useState Hook Basics</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">How useState Works</h4>
          <p className="text-gray-700 mb-3">
            useState returns an array with exactly two elements: the current state value and a function to update it. 
            You can call useState multiple times in a component to manage multiple pieces of state independently.
          </p>
          <p className="text-gray-700 mb-3">
            <strong>Initial Value:</strong> The argument passed to useState is the initial state value. It's only used 
            on the first render. For expensive initial values, you can pass a function that computes it (lazy initialization).
          </p>
          <p className="text-gray-700">
            <strong>State Updates:</strong> Always use the setter function to update state. Never mutate state directly. 
            React uses Object.is() comparison to determine if state has changed.
          </p>
        </div>
        <p className="text-gray-700 mb-4">
          useState is a Hook that lets you add React state to function components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setCount(count - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
            <span className="text-2xl font-bold text-gray-900">Count: {count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>+</button>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Functional Updates</h3>
        <p className="text-gray-700 mb-4">
          Use functional updates when the new state depends on the previous state.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <button
            onClick={increment}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
          >
            Increment Twice (Functional Update)
          </button>
          <p className="text-sm text-gray-600 mb-2">
            Click the button - it increments by 2 because both updates use the previous state.
          </p>
          <pre className="text-sm bg-white p-2 rounded">{`setCount(prevCount => prevCount + 1);
setCount(prevCount => prevCount + 1); // Uses updated value`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">State Batching</h3>
        <p className="text-gray-700 mb-4">
          React batches state updates for performance. Multiple setState calls in the same function are batched together.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-800">
            React 18 automatically batches all state updates, even in async functions and event handlers.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">State with Objects</h3>
        <p className="text-gray-700 mb-4">
          Always create a new object when updating state to ensure React detects the change.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-gray-700">Name: {user.name}</p>
            <p className="text-gray-700">Age: {user.age}</p>
            <button
              onClick={updateUser}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Increment Age
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const [user, setUser] = useState({ name: 'John', age: 25 });

// Correct: Create new object
setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }));

// Wrong: Mutating state directly
user.age = 26; // Don't do this!`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">State with Arrays</h3>
        <p className="text-gray-700 mb-4">
          Similar to objects, always create a new array when updating state.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ul className="mb-4 space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-gray-700">• {item}</li>
            ))}
          </ul>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Item
          </button>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const [items, setItems] = useState(['Apple', 'Banana']);

// Add item
setItems(prevItems => [...prevItems, 'Cherry']);

// Remove item
setItems(prevItems => prevItems.filter(item => item !== 'Apple'));`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Lazy Initial State</h3>
        <p className="text-gray-700 mb-4">
          Pass a function to useState to compute initial state only once, avoiding expensive calculations on every render.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">Expensive Value: {expensiveValue}</p>
          <p className="text-sm text-gray-600 mb-2">
            Check console - the function only runs once, not on every render!
          </p>
          <pre className="text-sm bg-white p-2 rounded">{`// Expensive calculation only runs once
const [value] = useState(() => {
  return expensiveCalculation();
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Multiple State Variables vs Single Object</h3>
        <p className="text-gray-700 mb-4">
          You can use multiple useState calls or a single state object. Choose based on your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Multiple Variables:</h4>
            <div className="space-y-2 mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <pre className="text-sm bg-white p-2 rounded">{`const [name, setName] = useState('');
const [email, setEmail] = useState('');`}</pre>
            <p className="text-xs text-gray-600 mt-2">✓ Better when values update independently</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Single Object:</h4>
            <pre className="text-sm bg-white p-2 rounded">{`const [form, setForm] = useState({
  name: '',
  email: ''
});

setForm(prev => ({
  ...prev,
  name: 'John'
}));`}</pre>
            <p className="text-xs text-gray-600 mt-2">✓ Better when values update together</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StateManagement;

