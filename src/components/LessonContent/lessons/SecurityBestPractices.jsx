import { useState } from 'react';

function SecurityBestPractices() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Security Best Practices</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">XSS Prevention</h3>
        <p className="text-gray-700 mb-4">
          Prevent Cross-Site Scripting (XSS) attacks in React.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// React automatically escapes content
// ✅ Safe - React escapes by default
<div>{userInput}</div>

// ❌ Dangerous - dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Safe HTML rendering
import DOMPurify from 'dompurify';

function SafeHTML({ html }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// URL sanitization
function SafeLink({ url, children }) {
  // Validate URL
  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return <span>{children}</span>;
    }
    return <a href={url}>{children}</a>;
  } catch {
    return <span>{children}</span>;
  }
}

// Content Security Policy
// Add to HTML head
<meta
  httpEquiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';"
/>

// Sanitize user input
function sanitizeInput(input) {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\\//g, '&#x2F;');
}

// Use libraries
// - DOMPurify for HTML sanitization
// - validator.js for input validation
// - xss for XSS prevention`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">CSRF Protection</h3>
        <p className="text-gray-700 mb-4">
          Protect against Cross-Site Request Forgery attacks.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// CSRF token
// Server sends token in cookie
// Client includes token in requests

function useCSRFToken() {
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    // Get token from cookie
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrf-token='))
      ?.split('=')[1];
    
    setToken(crfToken);
  }, []);
  
  return token;
}

// Include in requests
function apiRequest(url, options = {}) {
  const token = useCSRFToken();
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'X-CSRF-Token': token
    }
  });
}

// SameSite cookies
// Set cookie with SameSite attribute
// Set-Cookie: session=abc123; SameSite=Strict

// Double Submit Cookie pattern
// 1. Server sets cookie with random value
// 2. Client includes same value in form/header
// 3. Server verifies cookie and form value match

// Origin checking
function validateOrigin(origin) {
  const allowedOrigins = ['https://example.com'];
  return allowedOrigins.includes(origin);
}

// Custom headers
// Require custom headers for state-changing requests
fetch('/api/data', {
  method: 'POST',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Content Security Policy</h3>
        <p className="text-gray-700 mb-4">
          Implement Content Security Policy headers.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// CSP meta tag
<meta
  httpEquiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
/>

// Strict CSP
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join('; ');

// Nonce-based CSP
// Generate nonce for each request
const nonce = generateNonce();

// Include in CSP
script-src 'nonce-${nonce}'

// Include in script tags
<script nonce={nonce}>
  // Inline script
</script>

// Hash-based CSP
// Calculate hash of inline script
// script-src 'sha256-...'

// Report violations
Content-Security-Policy: default-src 'self'; report-uri /csp-report

// Report-only mode (testing)
Content-Security-Policy-Report-Only: default-src 'self'`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Authentication Patterns</h3>
        <p className="text-gray-700 mb-4">
          Implement secure authentication in React apps.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// JWT storage
// ❌ Don't store in localStorage (XSS vulnerable)
localStorage.setItem('token', token);

// ✅ Use httpOnly cookies (server sets)
// ✅ Or use memory (cleared on refresh)

// Token in memory
const [token, setToken] = useState(null);

// Secure token refresh
async function refreshToken() {
  try {
    const response = await fetch('/api/refresh', {
      method: 'POST',
      credentials: 'include' // Include cookies
    });
    const data = await response.json();
    setToken(data.token);
  } catch (error) {
    // Handle error
  }
}

// Password handling
// ❌ Never send passwords in query params
// ✅ Always use POST with HTTPS
// ✅ Hash on server, never on client

// Secure password input
<input
  type="password"
  autoComplete="current-password"
  // Never store in state unnecessarily
/>

// Session management
// Use secure, httpOnly cookies
// Set appropriate expiration
// Implement session timeout

// Multi-factor authentication
async function loginWithMFA(email, password, code) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, mfaCode: code })
  });
  return response.json();
}

// OAuth security
// Use PKCE for public clients
// Validate state parameter
// Verify redirect URIs

// Logout
async function logout() {
  await fetch('/api/logout', {
    method: 'POST',
    credentials: 'include'
  });
  // Clear client-side state
  setToken(null);
  setUser(null);
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Input Sanitization</h3>
        <p className="text-gray-700 mb-4">
          Sanitize and validate all user input.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Input validation
import validator from 'validator';

function validateEmail(email) {
  return validator.isEmail(email);
}

function validateInput(input, rules) {
  if (rules.required && !input) {
    return 'Required field';
  }
  if (rules.minLength && input.length < rules.minLength) {
    return \`Minimum \${rules.minLength} characters\`;
  }
  if (rules.maxLength && input.length > rules.maxLength) {
    return \`Maximum \${rules.maxLength} characters\`;
  }
  if (rules.pattern && !rules.pattern.test(input)) {
    return 'Invalid format';
  }
  return null;
}

// Sanitize strings
function sanitizeString(str) {
  return str
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 1000); // Limit length
}

// Sanitize numbers
function sanitizeNumber(value) {
  const num = Number(value);
  if (isNaN(num)) return null;
  return Math.max(0, Math.min(1000000, num)); // Clamp
}

// Sanitize URLs
function sanitizeURL(url) {
  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return null;
    }
    return urlObj.toString();
  } catch {
    return null;
  }
}

// SQL injection prevention
// Use parameterized queries on server
// Never concatenate user input into SQL

// NoSQL injection prevention
// Validate and sanitize before database queries
// Use parameterized queries

// File upload security
function validateFile(file) {
  const allowedTypes = ['image/jpeg', 'image/png'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return 'Invalid file type';
  }
  if (file.size > maxSize) {
    return 'File too large';
  }
  return null;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Dependency Security</h3>
        <p className="text-gray-700 mb-4">
          Keep dependencies secure and up to date.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// npm audit
npm audit

// Fix vulnerabilities
npm audit fix

// Check for updates
npm outdated

// Update dependencies
npm update

// Security scanning tools
// - npm audit
// - Snyk
// - Dependabot (GitHub)
// - WhiteSource
// - OWASP Dependency-Check

// .npmrc security
// Disable scripts from untrusted sources
enable-pre-post-scripts=false

// Use package-lock.json
// Ensures consistent dependency versions

// Dependency review
// Regularly review and update dependencies
// Remove unused dependencies
// Use exact versions for critical packages

// Automated security updates
// GitHub Dependabot
// .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"

// Snyk integration
// npm install -g snyk
snyk test
snyk monitor

// Check for known vulnerabilities
// Use tools to scan for CVEs
// Review security advisories

// Minimal dependencies
// Only install what you need
// Prefer well-maintained packages
// Check package maintenance status`}</pre>
        </div>
      </section>
    </div>
  );
}

export default SecurityBestPractices;

