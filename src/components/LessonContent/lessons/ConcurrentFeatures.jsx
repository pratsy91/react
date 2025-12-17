import { useState } from 'react';

function ConcurrentFeatures() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Concurrent Features</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Enhanced Concurrent Rendering</h3>
        <p className="text-gray-700 mb-4">
          React 19 enhances concurrent rendering capabilities.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Enhanced Concurrent Rendering
// Better concurrent rendering in React 19

// Automatic Concurrent Mode
// React 19 uses concurrent features by default
function App() {
  return <Root />;
}

// Interruptible Rendering
// React can interrupt rendering for urgent updates
function App() {
  const [urgent, setUrgent] = useState(false);
  const [nonUrgent, setNonUrgent] = useState(false);
  
  const handleUrgent = () => {
    setUrgent(true); // Renders immediately
  };
  
  const handleNonUrgent = () => {
    startTransition(() => {
      setNonUrgent(true); // Can be interrupted
    });
  };
  
  return (
    <div>
      <button onClick={handleUrgent}>Urgent</button>
      <button onClick={handleNonUrgent}>Non-Urgent</button>
    </div>
  );
}

// Priority-Based Rendering
// React prioritizes urgent updates
function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  
  const handleInput = (e) => {
    setInput(e.target.value); // Urgent - user input
    
    startTransition(() => {
      setResults(search(e.target.value)); // Non-urgent - search
    });
  };
  
  return (
    <div>
      <input value={input} onChange={handleInput} />
      <ResultsList results={results} />
    </div>
  );
}

// Concurrent Suspense
// Multiple Suspense boundaries render concurrently
function App() {
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
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatic Batching Improvements</h3>
        <p className="text-gray-700 mb-4">
          Enhanced automatic batching in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Automatic Batching Improvements
// Better batching in React 19

// Automatic Batching
// Multiple state updates are batched automatically
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  const handleClick = () => {
    setCount(c => c + 1); // Batched
    setName('John'); // Batched
    // Only one re-render
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// Async Batching
// State updates in async code are batched
function App() {
  const [count, setCount] = useState(0);
  
  const handleAsync = async () => {
    await fetch('/api');
    setCount(c => c + 1); // Batched
    setCount(c => c + 1); // Batched
    // Only one re-render
  };
  
  return <button onClick={handleAsync}>Async</button>;
}

// Promise Batching
// Updates in promises are batched
function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        setData(data); // Batched
        // Other updates...
      });
  }, []);
  
  return <div>{data}</div>;
}

// Event Handler Batching
// All updates in event handler are batched
function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  const handleClick = () => {
    setA(1);
    setB(2);
    // Single re-render
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// Manual Batching (if needed)
import { flushSync } from 'react-dom';

function App() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    flushSync(() => {
      setCount(1); // Immediate render
    });
    setCount(2); // Batched
  };
  
  return <button onClick={handleClick}>Click</button>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Transition API Updates</h3>
        <p className="text-gray-700 mb-4">
          Enhanced Transition API in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Transition API Updates
// Enhanced transitions in React 19

// useTransition Hook
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    startTransition(() => {
      setCount(c => c + 1);
    });
  };
  
  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>Increment</button>
      <div>Count: {count}</div>
    </div>
  );
}

// startTransition Function
import { startTransition } from 'react';

function App() {
  const [results, setResults] = useState([]);
  
  const handleSearch = (query) => {
    startTransition(() => {
      setResults(search(query));
    });
  };
  
  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <ResultsList results={results} />
    </div>
  );
}

// Multiple Transitions
function App() {
  const [isPending1, startTransition1] = useTransition();
  const [isPending2, startTransition2] = useTransition();
  
  const handleAction1 = () => {
    startTransition1(() => {
      // Action 1
    });
  };
  
  const handleAction2 = () => {
    startTransition2(() => {
      // Action 2
    });
  };
  
  return (
    <div>
      <button onClick={handleAction1} disabled={isPending1}>
        Action 1
      </button>
      <button onClick={handleAction2} disabled={isPending2}>
        Action 2
      </button>
    </div>
  );
}

