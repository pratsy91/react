import { useState } from 'react';

function ARIA() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">ARIA</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding ARIA (Accessible Rich Internet Applications)</h3>
        <p className="text-blue-800 mb-2">
          ARIA is a set of attributes that make web content and applications more accessible to people with disabilities. ARIA 
          attributes provide additional information to assistive technologies (like screen readers) about the purpose, state, and 
          behavior of UI elements. ARIA supplements HTML semantics when native HTML elements aren't sufficient.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Semantic HTML First:</strong> Use native HTML elements when possible</li>
            <li><strong>ARIA as Supplement:</strong> Use ARIA when HTML isn't sufficient</li>
            <li><strong>Roles:</strong> Define what an element is (button, dialog, etc.)</li>
            <li><strong>Properties:</strong> Describe characteristics (aria-label, aria-describedby)</li>
            <li><strong>States:</strong> Indicate current state (aria-expanded, aria-checked)</li>
            <li><strong>Live Regions:</strong> Announce dynamic content changes</li>
          </ul>
          <p className="mt-2"><strong>Common ARIA Attributes:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>aria-label:</strong> Accessible name for element</li>
            <li><strong>aria-labelledby:</strong> Reference to element that labels this</li>
            <li><strong>aria-describedby:</strong> Reference to element that describes this</li>
            <li><strong>aria-hidden:</strong> Hide decorative elements from screen readers</li>
            <li><strong>aria-live:</strong> Announce dynamic content changes</li>
            <li><strong>aria-expanded:</strong> State of expandable content</li>
          </ul>
          <p className="mt-2"><strong>Best Practices:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Prefer semantic HTML over ARIA when possible</li>
            <li>Don't use ARIA to fix bad HTML</li>
            <li>Test with screen readers</li>
            <li>Keep ARIA attributes up to date with component state</li>
            <li>Use aria-live regions for dynamic content</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">ARIA Attributes</h3>
        <p className="text-gray-700 mb-4">
          Use ARIA attributes to make components accessible.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// aria-label - Label for screen readers
<button aria-label="Close dialog">×</button>

// aria-labelledby - Reference to labeling element
<div id="username-label">Username</div>
<input aria-labelledby="username-label" />

// aria-describedby - Additional description
<input 
  aria-describedby="username-help"
  aria-invalid="true"
/>
<span id="username-help">Username must be at least 3 characters</span>

// aria-hidden - Hide from screen readers
<div aria-hidden="true">Decorative icon</div>

// aria-live - Live region announcements
<div aria-live="polite" aria-atomic="true">
  {message}
</div>

// aria-live values
// "off" - No announcements
// "polite" - Wait for pause
// "assertive" - Interrupt immediately

// aria-atomic - Announce entire region
<div aria-live="polite" aria-atomic="true">
  {count} items
</div>

// aria-busy - Indicate loading state
<div aria-busy="true">Loading...</div>

// aria-expanded - Expandable content
<button 
  aria-expanded={isOpen}
  aria-controls="menu"
>
  Menu
</button>
<div id="menu" hidden={!isOpen}>Content</div>

// aria-controls - Related element
<button aria-controls="menu">Toggle</button>
<div id="menu">Content</div>

// aria-haspopup - Has popup
<button aria-haspopup="menu">Options</button>

// aria-current - Current item
<nav>
  <a href="/" aria-current="page">Home</a>
  <a href="/about">About</a>
</nav>

// aria-selected - Selected state
<div role="tablist">
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab" aria-selected="false">Tab 2</button>
</div>

// aria-checked - Checkbox/radio state
<div role="checkbox" aria-checked="true">Option</div>

// aria-disabled - Disabled state
<button aria-disabled="true">Disabled</button>

// aria-required - Required field
<input aria-required="true" />

// aria-invalid - Invalid input
<input aria-invalid="true" aria-describedby="error" />

// aria-valuemin, aria-valuemax, aria-valuenow - Range values
<div
  role="slider"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
/>

// aria-orientation - Orientation
<div role="slider" aria-orientation="vertical" />

// aria-sort - Sortable table
<th aria-sort="ascending">Name</th>

// aria-level - Heading level
<div role="heading" aria-level="2">Subheading</div>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Semantic HTML</h3>
        <p className="text-gray-700 mb-4">
          Use semantic HTML elements for better accessibility.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Semantic elements
<header>Header content</header>
<nav>Navigation</nav>
<main>Main content</main>
<article>Article content</article>
<section>Section content</section>
<aside>Sidebar content</aside>
<footer>Footer content</footer>

// Headings hierarchy
<h1>Main title</h1>
  <h2>Section title</h2>
    <h3>Subsection title</h3>

