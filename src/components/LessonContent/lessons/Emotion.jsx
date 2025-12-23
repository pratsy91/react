import { useState } from 'react';

function Emotion() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Emotion</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Emotion</h3>
        <p className="text-blue-800 mb-2">
          Emotion is a performant, flexible CSS-in-JS library. It provides two main APIs: the `css` prop for styling components 
          inline, and the `styled` API (similar to styled-components) for creating styled components. Emotion is known for its 
          performance optimizations, including automatic dead code elimination and source map support.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>css Prop:</strong> Style components with a css prop (no styled components needed)</li>
            <li><strong>styled API:</strong> Create styled components similar to styled-components</li>
            <li><strong>Performance:</strong> Optimized with automatic dead code elimination</li>
            <li><strong>Source Maps:</strong> Better debugging with source map support</li>
            <li><strong>Composition:</strong> Compose styles easily with arrays and functions</li>
            <li><strong>TypeScript:</strong> Excellent TypeScript support</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Flexible styling with css prop or styled API</li>
            <li>High performance with optimizations</li>
            <li>Better debugging with source maps</li>
            <li>Small bundle size</li>
            <li>Works with React and other frameworks</li>
            <li>Full CSS support including animations</li>
          </ul>
          <p className="mt-2"><strong>When to Use Emotion:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>When you want CSS-in-JS with good performance</li>
            <li>For projects needing the css prop API</li>
            <li>When you need source map support for debugging</li>
            <li>For applications with complex dynamic styling</li>
            <li>When you want a styled-components alternative</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">css Prop</h3>
        <p className="text-gray-700 mb-4">
          Emotion provides a powerful css prop for styling components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Button({ primary, children }) {
  return (
    <button
      css={css\`
        padding: 10px 20px;
        background-color: \${primary ? '#007bff' : '#6c757d'};
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      \`}
    >
      {children}
    </button>
  );
}

// With JSX Pragma (no import needed)
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

// Array syntax for multiple styles
function Component() {
  return (
    <div
      css={[
        baseStyles,
        isActive && activeStyles,
        { color: 'red' }
      ]}
    >
      Content
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">styled API</h3>
        <p className="text-gray-700 mb-4">
          Emotion's styled API is similar to styled-components but with additional features.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import styled from '@emotion/styled';

// Basic styled component
const Button = styled.button\`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
\`;

// With props
const Button = styled.button\`
  padding: \${props => props.size === 'large' ? '15px 30px' : '10px 20px'};
  background-color: \${props => props.primary ? '#007bff' : '#6c757d'};
\`;

// Composition
const PrimaryButton = styled(Button)\`
  background-color: #28a745;
\`;

// Object syntax
const Button = styled.button({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  '&:hover': {
    opacity: 0.8
  }
});

// With props (object syntax)
const Button = styled.button(props => ({
  padding: props.size === 'large' ? '15px 30px' : '10px 20px',
  backgroundColor: props.primary ? '#007bff' : '#6c757d'
}));`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Theming and Variants</h3>
        <p className="text-gray-700 mb-4">
          Emotion provides powerful theming capabilities with ThemeProvider.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

// Define theme
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#333333'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  }
};

// Use theme in styled component
const Button = styled.button\`
  background-color: \${props => props.theme.colors.primary};
  padding: \${props => props.theme.spacing.md};
  color: white;
\`;

// Use theme hook
function ThemedComponent() {
  const theme = useTheme();
  return (
    <div css={{ color: theme.colors.primary }}>
      Themed content
    </div>
  );
}

// Provide theme
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Click me</Button>
      <ThemedComponent />
    </ThemeProvider>
  );
}

// Variants with emotion
import { css } from '@emotion/react';

const buttonVariants = {
  primary: css\`
    background-color: #007bff;
    color: white;
  \`,
  secondary: css\`
    background-color: #6c757d;
    color: white;
  \`
};

function Button({ variant = 'primary', children }) {
  return (
    <button css={[baseStyles, buttonVariants[variant]]}>
      {children}
    </button>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Features</h3>
        <p className="text-gray-700 mb-4">
          Emotion provides advanced features like keyframes, composition, and more.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { keyframes, css } from '@emotion/react';

// Animations
const fadeIn = keyframes\`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
\`;

const FadeInDiv = styled.div\`
  animation: \${fadeIn} 1s ease-in;
\`;

// Composition
const baseStyles = css\`
  padding: 10px;
  border-radius: 4px;
\`;

const primaryStyles = css\`
  background-color: #007bff;
  color: white;
\`;

const Button = styled.button\`
  \${baseStyles}
  \${primaryStyles}
\`;

// Media queries
const ResponsiveDiv = styled.div\`
  padding: 10px;

  @media (min-width: 768px) {
    padding: 20px;
  }

  @media (min-width: 1024px) {
    padding: 30px;
  }
\`;

// Class names
import { cx } from '@emotion/css';

function Component({ className }) {
  return (
    <div className={cx('base-class', className)}>
      Content
    </div>
  );
}

// Global styles
import { Global, css } from '@emotion/react';

function App() {
  return (
    <>
      <Global
        styles={css\`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
          }
        \`}
      />
      <YourApp />
    </>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Emotion vs styled-components</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">Emotion</th>
                <th className="text-left p-2">styled-components</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">css prop</td>
                <td className="p-2">✓ Built-in</td>
                <td className="p-2">Requires babel plugin</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Object syntax</td>
                <td className="p-2">✓ Native</td>
                <td className="p-2">Template literals only</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Performance</td>
                <td className="p-2">Faster</td>
                <td className="p-2">Slightly slower</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Bundle size</td>
                <td className="p-2">Smaller</td>
                <td className="p-2">Larger</td>
              </tr>
              <tr>
                <td className="p-2">SSR</td>
                <td className="p-2">✓ Excellent</td>
                <td className="p-2">✓ Good</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Emotion;

