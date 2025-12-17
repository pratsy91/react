function RouterSetup() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Router Setup</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">BrowserRouter</h3>
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

