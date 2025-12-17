import { useState } from 'react';

function MicroFrontends() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Micro-frontends</h2>
      
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

