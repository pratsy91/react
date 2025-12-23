import { useState } from 'react';

function ServerComponentsStable() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Server Components (Stable)</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Stable Server Components (React 19)</h3>
        <p className="text-blue-800 mb-2">
          React Server Components are now stable in React 19, meaning they're production-ready and no longer experimental. Server 
          Components enable a new architecture where components can run on the server, reducing client bundle size and enabling 
          direct access to server-side resources. This is a fundamental shift in how React applications can be built.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>What Changed in React 19:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Stable API:</strong> No longer experimental, production-ready</li>
            <li><strong>Better Integration:</strong> Improved integration with Client Components</li>
            <li><strong>Enhanced Features:</strong> More features and better performance</li>
            <li><strong>Better Documentation:</strong> Comprehensive documentation and guides</li>
            <li><strong>Ecosystem Support:</strong> Better tooling and framework support</li>
            <li><strong>Type Safety:</strong> Improved TypeScript support</li>
          </ul>
          <p className="mt-2"><strong>Key Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Smaller client bundles - server code never sent to client</li>
            <li>Direct database access - no API layer needed</li>
            <li>Better security - sensitive code stays on server</li>
            <li>Faster initial loads - less JavaScript to download</li>
            <li>Better SEO - content rendered on server</li>
            <li>Production-ready - stable and well-tested</li>
          </ul>
          <p className="mt-2"><strong>When to Use Server Components:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Data fetching and database access</li>
            <li>Static or server-rendered content</li>
            <li>When you want to reduce client bundle size</li>
            <li>For better initial page load performance</li>
            <li>Applications with server-side rendering needs</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Stable Server Components</h3>
        <p className="text-gray-700 mb-4">
          React 19 makes Server Components stable (no longer experimental).
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Server Components (Stable)
// No longer experimental in React 19

