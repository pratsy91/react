import { useState } from 'react';

function ReactTestingLibrary() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React Testing Library</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding React Testing Library</h3>
        <p className="text-blue-800 mb-2">
          React Testing Library (RTL) is a testing utility that encourages testing your components the way users interact 
          with them. It focuses on testing behavior rather than implementation details, making your tests more maintainable 
          and less brittle.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Principles:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>User-Centric:</strong> Test what users see and do, not implementation details</li>
            <li><strong>Accessibility First:</strong> Queries prioritize accessible queries (role, label, text)</li>
            <li><strong>Behavior Over Implementation:</strong> Don't test internal state or methods</li>
            <li><strong>Encourages Good Practices:</strong> Writing accessible, user-friendly components</li>
            <li><strong>Simple API:</strong> Easy to learn and use with minimal setup</li>
          </ul>
          <p className="mt-2"><strong>Query Priority (Recommended Order):strong></strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>1. getByRole (most accessible, recommended)</li>
            <li>2. getByLabelText (for form fields)</li>
            <li>3. getByPlaceholderText (for inputs)</li>
            <li>4. getByText (for visible text content)</li>
            <li>5. getByDisplayValue (for form values)</li>
            <li>6. getByAltText (for images)</li>
            <li>7. getByTitle (for title attributes)</li>
            <li>8. getByTestId (last resort, not user-visible)</li>
          </ul>
          <p className="mt-2"><strong>Query Variants:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>getBy*:</strong> Throws error if element not found (use when element must exist)</li>
            <li><strong>queryBy*:</strong> Returns null if not found (use when checking absence)</li>
            <li><strong>findBy*:</strong> Returns promise, waits for async appearance</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">All Queries (getBy, queryBy, findBy)</h3>
        <p className="text-gray-700 mb-4">
          React Testing Library provides multiple query methods for finding elements.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { render, screen } from '@testing-library/react';

// getBy* - throws error if element not found
const button = screen.getByRole('button');
const input = screen.getByLabelText('Username');
const heading = screen.getByText('Welcome');
const element = screen.getByTestId('custom-element');

// queryBy* - returns null if element not found (no error)
const button = screen.queryByRole('button');
if (button) {
  // Element exists
}

// findBy* - returns promise, waits for element to appear
const button = await screen.findByRole('button');
const heading = await screen.findByText('Welcome');

// getAllBy* - returns array, throws if none found
const buttons = screen.getAllByRole('button');

// queryAllBy* - returns array, empty if none found
const buttons = screen.queryAllByRole('button');

// findAllBy* - returns promise of array
const buttons = await screen.findAllByRole('button');

// Query types
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');
screen.getByPlaceholderText('Enter email');
screen.getByText('Welcome');
screen.getByDisplayValue('John');
screen.getByAltText('Logo');
screen.getByTitle('Tooltip');
screen.getByTestId('custom-id');

// Priority order (best to worst):
// 1. getByRole (most accessible)
// 2. getByLabelText
// 3. getByPlaceholderText
// 4. getByText
// 5. getByDisplayValue
// 6. getByAltText
// 7. getByTitle
// 8. getByTestId (last resort)`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">User Events and Interactions</h3>
        <p className="text-gray-700 mb-4">
          Simulate user interactions with @testing-library/user-event.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Click
const user = userEvent.setup();
await user.click(screen.getByRole('button'));

// Type
await user.type(screen.getByLabelText('Email'), 'test@example.com');

// Clear input
await user.clear(screen.getByLabelText('Email'));

// Keyboard events
await user.keyboard('{Enter}');
await user.keyboard('{Tab}');
await user.keyboard('{Escape}');

// Select options
await user.selectOptions(screen.getByRole('combobox'), 'option1');

// Upload file
const file = new File(['hello'], 'hello.png', { type: 'image/png' });
await user.upload(screen.getByLabelText('Upload'), file);

// Hover
await user.hover(screen.getByText('Hover me'));

// Double click
await user.dblClick(screen.getByRole('button'));

// Triple click
await user.tripleClick(screen.getByText('Text'));

// Paste
await user.paste('Pasted text');

// Complete example
test('user can submit form', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  
  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'password123');
  await user.click(screen.getByRole('button', { name: 'Submit' }));
  
  expect(screen.getByText('Welcome')).toBeInTheDocument();
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Async Testing</h3>
        <p className="text-gray-700 mb-4">
          Handle asynchronous operations in tests.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { render, screen, waitFor } from '@testing-library/react';

// waitFor - wait for assertion to pass
test('data loads', async () => {
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});

