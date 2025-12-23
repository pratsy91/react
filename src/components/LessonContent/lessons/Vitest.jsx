import { useState } from 'react';

function Vitest() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Vitest</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Vitest</h3>
        <p className="text-blue-800 mb-2">
          Vitest is a blazing-fast unit test framework powered by Vite. It's designed to be a drop-in replacement for Jest when 
          using Vite as your build tool. Vitest leverages Vite's speed and native ESM support to provide incredibly fast test 
          execution and hot module reloading for tests.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Jest Compatible API:</strong> Same API as Jest, easy migration</li>
            <li><strong>Vite Powered:</strong> Uses Vite's fast HMR and ESM support</li>
            <li><strong>Fast Execution:</strong> Significantly faster than Jest</li>
            <li><strong>TypeScript Support:</strong> Native TypeScript support without configuration</li>
            <li><strong>Watch Mode:</strong> Fast watch mode with HMR for tests</li>
            <li><strong>Built-in Coverage:</strong> Integrated code coverage support</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Much faster test execution than Jest</li>
            <li>Same API as Jest - easy to migrate</li>
            <li>Native ESM support</li>
            <li>Works seamlessly with Vite projects</li>
            <li>Fast watch mode with HMR</li>
            <li>TypeScript support out of the box</li>
            <li>Built-in UI for viewing test results</li>
          </ul>
          <p className="mt-2"><strong>When to Use Vitest:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>When using Vite as your build tool</li>
            <li>When you need fast test execution</li>
            <li>For new projects looking for modern testing tools</li>
            <li>When migrating from Jest in Vite projects</li>
            <li>When you need ESM support for tests</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Test Setup</h3>
        <p className="text-gray-700 mb-4">
          Vitest is a fast unit test framework powered by Vite.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install -D vitest @vitest/ui

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});

// vitest.config.js (alternative)
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom'
  }
});

// Basic test file
import { describe, it, expect } from 'vitest';

describe('Math operations', () => {
  it('should add two numbers', () => {
    expect(1 + 1).toBe(2);
  });
});

// Run tests
// npm run test (add to package.json: "test": "vitest")
// npm run test:ui (for UI: "test:ui": "vitest --ui")
// npm run test:coverage (for coverage: "test:coverage": "vitest --coverage")`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Assertions</h3>
        <p className="text-gray-700 mb-4">
          Vitest uses the same assertion API as Jest, powered by Chai.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { expect, test } from 'vitest';

// Basic assertions
expect(2 + 2).toBe(4);
expect('hello').toBe('hello');
expect(true).toBeTruthy();
expect(false).toBeFalsy();
expect(null).toBeNull();
expect(undefined).toBeUndefined();

// Object/Array assertions
expect({ name: 'John' }).toEqual({ name: 'John' });
expect([1, 2, 3]).toContain(2);
expect({ a: 1, b: 2 }).toHaveProperty('a');
expect({ a: 1, b: 2 }).toHaveProperty('a', 1);

// String assertions
expect('hello world').toContain('world');
expect('hello').toMatch(/^he/);
expect('HELLO').toMatch(/hello/i);

// Number assertions
expect(2.5).toBeGreaterThan(2);
expect(2.5).toBeGreaterThanOrEqual(2);
expect(2).toBeLessThan(3);
expect(2).toBeLessThanOrEqual(2);
expect(0.1 + 0.2).toBeCloseTo(0.3, 5);

// Error assertions
expect(() => {
  throw new Error('error');
}).toThrow();
expect(() => {
  throw new Error('error');
}).toThrow('error');
expect(() => {
  throw new Error('error');
}).toThrowErrorMatchingSnapshot();

// Async assertions
await expect(Promise.resolve('value')).resolves.toBe('value');
await expect(Promise.reject('error')).rejects.toBe('error');

// Negation
expect(2 + 2).not.toBe(5);
expect('hello').not.toContain('world');`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Mocking</h3>
        <p className="text-gray-700 mb-4">
          Vitest provides powerful mocking capabilities.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { vi } from 'vitest';

// Mock functions
const mockFn = vi.fn();
mockFn('arg1', 'arg2');
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledTimes(1);

// Mock return value
const mockFn = vi.fn(() => 'return value');
expect(mockFn()).toBe('return value');

// Mock implementation
const mockFn = vi.fn().mockImplementation((arg) => arg * 2);
expect(mockFn(2)).toBe(4);

// Mock return values
const mockFn = vi.fn()
  .mockReturnValueOnce('first')
  .mockReturnValueOnce('second')
  .mockReturnValue('default');

// Mock modules
vi.mock('./api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ name: 'John' }))
}));

// Partial mock
vi.mock('./utils', async () => {
  const actual = await vi.importActual('./utils');
  return {
    ...actual,
    specificFunction: vi.fn()
  };
});

// Mock timers
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();

// Mock Date
const mockDate = new Date('2023-01-01');
vi.setSystemTime(mockDate);
vi.useRealTimers();

// Mock global objects
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' })
  })
);

// Spy on methods
const obj = { method: () => 'original' };
const spy = vi.spyOn(obj, 'method');
obj.method();
expect(spy).toHaveBeenCalled();

// Clear mocks
vi.clearAllMocks();
vi.resetAllMocks();
mockFn.mockClear();
mockFn.mockReset();
mockFn.mockRestore();`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Coverage</h3>
        <p className="text-gray-700 mb-4">
          Generate code coverage reports with Vitest.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Install coverage provider
npm install -D @vitest/coverage-v8

// vite.config.js
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/**'
      ],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
});

// Run coverage
npm run test:coverage

// Coverage options
coverage: {
  // Which files to include
  include: ['src/**/*.{js,jsx}'],
  
  // Which files to exclude
  exclude: ['**/*.test.{js,jsx}'],
  
  // Coverage thresholds
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 80,
    statements: 80,
    // Per-file thresholds
    'src/utils.js': {
      lines: 90,
      functions: 90
    }
  },
  
  // Reporters
  reporter: ['text', 'json', 'html', 'lcov'],
  
  // Show uncovered lines
  reportOnFailure: true,
  
  // Skip full coverage
  skipFull: false
}

// Coverage commands
// "test:coverage": "vitest --coverage"
// "test:coverage:ui": "vitest --coverage --ui"`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Test Hooks</h3>
        <p className="text-gray-700 mb-4">
          Use hooks to set up and tear down tests.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`import { beforeAll, afterAll, beforeEach, afterEach, describe, it } from 'vitest';

// Run once before all tests
beforeAll(() => {
  // Setup
});

// Run once after all tests
afterAll(() => {
  // Cleanup
});

// Run before each test
beforeEach(() => {
  // Reset state
});

// Run after each test
afterEach(() => {
  // Cleanup
});

// Example
describe('Database tests', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });
  
  afterAll(async () => {
    await disconnectFromDatabase();
  });
  
  beforeEach(() => {
    clearDatabase();
  });
  
  it('should insert data', () => {
    // Test
  });
});

// Conditional hooks
beforeAll(() => {
  if (process.env.NODE_ENV === 'test') {
    // Setup
  }
});

// Async hooks
beforeAll(async () => {
  await setup();
});`}</pre>
        </div>
      </section>
    </div>
  );
}

export default Vitest;