// Lists
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>First</li>
  <li>Second</li>
</ol>

// Forms
<form>
  <label htmlFor="email">Email</label>
  <input type="email" id="email" name="email" />
  <button type="submit">Submit</button>
</form>

// Buttons vs links
// Use button for actions
<button onClick={handleClick}>Click me</button>

// Use link for navigation
<a href="/page">Go to page</a>

// Landmarks
<main role="main">
  <article role="article">
    <section role="region" aria-label="Introduction">
      Content
    </section>
  </article>
</main>

// Landmark roles
// main, navigation, banner, contentinfo, complementary, search`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Keyboard Navigation</h3>
        <p className="text-gray-700 mb-4">
          Ensure all interactive elements are keyboard accessible.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Tab order
// Elements with tabindex="0" are in tab order
<button tabIndex={0}>Focusable</button>

// tabindex="-1" - Programmatically focusable
<div tabIndex={-1} ref={ref}>Focusable via ref</div>

// tabindex="0" - In natural tab order
<button tabIndex={0}>In tab order</button>

// Keyboard event handlers
function Component() {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
  
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      Click me
    </div>
  );
}

// Arrow key navigation
function List() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => Math.min(prev + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    }
  };
  
  return (
    <ul onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <li
          key={index}
          tabIndex={index === focusedIndex ? 0 : -1}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

// Escape key
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [onClose]);

// Focus trap
function Modal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleTab = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      firstElement?.focus();
      modalRef.current.addEventListener('keydown', handleTab);
      
      return () => {
        modalRef.current?.removeEventListener('keydown', handleTab);
      };
    }
  }, [isOpen]);
  
  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Screen Reader Testing</h3>
        <p className="text-gray-700 mb-4">
          Test your components with screen readers.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Screen readers
// - NVDA (Windows, free)
// - JAWS (Windows, paid)
// - VoiceOver (macOS/iOS, built-in)
// - TalkBack (Android, built-in)

// Testing checklist
// 1. All images have alt text
<img src="logo.png" alt="Company logo" />

// 2. Form labels are associated
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// 3. Buttons have descriptive text
<button>Submit form</button> // Good
<button>Click</button> // Bad

// 4. Headings are in order
<h1>Title</h1>
<h2>Section</h2> // Good
<h1>Title</h1>
<h3>Section</h3> // Bad (skipped h2)

// 5. Links have descriptive text
<a href="/about">Learn more about us</a> // Good
<a href="/about">Click here</a> // Bad

// 6. Interactive elements are keyboard accessible
// Test with Tab key

// 7. Focus indicators are visible
button:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}

// 8. ARIA labels are used when needed
<button aria-label="Close dialog">×</button>

// Screen reader only content
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

<span className="sr-only">Loading content</span>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Focus Management</h3>
        <p className="text-gray-700 mb-4">
          Manage focus for better accessibility.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Focus management hook
import { useEffect, useRef } from 'react';

function useFocusOnMount() {
  const ref = useRef(null);
  
  useEffect(() => {
    ref.current?.focus();
  }, []);
  
  return ref;
}

// Usage
function Modal() {
  const modalRef = useFocusOnMount();
  
  return (
    <div ref={modalRef} tabIndex={-1}>
      Content
    </div>
  );
}

// Return focus on close
function useReturnFocus() {
  const previousFocusRef = useRef(null);
  
  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    
    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);
}

// Focus trap hook
function useFocusTrap(isActive) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!isActive) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    firstElement?.focus();
    container.addEventListener('keydown', handleTab);
    
    return () => {
      container.removeEventListener('keydown', handleTab);
    };
  }, [isActive]);
  
  return containerRef;
}

// Skip link
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Live Regions</h3>
        <p className="text-gray-700 mb-4">
          Announce dynamic content changes to screen readers.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Live region for announcements
<div aria-live="polite" aria-atomic="true">
  {announcement}
</div>

// aria-live values
// "off" - No announcements (default)
// "polite" - Wait for pause
// "assertive" - Interrupt immediately

// aria-atomic
// true - Announce entire region
// false - Announce only changed parts

// Status announcements
function StatusMessage({ message }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}

// Alert announcements
function AlertMessage({ message }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}

// Log region
<div
  role="log"
  aria-live="polite"
  aria-label="Activity log"
>
  {logEntries.map(entry => (
    <div key={entry.id}>{entry.message}</div>
  ))}
</div>

// Timer announcements
function Timer({ seconds }) {
  return (
    <div
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      {seconds} seconds remaining
    </div>
  );
}

// Progress announcements
function Progress({ value, max }) {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={\`Progress: \${percentage}%\`}
    >
      {percentage}%
    </div>
  );
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ARIA;

