import { useState } from 'react';

function AsyncComponents() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Async Components</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Async Component Support</h3>
        <p className="text-gray-700 mb-4">
          React 19 supports async components for data fetching.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Async Components
// Components can be async functions

// Basic Async Component
async function UserProfile({ userId }) {
  const user = await fetchUser(userId);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Async Component with Error Handling
async function ProductPage({ id }) {
  try {
    const product = await fetchProduct(id);
    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    );
  } catch (error) {
    return <div>Error loading product</div>;
  }
}

// Multiple Async Calls
async function Dashboard() {
  const [user, posts, notifications] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchNotifications()
  ]);
  
  return (
    <div>
      <UserInfo user={user} />
      <PostsList posts={posts} />
      <NotificationsList notifications={notifications} />
    </div>
  );
}

// Sequential Async Calls
async function UserPosts({ userId }) {
  const user = await fetchUser(userId);
  const posts = await fetchUserPosts(userId);
  
  return (
    <div>
      <h1>{user.name}'s Posts</h1>
      <PostsList posts={posts} />
    </div>
  );
}

// Async Component with Loading
// Use Suspense for loading states
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userId={1} />
    </Suspense>
  );
}

// Server Components
// Async components work great with Server Components
async function BlogPost({ slug }) {
  const post = await getPost(slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Promise Handling</h3>
        <p className="text-gray-700 mb-4">
          How React 19 handles promises in async components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Promise Handling
// React automatically unwraps promises

// Promise Unwrapping
async function DataComponent() {
  const data = await fetchData();
  // React waits for promise to resolve
  return <div>{data.content}</div>;
}

// Multiple Promises
async function MultiDataComponent() {
  const promise1 = fetchData1();
  const promise2 = fetchData2();
  
  const [data1, data2] = await Promise.all([promise1, promise2]);
  
  return (
    <div>
      <div>{data1.content}</div>
      <div>{data2.content}</div>
    </div>
  );
}

// Promise with Timeout
async function DataWithTimeout() {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 5000)
  );
  
  try {
    const data = await Promise.race([
      fetchData(),
      timeoutPromise
    ]);
    return <div>{data.content}</div>;
  } catch (error) {
    return <div>Request timed out</div>;
  }
}

// Conditional Async
async function ConditionalData({ shouldFetch }) {
  if (!shouldFetch) {
    return <div>No data needed</div>;
  }
  
  const data = await fetchData();
  return <div>{data.content}</div>;
}

// Async with use() Hook
// Alternative to async components
function DataComponent({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data.content}</div>;
}

// Error Boundaries
// Async components work with error boundaries
async function RiskyComponent() {
  const data = await fetchData();
  if (!data) {
    throw new Error('No data');
  }
  return <div>{data.content}</div>;
}

function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <RiskyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Suspense Integration</h3>
        <p className="text-gray-700 mb-4">
          Async components integrate with Suspense.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Suspense Integration
// Async components work with Suspense

// Basic Suspense
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <AsyncComponent />
    </Suspense>
  );
}

// Multiple Async Components
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userId={1} />
      <PostsList userId={1} />
    </Suspense>
  );
}

// Nested Suspense
function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Page>
        <Suspense fallback={<SectionLoading />}>
          <Section1 />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Section2 />
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

// Streaming with Suspense
// React streams async components
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <FastComponent />
      <SlowAsyncComponent />
    </Suspense>
  );
}

// FastComponent renders immediately
// SlowAsyncComponent streams when ready`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Boundaries</h3>
        <p className="text-gray-700 mb-4">
          Error handling in async components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Error Boundaries
// Handle errors in async components

// Error in Async Component
async function DataComponent() {
  const data = await fetchData();
  if (!data) {
    throw new Error('No data available');
  }
  return <div>{data.content}</div>;
}

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<Loading />}>
        <DataComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

// Try-Catch in Component
async function SafeComponent() {
  try {
    const data = await fetchData();
    return <div>{data.content}</div>;
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
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
        <DataComponent />
      </Suspense>
    </ErrorBoundary>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Loading States</h3>
        <p className="text-gray-700 mb-4">
          Managing loading states with async components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Loading States
// Use Suspense for loading states

// Basic Loading
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AsyncComponent />
    </Suspense>
  );
}

// Custom Loading Component
function App() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UserProfile userId={1} />
    </Suspense>
  );
}

// Multiple Loading States
function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
      <Footer />
    </Suspense>
  );
}

// Progressive Loading
// Show content as it loads
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <FastContent />
      <Suspense fallback={<Loading />}>
        <SlowContent />
      </Suspense>
    </Suspense>
  );
}

// Loading with useTransition
function App() {
  const [isPending, startTransition] = useTransition();
  
  return (
    <>
      {isPending && <Loading />}
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>
    </>
  );
}

// Skeleton Screens
function LoadingSkeleton() {
  return (
    <div>
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
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default AsyncComponents;

