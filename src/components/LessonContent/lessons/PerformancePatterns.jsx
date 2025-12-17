import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Throttle hook
function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

function PerformancePatterns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(0);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const throttledCount = useThrottle(count, 1000);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Performance Patterns</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Debouncing and Throttling</h3>
        <p className="text-gray-700 mb-4">
          Debounce delays execution until after a pause. Throttle limits execution frequency.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to see debouncing (500ms delay)"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <p className="text-sm text-gray-600">
              Search term: <strong>{searchTerm}</strong>
            </p>
            <p className="text-sm text-blue-600">
              Debounced (for API call): <strong>{debouncedSearch}</strong>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Notice: Debounced value only updates 500ms after you stop typing
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">Count: {count}</p>
            <p className="text-sm text-green-600">
              Throttled (max once per second): <strong>{throttledCount}</strong>
            </p>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Click Rapidly (Throttled)
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Debounce - wait for pause
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debounced;
}

// Throttle - limit frequency
function useThrottle(value, limit) {
  // Implementation limits updates to once per limit ms
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Optimistic UI Updates</h3>
        <p className="text-gray-700 mb-4">
          Update UI immediately, then revert if the operation fails.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <OptimisticUpdateExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Request Deduplication</h3>
        <p className="text-gray-700 mb-4">
          Prevent duplicate API calls for the same data.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <RequestDeduplicationExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Image Lazy Loading</h3>
        <p className="text-gray-700 mb-4">
          Load images only when they're about to enter the viewport.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ImageLazyLoadingExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Windowing/Virtualization</h3>
        <p className="text-gray-700 mb-4">
          Only render items visible in the viewport for large lists.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Use libraries like react-window or react-virtualized
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index]}
        </div>
      )}
    </FixedSizeList>
  );
}`}</pre>
          <p className="text-sm text-gray-600 mt-2">
            Libraries: react-window, react-virtualized, @tanstack/react-virtual
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Bundle Analysis and Optimization</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Tools for Bundle Analysis:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li><strong>webpack-bundle-analyzer:</strong> Visualize bundle contents</li>
            <li><strong>source-map-explorer:</strong> Analyze bundle sizes</li>
            <li><strong>Vite build --analyze:</strong> Built-in analysis</li>
            <li><strong>Chrome DevTools:</strong> Coverage tab, Performance tab</li>
          </ul>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Optimization Tips:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
              <li>Remove unused dependencies</li>
              <li>Use dynamic imports for large libraries</li>
              <li>Tree-shake unused code</li>
              <li>Optimize images and assets</li>
              <li>Use production builds</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// Optimistic Update Example
function OptimisticUpdateExample() {
  const [likes, setLikes] = useState(10);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLike = async () => {
    const previousLikes = likes;
    
    // Optimistic update
    setLikes(likes + 1);
    setIsUpdating(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success - keep the update
    } catch (error) {
      // Revert on error
      setLikes(previousLikes);
      alert('Failed to update. Reverted.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded">
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          disabled={isUpdating}
          className={`px-4 py-2 rounded ${
            isUpdating ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isUpdating ? 'Updating...' : '👍 Like'}
        </button>
        <span className="text-lg font-semibold">Likes: {likes}</span>
      </div>
      <p className="text-xs text-gray-600 mt-2">
        UI updates immediately, reverts if API call fails
      </p>
    </div>
  );
}

// Request Deduplication Example
function RequestDeduplicationExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const requestCache = useRef(new Map());

  const fetchData = useCallback(async (id) => {
    // Check cache
    if (requestCache.current.has(id)) {
      const cached = requestCache.current.get(id);
      if (cached.promise) {
        // Request in progress, wait for it
        const result = await cached.promise;
        setData(result);
        return;
      }
      // Use cached result
      setData(cached.data);
      return;
    }

    setLoading(true);
    const promise = fetch(`/api/data/${id}`)
      .then(res => res.json())
      .then(result => {
        requestCache.current.set(id, { data: result, promise: null });
        setData(result);
        setLoading(false);
        return result;
      })
      .catch(error => {
        requestCache.current.delete(id);
        setLoading(false);
        throw error;
      });

    requestCache.current.set(id, { data: null, promise });
  }, []);

  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm text-gray-700 mb-2">
        Click multiple times rapidly - only one request is made
      </p>
      <button
        onClick={() => fetchData(1)}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {data && (
        <p className="text-sm text-gray-600 mt-2">Data: {JSON.stringify(data)}</p>
      )}
    </div>
  );
}

// Image Lazy Loading Example
function ImageLazyLoadingExample() {
  return (
    <div className="p-4 bg-white rounded">
      <p className="text-sm text-gray-700 mb-2">Native lazy loading:</p>
      <pre className="text-xs bg-gray-100 p-2 rounded mb-4">{`<img 
  src="image.jpg" 
  loading="lazy" 
  alt="Description"
/>`}</pre>
      <p className="text-sm text-gray-700 mb-2">With Intersection Observer:</p>
      <pre className="text-xs bg-gray-100 p-2 rounded">{`function LazyImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsLoaded(true);
        observer.disconnect();
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : undefined}
      alt={alt}
    />
  );
}`}</pre>
    </div>
  );
}

export default PerformancePatterns;

