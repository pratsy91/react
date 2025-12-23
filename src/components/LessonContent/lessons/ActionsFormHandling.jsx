import { useState } from 'react';

function ActionsFormHandling() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Actions & Form Handling</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Actions & Form Handling (React 19)</h3>
        <p className="text-blue-800 mb-2">
          React 19 introduces native support for form actions, making form handling simpler and more powerful. Actions are 
          functions that handle form submissions, and they can be server actions (for Server Components) or client-side functions. 
          This feature integrates seamlessly with useActionState and useFormStatus hooks for complete form management.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Form Actions:</strong> Functions that handle form submissions</li>
            <li><strong>Server Actions:</strong> Functions marked with 'use server' for server-side execution</li>
            <li><strong>useActionState:</strong> Hook for managing action state and errors</li>
            <li><strong>useFormStatus:</strong> Hook for accessing form submission status</li>
            <li><strong>Progressive Enhancement:</strong> Forms work without JavaScript</li>
            <li><strong>Built-in Validation:</strong> Native HTML5 validation support</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Simpler form handling without external libraries</li>
            <li>Better integration with Server Components</li>
            <li>Progressive enhancement - works without JS</li>
            <li>Built-in loading and error states</li>
            <li>Type-safe with TypeScript</li>
            <li>Less boilerplate than traditional form handling</li>
          </ul>
          <p className="mt-2"><strong>When to Use:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Forms in React 19 applications</li>
            <li>Server-side form processing</li>
            <li>When you want progressive enhancement</li>
            <li>Forms that need built-in loading states</li>
            <li>Integration with Server Components</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Form Actions</h3>
        <p className="text-gray-700 mb-4">
          React 19 introduces native form actions for better form handling.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Form Actions
// Actions are functions that handle form submissions

// Server Action
async function submitForm(formData) {
  'use server';
  
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Process form data
  await saveToDatabase({ name, email });
  
  return { success: true };
}

// Client Component
function ContactForm() {
  return (
    <form action={submitForm}>
      <input name="name" type="text" />
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Action with useActionState
function MyForm() {
  const [state, formAction] = useActionState(submitForm, null);
  
  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit">Submit</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}

// Progressive Enhancement
// Forms work without JavaScript
<form action="/api/submit" method="POST">
  <input name="name" />
  <button type="submit">Submit</button>
</form>

// With JavaScript, enhanced with actions
<form action={submitAction}>
  <input name="name" />
  <button type="submit">Submit</button>
</form>

// Action Types
// 1. Server Actions (Next.js, Remix)
// 2. Client Actions
// 3. Async Actions
// 4. Action with validation`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useActionState Hook</h3>
        <p className="text-gray-700 mb-4">
          Manage form state and actions with useActionState.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// useActionState Hook
// Formerly useFormState in React 19

import { useActionState } from 'react';

// Action function
async function updateName(prevState, formData) {
  const name = formData.get('name');
  
  if (!name) {
    return { error: 'Name is required' };
  }
  
  try {
    await updateUser(name);
    return { success: true, message: 'Name updated' };
  } catch (error) {
    return { error: error.message };
  }
}

// Component using useActionState
function NameForm() {
  const [state, formAction, isPending] = useActionState(updateName, null);
  
  return (
    <form action={formAction}>
      <input name="name" type="text" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update'}
      </button>
      {state?.error && <p className="error">{state.error}</p>}
      {state?.success && <p className="success">{state.message}</p>}
    </form>
  );
}

// useActionState API
const [state, formAction, isPending] = useActionState(action, initialState);

// Parameters:
// - action: Action function
// - initialState: Initial state value

// Returns:
// - state: Current state from action
// - formAction: Action to pass to form
// - isPending: Loading state

// Action Function Signature
async function action(prevState, formData) {
  // prevState: Previous state
  // formData: FormData from form submission
  // Return: New state
}

// With TypeScript
interface ActionState {
  error?: string;
  success?: boolean;
  message?: string;
}

function updateName(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  // ...
}

// Error Handling
async function submitAction(prevState, formData) {
  try {
    const result = await api.submit(formData);
    return { success: true, data: result };
  } catch (error) {
    return { 
      error: true, 
      message: error.message 
    };
  }
}

// Validation Example
async function validateAction(prevState, formData) {
  const email = formData.get('email');
  
  if (!email || !email.includes('@')) {
    return { error: 'Invalid email' };
  }
  
  return { success: true };
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useFormStatus Hook</h3>
        <p className="text-gray-700 mb-4">
          Access form status from child components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// useFormStatus Hook
// Access form submission status from child components

import { useFormStatus } from 'react-dom';

// Submit Button Component
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// Form Component
function MyForm() {
  return (
    <form action={submitAction}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}

// useFormStatus API
const { pending, data, method, action } = useFormStatus();

// Returns:
// - pending: Boolean, true when form is submitting
// - data: FormData being submitted
// - method: HTTP method ('get' | 'post')
// - action: Action function or URL

// Important: Must be used inside <form>
// Cannot be used outside form context

// Loading State Example
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Spinner />
          Submitting...
        </>
      ) : (
        'Submit'
      )}
    </button>
  );
}

// Accessing Form Data
function FormFields() {
  const { data, pending } = useFormStatus();
  
  const name = data?.get('name');
  
  return (
    <>
      <input name="name" disabled={pending} />
      {pending && <p>Submitting {name}...</p>}
    </>
  );
}

// Multiple Forms
// Each form has its own status
function App() {
  return (
    <>
      <form action={action1}>
        <Fields1 />
        <SubmitButton1 />
      </form>
      <form action={action2}>
        <Fields2 />
        <SubmitButton2 />
      </form>
    </>
  );
}

// Error Handling
function SubmitButton() {
  const { pending, data } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Server Actions</h3>
        <p className="text-gray-700 mb-4">
          Server actions for Next.js and server-side frameworks.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Server Actions
// Functions that run on the server

// Next.js Server Action
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  await db.posts.create({
    title,
    content
  });
  
  revalidatePath('/posts');
}

// Client Component
'use client';

import { createPost } from './actions';

function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">Create</button>
    </form>
  );
}

// Server Action with Validation
'use server';

export async function updateUser(formData: FormData) {
  const name = formData.get('name');
  
  // Validation
  if (!name || name.length < 3) {
    return { error: 'Name must be at least 3 characters' };
  }
  
  await db.users.update({ name });
  return { success: true };
}

// Using with useActionState
function UserForm() {
  const [state, formAction] = useActionState(updateUser, null);
  
  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit">Update</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}

// Server Action Benefits
// - Secure (runs on server)
// - Type-safe
// - No API routes needed
// - Automatic serialization
// - Progressive enhancement`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Progressive Enhancement</h3>
        <p className="text-gray-700 mb-4">
          Forms work without JavaScript, enhanced with it.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Progressive Enhancement
// Forms work without JavaScript
// Enhanced experience with JavaScript

// Base Form (works without JS)
<form action="/api/submit" method="POST">
  <input name="name" required />
  <input name="email" type="email" required />
  <button type="submit">Submit</button>
</form>

// Enhanced Form (with React)
function EnhancedForm() {
  const [state, formAction] = useActionState(submitAction, null);
  
  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}

// Benefits
// - Works without JavaScript
// - Better accessibility
// - Faster initial load
// - Enhanced with JS
// - Graceful degradation

// Best Practices
// 1. Always provide action URL
// 2. Use proper form methods
// 3. Include required attributes
// 4. Add client-side enhancements
// 5. Test without JavaScript`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ActionsFormHandling;

