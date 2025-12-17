import { useState } from 'react';

function StyledComponents() {
  const [theme, setTheme] = useState('light');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Styled Components</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete styled-components API</h3>
        <p className="text-gray-700 mb-4">
          styled-components is a CSS-in-JS library that uses tagged template literals.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import styled from 'styled-components';

// Basic styled component
const Button = styled.button\`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
\`;

// Styled from existing component
const StyledLink = styled.a\`
  color: blue;
  text-decoration: none;
\`;

// Styled from another styled component
const PrimaryButton = styled(Button)\`
  background-color: #28a745;
\`;

// Usage
function App() {
  return (
    <div>
      <Button>Click me</Button>
      <PrimaryButton>Primary</PrimaryButton>
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Props and Dynamic Styles</h3>
        <p className="text-gray-700 mb-4">
          Use props to create dynamic styles based on component props.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`const Button = styled.button\`
  padding: \${props => props.size === 'large' ? '15px 30px' : '10px 20px'};
  background-color: \${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: \${props => props.size === 'large' ? '18px' : '14px'};
\`;

// Using CSS helper for complex styles
import styled, { css } from 'styled-components';

const Button = styled.button\`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;

  \${props => props.primary && css\`
    background-color: #007bff;
    color: white;
  \`}

  \${props => props.secondary && css\`
    background-color: #6c757d;
    color: white;
  \`}

  \${props => props.disabled && css\`
    opacity: 0.5;
    cursor: not-allowed;
  \`}
\`;

// Usage
<Button primary size="large">Primary</Button>
<Button secondary>Secondary</Button>
<Button disabled>Disabled</Button>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Theming</h3>
        <p className="text-gray-700 mb-4">
          Use ThemeProvider to provide theme context to all styled components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import styled, { ThemeProvider } from 'styled-components';

// Define theme
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545'
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
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
  padding: \${props => props.theme.spacing.medium};
  color: white;
  border: none;
  border-radius: 4px;

  @media (max-width: \${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
\`;

// Access theme with useTheme hook
import { useTheme } from 'styled-components';

function ThemedComponent() {
  const theme = useTheme();
  return <div style={{ color: theme.colors.primary }}>Themed</div>;
}

// Provide theme
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Click me</Button>
      <ThemedComponent />
    </ThemeProvider>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Features</h3>
        <p className="text-gray-700 mb-4">
          styled-components provides many advanced features for complex styling needs.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import styled, { keyframes, createGlobalStyle } from 'styled-components';

// Animations with keyframes
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

// Global styles
const GlobalStyle = createGlobalStyle\`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: \${props => props.theme.colors.background};
  }
\`;

// Attaching additional props
const Input = styled.input.attrs(props => ({
  type: props.type || 'text',
  placeholder: props.placeholder || 'Enter text'
}))\`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
\`;

// Pseudo-selectors and nested styles
const Card = styled.div\`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin-bottom: 10px;
  }

  p {
    color: #666;
  }
\`;

// As prop (change underlying element)
const Button = styled.button\`
  padding: 10px 20px;
\`;

// Usage: <Button as="a" href="/link">Link</Button>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Server-Side Rendering</h3>
        <p className="text-gray-700 mb-4">
          styled-components supports SSR with proper setup.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Server-side (Next.js example)
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';

export async function getServerSideProps() {
  const sheet = new ServerStyleSheet();
  
  try {
    const html = renderToString(
      sheet.collectStyles(<App />)
    );
    const styleTags = sheet.getStyleTags();
    
    return {
      props: {
        html,
        styleTags
      }
    };
  } finally {
    sheet.seal();
  }
}

// Client-side
import { StyleSheetManager } from 'styled-components';

function App() {
  return (
    <StyleSheetManager>
      <YourApp />
    </StyleSheetManager>
  );
}

// Babel plugin for better performance
// .babelrc
{
  "plugins": [
    ["babel-plugin-styled-components", {
      "ssr": true,
      "displayName": true,
      "preprocess": false
    }]
  ]
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete API Reference</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">API</th>
                <th className="text-left p-2">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2"><code>styled</code></td>
                <td className="p-2">Create styled components</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>css</code></td>
                <td className="p-2">CSS helper for complex styles</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>keyframes</code></td>
                <td className="p-2">Create animations</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>ThemeProvider</code></td>
                <td className="p-2">Provide theme context</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>useTheme</code></td>
                <td className="p-2">Access theme in components</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>createGlobalStyle</code></td>
                <td className="p-2">Create global styles</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>withTheme</code></td>
                <td className="p-2">HOC to access theme</td>
              </tr>
              <tr>
                <td className="p-2"><code>isStyledComponent</code></td>
                <td className="p-2">Check if component is styled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default StyledComponents;

