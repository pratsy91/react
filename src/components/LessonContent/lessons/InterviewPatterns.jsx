function InterviewPatterns() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Patterns & Best Practices - Interview Cheatsheet</h2>
        <p className="text-gray-700">Advanced patterns and best practices for React interviews</p>
      </div>

      {/* HOC */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Higher-Order Components (HOC)</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> Function that takes a component and returns a new component</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = checkAuth();
    
    if (!isAuthenticated) {
      return <Login />;
    }
    
    return <WrappedComponent {...props} />;
  };
}

const ProtectedComponent = withAuth(MyComponent);`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Use Cases:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Code reuse and logic sharing</li>
              <li>Props manipulation</li>
              <li>Conditional rendering</li>
              <li>Legacy pattern (hooks preferred now)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Render Props */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Render Props Pattern</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> Component that uses a prop (usually render) that is a function</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)} />

// Or as children
<DataProvider>
  {data => <h1>Hello {data.target}</h1>}
</DataProvider>`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Benefits:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Flexible component composition</li>
              <li>Share logic between components</li>
              <li>Alternative to HOC</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Compound Components */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Compound Components</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> Components that work together to form a complete UI</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`<Select>
  <Select.Button />
  <Select.Options>
    <Select.Option value="1">Option 1</Select.Option>
    <Select.Option value="2">Option 2</Select.Option>
  </Select.Options>
</Select>`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Implementation:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const SelectContext = createContext();

function Select({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SelectContext.Provider>
  );
}

Select.Button = function Button() {
  const { isOpen, setIsOpen } = useContext(SelectContext);
  return <button onClick={() => setIsOpen(!isOpen)}>...</button>;
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Error Boundaries */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Error Boundaries</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> Class components that catch errors in child component tree</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}`}
            </pre>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Important:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Only class components can be error boundaries</li>
              <li>Don't catch errors in event handlers, async code, or during SSR</li>
              <li>Place strategically to catch errors in specific parts of app</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Splitting */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Code Splitting</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>React.lazy:</strong> Lazy load components</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Benefits:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Reduce initial bundle size</li>
              <li>Load code on demand</li>
              <li>Better performance</li>
              <li>Route-based splitting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Suspense */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Suspense</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Show fallback UI while waiting for something</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`<Suspense fallback={<Spinner />}>
  <ProfilePage />
</Suspense>`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Use Cases:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Code splitting (React.lazy)</li>
              <li>Data fetching (React 18+)</li>
              <li>Multiple Suspense boundaries</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Portal */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Portal</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Render children into a DOM node outside parent hierarchy</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')
  );
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Use Cases:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Modals and dialogs</li>
              <li>Tooltips</li>
              <li>Dropdowns</li>
              <li>Any UI that needs to break out of parent container</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Component Composition */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Component Composition</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Best Practice:</strong> Compose components instead of complex props</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`// ❌ Bad: Too many props
<Dialog
  title="Title"
  body="Body"
  footer="Footer"
/>

// ✅ Good: Composition
<Dialog>
  <Dialog.Title>Title</Dialog.Title>
  <Dialog.Body>Body</Dialog.Body>
  <Dialog.Footer>Footer</Dialog.Footer>
</Dialog>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Component Design Best Practices</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">Do's:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Single Responsibility Principle</li>
              <li>Keep components small and focused</li>
              <li>Use composition over inheritance</li>
              <li>Extract reusable logic to custom hooks</li>
              <li>Use meaningful component names</li>
              <li>PropTypes or TypeScript for props</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">Don'ts:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Don't mutate props</li>
              <li>Don't create components inside render</li>
              <li>Don't use index as key (unless static list)</li>
              <li>Don't over-optimize prematurely</li>
              <li>Don't mix concerns (UI + business logic)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewPatterns;

