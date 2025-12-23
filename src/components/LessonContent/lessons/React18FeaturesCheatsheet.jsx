import React from 'react';

function React18FeaturesCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React 18 Features Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">React 18 Features Quick Reference</h3>
        <p className="text-blue-800 mb-2">
          Key React 18 features and APIs.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ul className="space-y-2 text-gray-700">
            <li>• Concurrent Rendering</li>
            <li>• Automatic Batching</li>
            <li>• Transitions (useTransition)</li>
            <li>• Suspense Improvements</li>
            <li>• useId Hook</li>
            <li>• useDeferredValue</li>
            <li>• useSyncExternalStore</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default React18FeaturesCheatsheet;

