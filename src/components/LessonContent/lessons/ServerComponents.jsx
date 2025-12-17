import { useState } from 'react';

// Simulated Server Component (in real RSC, this would be async and run on server)
function ServerComponentExample({ data }) {
  // Server components can:
  // - Access databases directly
  // - Use server-only APIs
  // - Fetch data without client-side loading states
  // - Reduce bundle size (code stays on server)
  
  return (
    <div className="p-4 bg-green-50 rounded">
      <h3 className="font-semibold mb-2">Server Component</h3>
      <p className="text-sm text-gray-700">
        This component runs on the server. Data: {data}
      </p>
      <p className="text-xs text-gray-600 mt-2">
        No JavaScript sent to client for this component!
      </p>
    </div>
  );
}

// Client Component (marked with 'use client')
function ClientComponent({ onClick }) {
  // Client components can:
  // - Use hooks (useState, useEffect, etc.)
  // - Handle user interactions
  // - Access browser APIs
  // - Use event handlers
  
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Client Component (Interactive)
    </button>
  );
}

function ServerComponents() {
  const [count, setCount] = useState(0);
  const [serverData] = useState('Server-fetched data');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Server Components (React Server Components)</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Understanding RSC</h3>
        <p className="text-gray-700 mb-4">
          React Server Components (RSC) allow you to build components that render on the server,
          reducing client-side JavaScript and improving performance.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <ServerComponentExample data={serverData} />
            <div className="mt-4">
              <ClientComponent onClick={() => setCount(count + 1)} />
              <p className="text-sm text-gray-600 mt-2">Count: {count}</p>
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Server Component (default in RSC)
async function ServerComponent() {
  const data = await fetchFromDatabase();
  return <div>{data}</div>;
}

// Client Component (marked with 'use client')
'use client';
function ClientComponent() {
  const [state, setState] = useState();
  return <button onClick={...}>Click</button>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Client vs Server Components</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">Server Component</th>
                <th className="text-left p-2">Client Component</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Runs on</td>
                <td className="p-2">Server only</td>
                <td className="p-2">Client (browser)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">JavaScript bundle</td>
                <td className="p-2">Not sent to client</td>
                <td className="p-2">Sent to client</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Hooks</td>
                <td className="p-2">❌ Cannot use</td>
                <td className="p-2">✓ Can use</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Event handlers</td>
                <td className="p-2">❌ Cannot use</td>
                <td className="p-2">✓ Can use</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Browser APIs</td>
                <td className="p-2">❌ Cannot use</td>
                <td className="p-2">✓ Can use</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Database access</td>
                <td className="p-2">✓ Direct access</td>
                <td className="p-2">❌ Via API</td>
              </tr>
              <tr>
                <td className="p-2">File system</td>
                <td className="p-2">✓ Can access</td>
                <td className="p-2">❌ Cannot access</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Use Cases and Benefits</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Perfect For Server Components:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Data fetching from databases</li>
            <li>Reading files from the file system</li>
            <li>Accessing backend APIs directly</li>
            <li>Static content that doesn't need interactivity</li>
            <li>Large dependencies (kept on server)</li>
            <li>Content that needs to be secure (API keys, etc.)</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">✓ Benefits:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li><strong>Smaller bundles:</strong> Server component code doesn't ship to client</li>
            <li><strong>Better performance:</strong> Less JavaScript to parse and execute</li>
            <li><strong>Direct data access:</strong> No need for API routes</li>
            <li><strong>Security:</strong> Sensitive code stays on server</li>
            <li><strong>SEO friendly:</strong> Content rendered on server</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Limitations and Considerations</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h4 className="font-semibold mb-2">⚠️ Limitations:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 ml-4">
            <li>Cannot use React hooks (useState, useEffect, etc.)</li>
            <li>Cannot use browser APIs (window, document, etc.)</li>
            <li>Cannot handle user interactions (onClick, onChange, etc.)</li>
            <li>Cannot use Context API</li>
            <li>Props must be serializable (no functions, classes, etc.)</li>
            <li>Requires React 18+ and compatible framework (Next.js 13+, etc.)</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">Considerations:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 ml-4">
            <li>Server components add latency (server round-trip)</li>
            <li>Need to carefully decide what should be server vs client</li>
            <li>Migration from existing codebases can be complex</li>
            <li>Debugging can be more complex (server + client)</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">RSC Architecture</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// app/page.js (Next.js 13+ example)
// Server Component (default)
async function Page() {
  const data = await fetch('https://api.example.com/data');
  return (
    <div>
      <ServerContent data={data} />
      <ClientInteractive />
    </div>
  );
}

// components/ServerContent.js
// Server Component
async function ServerContent({ data }) {
  return <div>{data}</div>;
}

// components/ClientInteractive.js
'use client'; // Mark as client component
function ClientInteractive() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">When to Use Each</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">Use Server Components For:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Data fetching</li>
                <li>• Static content</li>
                <li>• Large libraries</li>
                <li>• Secure operations</li>
                <li>• SEO content</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">Use Client Components For:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Interactive elements</li>
                <li>• State management</li>
                <li>• Event handlers</li>
                <li>• Browser APIs</li>
                <li>• Animations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Framework Support</h3>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Current Support:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 ml-4">
            <li>Next.js 13+ (App Router)</li>
            <li>React 18+ (required)</li>
            <li>Other frameworks are adding support</li>
          </ul>
          <p className="text-sm text-blue-800 mt-2">
            RSC is still relatively new and requires framework support. 
            Plain React doesn't support RSC out of the box.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ServerComponents;

