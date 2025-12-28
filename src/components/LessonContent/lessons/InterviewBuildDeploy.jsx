function InterviewBuildDeploy() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Tools & Deployment - Interview Cheatsheet</h2>
        <p className="text-gray-700">Build tools and deployment strategies for React</p>
      </div>

      {/* Webpack vs Vite */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Webpack vs Vite</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Webpack:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Mature and stable</li>
                <li>Large plugin ecosystem</li>
                <li>Slower dev server</li>
                <li>Complex configuration</li>
                <li>Industry standard</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Vite:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Very fast dev server</li>
                <li>ESM-based</li>
                <li>Simpler configuration</li>
                <li>Modern tooling</li>
                <li>Great for new projects</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Optimization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Bundle Optimization</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Strategies:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Code splitting (React.lazy, route-based)</li>
              <li>Tree shaking (remove unused code)</li>
              <li>Minification and compression</li>
              <li>Dynamic imports</li>
              <li>Analyze bundle size (webpack-bundle-analyzer)</li>
              <li>Optimize images and assets</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Splitting Configuration */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Code Splitting Configuration</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Webpack SplitChunks:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Webpack's splitChunks automatically splits code into separate chunks. chunks: 'all' splits both async and sync imports. cacheGroups define splitting rules - vendor group matches node_modules, creating separate vendor bundle. This separates third-party code from app code, enabling better caching. Users download vendor bundle once, then only app code changes. Reduces bundle size and improves load times.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Automatically splits code. Separates vendor from app code. Better caching strategy. Reduces bundle size. Improves load performance.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Vite Code Splitting:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Vite uses Rollup for production builds. manualChunks allows explicit control over chunk splitting. You specify which modules go into which chunks. This gives precise control but requires manual configuration. Vite automatically splits node_modules, but manualChunks lets you customize further. Useful for separating large libraries or grouping related code together.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
};`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Manual control over chunks. Explicit module grouping. Custom splitting strategy. Vite uses Rollup for builds. More control than automatic splitting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tree Shaking */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Tree Shaking</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">How it Works:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Removes dead code (unused exports)</li>
              <li>Works with ES modules (import/export)</li>
              <li>Requires side-effect free code</li>
              <li>Enabled by default in modern bundlers</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Package.json Side Effects:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Tree shaking removes unused code, but only works if code has no side effects. sideEffects: false tells bundler all code is side-effect free and safe to tree-shake. If some files have side effects (like CSS imports, polyfills), list them in sideEffects array. Bundler will include these files even if they appear unused. This is critical for CSS modules and polyfills that must be included regardless of usage.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`{
  "sideEffects": false,
  // Or specify files with side effects:
  "sideEffects": [
    "*.css",
    "./src/polyfills.js"
  ]
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Enables tree shaking. false means all code is pure. Array lists files with side effects. Required for CSS and polyfills. Prevents removal of necessary code.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Build Optimization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Production Build Optimization</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Optimization Checklist:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Enable minification</li>
              <li>Enable compression (gzip/brotli)</li>
              <li>Remove console.logs</li>
              <li>Optimize images (WebP, lazy loading)</li>
              <li>Enable production mode</li>
              <li>Use source maps for debugging</li>
              <li>Set NODE_ENV=production</li>
            </ul>
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
REACT_APP_API_KEY=abc123

// In code
const apiUrl = process.env.REACT_APP_API_URL;

// Build time only (not in browser)
// Must start with REACT_APP_`}
            </pre>
          </div>
        </div>
      </section>

      {/* Deployment Platforms */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Deployment Platforms</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Popular Options:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>Vercel:</strong> Optimized for React, zero config</li>
              <li><strong>Netlify:</strong> Easy deployment, great DX</li>
              <li><strong>AWS Amplify:</strong> Full-stack deployment</li>
              <li><strong>GitHub Pages:</strong> Free, simple hosting</li>
              <li><strong>Docker:</strong> Container-based deployment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CI/CD */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">CI/CD Pipelines</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Typical Pipeline:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# GitHub Actions example
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
      - run: npm test
      - uses: deployment-action`}
            </pre>
          </div>
        </div>
      </section>

      {/* Docker Containerization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Docker Containerization</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Dockerfile Example:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
            </pre>
          </div>
        </div>
      </section>

      {/* Performance Monitoring */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Monitoring</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Tools and Metrics:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>Web Vitals:</strong> LCP, FID, CLS</li>
              <li><strong>React Profiler:</strong> Component performance</li>
              <li><strong>Lighthouse:</strong> Overall performance score</li>
              <li><strong>Real User Monitoring (RUM):</strong> Production metrics</li>
              <li><strong>Bundle Analyzer:</strong> Bundle size analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Error Tracking */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Error Tracking and Logging</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Error Tracking Setup:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Sentry example
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// Error boundary
<Sentry.ErrorBoundary fallback={ErrorFallback}>
  <App />
</Sentry.ErrorBoundary>`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Use error boundaries</li>
              <li>Log errors to monitoring service</li>
              <li>Include context and user info</li>
              <li>Filter sensitive data</li>
              <li>Set up alerts for critical errors</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewBuildDeploy;

