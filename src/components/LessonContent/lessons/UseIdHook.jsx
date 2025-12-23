import { useId } from 'react';

function UseIdHook() {
  const id1 = useId();
  const id2 = useId();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useId Hook (React 18)</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding useId</h3>
        <p className="text-blue-800 mb-2">
          useId is a React 18 Hook that generates unique, stable IDs that are consistent across server and client renders. 
          This is essential for server-side rendering (SSR) and avoiding hydration mismatches. It's particularly useful for 
          accessibility attributes like htmlFor and id, ARIA attributes, and any place where you need unique identifiers.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Unique IDs:</strong> Generates unique IDs for each component instance</li>
            <li><strong>SSR Safe:</strong> Same ID on server and client (prevents hydration errors)</li>
            <li><strong>Stable:</strong> ID doesn't change between renders</li>
            <li><strong>Accessibility:</strong> Perfect for htmlFor/id relationships</li>
            <li><strong>No Conflicts:</strong> IDs are unique across the entire component tree</li>
          </ul>
          <p className="mt-2"><strong>Common Use Cases:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Connecting labels to inputs (htmlFor/id)</li>
            <li>ARIA attributes (aria-labelledby, aria-describedby)</li>
            <li>Form field associations</li>
            <li>Any place needing unique identifiers</li>
            <li>Server-side rendered applications</li>
          </ul>
          <p className="mt-2"><strong>Important Notes:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Don't use for keys in lists (use proper keys instead)</li>
            <li>IDs include colons (:) - not valid CSS selectors</li>
            <li>Each call to useId generates a new unique ID</li>
            <li>IDs are stable across re-renders</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Generating Unique IDs</h3>
        <p className="text-gray-700 mb-4">
          useId generates unique IDs that are stable across server and client renders.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">Generated ID 1: <code className="bg-gray-200 px-1 rounded">{id1}</code></p>
            <p className="text-sm text-gray-700 mb-2">Generated ID 2: <code className="bg-gray-200 px-1 rounded">{id2}</code></p>
            <p className="text-xs text-gray-600">
              These IDs are stable and unique for this component instance
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`import { useId } from 'react';

function MyComponent() {
  const id = useId();
  return <label htmlFor={id}>Label</label>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">SSR Compatibility</h3>
        <p className="text-gray-700 mb-4">
          useId ensures the same ID is generated on both server and client, preventing hydration mismatches.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <SSRExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// ✅ Correct - useId works with SSR
const id = useId();
<input id={id} />

// ❌ Wrong - Math.random() causes hydration mismatch
const id = Math.random(); // Different on server vs client!`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Accessibility IDs</h3>
        <p className="text-gray-700 mb-4">
          Perfect for connecting labels with inputs, aria-describedby, and other accessibility attributes.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <AccessibilityExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Multiple IDs</h3>
        <p className="text-gray-700 mb-4">
          Call useId multiple times to generate multiple unique IDs in the same component.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <MultipleIdsExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Important Notes</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <ul className="list-disc list-inside space-y-2 text-sm text-yellow-800 ml-4">
            <li><strong>Not for keys:</strong> Don't use useId for list keys - use stable IDs from your data</li>
            <li><strong>Not for CSS:</strong> IDs from useId contain ':' which is invalid in CSS selectors</li>
            <li><strong>Stable:</strong> IDs are stable across re-renders</li>
            <li><strong>Unique:</strong> Each call to useId generates a unique ID</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// SSR Example
function SSRExample() {
  const inputId = useId();
  const errorId = useId();

  return (
    <div className="p-4 bg-white rounded">
      <label htmlFor={inputId} className="block text-sm font-semibold mb-1">
        Email (SSR-safe)
      </label>
      <input
        id={inputId}
        type="email"
        aria-describedby={errorId}
        className="w-full px-3 py-2 border rounded"
        placeholder="example@email.com"
      />
      <p id={errorId} className="text-xs text-red-600 mt-1">
        This error message is connected via aria-describedby
      </p>
    </div>
  );
}

// Accessibility Example
function AccessibilityExample() {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const passwordHintId = useId();

  return (
    <div className="p-4 bg-white rounded space-y-4">
      <div>
        <label htmlFor={nameId} className="block text-sm font-semibold mb-1">
          Name
        </label>
        <input
          id={nameId}
          type="text"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor={emailId} className="block text-sm font-semibold mb-1">
          Email
        </label>
        <input
          id={emailId}
          type="email"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor={passwordId} className="block text-sm font-semibold mb-1">
          Password
        </label>
        <input
          id={passwordId}
          type="password"
          aria-describedby={passwordHintId}
          className="w-full px-3 py-2 border rounded"
        />
        <p id={passwordHintId} className="text-xs text-gray-600 mt-1">
          Password must be at least 8 characters
        </p>
      </div>
    </div>
  );
}

// Multiple IDs Example
function MultipleIdsExample() {
  const firstNameId = useId();
  const lastNameId = useId();
  const ageId = useId();

  return (
    <div className="p-4 bg-white rounded space-y-3">
      <div>
        <label htmlFor={firstNameId} className="block text-sm font-semibold mb-1">
          First Name
        </label>
        <input id={firstNameId} type="text" className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label htmlFor={lastNameId} className="block text-sm font-semibold mb-1">
          Last Name
        </label>
        <input id={lastNameId} type="text" className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label htmlFor={ageId} className="block text-sm font-semibold mb-1">
          Age
        </label>
        <input id={ageId} type="number" className="w-full px-3 py-2 border rounded" />
      </div>
    </div>
  );
}

export default UseIdHook;

