import { useState } from 'react';

function DocumentMetadata() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Document Metadata</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Built-in Title Support</h3>
        <p className="text-gray-700 mb-4">
          React 19 adds built-in support for document title and metadata.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Document Title
// Set title directly in component

function Page() {
  return (
    <>
      <title>My Page Title</title>
      <div>Content</div>
    </>
  );
}

// Multiple Titles
// React merges titles from components
function App() {
  return (
    <>
      <title>App</title>
      <Page>
        <title>Page</title>
        {/* Final title: "Page | App" */}
      </Page>
    </>
  );
}

// Dynamic Title
function ProductPage({ product }) {
  return (
    <>
      <title>{product.name} - Store</title>
      <div>{product.description}</div>
    </>
  );
}

// Async Title
async function ProductPage({ id }) {
  const product = await fetchProduct(id);
  
  return (
    <>
      <title>{product.name}</title>
      <div>{product.description}</div>
    </>
  );
}

// Title Priority
// More specific titles override general ones
function App() {
  return (
    <>
      <title>My App</title>
      <Routes>
        <Route path="/about" element={<About />} />
        {/* About can override title */}
      </Routes>
    </>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Meta Tags</h3>
        <p className="text-gray-700 mb-4">
          Built-in support for meta tags in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Meta Tags
// Declare meta tags in components

function Page() {
  return (
    <>
      <meta name="description" content="Page description" />
      <meta name="keywords" content="react, javascript" />
      <meta name="author" content="Author Name" />
      <div>Content</div>
    </>
  );
}

// Open Graph Tags
function ArticlePage({ article }) {
  return (
    <>
      <title>{article.title}</title>
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.excerpt} />
      <meta property="og:image" content={article.image} />
      <meta property="og:type" content="article" />
      <div>{article.content}</div>
    </>
  );
}

// Twitter Card Tags
function ProductPage({ product }) {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={product.name} />
      <meta name="twitter:description" content={product.description} />
      <meta name="twitter:image" content={product.image} />
      <div>{product.content}</div>
    </>
  );
}

// Viewport Meta
function App() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <div>App content</div>
    </>
  );
}

// Charset
function App() {
  return (
    <>
      <meta charSet="utf-8" />
      <div>App content</div>
    </>
  );
}

// Multiple Meta Tags
// React merges meta tags from components
function App() {
  return (
    <>
      <meta name="description" content="App description" />
      <Page>
        <meta name="description" content="Page description" />
        {/* Page description overrides app description */}
      </Page>
    </>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Async Metadata</h3>
        <p className="text-gray-700 mb-4">
          Support for async metadata in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Async Metadata
// Fetch data and set metadata

async function ProductPage({ id }) {
  const product = await fetchProduct(id);
  
  return (
    <>
      <title>{product.name}</title>
      <meta name="description" content={product.description} />
      <meta property="og:image" content={product.image} />
      <div>{product.content}</div>
    </>
  );
}

// Server Components
// Metadata works in Server Components
async function BlogPost({ slug }) {
  const post = await getPost(slug);
  
  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <meta name="author" content={post.author} />
      <article>{post.content}</article>
    </>
  );
}

// Dynamic Metadata
async function UserProfile({ userId }) {
  const user = await fetchUser(userId);
  
  return (
    <>
      <title>{'{user.name}\'s Profile'}</title>
      <meta name="description" content={\`Profile of \${'{user.name}'}\`} />
      <meta property="og:title" content={\`\${'{user.name}'} on Platform\`} />
      <div>{/* Profile content */}</div>
    </>
  );
}

// Error Handling
async function Page({ id }) {
  try {
    const data = await fetchData(id);
    return (
      <>
        <title>{data.title}</title>
        <div>{data.content}</div>
      </>
    );
  } catch (error) {
    return (
      <>
        <title>Error</title>
        <div>Failed to load</div>
      </>
    );
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Document Head Management</h3>
        <p className="text-gray-700 mb-4">
          How React 19 manages document head elements.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Head Management
// React automatically manages <head>

// No need for react-helmet or similar
// Just use <title> and <meta> in components

function App() {
  return (
    <>
      <title>My App</title>
      <meta name="description" content="App description" />
      <div>App content</div>
    </>
  );
}

// Automatic Merging
// React merges metadata from component tree
function Layout({ children }) {
  return (
    <>
      <title>Site Name</title>
      <meta name="description" content="Site description" />
      {children}
    </>
  );
}

function Page() {
  return (
    <>
      <title>Page Title</title>
      <meta name="description" content="Page description" />
      <div>Page content</div>
    </>
  );
}

// Final head:
// <title>Page Title | Site Name</title>
// <meta name="description" content="Page description" />

// Link Tags
function App() {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/styles.css" />
      <div>App</div>
    </>
  );
}

// Script Tags
function App() {
  return (
    <>
      <script src="/analytics.js" />
      <div>App</div>
    </>
  );
}

// Style Tags
function App() {
  return (
    <>
      <style>{'body { margin: 0; }'}</style>
      <div>App</div>
    </>
  );
}

// Priority and Override
// Child components can override parent metadata
function Layout({ children }) {
  return (
    <>
      <title>Default Title</title>
      {children}
    </>
  );
}

function Page() {
  return (
    <>
      <title>Page Title</title>
      {/* Overrides "Default Title" */}
    </>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">SEO Improvements</h3>
        <p className="text-gray-700 mb-4">
          SEO benefits of built-in metadata support.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// SEO Benefits
// - Server-rendered metadata
// - Proper meta tags
// - Open Graph support
// - Twitter Cards
// - Structured data

// Complete SEO Setup
function ArticlePage({ article }) {
  return (
    <>
      <title>{article.title}</title>
      <meta name="description" content={article.excerpt} />
      <meta name="keywords" content={article.tags.join(', ')} />
      <meta name="author" content={article.author} />
      
      {/* Open Graph */}
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.excerpt} />
      <meta property="og:image" content={article.image} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={article.url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={article.title} />
      <meta name="twitter:description" content={article.excerpt} />
      <meta name="twitter:image" content={article.image} />
      
      <article>{article.content}</article>
    </>
  );
}

// Dynamic SEO
async function ProductPage({ id }) {
  const product = await fetchProduct(id);
  
  return (
    <>
      <title>{product.name} - Buy Now</title>
      <meta name="description" content={product.description} />
      <meta property="og:title" content={product.name} />
      <meta property="og:price:amount" content={product.price} />
      <meta property="og:price:currency" content="USD" />
      <div>{product.content}</div>
    </>
  );
}

// Best Practices
// 1. Always include title
// 2. Add description meta
// 3. Include Open Graph tags
// 4. Add Twitter Card tags
// 5. Use structured data
// 6. Optimize images
// 7. Include canonical URLs`}</pre>
        </div>
      </section>
    </div>
  );
}

export default DocumentMetadata;

