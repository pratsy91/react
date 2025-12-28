function InterviewTypeScript() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">TypeScript with React - Interview Cheatsheet</h2>
        <p className="text-gray-700">Complete TypeScript patterns for React interviews</p>
      </div>

      {/* Component Props */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Component Prop Types</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Basic Props:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> TypeScript interfaces define the shape of component props. Required props have no modifier. Optional props use ? modifier. Function types use () => returnType syntax. void means function returns nothing. TypeScript enforces prop types at compile time, catching errors before runtime. This provides autocomplete, refactoring safety, and documentation.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> interface defines prop shape. ? makes props optional. () => void for functions. TypeScript enforces at compile time. Provides autocomplete and safety.</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">With Children:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React.ReactNode is the type for children prop. It accepts strings, numbers, elements, arrays, fragments, null, undefined - anything React can render. This is the most permissive type for children. For more specific types, use React.ReactElement or React.ReactElement[]. Children prop allows component composition - passing JSX as props.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> React.ReactNode accepts any renderable content. Most permissive children type. Allows component composition. Can be string, element, array, etc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Function Component Types */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Function Component Types</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">FC Type (Legacy):</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> FC (FunctionComponent) is a generic type that includes children prop automatically. It's legacy because it has issues: always includes children (even when not needed), makes components harder to type, and doesn't work well with generics. Modern approach is to type props directly in function parameters, giving more control and better type inference.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { FC } from 'react';

interface Props {
  name: string;
}

const Component: FC<Props> = ({ name }) => {
  return <div>{name}</div>;
};`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> FC includes children automatically. Legacy pattern. Harder to type generics. Not recommended for new code.</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Modern Approach (Recommended):</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Modern approach types props directly in function parameters. This gives explicit control over prop types, better type inference, and works well with generics. No automatic children prop - add it explicitly if needed. Function declarations and arrow functions both work. This is the recommended pattern in modern React TypeScript code.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`interface Props {
  name: string;
}

function Component({ name }: Props) {
  return <div>{name}</div>;
}

// Or
const Component = ({ name }: Props) => {
  return <div>{name}</div>;
};`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Type props in parameters. Explicit control. Better type inference. Works with generics. Recommended approach.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Handler Types */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Event Handler Types</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Common Events:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React event types are generic, taking the element type as parameter. React.MouseEvent{'<'}{'HTMLButtonElement>'} types a mouse event on a button. React.ChangeEvent{'<'}{'HTMLInputElement>'} types a change event on an input. React.FormEvent{'<'}{'HTMLFormElement>'} types a form submission event. The generic parameter ensures e.target is correctly typed. This provides type safety for event handlers and prevents accessing properties that don't exist.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Form() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Event types are generic. Parameter is element type. e.target is correctly typed. Type safety for event handlers. Prevents property access errors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hook Types */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Hook Types</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useState:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useRef:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`const inputRef = useRef<HTMLInputElement>(null);
const countRef = useRef<number>(0);`}
            </pre>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">useReducer:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`interface State {
  count: number;
}

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
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
}

const [state, dispatch] = useReducer(reducer, { count: 0 });`}
            </pre>
          </div>
        </div>
      </section>

      {/* Context Types */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Context Types</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Creating Typed Context:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Generic Components */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Generic Components</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Generic List Component:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List
  items={['a', 'b', 'c']}
  renderItem={(item) => <span>{item}</span>}
/>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Utility Types */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Utility Types</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Common Utility Types:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type UserWithoutId = Omit<User, 'id'>;

// Required - all properties required
type RequiredUser = Required<PartialUser>;

// Readonly - all properties readonly
type ReadonlyUser = Readonly<User>;`}
            </pre>
          </div>
        </div>
      </section>

      {/* HOC Types */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">HOC Types</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Typed HOC:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function withLoading<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithLoadingComponent(props: P & { loading: boolean }) {
    if (props.loading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Common Patterns */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common TypeScript Patterns</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Type Guards:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
}`}
            </pre>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Discriminated Unions:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`type Action =
  | { type: 'increment'; payload: number }
  | { type: 'decrement'; payload: number }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - action.payload };
    case 'reset':
      return { count: 0 };
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Interview Questions</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you type component props?</p>
            <p className="text-gray-700">A: Use interfaces or type aliases. Prefer interfaces for object shapes. Use React.ReactNode for children.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: What's the difference between FC and regular function?</p>
            <p className="text-gray-700">A: FC includes children prop and return type. Modern approach prefers regular functions for better control.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you type event handlers?</p>
            <p className="text-gray-700">A: Use React.SyntheticEvent or specific event types like React.ChangeEvent&lt;HTMLInputElement&gt;.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewTypeScript;

