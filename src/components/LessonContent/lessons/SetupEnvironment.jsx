function SetupEnvironment() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Setup & Environment</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding React Development Environment</h3>
        <p className="text-blue-800 mb-2">
          Setting up a proper development environment is crucial for React development. Modern React applications require:
        </p>
        <ul className="list-disc list-inside space-y-1 text-blue-800 ml-4">
          <li><strong>Build Tools:</strong> To transpile JSX, bundle modules, and optimize code</li>
          <li><strong>Package Managers:</strong> npm, yarn, or pnpm to manage dependencies</li>
          <li><strong>Development Server:</strong> For fast development with Hot Module Replacement (HMR)</li>
          <li><strong>Code Quality Tools:</strong> ESLint for linting, Prettier for formatting</li>
          <li><strong>Transpilation:</strong> Converting modern JavaScript/JSX to browser-compatible code</li>
        </ul>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Vite Setup and Configuration</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">What is Vite?</h4>
          <p className="text-gray-700 mb-3">
            Vite (French for "fast") is a next-generation frontend build tool created by Evan You, the creator of Vue.js. 
            It was designed to address the slow development experience of traditional bundlers like Webpack.
          </p>
          <h4 className="font-semibold text-gray-900 mb-2">Why Vite?</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
            <li><strong>Lightning-fast HMR:</strong> Updates appear instantly in the browser, often in under 50ms</li>
            <li><strong>ESM-based:</strong> Uses native ES modules during development, eliminating bundling overhead</li>
            <li><strong>Optimized builds:</strong> Uses Rollup for production builds with tree-shaking and code splitting</li>
            <li><strong>Out-of-the-box support:</strong> TypeScript, JSX, CSS preprocessing, and more without configuration</li>
            <li><strong>Plugin ecosystem:</strong> Compatible with Rollup plugins and has a growing Vite-specific plugin ecosystem</li>
          </ul>
          <h4 className="font-semibold text-gray-900 mb-2">How Vite Works</h4>
          <p className="text-gray-700 mb-3">
            During development, Vite serves source files directly using native ES modules. The browser requests modules 
            on-demand, and Vite only transforms what's needed. This eliminates the need to bundle the entire application 
            before seeing changes, resulting in instant server start and fast updates.
          </p>
          <p className="text-gray-700">
            In production, Vite uses Rollup to create optimized bundles with tree-shaking, minification, and code splitting.
          </p>
        </div>
        <p className="text-gray-700 mb-4">
          Vite is a modern build tool that provides fast development experience. We've already set it up in this project!
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <code className="text-sm">
            npm create vite@latest my-app -- --template react
          </code>
        </div>
        <p className="text-gray-700 mb-4">
          Vite configuration is in <code className="bg-gray-100 px-2 py-1 rounded">vite.config.js</code>
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Project Structure and Organization</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm text-gray-800">
{`src/
├── components/     # Reusable components
├── pages/          # Page components
├── data/           # Data and configuration
├── assets/         # Static assets
├── App.jsx         # Main app component
└── main.jsx        # Entry point`}
          </pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">ESLint, Prettier Configuration</h3>
        <p className="text-gray-700 mb-4">
          ESLint is already configured in this project. Check <code className="bg-gray-100 px-2 py-1 rounded">eslint.config.js</code>
        </p>
        <p className="text-gray-700">
          For Prettier, you can install it separately:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mt-2">
          <code className="text-sm">npm install -D prettier</code>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Understanding Build Tools and Bundling</h3>
        <p className="text-gray-700 mb-4">
          Vite uses:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>ESBuild:</strong> For fast bundling and transpilation</li>
          <li><strong>Rollup:</strong> For production builds</li>
          <li><strong>HMR (Hot Module Replacement):</strong> For instant updates during development</li>
        </ul>
      </section>
    </div>
  );
}

export default SetupEnvironment;

