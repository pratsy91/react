function InterviewRouter() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">React Router - Interview Cheatsheet</h2>
        <p className="text-gray-700">Complete guide to React Router for interviews</p>
      </div>

      {/* Router Setup */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Router Setup</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Basic Setup:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React Router enables client-side routing. BrowserRouter uses HTML5 history API for clean URLs (no hash). Routes component renders the first matching Route. Route defines a path and element to render. Path "/" matches root URL. Path "/users/:id" uses dynamic segment - :id is a parameter accessible via useParams. This creates single-page app navigation without full page reloads.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> BrowserRouter wraps the app. Routes renders first matching route. Route path can be static or dynamic (:param). element prop renders component. No page reloads - instant navigation.</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Router Types:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>BrowserRouter:</strong> Uses HTML5 history API (recommended)</li>
              <li><strong>HashRouter:</strong> Uses hash (#) in URL</li>
              <li><strong>MemoryRouter:</strong> Keeps history in memory (testing)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Navigation</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Link and NavLink:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Link component navigates without page reload using client-side routing. It renders an anchor tag but prevents default navigation. NavLink extends Link with active state detection. className prop can be a function receiving an isActive parameter to style active links. This is perfect for navigation menus where you want to highlight the current route. Both components maintain browser history.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { Link, NavLink } from 'react-router-dom';

// Basic Link
<Link to="/about">About</Link>

// NavLink with active styling
<NavLink 
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
  About
</NavLink>`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Link for basic navigation. NavLink detects active route. className function receives isActive. No page reloads. Maintains browser history.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Programmatic Navigation:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useNavigate hook provides programmatic navigation. navigate(path) pushes new entry to history. navigate(path, {'{'}{'}'} replace: true {'{'}{'}'}) replaces current history entry (back button won't go to previous page). navigate(-1) goes back one page. navigate(1) goes forward. This is useful for navigation after form submission, authentication, or conditional routing based on logic.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/about');
    navigate('/about', { replace: true });
    navigate(-1); // Go back
    navigate(1); // Go forward
  };
  
  return <button onClick={handleClick}>Navigate</button>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> navigate() for programmatic navigation. replace: true prevents back navigation. Negative numbers go back. Positive numbers go forward. Use after async operations or conditional logic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Router Hooks */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">All Router Hooks</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useParams:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useParams extracts dynamic route parameters from the URL. If route is "/users/:id", accessing /users/123 makes id = "123". Parameters are always strings - convert to number if needed. This allows components to access URL data without prop drilling. Parameters come from route path segments prefixed with :.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Extracts URL parameters. Values are always strings. Destructure needed params. Use for dynamic routes. Accessible in route component.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useSearchParams:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const updateQuery = (newQuery) => {
    setSearchParams({ q: newQuery });
  };
  
  return <div>Searching for: {query}</div>;
}`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useLocation:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { useLocation } from 'react-router-dom';

function Component() {
  const location = useLocation();
  // location.pathname, location.search, location.state
  return <div>Current path: {location.pathname}</div>;
}`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useNavigate:</p>
            <p className="text-gray-700 text-sm">Used for programmatic navigation (shown above)</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Other Hooks:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li><strong>useOutlet:</strong> Returns child route element</li>
              <li><strong>useOutletContext:</strong> Access context from parent route</li>
              <li><strong>useRoutes:</strong> Declarative routing with objects</li>
              <li><strong>useMatch:</strong> Match current location against path</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nested Routes */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Nested Routes</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Layout Pattern:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Layout() {
  return (
    <div>
      <nav>Navigation</nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Protected Routes */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Protected Routes</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Implementation:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  return user ? children : null;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Dynamic Routes */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Dynamic Routes</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Route Parameters:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Route definition
<Route path="/users/:id" element={<UserProfile />} />
<Route path="/posts/:slug/comments/:commentId" element={<Comment />} />

// Accessing params
function UserProfile() {
  const { id } = useParams();
  // id is a string, convert to number if needed
  return <div>User {id}</div>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Lazy Loading Routes */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Lazy Loading Routes</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Code Splitting:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const About = lazy(() => import('./About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Route Data Loading */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Route Data Loading Patterns</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">React Router v6.4+ Loaders:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { createBrowserRouter, useLoaderData } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/users/:id',
    element: <UserProfile />,
    loader: async ({ params }) => {
      const user = await fetchUser(params.id);
      return user;
    }
  }
]);

function UserProfile() {
  const user = useLoaderData();
  return <div>{user.name}</div>;
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Benefits:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Data loads before component renders</li>
              <li>Better UX with Suspense integration</li>
              <li>Centralized data loading logic</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Error Boundaries with Routes */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Error Boundaries with Routes</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Error Elements:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { createBrowserRouter, useRouteError } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/users/:id',
    element: <UserProfile />,
    errorElement: <ErrorPage />,
    loader: async ({ params }) => {
      const user = await fetchUser(params.id);
      if (!user) {
        throw new Response('Not Found', { status: 404 });
      }
      return user;
    }
  }
]);

function ErrorPage() {
  const error = useRouteError();
  return <div>Error: {error.statusText || error.message}</div>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Route Guards and Redirects */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Route Guards and Redirects</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Navigate Component:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// In routes
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Programmatic Redirect:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);
  
  return user ? <Dashboard /> : null;
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
            <p className="font-semibold mb-2">Q: What's the difference between Link and NavLink?</p>
            <p className="text-gray-700">A: Link is basic navigation. NavLink adds active state styling - it applies active class when the route matches.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you pass state between routes?</p>
            <p className="text-gray-700">A: Use navigate with state: <code className="bg-gray-200 px-1 rounded">navigate('/path', {'{'} state: {'{'} data: 'value' {'}'} {'}'})</code> and access with <code className="bg-gray-200 px-1 rounded">useLocation().state</code></p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you implement protected routes?</p>
            <p className="text-gray-700">A: Create a wrapper component that checks authentication and redirects if not authenticated, or use route guards.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewRouter;

