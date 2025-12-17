import { useState } from 'react';

function BrowserDevTools() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Browser DevTools</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Profiling</h3>
        <p className="text-gray-700 mb-4">
          Use browser DevTools to profile your application's performance.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Chrome Performance Tab
// 1. Open DevTools (F12)
// 2. Go to Performance tab
// 3. Click record button
// 4. Interact with app
// 5. Stop recording
// 6. Analyze results

// Performance Metrics
// - FPS (Frames Per Second)
// - CPU usage
// - Memory usage
// - Network activity
// - JavaScript execution time

// Timeline View
// - Main thread activity
// - FPS chart
// - Memory chart
// - Network requests
// - User interactions

// Flame Chart
// - JavaScript call stack
// - Function execution time
// - Call hierarchy
// - Performance bottlenecks

// Bottom-Up View
// - Functions sorted by time
// - Self time vs total time
// - Function callers
// - Optimization opportunities

// Call Tree View
// - Function call hierarchy
// - Execution flow
// - Time spent in each function
// - Nested calls

// Performance Recording
// - Record page load
// - Record user interaction
// - Record specific actions
// - Compare recordings

// Identifying Issues
// - Long tasks (>50ms)
// - Layout shifts
// - Forced reflows
// - Expensive repaints
// - Memory leaks

// Performance Optimization
// 1. Reduce JavaScript execution time
// 2. Minimize layout shifts
// 3. Optimize images
// 4. Use code splitting
// 5. Lazy load resources
// 6. Minimize reflows/repaints
// 7. Use requestAnimationFrame

// Web Vitals
// - LCP (Largest Contentful Paint)
// - FID (First Input Delay)
// - CLS (Cumulative Layout Shift)
// - FCP (First Contentful Paint)
// - TTFB (Time to First Byte)

// Performance API
// Measure custom operations
const start = performance.now();
// ... operation
const end = performance.now();
console.log('Duration:', end - start);

// Performance marks
performance.mark('operation-start');
// ... operation
performance.mark('operation-end');
performance.measure('operation', 'operation-start', 'operation-end');

// Performance observer
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Entry:', entry);
  }
});
observer.observe({ entryTypes: ['measure', 'navigation'] });`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Memory Leaks Detection</h3>
        <p className="text-gray-700 mb-4">
          Detect and fix memory leaks in your application.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Chrome Memory Tab
// 1. Open DevTools
// 2. Go to Memory tab
// 3. Take heap snapshot
// 4. Interact with app
// 5. Take another snapshot
// 6. Compare snapshots

// Heap Snapshots
// - View object count
// - See memory allocation
// - Find retained objects
// - Identify memory leaks

// Comparison View
// - Compare two snapshots
// - See memory growth
// - Find leaked objects
// - Track object retention

// Allocation Timeline
// - Record memory allocation
// - See allocation over time
// - Identify allocation patterns
// - Find memory leaks

// Common Memory Leak Causes
// 1. Event listeners not removed
// 2. Timers not cleared
// 3. Closures holding references
// 4. Global variables
// 5. DOM references
// 6. Cache without limits
// 7. Circular references

// Example: Event Listener Leak
function Component() {
  useEffect(() => {
    const handleClick = () => {
      // Handler
    };
    
    window.addEventListener('click', handleClick);
    
    // ❌ Missing cleanup
    // return () => {
    //   window.removeEventListener('click', handleClick);
    // };
  }, []);
}

// Example: Timer Leak
function Component() {
  useEffect(() => {
    const interval = setInterval(() => {
      // Action
    }, 1000);
    
    // ❌ Missing cleanup
    // return () => clearInterval(interval);
  }, []);
}

// Example: Closure Leak
function Component() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/data').then(res => {
      // Closure holds reference to data
      setData(res.json());
    });
  }, []); // Missing data dependency
}

// Memory Leak Detection
// 1. Take initial heap snapshot
// 2. Perform actions
// 3. Take final heap snapshot
// 4. Compare snapshots
// 5. Look for growing objects
// 6. Check retained size

// Retained Size
// - Memory that would be freed
// - If object was deleted
// - Helps identify leaks
// - Shows object importance

// Detached DOM Nodes
// - DOM nodes not in tree
// - Still referenced in memory
// - Common leak source
// - Check in heap snapshot

// Memory Profiling Best Practices
// 1. Test with realistic data
// 2. Perform multiple actions
// 3. Compare before/after
// 4. Check for detached nodes
// 5. Monitor over time
// 6. Use allocation timeline

// Memory Cleanup
// - Remove event listeners
// - Clear timers
// - Nullify references
// - Clear caches
// - Remove DOM references

// Example: Proper Cleanup
function Component() {
  useEffect(() => {
    const controller = new AbortController();
    const handleClick = () => {};
    
    window.addEventListener('click', handleClick);
    const interval = setInterval(() => {}, 1000);
    
    return () => {
      window.removeEventListener('click', handleClick);
      clearInterval(interval);
      controller.abort();
    };
  }, []);
}

// Memory Monitoring
// - Track memory usage
// - Set memory limits
// - Alert on leaks
// - Monitor in production`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Network Monitoring</h3>
        <p className="text-gray-700 mb-4">
          Monitor and optimize network requests.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Chrome Network Tab