// Server Component
// Runs only on server
async function BlogPost({ slug }) {
  const post = await getPost(slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

// Client Component
// Marked with 'use client'
'use client';

function InteractiveButton() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

// Mixed Components
// Server component can render client component
async function Page() {
  const data = await fetchData();
  
  return (
    <div>
      <ServerContent data={data} />
      <InteractiveButton />
    </div>
  );
}

// Server Component Benefits
// - Zero bundle size
// - Direct database access
// - Secure API keys
// - Faster initial load
// - Better SEO

// When to Use Server Components
// - Static content
// - Data fetching
// - Accessing backend resources
// - Large dependencies
// - Sensitive data

// When to Use Client Components
// - Interactivity
// - Browser APIs
// - State management
// - Effects
// - Event handlers`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">RSC Architecture</h3>
        <p className="text-gray-700 mb-4">
          React Server Components architecture.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// RSC Architecture
// Server and Client Components work together

// Server Component Tree
async function App() {
  const data = await fetchData();
  
  return (
    <Layout>
      <Header />
      <Content data={data} />
      <Footer />
    </Layout>
  );
}

// Client Component Boundary
'use client';

function Content({ data }) {
  const [filter, setFilter] = useState('all');
  
  return (
    <div>
      <Filter value={filter} onChange={setFilter} />
      <DataList data={data} filter={filter} />
    </div>
  );
}

// Component Boundaries
// Server components can import client components
// Client components cannot import server components

// ✅ Server Component → Client Component
async function ServerPage() {
  return <ClientButton />;
}

// ❌ Client Component → Server Component
'use client';
function ClientPage() {
  return <ServerContent />; // Error!
}

// Props Passing
// Server components can pass props to client components
async function ServerPage() {
  const data = await fetchData();
  return <ClientComponent data={data} />;
}

// Props must be serializable
// - Primitives
// - Plain objects
// - Arrays
// - Dates
// - Not: Functions, Classes, Symbols

// Component Composition
// Compose server and client components
async function Page() {
  return (
    <ServerLayout>
      <ServerHeader />
      <ClientInteractiveSection />
      <ServerFooter />
    </ServerLayout>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Client/Server Boundaries</h3>
        <p className="text-gray-700 mb-4">
          Understanding client/server boundaries in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Client/Server Boundaries
// Clear separation between server and client

// Server Component (Default)
async function ServerComponent() {
  // Can: Fetch data, access DB, use server APIs
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Component (Explicit)
'use client';

function ClientComponent() {
  // Can: Use hooks, event handlers, browser APIs
  const [state, setState] = useState(0);
  return <button onClick={() => setState(s => s + 1)}>{state}</button>;
}

// Boundary Rules
// 1. Server components can render client components
// 2. Client components cannot render server components
// 3. Props must be serializable
// 4. No shared state between server/client

// Import Rules
// Server component can import client component
import ClientButton from './ClientButton';

async function ServerPage() {
  return <ClientButton />;
}

// Client component cannot import server component
'use client';
import ServerContent from './ServerContent'; // Error!

// Props Serialization
// Server → Client props must be serializable
async function ServerPage() {
  const data = { name: 'John', age: 30 };
  return <ClientComponent data={data} />; // ✅
}

async function ServerPage() {
  const handler = () => {}; // ❌ Not serializable
  return <ClientComponent onClick={handler} />; // Error!
}

// Children Pattern
// Pass server components as children
'use client';

function ClientWrapper({ children }) {
  return <div className="wrapper">{children}</div>;
}

async function ServerPage() {
  return (
    <ClientWrapper>
      <ServerContent /> {/* ✅ Works as children */}
    </ClientWrapper>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Fetching</h3>
        <p className="text-gray-700 mb-4">
          Data fetching in Server Components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Data Fetching
// Server Components fetch data directly

// Direct Database Access
async function UserProfile({ userId }) {
  const user = await db.users.findUnique({ where: { id: userId } });
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// API Calls
async function ProductsList() {
  const products = await fetch('https://api.example.com/products')
    .then(res => res.json());
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// Multiple Data Sources
async function Dashboard() {
  const [users, posts, stats] = await Promise.all([
    db.users.findMany(),
    db.posts.findMany(),
    fetchStats()
  ]);
  
  return (
    <div>
      <UsersList users={users} />
      <PostsList posts={posts} />
      <StatsDisplay stats={stats} />
    </div>
  );
}

// Sequential Fetching
async function UserPosts({ userId }) {
  const user = await db.users.findUnique({ where: { id: userId } });
  const posts = await db.posts.findMany({ where: { userId } });
  
  return (
    <div>
      <h1>{user.name}'s Posts</h1>
      <PostsList posts={posts} />
    </div>
  );
}

// Caching
// Server Components support caching
async function CachedData() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache' // Next.js caching
  });
  
  return <div>{data}</div>;
}

// Revalidation
async function RevalidatedData() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  
  return <div>{data}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Streaming SSR</h3>
        <p className="text-gray-700 mb-4">
          Streaming Server-Side Rendering with Server Components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Streaming SSR
// Stream Server Components to client

// Basic Streaming
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ServerComponent />
    </Suspense>
  );
}

// Progressive Streaming
// Stream content as it becomes available
function Page() {
  return (
    <div>
      <Header /> {/* Streams immediately */}
      <Suspense fallback={<ContentLoading />}>
        <MainContent /> {/* Streams when ready */}
      </Suspense>
      <Footer /> {/* Streams immediately */}
    </div>
  );
}

// Multiple Suspense Boundaries
function Page() {
  return (
    <div>
      <Suspense fallback={<Loading1 />}>
        <Section1 />
      </Suspense>
      <Suspense fallback={<Loading2 />}>
        <Section2 />
      </Suspense>
    </div>
  );
}

// Streaming Benefits
// - Faster Time to First Byte (TTFB)
// - Progressive rendering
// - Better perceived performance
// - Reduced blocking

// Streaming with Error Boundaries
function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ServerComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

// Selective Hydration
// Client components hydrate as they stream
function Page() {
  return (
    <div>
      <ServerContent />
      <Suspense fallback={<Loading />}>
        <ClientInteractiveComponent />
      </Suspense>
    </div>
  );
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ServerComponentsStable;

