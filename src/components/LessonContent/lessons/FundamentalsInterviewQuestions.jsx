import React from 'react';

function FundamentalsInterviewQuestions() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React Fundamentals Interview Questions</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Common Interview Questions with Answers</h3>
        <p className="text-blue-800 mb-2">
          These are the most frequently asked React fundamentals questions in interviews. 
          Study these answers thoroughly.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: What is React?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2"><strong>Answer:</strong></p>
          <p className="text-gray-700">
            React is a JavaScript library for building user interfaces, particularly web applications. 
            It was developed by Facebook and is maintained by Meta. React uses a component-based architecture 
            and a virtual DOM to efficiently update and render components.
          </p>
          <p className="text-gray-700 mt-2"><strong>Key Points:</strong></p>
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
            <li>Library, not a framework (focuses on UI)</li>
            <li>Component-based architecture</li>
            <li>Declarative programming model</li>
            <li>Virtual DOM for performance</li>
            <li>One-way data binding</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: What is JSX?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2"><strong>Answer:</strong></p>
          <p className="text-gray-700">
            JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code 
            in JavaScript files. JSX is not valid JavaScript - it must be transpiled (usually by Babel) into 
            React.createElement() calls.
          </p>
          <pre className="text-sm bg-white p-2 rounded mt-2 overflow-x-auto">{`// JSX
const element = <h1>Hello, {name}!</h1>;

// Transpiles to:
const element = React.createElement('h1', null, 'Hello, ', name, '!');`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: What is the difference between an Element and a Component?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2"><strong>Answer:</strong></p>
          <p className="text-gray-700 mb-2">
            <strong>Element:</strong> A plain object describing what you want to appear on the screen. Elements are immutable.
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Component:</strong> A function or class that returns elements. Components are reusable and can have state/props.
          </p>
          <pre className="text-sm bg-white p-2 rounded mt-2 overflow-x-auto">{`// Element
const element = <h1>Hello</h1>;

// Component
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: What is the difference between Props and State?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="font-semibold">Props:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Passed from parent to child</li>
                <li>Read-only (immutable)</li>
                <li>Used to configure components</li>
                <li>Can be functions, objects, primitives</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">State:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Managed within component</li>
                <li>Mutable (can be updated)</li>
                <li>Used for component data</li>
                <li>Updates trigger re-renders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: What are Controlled vs Uncontrolled Components?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="font-semibold">Controlled Components:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Value controlled by React state</li>
                <li>Use <code className="bg-gray-200 px-1 rounded">value</code> prop</li>
                <li>onChange handler updates state</li>
                <li>Single source of truth</li>
                <li>Better for validation and complex forms</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Uncontrolled Components:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Value managed by DOM</li>
                <li>Use <code className="bg-gray-200 px-1 rounded">defaultValue</code> prop</li>
                <li>Access values via refs</li>
                <li>Better performance (fewer re-renders)</li>
                <li>Simpler for basic forms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: Why are keys important in lists?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2"><strong>Answer:</strong></p>
          <p className="text-gray-700">
            Keys help React identify which items have changed, been added, or removed. They enable React to:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1 mt-2">
            <li>Efficiently update the DOM</li>
            <li>Maintain component state correctly</li>
            <li>Reuse components when possible</li>
            <li>Track items through re-renders</li>
          </ul>
          <p className="text-gray-700 mt-2"><strong>Best Practices:</strong></p>
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
            <li>Use stable, unique IDs when possible</li>
            <li>Avoid using index as key (unless list is static)</li>
            <li>Keys should be in the parent element, not children</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: What are Synthetic Events?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2"><strong>Answer:</strong></p>
          <p className="text-gray-700">
            Synthetic Events are React's wrapper around native browser events. They provide a consistent API 
            across different browsers and normalize differences between browser implementations.
          </p>
          <p className="text-gray-700 mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
            <li>Cross-browser compatibility</li>
            <li>Consistent event API</li>
            <li>Event pooling (pre-React 17, now deprecated)</li>
            <li>Event delegation at root level</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: Explain Virtual DOM</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2"><strong>Answer:</strong></p>
          <p className="text-gray-700">
            Virtual DOM is an in-memory representation of the real DOM. When state changes, React creates a new 
            Virtual DOM tree, compares it with the previous one (diffing), and updates only the changed parts 
            in the real DOM (reconciliation).
          </p>
          <p className="text-gray-700 mt-2"><strong>Process:</strong></p>
          <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
            <li>State change triggers re-render</li>
            <li>React creates new Virtual DOM tree</li>
            <li>React compares (diffs) old vs new Virtual DOM</li>
            <li>React calculates minimal changes needed</li>
            <li>React updates only changed parts in real DOM</li>
          </ol>
        </div>
      </section>
    </div>
  );
}

export default FundamentalsInterviewQuestions;

