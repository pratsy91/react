import React from 'react';

function TestingCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Testing Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Testing Quick Reference</h3>
        <p className="text-blue-800 mb-2">
          Essential testing patterns and best practices.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">React Testing Library</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// Basic test
render(<Component />);
expect(screen.getByText('Hello')).toBeInTheDocument();

// Query priority: getByRole > getByLabelText > getByText`}</pre>
        </div>
      </section>
    </div>
  );
}

export default TestingCheatsheet;

