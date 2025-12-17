import { useRef, useState } from 'react';

function UncontrolledForms() {
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [result, setResult] = useState(null);

  // Form refs - accessing form data
  const handleFormRefSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    setResult({ method: 'FormData API', data });
  };

  // Individual input refs
  const handleInputRefsSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value
    };
    setResult({ method: 'Input Refs', data });
  };

  // Native form handling
  const handleNativeSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    setResult({ method: 'Native Form Handling', data });
  };

  // FormData API with file
  const handleFileFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Access individual values
    const name = formData.get('name');
    const file = formData.get('file');
    
    // Access all entries
    const entries = Array.from(formData.entries());
    
    setResult({
      method: 'FormData with File',
      data: {
        name,
        fileName: file?.name,
        fileSize: file?.size,
        allEntries: entries
      }
    });
  };

  // FormData API - append method
  const handleAppendSubmit = () => {
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('age', '30');
    
    // Append multiple values with same key
    formData.append('hobby', 'reading');
    formData.append('hobby', 'sports');
    
    const entries = Array.from(formData.entries());
    setResult({ method: 'FormData.append()', data: entries });
  };

  // FormData API - has, get, getAll, delete
  const handleFormDataMethods = () => {
    const formData = new FormData();
    formData.append('name', 'John');
    formData.append('email', 'john@example.com');
    formData.append('tags', 'react');
    formData.append('tags', 'javascript');
    
    const methods = {
      hasName: formData.has('name'),
      getName: formData.get('name'),
      getEmail: formData.get('email'),
      getAllTags: formData.getAll('tags'),
      keys: Array.from(formData.keys()),
      values: Array.from(formData.values())
    };
    
    // Delete a field
    formData.delete('email');
    methods.afterDelete = !formData.has('email');
    
    setResult({ method: 'FormData Methods', data: methods });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Uncontrolled Forms</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Form Refs</h3>
        <p className="text-gray-700 mb-4">
          Use refs to access form elements and their values without controlling them with state.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <form ref={formRef} onSubmit={handleFormRefSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name:</label>
              <input
                type="text"
                name="name"
                defaultValue="John Doe"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email:</label>
              <input
                type="email"
                name="email"
                defaultValue="john@example.com"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit (Form Ref)
            </button>
          </form>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const formRef = useRef(null);

<form ref={formRef} onSubmit={handleSubmit}>
  <input name="name" defaultValue="John" />
</form>

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(formRef.current);
  const data = Object.fromEntries(formData);
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Individual Input Refs</h3>
        <p className="text-gray-700 mb-4">
          Use refs on individual inputs to access their values directly.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <form onSubmit={handleInputRefsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name:</label>
              <input
                ref={nameRef}
                type="text"
                defaultValue="Jane Doe"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email:</label>
              <input
                ref={emailRef}
                type="email"
                defaultValue="jane@example.com"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit (Input Refs)
            </button>
          </form>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const nameRef = useRef(null);
const emailRef = useRef(null);

<input ref={nameRef} defaultValue="John" />
<input ref={emailRef} defaultValue="john@example.com" />

// Access values
const name = nameRef.current.value;
const email = emailRef.current.value;`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">FormData API</h3>
        <p className="text-gray-700 mb-4">
          FormData API provides a way to construct key/value pairs representing form fields.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="space-y-4 mb-4">
            <form onSubmit={handleFileFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue="Test User"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">File:</label>
                <input
                  type="file"
                  name="file"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Submit with File
              </button>
            </form>

            <div className="space-y-2">
              <button
                onClick={handleAppendSubmit}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Demo FormData.append()
              </button>
              <button
                onClick={handleFormDataMethods}
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
              >
                Demo FormData Methods
              </button>
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Create FormData from form
const formData = new FormData(form);

// Or create empty and append
const formData = new FormData();
formData.append('name', 'John');
formData.append('email', 'john@example.com');

// Access values
const name = formData.get('name');
const allEntries = Array.from(formData.entries());

// Methods
formData.has('name');        // true
formData.get('name');        // 'John'
formData.getAll('tags');     // ['react', 'js']
formData.delete('email');    // Remove field
formData.set('name', 'Jane'); // Set/update value`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Native Form Handling</h3>
        <p className="text-gray-700 mb-4">
          Use native form submission with FormData API.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <form onSubmit={handleNativeSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name:</label>
              <input
                type="text"
                name="name"
                defaultValue="Native Form"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Message:</label>
              <textarea
                name="message"
                defaultValue="This is a native form"
                rows={3}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Submit (Native)
            </button>
          </form>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Send to server
  fetch('/api/submit', {
    method: 'POST',
    body: formData  // Can send FormData directly!
  });
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">FormData API Methods</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Method</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2"><code>append(name, value)</code></td>
                <td className="p-2">Append a new value to existing key or create new</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>set(name, value)</code></td>
                <td className="p-2">Set value (replaces existing)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>get(name)</code></td>
                <td className="p-2">Get first value for key</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>getAll(name)</code></td>
                <td className="p-2">Get all values for key</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>has(name)</code></td>
                <td className="p-2">Check if key exists</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>delete(name)</code></td>
                <td className="p-2">Delete key and all its values</td>
              </tr>
              <tr>
                <td className="p-2"><code>entries()</code></td>
                <td className="p-2">Iterator of all key/value pairs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Sending FormData to Server</h3>
        <p className="text-gray-700 mb-4">
          FormData can be sent directly to servers via fetch or XMLHttpRequest.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Send FormData with fetch
const formData = new FormData(form);

fetch('/api/upload', {
  method: 'POST',
  body: formData  // No need to set Content-Type header!
});

// With file
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('name', 'John');

fetch('/api/upload', {
  method: 'POST',
  body: formData
});

// Convert to JSON (if needed)
const data = Object.fromEntries(formData);
fetch('/api/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Result Preview</h3>
        {result && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Method: {result.method}</p>
            <pre className="text-sm bg-white p-2 rounded overflow-auto">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">When to Use Uncontrolled Forms</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Good Use Cases:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Simple forms with minimal validation</li>
            <li>File uploads (always uncontrolled)</li>
            <li>Forms that don't need real-time validation</li>
            <li>Performance-critical forms (fewer re-renders)</li>
            <li>Integrating with non-React libraries</li>
            <li>Native form submission</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">Consider Controlled For:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Forms requiring real-time validation</li>
            <li>Dynamic form behavior based on input</li>
            <li>Complex form logic</li>
            <li>Form libraries integration</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default UncontrolledForms;

