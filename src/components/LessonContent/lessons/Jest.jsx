import { useState } from 'react';

function Jest() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Jest</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Jest</h3>
        <p className="text-blue-800 mb-2">
          Jest is a JavaScript testing framework developed by Facebook. It's a zero-configuration testing platform that works 
          out of the box for most JavaScript projects. Jest provides a complete testing solution with test runner, assertion library, 
          mocking capabilities, code coverage, and snapshot testing all built-in.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Zero Configuration:</strong> Works out of the box with minimal setup</li>
            <li><strong>Built-in Assertions:</strong> Rich assertion library included</li>
            <li><strong>Mocking:</strong> Powerful mocking capabilities for functions and modules</li>
            <li><strong>Code Coverage:</strong> Built-in code coverage reports</li>
            <li><strong>Snapshot Testing:</strong> Test UI components with snapshots</li>
            <li><strong>Watch Mode:</strong> Automatically re-run tests on file changes</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>All-in-one testing solution</li>
            <li>Fast test execution with parallelization</li>
            <li>Great developer experience</li>
            <li>Excellent React support</li>
            <li>Large ecosystem and community</li>
            <li>Works with TypeScript</li>
          </ul>
          <p className="mt-2"><strong>When to Use Jest:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>For React applications (especially with Create React App)</li>
            <li>When you want a complete testing solution</li>
            <li>For projects needing snapshot testing</li>
            <li>When you need powerful mocking capabilities</li>
            <li>For teams familiar with Jest ecosystem</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Test Suites and Specs</h3>
        <p className="text-gray-700 mb-4">
          Jest uses describe blocks for test suites and it/test for individual tests.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Basic test
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

// Using it instead of test
it('should add numbers', () => {
  expect(1 + 1).toBe(2);
});

// Test suite with describe
describe('Math operations', () => {
  test('addition', () => {
    expect(1 + 1).toBe(2);
  });
  
  test('subtraction', () => {
    expect(2 - 1).toBe(1);
  });
});

// Nested describe blocks
describe('User', () => {
  describe('Authentication', () => {
    test('login', () => {
      // Test login
    });
    
    test('logout', () => {
      // Test logout
    });
  });
  
  describe('Profile', () => {
    test('update profile', () => {
      // Test update
    });
  });
});

// Test.only - run only this test
test.only('only this test runs', () => {
  expect(true).toBe(true);
});

// Test.skip - skip this test
test.skip('this test is skipped', () => {
  expect(true).toBe(true);
});

// Test.todo - mark as todo
test.todo('should implement this feature');`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">All Jest Matchers</h3>
        <p className="text-gray-700 mb-4">
          Jest provides a comprehensive set of matchers for assertions.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Equality matchers
expect(value).toBe(4); // Object.is equality
expect(value).toEqual({ name: 'John' }); // Deep equality
expect(value).not.toBe(5); // Negation

// Truthiness matchers
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();
expect(value).not.toBeNull();

// Number matchers
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(4);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(4);
expect(0.1 + 0.2).toBeCloseTo(0.3, 5);

// String matchers
expect('hello').toMatch(/he/);
expect('hello world').toContain('world');
expect('HELLO').toMatch(/hello/i);

// Array/Object matchers
expect(['apple', 'banana']).toContain('apple');
expect({ name: 'John', age: 30 }).toHaveProperty('name');
expect({ name: 'John' }).toHaveProperty('name', 'John');
expect({ a: 1, b: 2 }).toMatchObject({ a: 1 });
expect([1, 2, 3]).toHaveLength(3);

// Exception matchers
expect(() => {
  throw new Error('error');
}).toThrow();
expect(() => {
  throw new Error('error');
}).toThrow('error');
expect(() => {
  throw new Error('error');
}).toThrowErrorMatchingSnapshot();
expect(() => {
  throw new Error('error');
}).toThrowErrorMatchingInlineSnapshot(\`"error"\`);

// Promise matchers
await expect(Promise.resolve('value')).resolves.toBe('value');
await expect(Promise.reject('error')).rejects.toBe('error');

// Mock matchers
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenLastCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenNthCalledWith(1, 'arg1');
expect(mockFn).toHaveReturned();
expect(mockFn).toHaveReturnedTimes(2);
expect(mockFn).toHaveReturnedWith('value');
expect(mockFn).toHaveLastReturnedWith('value');
expect(mockFn).toHaveNthReturnedWith(1, 'value');

// Snapshot matchers
expect(value).toMatchSnapshot();
expect(value).toMatchInlineSnapshot(\`"value"\`);

// Asymmetric matchers
expect('hello').toEqual(expect.stringContaining('he'));
expect(['apple', 'banana']).toEqual(expect.arrayContaining(['apple']));
expect({ a: 1, b: 2 }).toEqual(expect.objectContaining({ a: 1 }));
expect(5).toEqual(expect.any(Number));
expect('hello').toEqual(expect.anything());`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Mocking Modules and Functions</h3>
        <p className="text-gray-700 mb-4">
          Jest provides powerful mocking capabilities for modules and functions.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Mock functions
const mockFn = jest.fn();
mockFn('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');

// Mock return value
const mockFn = jest.fn(() => 'return value');
const mockFn = jest.fn().mockReturnValue('return value');
const mockFn = jest.fn().mockReturnValueOnce('first').mockReturnValue('default');

// Mock implementation
const mockFn = jest.fn().mockImplementation((arg) => arg * 2);
const mockFn = jest.fn((arg) => arg * 2);

