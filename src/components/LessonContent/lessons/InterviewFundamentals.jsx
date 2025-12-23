function InterviewFundamentals() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">React Fundamentals - Interview Cheatsheet</h2>
        <p className="text-gray-700">Complete reference guide for React fundamentals interview questions</p>
      </div>

      {/* What is React */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">What is React?</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Answer:</strong></p>
            <p className="text-gray-700">React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and is maintained by Meta and the community.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Key Features:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Component-based architecture</li>
              <li>Virtual DOM for efficient updates</li>
              <li>Unidirectional data flow</li>
              <li>JSX for declarative UI</li>
              <li>Reusable components</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Virtual DOM */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Virtual DOM vs Real DOM</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Virtual DOM:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>In-memory representation of DOM</li>
                <li>Lightweight JavaScript object</li>
                <li>Fast diffing algorithm</li>
                <li>Batch updates</li>
                <li>Minimal DOM manipulation</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Real DOM:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Browser's actual DOM tree</li>
                <li>Heavy and slow to update</li>
                <li>Direct manipulation</li>
                <li>Full re-render on changes</li>
                <li>Browser-specific APIs</li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">How Virtual DOM Works:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>State changes trigger re-render</li>
              <li>React creates new Virtual DOM tree</li>
              <li>Diffing algorithm compares old vs new</li>
              <li>Only changed nodes are updated in real DOM</li>
              <li>Batch updates for performance</li>
            </ol>
          </div>
        </div>
      </section>

      {/* JSX */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">JSX (JavaScript XML)</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> JSX is a syntax extension that allows writing HTML-like code in JavaScript.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Key Points:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>JSX is transpiled to React.createElement() calls</li>
              <li>Must return single parent element (or Fragment)</li>
              <li>Use className instead of class</li>
              <li>Use camelCase for attributes (onClick, onChange)</li>
              <li>JavaScript expressions in {`{}`}</li>
              <li>Self-closing tags must have /</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Example:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const element = (
  <div className="container">
    <h1>Hello, {name}!</h1>
    {isLoggedIn && <UserProfile />}
  </div>
);`}
            </pre>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Components: Function vs Class</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Function Components:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Simpler syntax</li>
                <li>Use hooks for state/effects</li>
                <li>Recommended approach</li>
                <li>Better performance</li>
                <li>Easier to test</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Class Components:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Legacy approach</li>
                <li>Use this.state and lifecycle methods</li>
                <li>More verbose</li>
                <li>Still supported but not recommended</li>
                <li>Needed for Error Boundaries</li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Function Component Example:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Props vs State */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Props vs State</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Props:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Passed from parent to child</li>
                <li>Immutable (read-only)</li>
                <li>Used for configuration</li>
                <li>Cannot be changed by component</li>
                <li>Make component reusable</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">State:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Internal to component</li>
                <li>Mutable (can be updated)</li>
                <li>Used for dynamic data</li>
                <li>Updated with setState/useState</li>
                <li>Causes re-render when changed</li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">When to Use:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>Props:</strong> Data that doesn't change, configuration, callbacks</li>
              <li><strong>State:</strong> User input, UI state, data that changes over time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Event Handling */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Event Handling</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Synthetic Events:</strong> React wraps native events in SyntheticEvent objects for cross-browser compatibility.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Common Events:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>onClick, onChange, onSubmit</li>
              <li>onFocus, onBlur, onKeyDown</li>
              <li>onMouseEnter, onMouseLeave</li>
              <li>onScroll, onLoad, onError</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Example:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Clicked!');
  };
  
  return <button onClick={handleClick}>Click me</button>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Conditional Rendering */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Conditional Rendering Patterns</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Common Patterns:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Ternary:</strong> {`{condition ? <A /> : <B />}`}</li>
              <li><strong>Logical AND:</strong> {`{condition && <Component />}`}</li>
              <li><strong>If-else:</strong> Use if-else before return</li>
              <li><strong>Switch:</strong> For multiple conditions</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Example:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Greeting({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn ? (
        <WelcomeMessage />
      ) : (
        <LoginForm />
      )}
      {error && <ErrorMessage error={error} />}
    </>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Lists and Keys */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Lists and Keys</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Keys:</strong> Help React identify which items changed, added, or removed. Must be unique among siblings.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Key Rules:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Use stable, unique identifiers (IDs from data)</li>
              <li>Don't use array index as key (unless list is static)</li>
              <li>Keys should be unique among siblings</li>
              <li>Keys help React optimize re-renders</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Example:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Controlled vs Uncontrolled Forms</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Controlled:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Value controlled by React state</li>
                <li>onChange updates state</li>
                <li>Single source of truth</li>
                <li>Recommended approach</li>
                <li>Easier to validate</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Uncontrolled:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Value stored in DOM</li>
                <li>Use refs to access value</li>
                <li>Less React code</li>
                <li>Useful for file inputs</li>
                <li>FormData API</li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Controlled Example:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Form() {
  const [value, setValue] = useState('');
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What is React and why use it?</p>
            <p className="text-gray-700">A: React is a library for building UIs. Benefits: component reusability, Virtual DOM performance, large ecosystem, strong community support.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: Explain Virtual DOM.</p>
            <p className="text-gray-700">A: Virtual DOM is an in-memory representation of the real DOM. React uses it to efficiently update the UI by comparing virtual trees and only updating changed nodes.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: Difference between state and props?</p>
            <p className="text-gray-700">A: Props are passed from parent (immutable), state is internal to component (mutable). Props configure components, state manages dynamic data.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What is JSX?</p>
            <p className="text-gray-700">A: JSX is a syntax extension that lets you write HTML-like code in JavaScript. It's transpiled to React.createElement() calls.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewFundamentals;

