import { useState } from 'react';

function Jotai() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Jotai</h2>
      
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

