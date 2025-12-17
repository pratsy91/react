// Function Component Example
function Welcome({ name, age = 18 }) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold">Welcome, {name}!</h3>
      <p className="text-gray-600">Age: {age}</p>
    </div>
  );
}

// PropTypes example (requires: npm install prop-types)
// Welcome.propTypes = {
//   name: PropTypes.string.isRequired,
//   age: PropTypes.number
// };

// Component with Children
function Card({ title, children }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}

// PropTypes example (requires: npm install prop-types)
// Card.propTypes = {
//   title: PropTypes.string.isRequired,
//   children: PropTypes.node
// };

// Component Composition Example
function Header() {
  return <header className="bg-gray-800 text-white p-4 rounded mb-4">Header</header>;
}

function Footer() {
  return <footer className="bg-gray-800 text-white p-4 rounded mt-4">Footer</footer>;
}

function Page({ children }) {
  return (
    <div>
      <Header />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
}

function Components() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Components</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Function Components</h3>
        <p className="text-gray-700 mb-4">
          Function components are the modern way to write React components. They're simpler and easier to test.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm">{`function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}`}</pre>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <Welcome name="React Learner" age={25} />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Props</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Passing Props:</h4>
            <pre className="text-sm bg-white p-2 rounded">{`<Welcome name="John" age={30} />`}</pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Destructuring Props:</h4>
            <pre className="text-sm bg-white p-2 rounded">{`function Welcome({ name, age }) {
  return <h1>{name} is {age}</h1>;
}`}</pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Default Props:</h4>
            <pre className="text-sm bg-white p-2 rounded">{`function Welcome({ name, age = 18 }) {
  return <h1>{name} is {age}</h1>;
}`}</pre>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Children Prop</h3>
        <p className="text-gray-700 mb-4">
          The <code className="bg-gray-100 px-1 rounded">children</code> prop allows you to pass content between component tags.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <Card title="Card Title">
            <p>This is the children content passed to the Card component.</p>
            <p>You can pass any JSX here!</p>
          </Card>
        </div>
        <pre className="text-sm bg-gray-50 p-4 rounded-lg">{`function Card({ title, children }) {
  return (
    <div>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

<Card title="My Card">
  <p>This is children content</p>
</Card>`}</pre>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Component Composition</h3>
        <p className="text-gray-700 mb-4">
          Build complex UIs by composing smaller components together.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <Page>
            <p className="text-gray-700">This is the main content area, composed with Header and Footer components.</p>
          </Page>
        </div>
        <pre className="text-sm bg-gray-50 p-4 rounded-lg">{`function Page({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}`}</pre>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Props Validation with PropTypes</h3>
        <p className="text-gray-700 mb-4">
          PropTypes help catch bugs by validating prop types during development.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm">{`import PropTypes from 'prop-types';

Welcome.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};`}</pre>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> PropTypes are checked in development mode only. 
            For TypeScript projects, use TypeScript for type checking instead.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Component Naming Conventions</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Component names must start with a capital letter</li>
          <li>Use PascalCase: <code className="bg-gray-100 px-1 rounded">UserProfile</code>, not <code className="bg-gray-100 px-1 rounded">userProfile</code></li>
          <li>File names typically match component names: <code className="bg-gray-100 px-1 rounded">UserProfile.jsx</code></li>
          <li>One component per file is a common practice</li>
        </ul>
      </section>
    </div>
  );
}

export default Components;

