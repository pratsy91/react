import { useState } from 'react';
import { createPortal } from 'react-dom';

// Simple Modal using Portal
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modal Title</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

// Tooltip using Portal
function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="underline cursor-help"
      >
        {children}
      </span>
      {isVisible && createPortal(
        <div
          className="fixed bg-gray-800 text-white px-2 py-1 rounded text-sm z-50 pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>,
        document.body
      )}
    </>
  );
}

function Portal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = () => {
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Portal</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding React Portals</h3>
        <p className="text-blue-800 mb-2">
          Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. 
          This is useful for components like modals, tooltips, dropdowns, and popovers that need to render above other content 
          without being constrained by parent component styles (like overflow: hidden or z-index stacking contexts).
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>DOM Hierarchy:</strong> Renders outside parent's DOM tree but maintains React component hierarchy</li>
            <li><strong>Event Bubbling:</strong> Events from portals bubble through React tree, not DOM tree</li>
            <li><strong>createPortal:</strong> React function to create a portal (import from 'react-dom')</li>
            <li><strong>Target Node:</strong> Portal renders into a specific DOM node (usually document.body)</li>
            <li><strong>Styling:</strong> Useful for components that need to escape parent CSS constraints</li>
          </ul>
          <p className="mt-2"><strong>Common Use Cases:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Modal dialogs and overlays</li>
            <li>Tooltips and popovers</li>
            <li>Dropdown menus</li>
            <li>Toast notifications</li>
            <li>Any component that needs to render on top of other content</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Escape parent CSS constraints (overflow, z-index, etc.)</li>
            <li>Better positioning for overlays</li>
            <li>Maintains React event handling and context</li>
            <li>Cleaner DOM structure for modals and overlays</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">createPortal</h3>
        <p className="text-gray-700 mb-4">
          Portals allow you to render children into a DOM node that exists outside the parent component's DOM hierarchy.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open Modal (Rendered via Portal)
          </button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <p className="text-gray-700 mb-4">
              This modal is rendered outside the normal component tree using createPortal!
            </p>
            <p className="text-sm text-gray-600">
              Check the DOM - it's rendered directly in document.body, not inside the parent component.
            </p>
          </Modal>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.body  // Render outside parent
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Rendering Outside Parent</h3>
        <p className="text-gray-700 mb-4">
          Portals are useful for modals, tooltips, and other overlays that need to escape parent constraints.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="p-4 bg-white rounded border-2 border-dashed mb-4">
            <p className="text-sm text-gray-700 mb-2">
              This container has <code className="bg-gray-200 px-1 rounded">overflow: hidden</code>
            </p>
            <Tooltip content="This tooltip escapes the container using a portal!">
              Hover over this text
            </Tooltip>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Tooltip rendered outside parent
function Tooltip({ children, content }) {
  return createPortal(
    <div className="tooltip">{content}</div>,
    document.body
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Modal and Tooltip Patterns</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4 mb-4">
            <div>
              <p className="text-sm font-semibold mb-2">Toast Notification:</p>
              <button
                onClick={showToast}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Show Toast
              </button>
              {isToastVisible && createPortal(
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
                  Toast notification via portal!
                </div>,
                document.body
              )}
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Toast pattern
function Toast({ message, isVisible }) {
  if (!isVisible) return null;
  
  return createPortal(
    <div className="fixed top-4 right-4">
      {message}
    </div>,
    document.body
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Event Bubbling Through Portals</h3>
        <p className="text-gray-700 mb-4">
          Events fired inside a portal bubble up through the React component tree, not the DOM tree.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <EventBubblingExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// Event bubbles through React tree, not DOM tree
function Parent() {
  const handleClick = () => console.log('Parent clicked');
  
  return (
    <div onClick={handleClick}>
      <Modal />  {/* Portal to document.body */}
    </div>
  );
}

// Clicking inside Modal still triggers Parent's onClick!`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Use Cases</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">✓ Perfect For:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>Modals and dialogs</li>
            <li>Tooltips and popovers</li>
            <li>Dropdown menus</li>
            <li>Toast notifications</li>
            <li>Loading overlays</li>
            <li>Any UI that needs to escape parent constraints</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// Event Bubbling Example
function EventBubblingExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleParentClick = () => {
    alert('Parent component clicked! (Event bubbled through React tree)');
  };

  return (
    <div onClick={handleParentClick} className="p-4 bg-blue-50 rounded">
      <p className="text-sm text-gray-700 mb-2">
        Click the button in the portal - event bubbles to this parent!
      </p>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Portal
      </button>
      {isOpen && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded">
            <p className="mb-4">This is rendered via portal</p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close (Click me - event bubbles to parent!)
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Portal;

