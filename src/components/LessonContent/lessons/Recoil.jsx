import { useState } from 'react';

function Recoil() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Recoil</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Atoms and Selectors</h3>
        <p className="text-gray-700 mb-4">
          Recoil uses atoms for state and selectors for derived state.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// Atom - piece of state
const countAtom = atom({
  key: 'countAtom',
  default: 0
});

// Selector - derived state
const doubleCountSelector = selector({
  key: 'doubleCountSelector',
  get: ({ get }) => {
    const count = get(countAtom);
    return count * 2;
  }
});

// Usage
function Counter() {
  const [count, setCount] = useRecoilState(countAtom);
  const doubleCount = useRecoilValue(doubleCountSelector);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Atom Families</h3>
        <p className="text-gray-700 mb-4">
          Atom families create multiple atoms with the same structure but different parameters.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { atomFamily } from 'recoil';

// Atom family - one atom per ID
const todoAtomFamily = atomFamily({
  key: 'todoAtomFamily',
  default: (id) => ({
    id,
    text: '',
    completed: false
  })
});

// Usage
function TodoItem({ id }) {
  const [todo, setTodo] = useRecoilState(todoAtomFamily(id));
  
  return (
    <div>
      <input
        value={todo.text}
        onChange={(e) => setTodo({ ...todo, text: e.target.value })}
      />
    </div>
  );
}

// Each ID gets its own atom instance`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Selector Families</h3>
        <p className="text-gray-700 mb-4">
          Selector families create parameterized selectors.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { selectorFamily } from 'recoil';

// Selector family
const userSelectorFamily = selectorFamily({
  key: 'userSelectorFamily',
  get: (userId) => async () => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
});

// Usage
function UserProfile({ userId }) {
  const user = useRecoilValue(userSelectorFamily(userId));
  
  return <div>{user.name}</div>;
}

// With Suspense
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userId={1} />
    </Suspense>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">All Recoil Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">useRecoilState</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const [value, setValue] = useRecoilState(atom);
// Similar to useState`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useRecoilValue</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const value = useRecoilValue(atom);
// Read-only`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useSetRecoilState</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const setValue = useSetRecoilState(atom);
// Setter only`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useResetRecoilState</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const reset = useResetRecoilState(atom);
reset(); // Reset to default value`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useRecoilValueLoadable</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const loadable = useRecoilValueLoadable(asyncAtom);
// Returns: { state: 'hasValue' | 'loading' | 'hasError', contents }
if (loadable.state === 'hasValue') {
  const value = loadable.contents;
}`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useRecoilCallback</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const callback = useRecoilCallback(({ snapshot, set }) => {
  return (id) => {
    const value = snapshot.getLoadable(atom).getValue();
    set(atom, value + 1);
  };
});`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">useRecoilTransaction</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const transaction = useRecoilTransaction(({ get, set }) => {
  return () => {
    const count = get(countAtom);
    set(countAtom, count + 1);
    set(anotherAtom, count * 2);
  };
});`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Recoil Setup</h3>
        <p className="text-gray-700 mb-4">
          Recoil requires a RecoilRoot provider at the app root.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { RecoilRoot } from 'recoil';
import { atom, useRecoilState } from 'recoil';

// Define atoms
const countAtom = atom({
  key: 'countAtom',
  default: 0
});

// App setup
function App() {
  return (
    <RecoilRoot>
      <YourApp />
    </RecoilRoot>
  );
}

// Use in components
function Counter() {
  const [count, setCount] = useRecoilState(countAtom);
  return <div>{count}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete Example</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`import { RecoilRoot, atom, selector, useRecoilState } from 'recoil';

// Atoms
const todoListAtom = atom({
  key: 'todoListAtom',
  default: []
});

const filterAtom = atom({
  key: 'filterAtom',
  default: 'all'
});

// Selector
const filteredTodosSelector = selector({
  key: 'filteredTodosSelector',
  get: ({ get }) => {
    const todos = get(todoListAtom);
    const filter = get(filterAtom);
    
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }
});

// Components
function TodoList() {
  const todos = useRecoilValue(filteredTodosSelector);
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  
  const addTodo = (text) => {
    setTodoList([...todoList, { id: Date.now(), text, completed: false }]);
  };
  
  return (
    <div>
      {todos.map(todo => <div key={todo.id}>{todo.text}</div>)}
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Recoil Features</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
            <li><strong>Atoms:</strong> Small pieces of state</li>
            <li><strong>Selectors:</strong> Derived state and async operations</li>
            <li><strong>Atom Families:</strong> Parameterized atoms</li>
            <li><strong>Selector Families:</strong> Parameterized selectors</li>
            <li><strong>Suspense:</strong> Built-in Suspense support</li>
            <li><strong>DevTools:</strong> Recoil DevTools available</li>
            <li><strong>TypeScript:</strong> Excellent TypeScript support</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Recoil;

