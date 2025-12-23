import { useState } from 'react';

// Simulated Zustand API
function createZustandStore(initialState, actions) {
  let state = { ...initialState };
  const listeners = new Set();

  const setState = (partial) => {
    state = typeof partial === 'function' ? partial(state) : { ...state, ...partial };
    listeners.forEach(listener => listener());
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    subscribe,
    ...actions(setState, getState)
  };
}

function Zustand() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Zustand</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Zustand</h3>
        <p className="text-blue-800 mb-2">
          Zustand is a small, fast, and scalable state management library for React. It has a minimal API with no boilerplate, 
          making it easy to use while still being powerful enough for complex applications. It provides a simpler alternative to 
          Redux with better TypeScript support.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Minimal API:</strong> Simple create() function, no providers or reducers needed</li>
            <li><strong>No Boilerplate:</strong> Less code than Redux or Context API</li>
            <li><strong>Selective Subscriptions:</strong> Components only re-render when selected state changes</li>
            <li><strong>TypeScript First:</strong> Excellent TypeScript support out of the box</li>
            <li><strong>Small Bundle:</strong> Only ~1KB gzipped</li>
            <li><strong>Middleware Support:</strong> Extensible with middleware (persist, devtools, etc.)</li>
          </ul>
          <p className="mt-2"><strong>When to Use Zustand:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>When you need global state management without Redux complexity</li>
            <li>For medium to large applications with shared state</li>
            <li>When you want TypeScript support without configuration</li>
            <li>When Context API becomes too complex or causes performance issues</li>
            <li>For applications that need simple, fast state management</li>
          </ul>
          <p className="mt-2"><strong>Advantages Over Redux:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Less boilerplate code</li>
            <li>No actions, reducers, or dispatch needed</li>
            <li>Direct state mutations (with Immer support)</li>
            <li>Simpler mental model</li>
            <li>Better performance with selective subscriptions</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Store Creation</h3>
        <p className="text-gray-700 mb-4">
          Zustand provides a simple, lightweight state management solution with minimal boilerplate.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { create } from 'zustand';

const useStore = create((set, get) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}));

// Usage in component
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Subscriptions</h3>
        <p className="text-gray-700 mb-4">
          Zustand allows selective subscriptions to prevent unnecessary re-renders.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Subscribe to specific part of state
const count = useStore((state) => state.count);
// Only re-renders when count changes

// Subscribe to multiple values
const { count, name } = useStore((state) => ({
  count: state.count,
  name: state.name
}));

// Using selector with equality function
import { shallow } from 'zustand/shallow';

const { count, name } = useStore(
  (state) => ({ count: state.count, name: state.name }),
  shallow
);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Middleware</h3>
        <p className="text-gray-700 mb-4">
          Zustand supports middleware for extending functionality.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { create } from 'zustand';
import { devtools, persist, immer } from 'zustand/middleware';

// DevTools middleware
const useStore = create(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 }))
  }))
);

// Persist middleware
const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }))
    }),
    { name: 'count-storage' }
  )
);

// Immer middleware (for mutable updates)
const useStore = create(
  immer((set) => ({
    items: [],
    addItem: (item) => set((state) => {
      state.items.push(item); // Direct mutation!
    })
  }))
);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Persistence</h3>
        <p className="text-gray-700 mb-4">
          Persist store state to localStorage or other storage.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }))
    }),
    {
      name: 'my-storage', // localStorage key
      storage: localStorage, // or sessionStorage
      partialize: (state) => ({ count: state.count }), // Only persist count
    }
  )
);

// Access persisted state
const count = useStore((state) => state.count);
// Automatically loaded from localStorage on mount`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">All Zustand APIs</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">API</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2"><code>create</code></td>
                <td className="p-2">Create a store hook</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>set</code></td>
                <td className="p-2">Update state (provided in create callback)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>get</code></td>
                <td className="p-2">Get current state (provided in create callback)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>subscribe</code></td>
                <td className="p-2">Subscribe to store changes</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>useStore</code></td>
                <td className="p-2">Hook to access store in components</td>
              </tr>
              <tr>
                <td className="p-2"><code>getState</code></td>
                <td className="p-2">Get current state outside React</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete Example</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useTodoStore = create(
  devtools(
    persist(
      (set, get) => ({
        todos: [],
        addTodo: (text) => set((state) => ({
          todos: [...state.todos, { id: Date.now(), text, done: false }]
        })),
        toggleTodo: (id) => set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
          )
        })),
        deleteTodo: (id) => set((state) => ({
          todos: state.todos.filter(todo => todo.id !== id)
        }))
      }),
      { name: 'todo-storage' }
    ),
    { name: 'TodoStore' }
  )
);

// Usage
function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  
  return (
    <div>
      {todos.map(todo => <div key={todo.id}>{todo.text}</div>)}
      <button onClick={() => addTodo('New todo')}>Add</button>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Zustand vs Redux</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">Zustand</th>
                <th className="text-left p-2">Redux</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Boilerplate</td>
                <td className="p-2">Minimal</td>
                <td className="p-2">More</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Bundle size</td>
                <td className="p-2">Small (~1KB)</td>
                <td className="p-2">Larger</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Learning curve</td>
                <td className="p-2">Easy</td>
                <td className="p-2">Steeper</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">DevTools</td>
                <td className="p-2">Optional</td>
                <td className="p-2">Excellent</td>
              </tr>
              <tr>
                <td className="p-2">Use case</td>
                <td className="p-2">Small to medium apps</td>
                <td className="p-2">Large, complex apps</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Zustand;

