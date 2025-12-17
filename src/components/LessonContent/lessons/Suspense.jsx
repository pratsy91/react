import { useState, Suspense, lazy } from 'react';

// Lazy loaded component
const LazyComponent = lazy(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ default: () => <div className="p-4 bg-green-50 rounded">Lazy component loaded!</div> });
    }, 1000);
  })
);

// Simulate data fetching
function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, message: `Data for ${id}`, timestamp: Date.now() });
    }, 1500);
  });
}

// Data fetching component with Suspense
let dataCache = {};

function DataComponent({ id }) {
  if (!dataCache[id]) {
    throw fetchData(id).then(data => {
      dataCache[id] = data;
    });
  }
  
  const data = dataCache[id];
  return (
    <div className="p-4 bg-blue-50 rounded">
      <p className="font-semibold">{data.message}</p>
      <p className="text-sm text-gray-600">Loaded at: {new Date(data.timestamp).toLocaleTimeString()}</p>
    </div>
  );
}

function SuspenseLesson() {
  const [showLazy, setShowLazy] = useState(false);
  const [dataId, setDataId] = useState(1);
  const [showMultiple, setShowMultiple] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Suspense</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Suspense for Code Splitting</h3>
        <p className="text-gray-700 mb-4">
          Suspense provides a fallback UI while lazy components are loading.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <button
              onClick={() => setShowLazy(!showLazy)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showLazy ? 'Hide' : 'Load'} Lazy Component
            </button>
            {showLazy && (
              <Suspense fallback={
                <div className="mt-4 p-4 bg-yellow-50 rounded animate-pulse">
                  <p>⏳ Loading component...</p>
                </div>
              }>
                <LazyComponent />
              </Suspense>
            )}
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./Component'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Suspense for Data Fetching</h3>
        <p className="text-gray-700 mb-4">
          Suspense can also handle data fetching with proper integration (React 18+).
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <button
              onClick={() => {
                dataCache = {}; // Clear cache
                setDataId(dataId + 1);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Fetch New Data
            </button>
            <Suspense fallback={
              <div className="mt-4 p-4 bg-blue-50 rounded animate-pulse">
                <p>⏳ Loading data...</p>
              </div>
            }>
              <DataComponent id={dataId} />
            </Suspense>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Component throws promise while loading
function DataComponent({ id }) {
  if (!cache[id]) {
    throw fetchData(id).then(data => {
      cache[id] = data;
    });
  }
  return <div>{cache[id]}</div>;
}

<Suspense fallback={<Loading />}>
  <DataComponent id={1} />
</Suspense>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Multiple Suspense Boundaries</h3>
        <p className="text-gray-700 mb-4">
          You can nest multiple Suspense boundaries for granular loading states.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <button
              onClick={() => setShowMultiple(!showMultiple)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              {showMultiple ? 'Hide' : 'Show'} Multiple Boundaries
            </button>
            {showMultiple && (
              <div className="mt-4 space-y-4">
                <Suspense fallback={<div className="p-2 bg-red-50 rounded">Loading Component 1...</div>}>
                  <LazyComponent />
                </Suspense>
                <Suspense fallback={<div className="p-2 bg-blue-50 rounded">Loading Component 2...</div>}>
                  <DataComponent id={2} />
                </Suspense>
              </div>
            )}
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`<Suspense fallback={<HeaderSkeleton />}>
  <Header />
  <Suspense fallback={<ContentSkeleton />}>
    <Content />
  </Suspense>
</Suspense>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Suspense Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Do:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Place Suspense boundaries at appropriate levels</li>
            <li>Provide meaningful fallback UI</li>
            <li>Use multiple boundaries for better UX</li>
            <li>Match fallback to the content being loaded</li>
            <li>Consider skeleton screens for better UX</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">✗ Don't:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Put Suspense inside the component that throws</li>
            <li>Use generic "Loading..." for everything</li>
            <li>Nest too many boundaries unnecessarily</li>
            <li>Forget to handle errors (use Error Boundaries)</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">SuspenseList (Experimental)</h3>
        <p className="text-gray-700 mb-4">
          SuspenseList coordinates the order in which multiple Suspense boundaries reveal their content.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-800 mb-2">
            <strong>Note:</strong> SuspenseList is experimental and may change in future React versions.
          </p>
          <pre className="text-sm bg-white p-2 rounded">{`import { SuspenseList } from 'react';

// Reveal items in order (forwards)
<SuspenseList revealOrder="forwards">
  <Suspense fallback={<Loading />}>
    <Component1 />
  </Suspense>
  <Suspense fallback={<Loading />}>
    <Component2 />
  </Suspense>
</SuspenseList>

// Reveal items together (together)
<SuspenseList revealOrder="together">
  <Suspense fallback={<Loading />}>
    <Component1 />
  </Suspense>
  <Suspense fallback={<Loading />}>
    <Component2 />
  </Suspense>
</SuspenseList>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Suspense Patterns</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <SuspensePatternsExample />
        </div>
      </section>
    </div>
  );
}

// Suspense Patterns Example
function SuspensePatternsExample() {
  const [showPattern, setShowPattern] = useState('skeleton');

  return (
    <div className="p-4 bg-white rounded space-y-4">
      <div className="space-x-2">
        <button
          onClick={() => setShowPattern('skeleton')}
          className={`px-3 py-1 rounded text-sm ${
            showPattern === 'skeleton' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Skeleton
        </button>
        <button
          onClick={() => setShowPattern('spinner')}
          className={`px-3 py-1 rounded text-sm ${
            showPattern === 'spinner' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Spinner
        </button>
        <button
          onClick={() => setShowPattern('placeholder')}
          className={`px-3 py-1 rounded text-sm ${
            showPattern === 'placeholder' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Placeholder
        </button>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Pattern: {showPattern}</p>
        {showPattern === 'skeleton' && (
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          </div>
        )}
        {showPattern === 'spinner' && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        {showPattern === 'placeholder' && (
          <div className="p-4 bg-gray-100 rounded text-center">
            <p className="text-gray-600">Content loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuspenseLesson;

