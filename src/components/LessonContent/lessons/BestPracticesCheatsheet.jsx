import React from 'react';

function BestPracticesCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React Best Practices Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Best Practices Quick Reference</h3>
        <p className="text-blue-800 mb-2">
          Essential React best practices for writing maintainable code.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Practices</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ul className="space-y-2 text-gray-700">
            <li>• Keep components small and focused</li>
            <li>• Use functional components</li>
            <li>• Extract reusable logic to custom hooks</li>
            <li>• Memoize expensive computations</li>
            <li>• Use proper keys in lists</li>
            <li>• Avoid prop drilling (use Context)</li>
            <li>• Write accessible components</li>
            <li>• Handle errors gracefully</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default BestPracticesCheatsheet;

