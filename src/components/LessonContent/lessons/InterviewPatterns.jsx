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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> HOC is a function that takes a component and returns an enhanced component. It's a pattern for reusing component logic. The HOC wraps the original component, adds functionality (like auth check), and conditionally renders it or a fallback. Props are spread to the wrapped component. This pattern was popular before hooks but is now less common - hooks provide a cleaner way to share logic. HOCs can cause prop naming conflicts and make debugging harder.</p>
            </div>
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
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> HOC takes component, returns enhanced component. Adds cross-cutting concerns. Spread props to wrapped component. Legacy pattern - hooks preferred now. Can cause prop conflicts.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Render props pattern shares code between components using a prop whose value is a function. The component calls this function with data, and the function returns JSX. This allows the component to control rendering while sharing logic. Can use render prop or children-as-function pattern. More flexible than HOC but can create deeply nested JSX. Hooks are now preferred for sharing logic, but render props are still useful for flexible component composition.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)} />

// Or as children
<DataProvider>
  {data => <h1>Hello {data.target}</h1>}
</DataProvider>`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Prop is a function that returns JSX. Component calls function with data. Flexible composition. Can use render or children. Hooks often preferred now.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Compound components are multiple components that work together as a cohesive unit. The parent component (Select) manages shared state via Context. Child components (Select.Button, Select.Option) are attached as static properties and access shared state via useContext. This provides flexible composition - users can arrange child components as needed. The API is intuitive and allows for good separation of concerns. Context shares state without prop drilling.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`<Select>
  <Select.Button />
  <Select.Options>
    <Select.Option value="1">Option 1</Select.Option>
    <Select.Option value="2">Option 2</Select.Option>
  </Select.Options>
</Select>`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Multiple components work together. Parent manages state via Context. Children attached as static properties. Flexible composition. Intuitive API.</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Implementation:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> The implementation uses Context to share state between parent and children. Select component creates context and provides state (isOpen, setIsOpen). Child components (Button, Option) are defined as static properties on Select, making them accessible as Select.Button. They use useContext to access shared state. This pattern is used by libraries like Reach UI and Radix UI for flexible, composable components.</p>
            </div>
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
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Context shares state. Children as static properties. useContext accesses shared state. Flexible child arrangement. Clean separation of concerns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Error Boundaries */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Error Boundaries</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> Class components that catch errors in child component tree</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Error boundaries catch JavaScript errors in child components, preventing the entire app from crashing. They're class components because hooks don't have equivalent error handling. getDerivedStateFromError runs during render phase to update state for fallback UI. componentDidCatch runs in commit phase for side effects like logging. Error boundaries only catch errors in render, lifecycle methods, and constructors - not event handlers, async code, or SSR errors. Place strategically to isolate error impact.</p>
            </div>
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
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Only class components can be error boundaries. getDerivedStateFromError for state updates. componentDidCatch for side effects. Only catches render/lifecycle errors. Place strategically to isolate failures.</p>
            </div>
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

