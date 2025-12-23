import React from 'react';

function TypeScriptReactCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">TypeScript with React Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">TypeScript React Quick Reference</h3>
        <p className="text-blue-800 mb-2">
          Essential TypeScript patterns for React components.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Component Types</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// Component props
interface Props {
  name: string;
  age?: number;
}

function Component({ name, age }: Props) {
  return <div>{name}</div>;
}

// FC type
const Component: FC<Props> = ({ name }) => <div>{name}</div>;`}</pre>
        </div>
      </section>
    </div>
  );
}

export default TypeScriptReactCheatsheet;

