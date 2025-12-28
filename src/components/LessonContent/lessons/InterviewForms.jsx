function InterviewForms() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Forms & Validation - Interview Cheatsheet</h2>
        <p className="text-gray-700">Complete guide to form handling in React interviews</p>
      </div>

      {/* React Hook Form */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">React Hook Form</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Basic Usage:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React Hook Form minimizes re-renders by using uncontrolled components with refs. register() connects inputs to form state. Spread operator {'{'}{'...'}register('fieldName'){'}'} adds name, ref, onChange, onBlur. Validation rules are passed as second argument. handleSubmit wraps onSubmit and validates before calling it. errors object contains validation errors. This approach is more performant than controlled components because it doesn't trigger re-renders on every keystroke.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}
      
      <input {...register('password', { minLength: 8 })} />
      {errors.password && <span>Password must be 8+ characters</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> register() connects inputs. Validation rules in second argument. handleSubmit validates before onSubmit. errors object for error display. Minimal re-renders (uncontrolled approach).</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">Key Features:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Minimal re-renders</li>
              <li>Built-in validation</li>
              <li>Easy integration with validation libraries (Yup, Zod)</li>
              <li>Great performance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Formik */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Formik</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Basic Usage:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Formik uses controlled components approach. useFormik returns form state and handlers. initialValues sets starting form state. validate function runs on change/blur and returns errors object. onSubmit receives validated values. formik.values contains current form values. formik.handleChange updates values. formik.errors contains validation errors. This is a more traditional React approach with controlled inputs, providing more control but potentially more re-renders.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { useFormik } from 'formik';

function Form() {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = 'Required';
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email && <span>{formik.errors.email}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}`}
            </pre>
            <div className="bg-blue-50 p-3 rounded mt-2">
              <p className="text-gray-700 text-sm"><strong>Key Points:</strong> Controlled components approach. validate function for custom validation. formik.values for current state. formik.handleChange updates values. More re-renders than React Hook Form but more control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Validation with Yup */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Yup Validation</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Schema Validation:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Yup provides schema-based validation. Define validation rules declaratively in a schema object. yupResolver integrates Yup with React Hook Form. Schema defines shape and rules for form data. Validation runs automatically on submit and can run on change/blur. This separates validation logic from component code, making it reusable and testable.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  age: yup.number().positive().integer().required()
});

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  // ... rest of form
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Zod Validation */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Zod Validation</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Zod Schema:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Zod is a TypeScript-first schema validation library. Define schemas using z.object() with typed validators. zodResolver integrates Zod with React Hook Form. Zod provides better TypeScript inference than Yup. Schema validation runs automatically. Error messages can be customized inline. This provides type-safe validation with excellent TypeScript support.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be 8+ characters'),
  age: z.number().positive().int()
});

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });
  
  // ... rest of form
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Custom Validation */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Validation Logic</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Custom Validators:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Custom validation functions allow domain-specific validation logic. Pass validate function in register() options. Function receives field value and returns error string if invalid, or true if valid. mode: 'onChange' runs validation on every change. This enables complex validation rules that can't be expressed with simple schema validators. Use for conditional validation, async validation, or business logic checks.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });
  
  const validateEmail = (value) => {
    if (!value.includes('@')) {
      return 'Email must contain @';
    }
    return true;
  };
  
  return (
    <form>
      <input
        {...register('email', {
          required: 'Email is required',
          validate: validateEmail
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Form State Management */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Form State Management</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">State with React Hook Form:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> React Hook Form provides formState object with useful state flags. watch() subscribes to field changes and triggers re-render. watch('fieldName') watches specific field, watch() watches all fields. isDirty indicates if form values changed from defaults. isValid indicates if form passes validation. These flags enable conditional UI updates like disabling submit button until form is valid. Note: watch() causes re-renders, so use selectively.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Form() {
  const { register, watch, formState: { isDirty, isValid, errors } } = useForm();
  
  const watchedEmail = watch('email'); // Watch specific field
  const formValues = watch(); // Watch all fields
  
  return (
    <form>
      <input {...register('email')} />
      {isDirty && <span>Form has been modified</span>}
      {isValid && <span>Form is valid</span>}
      <button disabled={!isValid}>Submit</button>
    </form>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Error Handling in Forms</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Error Display Patterns:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Form errors come from validation (field-level) and submission failures (root-level). errors object contains validation errors keyed by field name. setError('root', {'{'} message: 'error' {'}'}) sets form-level errors like API failures. role="alert" makes error announcements accessible to screen readers. Display field errors near the input, root errors at form level. This pattern ensures users understand both validation and submission errors.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    try {
      await submitForm(data);
    } catch (error) {
      // Handle submission errors
      setError('root', { message: error.message });
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      {errors.root && <div role="alert">{errors.root.message}</div>}
    </form>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Form Submission Patterns */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Form Submission Patterns</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Async Submission:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> handleSubmit automatically validates form before calling onSubmit. onSubmit receives validated form data. Make onSubmit async to handle API calls. isSubmitting flag tracks submission state, useful for disabling submit button and showing loading indicators. Throw errors to trigger error handling. handleSubmit catches errors and can be used with onError callback. This pattern ensures form is validated before submission and provides good UX during async operations.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Form() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  
  const onSubmit = async (data) => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Submission failed');
    }
    
    return response.json();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Nested Forms */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Nested Forms</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Nested Object Fields:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Use dot notation to access nested object properties in form state. defaultValues can define nested structure matching your data shape. register('user.name') creates nested path in form state. This allows complex form structures like user profiles with nested address objects. The form state structure will have nested objects like user containing name and address fields, where address contains street and city. Useful for forms matching API data structures.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Form() {
  const { register } = useForm({
    defaultValues: {
      user: {
        name: '',
        address: {
          street: '',
          city: ''
        }
      }
    }
  });
  
  return (
    <form>
      <input {...register('user.name')} />
      <input {...register('user.address.street')} />
      <input {...register('user.address.city')} />
    </form>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Form Accessibility */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Form Accessibility</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Accessible Form:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Accessibility requires proper labels, ARIA attributes, and error association. htmlFor/id links labels to inputs for screen readers. aria-required indicates required fields. aria-invalid indicates validation state. aria-describedby links input to error message, so screen readers announce errors. role="alert" makes errors immediately announced. This ensures forms are usable by assistive technologies and follows WCAG guidelines.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function Form() {
  const { register, formState: { errors } } = useForm();
  
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        {...register('email', { required: true })}
        aria-required={true}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />
      {errors.email && (
        <span id="email-error" role="alert">
          {errors.email.message}
        </span>
      )}
      
      <button type="submit">Submit</button>
    </form>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Field Arrays */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Field Arrays</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Dynamic Fields:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> useFieldArray manages dynamic lists of form fields. Pass control from useForm() and field array name. fields array contains field objects with id and value. append() adds new field to end. remove(index) removes field at index. Use field.id as key (not index) for stable React keys. register with template literal syntax like register(`items.{'{'}index{'}'}.name`) to register nested array fields. This enables dynamic forms like todo lists, tags, or repeating sections.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`import { useFieldArray } from 'react-hook-form';

function Form() {
  const { register, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });
  
  return (
    <form>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(\`items.\${index}.name\`)} />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '' })}>
        Add Item
      </button>
    </form>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Multi-step Forms */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-step Forms</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Implementation:</p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-2">
              <p className="text-gray-700 text-sm"><strong>Theory:</strong> Multi-step forms break complex forms into manageable steps. useState tracks current step. Conditionally render step components based on step state. trigger() manually validates current step fields before advancing. Only allow next step if current step is valid. Register all fields in same form instance, so final submit has access to all data. This improves UX by reducing cognitive load and making long forms feel manageable.</p>
            </div>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, trigger } = useForm();
  
  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) setStep(step + 1);
  };
  
  return (
    <form>
      {step === 1 && <Step1 register={register} />}
      {step === 2 && <Step2 register={register} />}
      {step === 3 && <Step3 register={register} />}
      
      {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
      {step < 3 && <button onClick={nextStep}>Next</button>}
      {step === 3 && <button type="submit">Submit</button>}
    </form>
  );
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
            <p className="font-semibold mb-2">Q: React Hook Form vs Formik - which to use?</p>
            <p className="text-gray-700">A: React Hook Form has better performance (fewer re-renders). Formik has more features and better TypeScript support. Choose based on project needs.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold mb-2">Q: How do you handle form validation?</p>
            <p className="text-gray-700">A: Use built-in HTML5 validation, custom validation functions, or schema validation libraries like Yup or Zod.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewForms;

