function InterviewInternals() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">React Internals - Interview Cheatsheet</h2>
        <p className="text-gray-700">Deep dive into how React works internally</p>
      </div>

      {/* Reconciliation */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Reconciliation Algorithm</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> Process of determining what changed between two component trees</p>
            <div className="bg-blue-50 p-4 rounded mt-2">
              <p className="font-semibold mb-2">How it works:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>React builds a new virtual DOM tree</li>
                <li>Compares with previous virtual DOM (diffing)</li>
                <li>Identifies minimal set of changes</li>
                <li>Applies changes to real DOM</li>
              </ol>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-2">
              <p className="font-semibold mb-2">Key Assumptions:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Two elements of different types produce different trees</li>
                <li>Developer can hint at which children are stable with keys</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fiber Architecture */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Fiber Architecture</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> Reconciliation algorithm reimplemented in React 16</p>
            <div className="bg-blue-50 p-4 rounded mt-2">
              <p className="font-semibold mb-2">Fiber Properties:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Each React element becomes a Fiber node</li>
                <li>Fiber tree is a linked list of nodes</li>
                <li>Enables incremental rendering</li>
                <li>Can pause, abort, or reuse work</li>
                <li>Assigns priority to different types of updates</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded mt-2">
              <p className="font-semibold mb-2">Fiber Node Structure:</p>
              <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`{
  type: ComponentType,
  props: Object,
  stateNode: DOMNode,
  return: Fiber, // Parent
  child: Fiber,  // First child
  sibling: Fiber // Next sibling
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Render Phases */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Render Phases</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Render Phase:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Determines what changes need to be made</li>
                <li>Can be interrupted</li>
                <li>Pure - no side effects</li>
                <li>Can be paused and resumed</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Commit Phase:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Applies changes to DOM</li>
                <li>Cannot be interrupted</li>
                <li>Can have side effects</li>
                <li>Runs synchronously</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diffing Algorithm */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Diffing Algorithm</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Heuristic Algorithm (O(n)):</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Elements of different types:</strong> Tear down old tree, build new tree</li>
              <li><strong>DOM elements of same type:</strong> Update changed attributes only</li>
              <li><strong>Component elements of same type:</strong> Update props, instance stays same</li>
              <li><strong>Recursing on children:</strong> Diff children in pairs</li>
              <li><strong>Keys:</strong> Help React identify which items changed</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Batching */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Batching and Scheduling</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Automatic Batching (React 18):</strong></p>
            <p className="text-gray-700">Multiple state updates are automatically batched together, even in async functions, promises, and event handlers.</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`// React 18 - All batched automatically
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Only one re-render!
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Priority Levels */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Priority Levels in React</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Update Priorities:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Immediate:</strong> User input, clicks (highest priority)</li>
              <li><strong>High:</strong> Hover effects, animations</li>
              <li><strong>Normal:</strong> Network responses, timeouts</li>
              <li><strong>Low:</strong> Background data prefetching</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">useTransition:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const [isPending, startTransition] = useTransition();

// Mark update as non-urgent (lower priority)
startTransition(() => {
  setLargeList(newList); // Can be interrupted
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* How React Updates DOM */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">How React Updates the DOM</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Update Process:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>State/props change triggers re-render</li>
              <li>React creates new Virtual DOM tree</li>
              <li>Diffing algorithm compares old vs new tree</li>
              <li>Identifies minimal set of DOM mutations</li>
              <li>Applies changes synchronously in commit phase</li>
              <li>Browser repaints screen</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Virtual DOM Tree Structure */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Virtual DOM Tree Structure</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Virtual DOM Node:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`{
  type: 'div' | ComponentFunction,
  props: {
    className: 'container',
    children: [...]
  },
  key: null,
  ref: null
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Tree Structure:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`App
  └── Header
      ├── Logo
      └── Nav
  └── Main
      ├── Article
      └── Sidebar
  └── Footer`}
            </pre>
          </div>
        </div>
      </section>

      {/* Component Tree Reconciliation */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Component Tree Reconciliation</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Reconciliation Process:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>React traverses component tree depth-first</li>
              <li>Compares each node with previous render</li>
              <li>If type matches, updates props</li>
              <li>If type differs, unmounts old, mounts new</li>
              <li>Recursively processes children</li>
              <li>Uses keys to match elements efficiently</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Key Prop and Reconciliation */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Prop and Reconciliation</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">How Keys Help:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Without keys: React can't tell which item moved
[<Item />, <Item />, <Item />] // All look the same

// With keys: React tracks identity
[
  <Item key="1" />,
  <Item key="2" />,
  <Item key="3" />
]

// When reordered, React knows which moved
[
  <Item key="3" />, // Moved from end
  <Item key="1" />,
  <Item key="2" />
]`}
            </pre>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Key Rules:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Keys must be unique among siblings</li>
              <li>Keys should be stable (don't use Math.random())</li>
              <li>Keys help React identify elements across renders</li>
              <li>Without keys, React may incorrectly reuse components</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Render Optimization Internals */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Render Optimization Internals</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Optimization Techniques:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>React.memo:</strong> Shallow comparison of props before re-render</li>
              <li><strong>useMemo:</strong> Memoizes expensive calculations</li>
              <li><strong>useCallback:</strong> Memoizes function references</li>
              <li><strong>Bailing out:</strong> React skips rendering if props/state unchanged</li>
              <li><strong>Fiber reuse:</strong> Reuses work when possible</li>
              <li><strong>Priority scheduling:</strong> Prioritizes urgent updates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How does React's reconciliation work?</p>
            <p className="text-gray-700">A: React uses a diffing algorithm to compare virtual DOM trees. It identifies minimal changes using heuristics based on element types and keys, then applies updates efficiently.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What is Fiber?</p>
            <p className="text-gray-700">A: Fiber is React's reconciliation engine (React 16+). It's a data structure representing work units, enabling incremental rendering, prioritization, and interruption of work.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: Why are keys important in lists?</p>
            <p className="text-gray-700">A: Keys help React identify which items changed, were added, or removed. Without keys, React can't efficiently reconcile list items and may cause bugs or performance issues.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewInternals;

