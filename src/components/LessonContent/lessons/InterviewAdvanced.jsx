function InterviewAdvanced() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Topics & React 19 - Interview Cheatsheet</h2>
        <p className="text-gray-700">Advanced React concepts and React 19 features for interviews</p>
      </div>

      {/* Concurrent Rendering */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Concurrent Rendering</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> React can interrupt, pause, and resume rendering work</p>
            <div className="bg-blue-50 p-4 rounded mt-2">
              <p className="font-semibold mb-2">Benefits:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Better user experience</li>
                <li>Non-blocking rendering</li>
                <li>Priority-based updates</li>
                <li>Smoother animations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Suspense for Data Fetching */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Suspense for Data Fetching</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React 18+ Pattern:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Suspense for data fetching allows components to suspend while loading data. When a component suspends, React shows the nearest fallback. Nested Suspense boundaries allow granular loading states - different parts can show different loading UIs. This creates better UX than showing one loading spinner for entire page. Components using data fetching libraries (React Query, Relay) or the use hook can suspend. Suspense boundaries catch these suspensions and show fallbacks.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDetails />
      <Suspense fallback={<PostsSkeleton />}>
        <ProfilePosts />
      </Suspense>
    </Suspense>
  );
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Suspense shows fallback during loading. Nested boundaries for granular loading. Better UX than single loader. Works with data fetching libraries. Components suspend while loading.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Server Components */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Server Components</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> Components that render on the server</p>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="bg-blue-50 p-4 rounded">
                <p className="font-semibold mb-2">Server Components:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Run on server</li>
                  <li>No JavaScript sent to client</li>
                  <li>Can access databases directly</li>
                  <li>Smaller bundle size</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-semibold mb-2">Client Components:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Run in browser</li>
                  <li>Can use hooks</li>
                  <li>Interactive features</li>
                  <li>Event handlers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* React 19 Features */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React 19 New Features</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React Compiler:</p>
            <p className="text-gray-700 mb-2">Automatically optimizes components, reduces need for manual memoization</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Actions & Form Handling:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React 19 introduces Actions for server-side form handling. 'use server' directive marks function as server action (runs on server). form action prop accepts async function. React automatically handles form submission, loading states, and errors. FormData is automatically passed to action. This simplifies form handling without manual state management. Works with Server Components and provides progressive enhancement.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`async function updateUser(formData) {
  'use server';
  await updateUserInDB(formData);
}

function UserForm() {
  return (
    <form action={updateUser}>
      <input name="name" />
      <button type="submit">Update</button>
    </form>
  );
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> 'use server' marks server action. form action accepts async function. Automatic form handling. FormData passed automatically. Progressive enhancement support.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useOptimistic Hook:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function TodoList({ todos }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );
  
  async function addTodo(todo) {
    addOptimistic(todo);
    await saveTodo(todo);
  }
  
  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">use Hook:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function DataComponent() {
  const data = use(fetchData());
  return <div>{data.name}</div>;
}

// Or with context
function Component() {
  const context = use(MyContext);
  return <div>{context.value}</div>;
}`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Document Metadata:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Page() {
  return (
    <>
      <title>My Page</title>
      <meta name="description" content="Page description" />
      <div>Content</div>
    </>
  );
}`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Ref as Prop:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Input({ ref }) {
  return <input ref={ref} />;
}

function App() {
  const inputRef = useRef();
  return <Input ref={inputRef} />;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Micro-frontends */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Micro-frontends</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> Architecture where frontend is split into independent applications</p>
            <div className="bg-blue-50 p-4 rounded mt-2">
              <p className="font-semibold mb-2">Approaches:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Module Federation (Webpack 5)</li>
                <li>Single-SPA</li>
                <li>iframe-based</li>
                <li>Build-time integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PWA */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Progressive Web Apps (PWA)</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Features:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Service Workers for offline support</li>
              <li>Web App Manifest</li>
              <li>Push notifications</li>
              <li>Installable on devices</li>
              <li>Cache strategies</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WebSockets */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Features</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">WebSockets with React:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function useWebSocket(url) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onmessage = (event) => {
      setMessages(prev => [...prev, JSON.parse(event.data)]);
    };
    
    return () => ws.close();
  }, [url]);
  
  return messages;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What is Concurrent Rendering?</p>
            <p className="text-gray-700">A: React's ability to interrupt, pause, and resume rendering work. It allows React to keep the UI responsive while rendering updates.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What are Server Components?</p>
            <p className="text-gray-700">A: Components that render on the server. They reduce JavaScript sent to client, can access databases directly, and improve performance.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What's new in React 19?</p>
            <p className="text-gray-700">A: React Compiler, Actions, useOptimistic, use hook, document metadata, ref as prop, async components, and improved Server Components.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewAdvanced;

