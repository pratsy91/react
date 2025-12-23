function InterviewAccessibility() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility (a11y) - Interview Cheatsheet</h2>
        <p className="text-gray-700">Making React applications accessible</p>
      </div>

      {/* Semantic HTML */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Semantic HTML</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Bad:</p>
            <pre className="bg-gray-800 text-red-400 p-4 rounded overflow-x-auto text-sm">
{`<div onClick={handleClick}>Button</div>
<div>Header</div>`}
            </pre>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Good:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`<button onClick={handleClick}>Button</button>
<header>Header</header>
<nav>Navigation</nav>
<main>Main content</main>
<footer>Footer</footer>`}
            </pre>
          </div>
        </div>
      </section>

      {/* ARIA Attributes */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">ARIA Attributes</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Common ARIA Attributes:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Roles
<div role="button" tabIndex={0}>Custom Button</div>
<div role="alert">Error message</div>

// Labels
<button aria-label="Close dialog">×</button>
<input aria-labelledby="email-label" />

// States
<button aria-pressed={isPressed}>Toggle</button>
<input aria-required={true} />
<div aria-hidden={true}>Hidden from screen readers</div>

// Live regions
<div aria-live="polite">{announcement}</div>
<div aria-live="assertive">{urgent}</div>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Keyboard Navigation */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Keyboard Navigation</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Keyboard Events:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component() {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
    if (e.key === 'Escape') {
      handleClose();
    }
  };
  
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleAction}
    >
      Click or press Enter
    </div>
  );
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Focus Management:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Modal({ isOpen, onClose }) {
  const modalRef = useRef();
  
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);
  
  return isOpen ? (
    <div role="dialog" ref={modalRef} tabIndex={-1}>
      {/* Modal content */}
    </div>
  ) : null;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Screen Reader Compatibility */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Screen Reader Compatibility</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Use semantic HTML elements</li>
              <li>Provide text alternatives for images</li>
              <li>Use ARIA labels when semantic HTML isn't enough</li>
              <li>Ensure all interactive elements are keyboard accessible</li>
              <li>Test with screen readers (NVDA, JAWS, VoiceOver)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessible Forms */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Accessible Forms</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`<form>
  <label htmlFor="email">Email</label>
  <input 
    id="email"
    type="email"
    aria-required={true}
    aria-describedby="email-error"
  />
  <span id="email-error" role="alert">
    {error}
  </span>
  
  <button type="submit">Submit</button>
</form>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Accessible Modals and Dialogs */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Accessible Modals and Dialogs</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Modal Implementation:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef();
  const previousFocusRef = useRef();
  
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);
  
  return isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Color Contrast */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Color Contrast Requirements</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">WCAG Standards:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>Level AA:</strong> 4.5:1 for normal text, 3:1 for large text</li>
              <li><strong>Level AAA:</strong> 7:1 for normal text, 4.5:1 for large text</li>
              <li>Don't rely on color alone to convey information</li>
              <li>Use tools like WebAIM Contrast Checker</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Alt Text for Images */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Alt Text for Images</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Informative image
<img src="chart.png" alt="Sales increased by 25% in Q3" />

// Decorative image
<img src="decoration.png" alt="" />

// Complex image (provide longer description)
<img 
  src="diagram.png" 
  alt="Architecture diagram"
  aria-describedby="diagram-description"
/>
<p id="diagram-description">
  The diagram shows three layers: frontend, API, database
</p>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Live Regions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Live Regions and Announcements</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Usage:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Polite announcement (waits for user to finish)
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Assertive announcement (interrupts)
<div aria-live="assertive" aria-atomic="true">
  {errorMessage}
</div>

// Status updates
function Form() {
  const [status, setStatus] = useState('');
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* form fields */}
      </form>
      <div role="status" aria-live="polite">
        {status}
      </div>
    </>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Testing Accessibility */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Testing Accessibility</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Testing Tools:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>axe DevTools:</strong> Browser extension for accessibility testing</li>
              <li><strong>Lighthouse:</strong> Built-in Chrome tool</li>
              <li><strong>WAVE:</strong> Web accessibility evaluation tool</li>
              <li><strong>Screen readers:</strong> NVDA, JAWS, VoiceOver</li>
              <li><strong>Keyboard navigation:</strong> Test with Tab, Enter, Space, Arrow keys</li>
              <li><strong>@testing-library:</strong> Accessible queries by default</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you make a React app accessible?</p>
            <p className="text-gray-700">A: Use semantic HTML, proper ARIA attributes, keyboard navigation, focus management, proper form labels, and test with screen readers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewAccessibility;

