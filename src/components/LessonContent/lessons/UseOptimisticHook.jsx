import { useState } from 'react';

function UseOptimisticHook() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">useOptimistic Hook</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Optimistic Updates</h3>
        <p className="text-gray-700 mb-4">
          useOptimistic allows you to optimistically update UI before server confirmation.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// useOptimistic Hook
// Update UI immediately, rollback on error

import { useOptimistic } from 'react';

// Basic Usage
function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );
  
  async function handleAddTodo(todo) {
    addOptimisticTodo(todo); // Update immediately
    await saveTodo(todo); // Save to server
  }
  
  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// useOptimistic API
const [optimisticState, addOptimisticUpdate] = useOptimistic(
  state,
  updateFn
);

// Parameters:
// - state: Current state
// - updateFn: Function to compute optimistic state
//   (currentState, optimisticValue) => newState

// Returns:
// - optimisticState: Optimistic state value
// - addOptimisticUpdate: Function to add optimistic update

// Update Function
function updateFn(currentState, optimisticValue) {
  // Return new state based on optimistic value
  return newState;
}

// Example: Adding Item
function ShoppingCart({ items }) {
  const [optimisticItems, addItem] = useOptimistic(
    items,
    (state, newItem) => [...state, newItem]
  );
  
  async function handleAdd(item) {
    addItem(item); // Show immediately
    await addToCart(item); // Save to server
  }
  
  return (
    <div>
      {optimisticItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}

// Example: Removing Item
function TodoList({ todos }) {
  const [optimisticTodos, removeTodo] = useOptimistic(
    todos,
    (state, todoId) => state.filter(t => t.id !== todoId)
  );
  
  async function handleRemove(id) {
    removeTodo(id); // Remove immediately
    await deleteTodo(id); // Delete from server
  }
  
  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Example: Updating Item
function TodoList({ todos }) {
  const [optimisticTodos, updateTodo] = useOptimistic(
    todos,
    (state, updatedTodo) =>
      state.map(t => t.id === updatedTodo.id ? updatedTodo : t)
  );
  
  async function handleUpdate(todo) {
    updateTodo(todo); // Update immediately
    await saveTodo(todo); // Save to server
  }
  
  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">useOptimistic API</h3>
        <p className="text-gray-700 mb-4">
          Complete API reference for useOptimistic.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// useOptimistic Signature
function useOptimistic<T>(
  state: T,
  updateFn: (currentState: T, optimisticValue: any) => T
): [T, (optimisticValue: any) => void]

// TypeScript Example
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state: Todo[], newTodo: Todo) => [...state, newTodo]
  );
  
  // ...
}

// Complex State Updates
function Chat({ messages }) {
  const [optimisticMessages, addMessage] = useOptimistic(
    messages,
    (state, { message, tempId }) => [
      ...state,
      { id: tempId, text: message, pending: true }
    ]
  );
  
  async function sendMessage(text) {
    const tempId = generateId();
    addMessage({ message: text, tempId });
    
    try {
      const saved = await api.sendMessage(text);
      // Replace temp message with saved one
    } catch (error) {
      // Remove failed message
    }
  }
  
  return (
    <div>
      {optimisticMessages.map(msg => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
}

// Multiple Optimistic Updates
function TodoApp({ todos }) {
  const [optimisticTodos, updateTodos] = useOptimistic(
    todos,
    (state, updates) => {
      // Handle multiple updates
      return updates.reduce((acc, update) => {
        if (update.type === 'add') {
          return [...acc, update.todo];
        }
        if (update.type === 'remove') {
          return acc.filter(t => t.id !== update.id);
        }
        if (update.type === 'update') {
          return acc.map(t => t.id === update.id ? update.todo : t);
        }
        return acc;
      }, state);
    }
  );
  
  // ...
}

// With useTransition
function TodoList({ todos }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticTodos, addTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );
  
  async function handleAdd(todo) {
    startTransition(() => {
      addTodo(todo);
    });
    await saveTodo(todo);
  }
  
  return (
    <div>
      {isPending && <Spinner />}
      {optimisticTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">UI Responsiveness</h3>
        <p className="text-gray-700 mb-4">
          Improve UI responsiveness with optimistic updates.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Immediate UI Feedback
// Users see changes instantly

function LikeButton({ postId, likes }) {
  const [optimisticLikes, addLike] = useOptimistic(
    likes,
    (state) => state + 1
  );
  
  async function handleLike() {
    addLike(); // Update immediately
    await likePost(postId); // Save to server
  }
  
  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}

// Loading States
function CommentForm({ postId }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticComments, addComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  
  async function handleSubmit(comment) {
    startTransition(() => {
      addComment(comment);
    });
    await postComment(postId, comment);
  }
  
  return (
    <div>
      {isPending && <p>Posting...</p>}
      {optimisticComments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

// Visual Feedback
function TodoItem({ todo }) {
  const [optimisticTodo, updateTodo] = useOptimistic(
    todo,
    (state, updates) => ({ ...state, ...updates })
  );
  
  return (
    <div className={optimisticTodo.pending ? 'opacity-50' : ''}>
      {optimisticTodo.text}
      {optimisticTodo.pending && <Spinner />}
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Error Handling</h3>
        <p className="text-gray-700 mb-4">
          Handle errors and rollback optimistic updates.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Error Handling Pattern
function TodoList({ todos }) {
  const [optimisticTodos, addTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );
  
  async function handleAdd(todo) {
    addTodo(todo); // Optimistic update
    
    try {
      await saveTodo(todo);
      // Success - state will sync with server
    } catch (error) {
      // Error - state will revert automatically
      // Show error message
      alert('Failed to save todo');
    }
  }
  
  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Manual Rollback
function TodoList({ todos, setTodos }) {
  const [optimisticTodos, addTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );
  
  async function handleAdd(todo) {
    const previousTodos = todos;
    addTodo(todo);
    
    try {
      const saved = await saveTodo(todo);
      setTodos([...todos, saved]);
    } catch (error) {
      // Manual rollback
      setTodos(previousTodos);
      alert('Failed to save');
    }
  }
  
  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Error State Management
function CommentForm({ postId }) {
  const [error, setError] = useState(null);
  const [optimisticComments, addComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  
  async function handleSubmit(comment) {
    setError(null);
    addComment(comment);
    
    try {
      await postComment(postId, comment);
    } catch (err) {
      setError('Failed to post comment');
      // State will revert automatically
    }
  }
  
  return (
    <div>
      {error && <ErrorMessage message={error} />}
      {optimisticComments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Rollback Patterns</h3>
        <p className="text-gray-700 mb-4">
          Patterns for handling rollbacks in optimistic updates.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Automatic Rollback
// React automatically reverts on error
// State syncs with server response

function TodoList({ todos }) {
  const [optimisticTodos, addTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );
  
  async function handleAdd(todo) {
    addTodo(todo);
    await saveTodo(todo); // If fails, state reverts
  }
  
  // State automatically matches server state
}

// Explicit Rollback
function TodoList({ todos, setTodos }) {
  const [optimisticTodos, addTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );
  
  async function handleAdd(todo) {
    const snapshot = todos; // Save snapshot
    addTodo(todo);
    
    try {
      await saveTodo(todo);
    } catch (error) {
      setTodos(snapshot); // Explicit rollback
    }
  }
}

// Partial Rollback
function TodoList({ todos }) {
  const [optimisticTodos, updateTodos] = useOptimistic(
    todos,
    (state, updates) => {
      // Apply updates
      return updates.reduce((acc, update) => {
        // Apply update logic
        return acc;
      }, state);
    }
  );
  
  async function handleBatchUpdate(updates) {
    updateTodos(updates);
    
    try {
      const results = await Promise.all(
        updates.map(update => saveTodo(update))
      );
      // Update with server results
    } catch (error) {
      // Partial rollback - revert failed updates only
    }
  }
}

// Best Practices
// 1. Always handle errors
// 2. Provide user feedback
// 3. Show loading states
// 4. Sync with server state
// 5. Handle network failures
// 6. Consider retry logic`}</pre>
        </div>
      </section>
    </div>
  );
}

export default UseOptimisticHook;

