function InterviewTesting() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Testing Strategies - Interview Cheatsheet</h2>
        <p className="text-gray-700">Complete guide to testing React applications for interviews</p>
      </div>

      {/* React Testing Library */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React Testing Library</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 mb-2"><strong>Philosophy:</strong> Test behavior, not implementation</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React Testing Library encourages testing from user's perspective - what users see and interact with, not internal implementation. render() renders component into DOM. screen provides queries to find elements. getByRole is preferred because it queries by accessibility role (how screen readers see elements). This makes tests more resilient to refactoring and ensures accessibility. Testing behavior means tests focus on outcomes, not how code achieves them.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-2">
{`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('renders button', () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Test from user perspective. getByRole queries by accessibility. Tests behavior, not implementation. More resilient to refactoring. Ensures accessibility.</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Query Methods (Priority Order):</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>getByRole:</strong> Most accessible (preferred)</li>
              <li><strong>getByLabelText:</strong> Form inputs</li>
              <li><strong>getByPlaceholderText:</strong> Inputs</li>
              <li><strong>getByText:</strong> Text content</li>
              <li><strong>getByTestId:</strong> Last resort</li>
            </ul>
          </div>
        </div>
      </section>

      {/* User Interactions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Testing User Interactions</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">User Events:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> userEvent simulates real user interactions more accurately than fireEvent. userEvent.setup() creates a user instance. All interactions are async and must be awaited. userEvent fires multiple events (like mousedown, mouseup, click for a click) to match real browser behavior. This makes tests more realistic and catches bugs that fireEvent might miss. userEvent is preferred over fireEvent for better simulation of user behavior.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import userEvent from '@testing-library/user-event';

test('handles click', async () => {
  const user = userEvent.setup();
  render(<Button onClick={handleClick}>Click</Button>);
  
  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});

test('handles input', async () => {
  const user = userEvent.setup();
  render(<Input />);
  
  const input = screen.getByRole('textbox');
  await user.type(input, 'Hello');
  expect(input).toHaveValue('Hello');
});`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> userEvent simulates real interactions. All events are async. Fires multiple events like real browser. More accurate than fireEvent. Must await interactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Hooks */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Testing Custom Hooks</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Using renderHook:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> renderHook allows testing custom hooks in isolation without rendering components. It returns result object with current property containing hook's return value. act() wraps state updates to ensure React processes them synchronously. This is required for testing hooks because state updates need to be batched and processed. renderHook is useful for testing hook logic separately from component rendering, making tests faster and more focused.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { renderHook, act } from '@testing-library/react';

function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}

test('increments count', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> renderHook tests hooks in isolation. result.current contains hook return value. act() wraps state updates. Required for synchronous state processing. Faster than component tests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Context */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Testing Context Providers</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Custom Render:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function renderWithProvider(ui) {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
}

test('uses theme context', () => {
  renderWithProvider(<Component />);
  // test...
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* Async Testing */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Testing Async Operations</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Waiting for Elements:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`test('loads data', async () => {
  render(<DataComponent />);
  
  // Wait for loading to disappear
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  
  // Wait for data to appear
  const data = await screen.findByText('Data loaded');
  expect(data).toBeInTheDocument();
});`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Mocking API Calls:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' }),
  })
);

test('fetches data', async () => {
  render(<DataFetcher />);
  
  await waitFor(() => {
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  
  expect(fetch).toHaveBeenCalledTimes(1);
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* Mocking */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Mocking</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Mock Functions:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const mockFn = jest.fn();
const mockFnWithReturn = jest.fn(() => 'return value');

test('calls function', () => {
  render(<Component onClick={mockFn} />);
  fireEvent.click(screen.getByRole('button'));
  
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn).toHaveBeenCalledWith('arg');
});`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Mock Modules:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`jest.mock('./api', () => ({
  fetchData: jest.fn(() => Promise.resolve({ data: 'test' })),
}));`}
            </pre>
          </div>
        </div>
      </section>

      {/* Snapshot Testing */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Snapshot Testing</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Component Snapshots:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`test('matches snapshot', () => {
  const { container } = render(<Component />);
  expect(container).toMatchSnapshot();
});`}
            </pre>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">When to Use:</p>
            <p className="text-gray-700">Use sparingly. Good for preventing accidental UI changes, but can be brittle. Prefer testing behavior over snapshots.</p>
          </div>
        </div>
      </section>

      {/* E2E Testing */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">E2E Testing</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Tools:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>Playwright:</strong> Modern, fast, cross-browser</li>
              <li><strong>Cypress:</strong> Popular, great DX, time-travel debugging</li>
              <li><strong>Puppeteer:</strong> Chrome/Chromium automation</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Playwright Example:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* Testing Best Practices */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Testing Best Practices</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">Do's:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Test user behavior, not implementation</li>
              <li>Use accessible queries (getByRole)</li>
              <li>Test one thing per test</li>
              <li>Use descriptive test names</li>
              <li>Keep tests simple and readable</li>
              <li>Mock external dependencies</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">Don'ts:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Don't test implementation details</li>
              <li>Don't overuse snapshots</li>
              <li>Don't test third-party libraries</li>
              <li>Don't write brittle tests</li>
              <li>Don't test everything</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What's the difference between getBy, queryBy, and findBy?</p>
            <p className="text-gray-700">A: getBy throws if not found, queryBy returns null, findBy returns a promise for async elements.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you test async operations?</p>
            <p className="text-gray-700">A: Use findBy queries, waitFor, or waitForElementToBeRemoved. Always use async/await.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What's the testing pyramid?</p>
            <p className="text-gray-700">A: Many unit tests, fewer integration tests, few E2E tests. Focus on testing user behavior.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewTesting;

