import { useState } from 'react';

// Simulated Redux Toolkit API (since we can't install it)
function createSlice({ name, initialState, reducers }) {
  return {
    name,
    initialState,
    reducers,
    actions: Object.keys(reducers).reduce((acc, key) => {
      acc[key] = (payload) => ({ type: `${name}/${key}`, payload });
      return acc;
    }, {})
  };
}

function ReduxToolkit() {
  const [storeState, setStoreState] = useState({
    counter: { value: 0 },
    todos: { items: [] }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Redux Toolkit</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Store Setup</h3>
        <p className="text-gray-700 mb-4">
          Redux Toolkit simplifies Redux store configuration with sensible defaults.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer
  }
});

// In your app
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <YourApp />
    </Provider>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Slices and Reducers</h3>
        <p className="text-gray-700 mb-4">
          createSlice automatically generates action creators and action types.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer allows direct mutation!
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">All RTK Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">useSelector</h4>
              <pre className="text-sm bg-white p-2 rounded">{`import { useSelector } from 'react-redux';

// Select entire state
const counter = useSelector(state => state.counter);

// Select specific value
const count = useSelector(state => state.counter.value);

// With equality function
const count = useSelector(
  state => state.counter.value,
  (prev, next) => prev === next
);`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useDispatch</h4>
              <pre className="text-sm bg-white p-2 rounded">{`import { useDispatch } from 'react-redux';
import { increment } from './counterSlice';

function Counter() {
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(increment())}>
      Increment
    </button>
  );
}`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useStore</h4>
              <pre className="text-sm bg-white p-2 rounded">{`import { useStore } from 'react-redux';

function Component() {
  const store = useStore();
  
  // Access store directly (rarely needed)
  const state = store.getState();
  store.dispatch(action);
  
  return <div>...</div>;
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">createSlice</h3>
        <p className="text-gray-700 mb-4">
          createSlice is the standard way to write Redux logic with less boilerplate.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter(t => t.id !== action.payload);
    }
  }
});

// Auto-generated actions
export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">createAsyncThunk</h3>
        <p className="text-gray-700 mb-4">
          createAsyncThunk handles async operations like API calls.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Create async thunk
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
);

// Handle in slice
const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">RTK Query (Complete API)</h3>
        <p className="text-gray-700 mb-4">
          RTK Query is a powerful data fetching and caching solution built on top of Redux Toolkit.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create API
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
    getUser: builder.query({
      query: (id) => \`users/\${id}\`,
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation } = api;

// Usage
function Users() {
  const { data, isLoading, error } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  
  if (isLoading) return <div>Loading...</div>;
  return <div>{/* render users */}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Middleware</h3>
        <p className="text-gray-700 mb-4">
          Redux Toolkit includes useful middleware by default and allows custom middleware.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Redux DevTools</h3>
        <p className="text-gray-700 mb-4">
          Redux DevTools provides powerful debugging capabilities.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Redux DevTools Features:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 ml-4">
              <li>Time-travel debugging</li>
              <li>Action history</li>
              <li>State inspection</li>
              <li>Diff view</li>
              <li>Export/import state</li>
              <li>Action replay</li>
            </ul>
            <p className="text-sm text-blue-800 mt-2">
              Install Redux DevTools browser extension to use these features!
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete Example</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

// Component
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ReduxToolkit;

