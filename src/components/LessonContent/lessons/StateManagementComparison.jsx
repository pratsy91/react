import React from 'react';

function StateManagementComparison() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">State Management Solutions Comparison</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">State Management Comparison</h3>
        <p className="text-blue-800 mb-2">
          Comparison of different state management solutions and when to use each.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Solutions Comparison</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Solution</th>
                <th className="text-left p-2">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">useState</td>
                <td className="p-2">Local component state</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">useReducer</td>
                <td className="p-2">Complex local state</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Context API</td>
                <td className="p-2">Simple global state</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Redux Toolkit</td>
                <td className="p-2">Complex global state</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Zustand</td>
                <td className="p-2">Simple, lightweight global state</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default StateManagementComparison;

