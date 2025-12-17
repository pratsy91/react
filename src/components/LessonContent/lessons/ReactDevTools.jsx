import { useState } from 'react';

function ReactDevTools() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React DevTools</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Component Tree Inspection</h3>
        <p className="text-gray-700 mb-4">
          Use React DevTools to inspect your component hierarchy.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
// Chrome: React Developer Tools extension
// Firefox: React Developer Tools extension
// Standalone: npm install -g react-devtools

// Component Tree Features
// 1. View entire component hierarchy
// 2. Search components by name
// 3. Filter components
// 4. Highlight components in page
// 5. Inspect component relationships

// Component Selection
// - Click component in tree to select
// - Right-click for context menu
// - Use search to find components
// - Filter by component type

// Component Information
// - Component name and location
// - File path and line number
// - Component type (function/class)
// - Render count

// Navigation
// - Expand/collapse tree nodes
// - Jump to component source
// - Copy component path
// - Show component owner

// Component Filtering
// - Filter by component name
// - Filter by props
// - Filter by hooks
// - Hide native elements

// Example component tree
<App>
  <Header>
    <Navigation />
    <UserMenu />
  </Header>
  <Main>
    <Sidebar />
    <Content>
      <Article />
      <Comments />
    </Content>
  </Main>
  <Footer />
</App>

// Inspecting nested components
// 1. Expand parent component
// 2. Navigate to child component
// 3. View props and state
// 4. Check render performance`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Props and State Inspection</h3>
        <p className="text-gray-700 mb-4">
          Inspect component props and state in real-time.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Props Inspection
// - View all props passed to component
// - See prop types and values
// - Edit props (development only)
// - Copy prop values
// - Search props

// Example component
function UserCard({ user, onEdit, isActive }) {
  const [likes, setLikes] = useState(0);
  // ...
}

// In DevTools:
// Props:
//   user: { id: 1, name: "John" }
//   onEdit: function
//   isActive: true

// State Inspection
// - View all state variables
// - See state values and types
// - Edit state (development only)
// - Track state changes
// - View state history

// State in DevTools:
// State:
//   likes: 0

// Editing Props/State
// - Click value to edit
// - Type new value
// - Press Enter to apply
// - Changes reflect immediately

// Props Editing Example
// Original: isActive: true
// Edit to: isActive: false
// Component re-renders with new prop

// State Editing Example
// Original: likes: 0
// Edit to: likes: 10
// Component updates state

// Hooks Inspection
// - View all hooks in component
// - See hook values
// - Inspect hook dependencies
// - Track hook changes

// Example hooks
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  const theme = useContext(ThemeContext);
  const memoized = useMemo(() => count * 2, [count]);
  
  // In DevTools:
  // Hooks:
  //   useState: 0
  //   useState: "John"
  //   useContext: { theme: "dark" }
  //   useMemo: 0
}

// Context Inspection
// - View context values
// - See context providers
// - Track context changes
// - Inspect context consumers

// Ref Inspection
// - View ref values
// - See ref.current
// - Inspect DOM elements
// - Check ref callbacks`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Profiler</h3>
        <p className="text-gray-700 mb-4">
          Use the Profiler to identify performance bottlenecks.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Enable Profiler
// 1. Open React DevTools
// 2. Go to Profiler tab
// 3. Click record button
// 4. Interact with app
// 5. Stop recording

// Profiler Metrics
// - Render time
// - Commit time
// - Component render count
// - Why did this render?

// Flamegraph View
// - Visual representation of renders
// - Component hierarchy
// - Render duration
// - Color-coded performance

// Ranked View
// - Components sorted by render time
// - Slowest components first
// - Total render time
// - Self render time

// Component Details
// - Render duration
// - Render reason
// - Props changes
// - State changes
// - Context changes

// Why did this render?
// - Props changed
// - State changed
// - Parent re-rendered
// - Context changed
// - Hook dependency changed

// Profiler API
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id);
  console.log('Phase:', phase); // mount or update
  console.log('Duration:', actualDuration);
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>

