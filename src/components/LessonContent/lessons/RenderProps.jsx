import { useState, useEffect } from 'react';

// Render Props Pattern
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} className="h-64 border-2 border-dashed rounded">
      {render(position)}
    </div>
  );
}

// Function as Children
function MousePosition({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} className="h-64 border-2 border-dashed rounded">
      {children(position)}
    </div>
  );
}

// Toggle with Render Props
function Toggle({ render, children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  // Support both render prop and children as function
  if (render) {
    return render({ on, toggle });
  }
  
  if (typeof children === 'function') {
    return children({ on, toggle });
  }

  return null;
}

// Data Fetching with Render Props
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading, error });
}

function RenderProps() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Render Props</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Function as Children</h3>
        <p className="text-gray-700 mb-4">
          Pass a function as children to share component logic with the parent.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <MousePosition>
            {({ x, y }) => (
              <div className="p-4">
                <p className="text-lg font-semibold">
                  Mouse Position: ({x}, {y})
                </p>
                <p className="text-sm text-gray-600">
                  Move your mouse over the dashed area
                </p>
              </div>
            )}
          </MousePosition>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`<MousePosition>
  {({ x, y }) => (
    <p>Position: ({x}, {y})</p>
  )}
</MousePosition>

// Component receives function as children
function MousePosition({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return children(position);
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Render Prop Pattern</h3>
        <p className="text-gray-700 mb-4">
          Use a render prop to share component logic with the parent.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <MouseTracker
            render={({ x, y }) => (
              <div className="p-4">
                <p className="text-lg font-semibold text-blue-600">
                  Tracking: ({x}, {y})
                </p>
              </div>
            )}
          />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`<MouseTracker
  render={({ x, y }) => (
    <p>Position: ({x}, {y})</p>
  )}
/>

// Component uses render prop
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return render(position);
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Toggle Example</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4 mb-4">
            <div>
              <p className="text-sm font-semibold mb-2">Using render prop:</p>
              <Toggle
                render={({ on, toggle }) => (
                  <div>
                    <button
                      onClick={toggle}
                      className={`px-4 py-2 rounded ${
                        on ? 'bg-green-500' : 'bg-gray-300'
                      } text-white`}
                    >
                      {on ? 'ON' : 'OFF'}
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                      Status: {on ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                )}
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Using function as children:</p>
              <Toggle>
                {({ on, toggle }) => (
                  <div>
                    <button
                      onClick={toggle}
                      className={`px-4 py-2 rounded ${
                        on ? 'bg-blue-500' : 'bg-gray-300'
                      } text-white`}
                    >
                      {on ? 'ON' : 'OFF'}
                    </button>
                  </div>
                )}
              </Toggle>
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Both patterns work
<Toggle render={({ on, toggle }) => <Button />} />
<Toggle>{({ on, toggle }) => <Button />}</Toggle>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">HOC vs Render Props</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">HOC</th>
                <th className="text-left p-2">Render Props</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Flexibility</td>
                <td className="p-2">Less flexible</td>
                <td className="p-2">More flexible</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Props naming</td>
                <td className="p-2">Can cause conflicts</td>
                <td className="p-2">No conflicts</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Composition</td>
                <td className="p-2">Wrapper components</td>
                <td className="p-2">Function composition</td>
              </tr>
              <tr>
                <td className="p-2">Debugging</td>
                <td className="p-2">More wrapper layers</td>
                <td className="p-2">Clearer component tree</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">When to Use Render Props</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Good Use Cases:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Sharing logic between components</li>
            <li>Cross-cutting concerns (data fetching, mouse tracking)</li>
            <li>When you need maximum flexibility</li>
            <li>When HOCs would cause prop conflicts</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">Consider Alternatives:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Custom hooks (modern React approach)</li>
            <li>Compound components (for related UI)</li>
            <li>Context API (for global state)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default RenderProps;

