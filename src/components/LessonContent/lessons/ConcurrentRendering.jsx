import { useState, startTransition, flushSync } from 'react';

// Simulate expensive rendering
function ExpensiveList({ items }) {
  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <div key={index} className="p-2 bg-gray-100 rounded text-sm">
          Item {item}
        </div>
      ))}
    </div>
  );
}

function ConcurrentRendering() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [isUrgent, setIsUrgent] = useState(false);

  // Automatic batching example
  const handleBatchedUpdate = () => {
    // React 18 batches these automatically
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    console.log('All updates batched together!');
  };

  // startTransition example
  const handleTransition = () => {
    setInput(''); // Urgent update - happens immediately
    
    // Non-urgent update - can be interrupted
    startTransition(() => {
      const newItems = Array.from({ length: 1000 }, (_, i) => i + 1);
      setItems(newItems);
    });
  };

  // Priority-based rendering
  const handleUrgentUpdate = () => {
    setIsUrgent(true);
    setCount(count + 1); // Urgent - happens immediately
    
    startTransition(() => {
      // Non-urgent - can be interrupted
      const newItems = Array.from({ length: 5000 }, (_, i) => i + 1);
      setItems(newItems);
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Concurrent Rendering</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Concurrent Rendering</h3>
        <p className="text-blue-800 mb-2">
          Concurrent Rendering is a set of features in React 18 that allows React to interrupt, pause, resume, or abandon work. 
          This enables React to prepare multiple versions of the UI simultaneously, prioritize urgent updates, and keep the UI 
          responsive even during expensive rendering operations.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Interruptible Rendering:</strong> React can interrupt rendering to handle urgent updates</li>
            <li><strong>Priority Updates:</strong> Urgent updates (user input) take priority over non-urgent ones</li>
            <li><strong>Automatic Batching:</strong> Multiple state updates are batched together automatically</li>
            <li><strong>Transitions:</strong> Mark updates as non-urgent using startTransition</li>
            <li><strong>Better UX:</strong> UI stays responsive during heavy computations</li>
          </ul>
          <p className="mt-2"><strong>Concurrent Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Automatic Batching:</strong> All updates batched by default (even in async functions)</li>
            <li><strong>Transitions:</strong> Mark non-urgent updates with startTransition</li>
            <li><strong>Suspense Improvements:</strong> Better integration with Suspense</li>
            <li><strong>Concurrent Mode:</strong> Enabled automatically in React 18</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>UI stays responsive during expensive renders</li>
            <li>Better perceived performance</li>
            <li>Prioritizes user interactions</li>
            <li>Reduces layout thrashing</li>
            <li>Enables new Suspense features</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatic Batching</h3>
        <p className="text-gray-700 mb-4">
          React 18 automatically batches all state updates, even in async functions and event handlers.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Count: {count}</p>
            <button
              onClick={handleBatchedUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Triple Increment (Batched)
            </button>
            <p className="text-xs text-gray-600 mt-2">
              Check console - all three updates are batched into one render!
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// React 18: All batched automatically
function handleClick() {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
  // Only one re-render!
}

// Works in async too!
setTimeout(() => {
  setCount(c => c + 1);
  setCount(c => c + 1);
  // Still batched!
}, 1000);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">startTransition API</h3>
        <p className="text-gray-700 mb-4">
          startTransition marks updates as non-urgent, allowing React to keep the UI responsive.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here (stays responsive)"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <button
              onClick={handleTransition}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Generate 1000 Items (Non-urgent)
            </button>
            <p className="text-xs text-gray-600 mt-2">
              Notice: Input stays responsive even while generating items!
            </p>
            <div className="mt-4 max-h-40 overflow-y-auto">
              <ExpensiveList items={items.slice(0, 20)} />
              {items.length > 20 && (
                <p className="text-xs text-gray-500">... and {items.length - 20} more</p>
              )}
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`import { startTransition } from 'react';

function handleChange(e) {
  setInput(e.target.value); // Urgent
  
  startTransition(() => {
    // Non-urgent - can be interrupted
    setItems(generateLargeList());
  });
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Concurrent Features Overview</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">Concurrent Rendering</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Interruptible rendering</li>
                <li>• Priority-based updates</li>
                <li>• Automatic batching</li>
                <li>• Better responsiveness</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Smoother UI interactions</li>
                <li>• Better perceived performance</li>
                <li>• More responsive apps</li>
                <li>• Graceful degradation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Interruptible Rendering</h3>
        <p className="text-gray-700 mb-4">
          React can interrupt a render in progress to handle more urgent updates.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">
              Urgent: {isUrgent ? 'Yes' : 'No'} | Count: {count}
            </p>
            <button
              onClick={handleUrgentUpdate}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Trigger Urgent Update During Render
            </button>
            <p className="text-xs text-gray-600 mt-2">
              Click rapidly - urgent updates interrupt the non-urgent rendering
            </p>
            <div className="mt-4 max-h-32 overflow-y-auto">
              <ExpensiveList items={items.slice(0, 10)} />
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// React can interrupt rendering
startTransition(() => {
  // Long render starts...
  setItems(largeList);
  // ...but can be interrupted by urgent updates
});

// Urgent update interrupts
setCount(count + 1); // This takes priority!`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Priority-Based Rendering</h3>
        <p className="text-gray-700 mb-4">
          React prioritizes urgent updates (user input) over non-urgent updates (data fetching).
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <PriorityRenderingExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Concepts</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Concept</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Automatic Batching</td>
                <td className="p-2">Multiple state updates grouped into one render</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Interruptible Rendering</td>
                <td className="p-2">React can pause and resume rendering</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Priority-Based</td>
                <td className="p-2">Urgent updates prioritized over non-urgent</td>
              </tr>
              <tr>
                <td className="p-2">Concurrent Mode</td>
                <td className="p-2">Rendering doesn't block the main thread</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Priority Rendering Example
function PriorityRenderingExample() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const handleSearch = (value) => {
    setQuery(value); // Urgent - update input immediately
    
    startTransition(() => {
      setIsPending(true);
      // Simulate expensive search
      setTimeout(() => {
        const filtered = Array.from({ length: 100 }, (_, i) => 
          `Result ${i + 1} for "${value}"`
        );
        setResults(filtered);
        setIsPending(false);
      }, 500);
    });
  };

  return (
    <div className="p-4 bg-white rounded">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Type to search (input stays responsive)"
        className="w-full px-3 py-2 border rounded mb-2"
      />
      {isPending && <p className="text-sm text-blue-600">Searching...</p>}
      <div className="max-h-32 overflow-y-auto mt-2">
        {results.slice(0, 5).map((result, index) => (
          <div key={index} className="text-sm py-1">{result}</div>
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-2">
        Input updates immediately (urgent), search happens in background (non-urgent)
      </p>
    </div>
  );
}

export default ConcurrentRendering;

