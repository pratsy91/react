import { useRef, useState, forwardRef, useImperativeHandle } from 'react';

function UseRefHook() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const renderCountRef = useRef(0);
  const previousCountRef = useRef();

  // Track renders without causing re-renders
  renderCountRef.current += 1;

  // Store previous value
  previousCountRef.current = count;

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useRef Hook</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding useRef</h3>
        <p className="text-blue-800 mb-2">
          useRef returns a mutable ref object whose .current property is initialized to the passed argument. The returned 
          object will persist for the full lifetime of the component. Unlike useState, changing a ref's current value doesn't 
          trigger a re-render.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Characteristics:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Persists Across Renders:</strong> Ref values persist between renders</li>
            <li><strong>No Re-renders:</strong> Changing .current doesn't cause re-renders</li>
            <li><strong>Mutable:</strong> You can mutate .current directly</li>
            <li><strong>Two Main Uses:</strong> DOM references and storing mutable values</li>
            <li><strong>Initial Value:</strong> Passed as argument to useRef()</li>
          </ul>
          <p className="mt-2"><strong>Common Use Cases:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Accessing DOM elements (focus, scroll, measurements)</li>
            <li>Storing mutable values that don't need to trigger re-renders</li>
            <li>Storing previous values or timers/intervals</li>
            <li>Imperative access to child components (with forwardRef)</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">DOM References</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Accessing DOM Elements</h4>
          <p className="text-gray-700 mb-3">
            The most common use of useRef is to access DOM elements. By attaching a ref to a JSX element, you can get direct 
            access to the underlying DOM node. This is useful for focusing inputs, scrolling to elements, measuring sizes, 
            or integrating with third-party DOM libraries.
          </p>
          <p className="text-gray-700">
            <strong>Important:</strong> Use refs for DOM access only when necessary. React's declarative model should be 
            preferred for most use cases.
          </p>
        </div>
        <p className="text-gray-700 mb-4">
          useRef provides a way to access DOM elements directly.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Click button to focus"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <button
              onClick={focusInput}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Focus Input
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const inputRef = useRef(null);

<input ref={inputRef} />
<button onClick={() => inputRef.current?.focus()}>
  Focus
</button>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Mutable Values That Persist</h3>
        <p className="text-gray-700 mb-4">
          useRef can store mutable values that persist across renders without causing re-renders.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Count: {count}</p>
            <p className="text-sm text-gray-600 mb-2">
              Component has rendered: {renderCountRef.current} times
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Previous count: {previousCountRef.current ?? 'N/A'}
            </p>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Increment (Notice render count increases)
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const renderCountRef = useRef(0);

// This doesn't cause re-render!
renderCountRef.current += 1;

// Store previous value
const prevValueRef = useRef();
prevValueRef.current = currentValue;`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Ref Forwarding with forwardRef</h3>
        <p className="text-gray-700 mb-4">
          forwardRef allows components to receive refs and pass them to child elements.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ForwardedInputExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Parent can now pass ref
const inputRef = useRef();
<Input ref={inputRef} />`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useImperativeHandle</h3>
        <p className="text-gray-700 mb-4">
          useImperativeHandle customizes the instance value exposed when using ref.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ImperativeHandleExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
  }));

  return <input ref={inputRef} {...props} />;
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Callback Refs</h3>
        <p className="text-gray-700 mb-4">
          Instead of a ref object, you can pass a function that receives the DOM element.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <CallbackRefExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const [element, setElement] = useState(null);

const callbackRef = (node) => {
  if (node) {
    setElement(node);
    node.focus(); // Auto-focus when mounted
  }
};

<input ref={callbackRef} />`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Differences</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">useRef</th>
                <th className="text-left p-2">useState</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Re-renders</td>
                <td className="p-2">No</td>
                <td className="p-2">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Mutable</td>
                <td className="p-2">Yes</td>
                <td className="p-2">No (immutable)</td>
              </tr>
              <tr>
                <td className="p-2">Use Case</td>
                <td className="p-2">DOM access, persistent values</td>
                <td className="p-2">UI state</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// ForwardRef Example Component
function ForwardedInputExample() {
  const inputRef = useRef(null);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Forwarded input"
        className="w-full px-3 py-2 border rounded mb-2"
      />
      <button
        onClick={() => inputRef.current?.focus()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Focus Forwarded Input
      </button>
    </div>
  );
}

// ImperativeHandle Example
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }));

  return (
    <input
      ref={inputRef}
      {...props}
      className="w-full px-3 py-2 border rounded"
    />
  );
});

function ImperativeHandleExample() {
  const fancyInputRef = useRef(null);

  return (
    <div>
      <FancyInput ref={fancyInputRef} placeholder="Fancy input with custom methods" />
      <div className="mt-2 space-x-2">
        <button
          onClick={() => fancyInputRef.current?.focus()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Focus
        </button>
        <button
          onClick={() => fancyInputRef.current?.clear()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

// Callback Ref Example
function CallbackRefExample() {
  const [element, setElement] = useState(null);

  const callbackRef = (node) => {
    if (node) {
      setElement(node);
      node.focus();
    }
  };

  return (
    <div>
      <input
        ref={callbackRef}
        type="text"
        placeholder="Auto-focused with callback ref"
        className="w-full px-3 py-2 border rounded mb-2"
      />
      <p className="text-sm text-gray-600">
        Element tag: {element?.tagName || 'Not set'}
      </p>
    </div>
  );
}

export default UseRefHook;

