import React from 'react';

function AdvancedInterviewQuestions() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Advanced React Interview Questions</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Advanced React Interview Questions</h3>
        <p className="text-blue-800 mb-2">
          Advanced React concepts commonly asked in senior developer interviews.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: What are Error Boundaries?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700"><strong>Answer:</strong> React components that catch JavaScript errors in child component tree and display fallback UI.</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: Context API vs Redux?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700"><strong>Answer:</strong> Context for simple global state, Redux for complex state management with middleware, time-travel debugging.</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Q: What are Server Components?</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700"><strong>Answer:</strong> Components that run on server, reducing client bundle size and enabling direct database access.</p>
        </div>
      </section>
    </div>
  );
}

export default AdvancedInterviewQuestions;

