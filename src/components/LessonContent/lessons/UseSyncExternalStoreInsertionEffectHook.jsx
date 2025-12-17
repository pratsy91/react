import { useSyncExternalStore, useInsertionEffect, useState, useRef, useEffect, useLayoutEffect } from 'react';

// Simple external store
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setState: (newState) => {
      state = newState;
      listeners.forEach(listener => listener());
    }
  };
}

const store = createStore({ count: 0 });

function UseSyncExternalStoreInsertionEffectHook() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useSyncExternalStore & useInsertionEffect (React 18)</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useSyncExternalStore: Subscribing to External Stores</h3>
        <p className="text-gray-700 mb-4">
          useSyncExternalStore lets you subscribe to external data sources outside of React.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ExternalStoreExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`import { useSyncExternalStore } from 'react';

const store = createExternalStore();

function Component() {
  const state = useSyncExternalStore(
    store.subscribe,  // subscribe function
    store.getSnapshot // getSnapshot function
  );
  
  return <div>{state}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Snapshot and Subscribe Functions</h3>
        <p className="text-gray-700 mb-4">
          You need to provide subscribe and getSnapshot functions to connect to your store.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`const state = useSyncExternalStore(
  // Subscribe function - returns unsubscribe
  (callback) => {
    const unsubscribe = store.subscribe(callback);
    return unsubscribe;
  },
  
  // Get snapshot function
  () => store.getState(),
  
  // Optional: Server snapshot (for SSR)
  () => getServerSnapshot()
);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Library Integration</h3>
        <p className="text-gray-700 mb-4">
          useSyncExternalStore is used by libraries like Redux, Zustand, and others to integrate with React.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <LibraryIntegrationExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useInsertionEffect: CSS-in-JS Libraries</h3>
        <p className="text-gray-700 mb-4">
          useInsertionEffect runs synchronously before all DOM mutations, perfect for injecting styles.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <InsertionEffectExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`import { useInsertionEffect } from 'react';

function useStyles(css) {
  useInsertionEffect(() => {
    // Inject styles before layout effects
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  });
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">DOM Mutations Before Layout Effects</h3>
        <p className="text-gray-700 mb-4">
          useInsertionEffect runs before useLayoutEffect, ensuring styles are injected before layout calculations.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ExecutionOrderExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">When to Use</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">useSyncExternalStore:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Integrating with external state management libraries</li>
            <li>Subscribing to browser APIs (localStorage, history)</li>
            <li>Connecting to non-React data sources</li>
            <li>Building your own state management library</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">useInsertionEffect:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>CSS-in-JS libraries (styled-components, emotion)</li>
            <li>Injecting styles dynamically</li>
            <li>DOM mutations that must happen before layout</li>
            <li>Very rare - most apps won't need this</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// External Store Example
function ExternalStoreExample() {
  const state = useSyncExternalStore(
    (callback) => {
      const unsubscribe = store.subscribe(callback);
      return unsubscribe;
    },
    () => store.getState()
  );

  return (
    <div className="p-4 bg-white rounded">
      <p className="text-lg font-semibold mb-2">Store Count: {state.count}</p>
      <div className="space-x-2">
        <button
          onClick={() => store.setState({ count: state.count + 1 })}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={() => store.setState({ count: state.count - 1 })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
      </div>
      <p className="text-xs text-gray-600 mt-2">
        Component automatically updates when store changes
      </p>
    </div>
  );
}

// Library Integration Example
function LibraryIntegrationExample() {
  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm text-gray-700 mb-2">
        Libraries like Redux, Zustand use useSyncExternalStore internally:
      </p>
      <pre className="text-xs bg-gray-100 p-2 rounded">{`// Redux example (simplified)
function useSelector(selector) {
  const store = useReduxStore();
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState())
  );
}

// Zustand example (simplified)
function useStore(selector) {
  const store = useZustandStore();
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState())
  );
}`}</pre>
    </div>
  );
}

// Insertion Effect Example
function InsertionEffectExample() {
  const [color, setColor] = useState('blue');
  const styleRef = useRef(null);

  useInsertionEffect(() => {
    // Inject styles before layout
    if (!styleRef.current) {
      const style = document.createElement('style');
      style.id = 'dynamic-styles';
      document.head.appendChild(style);
      styleRef.current = style;
    }
    
    // Update style content
    styleRef.current.textContent = `
      .dynamic-box {
        background-color: ${color};
        padding: 20px;
        border-radius: 8px;
        color: white;
      }
    `;
  }, [color]);

  return (
    <div className="p-4 bg-white rounded">
      <div className="dynamic-box mb-4">
        This box uses dynamically injected styles!
      </div>
      <div className="space-x-2">
        <button
          onClick={() => setColor('blue')}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Blue
        </button>
        <button
          onClick={() => setColor('red')}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Red
        </button>
        <button
          onClick={() => setColor('green')}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          Green
        </button>
      </div>
      <p className="text-xs text-gray-600 mt-2">
        Styles injected via useInsertionEffect (check &lt;head&gt; in DevTools)
      </p>
    </div>
  );
}

// Execution Order Example
function ExecutionOrderExample() {
  const [count, setCount] = useState(0);

  console.log('1. Render');

  useInsertionEffect(() => {
    console.log('2. useInsertionEffect (before layout)');
  }, [count]);

  useLayoutEffect(() => {
    console.log('3. useLayoutEffect (after DOM mutations)');
  }, [count]);

  useEffect(() => {
    console.log('4. useEffect (after paint)');
  }, [count]);

  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm text-gray-700 mb-2">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment (Check console)
      </button>
      <p className="text-xs text-gray-600 mt-2">
        Order: Render → useInsertionEffect → useLayoutEffect → Paint → useEffect
      </p>
    </div>
  );
}

export default UseSyncExternalStoreInsertionEffectHook;

