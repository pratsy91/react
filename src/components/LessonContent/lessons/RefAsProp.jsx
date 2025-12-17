import { useState } from 'react';

function RefAsProp() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Ref as Prop</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Ref Forwarding Improvements</h3>
        <p className="text-gray-700 mb-4">
          React 19 allows ref to be passed as a regular prop.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Ref as Prop (React 19)
// No need for forwardRef

// Before (React 18)
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// After (React 19)
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// Usage
function Form() {
  const inputRef = useRef();
  
  return (
    <Input ref={inputRef} placeholder="Name" />
  );
}

// Ref is just a prop
// No special handling needed
function Button({ ref, children, ...props }) {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
}

// Multiple Refs
function Component({ inputRef, buttonRef }) {
  return (
    <>
      <input ref={inputRef} />
      <button ref={buttonRef}>Click</button>
    </>
  );
}

// Usage
function App() {
  const inputRef = useRef();
  const buttonRef = useRef();
  
  return (
    <Component inputRef={inputRef} buttonRef={buttonRef} />
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Ref Prop Support</h3>
        <p className="text-gray-700 mb-4">
          How ref prop works in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Ref Prop Support
// ref can be used like any other prop

// Function Component
function Input({ ref, value, onChange }) {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}

// Class Component
class Input extends React.Component {
  render() {
    const { ref, value, onChange } = this.props;
    return (
      <input
        ref={ref}
        value={value}
        onChange={onChange}
      />
    );
  }
}

// Conditional Ref
function Input({ ref, disabled, ...props }) {
  return (
    <input
      ref={disabled ? null : ref}
      disabled={disabled}
      {...props}
    />
  );
}

// Ref with Default
function Input({ ref = null, ...props }) {
  return <input ref={ref} {...props} />;
}

// Ref Callback
function Input({ ref, ...props }) {
  const handleRef = (node) => {
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };
  
  return <input ref={handleRef} {...props} />;
}

// TypeScript Support
interface InputProps {
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ ref, value, onChange }: InputProps) {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Component Refs</h3>
        <p className="text-gray-700 mb-4">
          Using refs with components in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Component Refs
// Access component instance or DOM element

// DOM Element Ref
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <>
      <Input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

// Component Instance Ref
// For class components
class Counter extends React.Component {
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return <div>{this.state.count}</div>;
  }
}

function App() {
  const counterRef = useRef<Counter>(null);
  
  const handleIncrement = () => {
    counterRef.current?.increment();
  };
  
  return (
    <>
      <Counter ref={counterRef} />
      <button onClick={handleIncrement}>Increment</button>
    </>
  );
}

// Imperative Handle
// Still use useImperativeHandle for custom methods
function Input({ ref, ...props }) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    getValue: () => inputRef.current?.value
  }));
  
  return <input ref={inputRef} {...props} />;
}

// Usage
function Form() {
  const inputRef = useRef<{ focus: () => void }>(null);
  
  return (
    <>
      <Input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        Focus
      </button>
    </>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Forward Ref Patterns</h3>
        <p className="text-gray-700 mb-4">
          Patterns for using refs in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Forward Ref Patterns
// React 19 simplifies ref forwarding

// Simple Forwarding
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// With Validation
function Input({ ref, type = 'text', ...props }) {
  return <input ref={ref} type={type} {...props} />;
}

// Conditional Forwarding
function ConditionalInput({ ref, condition, ...props }) {
  return condition ? (
    <input ref={ref} {...props} />
  ) : (
    <div>No input</div>
  );
}

// Multiple Element Refs
function Form({ inputRef, textareaRef }) {
  return (
    <>
      <input ref={inputRef} />
      <textarea ref={textareaRef} />
    </>
  );
}

// Ref Composition
function Wrapper({ ref, children, ...props }) {
  const innerRef = useRef();
  
  // Forward ref to inner element
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(innerRef.current);
      } else {
        ref.current = innerRef.current;
      }
    }
  }, [ref]);
  
  return (
    <div ref={innerRef} {...props}>
      {children}
    </div>
  );
}

// Higher-Order Component with Ref
function withRef(Component) {
  return function WrappedComponent({ ref, ...props }) {
    return <Component ref={ref} {...props} />;
  };
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">TypeScript Support</h3>
        <p className="text-gray-700 mb-4">
          TypeScript support for ref prop in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// TypeScript Support
// Proper typing for ref prop

// Basic Ref Type
interface InputProps {
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ ref, value, onChange }: InputProps) {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}

// RefObject Type
interface ButtonProps {
  ref?: React.RefObject<HTMLButtonElement>;
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({ ref, onClick, children }: ButtonProps) {
  return (
    <button ref={ref} onClick={onClick}>
      {children}
    </button>
  );
}

// Ref Callback Type
interface InputProps {
  ref?: (node: HTMLInputElement | null) => void;
  value?: string;
}

function Input({ ref, value }: InputProps) {
  return <input ref={ref} value={value} />;
}

// Generic Component with Ref
interface ComponentProps<T extends HTMLElement> {
  ref?: React.Ref<T>;
  className?: string;
}

function GenericComponent<T extends HTMLElement>({
  ref,
  className
}: ComponentProps<T>) {
  return <div ref={ref} className={className} />;
}

// Imperative Handle Types
interface InputHandle {
  focus: () => void;
  blur: () => void;
  getValue: () => string;
}

interface InputProps {
  ref?: React.Ref<InputHandle>;
  value?: string;
}

function Input({ ref, value }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    getValue: () => inputRef.current?.value || ''
  }));
  
  return <input ref={inputRef} value={value} />;
}

// Usage with TypeScript
function Form() {
  const inputRef = useRef<InputHandle>(null);
  
  return (
    <>
      <Input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        Focus
      </button>
    </>
  );
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default RefAsProp;

