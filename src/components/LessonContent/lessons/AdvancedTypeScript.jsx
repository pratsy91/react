import { useState } from 'react';

function AdvancedTypeScript() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Advanced TypeScript</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Advanced TypeScript with React</h3>
        <p className="text-blue-800 mb-2">
          Advanced TypeScript patterns in React enable you to create highly reusable, type-safe components. These patterns include 
          generics, utility types, discriminated unions, type guards, and advanced typing for HOCs and render props. Mastering 
          these patterns allows you to build robust, maintainable React applications with excellent type safety.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Advanced Patterns:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Generic Components:</strong> Reusable components that work with any type</li>
            <li><strong>Utility Types:</strong> Built-in types for common transformations</li>
            <li><strong>Discriminated Unions:</strong> Type-safe state machines and variants</li>
            <li><strong>Type Guards:</strong> Runtime type checking with type narrowing</li>
            <li><strong>Conditional Types:</strong> Types that depend on other types</li>
            <li><strong>Mapped Types:</strong> Transform existing types</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Maximum type safety and code reliability</li>
            <li>Better IDE autocomplete and IntelliSense</li>
            <li>Self-documenting code through types</li>
            <li>Catches errors at compile time</li>
            <li>Enables highly reusable components</li>
            <li>Better refactoring safety</li>
          </ul>
          <p className="mt-2"><strong>When to Use Advanced Patterns:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Building reusable component libraries</li>
            <li>Complex state management with type safety</li>
            <li>When you need maximum type safety</li>
            <li>For large codebases requiring maintainability</li>
            <li>When building shared components across teams</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Generic Components</h3>
        <p className="text-gray-700 mb-4">
          Create reusable components with generic types.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import React, { FC } from 'react';

// Generic list component
interface ListProps<T> {
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
  items={['apple', 'banana', 'orange']}
  renderItem={(item) => <span>{item}</span>}
/>

<List
  items={[{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]}
  renderItem={(item) => <span>{item.name}</span>}
/>

// Generic select component
interface SelectProps<T extends string | number> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

function Select<T extends string | number>({ value, options, onChange }: SelectProps<T>) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as T)}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Generic table component
interface TableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
  }[];
}

function Table<T extends Record<string, any>>({ data, columns }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map(col => (
              <td key={String(col.key)}>
                {col.render ? col.render(row[col.key], row) : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Generic form field
interface FormFieldProps<T> {
  value: T;
  onChange: (value: T) => void;
  label: string;
  validator?: (value: T) => string | null;
}

function FormField<T>({ value, onChange, label, validator }: FormFieldProps<T>) {
  const error = validator?.(value);
  
  return (
    <div>
      <label>{label}</label>
      <input
        value={String(value)}
        onChange={(e) => onChange(e.target.value as T)}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Utility Types (Partial, Pick, Omit, etc.)</h3>
        <p className="text-gray-700 mb-4">
          Use TypeScript utility types to transform existing types.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Partial<T> - Make all properties optional
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

// Pick<T, K> - Select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

// Omit<T, K> - Remove specific properties
type UserWithoutId = Omit<User, 'id'>;
// { name: string; email: string; age: number; }

// Required<T> - Make all properties required
type RequiredUser = Required<Partial<User>>;

// Readonly<T> - Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Record<K, T> - Create object type with keys K and values T
type UserMap = Record<string, User>;
// { [key: string]: User }

// Exclude<T, U> - Exclude types from union
type NonNullable<T> = Exclude<T, null | undefined>;

// Extract<T, U> - Extract types from union
type StringOrNumber = Extract<string | number | boolean, string | number>;
// string | number

// NonNullable<T> - Exclude null and undefined
type NonNullUser = NonNullable<User | null | undefined>;
// User

// ReturnType<T> - Get return type of function
type GetUserReturn = ReturnType<typeof getUser>;
// User | null

// Parameters<T> - Get parameters of function
type GetUserParams = Parameters<typeof getUser>;
// [id: number]

// InstanceType<T> - Get instance type of constructor
class UserClass {
  constructor(public name: string) {}
}
type UserInstance = InstanceType<typeof UserClass>;

// React component props example
interface BaseButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

// Create variant with additional props
type PrimaryButtonProps = BaseButtonProps & {
  variant: 'primary';
  icon?: string;
};

type SecondaryButtonProps = BaseButtonProps & {
  variant: 'secondary';
};

type ButtonProps = PrimaryButtonProps | SecondaryButtonProps;

// Utility type for form state
type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error?: string;
  };
};

// Usage
type UserFormState = FormState<Pick<User, 'name' | 'email'>>;
// {
//   name: { value: string; error?: string; };
//   email: { value: string; error?: string; };
// }`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Discriminated Unions</h3>
        <p className="text-gray-700 mb-4">
          Use discriminated unions for type-safe state management.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Discriminated union for API states
type ApiState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function useApi<T>(url: string): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({ status: 'idle' });
  
  useEffect(() => {
    setState({ status: 'loading' });
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ status: 'success', data }))
      .catch(error => setState({ status: 'error', error: error.message }));
  }, [url]);
  
  return state;
}

