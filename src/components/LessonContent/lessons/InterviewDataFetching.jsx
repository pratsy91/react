function InterviewDataFetching() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Fetching Libraries - Interview Cheatsheet</h2>
        <p className="text-gray-700">Complete guide to data fetching in React interviews</p>
      </div>

      {/* React Query */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React Query / TanStack Query</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useQuery:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useQuery is a hook for fetching and caching server state. queryKey uniquely identifies the query and is used for caching and invalidation. queryFn is the async function that fetches data. staleTime determines how long data is considered fresh (won't refetch). cacheTime is how long unused data stays in cache. React Query automatically handles loading states, error states, caching, and refetching.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5000,
    cacheTime: 10000
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data.name}</div>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> queryKey must be unique and stable. queryFn can be async or return a promise. isLoading is true on initial load. error contains error object if fetch fails. data is undefined until fetch completes.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useMutation:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useMutation handles server state mutations (create, update, delete). Unlike queries, mutations are triggered manually with mutate(). onSuccess runs after successful mutation - perfect for invalidating related queries to refetch fresh data. useQueryClient provides access to query cache for invalidation. Mutations don't cache like queries - they execute immediately when called.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateUser() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
  
  return (
    <button onClick={() => mutation.mutate({ name: 'John' })}>
      Create User
    </button>
  );
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> mutationFn is the async function that performs mutation. mutate() triggers the mutation. onSuccess/onError are lifecycle callbacks. invalidateQueries refetches related queries. Mutations are not cached - they execute on demand.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useInfiniteQuery:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useInfiniteQuery handles paginated data that loads incrementally (infinite scroll, "load more"). It maintains an array of pages. queryFn receives pageParam which changes for each page. getNextPageParam determines if there's a next page and what its pageParam should be. data.pages is an array of all loaded pages. fetchNextPage loads the next page. hasNextPage indicates if more pages exist.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { useInfiniteQuery } from '@tanstack/react-query';

function InfiniteList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor
  });
  
  return (
    <>
      {data.pages.map(page => page.items.map(item => <Item key={item.id} />))}
      <button 
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load More
      </button>
    </>
  );
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> data.pages contains all loaded pages. pageParam is passed to queryFn for each page. getNextPageParam returns next pageParam or undefined (no more pages). fetchNextPage loads next page. Perfect for infinite scroll patterns.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Optimistic Updates:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Optimistic updates show UI changes immediately before server confirms. onMutate runs before mutation - cancel in-flight queries, snapshot current data, update cache optimistically, return snapshot for rollback. onError runs if mutation fails - restore previous data from snapshot. onSettled runs after success or error - invalidate to refetch actual data. This provides instant feedback while handling errors gracefully.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previousTodos = queryClient.getQueryData(['todos']);
    queryClient.setQueryData(['todos'], old => [...old, newTodo]);
    return { previousTodos };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
});`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> onMutate updates cache before mutation. Return value becomes context for onError. onError reverts on failure. onSettled always runs (cleanup). Provides instant UI feedback. Must handle rollback on error.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Query Invalidation */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Query Invalidation Strategies</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Invalidation Patterns:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Query invalidation marks cached data as stale and triggers refetch. Specific queries are invalidated by exact queryKey match. Prefix matching invalidates all queries starting with that key. refetchType controls which queries refetch: 'active' (mounted), 'all' (all matching), or 'none' (just mark stale). removeQueries deletes from cache without refetching. Invalidation is essential after mutations to keep UI in sync.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Invalidate specific query
queryClient.invalidateQueries({ queryKey: ['users', userId] });

// Invalidate all queries with prefix
queryClient.invalidateQueries({ queryKey: ['users'] });

// Invalidate and refetch
queryClient.invalidateQueries({ 
  queryKey: ['users'],
  refetchType: 'active' // or 'all' or 'none'
});

// Remove from cache
queryClient.removeQueries({ queryKey: ['users'] });`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Invalidation marks data stale. Prefix matching invalidates related queries. refetchType controls refetch behavior. removeQueries deletes without refetching. Use after mutations to sync UI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cache Management */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Cache Management</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Cache Configuration:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> QueryClient configuration sets default behavior for all queries. staleTime is how long data is considered fresh (won't refetch during this time). cacheTime is how long unused data stays in cache after no components use it. retry controls automatic retry on failure. refetchOnWindowFocus refetches when user returns to tab. These defaults can be overridden per-query. Good defaults reduce boilerplate.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: true
    }
  }
});`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> staleTime prevents unnecessary refetches. cacheTime controls memory usage. retry helps with transient failures. refetchOnWindowFocus keeps data fresh. Can override per-query.</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Cache Time vs Stale Time:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>staleTime:</strong> How long data is considered fresh (no refetch)</li>
              <li><strong>cacheTime:</strong> How long unused data stays in cache</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Error Handling in Data Fetching</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Error Handling Patterns:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React Query provides built-in error handling. error contains the error object when query fails. isError is a boolean flag for error state. retry automatically retries failed queries. retryDelay implements exponential backoff (delays increase with each attempt). onError callback allows side effects like logging. Always check isError before accessing error. Combine with Error Boundaries for comprehensive error handling.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function UserProfile({ userId }) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    onError: (error) => {
      // Log to error tracking service
      logError(error);
    }
  });
  
  if (isLoading) return <Spinner />;
  if (isError) return <ErrorBoundary error={error} />;
  
  return <div>{data.name}</div>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Check isError before accessing error. retry handles transient failures. Exponential backoff prevents server overload. onError for side effects. Combine with Error Boundaries for UI errors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Loading States Management</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Loading State Options:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React Query provides multiple loading flags for different scenarios. isLoading is true only on initial load when there's no cached data. isFetching is true whenever a fetch is in progress (initial or background). isRefetching is true when refetching in background (data exists, fetching new). Use isLoading for full-page loaders. Use isFetching for subtle indicators during background updates. This allows showing cached data while fetching fresh data.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData
  });
  
  // isLoading: true only on initial load
  // isFetching: true on any fetch (including background)
  // isRefetching: true when refetching in background
  
  if (isLoading) return <FullPageLoader />;
  if (isFetching && !isRefetching) return <LoadingIndicator />;
  
  return <div>{data}</div>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> isLoading for initial load only. isFetching for any fetch. isRefetching for background updates. Show cached data during background refetch. Different flags enable better UX.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Refetching Strategies */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Refetching Strategies</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Refetch Options:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React Query provides multiple ways to refetch data. refetchOnMount refetches when component mounts (if data is stale). refetchOnWindowFocus refetches when user returns to tab (keeps data fresh). refetchOnReconnect refetches when network reconnects. refetchInterval polls at regular intervals (useful for real-time data). Manual refetch() allows user-triggered refresh. These options balance freshness with performance and network usage.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const { refetch } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  refetchInterval: 5000 // Poll every 5 seconds
});

// Manual refetch
<button onClick={() => refetch()}>Refresh</button>`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> refetchOnMount keeps data fresh on mount. refetchOnWindowFocus syncs after tab switch. refetchInterval enables polling. Manual refetch for user control. Balance freshness with performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallel and Dependent Queries */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Parallel and Dependent Queries</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Parallel Queries:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Parallel queries execute simultaneously when multiple useQuery hooks are called. React Query handles all queries concurrently, improving performance when data sources are independent. All queries start fetching at the same time, reducing total load time. This is the default behavior - just call multiple useQuery hooks and they run in parallel.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Dashboard() {
  // Execute simultaneously
  const users = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  const posts = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  const stats = useQuery({ queryKey: ['stats'], queryFn: fetchStats });
  
  // All load in parallel
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Multiple useQuery calls run in parallel. Independent data sources benefit from parallel fetching. Reduces total load time. Default behavior - no special configuration needed.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Dependent Queries:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Dependent queries require data from another query before executing. Use enabled option to conditionally enable queries. enabled: false prevents query from running. enabled: !!user.data only runs when user.data exists. This creates a sequential dependency: first query must succeed before second runs. Useful when second query needs parameters from first query's result.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function UserPosts({ userId }) {
  const user = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });
  
  const posts = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!user.data // Only fetch when user data exists
  });
  
  if (!user.data) return <div>Loading user...</div>;
  if (!posts.data) return <div>Loading posts...</div>;
  
  return <div>{posts.data}</div>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> enabled controls query execution. Dependent query waits for prerequisite. Sequential execution pattern. Use when queries depend on each other's data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SWR */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">SWR</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Basic Usage:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> SWR (stale-while-revalidate) is a data fetching library. useSWR takes a key (URL) and a fetcher function. It automatically caches, revalidates, and handles loading/error states. The key uniquely identifies the data. fetcher is an async function that fetches data. SWR shows stale data immediately while fetching fresh data in background. It handles caching, deduplication, and automatic revalidation.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);
  
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return <div>Hello {data.name}</div>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Key identifies the data. Fetcher function performs the fetch. Shows stale data while revalidating. Automatic caching and revalidation. Simpler API than React Query.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Mutations:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useSWRMutation handles mutations separately from data fetching. trigger function executes the mutation. Unlike useSWR, mutations don't cache - they execute on demand. After mutation, you typically want to revalidate related SWR keys to refetch fresh data. SWR mutations are simpler than React Query but less feature-rich.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import useSWRMutation from 'swr/mutation';

function Profile() {
  const { trigger } = useSWRMutation('/api/user', updateUser);
  
  const handleUpdate = async () => {
    await trigger({ name: 'New Name' });
  };
  
  return <button onClick={handleUpdate}>Update</button>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> trigger executes mutation. Mutations don't cache. Revalidate related keys after mutation. Simpler than React Query mutations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Data Fetching Best Practices</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Do's:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Use React Query or SWR for server state</li>
              <li>Implement proper loading and error states</li>
              <li>Use query keys effectively</li>
              <li>Cache and invalidate appropriately</li>
              <li>Handle race conditions</li>
              <li>Use optimistic updates for better UX</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">Don'ts:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Don't fetch in render (use useEffect or library)</li>
              <li>Don't ignore error states</li>
              <li>Don't cache sensitive data unnecessarily</li>
              <li>Don't forget to cleanup subscriptions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: React Query vs SWR - which to use?</p>
            <p className="text-gray-700">A: React Query has more features and better DevTools. SWR is simpler and lighter. Both are excellent choices.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you handle race conditions in data fetching?</p>
            <p className="text-gray-700">A: Use AbortController to cancel in-flight requests, or use React Query/SWR which handle this automatically.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewDataFetching;

