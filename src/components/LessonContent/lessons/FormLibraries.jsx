import { useState } from 'react';

// Simulated React Hook Form API (since we can't install it)
function useReactHookForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const register = (name, options = {}) => {
    return {
      name,
      value: formData[name] || '',
      onChange: (e) => {
        setFormData(prev => ({ ...prev, [name]: e.target.value }));
        if (touched[name] && errors[name]) {
          validateField(name, e.target.value, options);
        }
      },
      onBlur: () => {
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, formData[name], options);
      }
    };
  };

  const validateField = (name, value, options) => {
    if (options.required && !value) {
      setErrors(prev => ({ ...prev, [name]: 'This field is required' }));
      return;
    }
    if (options.pattern && !options.pattern.test(value)) {
      setErrors(prev => ({ ...prev, [name]: options.message || 'Invalid format' }));
      return;
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
    }
  };

  return {
    register,
    handleSubmit,
    formState: { errors, touched },
    watch: (name) => formData[name],
    setValue: (name, value) => setFormData(prev => ({ ...prev, [name]: value })),
    reset: () => {
      setFormData({});
      setErrors({});
      setTouched({});
    }
  };
}

// Simulated Formik API
function useFormik(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name] && errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue: (name, value) => setValues(prev => ({ ...prev, [name]: value })),
    setFieldError: (name, error) => setErrors(prev => ({ ...prev, [name]: error })),
    resetForm: () => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
    }
  };
}

function FormLibraries() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Form Libraries</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">React Hook Form (Complete API)</h3>
        <p className="text-gray-700 mb-4">
          React Hook Form is a performant library with easy validation and minimal re-renders.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ReactHookFormExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} />
      {errors.name && <span>Name is required</span>}
      <button type="submit">Submit</button>
    </form>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">React Hook Form API Methods</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Method</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2"><code>register</code></td>
                <td className="p-2">Register input and validation rules</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>handleSubmit</code></td>
                <td className="p-2">Form submission handler</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>watch</code></td>
                <td className="p-2">Watch form values</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>setValue</code></td>
                <td className="p-2">Manually set field value</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>getValues</code></td>
                <td className="p-2">Get form values</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>reset</code></td>
                <td className="p-2">Reset form to default values</td>
              </tr>
              <tr className="border-b">
                <td className="p-2"><code>trigger</code></td>
                <td className="p-2">Manually trigger validation</td>
              </tr>
              <tr>
                <td className="p-2"><code>formState</code></td>
                <td className="p-2">Form state (errors, touched, isDirty, etc.)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Formik (Complete API)</h3>
        <p className="text-gray-700 mb-4">
          Formik is a popular form library with built-in validation and form state management.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <FormikExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`import { useFormik } from 'formik';

function MyForm() {
  const formik = useFormik({
    initialValues: { name: '', email: '' },
    onSubmit: (values) => console.log(values),
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = 'Required';
      return errors;
    }
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.name && formik.touched.name && (
        <div>{formik.errors.name}</div>
      )}
    </form>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Form Validation Strategies</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. Built-in HTML5 Validation</h4>
              <pre className="text-sm bg-white p-2 rounded">{`<input
  type="email"
  required
  minLength={3}
  pattern="[a-z]+"
/>`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. Custom Validation Functions</h4>
              <pre className="text-sm bg-white p-2 rounded">{`const validate = (value) => {
  if (!value) return 'Required';
  if (value.length < 3) return 'Too short';
  return null;
};`}</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3. Schema Validation (Yup/Zod)</h4>
              <pre className="text-sm bg-white p-2 rounded">{`// Yup
const schema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().email().required()
});

// Zod
const schema = z.object({
  name: z.string().min(3),
  email: z.string().email()
});`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Yup Integration</h3>
        <p className="text-gray-700 mb-4">
          Yup is a schema validation library that works great with form libraries.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  name: yup.string().required('Name is required').min(3),
  email: yup.string().email('Invalid email').required(),
  age: yup.number().min(18).max(100),
  password: yup.string().min(8),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Zod Integration</h3>
        <p className="text-gray-700 mb-4">
          Zod is a TypeScript-first schema validation library.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18).max(100),
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Field Arrays and Nested Forms</h3>
        <p className="text-gray-700 mb-4">
          Handle dynamic arrays of fields and nested form structures.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <FieldArraysExample />
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// React Hook Form - useFieldArray
import { useFieldArray } from 'react-hook-form';

const { fields, append, remove } = useFieldArray({
  control,
  name: 'items'
});

// Formik - FieldArray
import { FieldArray } from 'formik';

<FieldArray name="items">
  {({ push, remove }) => (
    <div>
      {formik.values.items.map((item, index) => (
        <div key={index}>
          <Field name={\`items.\${index}.name\`} />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => push({ name: '' })}>Add</button>
    </div>
  )}
</FieldArray>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Library Comparison</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">React Hook Form</th>
                <th className="text-left p-2">Formik</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Performance</td>
                <td className="p-2">✓ Minimal re-renders</td>
                <td className="p-2">More re-renders</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Bundle size</td>
                <td className="p-2">Smaller</td>
                <td className="p-2">Larger</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Learning curve</td>
                <td className="p-2">Easy</td>
                <td className="p-2">Easy</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Validation</td>
                <td className="p-2">Flexible</td>
                <td className="p-2">Built-in</td>
              </tr>
              <tr>
                <td className="p-2">TypeScript</td>
                <td className="p-2">Excellent</td>
                <td className="p-2">Good</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// React Hook Form Example
function ReactHookFormExample() {
  const { register, handleSubmit, formState: { errors }, reset } = useReactHookForm();

  const onSubmit = (data) => {
    alert('Form submitted: ' + JSON.stringify(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('name', { required: true, minLength: 3 })}
          placeholder="Name (required, min 3 chars)"
          className="w-full px-3 py-2 border rounded"
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">
            {errors.name.type === 'required' ? 'Name is required' : 'Name must be at least 3 characters'}
          </p>
        )}
      </div>
      <div>
        <input
          {...register('email', { 
            required: true, 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email'
            }
          })}
          type="email"
          placeholder="Email (required)"
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message || 'Email is required'}</p>
        )}
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}

// Formik Example
function FormikExample() {
  const formik = useFormik({
    initialValues: { name: '', email: '' },
    onSubmit: (values) => {
      alert('Form submitted: ' + JSON.stringify(values));
      formik.resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Required';
      } else if (values.name.length < 3) {
        errors.name = 'Must be at least 3 characters';
      }
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded"
        />
        {formik.errors.name && formik.touched.name && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
        )}
      </div>
      <div>
        <input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
        />
        {formik.errors.email && formik.touched.email && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
        )}
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}

// Field Arrays Example
function FieldArraysExample() {
  const [items, setItems] = useState([{ name: '', quantity: '' }]);

  const addItem = () => {
    setItems([...items, { name: '', quantity: '' }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    setItems(items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="p-4 bg-white rounded">
      <div className="space-y-2 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              placeholder="Item name"
              className="flex-1 px-3 py-2 border rounded"
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(index, 'quantity', e.target.value)}
              placeholder="Quantity"
              className="w-24 px-3 py-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Item
      </button>
    </div>
  );
}

export default FormLibraries;