// Usage with type narrowing
function DataComponent() {
  const state = useApi<User[]>('/api/users');
  
  if (state.status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (state.status === 'error') {
    return <div>Error: {state.error}</div>;
  }
  
  if (state.status === 'success') {
    return <div>{state.data.map(user => user.name)}</div>;
  }
  
  return null;
}

// Form validation states
type ValidationResult =
  | { valid: true }
  | { valid: false; errors: string[] };

function validateForm(data: FormData): ValidationResult {
  const errors: string[] = [];
  
  if (!data.email) {
    errors.push('Email is required');
  }
  
  if (!data.password) {
    errors.push('Password is required');
  }
  
  return errors.length === 0 
    ? { valid: true }
    : { valid: false, errors };
}

// Modal states
type ModalState =
  | { isOpen: false }
  | { isOpen: true; mode: 'create' }
  | { isOpen: true; mode: 'edit'; id: number };

function Modal({ state }: { state: ModalState }) {
  if (!state.isOpen) {
    return null;
  }
  
  if (state.mode === 'create') {
    return <CreateModal />;
  }
  
  // TypeScript knows state.mode is 'edit' and state.id exists
  return <EditModal id={state.id} />;
}

// Action types for reducer
type Action =
  | { type: 'increment'; payload: number }
  | { type: 'decrement'; payload: number }
  | { type: 'reset' };

function counterReducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment':
      return state + action.payload;
    case 'decrement':
      return state - action.payload;
    case 'reset':
      return 0;
    default:
      return state;
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Type Guards</h3>
        <p className="text-gray-700 mb-4">
          Create type guards to narrow types at runtime.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Type predicate function
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  }
  
  if (isNumber(value)) {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
}

// User type guard
interface User {
  id: number;
  name: string;
  email: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value &&
    typeof (value as any).id === 'number' &&
    typeof (value as any).name === 'string' &&
    typeof (value as any).email === 'string'
  );
}

// Array type guard
function isUserArray(value: unknown): value is User[] {
  return Array.isArray(value) && value.every(isUser);
}

// API response type guard
interface ApiResponse<T> {
  success: true;
  data: T;
}

interface ApiError {
  success: false;
  error: string;
}

type ApiResult<T> = ApiResponse<T> | ApiError;

function isApiSuccess<T>(result: ApiResult<T>): result is ApiResponse<T> {
  return result.success === true;
}

function handleApiResult<T>(result: ApiResult<T>) {
  if (isApiSuccess(result)) {
    // TypeScript knows result.data exists
    console.log(result.data);
  } else {
    // TypeScript knows result.error exists
    console.error(result.error);
  }
}

// instanceof type guard
class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}

