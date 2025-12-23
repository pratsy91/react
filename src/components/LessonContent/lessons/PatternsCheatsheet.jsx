import React from 'react';

function PatternsCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React Patterns Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Component Patterns Quick Reference</h3>
        <p className="text-blue-800 mb-2">
          Common React patterns for building reusable and maintainable components.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Patterns Overview</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ul className="space-y-2 text-gray-700">
            <li><strong>Container/Presentational:</strong> Separate logic from presentation</li>
            <li><strong>HOC:</strong> Reuse component logic</li>
            <li><strong>Render Props:</strong> Share code via function props</li>
            <li><strong>Compound Components:</strong> Components that work together</li>
            <li><strong>Custom Hooks:</strong> Extract reusable logic</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default PatternsCheatsheet;

