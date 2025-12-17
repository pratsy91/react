import { useState } from 'react';

function ContextAsProvider() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Context as Provider</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context Provider Pattern</h3>
        <p className="text-gray-700 mb-4">
          React 19 improves Context provider patterns.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Context as Provider (React 19)
// Context can be used as Provider directly

// Before (React 18)
const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <Content />
    </ThemeContext.Provider>
  );
}

// After (React 19)
const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext value={theme}>
      <Content />
    </ThemeContext>
  );
}

// Context is Provider
// No need for .Provider suffix
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext value={theme}>
      <Content />
    </ThemeContext>
  );
}

// Still supports .Provider
// Both patterns work
function App() {
  return (
    <>
      <ThemeContext value={theme}>
        <Content />
      </ThemeContext>
      {/* Or */}
      <ThemeContext.Provider value={theme}>
        <Content />
      </ThemeContext.Provider>
    </>
  );
}

// Multiple Contexts
const ThemeContext = createContext();
const AuthContext = createContext();

function App() {
  return (
    <ThemeContext value={theme}>
      <AuthContext value={auth}>
        <Content />
      </AuthContext>
    </ThemeContext>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context Composition</h3>
        <p className="text-gray-700 mb-4">
          Composing multiple contexts in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Context Composition
// Combine multiple contexts

const ThemeContext = createContext();
const LanguageContext = createContext();
const UserContext = createContext();

function App() {
  return (
    <ThemeContext value={theme}>
      <LanguageContext value={language}>
        <UserContext value={user}>
          <Content />
        </UserContext>
      </LanguageContext>
    </ThemeContext>
  );
}

// Custom Provider Component
function AppProviders({ children }) {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);
  
  return (
    <ThemeContext value={{ theme, setTheme }}>
      <LanguageContext value={{ language, setLanguage }}>
        <UserContext value={{ user, setUser }}>
          {children}
        </UserContext>
      </LanguageContext>
    </ThemeContext>
  );
}

// Usage
function App() {
  return (
    <AppProviders>
      <Content />
    </AppProviders>
  );
}

// Context with useReducer
const StateContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <StateContext value={{ state, dispatch }}>
      <Content />
    </StateContext>
  );
}

// Nested Contexts
function NestedApp() {
  return (
    <ThemeContext value={globalTheme}>
      <Page>
        <ThemeContext value={pageTheme}>
          {/* Page theme overrides global */}
          <Content />
        </ThemeContext>
      </Page>
    </ThemeContext>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Provider Improvements</h3>
        <p className="text-gray-700 mb-4">
          Improvements to Context providers in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Provider Improvements
// Better performance and API

// Dynamic Context Value
function App() {
  const [theme, setTheme] = useState('light');
  
  // Value object is stable
  const contextValue = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  );
  
  return (
    <ThemeContext value={contextValue}>
      <Content />
    </ThemeContext>
  );
}

// Or with React Compiler
// Automatically optimized
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext value={{ theme, setTheme }}>
      <Content />
    </ThemeContext>
  );
}

// Conditional Provider
function App({ showTheme }) {
  return (
    <>
      {showTheme && (
        <ThemeContext value={theme}>
          <Content />
        </ThemeContext>
      )}
      {!showTheme && <Content />}
    </>
  );
}

// Multiple Providers Same Context
function App() {
  return (
    <ThemeContext value="light">
      <Header />
      <ThemeContext value="dark">
        <Footer />
      </ThemeContext>
    </ThemeContext>
  );
}

// Provider with Default
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext value={theme}>
      {/* Uses theme if provided, 'light' otherwise */}
      <Content />
    </ThemeContext>
  );
}

// TypeScript Support
interface ThemeContextValue {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext value={{ theme, setTheme }}>
      <Content />
    </ThemeContext>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Optimizations</h3>
        <p className="text-gray-700 mb-4">
          Performance improvements for Context in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Performance Optimizations
// React 19 optimizes Context updates

// Automatic Memoization
// React Compiler optimizes context values
function App() {
  const [theme, setTheme] = useState('light');
  
  // Automatically memoized
  return (
    <ThemeContext value={{ theme, setTheme }}>
      <Content />
    </ThemeContext>
  );
}

// Split Contexts
// Separate contexts for better performance
const ThemeContext = createContext();
const ThemeActionsContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext value={theme}>
      <ThemeActionsContext value={setTheme}>
        <Content />
      </ThemeActionsContext>
    </ThemeContext>
  );
}

// Selective Updates
// Only components using changed value re-render
function App() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  
  return (
    <ThemeContext value={theme}>
      <LanguageContext value={language}>
        <Content />
      </LanguageContext>
    </ThemeContext>
  );
}

// Content only re-renders when theme or language changes
// Not when other state changes

// Context Selector (with libraries)
// Use context selectors to prevent unnecessary re-renders
function useTheme() {
  const theme = useContext(ThemeContext);
  return theme; // Only re-renders when theme changes
}

// Best Practices
// 1. Split contexts by update frequency
// 2. Use stable context values
// 3. Memoize context values
// 4. Avoid large context objects
// 5. Use context selectors when needed`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Multiple Contexts</h3>
        <p className="text-gray-700 mb-4">
          Working with multiple contexts in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Multiple Contexts
// Combine and compose contexts

// Multiple Independent Contexts
const ThemeContext = createContext();
const AuthContext = createContext();
const SettingsContext = createContext();

function App() {
  return (
    <ThemeContext value={theme}>
      <AuthContext value={auth}>
        <SettingsContext value={settings}>
          <Content />
        </SettingsContext>
      </AuthContext>
    </ThemeContext>
  );
}

// Using Multiple Contexts
function Content() {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const settings = useContext(SettingsContext);
  
  return (
    <div className={theme}>
      {auth.user && <SettingsPanel settings={settings} />}
    </div>
  );
}

// Custom Hook for Multiple Contexts
function useAppContexts() {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const settings = useContext(SettingsContext);
  
  return { theme, auth, settings };
}

// Usage
function Content() {
  const { theme, auth, settings } = useAppContexts();
  
  return (
    <div className={theme}>
      {auth.user && <SettingsPanel settings={settings} />}
    </div>
  );
}

// Provider Composition Hook
function useProviders(providers, children) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}

// Usage
function App() {
  const providers = [
    <ThemeContext value={theme} />,
    <AuthContext value={auth} />,
    <SettingsContext value={settings} />
  ];
  
  return useProviders(providers, <Content />);
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ContextAsProvider;

