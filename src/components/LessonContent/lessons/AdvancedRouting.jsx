import { 
  Link, useSearchParams, useNavigate
} from 'react-router-dom';
import { useState } from 'react';

// Simulated loader function
async function userLoader({ params }) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    id: params.id,
    name: `User ${params.id}`,
    email: `user${params.id}@example.com`
  };
}

// Simulated action function
async function formAction({ request }) {
  const formData = await request.formData();
  const name = formData.get('name');
  
  // Simulate validation
  if (!name || name.length < 3) {
    return { error: 'Name must be at least 3 characters' };
  }
  
  return { success: true, message: `Created: ${name}` };
}

// Layout component
function Layout() {
  return (
    <div className="border-2 border-blue-300 rounded p-4">
      <nav className="mb-4 space-x-2">
        <Link to="/advanced" className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Home</Link>
        <Link to="/advanced/nested" className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Nested</Link>
        <Link to="/advanced/user/123" className="px-3 py-1 bg-blue-500 text-white rounded text-sm">User 123</Link>
      </nav>
      <Outlet />
    </div>
  );
}

// Protected route component
function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/advanced/login" replace />;
  }
  return children;
}

// Error boundary component
function ErrorElement({ error }) {
  return (
    <div className="p-4 bg-red-50 border border-red-300 rounded">
      <h2 className="text-lg font-semibold text-red-800">Error!</h2>
      <p className="text-sm text-red-700">{error.message}</p>
    </div>
  );
}

function AdvancedRouting() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Advanced Routing</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Advanced Routing Patterns</h3>
        <p className="text-blue-800 mb-2">
          Advanced routing patterns in React Router enable complex navigation structures, data loading, error handling, and 
          route protection. These patterns help you build production-ready applications with proper data fetching, authentication, 
          and user experience.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Advanced Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Nested Routes:</strong> Create route hierarchies with shared layouts</li>
            <li><strong>Dynamic Routes:</strong> Routes with parameters (/:id)</li>
            <li><strong>Protected Routes:</strong> Require authentication before rendering</li>
            <li><strong>Data Loading:</strong> Loaders fetch data before route renders</li>
            <li><strong>Form Actions:</strong> Handle form submissions at route level</li>
            <li><strong>Error Boundaries:</strong> Error elements for route-level error handling</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Better code organization with nested routes</li>
            <li>Shared layouts reduce code duplication</li>
            <li>Data loading before render improves UX</li>
            <li>Route-level error handling</li>
            <li>Better authentication/authorization patterns</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Nested Routes</h3>
        <p className="text-gray-700 mb-4">
          Nested routes allow you to create route hierarchies with shared layouts.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
  </Route>
</Routes>

// Layout component uses <Outlet /> to render children`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Dynamic Routes</h3>
        <p className="text-gray-700 mb-4">
          Use :paramName to create dynamic route segments.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4 space-x-2">
            <Link to="/advanced/user/1" className="px-3 py-1 bg-green-500 text-white rounded text-sm">
              User 1
            </Link>
            <Link to="/advanced/user/2" className="px-3 py-1 bg-green-500 text-white rounded text-sm">
              User 2
            </Link>
            <Link to="/advanced/user/999" className="px-3 py-1 bg-green-500 text-white rounded text-sm">
              User 999
            </Link>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`<Route path="/user/:id" element={<UserProfile />} />

// Access params with useParams
function UserProfile() {
  const { id } = useParams();
  return <div>User {id}</div>;
}

// Multiple params
<Route path="/user/:userId/post/:postId" />`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Protected Routes</h3>
        <p className="text-gray-700 mb-4">
          Protect routes by checking authentication and redirecting if needed.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <label className="block mb-2">
              <input
                type="checkbox"
                checked={isAuthenticated}
                onChange={(e) => setIsAuthenticated(e.target.checked)}
                className="mr-2"
              />
              Authenticated
            </label>
            <button
              onClick={() => navigate('/advanced/dashboard')}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Go to Dashboard
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute isAuthenticated={isAuth}>
      <Dashboard />
    </ProtectedRoute>
  }
/>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Route Guards</h3>
        <p className="text-gray-700 mb-4">
          Implement route guards using loaders or wrapper components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Using loader
async function protectedLoader({ request }) {
  const user = await getCurrentUser();
  if (!user) {
    throw redirect('/login');
  }
  return { user };
}

<Route 
  path="/admin" 
  loader={protectedLoader}
  element={<Admin />}
/>

// Using wrapper component
function RequireAuth({ children }) {
  const user = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Lazy Loaded Routes</h3>
        <p className="text-gray-700 mb-4">
          Load route components lazily to reduce initial bundle size.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { lazy, Suspense } from 'react';

const Admin = lazy(() => import('./Admin'));
const Dashboard = lazy(() => import('./Dashboard'));

<Routes>
  <Route 
    path="/admin" 
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <Admin />
      </Suspense>
    }
  />
