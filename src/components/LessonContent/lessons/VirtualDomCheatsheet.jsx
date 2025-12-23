import React from 'react';

function VirtualDomCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Virtual DOM & Reconciliation Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Virtual DOM for Interviews</h3>
        <p className="text-blue-800 mb-2">
          Virtual DOM is one of the most frequently asked topics in React interviews. 
          Understand these concepts thoroughly.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">What is Virtual DOM?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="space-y-3 text-gray-700">
            <p><strong>Definition:</strong> Virtual DOM is an in-memory representation of the real DOM.</p>
            <p><strong>Purpose:</strong> Optimize DOM updates by minimizing direct DOM manipulation.</p>
            <p><strong>Structure:</strong> JavaScript object tree representing the component tree.</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">How Virtual DOM Works</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// 1. State Change
setState({ count: 1 });

// 2. React creates new Virtual DOM tree
const newVDOM = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Count: 1'] }
  ]
};

// 3. React compares (diffs) old vs new Virtual DOM
// 4. React calculates minimal changes needed
// 5. React updates only changed parts in real DOM

// Process:
State Change → New VDOM → Diffing → Reconciliation → DOM Update`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Reconciliation Algorithm</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="space-y-3 text-gray-700">
            <p><strong>Diffing Algorithm:</strong> Compares trees level by level</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Elements of different types → Replace entire subtree</li>
              <li>Same element type → Update only changed attributes</li>
              <li>Same component type → Update props, keep instance</li>
              <li>Lists → Use keys to identify which items changed</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Prop Importance</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// Without keys - React can't identify items
// React may re-render all items or mix them up

// ❌ Bad: No key
{items.map(item => <Item data={item} />)}

// ❌ Bad: Using index (unstable if list changes)
{items.map((item, i) => <Item key={i} data={item} />)}

// ✅ Good: Stable, unique key
{items.map(item => <Item key={item.id} data={item} />)}

// Keys help React:
// - Identify which items changed
// - Reuse components efficiently
// - Maintain component state correctly
// - Optimize re-renders`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Implications</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="space-y-3 text-gray-700">
            <p><strong>Benefits:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Batches DOM updates for efficiency</li>
              <li>Minimizes direct DOM manipulation</li>
              <li>Optimizes re-renders with diffing</li>
              <li>Enables React's declarative model</li>
            </ul>
            <p className="mt-3"><strong>Not a silver bullet:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Still needs optimization (memo, useMemo, etc.)</li>
              <li>Large component trees can be slow</li>
              <li>Diffing has its own cost</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Common Interview Questions</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <div className="space-y-4 text-gray-800">
            <div>
              <p className="font-semibold mb-2">Q: What is Virtual DOM?</p>
              <p className="text-sm">A: In-memory representation of real DOM. JavaScript object tree that React uses to optimize updates.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Q: Why does React use Virtual DOM?</p>
              <p className="text-sm">A: To minimize expensive DOM operations by batching updates and calculating minimal changes needed.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Q: How does reconciliation work?</p>
              <p className="text-sm">A: React compares old and new Virtual DOM trees, identifies differences (diffing), and updates only changed parts in real DOM.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Q: Why are keys important?</p>
              <p className="text-sm">A: Keys help React identify which items changed, added, or removed in lists, enabling efficient updates and maintaining component state.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Q: Is Virtual DOM faster than direct DOM manipulation?</p>
              <p className="text-sm">A: For complex UIs with frequent updates, yes. React batches updates and minimizes DOM operations. For simple, one-off updates, direct manipulation might be faster.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VirtualDomCheatsheet;

