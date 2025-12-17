import { useState } from 'react';

function ControlledForms() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    country: '',
    newsletter: false,
    gender: '',
    interests: [],
    file: null
  });

  const [step, setStep] = useState(1);
  const [dynamicFields, setDynamicFields] = useState([{ id: 1, value: '' }]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (e) => {
    setFormData(prev => ({
      ...prev,
      country: e.target.value
    }));
  };

  const handleCheckboxGroup = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value)
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleDynamicFieldChange = (id, value) => {
    setDynamicFields(prev =>
      prev.map(field => field.id === id ? { ...field, value } : field)
    );
  };

  const addDynamicField = () => {
    setDynamicFields(prev => [...prev, { id: Date.now(), value: '' }]);
  };

  const removeDynamicField = (id) => {
    setDynamicFields(prev => prev.filter(field => field.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData, dynamicFields);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Controlled Forms</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Input, Textarea, Select</h3>
        <p className="text-gray-700 mb-4">
          Controlled form elements have their value controlled by React state.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name (Input):</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email (Input):</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Message (Textarea):</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your message"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Country (Select):</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
  country: ''
});

<input
  value={formData.name}
  onChange={(e) => setFormData({...formData, name: e.target.value})}
/>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Checkboxes and Radio Buttons</h3>
        <p className="text-gray-700 mb-4">
          Handle checkboxes and radio buttons in controlled forms.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Newsletter (Checkbox):</label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Subscribe to newsletter
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Gender (Radio Buttons):</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === 'other'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Interests (Multiple Checkboxes):</label>
              <div className="space-y-2">
                {['Reading', 'Sports', 'Music', 'Travel'].map(interest => (
                  <label key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleCheckboxGroup}
                      className="mr-2"
                    />
                    {interest}
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Selected: {formData.interests.join(', ') || '(none)'}
              </p>
            </div>
          </form>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`// Checkbox
<input
  type="checkbox"
  checked={formData.newsletter}
  onChange={(e) => setFormData({
    ...formData,
    newsletter: e.target.checked
  })}
/>

// Radio buttons
<input
  type="radio"
  value="male"
  checked={formData.gender === 'male'}
  onChange={handleChange}
/>

// Multiple checkboxes
const handleCheckbox = (e) => {
  const { value, checked } = e.target;
  setInterests(prev =>
    checked ? [...prev, value] : prev.filter(i => i !== value)
  );
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">File Uploads</h3>
        <p className="text-gray-700 mb-4">
          Handle file uploads in controlled forms.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Upload File:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded"
              />
              {formData.file && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {formData.file.name} ({(formData.file.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>
          </form>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const [file, setFile] = useState(null);

const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

<input
  type="file"
  onChange={handleFileChange}
/>

// Access file properties
{file && (
  <p>{file.name} - {file.size} bytes</p>
)}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Multi-Step Forms</h3>
        <p className="text-gray-700 mb-4">
          Break complex forms into multiple steps for better UX.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <MultiStepFormExample />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Dynamic Form Fields</h3>
        <p className="text-gray-700 mb-4">
          Add and remove form fields dynamically.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="space-y-2 mb-4">
            {dynamicFields.map(field => (
              <div key={field.id} className="flex gap-2">
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
                  placeholder="Dynamic field"
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeDynamicField(field.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDynamicField}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Field
            </button>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`const [fields, setFields] = useState([{ id: 1, value: '' }]);

const addField = () => {
  setFields([...fields, { id: Date.now(), value: '' }]);
};

const removeField = (id) => {
  setFields(fields.filter(f => f.id !== id));
};

const updateField = (id, value) => {
  setFields(fields.map(f =>
    f.id === id ? { ...f, value } : f
  ));
};`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Form Data Preview</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded overflow-auto">
            {JSON.stringify({ ...formData, file: formData.file?.name || null, dynamicFields }, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
}

// Multi-Step Form Example
function MultiStepFormExample() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    payment: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="p-4 bg-white rounded">
      <div className="mb-4 flex justify-between">
        <div className={`flex-1 text-center ${step >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
          Step 1: Personal
        </div>
        <div className={`flex-1 text-center ${step >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
          Step 2: Address
        </div>
        <div className={`flex-1 text-center ${step >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
          Step 3: Payment
        </div>
      </div>

      <div className="space-y-4">
        {step === 1 && (
          <div>
            <label className="block text-sm font-semibold mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm font-semibold mb-1">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-sm font-semibold mb-1">Payment Method:</label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select payment</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={step === 3}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            {step === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ControlledForms;

