import { useState, useTransition } from 'react';

// Simulate expensive operation
function generateItems(count) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(`Item ${i + 1}`);
  }
  return items;
}

function UseTransitionHook() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value); // Urgent update

    // Mark this as a transition (non-urgent)
    startTransition(() => {
      const items = generateItems(1000); // Expensive operation
      setList(items.filter(item => item.toLowerCase().includes(value.toLowerCase())));
    });
  };

  const handleUrgentUpdate = () => {
    setCount(count + 1); // This is urgent and happens immediately
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useTransition Hook (React 18)</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding useTransition</h3>
        <p className="text-blue-800 mb-2">
          useTransition is a React 18 Hook that lets you mark state updates as transitions. Transitions are non-urgent updates 
          that can be interrupted by more urgent updates (like user input), keeping the UI responsive during expensive operations.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Urgent vs Non-urgent:</strong> Distinguishes between urgent and non-urgent updates</li>
            <li><strong>Interruptible:</strong> Non-urgent updates can be interrupted by urgent ones</li>
            <li><strong>isPending:</strong> Boolean indicating if a transition is pending</li>
            <li><strong>startTransition:</strong> Function to mark updates as transitions</li>
            <li><strong>Better UX:</strong> Keeps UI responsive during heavy computations</li>
          </ul>
          <p className="mt-2"><strong>When to Use:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Filtering or sorting large lists while user types</li>
            <li>Rendering heavy components that don't need immediate updates</li>
            <li>Tab switching or navigation that doesn't need to block UI</li>
            <li>Any expensive state update that can be deferred</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>UI stays responsive during expensive operations</li>
            <li>Better perceived performance</li>
            <li>Prioritizes user interactions</li>
            <li>Prevents UI from freezing</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Concurrent Rendering</h3>
        <p className="text-gray-700 mb-4">
          useTransition lets you mark updates as non-urgent transitions, keeping the UI responsive.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type to filter (non-urgent update)"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            {isPending && (
              <p className="text-sm text-blue-600">⏳ Updating list...</p>
            )}
            <div className="max-h-40 overflow-y-auto mt-2">
              {list.slice(0, 20).map((item, index) => (
                <div key={index} className="text-sm py-1">{item}</div>
              ))}
              {list.length > 20 && <p className="text-xs text-gray-500">... and {list.length - 20} more</p>}
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const [isPending, startTransition] = useTransition();

function handleChange(e) {
  setInput(e.target.value); // Urgent
  
  startTransition(() => {
    // Non-urgent - can be interrupted
    setList(expensiveFilter(input));
  });
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Marking Updates as Transitions</h3>
        <p className="text-gray-700 mb-4">
          Wrap non-urgent state updates in startTransition to keep the UI responsive.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Urgent Counter: {count}</p>
            <button
              onClick={handleUrgentUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Increment (Urgent - happens immediately)
            </button>
            <p className="text-xs text-gray-600 mt-2">
              Notice: Typing in the input above doesn't block this button!
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Urgent update - happens immediately
setCount(count + 1);

// Non-urgent transition - can be interrupted
startTransition(() => {
  setList(expensiveCalculation());
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">isPending State</h3>
        <p className="text-gray-700 mb-4">
          isPending tells you when a transition is in progress, perfect for showing loading states.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <IsPendingExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">UI Responsiveness</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Without useTransition:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
              <li>Expensive updates block the UI</li>
              <li>Input feels laggy</li>
              <li>Buttons don't respond immediately</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">With useTransition:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
              <li>UI stays responsive</li>
              <li>Input feels smooth</li>
              <li>Urgent updates happen immediately</li>
              <li>Non-urgent updates can be interrupted</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Use for:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Filtering/sorting large lists</li>
            <li>Tab switching</li>
            <li>Search results</li>
            <li>Any non-urgent UI update</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">✗ Don't use for:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>User input (use controlled inputs)</li>
            <li>Button clicks that need immediate feedback</li>
            <li>Critical UI updates</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// IsPending Example
function IsPendingExample() {
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState([]);

  const loadItems = () => {
    startTransition(() => {
      const newItems = generateItems(5000);
      setItems(newItems);
    });
  };

  return (
    <div className="p-4 bg-white rounded">
      <button
        onClick={loadItems}
        disabled={isPending}
        className={`px-4 py-2 rounded ${
          isPending 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {isPending ? 'Loading...' : 'Load Items'}
      </button>
      {isPending && (
        <p className="text-sm text-blue-600 mt-2">⏳ Transition in progress...</p>
      )}
      <p className="text-sm text-gray-600 mt-2">
        Items loaded: {items.length}
      </p>
    </div>
  );
}

export default UseTransitionHook;

