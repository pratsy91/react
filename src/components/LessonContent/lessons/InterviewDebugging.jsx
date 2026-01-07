function InterviewDebugging() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Debugging React - Interview Cheatsheet
        </h2>
        <p className="text-gray-700">
          Common React bugs with explanations and exact fixes. In interviews,
          always explain <strong>what&apos;s wrong</strong>, <strong>why it happens</strong>, and the <strong>exact fix</strong>.
        </p>
      </div>

      {/* 1. Infinite Re-render Bug */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣ Infinite Re-render Bug</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Counter() {
  const [count, setCount] = React.useState(0);

  setCount(count + 1);

  return <div>{count}</div>;
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> You are calling <code>setCount</code> directly inside the component body, so it runs on every render.
                <br />
                <strong>Why it happens:</strong> React re-renders after every state update. Since <code>setCount</code> is called during render, each render triggers another update, causing an infinite loop until React throws an error.
                <br />
                <strong>Exact fix:</strong> Move state updates into an event handler or an effect, not the render body.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Counter() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 2. State Not Updating Immediately */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣ State Not Updating Immediately</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count);
};`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> <code>console.log</code> prints the old value of <code>count</code>, not the updated one.
                <br />
                <strong>Why it happens:</strong> State updates in React are asynchronous and batched. During the handler execution, <code>count</code> still holds the old value from the current render.
                <br />
                <strong>Exact fix:</strong> Use the functional updater form or log in an effect that listens to <code>count</code>.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (functional update):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const handleClick = () => {
  setCount(prev => {
    const next = prev + 1;
    console.log(next);
    return next;
  });
};`}
            </pre>
            <p className="font-semibold mt-4 mb-2">Alternative: Log in an effect:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  console.log('Count changed:', count);
}, [count]);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 3. Wrong useEffect Dependency */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣ Wrong useEffect Dependency</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  fetchData(userId);
}, []);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The effect runs only once and never refetches when <code>userId</code> changes.
                <br />
                <strong>Why it happens:</strong> An empty dependency array means &quot;run only on mount&quot;. React doesn&apos;t know that <code>userId</code> is a dependency because it isn&apos;t listed.
                <br />
                <strong>Exact fix:</strong> Add <code>userId</code> to the dependency array so the effect reruns when it changes.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  fetchData(userId);
}, [userId]);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 4. Infinite useEffect Loop */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">4️⃣ Infinite useEffect Loop</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  setTotal(price * quantity);
}, [total]);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The effect depends on <code>total</code> but also updates <code>total</code>, causing a loop.
                <br />
                <strong>Why it happens:</strong> Every time <code>total</code> is set, the effect reruns because <code>total</code> is in the dependency array, which triggers another update.
                <br />
                <strong>Exact fix:</strong> Derive <code>total</code> from its real inputs in the dependency array (<code>price</code> and <code>quantity</code>), not from <code>total</code> itself.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  setTotal(price * quantity);
}, [price, quantity]);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 5. Mutating State Bug */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">5️⃣ Mutating State Bug</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const [items, setItems] = useState([]);

items.push('Apple');
setItems(items);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The state array is mutated directly using <code>push</code>.
                <br />
                <strong>Why it happens:</strong> React relies on reference changes to detect updates. Mutating the existing array keeps the same reference, so React may skip re-rendering or cause subtle bugs.
                <br />
                <strong>Exact fix:</strong> Always create a new array or object when updating state (immutable updates).
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`setItems(prevItems => [...prevItems, 'Apple']);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 6. Key Warning + UI Bugs */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">6️⃣ Key Warning + UI Bugs</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`{users.map((user, index) => (
  <User key={index} data={user} />
))}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Using the array index as the <code>key</code> for list items.
                <br />
                <strong>Why it happens:</strong> When the list changes (insert, delete, reorder), indexes no longer match the same logical items. React reuses DOM nodes incorrectly, leading to visual glitches, wrong state association, and animation bugs.
                <br />
                <strong>Exact fix:</strong> Use a stable unique identifier from the data (like <code>user.id</code>) as the key.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`{users.map(user => (
  <User key={user.id} data={user} />
))}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 7. Stale Closure Bug */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">7️⃣ Stale Closure Bug</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> <code>count</code> never increments beyond <code>1</code>.
                <br />
                <strong>Why it happens:</strong> The interval callback closes over the initial value of <code>count</code> from the first render. Because the effect has an empty dependency array, the callback never sees updated state.
                <br />
                <strong>Exact fix:</strong> Use the functional updater form of <code>setCount</code> so it always receives the latest value, or include <code>count</code> in dependencies and recreate the interval.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (preferred):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 8. Controlled Input Bug */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">8️⃣ Controlled Input Bug</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`<input value={name} onChange={() => setName(name)} />`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The input is controlled but never receives the new typed value.
                <br />
                <strong>Why it happens:</strong> <code>setName</code> is always called with the existing <code>name</code> value instead of the event&apos;s current input value, so state never changes.
                <br />
                <strong>Exact fix:</strong> Read the value from the change event and update state with <code>event.target.value</code>.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`<input
  value={name}
  onChange={event => setName(event.target.value)}
