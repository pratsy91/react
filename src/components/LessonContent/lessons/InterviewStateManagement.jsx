function InterviewStateManagement() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">State Management Solutions - Interview Cheatsheet</h2>
        <p className="text-gray-700">Complete guide to state management in React interviews</p>
      </div>

      {/* useState vs useReducer */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">useState vs useReducer</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">useState:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Simple state</li>
                <li>Primitive values</li>
                <li>Independent updates</li>
                <li>Less boilerplate</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">useReducer:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Complex state logic</li>
                <li>Multiple sub-values</li>
                <li>State depends on previous</li>
                <li>Predictable updates</li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">When to Use useReducer:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>State with complex logic</li>
              <li>Multiple state updates in sequence</li>
              <li>State that's an object/array with multiple fields</li>
              <li>When you need to test state logic separately</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Context API */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Context API</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Share data without prop drilling</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}`}
            </pre>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="font-semibold mb-2">Pros:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>No prop drilling</li>
                <li>Built into React</li>
                <li>Simple API</li>
                <li>Good for theme, auth, etc.</li>
              </ul>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="font-semibold mb-2">Cons:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Can cause re-renders</li>
                <li>Not optimized for frequent updates</li>
                <li>Hard to debug</li>
                <li>Can lead to overuse</li>
              </ul>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Split contexts by concern</li>
              <li>Use multiple providers</li>
              <li>Memoize context values</li>
              <li>Don't use for frequently changing data</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Redux Toolkit */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Redux Toolkit</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Predictable state container</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">When to Use:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Large applications</li>
              <li>Complex state logic</li>
              <li>Time-travel debugging needed</li>
              <li>Shared state across many components</li>
              <li>Middleware needed (thunks, sagas)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Zustand */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Zustand</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Lightweight state management</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Component() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Benefits:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Minimal boilerplate</li>
              <li>No providers needed</li>
              <li>Small bundle size</li>
              <li>TypeScript support</li>
              <li>Middleware support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Jotai */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Jotai</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Atomic state management</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

function Component() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Features:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Atomic approach</li>
              <li>Derived atoms</li>
              <li>Async atoms</li>
              <li>Minimal re-renders</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Recoil */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recoil</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Facebook's state management library</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`import { atom, useRecoilState } from 'recoil';

const countState = atom({
  key: 'countState',
  default: 0,
});

function Component() {
  const [count, setCount] = useRecoilState(countState);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">State Management Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solution</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bundle Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Learning Curve</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Best For</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">useState/useReducer</td>
                <td className="px-4 py-3 text-sm text-gray-700">0 KB</td>
                <td className="px-4 py-3 text-sm text-gray-700">Easy</td>
                <td className="px-4 py-3 text-sm text-gray-700">Local/component state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Context API</td>
                <td className="px-4 py-3 text-sm text-gray-700">0 KB</td>
                <td className="px-4 py-3 text-sm text-gray-700">Easy</td>
                <td className="px-4 py-3 text-sm text-gray-700">Theme, auth, simple global state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Redux Toolkit</td>
                <td className="px-4 py-3 text-sm text-gray-700">~50 KB</td>
                <td className="px-4 py-3 text-sm text-gray-700">Medium</td>
                <td className="px-4 py-3 text-sm text-gray-700">Large apps, complex state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Zustand</td>
                <td className="px-4 py-3 text-sm text-gray-700">~1 KB</td>
                <td className="px-4 py-3 text-sm text-gray-700">Easy</td>
                <td className="px-4 py-3 text-sm text-gray-700">Medium apps, simple global state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Jotai</td>
                <td className="px-4 py-3 text-sm text-gray-700">~3 KB</td>
                <td className="px-4 py-3 text-sm text-gray-700">Medium</td>
                <td className="px-4 py-3 text-sm text-gray-700">Atomic state, derived state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Recoil</td>
                <td className="px-4 py-3 text-sm text-gray-700">~20 KB</td>
                <td className="px-4 py-3 text-sm text-gray-700">Medium</td>
                <td className="px-4 py-3 text-sm text-gray-700">Facebook-style apps</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* When to Use What */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use What?</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">useState/useReducer:</p>
            <p className="text-gray-700">Component-specific state, form state, UI state</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="font-semibold mb-2">Context API:</p>
            <p className="text-gray-700">Theme, authentication, user preferences, language</p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
            <p className="font-semibold mb-2">Redux Toolkit:</p>
            <p className="text-gray-700">Large applications, complex state, time-travel debugging, middleware needs</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Zustand:</p>
            <p className="text-gray-700">Medium apps, simple global state, minimal setup</p>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: When should you use Redux?</p>
            <p className="text-gray-700">A: When you have complex state logic, need time-travel debugging, middleware requirements, or state shared across many components.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What are the downsides of Context API?</p>
            <p className="text-gray-700">A: Can cause unnecessary re-renders, not optimized for frequent updates, harder to debug, can lead to overuse.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you prevent unnecessary re-renders with Context?</p>
            <p className="text-gray-700">A: Split contexts, memoize context values, use multiple providers, or use a state management library for frequently changing data.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewStateManagement;

