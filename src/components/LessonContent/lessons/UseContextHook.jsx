import { createContext, useContext, useState, useReducer } from 'react';

// Creating contexts
const ThemeContext = createContext('light');
const UserContext = createContext(null);
const CounterContext = createContext(null);

function UseContextHook() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'John', role: 'user' });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useContext Hook</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Context API</h3>
        <p className="text-blue-800 mb-2">
          Context provides a way to pass data through the component tree without having to pass props down manually at every 
          level. This solves the "prop drilling" problem where you pass props through many components that don't need them, 
          just to get data to a deeply nested component.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>createContext:</strong> Creates a context object with a default value</li>
            <li><strong>Provider:</strong> Component that supplies the context value to its children</li>
            <li><strong>useContext:</strong> Hook that consumes the context value</li>
            <li><strong>Prop Drilling:</strong> Passing props through intermediate components unnecessarily</li>
            <li><strong>Performance:</strong> Context can cause re-renders of all consumers when value changes</li>
          </ul>
          <p className="mt-2"><strong>When to Use Context:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Global state like theme, user authentication, language preferences</li>
            <li>Data that's needed by many components at different nesting levels</li>
            <li>Avoiding prop drilling for deeply nested component trees</li>
            <li>Configuration values that rarely change</li>
          </ul>
          <p className="mt-2"><strong>When NOT to Use Context:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>For frequently changing data (use state management library instead)</li>
            <li>When only a few components need the data (props are simpler)</li>
            <li>For complex state management (consider Redux, Zustand, etc.)</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Creating Context</h3>
        <p className="text-gray-700 mb-4">
          Context allows you to share data through the component tree without prop drilling.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { createContext } from 'react';

const ThemeContext = createContext('light');
const UserContext = createContext(null);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Provider and Consumer</h3>
        <p className="text-gray-700 mb-4">
          Provider supplies the context value, and useContext hook consumes it.
        </p>
        <ThemeContext.Provider value={theme}>
          <UserContext.Provider value={user}>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <ThemeDisplay />
              <UserDisplay />
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Toggle Theme
                </button>
                <button
                  onClick={() => setUser({ name: 'Jane', role: 'admin' })}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Change User
                </button>
              </div>
            </div>
          </UserContext.Provider>
        </ThemeContext.Provider>
        <pre className="text-sm bg-gray-50 p-4 rounded-lg">{`<ThemeContext.Provider value={theme}>
  <UserContext.Provider value={user}>
    <ChildComponent />
  </UserContext.Provider>
</ThemeContext.Provider>

// In child component:
const theme = useContext(ThemeContext);
const user = useContext(UserContext);`}</pre>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Multiple Contexts</h3>
        <p className="text-gray-700 mb-4">
          You can use multiple contexts in the same component.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <MultipleContextsExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context Composition</h3>
        <p className="text-gray-700 mb-4">
          Combine multiple contexts into a single provider for cleaner code.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ComposedContextProvider>
            <ComposedContextConsumer />
          </ComposedContextProvider>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Dynamic Context Values</h3>
        <p className="text-gray-700 mb-4">
          Context values can be dynamic and include functions.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <DynamicContextExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context with Reducers</h3>
        <p className="text-gray-700 mb-4">
          Combine useContext with useReducer for complex state management.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <CounterContextProvider>
            <CounterDisplay />
          </CounterContextProvider>
        </div>
      </section>
    </div>
  );
}

// Theme Display Component
function ThemeDisplay() {
  const theme = useContext(ThemeContext);
  return (
    <div className={`p-3 rounded ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      Current Theme: <strong>{theme}</strong>
    </div>
  );
}

// User Display Component
function UserDisplay() {
  const user = useContext(UserContext);
  return (
    <div className="mt-2 p-3 bg-blue-50 rounded">
      User: <strong>{user?.name}</strong> ({user?.role})
    </div>
  );
}

// Multiple Contexts Example
const LanguageContext = createContext('en');
const SettingsContext = createContext({ notifications: true });

function MultipleContextsExample() {
  const [language, setLanguage] = useState('en');
  const [settings, setSettings] = useState({ notifications: true });

  return (
    <LanguageContext.Provider value={language}>
      <SettingsContext.Provider value={settings}>
        <div>
          <MultiContextConsumer />
          <div className="mt-2 space-x-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded"
            >
              Toggle Language
            </button>
            <button
              onClick={() => setSettings({ notifications: !settings.notifications })}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded"
            >
              Toggle Notifications
            </button>
          </div>
        </div>
      </SettingsContext.Provider>
    </LanguageContext.Provider>
  );
}

function MultiContextConsumer() {
  const language = useContext(LanguageContext);
  const settings = useContext(SettingsContext);
  return (
    <div className="p-3 bg-white rounded">
      Language: {language} | Notifications: {settings.notifications ? 'On' : 'Off'}
    </div>
  );
}

// Composed Context Provider
const AppContext = createContext(null);

function ComposedContextProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'User' });

  const value = {
    theme,
    setTheme,
    user,
    setUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

function ComposedContextConsumer() {
  const { theme, setTheme, user } = useContext(AppContext);
  return (
    <div className="p-3 bg-white rounded">
      <p>Theme: {theme} | User: {user.name}</p>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
}

// Dynamic Context Example
const DynamicContext = createContext(null);

function DynamicContextExample() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello');

  const contextValue = {
    count,
    increment: () => setCount(c => c + 1),
    decrement: () => setCount(c => c - 1),
    message,
    setMessage
  };

  return (
    <DynamicContext.Provider value={contextValue}>
      <DynamicConsumer />
    </DynamicContext.Provider>
  );
}

function DynamicConsumer() {
  const { count, increment, decrement, message, setMessage } = useContext(DynamicContext);
  return (
    <div className="p-3 bg-white rounded">
      <p>Count: {count}</p>
      <p>Message: {message}</p>
      <div className="mt-2 space-x-2">
        <button onClick={increment} className="px-3 py-1 bg-green-500 text-white text-sm rounded">+</button>
        <button onClick={decrement} className="px-3 py-1 bg-red-500 text-white text-sm rounded">-</button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="px-2 py-1 border rounded text-sm"
        />
      </div>
    </div>
  );
}

// Context with Reducer
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};

function CounterContextProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  const value = {
    count: state.count,
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
    reset: () => dispatch({ type: 'reset' })
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

function CounterDisplay() {
  const { count, increment, decrement, reset } = useContext(CounterContext);
  return (
    <div className="p-3 bg-white rounded">
      <p className="text-lg font-semibold mb-2">Count: {count}</p>
      <div className="space-x-2">
        <button onClick={increment} className="px-3 py-1 bg-green-500 text-white rounded">+</button>
        <button onClick={decrement} className="px-3 py-1 bg-red-500 text-white rounded">-</button>
        <button onClick={reset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
    </div>
  );
}

export default UseContextHook;

