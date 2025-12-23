import { useState } from 'react';

function BuildConfiguration() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Build Configuration</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Build Configuration</h3>
        <p className="text-blue-800 mb-2">
          Build configuration is crucial for optimizing your React application for production. Proper configuration ensures 
          smaller bundle sizes, faster load times, better code splitting, and optimal asset handling. Vite provides extensive 
          configuration options for customizing the build process to meet your application's specific needs.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Configuration Areas:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Code Splitting:</strong> Split code into smaller chunks for better loading</li>
            <li><strong>Minification:</strong> Reduce bundle size by minifying code</li>
            <li><strong>Tree Shaking:</strong> Remove unused code from bundles</li>
            <li><strong>Asset Optimization:</strong> Optimize images, fonts, and other assets</li>
            <li><strong>Source Maps:</strong> Generate source maps for debugging</li>
            <li><strong>Environment Variables:</strong> Configure environment-specific settings</li>
          </ul>
          <p className="mt-2"><strong>Optimization Strategies:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Manual chunk splitting for vendor libraries</li>
            <li>Lazy loading routes and components</li>
            <li>Asset compression and optimization</li>
            <li>CSS code splitting</li>
            <li>Polyfill management</li>
            <li>Target browser configuration</li>
          </ul>
          <p className="mt-2"><strong>Benefits of Proper Configuration:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Smaller bundle sizes - faster downloads</li>
            <li>Better code splitting - load only what's needed</li>
            <li>Improved performance - optimized assets</li>
            <li>Better caching - separate chunks cache independently</li>
            <li>Faster initial load times</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Vite Configuration</h3>
        <p className="text-gray-700 mb-4">
          Configure Vite for optimal production builds.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Base public path
  base: '/',
  
  // Build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps in production
    minify: 'esbuild', // or 'terser'
    target: 'es2015',
    cssCodeSplit: true,
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunk splitting
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'utils': ['./src/utils']
        },
        
        // File naming
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils')
    }
  },
  
  // Server options (dev)
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  
  // Preview options
  preview: {
    port: 4173,
    open: true
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['some-large-dependency']
  }
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Environment Variables</h3>
        <p className="text-gray-700 mb-4">
          Manage environment variables for different environments.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// .env (default, loaded in all environments)
VITE_APP_NAME=My App
VITE_API_TIMEOUT=5000

// .env.local (local overrides, gitignored)
VITE_API_URL=http://localhost:3000

// .env.development (development only)
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true

// .env.production (production only)
VITE_API_URL=https://api.production.com
VITE_DEBUG=false

// .env.staging (staging only)
VITE_API_URL=https://api.staging.com

// Usage in code
const apiUrl = import.meta.env.VITE_API_URL;
const isDebug = import.meta.env.VITE_DEBUG === 'true';
const appName = import.meta.env.VITE_APP_NAME;

// Type-safe environment variables
// env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEBUG: string;
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Access mode
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const mode = import.meta.env.MODE; // 'development' | 'production'

// Build-time replacement
// Vite replaces these at build time
console.log('API URL:', import.meta.env.VITE_API_URL);

// vite.config.js - Define env variables
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
});

// Access in code
console.log('Version:', __APP_VERSION__);
console.log('Build time:', __BUILD_TIME__);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Build Optimization</h3>
        <p className="text-gray-700 mb-4">
          Optimize your build for production performance.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// vite.config.js - Production optimizations
export default defineConfig({
  build: {
    // Minification
    minify: 'esbuild', // Fastest, or 'terser' for better compression
    
    // Terser options (if using terser)
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    },
    
    // CSS minification
    cssMinify: true,
    
    // Compression
    reportCompressedSize: true,
    
    // Remove unused code
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false
      }
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      target: 'es2015'
    }
  },
  
  // Production mode optimizations
  esbuild: {
    drop: ['console', 'debugger'], // Remove in production
    legalComments: 'none' // Remove comments
  }
});

// Remove console in production
// vite.config.js
export default defineConfig(({ mode }) => {
  return {
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    }
  };
});

