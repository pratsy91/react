import { 
  Link, NavLink, 
  useNavigate, useLocation, useSearchParams,
  useMatch, useResolvedPath, useHref,
  useInRouterContext, useNavigationType
} from 'react-router-dom';

function RouterComponentsHooks() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isInRouter = useInRouterContext();
  const navType = useNavigationType();
  const match = useMatch('/demo/:id');
  const resolvedPath = useResolvedPath('/about');
  const href = useHref('/contact');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">All Router Components & Hooks</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Routes and Route</h3>
        <p className="text-gray-700 mb-4">
          Routes defines the container, Route defines individual routes.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Link and NavLink</h3>
        <p className="text-gray-700 mb-4">
          Link navigates to routes. NavLink adds active styling.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4 space-x-2">
            <Link to="/" className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
              Link to Home
            </Link>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `px-3 py-1 rounded text-sm ${
                  isActive ? 'bg-green-500 text-white' : 'bg-gray-300'
                }`
              }
            >
              NavLink (Active Styling)
            </NavLink>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Link - basic navigation
<Link to="/about">About</Link>

// NavLink - with active state
<NavLink 
  to="/about"
  className={({ isActive }) => 
    isActive ? 'active' : ''
  }
>
  About
</NavLink>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Navigate</h3>
        <p className="text-gray-700 mb-4">
          Navigate component redirects to a route when rendered.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Redirect to home
<Navigate to="/" replace />

// Conditional redirect
{!isLoggedIn && <Navigate to="/login" />}

// With state
<Navigate to="/dashboard" state={{ from: 'login' }} />`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Outlet</h3>
        <p className="text-gray-700 mb-4">
          Outlet renders child routes in nested routing.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`function Layout() {
  return (
    <div>
      <nav>Navigation</nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}

<Route path="/" element={<Layout />}>
  <Route path="about" element={<About />} />
</Route>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useNavigate Hook</h3>
        <p className="text-gray-700 mb-4">
          Programmatically navigate to routes.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4 space-x-2">
            <button
              onClick={() => navigate('/about')}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Navigate to About
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate(1)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Go Forward
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const navigate = useNavigate();

// Navigate to route
navigate('/about');

// Navigate with replace (no history entry)
navigate('/about', { replace: true });

// Navigate with state
navigate('/about', { state: { from: 'home' } });

// Navigate history
navigate(-1); // Go back
navigate(1);  // Go forward`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useLocation Hook</h3>
        <p className="text-gray-700 mb-4">
          Returns the current location object.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4 p-3 bg-white rounded">
            <p className="text-sm"><strong>Pathname:</strong> {location.pathname}</p>
            <p className="text-sm"><strong>Search:</strong> {location.search || '(none)'}</p>
            <p className="text-sm"><strong>Hash:</strong> {location.hash || '(none)'}</p>
            <p className="text-sm"><strong>State:</strong> {location.state ? JSON.stringify(location.state) : '(none)'}</p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const location = useLocation();

// location.pathname - current path
// location.search - query string
// location.hash - hash fragment
// location.state - location state`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useParams Hook</h3>
        <p className="text-gray-700 mb-4">
          Returns URL parameters from the current route.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Route: /user/:id
function UserProfile() {
  const { id } = useParams();
  return <div>User {id}</div>;
}

// Multiple params: /user/:userId/post/:postId
const { userId, postId } = useParams();`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useSearchParams Hook</h3>
        <p className="text-gray-700 mb-4">
          Read and modify URL search parameters.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <div className="space-x-2 mb-2">
              <button
                onClick={() => setSearchParams({ filter: 'active' })}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Set Filter=active
              </button>
              <button
                onClick={() => setSearchParams({})}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
              >
                Clear Params
              </button>
            </div>
            <p className="text-sm text-gray-700">
              Current params: {searchParams.toString() || '(none)'}
            </p>
            <p className="text-sm text-gray-700">
              Filter value: {searchParams.get('filter') || '(not set)'}
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const [searchParams, setSearchParams] = useSearchParams();

// Read param
const filter = searchParams.get('filter');

// Set param
setSearchParams({ filter: 'active' });

// Multiple params
setSearchParams({ filter: 'active', sort: 'name' });

// Remove param
searchParams.delete('filter');
setSearchParams(searchParams);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Other Hooks</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <h4 className="font-semibold mb-2">useMatch</h4>
            <p className="text-sm text-gray-700 mb-2">
              Returns match data if route matches: {match ? `Matched: ${match.pathname}` : 'No match'}
            </p>
            <pre className="text-sm bg-white p-2 rounded">{`const match = useMatch('/user/:id');
// Returns match object or null`}</pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">useRoutes</h4>
            <p className="text-sm text-gray-700 mb-2">
              Declarative routing using route objects instead of JSX.
            </p>
            <pre className="text-sm bg-white p-2 rounded">{`const routes = useRoutes([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> }
]);`}</pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">useResolvedPath</h4>
            <p className="text-sm text-gray-700 mb-2">
              Resolves a relative path: {resolvedPath.pathname}
            </p>
            <pre className="text-sm bg-white p-2 rounded">{`const resolved = useResolvedPath('../about');
// Returns absolute path`}</pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">useHref</h4>
            <p className="text-sm text-gray-700 mb-2">
              Returns the href for a route: {href}
            </p>
            <pre className="text-sm bg-white p-2 rounded">{`const href = useHref('/contact');
// Returns the href string`}</pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">useInRouterContext</h4>
            <p className="text-sm text-gray-700 mb-2">
              Checks if component is inside router: {isInRouter ? 'Yes' : 'No'}
            </p>
            <pre className="text-sm bg-white p-2 rounded">{`const isInRouter = useInRouterContext();
// Returns true if inside RouterProvider or Router`}</pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">useNavigationType</h4>
            <p className="text-sm text-gray-700 mb-2">
              Returns navigation type: {navType}
            </p>
            <pre className="text-sm bg-white p-2 rounded">{`const navType = useNavigationType();
// Returns: 'POP' | 'PUSH' | 'REPLACE'`}</pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">useOutlet</h4>
            <p className="text-sm text-gray-700 mb-2">
              Returns the child route element for nested routes.
            </p>
            <pre className="text-sm bg-white p-2 rounded">{`const outlet = useOutlet();
// Returns the element from child route`}</pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">useOutletContext</h4>
            <p className="text-sm text-gray-700 mb-2">
              Accesses context passed from parent route to Outlet.
            </p>
            <pre className="text-sm bg-white p-2 rounded">{`// Parent
<Outlet context={{ user: currentUser }} />

// Child
const { user } = useOutletContext();`}</pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RouterComponentsHooks;

