import { createContext, useContext, useReducer, useState, memo, useMemo } from 'react';

// Multiple Context Providers
const ThemeContext = createContext('light');
const UserContext = createContext(null);
const SettingsContext = createContext({});

// Context Composition
const AppContext = createContext(null);

// Context with useReducer
const CounterContext = createContext(null);

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

// Split contexts for performance
const UserNameContext = createContext(null);
const UserEmailContext = createContext(null);

function AdvancedContextPatterns() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'John', email: 'john@example.com' });
  const [settings, setSettings] = useState({ notifications: true });

  // Context composition
  const appContextValue = useMemo(() => ({
    theme,
    setTheme,
    user,
    setUser,
    settings,
    setSettings
  }), [theme, user, settings]);

  // Context with reducer
  const [counterState, counterDispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Advanced Context Patterns</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Advanced Context Patterns</h3>
        <p className="text-blue-800 mb-2">
          Advanced Context patterns help you use Context API more effectively, especially for performance optimization and 
          complex state management scenarios. These patterns include context composition, splitting contexts, using reducers 
          with context, and memoization strategies to prevent unnecessary re-renders.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Advanced Patterns:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Context Composition:</strong> Combine multiple contexts into a single provider</li>
            <li><strong>Context Splitting:</strong> Split large contexts to prevent unnecessary re-renders</li>
            <li><strong>Context with useReducer:</strong> Use reducers for complex state logic</li>
            <li><strong>Memoization:</strong> Memoize context values to prevent re-renders</li>
            <li><strong>Multiple Providers:</strong> Use multiple context providers for different concerns</li>
            <li><strong>Custom Hooks:</strong> Create custom hooks for context consumption</li>
          </ul>
          <p className="mt-2"><strong>Performance Optimization:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Split contexts by update frequency</li>
            <li>Memoize context values with useMemo</li>
            <li>Use separate contexts for different data types</li>
            <li>Combine contexts only when needed</li>
            <li>Consider state management libraries for complex state</li>
          </ul>
          <p className="mt-2"><strong>When to Use Advanced Patterns:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>When context causes performance issues</li>
            <li>For complex state management with Context</li>
            <li>When you need to optimize re-renders</li>
            <li>For applications with many context consumers</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Multiple Context Providers</h3>
        <p className="text-gray-700 mb-4">
          Use multiple context providers to separate concerns and avoid prop drilling.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ThemeContext.Provider value={theme}>
            <UserContext.Provider value={user}>
              <SettingsContext.Provider value={settings}>
                <MultipleContextsConsumer />
              </SettingsContext.Provider>
            </UserContext.Provider>
          </ThemeContext.Provider>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Toggle Theme
            </button>
            <button
              onClick={() => setUser({ name: 'Jane', email: 'jane@example.com' })}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm"
            >
              Change User
            </button>
            <button
              onClick={() => setSettings({ notifications: !settings.notifications })}
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
            >
              Toggle Settings
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`<ThemeContext.Provider value={theme}>
  <UserContext.Provider value={user}>
    <SettingsContext.Provider value={settings}>
      <ChildComponent />
    </SettingsContext.Provider>
  </UserContext.Provider>
</ThemeContext.Provider>

// Each context handles a specific concern`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context Composition</h3>
        <p className="text-gray-700 mb-4">
          Compose multiple contexts into a single provider for cleaner code.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <AppContext.Provider value={appContextValue}>
            <ComposedContextConsumer />
          </AppContext.Provider>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  
  const value = useMemo(() => ({
    theme, setTheme,
    user, setUser
  }), [theme, user]);
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Optimization</h3>
        <p className="text-gray-700 mb-4">
          Optimize context performance by splitting contexts and memoizing values.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <PerformanceOptimizedContexts />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// ❌ Bad - single large context
const AppContext = createContext({
  theme, user, settings, cart, ...
});

// ✅ Good - split contexts
const ThemeContext = createContext();
const UserContext = createContext();
const CartContext = createContext();

// ✅ Memoize context value
const value = useMemo(() => ({
  theme, setTheme
}), [theme]);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context Splitting</h3>
        <p className="text-gray-700 mb-4">
          Split large contexts into smaller, focused contexts to prevent unnecessary re-renders.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <UserNameContext.Provider value={user.name}>
            <UserEmailContext.Provider value={user.email}>
              <SplitContextConsumer />
            </UserEmailContext.Provider>
          </UserNameContext.Provider>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// Split user context
const UserNameContext = createContext();
const UserEmailContext = createContext();

// Components only re-render when their specific context changes
function NameDisplay() {
  const name = useContext(UserNameContext);
  // Only re-renders when name changes, not email
  return <div>{name}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context with useReducer</h3>
        <p className="text-gray-700 mb-4">
          Combine Context with useReducer for complex state management.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <CounterContext.Provider value={{ state: counterState, dispatch: counterDispatch }}>
            <CounterDisplay />
            <CounterControls />
          </CounterContext.Provider>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const CounterContext = createContext();

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// Usage
const { state, dispatch } = useContext(CounterContext);
dispatch({ type: 'increment' });`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Do:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Split large contexts into smaller ones</li>
            <li>Memoize context values with useMemo</li>
            <li>Use separate contexts for frequently changing vs stable values</li>
            <li>Combine with useReducer for complex state</li>
            <li>Create custom hooks for context access</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">✗ Don't:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Put everything in one context</li>
            <li>Create new objects in context value without memoization</li>
            <li>Use context for high-frequency updates</li>
            <li>Forget to provide default values</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// Multiple Contexts Consumer
function MultipleContextsConsumer() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const settings = useContext(SettingsContext);

  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm"><strong>Theme:</strong> {theme}</p>
      <p className="text-sm"><strong>User:</strong> {user?.name} ({user?.email})</p>
      <p className="text-sm"><strong>Notifications:</strong> {settings.notifications ? 'On' : 'Off'}</p>
    </div>
  );
}

// Composed Context Consumer
function ComposedContextConsumer() {
  const { theme, setTheme, user, settings } = useContext(AppContext);

  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm"><strong>Theme:</strong> {theme}</p>
      <p className="text-sm"><strong>User:</strong> {user?.name}</p>
      <p className="text-sm"><strong>Settings:</strong> {JSON.stringify(settings)}</p>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Toggle Theme
      </button>
    </div>
  );
}

// Performance Optimized Contexts
function PerformanceOptimizedContexts() {
  const [renderCount, setRenderCount] = useState(0);

  // Memoized context value
  const memoizedValue = useMemo(() => ({
    count: renderCount,
    increment: () => setRenderCount(c => c + 1)
  }), [renderCount]);

  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm text-gray-700 mb-2">
        Render count: {renderCount}
      </p>
      <button
        onClick={() => setRenderCount(renderCount + 1)}
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Increment
      </button>
      <p className="text-xs text-gray-600 mt-2">
        Context value is memoized - consumers only re-render when count changes
      </p>
    </div>
  );
}

// Split Context Consumer
function SplitContextConsumer() {
  const name = useContext(UserNameContext);
  const email = useContext(UserEmailContext);

  return (
    <div className="p-4 bg-white rounded">
      <NameDisplay name={name} />
      <EmailDisplay email={email} />
      <p className="text-xs text-gray-600 mt-2">
        NameDisplay only re-renders when name changes, not when email changes
      </p>
    </div>
  );
}

const NameDisplay = memo(function NameDisplay({ name }) {
  console.log('NameDisplay rendered');
  return <p className="text-sm"><strong>Name:</strong> {name}</p>;
});

function EmailDisplay({ email }) {
  console.log('EmailDisplay rendered');
  return <p className="text-sm"><strong>Email:</strong> {email}</p>;
}

// Counter Display
function CounterDisplay() {
  const { state } = useContext(CounterContext);
  return (
    <div className="p-4 bg-white rounded mb-2">
      <p className="text-lg font-semibold">Count: {state.count}</p>
    </div>
  );
}

// Counter Controls
function CounterControls() {
  const { dispatch } = useContext(CounterContext);
  return (
    <div className="space-x-2">
      <button
        onClick={() => dispatch({ type: 'increment' })}
        className="px-3 py-1 bg-green-500 text-white rounded text-sm"
      >
        +
      </button>
      <button
        onClick={() => dispatch({ type: 'decrement' })}
        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
      >
        -
      </button>
      <button
        onClick={() => dispatch({ type: 'reset' })}
        className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
      >
        Reset
      </button>
    </div>
  );
}

export default AdvancedContextPatterns;