// Bundle analyzer
// Install: npm install -D rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Asset Optimization</h3>
        <p className="text-gray-700 mb-4">
          Optimize images, fonts, and other assets.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// vite.config.js - Asset optimization
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 80 }
    })
  ],
  
  build: {
    // Asset handling
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    
    rollupOptions: {
      output: {
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return \`images/[name]-[hash][extname]\`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return \`fonts/[name]-[hash][extname]\`;
          }
          return \`assets/[name]-[hash][extname]\`;
        }
      }
    }
  }
});

// Image optimization plugin
// npm install -D vite-plugin-imagemin
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      svgo: {
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: false }
        ]
      }
    })
  ]
});

// Font optimization
// Use font-display: swap in CSS
@font-face {
  font-family: 'CustomFont';
  src: url('./fonts/custom.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
}

// Preload critical fonts
<link rel="preload" href="/fonts/custom.woff2" as="font" type="font/woff2" crossorigin />

// Lazy load images
<img 
  src="placeholder.jpg" 
  data-src="image.jpg" 
  loading="lazy"
  alt="Description"
/>

// Use modern image formats
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Tree Shaking</h3>
        <p className="text-gray-700 mb-4">
          Remove unused code from your bundle.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Tree shaking works automatically with ES modules
// ✅ Good - Named imports (tree-shakeable)
import { debounce } from 'lodash-es';
import { Button } from '@mui/material';

// ❌ Bad - Default imports (not tree-shakeable)
import _ from 'lodash';
import * as MUI from '@mui/material';

// ✅ Good - Import only what you need
import { useState, useEffect } from 'react';

// ❌ Bad - Import entire module
import * as React from 'react';

// vite.config.js - Tree shaking configuration
export default defineConfig({
  build: {
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false, // Assume no side effects
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    }
  }
});

// Package.json - Mark side-effect free
{
  "name": "my-package",
  "sideEffects": false, // No side effects
  // or
  "sideEffects": [
    "*.css", // CSS files have side effects
    "./src/polyfills.js"
  ]
}

// CommonJS modules are not tree-shakeable
// Use ES modules instead

// Example: Lodash
// ❌ Bad
import _ from 'lodash';
const debounced = _.debounce(fn, 300);

// ✅ Good
import debounce from 'lodash-es/debounce';
const debounced = debounce(fn, 300);

// Example: Material-UI
// ❌ Bad
import * as MUI from '@mui/material';

// ✅ Good
import { Button, TextField } from '@mui/material';

// Example: Utils
// utils/index.js
export { debounce } from './debounce';
export { throttle } from './throttle';
export { formatDate } from './date';

// ✅ Good - Only imports what's needed
import { debounce } from './utils';

// vite.config.js - Exclude from tree shaking if needed
export default defineConfig({
  build: {
    rollupOptions: {
      treeshake: {
        moduleSideEffects: (id) => {
          // Keep these modules even if unused
          return id.includes('polyfill') || id.includes('global');
        }
      }
    }
  }
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Code Splitting Strategies</h3>
        <p className="text-gray-700 mb-4">
          Split your code into smaller chunks for better performance.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Dynamic imports (route-based splitting)
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}

// Component-based splitting
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));

function App() {
  const [showHeavy, setShowHeavy] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>Load Heavy Component</button>
      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}

// Manual chunk splitting (vite.config.js)
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@mui/material', '@mui/icons-material'],
          'utils-vendor': ['lodash-es', 'date-fns'],
          
          // Feature chunks
          'auth': ['./src/features/auth'],
          'dashboard': ['./src/features/dashboard'],
          'settings': ['./src/features/settings']
        }
      }
    }
  }
});

// Function-based manual chunks
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Node modules
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@mui')) {
              return 'ui-vendor';
            }
            return 'vendor';
          }
          
          // Feature-based splitting
          if (id.includes('/features/auth/')) {
            return 'auth';
          }
          if (id.includes('/features/dashboard/')) {
            return 'dashboard';
          }
        }
      }
    }
  }
});

// Preloading chunks
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));

// Preload on hover
<Link 
  to="/about"
  onMouseEnter={() => import('./pages/About')}
>
  About
</Link>

// Prefetch chunks
<link rel="prefetch" href="/assets/about-chunk.js" />

// React.lazy with named exports
const Component = lazy(() => 
  import('./Component').then(module => ({ default: module.Component }))
);

// Multiple lazy components
const [Component1, Component2] = await Promise.all([
  import('./Component1').then(m => m.Component1),
  import('./Component2').then(m => m.Component2)
]);

// Error boundaries for lazy loading
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary fallback={<div>Error loading component</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default BuildConfiguration;