// Mock async functions
const mockFn = jest.fn().mockResolvedValue('value');
const mockFn = jest.fn().mockRejectedValue(new Error('error'));

// Mock modules
jest.mock('./api');
jest.mock('./utils', () => ({
  helper: jest.fn(),
  constant: 'value'
}));

// Partial mock
jest.mock('./utils', () => {
  const actual = jest.requireActual('./utils');
  return {
    ...actual,
    specificFunction: jest.fn()
  };
});

// Manual mocks (__mocks__ folder)
// __mocks__/api.js
module.exports = {
  fetchUser: jest.fn(() => Promise.resolve({ name: 'John' }))
};

// Use manual mock
jest.mock('./api');

// Clear mocks
jest.clearAllMocks();
jest.resetAllMocks();
mockFn.mockClear();
mockFn.mockReset();
mockFn.mockRestore();

// Mock getters/setters
const obj = {
  get name() { return 'John'; },
  set name(value) { this._name = value; }
};

jest.spyOn(obj, 'name', 'get').mockReturnValue('Jane');
jest.spyOn(obj, 'name', 'set').mockImplementation((value) => {
  obj._name = value;
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Snapshot Testing</h3>
        <p className="text-gray-700 mb-4">
          Snapshot testing captures component output and compares it to stored snapshots.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { render } from '@testing-library/react';

// Component snapshot
test('renders correctly', () => {
  const { container } = render(<Component />);
  expect(container).toMatchSnapshot();
});

// Inline snapshot
test('renders correctly', () => {
  const { container } = render(<Component />);
  expect(container).toMatchInlineSnapshot(\`
    <div>
      <h1>Hello</h1>
    </div>
  \`);
});

// Snapshot of object
test('object snapshot', () => {
  const data = { name: 'John', age: 30 };
  expect(data).toMatchSnapshot();
});

// Update snapshots
// jest --updateSnapshot or jest -u

// Property matchers in snapshots
expect({
  id: expect.any(Number),
  name: 'John',
  createdAt: expect.any(Date)
}).toMatchSnapshot();

// Snapshot serializers
expect.addSnapshotSerializer({
  test: (val) => val instanceof Date,
  print: (val) => val.toISOString()
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Timer Mocks</h3>
        <p className="text-gray-700 mb-4">
          Mock timers to control time in tests.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Use fake timers
jest.useFakeTimers();

// Advance time
jest.advanceTimersByTime(1000); // Advance 1 second
jest.runOnlyPendingTimers(); // Run only pending timers
jest.runAllTimers(); // Run all timers
jest.runAllTimersAsync(); // Run all timers (async)

// Restore real timers
jest.useRealTimers();

// Example: setTimeout
test('setTimeout', () => {
  jest.useFakeTimers();
  const callback = jest.fn();
  
  setTimeout(callback, 1000);
  expect(callback).not.toHaveBeenCalled();
  
  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalled();
  
  jest.useRealTimers();
});

// Example: setInterval
test('setInterval', () => {
  jest.useFakeTimers();
  const callback = jest.fn();
  
  setInterval(callback, 1000);
  
  jest.advanceTimersByTime(3000);
  expect(callback).toHaveBeenCalledTimes(3);
  
  jest.useRealTimers();
});

// Mock Date
const mockDate = new Date('2023-01-01');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
jest.setSystemTime(mockDate);
jest.useRealTimers();`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Mock Functions (jest.fn, jest.mock, etc.)</h3>
        <p className="text-gray-700 mb-4">
          Jest provides various utilities for creating and managing mocks.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// jest.fn() - Create mock function
const mockFn = jest.fn();
mockFn('arg');
expect(mockFn).toHaveBeenCalled();

// jest.fn(implementation)
const mockFn = jest.fn((x) => x * 2);
expect(mockFn(5)).toBe(10);

// jest.spyOn() - Spy on object method
const obj = { method: () => 'original' };
const spy = jest.spyOn(obj, 'method');
obj.method();
expect(spy).toHaveBeenCalled();

// jest.mock() - Mock module
jest.mock('./api', () => ({
  fetchData: jest.fn()
}));

// jest.doMock() - Dynamic mock
jest.doMock('./api', () => ({
  fetchData: jest.fn()
}));

// jest.unmock() - Unmock module
jest.unmock('./api');

// jest.dontMock() - Don't mock module
jest.dontMock('./api');

// jest.requireMock() - Require mocked module
const mockedModule = jest.requireMock('./api');

// jest.requireActual() - Require actual module
const actualModule = jest.requireActual('./api');

// jest.clearAllMocks() - Clear all mocks
jest.clearAllMocks();

// jest.resetAllMocks() - Reset all mocks
jest.resetAllMocks();

// jest.restoreAllMocks() - Restore all mocks
jest.restoreAllMocks();

// jest.isolateModules() - Isolate module cache
jest.isolateModules(() => {
  const module = require('./module');
});

// Mock function methods
mockFn.mockReturnValue('value');
mockFn.mockReturnValueOnce('value');
mockFn.mockResolvedValue('value');
mockFn.mockResolvedValueOnce('value');
mockFn.mockRejectedValue(new Error('error'));
mockFn.mockRejectedValueOnce(new Error('error'));
mockFn.mockImplementation((arg) => arg * 2);
mockFn.mockImplementationOnce((arg) => arg * 2);
mockFn.mockName('myMock');
mockFn.getMockName(); // 'myMock'`}</pre>
        </div>
      </section>
    </div>
  );
}

export default Jest;