// waitFor with options
await waitFor(
  () => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  },
  { timeout: 3000, interval: 100 }
);

// waitForElementToBeRemoved
import { waitForElementToBeRemoved } from '@testing-library/react';

await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

// findBy* queries (built-in async)
test('async data', async () => {
  render(<AsyncComponent />);
  
  const element = await screen.findByText('Loaded');
  expect(element).toBeInTheDocument();
});

// Multiple async operations
test('multiple async', async () => {
  render(<Component />);
  
  await screen.findByText('First');
  await screen.findByText('Second');
  
  expect(screen.getByText('Complete')).toBeInTheDocument();
});

// Using act for state updates
import { act } from '@testing-library/react';

await act(async () => {
  await user.click(button);
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Renders</h3>
        <p className="text-gray-700 mb-4">
          Create custom render functions for providers and common setup.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

// Custom render with providers
const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Usage in tests
import { render, screen } from './test-utils';

test('component', () => {
  render(<Component />);
  // Component has access to theme and router
});

// Custom render with options
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

// Custom render with initial state
const renderWithRedux = (
  component,
  { initialState = {}, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Testing Hooks</h3>
        <p className="text-gray-700 mb-4">
          Test custom hooks using @testing-library/react-hooks.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

// Basic hook testing
test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});

// Hook with initial value
test('hook with initial value', () => {
  const { result } = renderHook(() => useCounter(10));
  expect(result.current.count).toBe(10);
});

// Hook with props
test('hook with props', () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue),
    { initialProps: { initialValue: 0 } }
  );
  
  expect(result.current.count).toBe(0);
  
  rerender({ initialValue: 10 });
  expect(result.current.count).toBe(10);
});

// Hook with context
import { renderHook } from '@testing-library/react';
import { ThemeContext } from './ThemeContext';

test('hook with context', () => {
  const wrapper = ({ children }) => (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
  
  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.current.theme).toBe('dark');
});

// Async hook testing
test('async hook', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useAsyncData());
  
  await waitForNextUpdate();
  
  expect(result.current.data).toBeDefined();
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Testing Context</h3>
        <p className="text-gray-700 mb-4">
          Test components that use React Context.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { render, screen } from '@testing-library/react';
import { ThemeContext } from './ThemeContext';

// Test component with context
test('uses context value', () => {
  const themeValue = { theme: 'dark', toggleTheme: jest.fn() };
  
  render(
    <ThemeContext.Provider value={themeValue}>
      <ThemedComponent />
    </ThemeContext.Provider>
  );
  
  expect(screen.getByText('Dark Theme')).toBeInTheDocument();
});

// Custom wrapper for context
const renderWithContext = (ui, contextValue) => {
  return render(
    <ThemeContext.Provider value={contextValue}>
      {ui}
    </ThemeContext.Provider>
  );
};

test('component with context', () => {
  renderWithContext(<Component />, { theme: 'light' });
  // Test component
});

// Multiple contexts
const renderWithAllProviders = (ui, { theme, auth } = {}) => {
  return render(
    <ThemeProvider value={theme}>
      <AuthProvider value={auth}>
        {ui}
      </AuthProvider>
    </ThemeProvider>
  );
};

// Mock context
jest.mock('./ThemeContext', () => ({
  ThemeContext: {
    Consumer: ({ children }) => children({ theme: 'dark' }),
    Provider: ({ children }) => children
  }
}));`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Testing Custom Hooks</h3>
        <p className="text-gray-700 mb-4">
          Test custom hooks in isolation or within components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`import { renderHook, act } from '@testing-library/react';

// Custom hook example
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Test custom hook
test('useCounter hook', () => {
  const { result } = renderHook(() => useCounter());
  
  expect(result.current.count).toBe(0);
  
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
  
  act(() => {
    result.current.decrement();
  });
  expect(result.current.count).toBe(0);
  
  act(() => {
    result.current.reset();
  });
  expect(result.current.count).toBe(0);
});

// Test hook with useEffect
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading };
}

test('useFetch hook', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: 'John' })
    })
  );
  
  const { result, waitForNextUpdate } = renderHook(() => useFetch('/api/user'));
  
  expect(result.current.loading).toBe(true);
  
  await waitForNextUpdate();
  
  expect(result.current.loading).toBe(false);
  expect(result.current.data).toEqual({ name: 'John' });
});

// Test hook cleanup
test('hook cleanup', () => {
  const { unmount } = renderHook(() => useEffect(() => {
    return () => {
      // Cleanup
    };
  }));
  
  unmount();
  // Verify cleanup was called
});`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ReactTestingLibrary;

