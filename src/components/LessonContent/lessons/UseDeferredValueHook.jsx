import { useState, useDeferredValue, useMemo } from 'react';

// Simulate expensive filtering
function filterItems(items, query) {
  return items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );
}

function UseDeferredValueHook() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

  const filteredItems = useMemo(() => {
    console.log('Filtering with:', deferredQuery);
    return filterItems(items, deferredQuery);
  }, [deferredQuery, items]);

  const isStale = query !== deferredQuery;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useDeferredValue Hook (React 18)</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding useDeferredValue</h3>
        <p className="text-blue-800 mb-2">
          useDeferredValue is a React 18 Hook that defers updating a value until more urgent updates have finished. It's similar 
          to useTransition, but instead of wrapping state updates, it defers the value itself, allowing you to keep the previous 
          value visible while the new value is being computed.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Value Deferral:</strong> Defers a value, not the state update itself</li>
            <li><strong>Stale Value Display:</strong> Shows previous value while new value is computed</li>
            <li><strong>Urgent Updates First:</strong> More urgent updates take priority</li>
            <li><strong>Background Updates:</strong> Value updates in the background</li>
            <li><strong>Better UX:</strong> Keeps UI responsive during expensive computations</li>
          </ul>
          <p className="mt-2"><strong>When to Use:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Filtering or searching through large lists</li>
            <li>Rendering expensive components that depend on input</li>
            <li>When you want to show stale data while computing new data</li>
            <li>Any expensive computation that can be deferred</li>
          </ul>
          <p className="mt-2"><strong>vs useTransition:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>useDeferredValue:</strong> Defers a value (better for derived values)</li>
            <li><strong>useTransition:</strong> Defers state updates (better for user actions)</li>
            <li>Both keep UI responsive but have different use cases</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Deferring Non-Urgent Updates</h3>
        <p className="text-gray-700 mb-4">
          useDeferredValue defers updating a value until more urgent updates have finished.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search (10,000 items)"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            {isStale && (
              <p className="text-sm text-yellow-600">⏳ Showing stale results while updating...</p>
            )}
            <p className="text-xs text-gray-600 mb-2">
              Query: "{query}" | Deferred: "{deferredQuery}"
            </p>
            <div className="max-h-40 overflow-y-auto bg-white p-2 rounded border">
              <p className="text-xs text-gray-600 mb-1">
                Showing {filteredItems.length} results (check console for filtering)
              </p>
              {filteredItems.slice(0, 10).map((item, index) => (
                <div key={index} className="text-sm py-1">{item}</div>
              ))}
              {filteredItems.length > 10 && (
                <p className="text-xs text-gray-500">... and {filteredItems.length - 10} more</p>
              )}
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);

// Use deferredQuery for expensive operations
const filtered = useMemo(() => {
  return expensiveFilter(items, deferredQuery);
}, [deferredQuery]);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Debouncing Alternative</h3>
        <p className="text-gray-700 mb-4">
          useDeferredValue is similar to debouncing but integrated with React's rendering.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Debouncing:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                <li>Fixed delay</li>
                <li>Waits for pause</li>
                <li>Can feel laggy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useDeferredValue:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                <li>Adaptive delay</li>
                <li>Responds to urgency</li>
                <li>Feels more responsive</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Optimization</h3>
        <p className="text-gray-700 mb-4">
          useDeferredValue helps keep the UI responsive during expensive operations.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <PerformanceComparisonExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Detecting Stale Values</h3>
        <p className="text-gray-700 mb-4">
          You can detect when the deferred value is stale and show a loading indicator.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`const query = useDeferredValue(input);
const isStale = input !== query;

return (
  <>
    {isStale && <Spinner />}
    <Results query={query} />
  </>
);`}</pre>
        </div>
      </section>
    </div>
  );
}

// Performance Comparison
function PerformanceComparisonExample() {
  const [input, setInput] = useState('');
  const deferredInput = useDeferredValue(input);

  const expensiveResult = useMemo(() => {
    // Simulate expensive calculation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return `Result for: ${deferredInput}`;
  }, [deferredInput]);

  return (
    <div className="p-4 bg-white rounded">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type quickly - notice smoothness"
        className="w-full px-3 py-2 border rounded mb-2"
      />
      <p className="text-sm text-gray-600">
        {expensiveResult}
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Input stays responsive even during expensive calculations
      </p>
    </div>
  );
}

export default UseDeferredValueHook;

