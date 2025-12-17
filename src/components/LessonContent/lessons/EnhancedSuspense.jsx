import { useState } from 'react';

function EnhancedSuspense() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Enhanced Suspense</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Suspense Improvements</h3>
        <p className="text-gray-700 mb-4">
          React 19 enhances Suspense with better support and features.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Enhanced Suspense
// Better Suspense support in React 19

// Basic Suspense
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <AsyncComponent />
    </Suspense>
  );
}

// Multiple Suspense Boundaries
function App() {
  return (
    <div>
      <Suspense fallback={<HeaderLoading />}>
        <Header />
      </Suspense>
      <Suspense fallback={<ContentLoading />}>
        <Content />
      </Suspense>
    </div>
  );
}

// Nested Suspense
function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Page>
        <Suspense fallback={<SectionLoading />}>
          <Section />
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
        <AsyncComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

// Suspense for Data Fetching
// Works with async components and use() hook
async function DataComponent() {
  const data = await fetchData();
  return <div>{data.content}</div>;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent />
    </Suspense>
  );
}

// Suspense for Code Splitting
const LazyComponent = lazy(() => import('./Component'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Multiple Boundaries</h3>
        <p className="text-gray-700 mb-4">
          Using multiple Suspense boundaries for granular loading.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Multiple Boundaries
// Independent loading states

// Independent Sections
function Page() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}

// Progressive Loading
// Show content as it loads
function App() {
  return (
    <div>
      <StaticHeader />
      <Suspense fallback={<Loading />}>
        <FastContent />
        <Suspense fallback={<Loading />}>
          <SlowContent />
        </Suspense>
      </Suspense>
    </div>
  );
}

// Parallel Loading
// Load multiple sections in parallel
function Dashboard() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Widget1 />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Widget2 />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Widget3 />
      </Suspense>
    </div>
  );
}

// Conditional Boundaries
function App({ showSection }) {
  return (
    <div>
      <MainContent />
      {showSection && (
        <Suspense fallback={<Loading />}>
          <ConditionalSection />
        </Suspense>
      )}
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Nested Suspense</h3>
        <p className="text-gray-700 mb-4">
          Nested Suspense boundaries for complex loading patterns.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Nested Suspense
// Suspense boundaries can be nested

// Basic Nesting
function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Page>
        <Suspense fallback={<SectionLoading />}>
          <Section />
        </Suspense>
      </Page>
    </Suspense>
  );
}

// Multiple Nested Levels
function App() {
  return (
    <Suspense fallback={<AppLoading />}>
      <App>
        <Suspense fallback={<PageLoading />}>
          <Page>
            <Suspense fallback={<ComponentLoading />}>
              <Component />
            </Suspense>
          </Page>
        </Suspense>
      </App>
    </Suspense>
  );
}

// Independent Nested Boundaries
function Page() {
  return (
    <div>
      <Suspense fallback={<Loading1 />}>
        <Section1>
          <Suspense fallback={<Loading2 />}>
            <SubSection1 />
          </Suspense>
        </Section1>
      </Suspense>
      <Suspense fallback={<Loading3 />}>
        <Section2>
          <Suspense fallback={<Loading4 />}>
            <SubSection2 />
          </Suspense>
        </Section2>
      </Suspense>
    </div>
  );
}

// Fallback Inheritance
// Inner Suspense uses its own fallback
function App() {
  return (
    <Suspense fallback={<OuterLoading />}>
      <Outer>
        <Suspense fallback={<InnerLoading />}>
          <Inner />
        </Suspense>
      </Outer>
    </Suspense>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Boundaries Integration</h3>
        <p className="text-gray-700 mb-4">
          Integrating Suspense with Error Boundaries.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Error Boundaries Integration
// Suspense works with Error Boundaries

// Basic Integration
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

// Multiple Error Boundaries
function App() {
  return (
    <ErrorBoundary fallback={<AppError />}>
      <Suspense fallback={<Loading />}>
        <Section1>
          <ErrorBoundary fallback={<SectionError />}>
            <Suspense fallback={<Loading />}>
              <SubComponent />
            </Suspense>
          </ErrorBoundary>
        </Section1>
      </Suspense>
    </ErrorBoundary>
  );
}

// Error Recovery
function App() {
  const [retry, setRetry] = useState(0);
  
  return (
    <ErrorBoundary
      fallback={<ErrorPage onRetry={() => setRetry(r => r + 1)} />}
      key={retry}
    >
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

// Selective Error Handling
function App() {
  return (
    <div>
      <ErrorBoundary fallback={<Error1 />}>
        <Suspense fallback={<Loading1 />}>
          <Component1 />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<Error2 />}>
        <Suspense fallback={<Loading2 />}>
          <Component2 />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Loading Patterns</h3>
        <p className="text-gray-700 mb-4">
          Common loading patterns with Suspense.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Loading Patterns
// Common patterns for loading states

// Skeleton Screens
function LoadingSkeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-content" />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Content />
    </Suspense>
  );
}

// Spinner
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Content />
    </Suspense>
  );
}

// Progressive Loading
function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<ContentSkeleton />}>
        <Content />
      </Suspense>
      <Footer />
    </div>
  );
}

// Staggered Loading
function App() {
  return (
    <div>
      <Suspense fallback={<Loading1 />}>
        <FastComponent />
      </Suspense>
      <Suspense fallback={<Loading2 />}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

// Inline Loading
function Component() {
  return (
    <div>
      <StaticContent />
      <Suspense fallback={<InlineSpinner />}>
        <AsyncContent />
      </Suspense>
    </div>
  );
}

// Full Page Loading
function App() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Page />
    </Suspense>
  );
}

// Best Practices
// 1. Use appropriate fallback UI
// 2. Match fallback to content structure
// 3. Show loading state immediately
// 4. Use skeleton screens for better UX
// 5. Handle errors gracefully
// 6. Consider loading priorities`}</pre>
        </div>
      </section>
    </div>
  );
}

export default EnhancedSuspense;

