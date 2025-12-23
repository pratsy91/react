import React from 'react';

function FormsCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Form Handling Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Form Handling Quick Reference</h3>
        <p className="text-blue-800 mb-2">
          Essential form handling patterns and libraries.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Controlled vs Uncontrolled</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// Controlled
<input value={value} onChange={e => setValue(e.target.value)} />

// Uncontrolled
<input defaultValue="initial" ref={inputRef} />`}</pre>
        </div>
      </section>
    </div>
  );
}

export default FormsCheatsheet;