/>`}
            </pre>
          </div>
        </div>
      </section>

      {/* 9. useCallback Not Working */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">9️⃣ useCallback Not Working</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const handleClick = useCallback(() => {
  setCount(count + 1);
}, []);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The callback always uses the initial value of <code>count</code>.
                <br />
                <strong>Why it happens:</strong> The dependency array is empty, so the memoized function closes over the first render&apos;s <code>count</code> and never updates.
                <br />
                <strong>Exact fix:</strong> Either include <code>count</code> in the dependency array or use the functional updater so the callback has no external dependencies.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (functional updater, stable callback):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 10. Component Not Re-rendering */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🔟 Component Not Re-rendering</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const MemoComp = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});

user.name = 'New Name';
setUser(user);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The UI doesn&apos;t update when <code>user.name</code> changes.
                <br />
                <strong>Why it happens:</strong> The <code>user</code> object is mutated in place. <code>React.memo</code> does a shallow comparison and sees the same object reference, so it skips re-rendering.
                <br />
                <strong>Exact fix:</strong> Treat objects as immutable: create a new user object when updating, so the reference changes.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`setUser(prev => ({
  ...prev,
  name: 'New Name',
}));`}
            </pre>
          </div>
        </div>
      </section>

      {/* 11. Conditional Rendering Crash */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣1️⃣ Conditional Rendering Crash</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`return <div>{user.profile.name}</div>;`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The component crashes when <code>user</code> or <code>profile</code> is <code>null</code> or <code>undefined</code>.
                <br />
                <strong>Why it happens:</strong> Accessing a nested property on <code>undefined</code> throws a runtime error (&quot;Cannot read properties of undefined&quot;).
                <br />
                <strong>Exact fix:</strong> Use optional chaining or defensive checks before accessing deep properties.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`return <div>{user?.profile?.name ?? 'Guest'}</div>;`}
            </pre>
          </div>
        </div>
      </section>

      {/* 12. API Called Multiple Times */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣2️⃣ API Called Multiple Times</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  fetchUsers();
}, [users]);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The API keeps getting called repeatedly.
                <br />
                <strong>Why it happens:</strong> <code>fetchUsers</code> probably calls <code>setUsers</code>, which changes <code>users</code>. Since <code>users</code> is in the dependency array, the effect reruns on every update, causing a loop.
                <br />
                <strong>Exact fix:</strong> Remove <code>users</code> from the dependency array and depend on a stable trigger (like component mount, filters, or parameters), or move to a dedicated data-fetching library.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (fetch on mount):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  fetchUsers();
}, []);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 13. Race Conditions in Data Fetching */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣3️⃣ Race Condition in Data Fetching</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  fetch(\`/api/users?query=\${query}\`)
    .then(res => res.json())
    .then(data => setUsers(data));
}, [query]);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Fast typing or rapid query changes can show results for an older query instead of the latest one.
                <br />
                <strong>Why it happens:</strong> Network responses can arrive out of order. A slower request for an older <code>query</code> might resolve after a newer one and overwrite state, because there is no cancellation or staleness check.
                <br />
                <strong>Exact fix:</strong> Track an abort signal or request id and ignore / cancel outdated requests before updating state.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (with abort controller):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  const controller = new AbortController();

  fetch(\`/api/users?query=\${query}\`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(error => {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    });

  return () => controller.abort();
}, [query]);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 14. Memory Leak / setState on Unmounted Component */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣4️⃣ Memory Leak Warning</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  const id = setInterval(() => {
    setTime(Date.now());
  }, 1000);
}, []);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> React logs a warning about setting state on an unmounted component, and the interval keeps running even after unmount.
                <br />
                <strong>Why it happens:</strong> The effect creates an interval but never cleans it up, so the callback still runs after unmount and tries to update state.
                <br />
                <strong>Exact fix:</strong> Return a cleanup function from the effect that clears the interval (or unsubscribes / aborts) so no async work touches unmounted components.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  const id = setInterval(() => {
    setTime(Date.now());
  }, 1000);

  return () => clearInterval(id);
}, []);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 15. Context Value Causing Extra Re-renders */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣5️⃣ Context Value Re-render Bug</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout />
    </ThemeContext.Provider>
  );
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> All consumers re-render on every parent render, even when <code>theme</code> hasn&apos;t changed.
                <br />
                <strong>Why it happens:</strong> A new object literal used as the context <code>value</code> is created on every render, so its reference is always different and React re-renders all consumers.
                <br />
                <strong>Exact fix:</strong> Memoize the context value so its reference only changes when one of its fields actually changes.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function App() {
  const [theme, setTheme] = useState('light');

  const contextValue = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <Layout />
    </ThemeContext.Provider>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 16. Prop-Drilling / Derived State Bug */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣6️⃣ Derived State from Props Bug</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function User({ user }) {
  const [name, setName] = useState(user.name);

  // ...
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> When the parent updates <code>user.name</code>, this component still shows the old name.
                <br />
                <strong>Why it happens:</strong> The state <code>name</code> is initialized from props only on the first render. Later prop changes don&apos;t update that state automatically, so it becomes out of sync.
                <br />
                <strong>Exact fix:</strong> Either derive the value directly from props, or explicitly sync state when the prop changes using an effect (only when truly needed).
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (avoid unnecessary state):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function User({ user }) {
  return <div>{user.name}</div>;
}`}
            </pre>
            <p className="font-semibold mt-4 mb-2">If local editable copy is required:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function EditableUser({ user }) {
  const [name, setName] = useState(user.name);

  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  // ...
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 17. useMemo Not Working */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣7️⃣ useMemo Not Working</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, []);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The memoized value doesn&apos;t update when <code>a</code> or <code>b</code> changes.
                <br />
                <strong>Why it happens:</strong> The empty dependency array means the computation only runs once on mount. <code>useMemo</code> doesn&apos;t know that <code>a</code> and <code>b</code> are dependencies.
                <br />
                <strong>Exact fix:</strong> Include all values used inside the memoized function in the dependency array.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 18. useRef Not Causing Re-renders */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣8️⃣ useRef Not Causing Re-renders</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Counter() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;
    // UI doesn't update!
  };

  return <div>{countRef.current}</div>;
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The UI doesn&apos;t update when <code>countRef.current</code> changes.
                <br />
                <strong>Why it happens:</strong> <code>useRef</code> is designed to hold mutable values that don&apos;t trigger re-renders. Changing <code>ref.current</code> doesn&apos;t cause React to re-render the component.
                <br />
                <strong>Exact fix:</strong> Use <code>useState</code> if you need the UI to update, or manually trigger a re-render with a state variable when needed.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return <div>{count}</div>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 19. Event Handler Scope Issue */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣9️⃣ Event Handler Scope Issue</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`class MyComponent extends React.Component {
  handleClick() {
    console.log(this.state.value); // Error: Cannot read property 'state' of undefined
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> <code>this</code> is <code>undefined</code> when the handler is called.
                <br />
                <strong>Why it happens:</strong> In JavaScript, method context is lost when passed as a callback. The handler is called without the component instance as <code>this</code>.
                <br />
                <strong>Exact fix:</strong> Bind the method in constructor, use arrow function in class property, or use arrow function in JSX.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (arrow function in class):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`class MyComponent extends React.Component {
  handleClick = () => {
    console.log(this.state.value);
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}`}
            </pre>
            <p className="font-semibold mt-4 mb-2">Or use function components (preferred):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function MyComponent() {
  const [value, setValue] = useState('');

  const handleClick = () => {
    console.log(value);
  };

  return <button onClick={handleClick}>Click</button>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 20. Form Submission Not Working */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣0️⃣ Form Submission Not Working</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Form() {
  const handleSubmit = () => {
    console.log('Submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The form submits but the page refreshes, losing React state.
                <br />
                <strong>Why it happens:</strong> HTML forms have default browser behavior: they submit and reload the page. The handler doesn&apos;t prevent this default action.
                <br />
                <strong>Exact fix:</strong> Call <code>event.preventDefault()</code> in the submit handler to prevent the default form submission.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 21. useEffect Cleanup Not Running */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣1️⃣ useEffect Cleanup Not Running</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  const subscription = subscribe();
  // Missing cleanup!
}, []);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Subscriptions, timers, or event listeners aren&apos;t cleaned up, causing memory leaks.
                <br />
                <strong>Why it happens:</strong> When the component unmounts or dependencies change, the effect cleanup should run to cancel subscriptions, clear timers, or remove listeners. Without cleanup, these resources persist.
                <br />
                <strong>Exact fix:</strong> Return a cleanup function from the effect that cancels subscriptions, clears timers, or removes listeners.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  const subscription = subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);`}
            </pre>
          </div>
        </div>
      </section>

      {/* 22. Multiple State Updates Batching */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣2️⃣ Multiple State Updates Batching</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
  // count only increases by 1, not 3!
};`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Calling <code>setCount</code> three times only increases the count by 1.
                <br />
                <strong>Why it happens:</strong> React batches state updates. All three calls use the same <code>count</code> value from the current render, so they all compute <code>count + 1</code> with the same starting value.
                <br />
                <strong>Exact fix:</strong> Use the functional updater form so each update receives the previous state value.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const handleClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  // count increases by 3!
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* 23. Error Boundary Not Catching Errors */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣3️⃣ Error Boundary Not Catching Errors</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function MyComponent() {
  const handleClick = () => {
    throw new Error('Something went wrong');
  };

  return <button onClick={handleClick}>Click</button>;
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The error boundary doesn&apos;t catch the error, and the app crashes.
                <br />
                <strong>Why it happens:</strong> Error boundaries only catch errors during rendering, in lifecycle methods, and in constructors. They don&apos;t catch errors in event handlers, async code, or during SSR.
                <br />
                <strong>Exact fix:</strong> Wrap event handlers in try-catch, or use state to trigger an error during render that the boundary can catch.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function MyComponent() {
  const [error, setError] = useState(null);

  const handleClick = () => {
    try {
      throw new Error('Something went wrong');
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    throw error; // Now error boundary can catch it
  }

  return <button onClick={handleClick}>Click</button>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 24. useReducer Dispatch Not Working */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣4️⃣ useReducer Dispatch Not Working</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function reducer(state, action) {
  state.count += 1; // Mutating state!
  return state;
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return <div>{state.count}</div>;
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The count doesn&apos;t update when dispatching actions.
                <br />
                <strong>Why it happens:</strong> The reducer is mutating the state object directly. React uses reference equality to detect changes. Since the reference doesn&apos;t change, React doesn&apos;t know to re-render.
                <br />
                <strong>Exact fix:</strong> Always return a new state object in reducers. Never mutate the existing state.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function reducer(state, action) {
  return { ...state, count: state.count + 1 };
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return <div>{state.count}</div>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 25. Custom Hook Dependency Issues */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣5️⃣ Custom Hook Dependency Issues</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, []); // Missing url dependency!

  return data;
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The hook doesn&apos;t refetch when <code>url</code> changes.
                <br />
                <strong>Why it happens:</strong> The effect has an empty dependency array, so it only runs once. The <code>url</code> parameter is used inside but not listed as a dependency.
                <br />
                <strong>Exact fix:</strong> Include all values from component scope used inside the effect in the dependency array, including function parameters.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]); // url is now a dependency

  return data;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 26. Expensive Computation in Render */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣6️⃣ Expensive Computation in Render</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function ExpensiveComponent({ items }) {
  const sortedItems = items.sort((a, b) => a.value - b.value);
  const filteredItems = sortedItems.filter(item => item.active);

  return <div>{filteredItems.map(...)}</div>;
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The component is slow and freezes the UI on every render.
                <br />
                <strong>Why it happens:</strong> Expensive operations like sorting and filtering run on every render, even when <code>items</code> hasn&apos;t changed. Also, <code>sort()</code> mutates the array.
                <br />
                <strong>Exact fix:</strong> Use <code>useMemo</code> to memoize expensive computations and only recalculate when dependencies change. Also avoid mutating arrays.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function ExpensiveComponent({ items }) {
  const filteredItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => a.value - b.value);
    return sorted.filter(item => item.active);
  }, [items]);

  return <div>{filteredItems.map(...)}</div>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 27. Children Prop Not Rendering */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣7️⃣ Children Prop Not Rendering</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Container({ children }) {
  return <div>{children}</div>;
}

function App() {
  return (
    <Container>
      <p>This doesn't render</p>
    </Container>
  );
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Actually, this code works! But a common mistake is destructuring <code>children</code> incorrectly or not rendering it.
                <br />
                <strong>Why it happens:</strong> If you don&apos;t explicitly render <code>children</code> in JSX, or if you destructure it incorrectly, the content won&apos;t appear.
                <br />
                <strong>Exact fix:</strong> Always render <code>children</code> explicitly. If using multiple children, use <code>React.Children</code> utilities.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Common Mistake (not rendering children):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Container({ children }) {
  return <div>Missing children!</div>; // children not rendered
}`}
            </pre>
            <p className="font-semibold mt-4 mb-2">Correct:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Container({ children }) {
  return <div>{children}</div>; // children rendered
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 28. Debouncing/Throttling in React */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣8️⃣ Debouncing/Throttling Issues</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function SearchInput() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchResults(query); // Called on every keystroke!
  }, [query]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The API is called on every keystroke, causing excessive requests.
                <br />
                <strong>Why it happens:</strong> Every state update triggers the effect, so rapid typing causes many API calls.
                <br />
                <strong>Exact fix:</strong> Use debouncing to delay the API call until the user stops typing, or use a debounced value.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (with debounce):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function SearchInput() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 29. SSR/Hydration Mismatch */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣9️⃣ SSR/Hydration Mismatch</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <div>{mounted ? 'Client' : 'Server'}</div>;
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> React throws a hydration mismatch error: &quot;Text content does not match server-rendered HTML&quot;.
                <br />
                <strong>Why it happens:</strong> The server renders &quot;Server&quot; but the client initially renders &quot;Server&quot; then immediately changes to &quot;Client&quot; after hydration. React expects the initial client render to match the server HTML exactly.
                <br />
                <strong>Exact fix:</strong> Use <code>useEffect</code> to render client-only content after hydration, or use a library like <code>suppressHydrationWarning</code> for intentional differences.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Or return server-safe content
  return <div>Client</div>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 30. Ref Forwarding Issues */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣0️⃣ Ref Forwarding Issues</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Input({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

function Form() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Error: inputRef.current is null
  };

  return (
    <>
      <Input ref={inputRef} value={value} onChange={setValue} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The ref is <code>null</code> and can&apos;t access the input element.
                <br />
                <strong>Why it happens:</strong> Function components don&apos;t accept refs by default. Passing a ref to a function component doesn&apos;t forward it to the underlying DOM element.
                <br />
                <strong>Exact fix:</strong> Use <code>forwardRef</code> to forward the ref to the underlying DOM element.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const Input = forwardRef(({ value, onChange }, ref) => {
  return <input ref={ref} value={value} onChange={onChange} />;
});

function Form() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Works!
  };

  return (
    <>
      <Input ref={inputRef} value={value} onChange={setValue} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 31. Suspense Boundary Not Catching */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣1️⃣ Suspense Boundary Not Catching</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function DataComponent() {
  const data = fetchData(); // Synchronous fetch - doesn't work with Suspense

  return <div>{data.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />
    </Suspense>
  );
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Suspense doesn&apos;t show the fallback and the component crashes or hangs.
                <br />
                <strong>Why it happens:</strong> Suspense only works with data fetching libraries that support it (React Query, Relay, etc.) or when using React 18+ features like Server Components. Regular <code>fetch</code> doesn&apos;t integrate with Suspense automatically.
                <br />
                <strong>Exact fix:</strong> Use a Suspense-compatible data fetching library, or use React 19&apos;s <code>use</code> hook with promises, or handle loading states manually with <code>useState</code> and <code>useEffect</code>.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (with React Query):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function DataComponent() {
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData
  });

  return <div>{data.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />
    </Suspense>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 32. Router Navigation Not Working */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣2️⃣ Router Navigation Not Working</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new-page');
    console.log('Navigated'); // This runs, but URL doesn't change
  };

  return <button onClick={handleClick}>Go</button>;
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Actually, this code should work! But common issues include: component not wrapped in Router, using <code>window.location</code> instead of <code>navigate</code>, or navigation happening before state updates.
                <br />
                <strong>Why it happens:</strong> If the component isn&apos;t inside a Router context, <code>useNavigate</code> will throw an error. Also, using <code>window.location.href</code> causes a full page reload instead of client-side navigation.
                <br />
                <strong>Exact fix:</strong> Ensure the component is wrapped in a Router provider, use <code>navigate</code> from React Router, and handle navigation after async operations complete.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/new-page" element={<NewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function Component() {
  const navigate = useNavigate();

  const handleClick = async () => {
    await saveData(); // Wait for async operation
    navigate('/new-page');
  };

  return <button onClick={handleClick}>Go</button>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 33. Concurrent Rendering Race Condition */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣3️⃣ Concurrent Rendering Race Condition</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults(query).then(data => {
      setResults(data); // Might set stale results
    });
  }, [query]);

  return <div>{results.map(...)}</div>;
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> When typing quickly, results from an older query might overwrite newer ones, showing incorrect data.
                <br />
                <strong>Why it happens:</strong> In React 18+ concurrent mode, renders can be interrupted. Multiple requests can be in flight, and slower requests might complete after faster ones, causing race conditions.
                <br />
                <strong>Exact fix:</strong> Use an abort controller to cancel outdated requests, or track request IDs to ignore stale responses.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchResults(query, { signal: controller.signal })
      .then(data => setResults(data))
      .catch(err => {
        if (err.name !== 'AbortError') throw err;
      });

    return () => controller.abort();
  }, [query]);

  return <div>{results.map(...)}</div>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 34. HOC Prop Forwarding Issues */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣4️⃣ HOC Prop Forwarding Issues</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = checkAuth();
    
    if (!isAuthenticated) return <Login />;
    return <Component />; // Props not forwarded!
  };
}