// Recording Sessions
// - Start recording
// - Perform actions
// - Stop recording
// - Analyze results
// - Compare sessions

// Performance Tips
// - Record during user interactions
// - Record multiple sessions
// - Compare before/after optimizations
// - Focus on slow components
// - Check render frequency

// Identifying Issues
// - Components rendering too often
// - Components taking too long
// - Unnecessary re-renders
// - Missing memoization
// - Expensive computations`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Monitoring</h3>
        <p className="text-gray-700 mb-4">
          Monitor and optimize component performance.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Performance Metrics
// - Component render time
// - Total commit time
// - Interaction time
// - Layout shift
// - Memory usage

// Render Performance
// - Track render frequency
// - Measure render duration
// - Identify slow renders
// - Optimize expensive operations

// Commit Performance
// - Measure commit time
// - Track DOM updates
// - Identify layout thrashing
// - Optimize updates

// Interaction Tracking
// - Track user interactions
// - Measure response time
// - Identify slow interactions
// - Optimize event handlers

// Memory Monitoring
// - Track memory usage
// - Identify memory leaks
// - Monitor component instances
// - Check for retained objects

// Performance Best Practices
// 1. Use React.memo for expensive components
// 2. Use useMemo for expensive calculations
// 3. Use useCallback for stable references
// 4. Avoid inline object/array creation
// 5. Split large components
// 6. Lazy load components
// 7. Optimize re-renders

// Example: Monitoring Component
function ExpensiveComponent({ data }) {
  // Expensive computation
  const processed = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]);
  
  return <div>{/* render */}</div>;
}

// Performance Warnings
// - Components rendering too often
// - Long render times
// - Memory leaks
// - Unnecessary re-renders
// - Missing keys in lists

// Performance Optimization Checklist
// ✓ Use React.memo appropriately
// ✓ Memoize expensive computations
// ✓ Use stable callbacks
// ✓ Avoid inline functions in JSX
// ✓ Split large components
// ✓ Lazy load routes
// ✓ Optimize images
// ✓ Use code splitting`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Debugging Hooks</h3>
        <p className="text-gray-700 mb-4">
          Debug React hooks effectively.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Hook Inspection
// - View all hooks in component
// - See hook values
// - Track hook changes
// - Inspect dependencies

// useState Debugging
function Component() {
  const [count, setCount] = useState(0);
  
  // In DevTools:
  // - See current value: 0
  // - Edit value directly
  // - Track state changes
  // - See setter function
}

// useEffect Debugging
function Component() {
  useEffect(() => {
    // Side effect
  }, [dependency]);
  
  // In DevTools:
  // - See dependencies
  // - Track effect runs
  // - Check cleanup
  // - View effect timing
}

// useContext Debugging
function Component() {
  const value = useContext(MyContext);
  
  // In DevTools:
  // - See context value
  // - Track context changes
  // - Find context provider
  // - Check consumers
}

// useReducer Debugging
function Component() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // In DevTools:
  // - See current state
  // - View action history
  // - Inspect reducer
  // - Track dispatches
}

// Custom Hook Debugging
function useCustomHook() {
  const [value, setValue] = useState(0);
  // ...
  return { value, setValue };
}

// In DevTools:
// - See hook return value
// - Inspect internal state
// - Track hook calls
// - View dependencies

// Hook Rules Validation
// - Check hook order
// - Verify conditional hooks
// - Validate dependencies
// - Check hook calls

// Common Hook Issues
// 1. Hooks called conditionally
// 2. Missing dependencies
// 3. Stale closures
// 4. Infinite loops
// 5. Wrong hook order

// Debugging Tips
// - Use console.log in hooks
// - Check hook dependencies
// - Verify hook order
// - Use React DevTools
// - Add breakpoints
// - Use debugger statement

// Example: Debugging Hook
function useData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('Fetching:', url); // Debug
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Data received:', data); // Debug
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading };
}

// Hook Dependency Debugging
// - Check missing dependencies
// - Verify dependency arrays
// - Track dependency changes
// - Use exhaustive-deps ESLint rule`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ReactDevTools;

