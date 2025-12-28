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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Using generic div elements with onClick handlers creates accessibility issues. Screen readers don't recognize divs as interactive elements. Users can't navigate to them with keyboard. No semantic meaning - screen reader users don't know it's a button. Headers should use {'<'}header{'>'} not {'<'}div{'>'} for proper document structure. Semantic HTML provides meaning and enables assistive technologies to understand and navigate content properly.</p>
            </div>
            <pre className="bg-gray-800 text-red-400 p-4 rounded overflow-x-auto text-sm">
{`<div onClick={handleClick}>Button</div>
<div>Header</div>`}
            </pre>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Good:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Semantic HTML elements provide meaning and built-in accessibility. {'<'}button{'>'} is recognized as interactive, keyboard accessible, and announced by screen readers. {'<'}header{'>'}, {'<'}nav{'>'}, {'<'}main{'>'}, {'<'}footer{'>'} create document landmarks that screen readers use for navigation. Semantic elements have default keyboard behavior and ARIA roles. They communicate structure and purpose to assistive technologies. Always prefer semantic HTML over generic divs.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> ARIA (Accessible Rich Internet Applications) attributes enhance accessibility when semantic HTML isn't enough. role defines what an element is (button, alert). aria-label provides accessible name when text isn't visible. aria-labelledby references element ID that labels this element. aria-pressed indicates toggle button state. aria-required indicates required form fields. aria-hidden hides decorative content from screen readers. aria-live regions announce dynamic content changes (polite=wait, assertive=interrupt). Use ARIA to supplement, not replace, semantic HTML.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Keyboard accessibility is crucial for users who can't use a mouse. onKeyDown handler detects keyboard interactions. Enter and Space activate buttons/links. Escape closes modals/dialogs. tabIndex={0} makes element keyboard focusable. role="button" indicates interactive element to screen readers. Always provide keyboard alternatives to mouse interactions. Handle both onClick and onKeyDown for custom interactive elements. This ensures all users can interact with your interface regardless of input method.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Focus management is critical for modals and dynamic content. useRef creates reference to modal element. useEffect focuses modal when it opens (isOpen becomes true). modalRef.current?.focus() moves focus to modal. tabIndex={-1} makes element programmatically focusable but not tab-focusable. role="dialog" identifies modal to screen readers. Focus should move to modal when it opens, and return to trigger when it closes. This prevents keyboard users from getting lost in the page content.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Accessible forms require proper labeling and error association. htmlFor/id creates explicit label-input association for screen readers. aria-required indicates required fields. aria-describedby links input to error message, so screen readers announce errors. aria-invalid indicates validation state. role="alert" makes errors immediately announced. Error messages should be associated with inputs so screen reader users understand what's wrong. Submit button should be clearly labeled. This ensures form errors are communicated effectively to all users.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Accessible modals require focus management, ARIA attributes, and keyboard handling. previousFocusRef stores element that triggered modal. When modal opens, focus moves to modal. When modal closes, focus returns to trigger element. aria-modal="true" indicates modal blocks interaction with background. aria-labelledby references modal title. Escape key closes modal (onKeyDown handler). Focus trap (keep focus within modal) should be implemented. Background should be hidden from screen readers (aria-hidden). This creates an accessible modal experience.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Alt text provides textual description of images for screen readers. Informative images (charts, diagrams) need descriptive alt text explaining the content. Decorative images should have empty alt="" so screen readers skip them. Complex images (detailed diagrams) need longer descriptions via aria-describedby linking to detailed text. Alt text should be concise but descriptive. Don't include "image of" - screen readers announce that. Good alt text conveys the same information the image provides visually.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Live regions announce dynamic content changes to screen reader users. aria-live="polite" waits for user to finish before announcing (for status updates). aria-live="assertive" interrupts immediately (for errors). aria-atomic="true" announces entire region when any part changes. role="status" is equivalent to aria-live="polite". Use live regions for dynamic content like form submission status, search results, or error messages. This ensures screen reader users are notified of important changes without refreshing the page.</p>
            </div>
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