const ProtectedPage = withAuth(Page);

<ProtectedPage userId={123} /> // userId is lost`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Props passed to the HOC-wrapped component are lost and don&apos;t reach the inner component.
                <br />
                <strong>Why it happens:</strong> The HOC doesn&apos;t forward the props to the wrapped component, so all props are ignored.
                <br />
                <strong>Exact fix:</strong> Always spread and forward props to the wrapped component using the spread operator.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = checkAuth();
    
    if (!isAuthenticated) return <Login />;
    return <Component {...props} />; // Props forwarded
  };
}

const ProtectedPage = withAuth(Page);

<ProtectedPage userId={123} /> // userId reaches Page`}
            </pre>
          </div>
        </div>
      </section>

      {/* 35. Context Provider Missing */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣5️⃣ Context Provider Missing</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const value = useContext(MyContext);
  return <div>{value}</div>; // Error: useContext must be used within Provider
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Error: &quot;useContext must be used within a Provider&quot; or context value is <code>undefined</code>.
                <br />
                <strong>Why it happens:</strong> The component using <code>useContext</code> is not wrapped in the corresponding <code>Context.Provider</code>, or the provider is missing from the component tree.
                <br />
                <strong>Exact fix:</strong> Wrap the component (or its parent) with the Context Provider, ensuring the provider is higher in the tree than any consumers.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function App() {
  return (
    <MyContext.Provider value="Hello">
      <Component />
    </MyContext.Provider>
  );
}

function Component() {
  const value = useContext(MyContext);
  return <div>{value}</div>; // Works!
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 36. Strict Mode Double Rendering */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣6️⃣ Strict Mode Double Rendering</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  useEffect(() => {
    console.log('Effect ran'); // Logs twice in development!
    fetchData();
  }, []);

  return <div>Content</div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Effects run twice in development, causing duplicate API calls or console logs.
                <br />
                <strong>Why it happens:</strong> React Strict Mode intentionally double-invokes effects, state updaters, and constructors in development to help detect side effects and ensure components are resilient. This only happens in development, not production.
                <br />
                <strong>Exact fix:</strong> This is expected behavior in development. Ensure your effects are idempotent (safe to run multiple times). Use cleanup functions to cancel requests. In production, effects only run once.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (idempotent effect):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  useEffect(() => {
    const controller = new AbortController();

    fetchData({ signal: controller.signal });

    return () => controller.abort(); // Cleanup cancels duplicate requests
  }, []);

  return <div>Content</div>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 37. Event Propagation Issues */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣7️⃣ Event Propagation Issues</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Card() {
  const handleCardClick = () => {
    navigate('/details');
  };

  const handleButtonClick = () => {
    deleteItem();
  };

  return (
    <div onClick={handleCardClick}>
      <h3>Title</h3>
      <button onClick={handleButtonClick}>Delete</button>
    </div>
  );
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Clicking the button triggers both <code>handleButtonClick</code> and <code>handleCardClick</code>, causing unwanted navigation.
                <br />
                <strong>Why it happens:</strong> Events bubble up the DOM tree. Clicking the button triggers its handler, then the event bubbles to the parent div, triggering the card click handler too.
                <br />
                <strong>Exact fix:</strong> Call <code>event.stopPropagation()</code> in the button handler to prevent the event from bubbling to parent elements.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Card() {
  const handleCardClick = () => {
    navigate('/details');
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevents event from bubbling
    deleteItem();
  };

  return (
    <div onClick={handleCardClick}>
      <h3>Title</h3>
      <button onClick={handleButtonClick}>Delete</button>
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 38. Local Storage State Sync Issues */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣8️⃣ Local Storage State Sync Issues</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem('data') || '[]');
  });

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
  };

  // Problem: localStorage and state can get out of sync
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> State and localStorage can become out of sync, especially with multiple tabs or if localStorage operations fail silently.
                <br />
                <strong>Why it happens:</strong> Manual synchronization is error-prone. If <code>setData</code> succeeds but <code>localStorage.setItem</code> fails (quota exceeded, private mode), they diverge. Multiple tabs don&apos;t automatically sync.
                <br />
                <strong>Exact fix:</strong> Use <code>useEffect</code> to sync state to localStorage, listen to <code>storage</code> events for cross-tab sync, or use a library like <code>use-local-storage-state</code> that handles this automatically.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem('data') || '[]');
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  // Listen for changes from other tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'data') {
        setData(JSON.parse(e.newValue || '[]'));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return <div>{/* ... */}</div>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 39. Portal Event Bubbling Issues */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">3️⃣9️⃣ Portal Event Bubbling Issues</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <button onClick={onClose}>Close</button>
    </div>,
    document.body
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleBackdropClick = () => {
    setIsOpen(false); // Doesn't work when clicking modal content
  };

  return (
    <div onClick={handleBackdropClick}>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Clicking inside the modal (which is portaled to <code>document.body</code>) triggers the backdrop click handler, closing the modal unexpectedly.
                <br />
                <strong>Why it happens:</strong> Even though portals render outside the parent DOM tree, React events still bubble through the React component tree. Clicking the modal content bubbles up to the App component&apos;s click handler.
                <br />
                <strong>Exact fix:</strong> Stop event propagation in the modal content, or check <code>event.target</code> to distinguish backdrop clicks from content clicks.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevent bubbling to parent
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 40. Code Splitting/Lazy Loading Issues */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">4️⃣0️⃣ Code Splitting/Lazy Loading Issues</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Error: LazyComponent is not a function or component`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The lazy component fails to load or shows an error about not being a component.
                <br />
                <strong>Why it happens:</strong> The dynamic import might not export a default export, or the import path is incorrect, or the module doesn&apos;t exist. Also, <code>React.lazy</code> only works with default exports.
                <br />
                <strong>Exact fix:</strong> Ensure the imported component uses a default export, verify the import path, and handle loading/error states properly. Use error boundaries for error handling.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// HeavyComponent.jsx - Must have default export
export default function HeavyComponent() {
  return <div>Heavy Content</div>;
}

// App.jsx
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <ErrorBoundary fallback={<div>Error loading component</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 41. React.memo Comparison Function Issues */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">4️⃣1️⃣ React.memo Comparison Function Issues</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const MemoizedComponent = React.memo(({ user, onClick }) => {
  return <div onClick={onClick}>{user.name}</div>;
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id; // Only compares id
});

