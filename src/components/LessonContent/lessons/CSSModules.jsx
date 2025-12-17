import { useState } from 'react';

function CSSModules() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">CSS Modules</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Setup and Usage</h3>
        <p className="text-gray-700 mb-4">
          CSS Modules provide scoped CSS by automatically generating unique class names.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Button.module.css
.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

.primary {
  background-color: #28a745;
}

// Button.jsx
import styles from './Button.module.css';

function Button({ children, variant = 'default' }) {
  return (
    <button className={\`\${styles.button} \${variant === 'primary' ? styles.primary : ''}\`}>
      {children}
    </button>
  );
}

export default Button;`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Composition</h3>
        <p className="text-gray-700 mb-4">
          Compose multiple CSS classes using the `composes` keyword.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// base.module.css
.base {
  padding: 10px;
  border-radius: 4px;
}

// button.module.css
.button {
  composes: base from './base.module.css';
  background-color: blue;
  color: white;
}

.primary {
  composes: button;
  background-color: green;
}

// Multiple compositions
.card {
  composes: base from './base.module.css';
  composes: shadow from './effects.module.css';
  border: 1px solid #ccc;
}

// Usage in component
import styles from './button.module.css';

function Button() {
  return (
    <button className={styles.primary}>
      Click me
    </button>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Global vs Local Styles</h3>
        <p className="text-gray-700 mb-4">
          CSS Modules are scoped by default, but you can use global styles when needed.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Component.module.css
/* Local (scoped) styles */
.button {
  padding: 10px;
  background: blue;
}

/* Global styles using :global() */
:global(.global-class) {
  color: red;
}

:global {
  .another-global-class {
    font-size: 20px;
  }
}

// Component.jsx
import styles from './Component.module.css';
import './global.css'; // Regular CSS file for global styles

function Component() {
  return (
    <div>
      {/* Local scoped class */}
      <button className={styles.button}>Local</button>
      
      {/* Global class */}
      <div className="global-class">Global</div>
    </div>
  );
}

// global.css (regular CSS file)
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

* {
  box-sizing: border-box;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Dynamic Class Names</h3>
        <p className="text-gray-700 mb-4">
          Use template literals or conditional logic for dynamic class names.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import styles from './Button.module.css';
import classNames from 'classnames'; // or clsx

function Button({ variant, size, disabled, children }) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        styles[\`size-\${size}\`],
        {
          [styles.disabled]: disabled
        }
      )}
    >
      {children}
    </button>
  );
}

// Without classnames library
function Button({ variant, size, disabled, children }) {
  const className = [
    styles.button,
    styles[variant],
    styles[\`size-\${size}\`],
    disabled && styles.disabled
  ].filter(Boolean).join(' ');

  return <button className={className}>{children}</button>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Vite Configuration</h3>
        <p className="text-gray-700 mb-4">
          CSS Modules work out of the box with Vite. No configuration needed!
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// vite.config.js
// CSS Modules are enabled by default for .module.css files

// Optional: Custom naming pattern
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase', // or 'camelCaseOnly', 'dashes', 'dashesOnly'
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  }
});

// File naming conventions:
// Component.module.css - CSS Modules (scoped)
// Component.css - Regular CSS (global)`}</pre>
        </div>
      </section>
    </div>
  );
}

export default CSSModules;

