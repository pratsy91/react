import React from 'react';

function HooksInterviewQuestions() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Hooks Interview Questions</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Common Hooks Interview Questions</h3>
        <p className="text-blue-800 mb-2">
          Frequently asked questions about React Hooks in interviews.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: What are the Rules of Hooks?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700"><strong>Answer:</strong> Only call hooks at the top level, only from React functions, and in the same order every render.</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: useState vs useReducer?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700"><strong>Answer:</strong> useState for simple state, useReducer for complex state logic with multiple sub-values.</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: useEffect dependencies?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700"><strong>Answer:</strong> Empty [] = mount only, [dep] = when dep changes, no array = every render (avoid).</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: useCallback vs useMemo?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700"><strong>Answer:</strong> useCallback memoizes functions, useMemo memoizes values. Both prevent unnecessary re-renders.</p>
        </div>
      </section>
    </div>
  );
}

export default HooksInterviewQuestions;

