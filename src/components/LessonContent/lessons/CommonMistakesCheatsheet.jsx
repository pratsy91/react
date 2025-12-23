import React from 'react';

function CommonMistakesCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Common Mistakes & Solutions</h2>
      
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Common React Mistakes</h3>
        <p className="text-red-800 mb-2">
          Common mistakes developers make and how to fix them.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Common Mistakes</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ul className="space-y-2 text-gray-700">
            <li>❌ Mutating state directly → ✅ Use setState/functional updates</li>
            <li>❌ Missing keys in lists → ✅ Use stable, unique keys</li>
            <li>❌ Infinite loops in useEffect → ✅ Check dependencies</li>
            <li>❌ Stale closures → ✅ Use functional updates or refs</li>
            <li>❌ Memory leaks → ✅ Cleanup in useEffect</li>
            <li>❌ Unnecessary re-renders → ✅ Use memo, useMemo, useCallback</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CommonMistakesCheatsheet;

