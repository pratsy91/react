function WebComponents() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Web Components</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Web Components Support</h3>
        <p className="text-gray-700 mb-4">
          React 19 improves support for Web Components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Web Components Support
// React 19 better supports Web Components

// Basic Usage
function App() {
  return (
    <div>
      <custom-button label="Click me" />
      <custom-input value="Hello" />
    </div>
  );
}

// Custom Elements
// React treats custom elements as regular elements
function App() {
  return (
    <div>
      <my-custom-element prop="value">
        Content
      </my-custom-element>
    </div>
  );
}

// Attributes vs Properties
// React passes attributes to custom elements
function App() {
  return (
    <custom-input
      value="Hello"
      disabled={true}
      data-custom="value"
    />
  );
}

// Event Handling
// React handles custom events
function App() {
  const handleCustomEvent = (e) => {
    console.log('Custom event:', e.detail);
  };
  
  return (
    <custom-element onCustomEvent={handleCustomEvent} />
  );
}

// Ref Support
function App() {
  const ref = useRef();
  
  useEffect(() => {
    if (ref.current) {
      // Access custom element methods
      ref.current.customMethod();
    }
  }, []);
  
  return <custom-element ref={ref} />;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Elements</h3>
        <p className="text-gray-700 mb-4">
          Using custom elements in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Custom Elements
// React supports custom HTML elements

// Basic Custom Element
function App() {
  return (
    <div>
      <custom-button>Click</custom-button>
    </div>
  );
}

// Custom Element with Props
function App() {
  return (
    <custom-input
      value="Hello"
      placeholder="Enter text"
      required
    />
  );
}

// Custom Element with Children
function App() {
  return (
    <custom-card>
      <h2>Title</h2>
      <p>Content</p>
    </custom-card>
  );
}

// Custom Element Registration
// Register custom element before using
if (typeof window !== 'undefined') {
  customElements.define('custom-button', CustomButton);
}

// React Component Wrapper
function CustomButtonWrapper({ label, onClick }) {
  return (
    <custom-button
      label={label}
      onCustomClick={onClick}
    />
  );
}

// TypeScript Support
// Type custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'custom-button': {
        label?: string;
        onClick?: () => void;
        children?: React.ReactNode;
      };
    }
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Shadow DOM</h3>
        <p className="text-gray-700 mb-4">
          Working with Shadow DOM in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Shadow DOM
// React works with Shadow DOM

// Custom Element with Shadow DOM
class CustomElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<div>Shadow content</div>';
  }
}

// React Rendering into Shadow DOM
function App() {
  const shadowRef = useRef();
  
  useEffect(() => {
    if (shadowRef.current) {
      const shadow = shadowRef.current.attachShadow({ mode: 'open' });
      const root = createRoot(shadow);
      root.render(<ReactContent />);
    }
  }, []);
  
  return <div ref={shadowRef} />;
}

// Shadow DOM Isolation
// Styles in Shadow DOM are isolated
function ShadowComponent() {
  return (
    <custom-element>
      <style>
        {'/* Styles are scoped to shadow DOM */'}
      </style>
      <div>Content</div>
    </custom-element>
  );
}

// Event Handling in Shadow DOM
function App() {
  const handleEvent = (e) => {
    // Handle event from shadow DOM
    console.log('Event:', e);
  };
  
  return (
    <custom-element onCustomEvent={handleEvent} />
  );
}

// React Portal to Shadow DOM
function App() {
  const shadowRef = useRef();
  const [shadowRoot, setShadowRoot] = useState(null);
  
  useEffect(() => {
    if (shadowRef.current && !shadowRoot) {
      const shadow = shadowRef.current.attachShadow({ mode: 'open' });
      setShadowRoot(shadow);
    }
  }, [shadowRoot]);
  
  return (
    <>
      <div ref={shadowRef} />
      {shadowRoot && createPortal(<Content />, shadowRoot)}
    </>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Integration Patterns</h3>
        <p className="text-gray-700 mb-4">
          Patterns for integrating Web Components with React.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Integration Patterns
// Patterns for Web Components + React

// Wrapper Component
function WebComponentWrapper({ component, props, children }) {
  const ref = useRef();
  
  useEffect(() => {
    if (ref.current) {
      // Set properties
      Object.entries(props).forEach(([key, value]) => {
        ref.current[key] = value;
      });
    }
  }, [props]);
  
  return React.createElement(component, { ref }, children);
}

// Usage
function App() {
  return (
    <WebComponentWrapper
      component="custom-button"
      props={{ label: 'Click', disabled: false }}
    >
      Content
    </WebComponentWrapper>
  );
}

// Custom Hook
function useWebComponent(ref, props) {
  useEffect(() => {
    if (ref.current) {
      Object.entries(props).forEach(([key, value]) => {
        ref.current[key] = value;
      });
    }
  }, [ref, props]);
}

// Usage
function App() {
  const ref = useRef();
  useWebComponent(ref, { label: 'Click' });
  
  return <custom-button ref={ref} />;
}

// Event Adapter
function useWebComponentEvent(ref, eventName, handler) {
  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener(eventName, handler);
      return () => element.removeEventListener(eventName, handler);
    }
  }, [ref, eventName, handler]);
}

// Usage
function App() {
  const ref = useRef();
  useWebComponentEvent(ref, 'customEvent', (e) => {
    console.log('Event:', e.detail);
  });
  
  return <custom-element ref={ref} />;
}

// Higher-Order Component
function withWebComponent(Component, webComponentName) {
  return function WrappedComponent(props) {
    const ref = useRef();
    
    useEffect(() => {
      if (ref.current) {
        Object.entries(props).forEach(([key, value]) => {
          ref.current[key] = value;
        });
      }
    }, [props]);
    
    return React.createElement(webComponentName, { ref });
  };
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Event Handling</h3>
        <p className="text-gray-700 mb-4">
          Handling events from Web Components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Event Handling
// Handle events from Web Components

// Custom Events
function App() {
  const handleCustomEvent = (e) => {
    console.log('Custom event:', e.detail);
  };
  
  return (
    <custom-element onCustomEvent={handleCustomEvent} />
  );
}

// Event with Detail
function App() {
  const handleEvent = (e) => {
    const { data } = e.detail;
    console.log('Data:', data);
  };
  
  return (
    <custom-element onDataEvent={handleEvent} />
  );
}

// Multiple Events
function App() {
  const handleClick = (e) => console.log('Click');
  const handleChange = (e) => console.log('Change');
  
  return (
    <custom-input
      onCustomClick={handleClick}
      onCustomChange={handleChange}
    />
  );
}

// Event with useRef
function App() {
  const ref = useRef();
  
  useEffect(() => {
    const element = ref.current;
    if (element) {
      const handler = (e) => console.log('Event:', e);
      element.addEventListener('customEvent', handler);
      return () => element.removeEventListener('customEvent', handler);
    }
  }, []);
  
  return <custom-element ref={ref} />;
}

// Event Delegation
function App() {
  const containerRef = useRef();
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handler = (e) => {
        if (e.target.tagName === 'CUSTOM-BUTTON') {
          console.log('Button clicked');
        }
      };
      container.addEventListener('click', handler);
      return () => container.removeEventListener('click', handler);
    }
  }, []);
  
  return (
    <div ref={containerRef}>
      <custom-button />
    </div>
  );
}

// Best Practices
// 1. Use camelCase for event handlers
// 2. Handle events in useEffect
// 3. Clean up event listeners
// 4. Use event detail for data
// 5. Type events with TypeScript`}</pre>
        </div>
      </section>
    </div>
  );
}

export default WebComponents;

