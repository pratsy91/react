import { useState } from 'react';

function Jotai() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Jotai</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Jotai</h3>
        <p className="text-blue-800 mb-2">
          Jotai is a primitive and flexible state management library for React built on atomic state. The core idea is that state 
          is split into atoms - small, independent pieces of state. Components can subscribe to individual atoms, resulting in 
          fine-grained re-renders and excellent performance.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Atoms:</strong> Small, independent pieces of state</li>
            <li><strong>Atomic State:</strong> Each atom is independent and can be composed</li>
            <li><strong>Derived Atoms:</strong> Atoms can derive from other atoms</li>
            <li><strong>Fine-grained Updates:</strong> Only components using changed atoms re-render</li>
            <li><strong>No Providers:</strong> Works without providers for basic usage</li>
            <li><strong>TypeScript First:</strong> Excellent TypeScript support</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Minimal boilerplate - just create atoms and use them</li>
            <li>Excellent performance with fine-grained subscriptions</li>
            <li>Composable - combine atoms to create complex state</li>
            <li>TypeScript-friendly with full type inference</li>
            <li>Small bundle size</li>
            <li>No providers needed for basic usage</li>
          </ul>
          <p className="mt-2"><strong>When to Use Jotai:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>When you want atomic, fine-grained state management</li>
            <li>For applications with many small, independent state pieces</li>
            <li>When you need excellent performance with selective re-renders</li>
            <li>For TypeScript projects needing type-safe state</li>
            <li>When you want a lightweight alternative to Redux/Zustand</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Atoms</h3>
        <p className="text-gray-700 mb-4">
          Jotai uses atomic state management - each piece of state is an atom.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { atom, useAtom } from 'jotai';

// Primitive atom
const countAtom = atom(0);

// Object atom
const userAtom = atom({
  name: 'John',
  email: 'john@example.com'
});

// Read-only atom
const readOnlyAtom = atom((get) => get(countAtom) * 2);

// Usage in component
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Derived Atoms</h3>
        <p className="text-gray-700 mb-4">
          Create computed atoms that derive their value from other atoms.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { atom } from 'jotai';

const countAtom = atom(0);
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Multiple dependencies
const firstNameAtom = atom('John');
const lastNameAtom = atom('Doe');
const fullNameAtom = atom((get) => 
  \`\${get(firstNameAtom)} \${get(lastNameAtom)}\`
);

// Conditional derived atom
const isEvenAtom = atom((get) => get(countAtom) % 2 === 0);

// Usage
function Display() {
  const [count] = useAtom(countAtom);
  const [double] = useAtom(doubleCountAtom);
  const [fullName] = useAtom(fullNameAtom);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {double}</p>
      <p>Name: {fullName}</p>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Async Atoms</h3>
        <p className="text-gray-700 mb-4">
          Atoms can handle async operations for data fetching.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { atom } from 'jotai';

// Async atom
const userAtom = atom(async () => {
  const response = await fetch('/api/user');
  return response.json();
});

// Async atom with parameters
const fetchUserAtom = atom(
  null,
  async (get, set, userId) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();
    set(userAtom, user);
    return user;
  }
);

// Usage with Suspense
import { Suspense } from 'react';

function UserProfile() {
  const [user] = useAtom(userAtom);
  return <div>{user.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
    </Suspense>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">All Jotai Hooks and Utilities</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">useAtom</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const [value, setValue] = useAtom(atom);
// Returns [value, setter] tuple`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useAtomValue</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const value = useAtomValue(atom);
// Read-only, only re-renders when atom changes`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useSetAtom</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const setValue = useSetAtom(atom);
// Setter only, doesn't cause re-render`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useAtomCallback</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const callback = useAtomCallback((get, set) => {
  const count = get(countAtom);
  set(countAtom, count + 1);
});`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Provider</h4>
              <pre className="text-sm bg-white p-2 rounded">{`import { Provider } from 'jotai';

function App() {
  return (
    <Provider>
      <YourApp />
    </Provider>
  );
}`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">atomWithStorage</h4>
              <pre className="text-sm bg-white p-2 rounded">{`import { atomWithStorage } from 'jotai/utils';

const countAtom = atomWithStorage('count', 0);
// Persists to localStorage automatically`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">atomWithDefault</h4>
              <pre className="text-sm bg-white p-2 rounded">{`import { atomWithDefault } from 'jotai/utils';

const countAtom = atomWithDefault(() => 0);
// Resets to default when reset`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete Example</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Atoms
const countAtom = atomWithStorage('count', 0);
const nameAtom = atom('John');

// Derived atom
const greetingAtom = atom((get) => 
  \`Hello, \${get(nameAtom)}! Count: \${get(countAtom)}\`
);

// Component
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [name] = useAtom(nameAtom);
  const [greeting] = useAtom(greetingAtom);
  
  return (
    <div>
      <p>{greeting}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Jotai Features</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
            <li><strong>Atomic:</strong> Each piece of state is independent</li>
            <li><strong>Composable:</strong> Atoms can be combined and derived</li>
            <li><strong>TypeScript:</strong> Excellent TypeScript support</li>
            <li><strong>Minimal:</strong> Small bundle size</li>
            <li><strong>Flexible:</strong> Works with Suspense, async operations</li>
            <li><strong>No Provider needed:</strong> Works without Provider (optional)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Jotai;

