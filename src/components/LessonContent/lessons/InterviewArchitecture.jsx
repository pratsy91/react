function InterviewArchitecture() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Architecture & Code Organization - Interview Cheatsheet</h2>
        <p className="text-gray-700">Best practices for organizing React applications</p>
      </div>

      {/* Folder Structure */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Folder Structure Patterns</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Feature-based Structure (Recommended):</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`src/
  features/
    users/
      components/
        UserList.jsx
        UserCard.jsx
      hooks/
        useUsers.js
      services/
        userApi.js
      index.js
    products/
      components/
      hooks/
      services/
  shared/
    components/
    hooks/
    utils/
  App.jsx`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Type-based Structure:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`src/
  components/
  hooks/
  services/
  utils/
  constants/
  types/
  App.jsx`}
            </pre>
          </div>
        </div>
      </section>

      {/* Component Organization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Component Organization</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>One component per file</li>
              <li>Co-locate related files (component, styles, tests)</li>
              <li>Use index.js for clean imports</li>
              <li>Group by feature when possible</li>
              <li>Separate container and presentational components</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Component File Structure:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`UserCard/
  UserCard.jsx
  UserCard.test.jsx
  UserCard.module.css
  index.js`}
            </pre>
          </div>
        </div>
      </section>

      {/* Barrel Exports */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Barrel Exports</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Clean Imports:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// components/index.js
export { UserList } from './UserList';
export { UserCard } from './UserCard';
export { UserForm } from './UserForm';

// Usage
import { UserList, UserCard } from './components';`}
            </pre>
          </div>
        </div>
      </section>

      {/* Naming Conventions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Naming Conventions</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Components:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>PascalCase for component names: UserCard, ProductList</li>
              <li>File names match component: UserCard.jsx</li>
              <li>Descriptive, meaningful names</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Hooks:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Start with "use": useUsers, useAuth</li>
              <li>Describe what they return/do</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Utilities:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>camelCase: formatDate, calculateTotal</li>
              <li>Verb-based names for functions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Splitting */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Code Splitting Strategies</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Route-based Splitting:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const Dashboard = lazy(() => import('./features/dashboard'));
const Settings = lazy(() => import('./features/settings'));`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Feature-based Splitting:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const AdminPanel = lazy(() => import('./features/admin'));`}
            </pre>
          </div>
        </div>
      </section>

      {/* Module Boundaries */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Module Boundaries</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Principles:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Features should be self-contained</li>
              <li>Minimize cross-feature dependencies</li>
              <li>Shared code goes in shared/</li>
              <li>Clear API boundaries between modules</li>
              <li>Use barrel exports for public APIs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Shared Component Patterns */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Shared Component Patterns</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Shared Components:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`src/
  shared/
    components/
      Button/
        Button.jsx
        Button.test.jsx
        index.js
      Input/
      Modal/
    ui/  // Basic UI primitives
      Button.jsx
      Input.jsx`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">When to Share:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Used by 3+ features</li>
              <li>Generic, reusable components</li>
              <li>Design system components</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Utility Functions Organization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Utility Functions Organization</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Organization Pattern:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`src/
  shared/
    utils/
      date.js       // date utilities
      format.js     // formatting utilities
      validation.js // validation utilities
      api.js        // API helpers
  
  features/
    users/
      utils/
        userHelpers.js  // User-specific utilities`}
            </pre>
          </div>
        </div>
      </section>

      {/* Configuration Management */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Configuration Management</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Config Structure:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`src/
  config/
    index.js        // Main config
    api.js          // API endpoints
    constants.js    // App constants
    routes.js       // Route configs

// config/index.js
export const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  features: {
    enableAnalytics: true
  }
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Environment Variables */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Environment Variables</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Usage:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// .env
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=production

// In code
const apiUrl = process.env.REACT_APP_API_URL;

// Type-safe config
const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  env: process.env.NODE_ENV
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Scalable Architecture Patterns */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Scalable Architecture Patterns</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Key Patterns:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Feature-based organization for scalability</li>
              <li>Clear separation of concerns</li>
              <li>Dependency injection for testability</li>
              <li>Centralized state management for shared state</li>
              <li>API layer abstraction</li>
              <li>Error boundary strategy</li>
              <li>Lazy loading and code splitting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you organize a large React application?</p>
            <p className="text-gray-700">A: Use feature-based organization, co-locate related files, use barrel exports, separate shared and feature-specific code, and implement code splitting at route/feature level.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewArchitecture;

