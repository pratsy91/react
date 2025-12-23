import React from 'react';

function ReactFundamentalsCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React Fundamentals Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Reference for React Interviews</h3>
        <p className="text-blue-800 mb-2">
          This cheatsheet provides quick reference for React core concepts commonly asked in interviews. 
          Memorize these key points for confident interview performance.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">JSX Syntax</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// JSX Rules
- Must return single root element (or Fragment)
- Use className instead of class
- Use camelCase for attributes (onClick, onChange)
- Self-closing tags must have /> 
- Embed expressions with { }
- Conditional: {condition && <Component />}
- Ternary: {condition ? <A /> : <B />}

// Examples
const element = <h1>Hello, {name}!</h1>;
const list = items.map(item => <li key={item.id}>{item.name}</li>);
const conditional = isLoggedIn && <Dashboard />;`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Components</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// Function Component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow Function Component
const Welcome = ({ name }) => <h1>Hello, {name}!</h1>;

// Component with Children
function Card({ title, children }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// Component Composition
<Card title="Profile">
  <UserInfo />
  <UserActions />
</Card>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Props</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// Props are read-only
// Props flow down, events flow up

// Passing props
<Button label="Click" onClick={handleClick} />

// Destructuring props
function Button({ label, onClick, disabled = false }) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

// Default props
Button.defaultProps = { disabled: false };

// PropTypes (runtime validation)
import PropTypes from 'prop-types';
Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">State</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// useState Hook
const [count, setCount] = useState(0);

// State updates
setCount(count + 1);           // Direct value
setCount(prev => prev + 1);    // Functional update (recommended)

// Object state
const [user, setUser] = useState({ name: '', age: 0 });
setUser(prev => ({ ...prev, name: 'John' }));

// Array state
const [items, setItems] = useState([]);
setItems(prev => [...prev, newItem]);

// Multiple state variables
const [name, setName] = useState('');
const [email, setEmail] = useState('');`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Event Handling</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// Event handlers
<button onClick={handleClick}>Click</button>
<input onChange={handleChange} />
<form onSubmit={handleSubmit}>

// Event object
function handleClick(e) {
  e.preventDefault();        // Prevent default behavior
  e.stopPropagation();      // Stop event bubbling
  console.log(e.target.value);
}

// Passing parameters
<button onClick={() => handleClick(id)}>Click</button>
<button onClick={handleClick.bind(null, id)}>Click</button>

// Synthetic Events
// React wraps native events for consistency
// Events are pooled (pre-React 17, now deprecated)`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Conditional Rendering</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// if-else
if (isLoggedIn) {
  return <Dashboard />;
} else {
  return <Login />;
}

// Ternary operator
{isLoggedIn ? <Dashboard /> : <Login />}

// Logical AND
{isLoggedIn && <Dashboard />}
{count > 0 && <Counter count={count} />}

// Multiple conditions
{status === 'loading' && <Spinner />}
{status === 'error' && <Error />}
{status === 'success' && <Data />}

// Early return
if (!user) return <Login />;
return <Dashboard />;`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Lists & Keys</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// Rendering lists
const items = ['Apple', 'Banana', 'Cherry'];

// Keys must be unique and stable
{items.map((item, index) => (
  <li key={index}>{item}</li>  // index only if no stable ID
))}

// Better: use unique IDs
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}

// Keys help React identify changes
// Never use keys for logic - they're for React internally
// Keys should be in the parent element, not children`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Interview Points</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <ul className="space-y-2 text-gray-800">
            <li><strong>React is a library, not a framework</strong> - focuses on UI</li>
            <li><strong>Virtual DOM</strong> - in-memory representation of real DOM</li>
            <li><strong>Reconciliation</strong> - process of updating DOM efficiently</li>
            <li><strong>One-way data flow</strong> - props down, events up</li>
            <li><strong>Component-based</strong> - reusable, composable UI pieces</li>
            <li><strong>Declarative</strong> - describe what UI should look like</li>
            <li><strong>JSX</strong> - syntax extension, not required but recommended</li>
            <li><strong>Immutable updates</strong> - never mutate state directly</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default ReactFundamentalsCheatsheet;

