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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> CSS Modules provide scoped CSS by automatically generating unique class names. Import styles object from .module.css file. Use styles.className to apply classes. Build tools hash class names (e.g., .button becomes .Button_button__3x4yz) ensuring no naming conflicts. Styles are scoped to the component. Zero runtime cost - all processing happens at build time. This gives you CSS benefits with automatic scoping and no global namespace pollution.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> styled-components uses tagged template literals to create styled React components. styled.button creates a styled button element. Template literal syntax allows embedding CSS. Props can be accessed via ${'${'}props{'}'} for dynamic styling. Styles are injected at runtime, generating unique class names. Styles are co-located with components. Supports theming, pseudo-selectors, and media queries. Runtime overhead is minimal but exists, and bundle size is larger than CSS Modules.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Tailwind CSS uses utility classes for styling. Classes like px-4 (padding-x), py-2 (padding-y), rounded (border-radius) apply single CSS properties. Template literals combine multiple utility classes. Conditional classes use template literal expressions. Tailwind's purge process removes unused classes in production, keeping bundle size small. Utility-first approach means no custom CSS files needed for most styling. Rapid development but requires learning Tailwind's class names.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Emotion's css prop allows inline CSS styling. css function creates styled objects applied via css prop. Supports nested selectors with & syntax (e.g., &:hover). Styles are processed at runtime and injected as CSS. Better performance than styled-components in some cases. Can be combined with styled API. The /** @jsxImportSource @emotion/react */ pragma enables css prop without explicit imports in JSX.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Emotion's styled API is similar to styled-components. Creates styled components using tagged template literals. Supports props-based dynamic styling. Styles are co-located with components. Emotion offers both css prop and styled API, giving flexibility. Can use both approaches in the same codebase. Emotion is generally faster than styled-components and has a smaller bundle size.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> ThemeProvider wraps the app and provides theme object to all styled components via context. Access theme via props.theme in styled component template literals. Theme object can contain colors, spacing, breakpoints, etc. Enables global theming and dark mode. Change theme by updating ThemeProvider's theme prop. All styled components automatically receive new theme values. This creates a centralized design system that's easy to update globally.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> CSS custom properties (variables) enable theming without JavaScript. Define variables in :root for global scope. Use data-theme attribute to switch themes (e.g., [data-theme="dark"]). Variables cascade and can be overridden. Use var(--variable-name) to reference variables. Change theme by updating data-theme attribute on root element. Zero runtime cost, works with any CSS approach. Can be combined with CSS Modules or regular CSS. Modern browsers have full support.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Conditional classes use template literals with ternary operators or logical operators to apply classes based on props/state. Combines base classes with conditional variant classes. Works with CSS Modules, regular CSS, or Tailwind. Common pattern: base classes + conditional variant classes. Template literal expressions evaluate to strings that become className. This pattern is flexible and works with any CSS approach. Useful for variant-based styling (primary/secondary buttons, sizes, states).</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Inline styles use style prop with object syntax. CSS properties are camelCased (backgroundColor, not background-color). Useful for dynamic, calculated values that change frequently. Higher specificity than CSS classes. No class name generation overhead. However, inline styles can't use pseudo-selectors, media queries, or keyframe animations. Best for truly dynamic values (position calculations, color pickers). Avoid for static styling - use CSS classes instead.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Organize CSS files by purpose. globals.css contains reset styles and global rules affecting the entire app. variables.css defines CSS custom properties for theming. reset.css normalizes browser default styles. utilities.css contains utility classes (like helper classes). Component-specific styles go in component folders (Button.module.css). This organization separates concerns: global styles vs component styles, design tokens vs implementations. Makes styles easier to find and maintain.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Media queries enable responsive design by applying styles based on viewport size. @media (min-width: 768px) applies styles when screen is at least 768px wide. CSS Modules support media queries in .module.css files. styled-components supports media queries in template literals. Tailwind provides responsive prefixes (md:, lg:) that automatically apply media queries. Mobile-first approach (default mobile, override for larger screens) is recommended. This ensures apps work well across device sizes.</p>
            </div>
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