// 1. Open DevTools
// 2. Go to Network tab
// 3. Reload page or interact
// 4. View network requests

// Request Information
// - Request URL
// - Request method
// - Status code
// - Response time
// - Response size
// - Request headers
// - Response headers

// Request Filtering
// - Filter by type (XHR, JS, CSS, etc.)
// - Filter by domain
// - Filter by status
// - Filter by size
// - Search requests

// Request Details
// - Headers (request/response)
// - Payload
// - Preview
// - Response
// - Timing
// - Initiator

// Network Timing
// - Queued time
// - DNS lookup
// - Initial connection
// - SSL negotiation
// - Request sent
// - Waiting (TTFB)
// - Content download

// Waterfall View
// - Visual timeline
// - Request sequence
// - Blocking requests
// - Parallel requests
// - Load order

// Performance Analysis
// - Total load time
// - Number of requests
// - Total transfer size
// - Blocking requests
// - Slow requests

// Request Optimization
// 1. Minimize requests
// 2. Compress resources
// 3. Use CDN
// 4. Enable caching
// 5. Lazy load resources
// 6. Use HTTP/2
// 7. Optimize images

// Throttling
// - Simulate slow network
// - Test on 3G/4G
// - Test offline
// - Custom throttling
// - Preset profiles

// Request Blocking
// - Block specific requests
// - Test error handling
// - Simulate failures
// - Test offline mode

// Network Conditions
// - Online/Offline
// - Fast 3G
// - Slow 3G
// - Custom profile

// Request Inspection
// - View request body
// - Check headers
// - See cookies
// - Inspect response
// - Copy as cURL

// Example: Monitoring API Calls
// 1. Filter by XHR
// 2. Find API requests
// 3. Check response time
// 4. Verify payload
// 5. Check for errors

// Network Best Practices
// ✓ Minimize HTTP requests
// ✓ Use compression
// ✓ Enable caching
// ✓ Optimize images
// ✓ Use CDN
// ✓ Minimize payload size
// ✓ Use HTTP/2
// ✓ Lazy load resources

// Performance Budget
// - Max total size
// - Max requests
// - Max load time
// - Per resource limits

// Network Analysis
// - Identify slow requests
// - Find large resources
// - Check caching
// - Verify compression
// - Optimize loading

// Request Headers
// - User-Agent
// - Accept
// - Authorization
// - Content-Type
// - Cache-Control

// Response Headers
// - Content-Type
// - Content-Length
// - Cache-Control
// - ETag
// - Last-Modified`}</pre>
        </div>
      </section>
    </div>
  );
}

export default BrowserDevTools;

