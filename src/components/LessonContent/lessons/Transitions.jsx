import { useState, useTransition, startTransition } from 'react';

// Simulate expensive operation
function generateItems(count) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(`Item ${i + 1}`);
  }
  return items;
}

function Transitions() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  // useTransition hook
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value); // Urgent update

    startTransition(() => {
      // Non-urgent update
      const items = generateItems(1000);
      setList(items.filter(item => item.toLowerCase().includes(value.toLowerCase())));
    });
  };

  // startTransition function (alternative to hook)
  const handleButtonClick = () => {
    setCount(count + 1); // Urgent

    startTransition(() => {
      // Non-urgent
      const items = generateItems(5000);
      setList(items);
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Transitions</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useTransition Hook Deep Dive</h3>
        <p className="text-gray-700 mb-4">
          useTransition returns a boolean indicating if a transition is pending, and a function to start transitions.
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
            <div className="max-h-40 overflow-y-auto mt-2 bg-white p-2 rounded border">
              {list.slice(0, 20).map((item, index) => (
                <div key={index} className="text-sm py-1">{item}</div>
              ))}
              {list.length > 20 && (
                <p className="text-xs text-gray-500">... and {list.length - 20} more</p>
              )}
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const [isPending, startTransition] = useTransition();

function handleChange(e) {
  setInput(e.target.value); // Urgent
  
  startTransition(() => {
    // Non-urgent - can be interrupted
    setList(expensiveFilter(input));
  });
}

{isPending && <Spinner />}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">startTransition Function</h3>
        <p className="text-gray-700 mb-4">
          You can also use startTransition directly without the hook if you don't need isPending.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Count: {count}</p>
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Increment & Generate Items
            </button>
            <p className="text-xs text-gray-600 mt-2">
              Count updates immediately, items generate in background
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`import { startTransition } from 'react';

function handleClick() {
  setCount(count + 1); // Urgent
  
  startTransition(() => {
    // Non-urgent
    setList(generateLargeList());
  });
}

// No need for isPending if you don't need loading state`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Urgent vs Non-Urgent Updates</h3>
        <p className="text-gray-700 mb-4">
          React prioritizes urgent updates (user interactions) over non-urgent updates (data processing).
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <UrgentVsNonUrgentExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Loading States Management</h3>
        <p className="text-gray-700 mb-4">
          Use isPending from useTransition to show loading states during transitions.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <LoadingStatesExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Transition Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Use Transitions For:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Filtering/sorting large lists</li>
            <li>Tab switching</li>
            <li>Search results</li>
            <li>Any non-urgent UI update</li>
            <li>Updates that can be interrupted</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">✗ Don't Use For:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>User input (use controlled inputs directly)</li>
            <li>Button clicks that need immediate feedback</li>
            <li>Critical UI updates</li>
            <li>Updates that must complete synchronously</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useTransition vs startTransition</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">useTransition</th>
                <th className="text-left p-2">startTransition</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">isPending state</td>
                <td className="p-2">✓ Available</td>
                <td className="p-2">❌ Not available</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Loading indicators</td>
                <td className="p-2">✓ Can show</td>
                <td className="p-2">❌ Cannot show</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Use case</td>
                <td className="p-2">Need loading state</td>
                <td className="p-2">Don't need loading state</td>
              </tr>
              <tr>
                <td className="p-2">Import</td>
                <td className="p-2">Hook (useTransition)</td>
                <td className="p-2">Function (startTransition)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Urgent vs Non-Urgent Example
function UrgentVsNonUrgentExample() {
  const [isPending, startTransition] = useTransition();
  const [urgentCount, setUrgentCount] = useState(0);
  const [nonUrgentData, setNonUrgentData] = useState([]);

  const handleUrgent = () => {
    setUrgentCount(urgentCount + 1); // Urgent - happens immediately
  };

  const handleNonUrgent = () => {
    startTransition(() => {
      // Non-urgent - can be interrupted
      const data = Array.from({ length: 10000 }, (_, i) => `Data ${i + 1}`);
      setNonUrgentData(data);
    });
  };

  return (
    <div className="p-4 bg-white rounded space-y-4">
      <div>
        <p className="text-sm font-semibold mb-2">Urgent Counter: {urgentCount}</p>
        <button
          onClick={handleUrgent}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Urgent Update (Immediate)
        </button>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">
          Non-Urgent Data: {nonUrgentData.length} items
          {isPending && <span className="text-blue-600 ml-2">⏳ Processing...</span>}
        </p>
        <button
          onClick={handleNonUrgent}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Non-Urgent Update (Can be interrupted)
        </button>
        <p className="text-xs text-gray-600 mt-2">
          Try clicking "Urgent Update" while non-urgent is processing - it interrupts!
        </p>
      </div>
    </div>
  );
}

// Loading States Example
function LoadingStatesExample() {
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (value) => {
    setFilter(value); // Urgent

    startTransition(() => {
      // Non-urgent
      const filtered = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)
        .filter(item => item.toLowerCase().includes(value.toLowerCase()));
      setItems(filtered);
    });
  };

  return (
    <div className="p-4 bg-white rounded">
      <input
        type="text"
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
        placeholder="Filter items"
        className="w-full px-3 py-2 border rounded mb-4"
      />
      {isPending ? (
        <div className="p-4 bg-blue-50 rounded text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-sm text-blue-600 mt-2">Filtering...</p>
        </div>
      ) : (
        <div className="max-h-40 overflow-y-auto">
          {items.slice(0, 10).map((item, index) => (
            <div key={index} className="text-sm py-1">{item}</div>
          ))}
          {items.length > 10 && (
            <p className="text-xs text-gray-500">... and {items.length - 10} more</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Transitions;

