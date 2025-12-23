import { useReducer, useContext, createContext, useState } from 'react';

// Reducer function
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'incrementBy':
      return { count: state.count + action.payload };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};

// Complex reducer example
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
      };
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'setFilter':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

// Action types constants
const ActionTypes = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset'
};

function UseReducerHook() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useReducer Hook</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding useReducer</h3>
        <p className="text-blue-800 mb-2">
          useReducer is an alternative to useState for managing complex state logic. It's especially useful when state logic 
          involves multiple sub-values or when the next state depends on the previous one. It follows the Redux pattern of 
          dispatching actions to update state through a reducer function.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Reducer Function:</strong> Pure function that takes (state, action) and returns new state</li>
            <li><strong>Actions:</strong> Plain objects describing what happened (typically with type and payload)</li>
            <li><strong>Dispatch:</strong> Function to send actions to the reducer</li>
            <li><strong>Predictable Updates:</strong> State updates follow a predictable pattern</li>
            <li><strong>Complex State:</strong> Better for managing objects or arrays with multiple operations</li>
          </ul>
          <p className="mt-2"><strong>When to Use useReducer vs useState:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>useReducer:</strong> Complex state logic, multiple sub-values, state depends on previous state</li>
            <li><strong>useState:</strong> Simple state, single value, independent updates</li>
            <li><strong>useReducer:</strong> When you want to test state logic separately</li>
            <li><strong>useReducer:</strong> When state updates follow predictable patterns</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Centralized state update logic</li>
            <li>Easier to test reducers independently</li>
            <li>Predictable state transitions</li>
            <li>Better for complex state management</li>
            <li>Can be combined with Context API for global state</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Reducer Pattern</h3>
        <p className="text-gray-700 mb-4">
          useReducer is an alternative to useState for managing complex state logic.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-2xl font-bold text-gray-900 mb-4">Count: {state.count}</p>
            <div className="space-x-2">
              <button
                onClick={() => dispatch({ type: 'increment' })}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Increment
              </button>
              <button
                onClick={() => dispatch({ type: 'decrement' })}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Decrement
              </button>
              <button
                onClick={() => dispatch({ type: 'incrementBy', payload: 5 })}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +5
              </button>
              <button
                onClick={() => dispatch({ type: 'reset' })}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Actions and Action Types</h3>
        <p className="text-gray-700 mb-4">
          Actions are objects that describe what happened. Use constants for action types.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Action types as constants
const ActionTypes = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset'
};

// Dispatching actions
dispatch({ type: ActionTypes.INCREMENT });
dispatch({ type: 'incrementBy', payload: 5 }); // With payload`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complex State Logic</h3>
        <p className="text-gray-700 mb-4">
          useReducer excels at managing complex state with multiple sub-values.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <TodoApp />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useReducer vs useState</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">useState</th>
                <th className="text-left p-2">useReducer</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Simple state</td>
                <td className="p-2">✓ Better</td>
                <td className="p-2">-</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Complex state</td>
                <td className="p-2">-</td>
                <td className="p-2">✓ Better</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Multiple updates</td>
                <td className="p-2">-</td>
                <td className="p-2">✓ Better</td>
              </tr>
              <tr>
                <td className="p-2">Predictable updates</td>
                <td className="p-2">-</td>
                <td className="p-2">✓ Better</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Combining with Context</h3>
        <p className="text-gray-700 mb-4">
          useReducer + useContext is a powerful pattern for global state management.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <GlobalStateExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Init Function</h3>
        <p className="text-gray-700 mb-4">
          You can lazily initialize state by passing a function as the third argument.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <InitFunctionExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const init = (initialCount) => {
  return { count: initialCount };
};

const [state, dispatch] = useReducer(
  reducer,
  initialCount,
  init
);`}</pre>
        </div>
      </section>
    </div>
  );
}

// Todo App Example
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });

  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'add', payload: input });
      setInput('');
    }
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="p-4 bg-white rounded">
      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add todo"
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <div className="mb-2 space-x-2">
        <button
          onClick={() => dispatch({ type: 'setFilter', payload: 'all' })}
          className={`px-3 py-1 text-sm rounded ${state.filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => dispatch({ type: 'setFilter', payload: 'active' })}
          className={`px-3 py-1 text-sm rounded ${state.filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: 'setFilter', payload: 'completed' })}
          className={`px-3 py-1 text-sm rounded ${state.filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
      </div>
      <ul className="space-y-2">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => dispatch({ type: 'toggle', payload: todo.id })}
                className="px-2 py-1 bg-green-500 text-white text-sm rounded"
              >
                Toggle
              </button>
              <button
                onClick={() => dispatch({ type: 'delete', payload: todo.id })}
                className="px-2 py-1 bg-red-500 text-white text-sm rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Global State with Context
const AppStateContext = createContext(null);

function GlobalStateExample() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      <CounterDisplay />
      <CounterControls />
    </AppStateContext.Provider>
  );
}

function CounterDisplay() {
  const { state } = useContext(AppStateContext);
  return <p className="text-lg font-semibold mb-2">Count: {state.count}</p>;
}

function CounterControls() {
  const { dispatch } = useContext(AppStateContext);
  return (
    <div className="space-x-2">
      <button
        onClick={() => dispatch({ type: 'increment' })}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        +
      </button>
      <button
        onClick={() => dispatch({ type: 'decrement' })}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        -
      </button>
    </div>
  );
}

// Init Function Example
function InitFunctionExample() {
  const init = (initialCount) => {
    console.log('Initializing with:', initialCount);
    return { count: initialCount };
  };

  const [state, dispatch] = useReducer(counterReducer, 10, init);

  return (
    <div className="p-4 bg-white rounded">
      <p className="mb-2">Count: {state.count}</p>
      <p className="text-sm text-gray-600 mb-2">Check console for init message</p>
      <button
        onClick={() => dispatch({ type: 'increment' })}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
}

export default UseReducerHook;