function handleError(error: unknown) {
  if (error instanceof CustomError) {
    // TypeScript knows error.code exists
    console.error(\`Error \${error.code}: \${error.message}\`);
  } else if (error instanceof Error) {
    console.error(error.message);
  }
}

// Property existence guard
function hasProperty<T, K extends string>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> {
  return typeof obj === 'object' && obj !== null && prop in obj;
}

function processObject(obj: unknown) {
  if (hasProperty(obj, 'name')) {
    // TypeScript knows obj.name exists
    console.log(obj.name);
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context Typing</h3>
        <p className="text-gray-700 mb-4">
          Type React Context correctly for type-safe context usage.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import React, { createContext, useContext, FC, ReactNode } from 'react';

// Define context type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create context with undefined default
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook with type guard
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
}

// Multiple contexts
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (email: string, password: string) => {
    // Login logic
    const user = await authenticate(email, password);
    setUser(user);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Generic context
interface DataContextType<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function createDataContext<T>() {
  const Context = createContext<DataContextType<T> | undefined>(undefined);
  
  const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const refetch = useCallback(() => {
      // Refetch logic
    }, []);
    
    return (
      <Context.Provider value={{ data, loading, error, refetch }}>
        {children}
      </Context.Provider>
    );
  };
  
  const useData = (): DataContextType<T> => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useData must be used within DataProvider');
    }
    return context;
  };
  
  return { Provider, useData };
}

// Usage
const { Provider: UserProvider, useData: useUserData } = createDataContext<User[]>();`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">HOC Typing</h3>
        <p className="text-gray-700 mb-4">
          Type Higher-Order Components correctly.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import React, { ComponentType } from 'react';

// HOC that adds props
interface WithLoadingProps {
  loading: boolean;
}

function withLoading<P extends object>(
  Component: ComponentType<P>
): ComponentType<P & WithLoadingProps> {
  return function WithLoadingComponent(props: P & WithLoadingProps) {
    const { loading, ...rest } = props;
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    return <Component {...(rest as P)} />;
  };
}

// Usage
interface UserProps {
  name: string;
  email: string;
}

const UserComponent: FC<UserProps> = ({ name, email }) => {
  return <div>{name} - {email}</div>;
};

const UserWithLoading = withLoading(UserComponent);

// HOC that injects props
interface WithAuthProps {
  isAuthenticated: boolean;
  user: User | null;
}

function withAuth<P extends object>(
  Component: ComponentType<P>
): ComponentType<Omit<P, keyof WithAuthProps>> {
  return function WithAuthComponent(props: Omit<P, keyof WithAuthProps>) {
    const { user, isAuthenticated } = useAuth();
    
    return <Component {...(props as P)} isAuthenticated={isAuthenticated} user={user} />;
  };
}

// HOC with generic
function withData<T>(fetchData: () => Promise<T>) {
  return function<P extends object>(
    Component: ComponentType<P & { data: T }>
  ): ComponentType<P> {
    return function WithDataComponent(props: P) {
      const [data, setData] = useState<T | null>(null);
      
      useEffect(() => {
        fetchData().then(setData);
      }, []);
      
      if (!data) {
        return <div>Loading...</div>;
      }
      
      return <Component {...props} data={data} />;
    };
  };
}

// HOC that wraps component
function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  fallback?: ComponentType<{ error: Error }>
) {
  return class WithErrorBoundary extends React.Component<
    P,
    { hasError: boolean; error?: Error }
  > {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }
    
    render() {
      if (this.state.hasError && this.state.error) {
        return fallback ? (
          <fallback error={this.state.error} />
        ) : (
          <div>Error: {this.state.error.message}</div>
        );
      }
      
      return <Component {...this.props} />;
    }
  };
}

// HOC with ref forwarding
function withRef<P extends object, T = HTMLDivElement>(
  Component: ComponentType<P>
) {
  return React.forwardRef<T, P>((props, ref) => {
    return <Component {...props} ref={ref} />;
  });
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Render Props Typing</h3>
        <p className="text-gray-700 mb-4">
          Type render prop patterns correctly.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`import React, { FC, ReactNode } from 'react';

// Basic render prop
interface DataProviderProps<T> {
  fetchData: () => Promise<T>;
  children: (data: T | null, loading: boolean, error: Error | null) => ReactNode;
}

function DataProvider<T>({ fetchData, children }: DataProviderProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    setLoading(true);
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [fetchData]);
  
  return <>{children(data, loading, error)}</>;
}

// Usage
<DataProvider<User[]>
  fetchData={() => fetch('/api/users').then(res => res.json())}
>
  {(data, loading, error) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;
    return <div>{data.map(user => user.name)}</div>;
  }}
</DataProvider>

// Render prop with multiple values
interface FormProviderProps<T> {
  initialValues: T;
  children: (props: {
    values: T;
    setValue: <K extends keyof T>(key: K, value: T[K]) => void;
    reset: () => void;
    submit: () => void;
  }) => ReactNode;
}

function FormProvider<T extends Record<string, any>>({
  initialValues,
  children
}: FormProviderProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  
  const setValue = <K extends keyof T>(key: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };
  
  const reset = () => {
    setValues(initialValues);
  };
  
  const submit = () => {
    // Submit logic
  };
  
  return <>{children({ values, setValue, reset, submit })}</>;
}

// Mouse position render prop
interface MouseTrackerProps {
  children: (position: { x: number; y: number }) => ReactNode;
}

const MouseTracker: FC<MouseTrackerProps> = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return <>{children(position)}</>;
};

// Toggle render prop
interface ToggleProps {
  children: (props: {
    isOn: boolean;
    toggle: () => void;
    turnOn: () => void;
    turnOff: () => void;
  }) => ReactNode;
}

const Toggle: FC<ToggleProps> = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  
  const toggle = () => setIsOn(prev => !prev);
  const turnOn = () => setIsOn(true);
  const turnOff = () => setIsOn(false);
  
  return <>{children({ isOn, toggle, turnOn, turnOff })}</>;
};

// Usage
<Toggle>
  {({ isOn, toggle }) => (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  )}
</Toggle>

// Generic render prop component
interface RenderPropComponentProps<T> {
  data: T;
  render: (data: T) => ReactNode;
  fallback?: ReactNode;
}

function RenderPropComponent<T>({
  data,
  render,
  fallback
}: RenderPropComponentProps<T>) {
  if (!data) {
    return <>{fallback}</>;
  }
  
  return <>{render(data)}</>;
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default AdvancedTypeScript;

