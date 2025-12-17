import { useState } from 'react';

function SWR() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">SWR</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete SWR API</h3>
        <p className="text-gray-700 mb-4">
          SWR (stale-while-revalidate) is a data fetching library with built-in caching and revalidation.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import useSWR from 'swr';

// Setup fetcher function
const fetcher = (url) => fetch(url).then(res => res.json());

// Basic usage
function Profile() {
  const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return <div>Hello {data.name}!</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Revalidation Strategies</h3>
        <p className="text-gray-700 mb-4">
          SWR provides multiple revalidation strategies to keep data fresh.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import useSWR from 'swr';

// Automatic revalidation (default)
const { data } = useSWR('/api/user', fetcher, {
  revalidateOnFocus: true,      // Revalidate on window focus
  revalidateOnReconnect: true,  // Revalidate on network reconnect
  revalidateIfStale: true,       // Revalidate if data is stale
  refreshInterval: 0,            // Polling interval (0 = disabled)
  dedupingInterval: 2000        // Dedupe requests within 2s
});

// Manual revalidation
const { data, mutate } = useSWR('/api/user', fetcher);

// Revalidate on demand
mutate();

// Revalidate with new data
mutate({ ...data, name: 'New Name' }, false); // false = don't revalidate

// Conditional fetching
const { data } = useSWR(
  userId ? \`/api/user/\${userId}\` : null, // null = don't fetch
  fetcher
);

// On-demand revalidation
const { data, mutate } = useSWR('/api/user', fetcher, {
  revalidateOnMount: false,     // Don't fetch on mount
  revalidateOnFocus: false,      // Don't revalidate on focus
  revalidateOnReconnect: false  // Don't revalidate on reconnect
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Mutations</h3>
        <p className="text-gray-700 mb-4">
          Use mutate to update cache and trigger revalidation.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import useSWR, { useSWRConfig } from 'swr';

function UserProfile() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const { mutate: globalMutate } = useSWRConfig();

  const updateName = async (newName) => {
    // Optimistic update
    mutate({ ...data, name: newName }, false);
    
    // Update on server
    await fetch('/api/user', {
      method: 'PATCH',
      body: JSON.stringify({ name: newName })
    });
    
    // Revalidate
    mutate();
  };

  // Mutate other keys
  globalMutate('/api/users'); // Revalidate all users

  return (
    <div>
      <p>{data?.name}</p>
      <button onClick={() => updateName('New Name')}>
        Update Name
      </button>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">All SWR Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">useSWR</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const { data, error, isLoading, isValidating, mutate } = useSWR(
  key,
  fetcher,
  options
);

// Returns:
// data - fetched data
// error - error object
// isLoading - initial loading state
// isValidating - revalidating state
// mutate - function to update cache`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useSWRConfig</h4>
              <pre className="text-sm bg-white p-2 rounded">{`import { useSWRConfig } from 'swr';

function Component() {
  const { cache, mutate, ...config } = useSWRConfig();
  
  // Access global cache
  const data = cache.get('/api/user');
  
  // Mutate any key
  mutate('/api/users');
}`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useSWRInfinite</h4>
              <pre className="text-sm bg-white p-2 rounded">{`import useSWRInfinite from 'swr/infinite';

function InfiniteList() {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useSWRInfinite(
    (index) => \`/api/users?page=\${index + 1}\`,
    fetcher
  );

  return (
    <div>
      {data?.map((page, i) => (
        <div key={i}>
          {page.map(user => <div key={user.id}>{user.name}</div>)}
        </div>
      ))}
      <button onClick={() => setSize(size + 1)}>
        Load More
      </button>
    </div>
  );
}`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">SWRConfig Provider</h4>
              <pre className="text-sm bg-white p-2 rounded">{`import { SWRConfig } from 'swr';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then(res => res.json()),
        revalidateOnFocus: false,
        refreshInterval: 0,
        dedupingInterval: 2000
      }}
    >
      <YourApp />
    </SWRConfig>
  );
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">SWR Features</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
            <li><strong>Automatic revalidation:</strong> Keeps data fresh automatically</li>
            <li><strong>Deduplication:</strong> Prevents duplicate requests</li>
            <li><strong>Focus revalidation:</strong> Refetches when window regains focus</li>
            <li><strong>Interval polling:</strong> Automatic polling support</li>
            <li><strong>Local mutation:</strong> Update cache optimistically</li>
            <li><strong>Error retry:</strong> Automatic retry on error</li>
            <li><strong>Pagination:</strong> Built-in infinite scroll support</li>
            <li><strong>TypeScript:</strong> Full TypeScript support</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete Example</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`import useSWR from 'swr';
import { SWRConfig } from 'swr';

// Global configuration
function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then(res => res.json()),
        onError: (error) => {
          console.error('SWR Error:', error);
        },
        revalidateOnFocus: true,
        refreshInterval: 0
      }}
    >
      <Users />
    </SWRConfig>
  );
}

// Component
function Users() {
  const { data, error, isLoading, mutate } = useSWR('/api/users', {
    revalidateOnFocus: true,
    dedupingInterval: 2000
  });

  if (error) return <div>Error loading users</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default SWR;

