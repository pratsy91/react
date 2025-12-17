import { useState } from 'react';
import { createElement } from 'react';

function JSXDeepDive() {
  const [showExample, setShowExample] = useState('jsx');

  const items = ['Apple', 'Banana', 'Cherry'];
  const isLoggedIn = true;
  const count = 5;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">JSX Deep Dive</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">JSX Syntax and Expressions</h3>
        <p className="text-gray-700 mb-4">
          JSX allows you to write HTML-like syntax in JavaScript. You can embed expressions using curly braces.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="text-lg font-semibold text-blue-600">
            Count: {count}
          </div>
          <div className="text-gray-700 mt-2">
            Expression: {2 + 2} = {2 + 2}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">JSX vs createElement</h3>
        <div className="mb-4">
          <button
            onClick={() => setShowExample('jsx')}
            className={`px-4 py-2 mr-2 rounded ${showExample === 'jsx' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            JSX
          </button>
          <button
            onClick={() => setShowExample('createElement')}
            className={`px-4 py-2 rounded ${showExample === 'createElement' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            createElement
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          {showExample === 'jsx' ? (
            <pre className="text-sm">{`// JSX (what we write)
<div className="card">
  <h1>Hello</h1>
</div>`}</pre>
          ) : (
            <pre className="text-sm">{`// createElement (what JSX compiles to)
createElement('div', { className: 'card' },
  createElement('h1', null, 'Hello')
)`}</pre>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Fragments</h3>
        <p className="text-gray-700 mb-4">
          Fragments let you group elements without adding extra DOM nodes.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Using &lt;&gt; syntax:</div>
            <pre className="text-sm bg-white p-2 rounded">{`<>
  <h1>Title</h1>
  <p>Content</p>
</>`}</pre>
            <div className="text-sm text-gray-600 mt-4">Using React.Fragment:</div>
            <pre className="text-sm bg-white p-2 rounded">{`<React.Fragment>
  <h1>Title</h1>
  <p>Content</p>
</React.Fragment>`}</pre>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Conditional Rendering</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Ternary Operator:</h4>
            <div className="text-gray-700">
              {isLoggedIn ? (
                <span className="text-green-600">✓ Logged In</span>
              ) : (
                <span className="text-red-600">✗ Not Logged In</span>
              )}
            </div>
            <pre className="text-sm mt-2 bg-white p-2 rounded">{`{isLoggedIn ? <span>Logged In</span> : <span>Not Logged In</span>}`}</pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Logical && Operator:</h4>
            <div className="text-gray-700">
              {isLoggedIn && <span className="text-green-600">✓ This shows when true</span>}
            </div>
            <pre className="text-sm mt-2 bg-white p-2 rounded">{`{isLoggedIn && <span>This shows when true</span>}`}</pre>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Lists and Keys</h3>
        <p className="text-gray-700 mb-4">
          When rendering lists, always provide a unique <code className="bg-gray-100 px-1 rounded">key</code> prop.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-gray-700">
                {index + 1}. {item}
              </li>
            ))}
          </ul>
          <pre className="text-sm mt-4 bg-white p-2 rounded">{`{items.map((item, index) => (
  <li key={index}>{item}</li>
))}`}</pre>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Keys help React identify which items have changed, been added, or removed. 
            Use stable, unique identifiers (like IDs) when possible, not array indices.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">JSX Escaping and Security</h3>
        <p className="text-gray-700 mb-4">
          React automatically escapes values to prevent XSS attacks. HTML strings are treated as text, not HTML.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-gray-700 mb-2">
            Safe: {`<script>alert('xss')</script>`}
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const html = "<script>alert('xss')</script>";
<div>{html}</div> // Safely escaped as text`}</pre>
        </div>
      </section>
    </div>
  );
}

export default JSXDeepDive;

