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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Feature-based organization groups related code by business domain (users, products) rather than by type (components, hooks). Each feature folder contains its components, hooks, services, and types. shared/ folder contains reusable code used across features. This structure scales well, reduces coupling, makes features easier to locate, and enables feature-based code splitting. It's recommended for large applications where teams work on different features.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Type-based structure organizes files by their technical type (components, hooks, services) rather than feature. All components go in components/, all hooks in hooks/, etc. This works well for small to medium applications where files are easy to locate. However, it can become harder to navigate as the app grows, and makes it harder to understand feature boundaries. It's simpler but less scalable than feature-based structure.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Co-locate related files in a component folder. Component file contains the main component logic. Test file (Component.test.jsx) is next to the component for easy discovery. Styles file (Component.module.css) co-located for maintainability. index.js provides a clean export, allowing imports like import UserCard from './UserCard' instead of './UserCard/UserCard'. This organization keeps related code together and makes it easy to understand what belongs to a component.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Barrel exports (index.js files) re-export multiple modules, creating a public API for a folder. This allows clean imports like import {'{'} UserList, UserCard {'}'} from './components' instead of individual file paths. Barrel exports centralize exports, simplify imports, and define module boundaries. They enable tree-shaking when used correctly. However, they can slow down large codebases in development if they export too much.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React.lazy() enables code splitting by loading components on demand. Wrap lazy component in Suspense to handle loading state. Route-based splitting loads code when user navigates to a route, reducing initial bundle size. Each route becomes a separate chunk loaded asynchronously. This improves initial load time, especially for large apps with many routes. Users only download code for routes they visit.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const Dashboard = lazy(() => import('./features/dashboard'));
const Settings = lazy(() => import('./features/settings'));`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Feature-based Splitting:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Feature-based splitting loads entire feature modules (like admin panel) on demand. This is useful when features are conditionally rendered based on permissions or user actions. AdminPanel might only load for admin users, reducing bundle size for regular users. Feature-based splitting works well with feature-based folder structure, where each feature can be a code-split chunk.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Shared components are reusable UI components used across multiple features. They live in shared/components/ to indicate they're not feature-specific. ui/ folder typically contains basic design system primitives (Button, Input) while shared/components/ contains more complex composed components. This separation allows design system components (ui/) to be shared with design team while feature-agnostic components (shared/) provide common functionality.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Organize utility functions by domain or purpose. shared/utils/ contains general-purpose utilities used across the app (date formatting, validation helpers, API helpers). Feature-specific utils go in features/featureName/utils/ for utilities only used within that feature. Grouping by purpose (date.js, format.js, validation.js) makes utilities easy to find. This keeps utilities organized and prevents duplication while maintaining clear boundaries.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Centralize application configuration in a config/ folder. Separate configs by domain (api.js for endpoints, constants.js for app constants, routes.js for route configs). Export a main config object that combines environment variables and default values. This provides a single source of truth for configuration, makes it easy to change settings, and enables type-safe config access. Keep sensitive values in environment variables, not in code.</p>
            </div>
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Environment variables prefixed with REACT_APP_ are exposed to client-side code in Create React App. Store them in .env files (different files for different environments). process.env.REACT_APP_API_URL accesses the variable. Provide fallback values with || operator for development. NODE_ENV is automatically set by the build tool. Never expose secrets or API keys in client-side environment variables - they're visible in the bundle. Only use for public configuration like API endpoints or feature flags.</p>
            </div>
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

