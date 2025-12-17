import { useState } from 'react';

function TailwindCSS() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Tailwind CSS</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Utility-First Approach</h3>
        <p className="text-gray-700 mb-4">
          Tailwind CSS uses utility classes to build custom designs without writing CSS.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Traditional CSS
.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}

// Tailwind CSS (utility-first)
<button className="px-5 py-2 bg-blue-500 text-white rounded">
  Click me
</button>

// Responsive utilities
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

// State variants
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2">
  Button
</button>

// Spacing utilities
<div className="p-4 m-2 space-y-4">
  <div className="pt-2 pb-4">Content</div>
</div>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Custom Configuration</h3>
        <p className="text-gray-700 mb-4">
          Tailwind is highly customizable through its configuration file.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... more shades
          900: '#1e3a8a',
        },
        brand: '#007bff',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

// Using custom values
<div className="bg-primary-500 text-brand p-72">
  Custom styled
</div>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Component Patterns</h3>
        <p className="text-gray-700 mb-4">
          Create reusable component patterns with Tailwind utilities.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Component with variants
function Button({ variant = 'default', size = 'md', children }) {
  const baseClasses = 'font-semibold rounded transition-colors';
  
  const variants = {
    default: 'bg-gray-200 hover:bg-gray-300',
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button className={\`\${baseClasses} \${variants[variant]} \${sizes[size]}\`}>
      {children}
    </button>
  );
}

// Using clsx or classnames
import clsx from 'clsx';

function Button({ variant, size, disabled, children }) {
  return (
    <button
      className={clsx(
        'font-semibold rounded transition-colors',
        {
          'bg-blue-500 hover:bg-blue-600 text-white': variant === 'primary',
          'bg-gray-200 hover:bg-gray-300': variant === 'default',
          'opacity-50 cursor-not-allowed': disabled,
        },
        size === 'sm' && 'px-3 py-1 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg'
      )}
    >
      {children}
    </button>
  );
}

// Card component pattern
function Card({ children, className }) {
  return (
    <div className={clsx(
      'bg-white rounded-lg shadow-md p-6',
      className
    )}>
      {children}
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">JIT Mode</h3>
        <p className="text-gray-700 mb-4">
          Just-In-Time mode generates styles on-demand for faster builds.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// tailwind.config.js (Tailwind v3+)
module.exports = {
  mode: 'jit', // JIT is default in v3+
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // ... rest of config
}

// Benefits:
// - Faster build times
// - Smaller CSS output
// - Arbitrary values
// - Pseudo-variant combinations

// Arbitrary values (JIT only)
<div className="w-[123px] h-[456px] bg-[#bada55]">
  Custom values
</div>

// Complex pseudo-variant combinations
<button className="hover:focus:active:bg-blue-500">
  Complex state
</button>

// Dynamic classes (JIT)
<div className={\`bg-\${color}-500\`}>
  Dynamic
</div>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Directives and Functions</h3>
        <p className="text-gray-700 mb-4">
          Use Tailwind directives in CSS files for custom styles.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// Custom components
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}

// Custom utilities
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

// Using @apply
.button {
  @apply px-4 py-2 rounded font-semibold;
  @apply bg-blue-500 text-white;
  @apply hover:bg-blue-600 focus:outline-none focus:ring-2;
}

// Responsive variants
.responsive {
  @apply text-sm md:text-base lg:text-lg;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
            <li><strong>Use component extraction:</strong> Extract repeated patterns into components</li>
            <li><strong>Avoid inline styles:</strong> Use Tailwind utilities instead</li>
            <li><strong>Use @apply sparingly:</strong> Only for truly reusable patterns</li>
            <li><strong>Leverage JIT:</strong> Use arbitrary values when needed</li>
            <li><strong>Organize classes:</strong> Group related utilities together</li>
            <li><strong>Use responsive prefixes:</strong> Mobile-first approach</li>
            <li><strong>Customize theme:</strong> Extend default theme for brand consistency</li>
            <li><strong>Purge unused styles:</strong> Configure content paths correctly</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default TailwindCSS;

