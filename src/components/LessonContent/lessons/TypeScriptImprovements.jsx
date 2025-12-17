import { useState } from 'react';

function TypeScriptImprovements() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">TypeScript Improvements</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Better Type Inference</h3>
        <p className="text-gray-700 mb-4">
          React 19 improves TypeScript type inference.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Better Type Inference
// React 19 has improved type inference

// Component Props Inference
// TypeScript infers props from usage
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// TypeScript infers:
// label: string
// onClick: () => void

// Explicit Types
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// Generic Components
// Better inference for generics
function List<T>({ items, render }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

// Usage with inference
<List
  items={[1, 2, 3]}
  render={(item) => item.toString()}
  // TypeScript infers T as number
/>

// Hook Type Inference
function useCounter(initial: number) {
  const [count, setCount] = useState(initial);
  return [count, setCount] as const;
}

// TypeScript infers:
// count: number
// setCount: (value: number) => void

// Context Type Inference
const ThemeContext = createContext<{ theme: string } | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context; // TypeScript knows context is defined
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Ref Types</h3>
        <p className="text-gray-700 mb-4">
          Improved ref typing in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Ref Types
// Better ref typing in React 19

// Element Ref
function Input() {
  const ref = useRef<HTMLInputElement>(null);
  return <input ref={ref} />;
}

// Component Ref
interface ButtonHandle {
  focus: () => void;
}

function Button({ ref }: { ref?: React.Ref<ButtonHandle> }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => buttonRef.current?.focus()
  }));
  
  return <button ref={buttonRef}>Click</button>;
}

// Ref Callback
function Input({ ref }: { ref?: (node: HTMLInputElement | null) => void }) {
  return <input ref={ref} />;
}

// Ref as Prop (React 19)
function Input({ ref, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}

// Multiple Refs
function Component({ inputRef, buttonRef }: {
  inputRef?: React.Ref<HTMLInputElement>;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <>
      <input ref={inputRef} />
      <button ref={buttonRef}>Click</button>
    </>
  );
}

// Forward Ref Types
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Ref Type Utilities
type InputRef = React.RefObject<HTMLInputElement>;
type ButtonRef = React.RefCallback<HTMLButtonElement>;
type ComponentRef<T> = React.Ref<T>;`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context Types</h3>
        <p className="text-gray-700 mb-4">
          Improved context typing in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Context Types
// Better context typing

// Basic Context
interface ThemeContextValue {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Context Hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context; // TypeScript knows it's defined
}

// Context Provider
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext value={{ theme, setTheme }}>
      {children}
    </ThemeContext>
  );
}

// Multiple Contexts
interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
}

interface SettingsContextValue {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

// Context Composition
function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext value={authValue}>
      <SettingsContext value={settingsValue}>
        {children}
      </SettingsContext>
    </AuthContext>
  );
}

// Context with use() Hook
function Component() {
  const theme = use(ThemeContext); // TypeScript infers type
  return <div className={theme.theme}>Content</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Component Types</h3>
        <p className="text-gray-700 mb-4">
          Improved component typing in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Component Types
// Better component typing

// Function Component
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// Or without FC
function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// Async Component
async function DataComponent({ id }: { id: string }) {
  const data = await fetchData(id);
  return <div>{data.content}</div>;
}

// Component with Children
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}

// Generic Component
interface ListProps<T> {
  items: T[];
  render: (item: T) => React.ReactNode;
}

function List<T>({ items, render }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

// Component Return Types
function Component(): JSX.Element {
  return <div>Content</div>;
}

function Component(): React.ReactElement {
  return <div>Content</div>;
}

// Component with Ref
interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
          Improved hook typing in React 19.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Hook Types
// Better hook typing

// useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// useEffect
useEffect(() => {
  // Effect logic
}, [dependencies]);

// useRef
const inputRef = useRef<HTMLInputElement>(null);
const valueRef = useRef<string>('');

// useContext
const theme = useContext(ThemeContext);

// useReducer
interface State {
  count: number;
}

type Action = { type: 'increment' } | { type: 'decrement' };

const [state, dispatch] = useReducer(reducer, initialState);

// useCallback
const handleClick = useCallback(() => {
  // Handler
}, [dependencies]);

// useMemo
const memoized = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);

// Custom Hook
function useCounter(initial: number) {
  const [count, setCount] = useState(initial);
  
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return { count, increment };
}

// Hook with Generic
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((data: T) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading };
}

// use() Hook
function Component({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise); // TypeScript infers Data
  return <div>{data.content}</div>;
}

// useActionState
interface ActionState {
  error?: string;
  success?: boolean;
}

function updateAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  // Action logic
}

const [state, formAction, isPending] = useActionState(updateAction, null);

// useOptimistic
const [optimisticState, addOptimistic] = useOptimistic(
  state,
  (current: State, update: Update) => {
    // Update logic
  }
);`}</pre>
        </div>
      </section>
    </div>
  );
}

export default TypeScriptImprovements;

