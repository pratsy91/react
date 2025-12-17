import { useState } from 'react';

function Deployment() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Deployment</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Vercel</h3>
        <p className="text-gray-700 mb-4">
          Deploy React apps to Vercel with zero configuration.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install -g vercel

// Deploy
vercel

// Deploy to production
vercel --prod

// vercel.json (optional configuration)
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "env": {
    "VITE_API_URL": "https://api.example.com"
  }
}

// Environment variables
// Set in Vercel dashboard or CLI
vercel env add VITE_API_URL

// Preview deployments
// Automatically creates preview for every PR

// Custom domains
// Add in Vercel dashboard under Project Settings > Domains

// Serverless functions (if needed)
// api/hello.js
export default function handler(req, res) {
  res.json({ message: 'Hello' });
}

// Build settings
// Framework Preset: Vite
// Build Command: npm run build
// Output Directory: dist
// Install Command: npm install`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Netlify</h3>
        <p className="text-gray-700 mb-4">
          Deploy to Netlify with continuous deployment.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install -g netlify-cli

// Deploy
netlify deploy

// Deploy to production
netlify deploy --prod

// netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"

# Environment variables
# Set in Netlify dashboard: Site Settings > Environment Variables

# Build settings
# Build command: npm run build
# Publish directory: dist
# Node version: 18

# Netlify Functions (if needed)
# netlify/functions/hello.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello' })
  };
};

# Split testing
[[redirects]]
  from = "/"
  to = "/index.html"
  status = 200
  force = false

# Form handling
# Automatically handles form submissions

# Identity (authentication)
# Enable in Netlify dashboard`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Railway</h3>
        <p className="text-gray-700 mb-4">
          Deploy full-stack apps to Railway.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install -g @railway/cli

// Login
railway login

// Initialize
railway init

// Deploy
railway up

// railway.json (optional)
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}

// Environment variables
// Set in Railway dashboard or CLI
railway variables set VITE_API_URL=https://api.example.com

// Static site deployment
// For React apps, Railway can serve static files
// Set start command: npx serve dist

// Dockerfile (alternative)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]

// Railway automatically detects:
// - package.json
// - Dockerfile
// - Build commands
// - Start commands`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Docker Containerization</h3>
        <p className="text-gray-700 mb-4">
          Containerize your React app with Docker.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Dockerfile (multi-stage build)
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

// nginx.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

// .dockerignore
node_modules
dist
.git
.env
*.log
.DS_Store

// Build and run
docker build -t my-react-app .
docker run -p 80:80 my-react-app

// Docker Compose
// docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://api:3000
    volumes:
      - ./dist:/usr/share/nginx/html

// Build with docker-compose
docker-compose up --build

// Production Dockerfile (optimized)
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">CI/CD Pipelines</h3>
        <p className="text-gray-700 mb-4">
          Set up continuous integration and deployment.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// GitHub Actions
// .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: vercel/action@v1
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}

// GitLab CI
// .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test
    - npm run build

deploy:
  stage: deploy
  image: node:18
  script:
    - npm ci
    - npm run build
    - npm install -g vercel
    - vercel --prod --token \$VERCEL_TOKEN
  only:
    - main

// CircleCI
// .circleci/config.yml
version: 2.1

jobs:
  test:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm ci
      - run: npm run build
      - run: npm install -g vercel
      - run: vercel --prod --token \$VERCEL_TOKEN

workflows:
  version: 2
  test-and-deploy:
    jobs:
      - test
      - deploy:
          requires:
            - test
          filters:
            branches:
              only: main`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Environment Management</h3>
        <p className="text-gray-700 mb-4">
          Manage environment variables across different environments.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Environment configuration
// config/env.js
const env = {
  development: {
    API_URL: 'http://localhost:3000',
    DEBUG: true
  },
  staging: {
    API_URL: 'https://api.staging.com',
    DEBUG: true
  },
  production: {
    API_URL: 'https://api.production.com',
    DEBUG: false
  }
};

const currentEnv = import.meta.env.MODE || 'development';
export default env[currentEnv];

// Type-safe env access
// env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEBUG: string;
}

// Environment validation
// utils/env.js
function validateEnv() {
  const required = ['VITE_API_URL'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(\`Missing env variables: \${missing.join(', ')}\`);
  }
}

validateEnv();

// Environment-specific builds
// package.json
{
  "scripts": {
    "build:dev": "vite build --mode development",
    "build:staging": "vite build --mode staging",
    "build:prod": "vite build --mode production"
  }
}

// Runtime environment detection
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;
const mode = import.meta.env.MODE;

// Secure environment variables
// Never expose secrets in client-side code
// Use server-side environment variables for sensitive data

// Environment variable precedence
// 1. .env.local (highest priority, gitignored)
// 2. .env.[mode].local
// 3. .env.[mode]
// 4. .env (lowest priority)`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Monitoring</h3>
        <p className="text-gray-700 mb-4">
          Monitor your application's performance in production.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Web Vitals
// npm install web-vitals
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onFCP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);

// Performance API
// Measure page load time
window.addEventListener('load', () => {
  const perfData = performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log('Page load time:', pageLoadTime);
});

// Measure custom operations
const markStart = performance.mark('operation-start');
// ... operation
const markEnd = performance.mark('operation-end');
performance.measure('operation', 'operation-start', 'operation-end');
const measure = performance.getEntriesByName('operation')[0];
console.log('Operation duration:', measure.duration);

// React Profiler
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id);
  console.log('Phase:', phase);
  console.log('Duration:', actualDuration);
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>

// Error tracking (Sentry)
// npm install @sentry/react
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_DSN',
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter sensitive data
    return event;
  }
});

// Logging service
// Custom logger
const logger = {
  info: (message, data) => {
    if (import.meta.env.DEV) {
      console.log('[INFO]', message, data);
    }
    // Send to logging service in production
  },
  error: (error, context) => {
    console.error('[ERROR]', error, context);
    // Send to error tracking service
  }
};

// Analytics
// Google Analytics
import ReactGA from 'react-ga4';

ReactGA.initialize('GA_MEASUREMENT_ID');
ReactGA.send('pageview');

// Track events
ReactGA.event({
  category: 'User',
  action: 'Click',
  label: 'Button'
});

// Performance budgets
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Enforce chunk size limits
        }
      }
    },
    chunkSizeWarningLimit: 500 // Warn if chunk > 500kb
  }
});

// Lighthouse CI
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['https://your-app.com'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }]
      }
    }
  }
};`}</pre>
        </div>
      </section>
    </div>
  );
}

export default Deployment;

