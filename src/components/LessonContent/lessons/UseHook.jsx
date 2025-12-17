import { useState } from 'react';

function UseHook() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">use Hook</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">use() Hook API</h3>
        <p className="text-gray-700 mb-4">
          The use() hook unwraps promises and reads context values.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// use() Hook
// Unwraps promises and reads context

import { use } from 'react';

// Basic Usage with Promise
function DataComponent({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data.content}</div>;
}

// Usage
function App() {
  const dataPromise = fetchData();
  
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent dataPromise={dataPromise} />
    </Suspense>
  );
}

// use() Hook API
const value = use(resource);

// Parameters:
// - resource: Promise or Context

// Returns:
// - value: Resolved promise value or context value

// With Context
const ThemeContext = createContext();

function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Click</button>;
}

// Usage
function App() {
  return (
    <ThemeContext value="dark">
      <ThemedButton />
    </ThemeContext>
  );
}

// Conditional use()
function ConditionalComponent({ dataPromise }) {
  if (!dataPromise) {
    return <div>No data</div>;
  }
  
  const data = use(dataPromise);
  return <div>{data.content}</div>;
}

// Multiple Promises
function MultiDataComponent({ promise1, promise2 }) {
  const data1 = use(promise1);
  const data2 = use(promise2);
  
  return (
    <div>
      <div>{data1.content}</div>
      <div>{data2.content}</div>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Promise Unwrapping</h3>
        <p className="text-gray-700 mb-4">
          How use() unwraps promises.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Promise Unwrapping
// use() automatically unwraps promises

// Basic Promise
function UserProfile({ userPromise }) {
  const user = use(userPromise);
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Promise with Suspense
function App() {
  const userPromise = fetchUser(1);
  
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}

// Promise Error Handling
function DataComponent({ dataPromise }) {
  try {
    const data = use(dataPromise);
    return <div>{data.content}</div>;
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}

// Or with Error Boundary
function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <DataComponent dataPromise={promise} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Cached Promises
// React caches promise results
function App() {
  const dataPromise = fetchData();
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Component1 dataPromise={dataPromise} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Component2 dataPromise={dataPromise} />
      </Suspense>
    </>
  );
}

// Both components use same promise
// Promise is only fetched once

// Promise with useTransition
function App() {
  const [isPending, startTransition] = useTransition();
  const [dataPromise, setDataPromise] = useState(null);
  
  const handleFetch = () => {
    startTransition(() => {
      setDataPromise(fetchData());
    });
  };
  
  return (
    <>
      <button onClick={handleFetch}>Fetch</button>
      {isPending && <Loading />}
      {dataPromise && (
        <Suspense fallback={<Loading />}>
          <DataComponent dataPromise={dataPromise} />
        </Suspense>
      )}
    </>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context Reading</h3>
        <p className="text-gray-700 mb-4">
          Using use() to read context values.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Context Reading
// use() can read context values

// Basic Context
const ThemeContext = createContext();

function ThemedComponent() {
  const theme = use(ThemeContext);
  return <div className={theme}>Content</div>;
}

// Usage
function App() {
  return (
    <ThemeContext value="dark">
      <ThemedComponent />
    </ThemeContext>
  );
}

// Multiple Contexts
const ThemeContext = createContext();
const LanguageContext = createContext();

function Component() {
  const theme = use(ThemeContext);
  const language = use(LanguageContext);
  
  return (
    <div className={theme}>
      {language === 'en' ? 'Hello' : 'Hola'}
    </div>
  );
}

// Conditional Context
function ConditionalComponent({ useTheme }) {
  if (!useTheme) {
    return <div>No theme</div>;
  }
  
  const theme = use(ThemeContext);
  return <div className={theme}>Content</div>;
}

// Context with Default
const ThemeContext = createContext('light');

function Component() {
  const theme = use(ThemeContext);
  // Uses 'light' if no provider
  return <div className={theme}>Content</div>;
}

// Context vs useContext
// use() works in conditionals and loops
// useContext must be at top level

// ✅ use() - works anywhere
function Component({ condition }) {
  if (condition) {
    const theme = use(ThemeContext);
    return <div className={theme}>Content</div>;
  }
  return <div>No theme</div>;
}

// ❌ useContext - must be at top level
function Component({ condition }) {
  if (condition) {
    const theme = useContext(ThemeContext); // Error!
    return <div className={theme}>Content</div>;
  }
  return <div>No theme</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Suspense Integration</h3>
        <p className="text-gray-700 mb-4">
          use() integrates with Suspense for loading states.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Suspense Integration
// use() works with Suspense

// Promise with Suspense
function App() {
  const dataPromise = fetchData();
  
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent dataPromise={dataPromise} />
    </Suspense>
  );
}

function DataComponent({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data.content}</div>;
}

// Multiple Promises
function App() {
  const promise1 = fetchData1();
  const promise2 = fetchData2();
  
  return (
    <Suspense fallback={<Loading />}>
      <MultiDataComponent promise1={promise1} promise2={promise2} />
    </Suspense>
  );
}

// Nested Suspense
function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Page>
        <Suspense fallback={<SectionLoading />}>
          <Section dataPromise={promise} />
        </Suspense>
      </Page>
    </Suspense>
  );
}

// Suspense with Error Boundaries
function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <DataComponent dataPromise={promise} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Streaming
// React streams promise results
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <FastComponent />
      <Suspense fallback={<Loading />}>
        <SlowComponent dataPromise={slowPromise} />
      </Suspense>
    </Suspense>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Handling</h3>
        <p className="text-gray-700 mb-4">
          Error handling with use() hook.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Error Handling
// Handle errors from use()

// Try-Catch
function DataComponent({ dataPromise }) {
  try {
    const data = use(dataPromise);
    return <div>{data.content}</div>;
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}

// Error Boundary
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<Loading />}>
        <DataComponent dataPromise={promise} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Promise Rejection
function DataComponent({ dataPromise }) {
  try {
    const data = use(dataPromise);
    return <div>{data.content}</div>;
  } catch (error) {
    // Handle promise rejection
    if (error instanceof Error) {
      return <div>Error: {error.message}</div>;
    }
    return <div>Unknown error</div>;
  }
}

// Context Error
// use() throws if context is missing
const ThemeContext = createContext();

function Component() {
  try {
    const theme = use(ThemeContext);
    return <div className={theme}>Content</div>;
  } catch (error) {
    // Context not provided
    return <div>Theme not available</div>;
  }
}

// Error Recovery
function App() {
  const [retry, setRetry] = useState(0);
  const [dataPromise, setDataPromise] = useState(null);
  
  const handleRetry = () => {
    setRetry(r => r + 1);
    setDataPromise(fetchData());
  };
  
  return (
    <ErrorBoundary
      fallback={<ErrorPage onRetry={handleRetry} />}
      key={retry}
    >
      <Suspense fallback={<Loading />}>
        {dataPromise && (
          <DataComponent dataPromise={dataPromise} />
        )}
      </Suspense>
    </ErrorBoundary>
  );
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default UseHook;

