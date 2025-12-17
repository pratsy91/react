import { useState, useRef } from 'react';

function ControlledUncontrolledComponents() {
  const [controlledValue, setControlledValue] = useState('');
  const uncontrolledInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    alert(`Uncontrolled value: ${uncontrolledInputRef.current?.value}`);
  };

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      alert(`Selected file: ${file.name} (${file.size} bytes)`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Controlled vs Uncontrolled Components</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Controlled Inputs</h3>
        <p className="text-gray-700 mb-4">
          Controlled components have their value controlled by React state.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <input
              type="text"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
              placeholder="Controlled input"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <p className="text-sm text-gray-600">
              Value: <strong>{controlledValue || '(empty)'}</strong>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              React controls the value - every keystroke updates state
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const [value, setValue] = useState('');

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Uncontrolled with Refs</h3>
        <p className="text-gray-700 mb-4">
          Uncontrolled components store their value in the DOM, accessed via refs.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <form onSubmit={handleUncontrolledSubmit} className="mb-4">
            <input
              ref={uncontrolledInputRef}
              type="text"
              defaultValue="Initial value"
              placeholder="Uncontrolled input"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Get Value
            </button>
          </form>
          <pre className="text-sm bg-white p-2 rounded">{`const inputRef = useRef(null);

<input
  ref={inputRef}
  defaultValue="initial"
/>

// Access value when needed
const value = inputRef.current.value;`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">When to Use Each</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Use Case</th>
                <th className="text-left p-2">Controlled</th>
                <th className="text-left p-2">Uncontrolled</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Form validation</td>
                <td className="p-2">✓ Better</td>
                <td className="p-2">-</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Real-time updates</td>
                <td className="p-2">✓ Better</td>
                <td className="p-2">-</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">File inputs</td>
                <td className="p-2">-</td>
                <td className="p-2">✓ Required</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Performance (large forms)</td>
                <td className="p-2">-</td>
                <td className="p-2">✓ Better</td>
              </tr>
              <tr>
                <td className="p-2">Integration with libraries</td>
                <td className="p-2">✓ Better</td>
                <td className="p-2">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">File Inputs and Special Cases</h3>
        <p className="text-gray-700 mb-4">
          File inputs are always uncontrolled because their value is read-only.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="mb-2"
            />
            <p className="text-xs text-gray-600">
              File inputs must be uncontrolled - React cannot set their value
            </p>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// File inputs are always uncontrolled
const fileRef = useRef(null);

<input
  ref={fileRef}
  type="file"
  onChange={(e) => {
    const file = e.target.files[0];
    // Handle file
  }}
/>

// Access file
const file = fileRef.current.files[0];`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Comparison Example</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ControlledUncontrolledComparison />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Use Controlled When:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>You need real-time validation</li>
            <li>You need to format input as user types</li>
            <li>You need to disable/enable based on value</li>
            <li>You're building reusable form components</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">Use Uncontrolled When:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>File inputs (required)</li>
            <li>Simple forms with minimal validation</li>
            <li>Performance is critical (very large forms)</li>
            <li>Integrating with non-React libraries</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// Comparison Example
function ControlledUncontrolledComparison() {
  const [controlled, setControlled] = useState('');
  const uncontrolledRef = useRef(null);

  return (
    <div className="p-4 bg-white rounded space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Controlled:</label>
        <input
          type="text"
          value={controlled}
          onChange={(e) => setControlled(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-xs text-gray-600 mt-1">
          State: {controlled || '(empty)'} - Updates on every keystroke
        </p>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Uncontrolled:</label>
        <input
          ref={uncontrolledRef}
          type="text"
          defaultValue=""
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-xs text-gray-600 mt-1">
          Value stored in DOM - access via ref when needed
        </p>
      </div>
      <button
        onClick={() => {
          alert(`Uncontrolled value: ${uncontrolledRef.current?.value}`);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Get Uncontrolled Value
      </button>
    </div>
  );
}

export default ControlledUncontrolledComponents;

