import { useState } from 'react';

function MicroFrontends() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Micro-frontends</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Micro-frontends</h3>
        <p className="text-blue-800 mb-2">
          Micro-frontends is an architectural pattern where a frontend application is composed of smaller, independent applications 
          (micro-frontends) that can be developed, deployed, and maintained separately. Each micro-frontend is owned by a different 
          team and can use different technologies, enabling large organizations to scale frontend development.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Concepts:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Independent Deployment:</strong> Each micro-frontend can be deployed independently</li>
            <li><strong>Team Autonomy:</strong> Different teams can work on different micro-frontends</li>
            <li><strong>Technology Diversity:</strong> Each micro-frontend can use different frameworks</li>
            <li><strong>Module Federation:</strong> Share code between applications at runtime</li>
            <li><strong>Composition:</strong> Combine micro-frontends into a single application</li>
            <li><strong>Isolation:</strong> Micro-frontends are isolated from each other</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Independent development and deployment</li>
            <li>Team autonomy and faster development</li>
            <li>Technology flexibility</li>
            <li>Better scalability for large teams</li>
            <li>Fault isolation - one micro-frontend failure doesn't break the whole app</li>
            <li>Easier to maintain and update</li>
          </ul>
          <p className="mt-2"><strong>When to Use Micro-frontends:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Large applications with multiple teams</li>
            <li>When you need independent deployments</li>
            <li>For organizations with distributed teams</li>
            <li>When different parts need different technologies</li>
            <li>For applications that need to scale development</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Module Federation</h3>
        <p className="text-gray-700 mb-4">
          Use Webpack Module Federation to share code between applications.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Host application (webpack.config.js)
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};

// Remote application (webpack.config.js)
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
        './Header': './src/Header'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};

// Using remote components
import React from 'react';

const RemoteButton = React.lazy(() => import('remoteApp/Button'));
const RemoteHeader = React.lazy(() => import('remoteApp/Header'));

function App() {
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RemoteHeader />
        <RemoteButton />
      </React.Suspense>
    </div>
  );
}

// Vite Module Federation
// Install: npm install @originjs/vite-plugin-federation

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remoteApp: 'http://localhost:3001/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ]
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Independent Deployments</h3>
        <p className="text-gray-700 mb-4">
          Deploy micro-frontends independently.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Each micro-frontend is deployed separately
// Host app: https://app.example.com
// Remote app 1: https://auth.example.com
// Remote app 2: https://dashboard.example.com

// Version management
// Use semantic versioning for shared dependencies
shared: {
  react: {
    singleton: true,
    requiredVersion: '^18.0.0'
  }
}

// Deployment strategy
// 1. Deploy remote apps first
// 2. Update host app to reference new versions
// 3. Deploy host app

// Blue-green deployment
// 1. Deploy new version alongside old
// 2. Test new version
// 3. Switch traffic to new version
// 4. Remove old version

// Canary deployment
// 1. Deploy to small percentage of users
// 2. Monitor for issues
// 3. Gradually increase percentage
// 4. Full rollout

// Feature flags
// Control feature visibility per deployment
const features = {
  newDashboard: process.env.REACT_APP_FEATURE_DASHBOARD === 'true'
};

// Environment-specific remotes
const remotes = {
  development: {
    remoteApp: 'http://localhost:3001/remoteEntry.js'
  },
  production: {
    remoteApp: 'https://remote.example.com/remoteEntry.js'
  }
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Shared Dependencies</h3>
        <p className="text-gray-700 mb-4">
          Share dependencies between micro-frontends.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Shared dependencies configuration
shared: {
  react: {
    singleton: true,        // Only one instance
    requiredVersion: '^18.0.0',
    eager: false           // Load on demand
  },
  'react-dom': {
    singleton: true,
    requiredVersion: '^18.0.0'
  },
  'react-router-dom': {
    singleton: false,      // Multiple instances allowed
    requiredVersion: '^6.0.0'
  }
}

// Singleton vs multiple instances
// Singleton: One shared instance (React, ReactDOM)
// Multiple: Each app can have its own (utilities)

// Eager loading
shared: {
  react: {
    eager: true  // Load immediately
  }
}

// Lazy loading (default)
shared: {
  react: {
    eager: false  // Load when needed
  }
}

// Version resolution
// Module Federation resolves to compatible version
// Falls back to requiredVersion if no match

// Shared utilities
// Create shared package for common utilities
// npm package or shared module

// Shared state management
// Use shared context or state library
// Or use event bus for communication

// Communication between micro-frontends
// 1. Custom events
window.dispatchEvent(new CustomEvent('app-event', { detail: data }));

// 2. Shared state (Redux, Zustand)
// 3. Query parameters
// 4. Local storage / session storage`}</pre>
        </div>
      </section>
    </div>
  );
}

export default MicroFrontends;

