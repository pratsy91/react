function RouterSetup() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Router Setup</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding React Router</h3>
        <p className="text-blue-800 mb-2">
          React Router is the standard library for routing in React applications. It enables navigation between different 
          views/components in a single-page application, allows the browser URL to change, and keeps the UI in sync with the URL.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Client-Side Routing:</strong> Navigation happens in the browser without page refreshes</li>
            <li><strong>URL Synchronization:</strong> UI reflects the current URL, enabling bookmarking and sharing</li>
            <li><strong>History Management:</strong> Browser back/forward buttons work correctly</li>
            <li><strong>Route Matching:</strong> Components render based on the current URL path</li>
            <li><strong>Nested Routes:</strong> Routes can be nested for complex layouts</li>
          </ul>
          <p className="mt-2"><strong>Router Types:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>BrowserRouter:</strong> Uses HTML5 History API (clean URLs, requires server config)</li>
            <li><strong>HashRouter:</strong> Uses hash (#) in URL (works without server config)</li>
            <li><strong>MemoryRouter:</strong> Stores history in memory (for testing or non-browser environments)</li>
            <li><strong>StaticRouter:</strong> For server-side rendering</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">BrowserRouter</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">How BrowserRouter Works</h4>
          <p className="text-gray-700 mb-3">
            BrowserRouter uses the HTML5 History API (pushState, replaceState, popstate) to keep your UI in sync with the URL. 
            It provides clean URLs without hash fragments (e.g., /about instead of /#/about).
          </p>
          <p className="text-gray-700 mb-3">
            <strong>Server Configuration Required:</strong> Since BrowserRouter uses real URLs, your server must be configured 
            to serve your React app for all routes. Otherwise, refreshing the page or directly accessing a route will result in a 404 error.
          </p>
          <p className="text-gray-700">
            <strong>Best For:</strong> Production applications, SEO-friendly apps, and when you have control over server configuration.
          </p>
        </div>
        <p className="text-gray-700 mb-4">
          BrowserRouter uses HTML5 history API to keep UI in sync with the URL. This is the most common router.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}`}</pre>
          <div className="mt-4 p-3 bg-green-50 rounded">
            <p className="text-sm text-green-800">
              <strong>✓ Best for:</strong> Production apps, clean URLs, SEO-friendly
            </p>
            <p className="text-sm text-green-800">
              <strong>URL format:</strong> https://example.com/about
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">HashRouter</h3>
        <p className="text-gray-700 mb-4">
          HashRouter uses the hash portion of the URL to keep UI in sync. Works without server configuration.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}`}</pre>
          <div className="mt-4 p-3 bg-yellow-50 rounded">
            <p className="text-sm text-yellow-800">
              <strong>✓ Best for:</strong> Static hosting, legacy browsers, no server config needed
            </p>
            <p className="text-sm text-yellow-800">
              <strong>URL format:</strong> https://example.com/#/about
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">MemoryRouter</h3>
        <p className="text-gray-700 mb-4">
          MemoryRouter keeps the history in memory. Useful for testing and non-browser environments.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { MemoryRouter } from 'react-router-dom';

function App() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MemoryRouter>
  );
}`}</pre>
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">
              <strong>✓ Best for:</strong> Testing, React Native, non-browser environments
            </p>
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> URL doesn't change in browser address bar
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">RouterProvider (v6.4+)</h3>
        <p className="text-gray-700 mb-4">
          RouterProvider is the new way to set up routing using data APIs (loaders, actions).
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: homeLoader,
    action: homeAction,
    errorElement: <ErrorPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}`}</pre>
          <div className="mt-4 p-3 bg-purple-50 rounded">
            <p className="text-sm text-purple-800">
              <strong>✓ Benefits:</strong> Data loading, error handling, better TypeScript support
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">createBrowserRouter</h3>
        <p className="text-gray-700 mb-4">
          Creates a router instance with data APIs support. Recommended for new projects.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'about',
        element: <About />,
        loader: aboutLoader
      }
    ]
  }
]);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">createRoutesFromElements</h3>
        <p className="text-gray-700 mb-4">
          Converts JSX route elements into route objects. Useful for migrating from JSX routes.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Router Comparison</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Router</th>
                <th className="text-left p-2">URL Format</th>
                <th className="text-left p-2">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">BrowserRouter</td>
                <td className="p-2">/path</td>
                <td className="p-2">Production apps, SEO</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">HashRouter</td>
                <td className="p-2">/#/path</td>
                <td className="p-2">Static hosting, legacy</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">MemoryRouter</td>
                <td className="p-2">(no URL change)</td>
                <td className="p-2">Testing, React Native</td>
              </tr>
              <tr>
                <td className="p-2">RouterProvider</td>
                <td className="p-2">/path</td>
                <td className="p-2">Modern apps (v6.4+)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Installation</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`npm install react-router-dom

# Or with yarn
yarn add react-router-dom

# Or with pnpm
pnpm add react-router-dom`}</pre>
        </div>
      </section>
    </div>
  );
}

export default RouterSetup;