function App() {
  const [user, setUser] = useState({ id: 1, name: 'John' });
  const handleClick = () => console.log('clicked');

  return (
    <MemoizedComponent 
      user={user} 
      onClick={handleClick} // New function every render!
    />
  );
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The component re-renders even when <code>user.id</code> hasn&apos;t changed, because the custom comparison function doesn&apos;t check the <code>onClick</code> prop.
                <br />
                <strong>Why it happens:</strong> The comparison function only checks <code>user.id</code>, but <code>onClick</code> is a new function reference on every render. If the comparison returns <code>true</code> (props are equal), React skips re-render. If it returns <code>false</code> or doesn&apos;t check all props, unnecessary re-renders occur.
                <br />
                <strong>Exact fix:</strong> Compare all props in the custom comparison function, or use <code>useCallback</code> to memoize the <code>onClick</code> function so its reference stays stable.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code (compare all props):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const MemoizedComponent = React.memo(({ user, onClick }) => {
  return <div onClick={onClick}>{user.name}</div>;
}, (prevProps, nextProps) => {
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.onClick === nextProps.onClick
  );
});`}
            </pre>
            <p className="font-semibold mt-4 mb-2">Or use useCallback (preferred):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function App() {
  const [user, setUser] = useState({ id: 1, name: 'John' });
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Stable reference

  return (
    <MemoizedComponent 
      user={user} 
      onClick={handleClick}
    />
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 42. useLayoutEffect Timing Issues */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">4️⃣2️⃣ useLayoutEffect Timing Issues</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Buggy Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Tooltip({ children, text }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    const rect = tooltipRef.current.getBoundingClientRect();
    setPosition({ top: rect.top, left: rect.left });
  }, [text]);

  return (
    <div>
      {children}
      <div 
        ref={tooltipRef}
        style={{ position: 'absolute', top: position.top, left: position.left }}
      >
        {text}
      </div>
    </div>
  );
}`}
            </pre>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The tooltip position flickers or appears in the wrong place briefly before correcting.
                <br />
                <strong>Why it happens:</strong> <code>useEffect</code> runs after the browser paints. The tooltip first renders at position (0, 0), then after paint, the effect runs and updates the position, causing a visible flash.
                <br />
                <strong>Exact fix:</strong> Use <code>useLayoutEffect</code> instead, which runs synchronously after DOM mutations but before the browser paints, preventing the visual flicker.
              </p>
            </div>
            <p className="font-semibold mt-4 mb-2">Fixed Code:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Tooltip({ children, text }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    const rect = tooltipRef.current.getBoundingClientRect();
    setPosition({ top: rect.top, left: rect.left });
  }, [text]);

  return (
    <div>
      {children}
      <div 
        ref={tooltipRef}
        style={{ position: 'absolute', top: position.top, left: position.left }}
      >
        {text}
      </div>
    </div>
  );
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-3">
              <p className="text-gray-700 text-sm">
                <strong>Note:</strong> Use <code>useLayoutEffect</code> sparingly, only when you need to read layout and synchronously re-render before the browser paints. For most cases, <code>useEffect</code> is preferred as it doesn&apos;t block painting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Debugging Tools Question */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🧪 Debugging Tools & Profiler</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">
              How would you debug which component is causing re-renders in a large React app?
            </p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> Excessive or unexpected re-renders hurt performance and are hard to trace in large trees.
                <br />
                <strong>Why it happens:</strong> React re-renders components when their props, state, or context change. Without visibility, it&apos;s hard to see which ones are re-rendering unnecessarily.
                <br />
                <strong>Exact fix / Approach:</strong> Use React DevTools &quot;Highlight updates&quot; option, inspect components in the Components tab to see props/state changes, and combine with memoization tools like <code>React.memo</code>, <code>useMemo</code>, and <code>useCallback</code>. You can also temporarily log renders (e.g., <code>console.log('render', ComponentName)</code>) or use libraries like &quot;why-did-you-render&quot; to detect avoidable renders.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">
              How do you debug performance using React DevTools Profiler?
            </p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
              <p className="text-gray-700 text-sm">
                <strong>What&apos;s wrong:</strong> The app feels slow or laggy, but it&apos;s unclear which interactions or components are the bottleneck.
                <br />
                <strong>Why it happens:</strong> Expensive renders, heavy computations in render, unnecessary re-renders, or large lists can all degrade performance.
                <br />
                <strong>Exact fix / Approach:</strong> Open the React DevTools Profiler, record a user interaction, and inspect the flame graph / ranked view to see which components took the most render time. Optimize hotspots using memoization, splitting large components, virtualization for long lists, and moving heavy work outside render (e.g., to web workers or memoized selectors). Re-profile after changes to confirm improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Tip */}
      <section className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
        <h3 className="text-xl font-bold text-gray-900 mb-2">⭐ Interview Tip</h3>
        <p className="text-gray-700 text-sm">
          For every debugging question, structure your answer as:
          <br />
          <strong>1)</strong> What&apos;s wrong (describe the bug){' '}
          <br />
          <strong>2)</strong> Why it happens (root cause in React&apos;s model){' '}
          <br />
          <strong>3)</strong> Exact fix (show the corrected code or pattern).
        </p>
      </section>
    </div>
  );
}

export default InterviewDebugging;