</Routes>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Loading with Loaders</h3>
        <p className="text-gray-700 mb-4">
          Loaders fetch data before rendering the route component.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Loader function
async function userLoader({ params, request }) {
  const user = await fetchUser(params.id);
  return { user };
}

// Route with loader
<Route 
  path="/user/:id" 
  loader={userLoader}
  element={<UserProfile />}
/>

// Access loaded data
function UserProfile() {
  const { user } = useLoaderData();
  return <div>{user.name}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Actions and Forms</h3>
        <p className="text-gray-700 mb-4">
          Actions handle form submissions and mutations.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <FormExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// Action function
async function createUser({ request }) {
  const formData = await request.formData();
  const name = formData.get('name');
  // Create user...
  return { success: true };
}

// Route with action
<Route 
  path="/users" 
  action={createUser}
  element={<UserForm />}
/>

// Form component
function UserForm() {
  const actionData = useActionData();
  const navigation = useNavigation();
  
  return (
    <Form method="post">
      <input name="name" />
      <button disabled={navigation.state === 'submitting'}>
        Submit
      </button>
    </Form>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Elements</h3>
        <p className="text-gray-700 mb-4">
          Error elements catch and display errors from loaders, actions, or components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`<Route 
  path="/user/:id" 
  loader={userLoader}
  element={<UserProfile />}
  errorElement={<ErrorElement />}
/>

function ErrorElement({ error }) {
  return (
    <div>
      <h2>Error!</h2>
      <p>{error.message}</p>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Index Routes</h3>
        <p className="text-gray-700 mb-4">
          Index routes render when the parent route path is matched exactly.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
</Route>

// /dashboard → DashboardHome
// /dashboard/settings → Settings`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Layout Routes</h3>
        <p className="text-gray-700 mb-4">
          Layout routes provide shared UI for child routes.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`function Layout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* Child routes render here */}
      <Footer />
    </div>
  );
}

<Route path="/" element={<Layout />}>
  <Route path="about" element={<About />} />
  <Route path="contact" element={<Contact />} />
</Route>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Scroll Restoration</h3>
        <p className="text-gray-700 mb-4">
          React Router automatically restores scroll position, but you can customize it.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Custom scroll restoration
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Or use ScrollRestoration component (v6.4+)
import { ScrollRestoration } from 'react-router-dom';

<ScrollRestoration />`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Route Parameters and Query Strings</h3>
        <p className="text-gray-700 mb-4">
          Access route parameters and query strings in your components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <RouteParamsExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// Route params
<Route path="/user/:id" />
const { id } = useParams();

// Query strings
// URL: /search?q=react&page=1
const [searchParams] = useSearchParams();
const query = searchParams.get('q'); // 'react'
const page = searchParams.get('page'); // '1'

// Set query params
searchParams.set('page', '2');
setSearchParams(searchParams);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Patterns</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Route Configuration Object:</h4>
          <pre className="text-sm bg-white p-2 rounded">{`const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'user/:id',
        element: <UserProfile />,
        loader: userLoader,
        action: userAction,
        errorElement: <ErrorBoundary />
      }
    ]
  }
];`}</pre>
        </div>
      </section>
    </div>
  );
}

// Form Example Component
function FormExample() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    
    // Simulate action
    if (!name || name.length < 3) {
      setResult({ error: 'Name must be at least 3 characters' });
      return;
    }
    
    setResult({ success: true, message: `Created: ${name}` });
  };

  return (
    <div className="p-4 bg-white rounded mb-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          name="name"
          type="text"
          placeholder="Enter name (min 3 chars)"
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
      {result && (
        <div className={`mt-2 p-2 rounded ${
          result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {result.message || result.error}
        </div>
      )}
    </div>
  );
}

// Route Params Example
function RouteParamsExample() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';

  return (
    <div className="p-4 bg-white rounded mb-4">
      <div className="space-y-2">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('q', e.target.value);
            setSearchParams(newParams);
          }}
          placeholder="Search query"
          className="w-full px-3 py-2 border rounded"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('page', String(parseInt(page) - 1 || 1));
              setSearchParams(newParams);
            }}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Previous
          </button>
          <span className="text-sm">Page: {page}</span>
          <button
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('page', String(parseInt(page) + 1));
              setSearchParams(newParams);
            }}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Next
          </button>
        </div>
        <p className="text-xs text-gray-600">
          Current URL params: q={query || '(empty)'}, page={page}
        </p>
      </div>
    </div>
  );
}

export default AdvancedRouting;

