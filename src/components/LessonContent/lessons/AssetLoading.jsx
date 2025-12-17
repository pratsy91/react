import { useState } from 'react';

function AssetLoading() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Asset Loading</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Resource Hints</h3>
        <p className="text-gray-700 mb-4">
          React 19 improves resource hints for better performance.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Resource Hints
// Optimize asset loading

// Preload
<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossOrigin />
<link rel="preload" href="/image.jpg" as="image" />
<link rel="preload" href="/script.js" as="script" />

// Prefetch
<link rel="prefetch" href="/next-page.html" />
<link rel="prefetch" href="/api/data" />

// DNS Prefetch
<link rel="dns-prefetch" href="https://api.example.com" />

// Preconnect
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://api.example.com" crossOrigin />

// Module Preload
<link rel="modulepreload" href="/module.js" />

// React 19 Support
// Built-in support for resource hints
function App() {
  return (
    <>
      <link rel="preload" href="/critical.css" as="style" />
      <link rel="prefetch" href="/next-page.js" as="script" />
      <Content />
    </>
  );
}

// Dynamic Resource Hints
function App({ nextPage }) {
  return (
    <>
      <link rel="prefetch" href={nextPage} />
      <Content />
    </>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Preloading</h3>
        <p className="text-gray-700 mb-4">
          Preloading critical assets in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Preloading
// Load critical assets early

// Preload Critical CSS
function App() {
  return (
    <>
      <link rel="preload" href="/critical.css" as="style" />
      <link rel="stylesheet" href="/critical.css" />
      <Content />
    </>
  );
}

// Preload Fonts
function App() {
  return (
    <>
      <link
        rel="preload"
        href="/font.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <Content />
    </>
  );
}

// Preload Images
function App() {
  return (
    <>
      <link rel="preload" href="/hero.jpg" as="image" />
      <img src="/hero.jpg" alt="Hero" />
    </>
  );
}

// Preload Scripts
function App() {
  return (
    <>
      <link rel="preload" href="/analytics.js" as="script" />
      <script src="/analytics.js" />
    </>
  );
}

// Conditional Preloading
function App({ showFeature }) {
  return (
    <>
      {showFeature && (
        <link rel="preload" href="/feature.js" as="script" />
      )}
      <Content />
    </>
  );
}

// Preload with Priority
// Browser respects preload hints
function App() {
  return (
    <>
      <link rel="preload" href="/critical.js" as="script" />
      <link rel="preload" href="/secondary.js" as="script" />
      <Content />
    </>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Image Optimization</h3>
        <p className="text-gray-700 mb-4">
          Image loading improvements in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Image Optimization
// Better image loading

// Native Image Loading
// React 19 supports native loading attribute
function ImageComponent() {
  return (
    <img
      src="/image.jpg"
      alt="Description"
      loading="lazy"
      decoding="async"
    />
  );
}

// Eager Loading
function HeroImage() {
  return (
    <img
      src="/hero.jpg"
      alt="Hero"
      loading="eager"
      fetchPriority="high"
    />
  );
}

// Lazy Loading
function Gallery() {
  return (
    <div>
      {images.map(img => (
        <img
          key={img.id}
          src={img.src}
          alt={img.alt}
          loading="lazy"
        />
      ))}
    </div>
  );
}

// Responsive Images
function ResponsiveImage() {
  return (
    <img
      src="/image.jpg"
      srcSet="/image-400.jpg 400w, /image-800.jpg 800w"
      sizes="(max-width: 600px) 400px, 800px"
      alt="Responsive"
      loading="lazy"
    />
  );
}

// Image Preloading
function App() {
  return (
    <>
      <link rel="preload" href="/hero.jpg" as="image" />
      <img src="/hero.jpg" alt="Hero" />
    </>
  );
}

// Image with Suspense
function ImageWithSuspense() {
  return (
    <Suspense fallback={<ImageSkeleton />}>
      <img src="/image.jpg" alt="Image" />
    </Suspense>
  );
}

// WebP Support
function OptimizedImage() {
  return (
    <picture>
      <source srcSet="/image.webp" type="image/webp" />
      <img src="/image.jpg" alt="Image" loading="lazy" />
    </picture>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Font Loading</h3>
        <p className="text-gray-700 mb-4">
          Font loading optimizations in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Font Loading
// Optimize font loading

// Preload Fonts
function App() {
  return (
    <>
      <link
        rel="preload"
        href="/font.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <style>
        {\`@font-face {
          font-family: 'Custom';
          src: url('/font.woff2') format('woff2');
        }\`}
      </style>
      <Content />
    </>
  );
}

// Font Display
function App() {
  return (
    <>
      <style>
        {\`@font-face {
          font-family: 'Custom';
          src: url('/font.woff2') format('woff2');
          font-display: swap;
        }\`}
      </style>
      <Content />
    </>
  );
}

// Font Display Options
// - auto: Browser default
// - block: Block text until font loads
// - swap: Show fallback, swap when loaded
// - fallback: Short block period, then swap
// - optional: Use fallback if font not ready

// Google Fonts
function App() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <Content />
    </>
  );
}

// Font Subsetting
// Load only needed characters
function App() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&text=Hello"
        rel="stylesheet"
      />
      <Content />
    </>
  );
}

// Font Loading with Suspense
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <FontLoader>
        <Content />
      </FontLoader>
    </Suspense>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Improvements</h3>
        <p className="text-gray-700 mb-4">
          Performance improvements from better asset loading.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Performance Improvements
// Better performance with optimized loading

// Faster Initial Load
// - Preload critical assets
// - Lazy load non-critical assets
// - Optimize image loading
// - Efficient font loading

// Reduced Layout Shift
// - Proper image dimensions
// - Font display strategies
// - Resource hints

// Better Core Web Vitals
// - Improved LCP (Largest Contentful Paint)
// - Better FID (First Input Delay)
// - Reduced CLS (Cumulative Layout Shift)

// Best Practices
// 1. Preload critical resources
// 2. Lazy load below-the-fold content
// 3. Use appropriate image formats
// 4. Optimize font loading
// 5. Use resource hints
// 6. Minimize render-blocking resources
// 7. Use code splitting

// Performance Checklist
// ✓ Preload critical CSS
// ✓ Preload critical fonts
// ✓ Lazy load images
// ✓ Use modern image formats
// ✓ Optimize font loading
// ✓ Use DNS prefetch for external resources
// ✓ Minimize render-blocking scripts
// ✓ Use code splitting`}</pre>
        </div>
      </section>
    </div>
  );
}

export default AssetLoading;

