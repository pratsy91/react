function InterviewStyling() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Styling Approaches - Interview Cheatsheet</h2>
        <p className="text-gray-700">Comparison of styling solutions in React</p>
      </div>

      {/* CSS Modules */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">CSS Modules</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Usage:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Button.module.css
.button {
  padding: 10px;
  background: blue;
}

// Button.jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Click</button>;
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Pros:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Scoped styles automatically</li>
              <li>No runtime overhead</li>
              <li>Familiar CSS syntax</li>
              <li>Great tooling support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Styled Components */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Styled-components</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Usage:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import styled from 'styled-components';

const Button = styled.button\`
  padding: 10px;
  background: \${props => props.primary ? 'blue' : 'gray'};
  color: white;
\`;

function App() {
  return <Button primary>Click</Button>;
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Pros:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Co-located styles</li>
              <li>Dynamic styling</li>
              <li>Theming support</li>
              <li>TypeScript support</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">Cons:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Runtime overhead</li>
              <li>Larger bundle size</li>
              <li>Learning curve</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tailwind CSS */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Tailwind CSS</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Usage:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Button({ primary, children }) {
  return (
    <button className={\`
      px-4 py-2 rounded
      \${primary ? 'bg-blue-500' : 'bg-gray-500'}
      text-white hover:bg-opacity-90
    \`}>
      {children}
    </button>
  );
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Pros:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Rapid development</li>
              <li>Consistent design system</li>
              <li>Purges unused CSS</li>
              <li>Responsive utilities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Emotion */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Emotion</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">CSS Prop:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Button() {
  return (
    <button css={css\`
      padding: 10px;
      background: blue;
      &:hover { background: darkblue; }
    \`}>
      Click
    </button>
  );
}`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Styled API:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import styled from '@emotion/styled';

const Button = styled.button\`
  padding: 10px;
  background: \${props => props.primary ? 'blue' : 'gray'};
\`;`}
            </pre>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">CSS-in-JS vs CSS Modules Comparison</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">CSS Modules:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Zero runtime cost</li>
                <li>Build-time processing</li>
                <li>No JavaScript in CSS</li>
                <li>Better performance</li>
                <li>Static styles</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">CSS-in-JS:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Runtime overhead</li>
                <li>Dynamic styling</li>
                <li>Co-located styles</li>
                <li>Theming support</li>
                <li>JavaScript in CSS</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Theming Strategies */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Theming Strategies</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Styled-components Theming:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: 'blue',
    secondary: 'gray'
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Click</Button>
    </ThemeProvider>
  );
}

const Button = styled.button\`
  background: \${props => props.theme.colors.primary};
\`;`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">CSS Variables Theming:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// CSS
:root {
  --primary-color: blue;
}

[data-theme="dark"] {
  --primary-color: lightblue;
}

.button {
  background: var(--primary-color);
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Dynamic Styling */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Dynamic Styling Patterns</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Conditional Classes:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Button({ variant, size }) {
  return (
    <button className={\`
      base-button
      \${variant === 'primary' ? 'primary' : 'secondary'}
      \${size === 'large' ? 'large' : 'small'}
    \`}>
      Click
    </button>
  );
}`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Inline Styles:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Component({ color }) {
  return (
    <div style={{ backgroundColor: color }}>
      Content
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Performance Considerations */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Considerations</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Optimization Tips:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>CSS Modules: Zero runtime cost (best performance)</li>
              <li>CSS-in-JS: Use babel plugin for static extraction</li>
              <li>Avoid inline styles for frequently changing values</li>
              <li>Use CSS variables for theme changes</li>
              <li>Minimize style recalculations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CSS Organization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">CSS Organization</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">File Organization:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`src/
  styles/
    globals.css      // Global styles
    variables.css    // CSS variables
    reset.css        // CSS reset
    utilities.css    // Utility classes
  
  components/
    Button/
      Button.module.css  // Component styles`}
            </pre>
          </div>
        </div>
      </section>

      {/* Responsive Design */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Responsive Design Patterns</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Media Queries:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// CSS Modules
.container {
  padding: 10px;
}

@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

// Styled-components
const Container = styled.div\`
  padding: 10px;
  @media (min-width: 768px) {
    padding: 20px;
  }
\`;

// Tailwind
<div className="p-4 md:p-8">Content</div>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use What?</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">CSS Modules:</p>
            <p className="text-gray-700">Use for traditional CSS with scoping, when you want zero runtime cost, or when migrating existing CSS.</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">Styled-components:</p>
            <p className="text-gray-700">Use when you need dynamic styling, theming, or want styles co-located with components.</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">Tailwind CSS:</p>
            <p className="text-gray-700">Use for rapid prototyping, utility-first approach, or when you want a design system out of the box.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewStyling;

