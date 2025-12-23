import { useState } from 'react';

function CSSInJSPatterns() {
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState('#007bff');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">CSS-in-JS Patterns</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding CSS-in-JS Patterns</h3>
        <p className="text-blue-800 mb-2">
          CSS-in-JS is an approach where CSS is written in JavaScript files alongside components. This includes inline styles, 
          styled components, CSS modules, and other patterns that co-locate styles with components. Each pattern has different 
          trade-offs in terms of performance, developer experience, and flexibility.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>CSS-in-JS Patterns:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Inline Styles:</strong> Style objects in JSX (limited CSS features)</li>
            <li><strong>Styled Components:</strong> CSS-in-JS libraries (styled-components, Emotion)</li>
            <li><strong>CSS Modules:</strong> Scoped CSS files imported as objects</li>
            <li><strong>CSS-in-JS Libraries:</strong> Runtime or build-time CSS generation</li>
            <li><strong>Template Literals:</strong> CSS written in template strings</li>
            <li><strong>Utility CSS:</strong> Tailwind CSS, utility-first approach</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Co-location of styles and components</li>
            <li>Dynamic styling based on props/state</li>
            <li>Scoped styles prevent conflicts</li>
            <li>Better component encapsulation</li>
            <li>TypeScript support for type-safe styles</li>
            <li>Dead code elimination possible</li>
          </ul>
          <p className="mt-2"><strong>Trade-offs:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Runtime overhead (for runtime CSS-in-JS)</li>
            <li>Learning curve for teams used to CSS</li>
            <li>Bundle size considerations</li>
            <li>Debugging can be more complex</li>
            <li>Not all CSS features supported in all patterns</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Inline Styles</h3>
        <p className="text-gray-700 mb-4">
          React supports inline styles using style objects.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4 p-4 bg-white rounded">
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: color,
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'inline-block'
              }}
              onClick={() => setColor(color === '#007bff' ? '#28a745' : '#007bff')}
            >
              Click to change color
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Basic inline styles
function Button() {
  return (
    <button
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      Click me
    </button>
  );
}

// Dynamic inline styles
function Button({ primary, size }) {
  return (
    <button
      style={{
        padding: size === 'large' ? '15px 30px' : '10px 20px',
        backgroundColor: primary ? '#007bff' : '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      Click me
    </button>
  );
}

// With state
function DynamicButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      style={{
        padding: '10px 20px',
        backgroundColor: isHovered ? '#0056b3' : '#007bff',
        color: 'white',
        transition: 'background-color 0.3s'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Hover me
    </button>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Style Object Patterns</h3>
        <p className="text-gray-700 mb-4">
          Extract style objects for reusability and organization.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Extract style objects
const buttonStyles = {
  base: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  primary: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: 'white'
  },
  large: {
    padding: '15px 30px',
    fontSize: '18px'
  }
};

// Combine styles
function Button({ variant = 'primary', size, children }) {
  const styles = {
    ...buttonStyles.base,
    ...buttonStyles[variant],
    ...(size === 'large' && buttonStyles.large)
  };
  
  return <button style={styles}>{children}</button>;
}

// Style factory function
function createButtonStyles(variant, size) {
  return {
    ...buttonStyles.base,
    ...buttonStyles[variant],
    ...(size === 'large' && buttonStyles.large)
  };
}

// Usage
<button style={createButtonStyles('primary', 'large')}>
  Click me
</button>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Dynamic Styling</h3>
        <p className="text-gray-700 mb-4">
          Create dynamic styles based on props, state, or computed values.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4 p-4 bg-white rounded">
            <div className="mb-2">
              <label className="text-sm font-semibold mr-2">Active:</label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="mr-4"
              />
            </div>
            <div
              style={{
                padding: '10px',
                backgroundColor: isActive ? '#28a745' : '#dc3545',
                color: 'white',
                borderRadius: '4px',
                transition: 'background-color 0.3s',
                display: 'inline-block'
              }}
            >
              {isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Conditional styling
function StatusBadge({ isActive }) {
  return (
    <div
      style={{
        padding: '8px 16px',
        backgroundColor: isActive ? '#28a745' : '#dc3545',
        color: 'white',
        borderRadius: '4px',
        display: 'inline-block'
      }}
    >
      {isActive ? 'Active' : 'Inactive'}
    </div>
  );
}

// Computed styles
function ProgressBar({ value, max = 100 }) {
  const percentage = (value / max) * 100;
  
  return (
    <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
      <div
        style={{
          width: \`\${percentage}%\`,
          height: '20px',
          backgroundColor: percentage > 70 ? '#28a745' : percentage > 40 ? '#ffc107' : '#dc3545',
          borderRadius: '4px',
          transition: 'width 0.3s, background-color 0.3s'
        }}
      />
    </div>
  );
}

// Theme-based styling
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745'
  }
};

function ThemedButton({ variant = 'primary' }) {
  return (
    <button
      style={{
        padding: '10px 20px',
        backgroundColor: theme.colors[variant],
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      Click me
    </button>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Hooks for Styles</h3>
        <p className="text-gray-700 mb-4">
          Create custom hooks to encapsulate style logic.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Custom hook for button styles
function useButtonStyles(variant, size, disabled) {
  const baseStyles = {
    padding: size === 'large' ? '15px 30px' : '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    fontSize: size === 'large' ? '18px' : '14px'
  };
  
  const variantStyles = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' },
    danger: { backgroundColor: '#dc3545', color: 'white' }
  };
  
  return {
    ...baseStyles,
    ...variantStyles[variant]
  };
}

// Usage
function Button({ variant, size, disabled, children }) {
  const styles = useButtonStyles(variant, size, disabled);
  return <button style={styles}>{children}</button>;
}

// Hook for responsive styles
function useResponsiveStyles() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return {
    isMobile: windowWidth < 768,
    isTablet: windowWidth >= 768 && windowWidth < 1024,
    isDesktop: windowWidth >= 1024,
    styles: {
      padding: windowWidth < 768 ? '10px' : '20px',
      fontSize: windowWidth < 768 ? '14px' : '16px'
    }
  };
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Considerations</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
            <li><strong>Avoid inline styles for static styles:</strong> Use CSS classes instead</li>
            <li><strong>Memoize style objects:</strong> Use useMemo for expensive computations</li>
            <li><strong>Extract constants:</strong> Define style objects outside components</li>
            <li><strong>Use CSS-in-JS libraries:</strong> For complex styling needs</li>
            <li><strong>Consider CSS Modules:</strong> For scoped styles without runtime overhead</li>
          </ul>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// ❌ Bad: Creating new object on every render
function Button() {
  return <button style={{ padding: '10px' }}>Click</button>;
}

// ✅ Good: Extract constant
const buttonStyle = { padding: '10px' };
function Button() {
  return <button style={buttonStyle}>Click</button>;
}

// ✅ Good: Memoize computed styles
function Button({ isActive }) {
  const styles = useMemo(() => ({
    padding: '10px',
    backgroundColor: isActive ? '#28a745' : '#dc3545'
  }), [isActive]);
  
  return <button style={styles}>Click</button>;
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default CSSInJSPatterns;

