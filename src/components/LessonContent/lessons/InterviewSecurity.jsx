function InterviewSecurity() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Security - Interview Cheatsheet</h2>
        <p className="text-gray-700">Security best practices for React applications</p>
      </div>

      {/* XSS Prevention */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">XSS Prevention</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Dangerous:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> dangerouslySetInnerHTML bypasses React's automatic escaping, allowing raw HTML injection. If userInput contains malicious script tags, they will execute. This is a major XSS (Cross-Site Scripting) vulnerability. Never use dangerouslySetInnerHTML with user-generated content without sanitization. Attackers can inject scripts that steal cookies, redirect users, or perform actions on their behalf. Always sanitize HTML before using dangerouslySetInnerHTML.</p>
            </div>
            <pre className="bg-gray-800 text-red-400 p-4 rounded overflow-x-auto text-sm">
{`// NEVER do this with user input
<div dangerouslySetInnerHTML={{ __html: userInput }} />`}
            </pre>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Safe:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React automatically escapes content in {'{}'} brackets, converting dangerous characters like {'<'} to &lt;. This prevents XSS attacks. If you must render HTML, use DOMPurify.sanitize() to remove dangerous elements and attributes while keeping safe HTML. DOMPurify uses a whitelist approach, only allowing safe tags and attributes. This is the secure way to render user-generated HTML content. Always sanitize on both client and server side.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// React automatically escapes
<div>{userInput}</div>

// If you must use HTML, sanitize first
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput) 
}} />`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>React automatically escapes content in {`{}`}</li>
              <li>Avoid dangerouslySetInnerHTML unless absolutely necessary</li>
              <li>Sanitize HTML if you must use it</li>
              <li>Validate and sanitize user input on the server</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CSRF Protection */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">CSRF Protection</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Strategies:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Use CSRF tokens from server</li>
              <li>SameSite cookie attribute</li>
              <li>Verify origin/referer headers</li>
              <li>Use POST for state-changing operations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Token Storage */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Token Storage</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Avoid:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>localStorage for sensitive tokens (XSS vulnerable)</li>
              <li>sessionStorage for long-lived tokens</li>
              <li>Storing tokens in component state</li>
            </ul>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Use httpOnly cookies for sensitive tokens</li>
              <li>Store refresh tokens securely</li>
              <li>Use secure, sameSite cookie flags</li>
              <li>Implement token rotation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Content Security Policy */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Content Security Policy (CSP)</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Implementation:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Content Security Policy (CSP) is a security header that restricts which resources can be loaded and executed. default-src 'self' only allows resources from same origin. script-src controls which scripts can execute. 'unsafe-inline' allows inline scripts (use with caution). CSP prevents XSS by blocking unauthorized script execution. Set CSP via meta tag in HTML or HTTP headers. Strict CSP significantly reduces XSS attack surface. Configure CSP carefully to balance security and functionality.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// In index.html or server headers
<meta httpEquiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';" />`}
            </pre>
          </div>
        </div>
      </section>

      {/* Input Sanitization */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Input Sanitization</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Sanitization Example:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> DOMPurify sanitizes HTML by removing dangerous elements and attributes. ALLOWED_TAGS whitelist specifies which HTML tags are safe (only 'b', 'i', 'em', 'strong', 'a' allowed here). ALLOWED_ATTR whitelist specifies which attributes are safe (only 'href' on anchor tags). All other tags and attributes are stripped. This whitelist approach is more secure than blacklisting. Sanitization happens before dangerouslySetInnerHTML, ensuring only safe HTML is rendered. Always use whitelist approach for maximum security.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import DOMPurify from 'dompurify';

function SafeHTML({ html }) {
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  });
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Sanitize on both client and server</li>
              <li>Use whitelist approach (allow only safe tags)</li>
              <li>Validate input before sanitization</li>
              <li>Escape special characters</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Secure Authentication Patterns */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Authentication Patterns</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Token Management:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> credentials: 'include' sends cookies (including httpOnly cookies) with requests. httpOnly cookies cannot be accessed via JavaScript, protecting tokens from XSS attacks. Store tokens in httpOnly cookies set by the server, never in localStorage or sessionStorage. Tokens in httpOnly cookies are automatically sent with requests but invisible to JavaScript. This prevents token theft via XSS. The server sets the cookie with httpOnly flag, and the browser handles it securely. This is the recommended approach for authentication tokens.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Secure token handling
function useAuth() {
  const login = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include', // Send cookies
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    // Token stored in httpOnly cookie by server
    // Never expose in localStorage
  };
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Use httpOnly cookies for tokens</li>
              <li>Implement token refresh mechanism</li>
              <li>Handle token expiration gracefully</li>
              <li>Never expose tokens in URLs or logs</li>
              <li>Use HTTPS only</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Environment Variable Security */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Environment Variable Security</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold mb-2">❌ Never expose:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>API keys or secrets in client-side code</li>
              <li>Private keys or passwords</li>
              <li>Database credentials</li>
              <li>JWT secrets</li>
            </ul>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold mb-2">✅ Safe to expose:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Public API endpoints</li>
              <li>Feature flags</li>
              <li>Public configuration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* API Security Practices */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">API Security Practices</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Always use HTTPS</li>
              <li>Validate API responses</li>
              <li>Implement rate limiting</li>
              <li>Use CORS properly</li>
              <li>Sanitize API responses</li>
              <li>Handle errors securely (don't expose internals)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Secure Coding Patterns */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Coding Patterns</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Patterns:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Never trust client-side input</li>
              <li>Always validate and sanitize</li>
              <li>Use Content Security Policy</li>
              <li>Implement proper error handling</li>
              <li>Use secure defaults</li>
              <li>Keep dependencies updated</li>
              <li>Regular security audits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Dependency Security */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Dependency Security</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Keep dependencies updated</li>
              <li>Use npm audit or similar tools</li>
              <li>Review dependencies before adding</li>
              <li>Use lock files (package-lock.json)</li>
              <li>Automate security scanning in CI/CD</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you prevent XSS in React?</p>
            <p className="text-gray-700">A: React automatically escapes content. Avoid dangerouslySetInnerHTML, sanitize HTML if needed, and validate/sanitize user input on the server.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewSecurity;

