import { useState } from 'react';

function EventHandling() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [keyPressed, setKeyPressed] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (e) => {
    setClickCount(prev => prev + 1);
    console.log('Click event:', e);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents form submission
    alert('Form submitted!');
  };

  const handleLinkClick = (e) => {
    e.preventDefault(); // Prevents navigation
    e.stopPropagation(); // Stops event bubbling
    alert('Link clicked but navigation prevented!');
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleKeyDown = (e) => {
    setKeyPressed(e.key);
    if (e.key === 'Enter') {
      console.log('Enter key pressed!');
    }
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleFocus = () => {
    console.log('Input focused');
  };

  const handleBlur = () => {
    console.log('Input blurred');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Event Handling</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Synthetic Events</h3>
        <p className="text-gray-700 mb-4">
          React wraps native events in SyntheticEvent objects for cross-browser compatibility.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Click Me (Count: {clickCount})
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Check console to see the event object structure
          </p>
          <pre className="text-sm bg-white p-2 rounded mt-2">{`function handleClick(e) {
  console.log('Event:', e);
  // e.target, e.currentTarget, e.type, etc.
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">onClick Event</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <button
            onClick={() => alert('Button clicked!')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Simple Click Handler
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">onChange Event</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Type your name"
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <p className="text-sm text-gray-600">Value: {formData.name || '(empty)'}</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">onSubmit Event</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter message"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit Form
            </button>
          </form>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">onFocus and onBlur Events</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <input
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Focus and blur this input"
            className="w-full px-3 py-2 border rounded"
          />
          <p className="text-sm text-gray-600 mt-2">Check console for focus/blur events</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">preventDefault and stopPropagation</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <a
              href="https://react.dev"
              onClick={handleLinkClick}
              className="text-blue-600 hover:underline"
            >
              Click this link (navigation prevented)
            </a>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const handleLinkClick = (e) => {
  e.preventDefault(); // Prevents default action (navigation)
  e.stopPropagation(); // Stops event from bubbling up
  // Your custom logic here
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Keyboard Events</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="Press any key"
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <p className="text-sm text-gray-600">
            Last key pressed: <strong>{keyPressed || 'None'}</strong>
          </p>
          <pre className="text-sm bg-white p-2 rounded mt-2">{`const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    // Handle Enter key
  }
  // e.key, e.code, e.ctrlKey, e.shiftKey, etc.
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Mouse Events</h3>
        <div
          onMouseMove={handleMouseMove}
          className="bg-gray-50 p-8 rounded-lg border-2 border-dashed"
        >
          <p className="text-center text-gray-700">
            Move your mouse here
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            Position: X: {mousePosition.x}, Y: {mousePosition.y}
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-700">Available mouse events:</p>
          <ul className="text-sm text-gray-600 list-disc list-inside ml-4">
            <li>onMouseDown, onMouseUp, onMouseMove</li>
            <li>onMouseEnter, onMouseLeave</li>
            <li>onMouseOver, onMouseOut</li>
            <li>onClick, onDoubleClick, onContextMenu</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Form Events</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p className="text-sm text-gray-700">Common form events:</p>
          <ul className="text-sm text-gray-600 list-disc list-inside ml-4">
            <li><code className="bg-gray-100 px-1 rounded">onChange</code> - Input value changes</li>
            <li><code className="bg-gray-100 px-1 rounded">onSubmit</code> - Form submission</li>
            <li><code className="bg-gray-100 px-1 rounded">onFocus</code> - Input receives focus</li>
            <li><code className="bg-gray-100 px-1 rounded">onBlur</code> - Input loses focus</li>
            <li><code className="bg-gray-100 px-1 rounded">onInput</code> - Input value changes (real-time)</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Event Object Properties</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Common event properties:
e.target          // Element that triggered the event
e.currentTarget   // Element the handler is attached to
e.type            // Event type ('click', 'change', etc.)
e.preventDefault() // Prevent default behavior
e.stopPropagation() // Stop event bubbling

// Keyboard events:
e.key             // Key value ('Enter', 'a', etc.)
e.code            // Physical key code
e.ctrlKey         // Boolean
e.shiftKey        // Boolean
e.altKey          // Boolean

// Mouse events:
e.clientX         // X coordinate
e.clientY         // Y coordinate
e.button          // Mouse button (0=left, 1=middle, 2=right)`}</pre>
        </div>
      </section>
    </div>
  );
}

export default EventHandling;

