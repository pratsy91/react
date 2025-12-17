function SetupEnvironment() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Setup & Environment</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Vite Setup and Configuration</h3>
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