// Transition with Suspense
function App() {
  const [isPending, startTransition] = useTransition();
  
  const handleLoad = () => {
    startTransition(() => {
      setDataPromise(fetchData());
    });
  };
  
  return (
    <div>
      {isPending && <Loading />}
      <Suspense fallback={<Loading />}>
        <DataComponent dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}

// Transition Priority
// Transitions have lower priority
function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  
  const handleInput = (e) => {
    setInput(e.target.value); // Urgent
    
    startTransition(() => {
      setResults(search(e.target.value)); // Non-urgent
    });
  };
  
  return (
    <div>
      <input value={input} onChange={handleInput} />
      <ResultsList results={results} />
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Priority Scheduling</h3>
        <p className="text-gray-700 mb-4">
          Priority-based scheduling in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Priority Scheduling
// React 19 schedules updates by priority

// Urgent Updates
// User interactions are urgent
function App() {
  const [input, setInput] = useState('');
  
  const handleInput = (e) => {
    setInput(e.target.value); // Urgent - renders immediately
  };
  
  return <input value={input} onChange={handleInput} />;
}

// Non-Urgent Updates
// Use startTransition for non-urgent updates
function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  
  const handleInput = (e) => {
    setInput(e.target.value); // Urgent
    
    startTransition(() => {
      setResults(search(e.target.value)); // Non-urgent
    });
  };
  
  return (
    <div>
      <input value={input} onChange={handleInput} />
      <ResultsList results={results} />
    </div>
  );
}

// Update Priorities
// 1. Urgent: User input, clicks, etc.
// 2. Normal: State updates
// 3. Low: Transitions, Suspense

// Priority Examples
function App() {
  const [urgent, setUrgent] = useState(false);
  const [normal, setNormal] = useState(false);
  const [low, setLow] = useState(false);
  
  const handleUrgent = () => {
    setUrgent(true); // Highest priority
  };
  
  const handleNormal = () => {
    setNormal(true); // Normal priority
  };
  
  const handleLow = () => {
    startTransition(() => {
      setLow(true); // Lowest priority
    });
  };
  
  return (
    <div>
      <button onClick={handleUrgent}>Urgent</button>
      <button onClick={handleNormal}>Normal</button>
      <button onClick={handleLow}>Low</button>
    </div>
  );
}

// Interruptible Work
// Low-priority work can be interrupted
function App() {
  const [results, setResults] = useState([]);
  
  const handleSearch = (query) => {
    startTransition(() => {
      // This work can be interrupted
      const newResults = expensiveSearch(query);
      setResults(newResults);
    });
  };
  
  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <ResultsList results={results} />
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Optimizations</h3>
        <p className="text-gray-700 mb-4">
          Performance optimizations from concurrent features.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Performance Optimizations
// Better performance with concurrent features

// Reduced Blocking
// Urgent updates don't block non-urgent work
function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  
  const handleInput = (e) => {
    setInput(e.target.value); // Doesn't block search
    
    startTransition(() => {
      setResults(search(e.target.value)); // Can be interrupted
    });
  };
  
  return (
    <div>
      <input value={input} onChange={handleInput} />
      <ResultsList results={results} />
    </div>
  );
}

// Better Responsiveness
// UI stays responsive during heavy work
function App() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState(null);
  
  const handleLoad = () => {
    startTransition(() => {
      setData(expensiveComputation()); // Doesn't block UI
    });
  };
  
  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleLoad}>Load</button>
      {data && <DataDisplay data={data} />}
    </div>
  );
}

// Improved Time to Interactive
// Faster initial interaction
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <InteractiveContent />
    </Suspense>
  );
}

// Selective Hydration
// Only hydrate interactive parts
function App() {
  return (
    <div>
      <StaticContent />
      <Suspense fallback={<Loading />}>
        <InteractiveContent />
      </Suspense>
    </div>
  );
}

// Best Practices
// 1. Use startTransition for non-urgent updates
// 2. Keep urgent updates separate
// 3. Use Suspense for async content
// 4. Optimize with React Compiler
// 5. Monitor performance metrics`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ConcurrentFeatures;

