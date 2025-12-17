import { useState } from 'react';

function TypeDefinitions() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Type Definitions</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">FC, ReactNode, ReactElement</h3>
        <p className="text-gray-700 mb-4">
          React provides several type definitions for components and their return values.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import React, { FC, ReactNode, ReactElement } from 'react';

// FC (FunctionComponent) - Component type
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// FC with children (implicit)
const Container: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

// ReactNode - Most flexible type for children
type ReactNode = 
  | ReactElement
  | string
  | number
  | boolean
  | null
  | undefined
  | ReactNode[];

interface CardProps {
  children: ReactNode; // Can be anything renderable
}

const Card: FC<CardProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};

// ReactElement - A React element (JSX)
interface IconProps {
  name: string;
}

const Icon: FC<IconProps> = ({ name }): ReactElement => {
  return <span className={\`icon-\${name}\`} />;
};

// JSX.Element - Similar to ReactElement
const Component = (): JSX.Element => {
  return <div>Hello</div>;
};

// Difference between ReactNode and ReactElement
// ReactNode is more permissive (includes strings, numbers, etc.)
// ReactElement is specifically a React element

// Usage examples
<Card>
  <Icon name="user" /> {/* ReactElement */}
  <span>Text</span> {/* ReactElement */}
  Hello World {/* string - ReactNode but not ReactElement */}
  {123} {/* number - ReactNode but not ReactElement */}
</Card>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Props Typing</h3>
        <p className="text-gray-700 mb-4">
          Type component props using interfaces or type aliases.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import React, { FC } from 'react';

// Interface for props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: FC<ButtonProps> = ({ label, onClick, disabled = false, variant = 'primary' }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {label}
    </button>
  );
};

// Type alias for props
type CardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const Card: FC<CardProps> = ({ title, description, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
};

// Props with default values
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
}

const Input: FC<InputProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Enter text',
  type = 'text' 
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

// Extending HTML element props
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const CustomButton: FC<CustomButtonProps> = ({ variant, ...props }) => {
  return <button className={\`btn-\${variant}\`} {...props} />;
};

// Props without FC (direct function)
interface UserProps {
  name: string;
  age: number;
}

function User({ name, age }: UserProps) {
  return <div>{name} ({age})</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Children Typing</h3>
        <p className="text-gray-700 mb-4">
          Type the children prop correctly for different use cases.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import React, { FC, ReactNode, ReactElement } from 'react';

// ReactNode (most common and flexible)
interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <div>{children}</div>;
};

// Specific element type
interface LayoutProps {
  children: ReactElement; // Must be a single React element
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="layout">{children}</div>;
};

// Array of elements
interface ListProps {
  children: ReactElement[];
}

const List: FC<ListProps> = ({ children }) => {
  return <ul>{children}</ul>;
};

// Multiple children types
interface CardProps {
  header?: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
}

const Card: FC<CardProps> = ({ header, body, footer }) => {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{body}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

// Function as children (render prop pattern)
interface DataProviderProps {
  children: (data: string) => ReactNode;
}

const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const data = 'Hello from provider';
  return <>{children(data)}</>;
};

// Usage
<DataProvider>
  {(data) => <div>{data}</div>}
</DataProvider>

// Children with specific component type
interface TabListProps {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

// Children that must be a specific component
interface FormProps {
  children: ReactElement<InputProps> | ReactElement<InputProps>[];
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Event Types (All Synthetic Events)</h3>
        <p className="text-gray-700 mb-4">
          Type all React synthetic events correctly.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import React, { FC, SyntheticEvent } from 'react';

// Generic SyntheticEvent
const handleGeneric = (e: SyntheticEvent) => {
  e.preventDefault();
  console.log(e.type);
};

// Mouse events
interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDoubleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Change events (forms)
interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ onChange, onInput }) => {
  return (
    <input
      onChange={onChange}
      onInput={onInput}
    />
  );
};

// Form events
interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: FC<FormProps> = ({ onSubmit }) => {
  return <form onSubmit={onSubmit}>...</form>;
};

// Keyboard events
interface InputProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// Focus events
interface InputProps {
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

// Drag events
interface DraggableProps {
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

// Touch events
interface TouchableProps {
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
}

// Clipboard events
interface ClipboardProps {
  onCopy: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onCut: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

// Animation events
interface AnimatedProps {
  onAnimationStart: (e: React.AnimationEvent<HTMLDivElement>) => void;
  onAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => void;
}

// Transition events
interface TransitionProps {
  onTransitionEnd: (e: React.TransitionEvent<HTMLDivElement>) => void;
}

// Wheel events
interface ScrollableProps {
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
}

// Pointer events
interface PointerProps {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
}

// Composition events
interface CompositionProps {
  onCompositionStart: (e: React.CompositionEvent<HTMLInputElement>) => void;
  onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => void;
  onCompositionUpdate: (e: React.CompositionEvent<HTMLInputElement>) => void;
}

// Example: Complete form component
interface FormComponentProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormComponent: FC<FormComponentProps> = ({ onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Ref Types</h3>
        <p className="text-gray-700 mb-4">
          Type refs correctly for different use cases.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import React, { FC, useRef, RefObject, MutableRefObject, LegacyRef } from 'react';

// useRef with HTML element
const InputComponent: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
};

// useRef with mutable value
const Counter: FC = () => {
  const countRef = useRef<number>(0);
  
  const increment = () => {
    countRef.current += 1;
    console.log(countRef.current);
  };
  
  return <button onClick={increment}>Count: {countRef.current}</button>;
};

// RefObject (read-only)
interface InputProps {
  inputRef: RefObject<HTMLInputElement>;
}

const Input: FC<InputProps> = ({ inputRef }) => {
  return <input ref={inputRef} />;
};

// MutableRefObject (mutable)
interface CounterProps {
  countRef: MutableRefObject<number>;
}

// LegacyRef (for compatibility)
interface ComponentProps {
  ref?: LegacyRef<HTMLDivElement>;
}

// Forwarding refs
import { forwardRef } from 'react';

interface ButtonProps {
  label: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label }, ref) => {
    return <button ref={ref}>{label}</button>;
  }
);

Button.displayName = 'Button';

// Usage
const Parent: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  return <Button ref={buttonRef} label="Click me" />;
};

// Ref callback
interface InputProps {
  inputRef: (node: HTMLInputElement | null) => void;
}

const Input: FC<InputProps> = ({ inputRef }) => {
  return <input ref={inputRef} />;
};

// Multiple refs
const Form: FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  
  return (
    <form>
      <input ref={nameRef} />
      <input ref={emailRef} />
      <input ref={passwordRef} />
    </form>
  );
};

// Ref with component
interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onChange }, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Hook Types</h3>
        <p className="text-gray-700 mb-4">
          Type all React hooks correctly.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`import { useState, useEffect, useRef, useContext, useReducer, useCallback, useMemo } from 'react';

// useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);
const [data, setData] = useState<{ name: string; age: number } | undefined>(undefined);

// useEffect
useEffect(() => {
  // Side effect
}, []);

useEffect(() => {
  return () => {
    // Cleanup
  };
}, [dependency]);

// useRef
const inputRef = useRef<HTMLInputElement>(null);
const countRef = useRef<number>(0);
const timerRef = useRef<NodeJS.Timeout | null>(null);

// useContext
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// useReducer
interface State {
  count: number;
}

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });

// useCallback
const memoizedCallback = useCallback<(value: string) => void>(
  (value) => {
    console.log(value);
  },
  []
);

// useMemo
const memoizedValue = useMemo<number>(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

// Custom hook typing
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter(initialValue: number = 0): UseCounterReturn {
  const [count, setCount] = useState<number>(initialValue);
  
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
}

// useLayoutEffect
useLayoutEffect(() => {
  // Synchronous effect
}, []);

// useImperativeHandle
import { useImperativeHandle, forwardRef } from 'react';

interface InputHandle {
  focus: () => void;
  blur: () => void;
}

const Input = forwardRef<InputHandle, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur()
  }));
  
  return <input ref={inputRef} />;
});`}</pre>
        </div>
      </section>
    </div>
  );
}

export default TypeDefinitions;

