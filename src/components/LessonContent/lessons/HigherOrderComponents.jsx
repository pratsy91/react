import { useState, useEffect } from 'react';

// Basic HOC - Adding loading state
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div className="p-4 text-center">Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// HOC - Adding data fetching
function withData(WrappedComponent, dataSource) {
  return function WithDataComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate data fetching
      setTimeout(() => {
        setData(dataSource);
        setLoading(false);
      }, 1000);
    }, []);

    if (loading) {
      return <div className="p-4">Loading data...</div>;
    }

    return <WrappedComponent data={data} {...props} />;
  };
}

// HOC - Props manipulation
function withUserRole(Component) {
  return function WithUserRoleComponent({ user, ...props }) {
    const isAdmin = user?.role === 'admin';
    const isEditor = user?.role === 'editor';
    
    return (
      <Component
        {...props}
        user={user}
        isAdmin={isAdmin}
        isEditor={isEditor}
        canEdit={isAdmin || isEditor}
      />
    );
  };
}

// HOC - Authentication
function withAuth(Component) {
  return function WithAuthComponent({ isAuthenticated, ...props }) {
    if (!isAuthenticated) {
      return <div className="p-4 text-red-600">Please log in to continue</div>;
    }
    return <Component {...props} />;
  };
}

// Base Components
function UserProfile({ user, isAdmin, canEdit }) {
  return (
    <div className="p-4 bg-white rounded border">
      <h3 className="font-semibold">{user?.name}</h3>
      <p className="text-sm text-gray-600">Role: {user?.role}</p>
      {isAdmin && <p className="text-sm text-blue-600">Admin privileges</p>}
      {canEdit && <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>}
    </div>
  );
}

function DataDisplay({ data }) {
  return (
    <div className="p-4 bg-green-50 rounded">
      <p className="font-semibold">Data loaded:</p>
      <pre className="text-sm mt-2">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// Enhanced Components using HOCs
const UserProfileWithRole = withUserRole(UserProfile);
const UserProfileWithAuth = withAuth(UserProfileWithRole);
const DataDisplayWithLoading = withLoading(DataDisplay);
const DataDisplayWithData = withData(DataDisplay, { message: 'Hello from HOC!' });

function HigherOrderComponents() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({ name: 'John Doe', role: 'admin' });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Higher-Order Components (HOC)</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Creating HOCs</h3>
        <p className="text-gray-700 mb-4">
          HOCs are functions that take a component and return a new component with enhanced functionality.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <button
              onClick={() => setIsLoading(!isLoading)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
            >
              Toggle Loading
            </button>
            <DataDisplayWithLoading isLoading={isLoading} data={{ test: 'data' }} />
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

const EnhancedComponent = withLoading(MyComponent);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Props Manipulation</h3>
        <p className="text-gray-700 mb-4">
          HOCs can add, remove, or modify props before passing them to the wrapped component.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <div className="space-y-2 mb-4">
              <label className="block">
                <input
                  type="radio"
                  name="role"
                  checked={user.role === 'admin'}
                  onChange={() => setUser({ ...user, role: 'admin' })}
                  className="mr-2"
                />
                Admin
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="role"
                  checked={user.role === 'editor'}
                  onChange={() => setUser({ ...user, role: 'editor' })}
                  className="mr-2"
                />
                Editor
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="role"
                  checked={user.role === 'user'}
                  onChange={() => setUser({ ...user, role: 'user' })}
                  className="mr-2"
                />
                User
              </label>
            </div>
            <UserProfileWithRole user={user} />
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`function withUserRole(Component) {
  return function WithUserRoleComponent({ user, ...props }) {
    const isAdmin = user?.role === 'admin';
    return (
      <Component
        {...props}
        user={user}
        isAdmin={isAdmin}
        canEdit={isAdmin}
      />
    );
  };
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Multiple HOCs Composition</h3>
        <p className="text-gray-700 mb-4">
          You can compose multiple HOCs together to add multiple enhancements.
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
            <UserProfileWithAuth
              user={user}
              isAuthenticated={isAuthenticated}
            />
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Compose multiple HOCs
const Enhanced = withAuth(
  withUserRole(
    withLoading(MyComponent)
  )
);

// Or using a compose utility
const Enhanced = compose(
  withAuth,
  withUserRole,
  withLoading
)(MyComponent);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">HOC Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Do:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Use displayName for debugging</li>
            <li>Pass through unrelated props with spread operator</li>
            <li>Don't mutate the original component</li>
            <li>Use composition over inheritance</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">✗ Don't:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Use HOCs inside render method</li>
            <li>Mutate the wrapped component</li>
            <li>Forget to forward refs when needed</li>
            <li>Create HOCs that cause prop name conflicts</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Common Pitfalls</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h4 className="font-semibold mb-2">Pitfall 1: Props Name Conflicts</h4>
          <pre className="text-sm bg-white p-2 rounded mb-4">{`// ❌ Bad - props conflict
function withData(Component) {
  return function({ data, ...props }) {
    return <Component data={newData} {...props} />;
  };
}

// ✅ Good - use different prop name or namespace
function withData(Component) {
  return function({ data: originalData, ...props }) {
    return <Component data={enhancedData} originalData={originalData} {...props} />;
  };
}`}</pre>
          <h4 className="font-semibold mb-2">Pitfall 2: Creating HOC in Render</h4>
          <pre className="text-sm bg-white p-2 rounded">{`// ❌ Bad - creates new component every render
function App() {
  const Enhanced = withHOC(Component);
  return <Enhanced />;
}

// ✅ Good - create outside component
const Enhanced = withHOC(Component);
function App() {
  return <Enhanced />;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">HOC vs Custom Hooks</h3>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Modern React:</strong> Custom hooks are often preferred over HOCs for sharing logic.
          </p>
          <p className="text-sm text-blue-800">
            HOCs are still useful for adding UI enhancements, but hooks are better for stateful logic.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HigherOrderComponents;

