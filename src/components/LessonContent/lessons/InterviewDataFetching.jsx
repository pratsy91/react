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
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useMutation:</p>
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
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useInfiniteQuery:</p>
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
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Optimistic Updates:</p>
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
          </div>
        </div>
      </section>

      {/* Query Invalidation */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Query Invalidation Strategies</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Invalidation Patterns:</p>
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
          </div>
        </div>
      </section>

      {/* Cache Management */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Cache Management</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Cache Configuration:</p>
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
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Loading States Management</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Loading State Options:</p>
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
          </div>
        </div>
      </section>

      {/* Refetching Strategies */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Refetching Strategies</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Refetch Options:</p>
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
          </div>
        </div>
      </section>

      {/* Parallel and Dependent Queries */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Parallel and Dependent Queries</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Parallel Queries:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Dashboard() {
  // Execute simultaneously
  const users = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  const posts = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  const stats = useQuery({ queryKey: ['stats'], queryFn: fetchStats });
  
  // All load in parallel
}`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Dependent Queries:</p>
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
          </div>
        </div>
      </section>

      {/* SWR */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">SWR</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Basic Usage:</p>
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
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Mutations:</p>
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

