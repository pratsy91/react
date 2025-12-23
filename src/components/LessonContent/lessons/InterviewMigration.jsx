function InterviewMigration() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Version Migration - Interview Cheatsheet</h2>
        <p className="text-gray-700">Migrating between React versions</p>
      </div>

      {/* React 16 to 17 */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React 16 to 17</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Key Changes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>No new features (mainly internal changes)</li>
              <li>New JSX transform (no need to import React)</li>
              <li>Event pooling removed</li>
              <li>Better error messages</li>
              <li>Gradual upgrade support</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Migration Steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Update React and React DOM versions</li>
              <li>Update build tools for new JSX transform</li>
              <li>Remove unnecessary React imports</li>
              <li>Test thoroughly</li>
            </ol>
          </div>
        </div>
      </section>

      {/* React 17 to 18 */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React 17 to 18</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Key Changes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Concurrent rendering</li>
              <li>Automatic batching</li>
              <li>New hooks: useId, useTransition, useDeferredValue</li>
              <li>New root API (createRoot)</li>
              <li>Suspense improvements</li>
              <li>Stricter mode checks</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Migration Steps:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Old API
ReactDOM.render(<App />, document.getElementById('root'));

// New API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`}
            </pre>
          </div>
        </div>
      </section>

      {/* React 18 to 19 */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React 18 to 19</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Key Changes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>React Compiler</li>
              <li>Actions and form handling</li>
              <li>useOptimistic hook</li>
              <li>use hook for promises</li>
              <li>Document metadata</li>
              <li>Ref as prop</li>
              <li>Context as provider</li>
              <li>Async components</li>
              <li>Improved Server Components</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Breaking Changes by Version */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Breaking Changes by Version</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React 17:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Event pooling removed</li>
              <li>No breaking changes to component APIs</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React 18:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>New root API required</li>
              <li>Automatic batching changes behavior</li>
              <li>Strict Mode double-renders in development</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React 19:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Ref as prop (breaking change for some)</li>
              <li>Context as provider pattern</li>
              <li>New compiler may change behavior</li>
            </ul>
          </div>
        </div>
      </section>

      {/* New Features by Version */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">New Features by Version</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React 17:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>New JSX transform</li>
              <li>Gradual upgrade support</li>
              <li>Better event handling</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React 18:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Concurrent features</li>
              <li>useId, useTransition, useDeferredValue</li>
              <li>Suspense for data fetching</li>
              <li>Automatic batching</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React 19:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>React Compiler</li>
              <li>Actions and form handling</li>
              <li>useOptimistic, use hook</li>
              <li>Document metadata</li>
              <li>Async components</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Deprecated APIs */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Deprecated APIs</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Deprecated in Recent Versions:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>ReactDOM.render (use createRoot)</li>
              <li>ReactDOM.hydrate (use hydrateRoot)</li>
              <li>findDOMNode (use refs)</li>
              <li>Legacy Context API (use createContext)</li>
              <li>String refs (use useRef or callback refs)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Component API Changes */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Component API Changes</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Changes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Class components still work but not recommended</li>
              <li>Function components are standard</li>
              <li>Hooks replace lifecycle methods</li>
              <li>New patterns: Server Components, Actions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hook Changes by Version */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Hook Changes by Version</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React 18 New Hooks:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>useId</li>
              <li>useTransition</li>
              <li>useDeferredValue</li>
              <li>useSyncExternalStore</li>
              <li>useInsertionEffect</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React 19 New Hooks:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>useOptimistic</li>
              <li>use (for promises and context)</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Behavior Changes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>useEffect cleanup timing improvements</li>
              <li>Strict Mode double-invocation in development</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Concurrent Features Adoption */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Concurrent Features Adoption</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Adopting Concurrent Features:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Use useTransition for non-urgent updates</li>
              <li>Use useDeferredValue for deferred state</li>
              <li>Use Suspense for data fetching</li>
              <li>Gradually migrate to concurrent patterns</li>
              <li>Test thoroughly (concurrency can reveal bugs)</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Example:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();
  
  const results = useMemo(
    () => searchResults(deferredQuery),
    [deferredQuery]
  );
  
  return (
    <div>
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Common Breaking Changes */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Breaking Changes</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Watch Out For:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>API deprecations</li>
              <li>Behavior changes (batching, etc.)</li>
              <li>Type changes</li>
              <li>Removed features</li>
              <li>Build tool requirements</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Migration Checklist */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Migration Checklist</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">Steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Read migration guide</li>
              <li>Update dependencies</li>
              <li>Run automated codemods (if available)</li>
              <li>Fix breaking changes</li>
              <li>Update tests</li>
              <li>Test thoroughly</li>
              <li>Update documentation</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What are the main changes when migrating from React 17 to 18?</p>
            <p className="text-gray-700">A: New root API (createRoot), automatic batching, new hooks (useId, useTransition, useDeferredValue), and Suspense improvements. Behavior changes include automatic batching even in async code.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you handle breaking changes during migration?</p>
            <p className="text-gray-700">A: Read migration guide, use automated codemods when available, update APIs incrementally, test thoroughly, and consider gradual adoption of new features.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewMigration;

