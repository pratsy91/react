import { useState } from 'react';

function ReactQuery() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React Query / TanStack Query</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete API Coverage</h3>
        <p className="text-gray-700 mb-4">
          React Query (now TanStack Query) provides powerful data fetching, caching, and synchronization.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// Setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useQuery</h3>
        <p className="text-gray-700 mb-4">
          useQuery is the primary hook for fetching data.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    enabled: !!userId, // Only fetch if userId exists
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 3, // Retry 3 times on error
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  
  return <div>{data.name}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useMutation</h3>
        <p className="text-gray-700 mb-4">
          useMutation handles data mutations (create, update, delete).
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateUser() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Mutation failed:', error);
    }
  });

  return (
    <button
      onClick={() => mutation.mutate({ name: 'John', email: 'john@example.com' })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Creating...' : 'Create User'}
    </button>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useInfiniteQuery</h3>
        <p className="text-gray-700 mb-4">
          useInfiniteQuery handles paginated or infinite list data.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { useInfiniteQuery } from '@tanstack/react-query';

function InfiniteUsers() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) =>
      fetch(\`/api/users?page=\${pageParam}\`).then(res => res.json()),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1
  });

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.users.map(user => <div key={user.id}>{user.name}</div>)}
        </div>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Query Invalidation</h3>
        <p className="text-gray-700 mb-4">
          Invalidate queries to trigger refetching when data changes.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { useQueryClient } from '@tanstack/react-query';

function useInvalidateQueries() {
  const queryClient = useQueryClient();

  // Invalidate specific query
  queryClient.invalidateQueries({ queryKey: ['user', 1] });

  // Invalidate all queries with prefix
  queryClient.invalidateQueries({ queryKey: ['users'] });

  // Invalidate all queries
  queryClient.invalidateQueries();

  // Refetch immediately
  queryClient.refetchQueries({ queryKey: ['users'] });

  // Remove from cache
  queryClient.removeQueries({ queryKey: ['user', 1] });
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Optimistic Updates</h3>
        <p className="text-gray-700 mb-4">
          Update UI immediately, then rollback if mutation fails.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    
    // Snapshot previous value
    const previousTodos = queryClient.getQueryData(['todos']);
    
    // Optimistically update
    queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);
    
    return { previousTodos };
  },
  onError: (err, newTodo, context) => {
    // Rollback on error
    queryClient.setQueryData(['todos'], context.previousTodos);
  },
  onSettled: () => {
    // Refetch after error or success
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Cache Management</h3>
        <p className="text-gray-700 mb-4">
          React Query provides powerful cache management capabilities.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Set cache data manually
queryClient.setQueryData(['user', 1], { name: 'John' });

// Get cache data
const user = queryClient.getQueryData(['user', 1]);

// Prefetch data
await queryClient.prefetchQuery({
  queryKey: ['user', 1],
  queryFn: () => fetchUser(1)
});

// Clear all cache
queryClient.clear();

// Get all queries
const queries = queryClient.getQueryCache().getAll();`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Prefetching</h3>
        <p className="text-gray-700 mb-4">
          Prefetch data before it's needed for better UX.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { useQueryClient } from '@tanstack/react-query';

function UserLink({ userId }) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    // Prefetch on hover
    queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: () => fetchUser(userId),
      staleTime: 5 * 60 * 1000
    });
  };

  return (
    <Link
      to={\`/user/\${userId}\`}
      onMouseEnter={handleMouseEnter}
    >
      User {userId}
    </Link>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Suspense Mode</h3>
        <p className="text-gray-700 mb-4">
          Use React Suspense with React Query for declarative loading states.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });
  
  // No loading state needed - Suspense handles it
  return <div>{data.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userId={1} />
    </Suspense>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Query Keys Strategies</h3>
        <p className="text-gray-700 mb-4">
          Query keys are crucial for cache management and invalidation.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Simple key
['users']

// With parameters
['user', userId]
['posts', { userId, page }]

// Hierarchical keys
['users', userId, 'posts']
['users', userId, 'posts', postId]

// Array keys (for filtering)
['users', { status: 'active', page: 1 }]

// Best practices:
// 1. Be specific
['user', userId] // Good
['user'] // Bad - too generic

// 2. Use consistent structure
['users', userId] // Good
[userId, 'user'] // Bad - inconsistent

// 3. Include all dependencies
['posts', { userId, filters, sort }] // Good
['posts', userId] // Bad - missing filters`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete React Query API</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Hook/API</th>
                <th className="text-left p-2">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2"><code>useQuery</code></td>
                <td className="p-2">Fetch and cache data</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>useMutation</code></td>
                <td className="p-2">Create, update, delete operations</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>useInfiniteQuery</code></td>
                <td className="p-2">Paginated/infinite lists</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>useSuspenseQuery</code></td>
                <td className="p-2">Query with Suspense</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>useQueryClient</code></td>
                <td className="p-2">Access query client</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>useIsFetching</code></td>
                <td className="p-2">Check if queries are fetching</td>
              </tr>
              <tr>
                <td className="p-2"><code>useIsMutating</code></td>
                <td className="p-2">Check if mutations are pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ReactQuery;

