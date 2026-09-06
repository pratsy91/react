/**
 * Generates src/data/interviewQA.js — lesson-wise Q&A with proper answers.
 * Run: node scripts/generate-interview-qa.mjs
 */
import { writeFileSync } from 'fs';
import { corePhases } from '../src/data/lessons.js';
import { isLearningPhase } from '../src/data/buildPhase17.js';

function q(question, answer, level = 'Mid', extra = {}) {
  return {
    q: question.startsWith('Q:') ? question : `Q: ${question}`,
    a: answer,
    level,
    ...extra,
  };
}

/** Proper interview answers for every lesson (keyed by content id). Min 6 each. */
const curated = {
  'setup-environment': [
    q('Why use Vite instead of Create React App?', 'CRA is deprecated. Vite 7 uses native ESM in development for instant HMR, Rollup for production builds, and first-class React 19 support via @vitejs/plugin-react. Cold starts and rebuilds are much faster than Webpack-based CRA.', 'Mid'),
    q('What is the role of ESLint and Prettier?', 'ESLint catches bugs and enforces rules (including react-hooks). Prettier formats code consistently. Together they reduce review noise and keep a React codebase maintainable.', 'Junior'),
    q('How do you structure a modern React + Vite project?', 'src/ holds components, pages, hooks, and utils; public/ holds static assets; vite.config.js configures the build; .env files use the VITE_ prefix for client-exposed variables.', 'Mid'),
    q('What does the Vite dev server do differently from Webpack?', 'Vite serves source as native ES modules and transforms files on demand. Webpack bundles the whole app on startup, which is slower for large projects.', 'Senior'),
    q('What does @vitejs/plugin-react provide?', 'It enables Fast Refresh, JSX transform (automatic runtime), and optional React Compiler / Babel plugins for a Vite React app.', 'Mid'),
    q('How should environment variables be handled in Vite?', 'Prefix client vars with VITE_ and read them via import.meta.env. Never put secrets in VITE_ variables — they are embedded in the client bundle.', 'Mid'),
  ],
  'jsx-deep-dive': [
    q('What is JSX? Does the browser understand it?', 'JSX is a syntax extension for describing UI in JavaScript. Browsers do not understand it — Vite/Babel compiles it to React.createElement or the automatic jsx runtime.', 'Junior'),
    q('Why must list items have a unique key?', 'Keys let React identify which items changed, were added, or removed. Using array index as key on reorderable lists causes wrong state, lost focus, and UI bugs.', 'Junior'),
    q('What is reconciliation?', 'React compares the new element tree with the previous one and applies the minimal set of DOM updates. Same type → update props; different type → replace the subtree.', 'Mid'),
    q('Explain conditional rendering in JSX.', 'Use ternary for if/else, && for show-when-true (watch out for rendering 0), early returns for guards, or extract complex conditions into variables/components.', 'Mid'),
    q('What are Fragments and when do you use them?', 'Fragments group children without an extra DOM node. Use <>...</> or React.Fragment when you need multiple siblings without a wrapper div.', 'Junior'),
    q('JSX vs createElement — what is the difference?', 'JSX is syntactic sugar. <div className="x">Hi</div> compiles to createElement("div", { className: "x" }, "Hi") or the equivalent jsx() call from react/jsx-runtime.', 'Mid'),
  ],
  'components': [
    q('What is the difference between props and state?', 'Props are read-only inputs passed from parent to child. State is internal mutable data owned by a component and updated with useState, which triggers a re-render.', 'Junior'),
    q('Can you mutate props in a child?', 'No. Props are immutable. The child requests changes through a callback; the parent owns the state.', 'Junior'),
    q('Function vs class components today?', 'Prefer function components with hooks in React 19. Class components are legacy; the main remaining use is error boundaries.', 'Mid'),
    q('What is component composition?', 'Building UI by nesting components and using the children prop instead of inheritance. Composition keeps APIs flexible and reusable.', 'Mid'),
    q('What is the children prop?', 'children is whatever JSX is nested between a component’s tags. It enables layout/wrapper components without hard-coding content.', 'Junior'),
    q('What are default props and how do you set them?', 'In function components, use default parameter values: function Button({ size = "md" }). PropTypes/defaultProps on functions are largely obsolete in modern React.', 'Mid'),
  ],
  'state-management-usestate': [
    q('Explain useState and functional updates.', 'useState returns [value, setter]. Use setCount(prev => prev + 1) when the next value depends on the previous one, especially inside closures, intervals, or batched updates.', 'Junior'),
    q('Why does React batch state updates?', 'Batching merges multiple setState calls into one re-render for performance. React 18+ batches updates from events, promises, timeouts, and native handlers.', 'Mid'),
    q('How do you update object or array state immutably?', 'Always create a new reference: setUser(u => ({ ...u, name })) or setItems(items => [...items, next]). Mutating state in place will not reliably re-render.', 'Junior'),
    q('What is lazy initial state?', 'Pass a function to useState: useState(() => expensive()). React runs it once on mount, not on every render.', 'Mid'),
    q('Multiple useState vs one object state?', 'Multiple primitives are clearer and update independently. Use one object (or useReducer) when fields always change together.', 'Mid'),
    q('Why does state not update immediately after setState?', 'Updates are asynchronous and scheduled. The new value appears on the next render. Read the latest value via the functional updater or in an effect.', 'Junior'),
  ],
  'event-handling': [
    q('What are synthetic events?', 'React wraps native browser events for a consistent cross-browser API. Since React 17, listeners attach to the root container and event pooling was removed.', 'Mid'),
    q('preventDefault vs stopPropagation?', 'preventDefault stops the browser default action (e.g. form submit). stopPropagation stops the event from bubbling to parent handlers.', 'Junior'),
    q('How do you pass arguments to event handlers?', 'Use an arrow wrapper: onClick={() => handle(id)}. Calling handle(id) directly in JSX invokes it during render.', 'Mid'),
    q('What is event delegation in React?', 'React attaches most listeners at the root and dispatches to the matching fiber. You write handlers on elements, but React manages attachment efficiently.', 'Senior'),
    q('How do keyboard and form events work in React?', 'Use onKeyDown/onKeyUp and onSubmit/onChange. For forms, call preventDefault in onSubmit to avoid a full page reload.', 'Junior'),
    q('Do portal events bubble through the React tree?', 'Yes. Even if a portal renders into another DOM node, events bubble through the React parent tree, not only the DOM hierarchy.', 'Senior'),
  ],
  'useeffect-hook': [
    q('When does useEffect run?', 'After the browser paints. [] runs after mount; [deps] when dependencies change; no array runs after every render (usually a bug). Cleanup runs before the next effect and on unmount.', 'Junior'),
    q('What are common useEffect mistakes?', 'Missing dependencies, infinite loops from setting state without proper deps, forgetting cleanup for subscriptions/timers, and fetch race conditions without AbortController.', 'Mid'),
    q('useEffect vs data-fetching libraries?', 'Raw useEffect fetch has no cache, deduplication, or retry. TanStack Query / SWR handle server state better for production apps.', 'Mid'),
    q('How do you avoid race conditions when fetching?', 'Abort the previous request in cleanup with AbortController, or ignore stale responses with a cancelled flag / request id.', 'Mid'),
    q('Can useEffect run during SSR?', 'No. Effects run only on the client after hydration. Put SSR data loading in loaders/Server Components, not useEffect.', 'Senior'),
    q('What belongs in the dependency array?', 'Every reactive value from the component scope that the effect reads. The eslint-plugin-react-hooks exhaustive-deps rule helps catch mistakes.', 'Mid'),
  ],
  'component-lifecycle': [
    q('What is the component lifecycle with hooks?', 'Mount: first render, then effects. Update: re-render when state/props/context change, then effects if deps changed. Unmount: effect cleanups run.', 'Mid'),
    q('What triggers a re-render?', 'State updates in the component, a parent re-render, or a context value change for consumers. React 19 Compiler can skip some unnecessary re-renders.', 'Junior'),
    q('What does Strict Mode do in development?', 'It double-invokes render and effects to surface missing cleanup. Production builds run effects once per mount/update.', 'Mid'),
    q('useEffect vs useLayoutEffect in the lifecycle?', 'useEffect runs after paint (non-blocking). useLayoutEffect runs synchronously after DOM mutations and before paint — use it for measurements.', 'Mid'),
    q('How do class lifecycle methods map to hooks?', 'componentDidMount ≈ useEffect([], fn). componentDidUpdate ≈ useEffect with deps. componentWillUnmount ≈ returning a cleanup from the effect.', 'Mid'),
    q('When does effect cleanup run?', 'Before the effect runs again when dependencies change, and when the component unmounts. Use it for timers, listeners, and subscriptions.', 'Mid'),
  ],
  'useref-hook': [
    q('useRef vs useState — when to use each?', 'useState triggers a re-render when updated. useRef stores a mutable value that persists across renders without re-rendering — DOM nodes, timer ids, previous values.', 'Junior'),
    q('What is a callback ref?', 'A function form: ref={(node) => {...}}. React calls it with the DOM node on mount and null on unmount. Useful for measuring layout or integrating non-React libraries.', 'Mid'),
    q('ref as prop in React 19?', 'Function components can accept ref like any other prop. forwardRef is still supported but often unnecessary in React 19.', 'Mid'),
    q('Can changing ref.current cause a re-render?', 'No. Updating ref.current is a silent mutation. If the UI must update, use state instead.', 'Junior'),
    q('What is useImperativeHandle?', 'Used with forwardRef to expose a custom imperative API to a parent (e.g. focus(), scrollTo()) instead of the raw DOM node.', 'Senior'),
    q('Common use cases for useRef?', 'Input focus, storing interval/timeout ids, keeping the latest callback without re-subscribing, and tracking previous prop/state values.', 'Mid'),
  ],
  'usecontext-hook': [
    q('How does useContext work?', 'It reads the nearest matching Provider above in the tree. When the Provider value changes, every consumer that uses that context re-renders.', 'Junior'),
    q('What is the main Context performance pitfall?', 'A new object as value on every render re-renders all consumers. Fix by memoizing the value, splitting contexts, or using a store with selectors (Zustand/Redux).', 'Mid'),
    q('When should you use Context vs props?', 'Context for app-wide, low-frequency data (theme, auth, locale). Props for parent–child data that stays local.', 'Mid'),
    q('How do you create Context?', 'const ThemeContext = createContext(defaultValue); wrap a tree with <ThemeContext value={theme}> (React 19) or .Provider, then call useContext(ThemeContext).', 'Junior'),
    q('Can you use multiple contexts?', 'Yes. Nest Providers or compose them. Prefer separate contexts per concern so updating theme does not re-render auth consumers.', 'Mid'),
    q('Context with useReducer pattern?', 'Put [state, dispatch] from useReducer in Context to share complex state without Redux. Memoize the provided value to limit re-renders.', 'Senior'),
  ],
  'usereducer-hook': [
    q('useReducer vs useState?', 'useReducer shines for complex state, multiple related fields, or when updates are expressed as actions. useState is enough for simple independent values.', 'Mid'),
    q('What is the reducer pattern?', 'A pure function (state, action) => newState. Same inputs always produce the same output, which makes logic easy to test and reason about.', 'Mid'),
    q('What does the action object look like?', 'Usually { type: "INCREMENT", payload: 1 }. The reducer switches on type and returns the next state immutably.', 'Junior'),
    q('Can useReducer replace Redux?', 'For medium apps, useReducer + Context can replace a lot of Redux. Large apps often still prefer Redux Toolkit for DevTools, middleware, and RTK Query.', 'Senior'),
    q('What is the lazy init argument?', 'useReducer(reducer, initialArg, init) — init(initialArg) runs once to compute initial state (e.g. from localStorage).', 'Senior'),
    q('When combining Context and useReducer, what should you provide?', 'Often provide both state and dispatch. Dispatch is stable, so consumers that only need dispatch can avoid re-renders if you split contexts.', 'Senior'),
  ],
  'usecallback-hook': [
    q('What does useCallback do?', 'It returns a memoized function that keeps the same reference until its dependency array changes. Equivalent to useMemo(() => fn, deps).', 'Mid'),
    q('When should you use useCallback?', 'When passing callbacks to React.memo children, or when a function is a dependency of useEffect/useMemo. Do not wrap every function by default.', 'Mid'),
    q('What happens with empty dependency arrays?', 'The function is created once. If it closes over changing state without functional updates or refs, you get stale closures.', 'Senior'),
    q('Does React 19 Compiler replace useCallback?', 'Often yes when the Compiler is enabled — it auto-memoizes. Know both approaches for interviews and non-Compiler codebases.', 'Senior'),
    q('useCallback vs defining a function inline?', 'Inline functions are new references every render. That breaks memoized children and can re-run effects that list the function as a dependency.', 'Mid'),
    q('Common misuse of useCallback?', 'Wrapping everything “for performance” without measuring, or forgetting dependencies so the callback uses stale values.', 'Mid'),
  ],
  'usememo-hook': [
    q('What does useMemo do?', 'It caches a computed value between renders and recomputes only when dependencies change. Use it for expensive calculations or stable object/array references.', 'Mid'),
    q('useMemo vs useCallback?', 'useMemo memoizes a value; useCallback memoizes a function. useCallback(fn, deps) is useMemo(() => fn, deps).', 'Junior'),
    q('Does useMemo prevent re-renders by itself?', 'No. It avoids recomputing a value. To skip child re-renders, pair a stable memoized prop with React.memo on the child.', 'Mid'),
    q('When is useMemo premature optimization?', 'For cheap calculations, or when deps change every render anyway. Profile first; React Compiler may remove the need for manual memoization.', 'Mid'),
    q('What is referential equality and why does it matter?', 'Objects and functions compare by reference. Creating {} or [] inline each render breaks memo, memoized children, and effect dependency checks.', 'Mid'),
    q('Example of a good useMemo use case?', 'Filtering/sorting a large list, deriving a heavy chart dataset, or building a stable options object passed to a memoized child.', 'Mid'),
  ],
  'uselayouteffect-hook': [
    q('useLayoutEffect vs useEffect?', 'useLayoutEffect runs synchronously after DOM updates and before paint. useEffect runs after paint. Prefer useEffect unless you need to measure or adjust layout before the user sees a frame.', 'Mid'),
    q('When must you use useLayoutEffect?', 'Reading layout (getBoundingClientRect), preventing visual flicker, or syncing with libraries that require DOM measurements before paint.', 'Mid'),
    q('Does useLayoutEffect work on the server?', 'No. It warns during SSR. Guard with typeof window or use useEffect for universal code.', 'Senior'),
    q('Can useLayoutEffect hurt performance?', 'Yes — it blocks painting. Keep work minimal; move non-visual side effects to useEffect.', 'Senior'),
    q('Typical interview example for useLayoutEffect?', 'Measuring a tooltip position and setting state before paint so it appears in the correct place without jumping.', 'Mid'),
    q('Cleanup in useLayoutEffect?', 'Same rules as useEffect: return a cleanup that runs before the next layout effect and on unmount.', 'Mid'),
  ],
  'usedebugvalue-hook': [
    q('What is useDebugValue?', 'It shows a custom label for a custom hook in React DevTools. Optional formatter: useDebugValue(value, v => format(v)).', 'Mid'),
    q('Where can you call useDebugValue?', 'Only inside custom hooks — not in regular components.', 'Junior'),
    q('Is useDebugValue included in production?', 'It is a development aid and does not meaningfully affect production behavior.', 'Junior'),
    q('Why use a formatter function?', 'So DevTools only formats the value when the hooks panel is open, avoiding expensive formatting on every render.', 'Senior'),
    q('Example use case?', 'In useLocalStorage, show useDebugValue(value) so DevTools displays the stored value next to the hook name.', 'Mid'),
    q('Does useDebugValue change runtime behavior of the app?', 'No. It only affects what DevTools displays for debugging custom hooks.', 'Junior'),
  ],
  'useid-hook': [
    q('What is useId?', 'It generates a unique ID that is stable across server and client renders — ideal for htmlFor, aria-describedby, and other accessibility attributes.', 'Mid'),
    q('Why not use Math.random() for IDs?', 'Random IDs differ between server HTML and client hydration, causing hydration mismatches.', 'Mid'),
    q('Can you use useId as a list key?', 'No. List keys should come from your data. useId is for accessibility/DOM id attributes.', 'Mid'),
    q('Does useId work with SSR?', 'Yes. That is its main purpose — consistent IDs between server render and client hydration.', 'Mid'),
    q('Can you call useId multiple times?', 'Yes. Each call produces a distinct ID within the component.', 'Junior'),
    q('useId vs a counter ref?', 'A counter ref can break under SSR/concurrent rendering. useId is the React-supported API for unique, hydration-safe IDs.', 'Senior'),
  ],
  'usetransition-hook': [
    q('What is useTransition?', 'It returns [isPending, startTransition]. Updates inside startTransition are marked non-urgent so React can keep the UI responsive.', 'Mid'),
    q('useTransition vs startTransition from react?', 'useTransition also gives isPending for loading UI. startTransition alone is enough when you do not need pending state.', 'Mid'),
    q('Typical useTransition use cases?', 'Filtering large lists while typing, switching tabs with heavy content, or other UI updates that should not block input.', 'Mid'),
    q('What does isPending mean?', 'True while a transition update is in progress — use it to show a spinner or dim non-urgent UI.', 'Junior'),
    q('Urgent vs non-urgent updates?', 'Typing into an input is urgent. Computing filtered results can be a transition so keystrokes stay snappy.', 'Mid'),
    q('How does this relate to Concurrent React?', 'Transitions rely on interruptible rendering so React can pause low-priority work when higher-priority updates arrive.', 'Senior'),
  ],
  'usedeferredvalue-hook': [
    q('What is useDeferredValue?', 'It returns a deferred version of a value. React may keep showing the previous value while preparing an update with the new one.', 'Mid'),
    q('useDeferredValue vs debounce?', 'Debounce uses a fixed timer. useDeferredValue is integrated with React’s scheduler and can interrupt/resume work based on priority.', 'Senior'),
    q('Typical use case?', 'Keep the input value immediate, but pass useDeferredValue(query) into an expensive filtered list.', 'Mid'),
    q('How do you show that a deferred update is pending?', 'Compare the live value to the deferred value (query !== deferredQuery) and show a pending indicator.', 'Mid'),
    q('useDeferredValue vs useTransition?', 'useTransition wraps the state update. useDeferredValue defers a value you already have (often from props or parent state).', 'Senior'),
    q('Does it replace memoization?', 'No. It helps keep the UI responsive. You may still memoize expensive list rendering, or rely on the React Compiler.', 'Mid'),
  ],
  'usesyncexternalstore-insertioneffect-hook': [
    q('What is useSyncExternalStore?', 'A hook for subscribing to external stores safely under concurrent rendering. It prevents tearing by reading a consistent snapshot.', 'Senior'),
    q('Who uses useSyncExternalStore?', 'Library authors and stores like Redux and Zustand use it under the hood. App code rarely needs it directly unless integrating a custom store or browser API.', 'Senior'),
    q('What is useInsertionEffect?', 'It runs before useLayoutEffect, intended for CSS-in-JS libraries to inject styles before layout measurements.', 'Senior'),
    q('Why not subscribe to an external store with useEffect alone?', 'In concurrent mode you can tear (UI showing mixed old/new store values). useSyncExternalStore was designed to prevent that.', 'Senior'),
    q('What arguments does useSyncExternalStore take?', 'subscribe(callback), getSnapshot(), and optionally getServerSnapshot() for SSR.', 'Mid'),
    q('When would you use useInsertionEffect in app code?', 'Almost never — leave it to styling libraries. Prefer useEffect/useLayoutEffect in application components.', 'Mid'),
  ],
  'react-memo': [
    q('What does React.memo do?', 'It memoizes a component and skips re-rendering when props are shallowly equal to the previous props. You can pass a custom compare function.', 'Mid'),
    q('When should you use React.memo?', 'For expensive components that often receive the same props, or list item components. Profile first — do not memo everything.', 'Mid'),
    q('Why does memo fail with object/function props?', 'Inline objects and functions are new references each render, so shallow compare fails. Stabilize them with useMemo/useCallback or the Compiler.', 'Mid'),
    q('React.memo vs useMemo?', 'React.memo wraps a component. useMemo caches a value inside a component.', 'Junior'),
    q('Does memo deep-compare props?', 'No — shallow compare by default. Nested object field changes need a new object reference or a custom comparator.', 'Mid'),
    q('React 19 Compiler and memo?', 'The Compiler can automatically memoize components, reducing the need for manual React.memo in many cases.', 'Senior'),
  ],
  'code-splitting': [
    q('How do you code-split in React?', 'Use React.lazy(() => import("./Page")) with <Suspense fallback={...}>, or dynamic import(). Vite emits separate chunks automatically.', 'Mid'),
    q('Route-based vs component-based splitting?', 'Route-based is most common — each page is a separate chunk. Component-based splits heavy modals, charts, or editors.', 'Mid'),
    q('What goes in a Suspense fallback?', 'A spinner or skeleton that matches layout to reduce layout shift. Nested Suspense boundaries allow granular loading.', 'Mid'),
    q('How does code splitting help performance?', 'Users download only the JS needed for the current route, improving initial load time and Time to Interactive.', 'Junior'),
    q('What if a lazy import fails?', 'Wrap with an error boundary (and optionally retry). Suspense alone does not handle load errors.', 'Mid'),
    q('Named exports and React.lazy?', 'lazy expects a default export. For named exports, re-export a default or map: import("./m").then(m => ({ default: m.Foo })).', 'Senior'),
  ],
  'performance-patterns': [
    q('How do you optimize large lists in React?', 'Virtualize with react-window or TanStack Virtual so only visible rows render. Use stable keys and memoized row components.', 'Mid'),
    q('Debouncing vs throttling?', 'Debounce waits until activity pauses (search input). Throttle limits calls to once per interval (scroll handlers).', 'Mid'),
    q('How do you analyze React performance?', 'React DevTools Profiler for re-renders, Chrome Performance for long tasks, and bundle analyzers for JS size.', 'Mid'),
    q('What is optimistic UI?', 'Update the UI immediately before the server responds, then rollback on failure. Improves perceived performance for likes, todos, etc.', 'Mid'),
    q('Image and asset optimizations?', 'Lazy-load images, use modern formats (WebP/AVIF), correct sizes, and preload critical assets.', 'Junior'),
    q('Common performance anti-patterns?', 'Unnecessary context updates, inline objects breaking memo, fetching in every child, and shipping huge unused libraries.', 'Senior'),
  ],
  'compound-components': [
    q('What are compound components?', 'A set of components that work together and share implicit state (often via Context), e.g. Tabs, Tabs.List, Tabs.Panel.', 'Mid'),
    q('Why use compound components?', 'They give a flexible API without prop-drilling every option into one mega-component. Consumers compose the pieces they need.', 'Mid'),
    q('How is state shared between compound parts?', 'Usually React Context inside the parent compound component. Children read/write shared state without explicit props.', 'Mid'),
    q('Compound components vs a single props API?', 'Single props APIs are simpler for basic cases. Compound components scale better for complex, configurable UI.', 'Mid'),
    q('Real-world examples?', 'Select menus, tabs, accordion, and menu systems (Radix/Headless UI style APIs).', 'Junior'),
    q('Pitfall of compound components?', 'Children must be used under the parent provider. Document the required structure and validate in development if needed.', 'Senior'),
  ],
  'render-props': [
    q('What is the render props pattern?', 'A component accepts a function as a prop (or children) and calls it with state/data: <Mouse render={({ x, y }) => ...} />.', 'Mid'),
    q('Render props vs custom hooks?', 'Custom hooks are preferred for sharing logic in modern React. Render props still help when you need to invert control of rendering.', 'Mid'),
    q('Function-as-children — is that render props?', 'Yes. children can be a function: <Data>{(data) => <List items={data} />}</Data>.', 'Junior'),
    q('Downsides of render props?', 'Nesting can get deep (“callback hell”), and TypeScript typing is noisier than hooks.', 'Mid'),
    q('When might you still choose render props?', 'Headless UI libraries that separate behavior from presentation, or when consumers need full control of the rendered tree.', 'Senior'),
    q('HOC vs render props vs hooks?', 'Hooks for logic reuse; render props for render inversion; HOCs for wrapping component trees. Prefer hooks in new React 19 code.', 'Senior'),
  ],
  'higher-order-components': [
    q('What is a Higher-Order Component (HOC)?', 'A function that takes a component and returns a new component with added behavior or props: withAuth(Profile).', 'Mid'),
    q('HOC vs custom hooks?', 'Prefer custom hooks for reusable logic. Use an HOC when you need to wrap JSX structure or inject props around an existing component.', 'Senior'),
    q('Common HOC pitfalls?', 'Wrapper hell, static prop collisions, broken refs without forwarding, and harder debugging of display names.', 'Mid'),
    q('How do you preserve the display name?', 'Set Wrapped.displayName = `withX(${Component.displayName || Component.name})` for clearer DevTools.', 'Mid'),
    q('Do you still need HOCs in React 19?', 'Less often. Hooks and composition cover most cases. Some libraries still expose HOCs for compatibility.', 'Mid'),
    q('Example HOC use case?', 'withLoading that shows a spinner when isLoading is true, otherwise renders the wrapped component.', 'Junior'),
  ],
  'custom-hooks': [
    q('How do you create a custom hook?', 'Extract stateful logic into a function whose name starts with use and that calls other hooks. Return the values/APIs the component needs.', 'Mid'),
    q('What are the Rules of Hooks?', 'Call hooks only at the top level of React functions — not in loops, conditions, or nested functions. Only call them from components or other hooks.', 'Junior'),
    q('Why must custom hooks start with use?', 'So lint rules and React tooling can enforce the Rules of Hooks and treat them as hooks.', 'Junior'),
    q('Do custom hooks share state between components?', 'No. Each call gets its own state. They share logic, not a single state instance (unless they use a shared store/context).', 'Mid'),
    q('How do you test custom hooks?', 'Use renderHook from React Testing Library, or test through a small harness component.', 'Mid'),
    q('Examples of good custom hooks?', 'useLocalStorage, useDebounce, useMediaQuery, useFetch (or prefer TanStack Query for server state).', 'Junior'),
  ],
  'controlled-uncontrolled-components': [
    q('Controlled vs uncontrolled inputs?', 'Controlled: React state is the source of truth (value + onChange). Uncontrolled: the DOM holds the value; you read it via refs or FormData.', 'Junior'),
    q('When prefer controlled components?', 'When you need instant validation UI, disable submit based on values, or transform input as the user types.', 'Mid'),
    q('When prefer uncontrolled components?', 'Simple forms, file inputs (always uncontrolled), performance-sensitive large forms (React Hook Form’s default approach), and FormData/Actions.', 'Mid'),
    q('Can a component be both?', 'Sometimes — defaultValue for initial uncontrolled value, then switch to controlled. Mixing without care causes React warnings.', 'Senior'),
    q('How do file inputs work?', 'File inputs are uncontrolled. Use ref or FormData; you cannot set file value programmatically for security reasons.', 'Mid'),
    q('Why does React Hook Form prefer uncontrolled?', 'Fewer re-renders — it registers inputs via refs instead of putting every keystroke into React state.', 'Mid'),
  ],
  'portal': [
    q('What are React Portals?', 'createPortal(child, domNode) renders children into a different DOM node while keeping them in the React tree for context and events.', 'Mid'),
    q('Common portal use cases?', 'Modals, tooltips, dropdowns, and toasts that must escape overflow:hidden or stacking-context parents.', 'Mid'),
    q('Do events bubble from a portal?', 'Yes, through the React tree (logical parent), even if the DOM parent is different.', 'Senior'),
    q('How do you create a portal?', 'ReactDOM.createPortal(<Modal />, document.getElementById("modal-root")).', 'Junior'),
    q('Accessibility concerns with modals/portals?', 'Trap focus, restore focus on close, use aria-modal, and close on Escape.', 'Mid'),
    q('SSR and portals?', 'Ensure the target DOM node exists. On the server you may render null and create the portal after mount.', 'Senior'),
  ],
  'error-boundaries': [
    q('What are Error Boundaries?', 'Components that catch render/lifecycle errors in their child tree and show a fallback UI instead of crashing the whole app.', 'Mid'),
    q('Can Error Boundaries be hooks?', 'No. They require class methods: getDerivedStateFromError and componentDidCatch. There is no hook equivalent yet.', 'Mid'),
    q('What errors do they NOT catch?', 'Errors in event handlers, async code, SSR, and the boundary’s own render. Use try/catch for those.', 'Mid'),
    q('Where should you place Error Boundaries?', 'Around routes, widgets, and risky third-party components — not only one global boundary — so the rest of the app stays usable.', 'Senior'),
    q('getDerivedStateFromError vs componentDidCatch?', 'getDerivedStateFromError updates state for fallback UI during render. componentDidCatch is for side effects like logging.', 'Mid'),
    q('How do you recover from an error boundary?', 'Provide a “Try again” button that resets boundary state, or navigate to a safe route.', 'Mid'),
  ],
  'error-handling-patterns': [
    q('How do you handle errors in event handlers?', 'Error boundaries do not catch them — use try/catch, set error state for UI, and log to a service like Sentry.', 'Mid'),
    q('How do you handle async errors?', 'try/catch around await, .catch on promises, and map failures to user-friendly messages without leaking internals.', 'Mid'),
    q('What is graceful degradation?', 'Keep core UI usable when a non-critical feature fails — show a partial error state instead of a blank page.', 'Mid'),
    q('Error logging best practices?', 'Capture stack, user context, release version; scrub PII; alert on spikes. Do not only console.log in production.', 'Senior'),
    q('How do forms surface validation vs server errors?', 'Client validation for fast feedback; server errors shown near fields or as a form-level message after submit.', 'Mid'),
    q('Retry strategies?', 'Idempotent GETs can retry with backoff. Mutations need care — avoid duplicate creates without idempotency keys.', 'Senior'),
  ],
  'concurrent-rendering': [
    q('What is Concurrent React?', 'React can interrupt, pause, and resume rendering. Urgent updates (typing, clicks) take priority over non-urgent ones (filtering large lists). Enabled with createRoot in React 18+.', 'Mid'),
    q('What is automatic batching in React 18?', 'All state updates in the same tick are batched into one re-render — including updates inside promises and timeouts.', 'Mid'),
    q('createRoot vs ReactDOM.render?', 'createRoot enables concurrent features. ReactDOM.render is legacy and does not turn on the concurrent model.', 'Junior'),
    q('What is interruptible rendering?', 'React may stop a low-priority render mid-way when a higher-priority update arrives, then continue later.', 'Senior'),
    q('How do transitions relate to concurrency?', 'startTransition marks updates as interruptible/non-urgent so the UI stays responsive.', 'Mid'),
    q('Does concurrency change how you write components?', 'Mostly write pure components and correct effect deps. Use transitions/deferred values where heavy updates block the UI.', 'Senior'),
  ],
  'suspense': [
    q('What is Suspense?', 'A boundary that shows fallback UI while children are loading — originally for React.lazy, extended for data loading with framework support.', 'Mid'),
    q('Suspense for code splitting?', 'Wrap lazy components: <Suspense fallback={<Spinner />}><LazyPage /></Suspense>.', 'Junior'),
    q('Suspense for data fetching?', 'Works when the data source integrates with Suspense (framework loaders, Relay, TanStack Query suspense mode). Plain useEffect fetch does not suspend by itself.', 'Senior'),
    q('Multiple Suspense boundaries?', 'Yes — nest them so the shell loads fast while slower sections stream or load independently.', 'Mid'),
    q('Suspense vs Error Boundaries?', 'Suspense handles loading states; Error Boundaries handle thrown errors. Use both around async UI.', 'Mid'),
    q('What is a good fallback?', 'Skeletons matching content layout reduce layout shift better than a generic spinner alone.', 'Junior'),
  ],
  'server-components': [
    q('What are React Server Components (RSC)?', 'Components that run only on the server. They can access databases/files directly and send zero client JS for that component’s code.', 'Senior'),
    q('Client vs Server Components?', 'Server: data fetching and static/non-interactive UI. Client ("use client"): hooks, events, browser APIs.', 'Senior'),
    q('Can Server Components use useState?', 'No. Hooks like useState/useEffect are client-only. Pass data as props to Client Components for interactivity.', 'Mid'),
    q('How do props cross the server/client boundary?', 'Only serializable props. Functions and class instances cannot be passed from Server to Client Components.', 'Senior'),
    q('Primary adoption path for RSC?', 'Next.js App Router is the main production path. React 19 stabilizes the RSC model for frameworks.', 'Mid'),
    q('Benefits of RSC?', 'Smaller client bundles, secrets stay on the server, and data fetching closer to the source without extra API hops.', 'Mid'),
  ],
  'transitions': [
    q('What is startTransition used for?', 'Marking state updates as non-urgent so React can keep urgent updates (like typing) responsive.', 'Mid'),
    q('useTransition deep dive — what does it return?', '[isPending, startTransition]. isPending is true while the transition is in flight.', 'Mid'),
    q('Urgent vs non-urgent updates?', 'Urgent: input text, clicks. Non-urgent: filtering results, switching a heavy view. Put the latter in a transition.', 'Mid'),
    q('How do you show loading during a transition?', 'Use isPending to dim content or show a lightweight pending indicator without blocking input.', 'Junior'),
    q('Can transitions be nested or interrupted?', 'Yes — newer urgent updates can interrupt in-progress transitions under concurrent rendering.', 'Senior'),
    q('transition vs debounce?', 'Debounce delays by time. Transitions are priority-based and cooperate with React’s scheduler.', 'Senior'),
  ],
  'router-setup': [
    q('BrowserRouter vs createBrowserRouter?', 'BrowserRouter is the simpler component API. createBrowserRouter (React Router 7 data router) supports loaders, actions, and errorElement — preferred for production apps.', 'Mid'),
    q('What is RouterProvider?', 'The component that takes a data router from createBrowserRouter and provides routing context to the app.', 'Junior'),
    q('HashRouter vs BrowserRouter?', 'BrowserRouter uses clean HTML5 history URLs (needs server fallback). HashRouter uses #/ paths and works on static hosts without rewrite rules.', 'Mid'),
    q('What is createRoutesFromElements?', 'A helper to define data-router routes using JSX <Route> elements instead of plain objects.', 'Mid'),
    q('MemoryRouter use case?', 'Tests and non-browser environments — keeps history in memory without touching the address bar.', 'Mid'),
    q('React Router 7 highlights?', 'Unified data APIs, loaders/actions, better framework-mode options, and continued support for SPA routing.', 'Senior'),
  ],
  'router-components-hooks': [
    q('Explain useNavigate, useParams, useLocation, useSearchParams.', 'useNavigate for programmatic navigation; useParams for :id segments; useLocation for pathname/state; useSearchParams for query strings.', 'Junior'),
    q('Link vs NavLink?', 'Both navigate client-side. NavLink applies active styles when the route matches — ideal for nav menus.', 'Junior'),
    q('What is Outlet?', 'Renders the matched child route inside a parent layout — enables nested routing with shared chrome.', 'Mid'),
    q('What does Navigate do?', 'Declarative redirect component. Useful in protected routes: if (!user) return <Navigate to="/login" replace />.', 'Mid'),
    q('useOutletContext?', 'Shares values from a parent layout route to child routes rendered in Outlet without prop drilling.', 'Mid'),
    q('useMatch / useResolvedPath?', 'useMatch checks if a pattern matches the current location; useResolvedPath resolves relative paths — useful for active states and nested links.', 'Senior'),
  ],
  'advanced-routing': [
    q('How do you implement protected routes?', 'A layout route that checks auth and renders <Outlet /> or redirects with Navigate. With data routers, loaders can throw redirect().', 'Mid'),
    q('What are route loaders?', 'Functions that load data before the route renders. Components read data with useLoaderData — fewer useEffect fetches.', 'Senior'),
    q('What are route actions?', 'Handle form mutations for a route. Pair with React Router Form and useActionData / useFetcher.', 'Senior'),
    q('How do you lazy-load routes?', 'route.lazy or React.lazy + Suspense. Vite splits each dynamic import into its own chunk.', 'Mid'),
    q('Nested and layout routes?', 'Parent route renders shared UI + Outlet; children fill the outlet. Index routes render at the parent path.', 'Mid'),
    q('errorElement on routes?', 'Per-route error UI when loaders/actions/render throw — better isolation than one global boundary.', 'Mid'),
  ],
  'controlled-forms': [
    q('How do controlled form inputs work?', 'Each input’s value comes from React state and updates via onChange. React is the single source of truth.', 'Junior'),
    q('How do you handle checkboxes and radios?', 'Checkbox: checked + onChange with boolean/array state. Radio: shared name and value compared to selected state.', 'Mid'),
    q('Multi-step forms approach?', 'Lift all step state to a parent (or one form library instance), validate per step, persist if needed, submit on the last step.', 'Senior'),
    q('File uploads in controlled forms?', 'Files stay uncontrolled; store File objects from onChange in state for preview/upload, submit via FormData.', 'Mid'),
    q('Dynamic fields?', 'Store an array in state and map inputs; add/remove items immutably. Field arrays in RHF/Formik help at scale.', 'Mid'),
    q('Preventing default submit?', 'onSubmit={(e) => { e.preventDefault(); ... }} so the browser does not reload the page.', 'Junior'),
  ],
  'form-libraries': [
    q('Why is React Hook Form popular?', 'It minimizes re-renders by using uncontrolled inputs with refs, has a small API, and integrates well with Zod and TypeScript.', 'Mid'),
    q('React Hook Form vs Formik?', 'RHF is usually lighter and faster. Formik is more controlled/reducer-oriented. Both are production-ready; RHF is more common in new apps.', 'Mid'),
    q('How does Zod validation integrate?', 'Define a schema and pass zodResolver(schema) to useForm. One schema gives runtime validation and TypeScript types.', 'Mid'),
    q('What are field arrays?', 'APIs for dynamic lists of fields (add/remove/reorder) — useFieldArray in RHF or FieldArray in Formik.', 'Mid'),
    q('When skip a form library?', 'Tiny forms with 1–2 fields can use local state or FormData. Libraries pay off for validation, nested fields, and large forms.', 'Junior'),
    q('Yup vs Zod?', 'Both schema validators. Zod has stronger TypeScript inference and is widely preferred in modern React + RHF stacks.', 'Mid'),
  ],
  'uncontrolled-forms': [
    q('How do uncontrolled forms work in React?', 'Inputs keep their own DOM state. Read values with refs or FormData on submit instead of tracking every keystroke in React state.', 'Junior'),
    q('What is the FormData API approach?', 'On submit: const data = new FormData(e.target). Works well with native forms and React 19 Actions.', 'Mid'),
    q('defaultValue vs value?', 'defaultValue sets the initial uncontrolled value. value makes the input controlled. Do not mix them casually.', 'Mid'),
    q('When are uncontrolled forms a good fit?', 'Simple contact forms, progressive enhancement, file inputs, and performance-sensitive large forms.', 'Mid'),
    q('How does React Hook Form use uncontrolled inputs?', 'register() attaches refs so RHF reads values without re-rendering on each keypress (unless you watch fields).', 'Mid'),
    q('Uncontrolled + React 19 Actions?', 'Native <form action={fn}> works with uncontrolled fields and FormData — great for progressive enhancement.', 'Senior'),
  ],
  'advanced-context-patterns': [
    q('How do you optimize Context performance?', 'Split contexts by concern, memoize Provider values, avoid creating new objects each render, and consider selector-based stores for high-frequency updates.', 'Mid'),
    q('Context composition pattern?', 'Nest providers in a single AppProviders component so the root stays clean and order is consistent.', 'Mid'),
    q('Context splitting — why?', 'So updating theme does not re-render every consumer of user data. Separate ThemeContext and AuthContext.', 'Mid'),
    q('Context + useReducer for app state?', 'Good for medium complexity without Redux. Provide state and dispatch; optionally split into two contexts.', 'Senior'),
    q('When Context is the wrong tool?', 'High-frequency updates (mouse position, form keystrokes) or very large state trees — use a dedicated store instead.', 'Senior'),
    q('Dynamic context values?', 'Derive value from props/state and memoize. Document which updates consumers should expect.', 'Mid'),
  ],
  'redux-toolkit': [
    q('What are Redux Toolkit slices?', 'createSlice defines name, initial state, and reducers with Immer. It generates action creators and the reducer automatically.', 'Mid'),
    q('Why prefer RTK over classic Redux?', 'Less boilerplate, immutable updates via Immer, good defaults in configureStore, and built-in DevTools setup.', 'Junior'),
    q('What is RTK Query?', 'RTK’s data-fetching layer: define endpoints, get auto-generated hooks, caching, invalidation, and optimistic updates.', 'Senior'),
    q('useSelector and useDispatch?', 'useSelector reads store state (re-renders when selected value changes). useDispatch returns the dispatch function.', 'Junior'),
    q('createAsyncThunk purpose?', 'Standardizes async request lifecycles (pending/fulfilled/rejected) for slices without hand-rolled action types.', 'Mid'),
    q('RTK Query vs TanStack Query?', 'Both cache server state. Pick one strategy per app to avoid duplicate caches and conflicting invalidation.', 'Senior'),
  ],
  'zustand': [
    q('Why is Zustand popular?', 'Minimal API, no Provider required, and selectors so components re-render only when selected state changes.', 'Mid'),
    q('Basic Zustand store example?', 'create((set) => ({ count: 0, inc: () => set((s) => ({ count: s.count + 1 })) })).', 'Junior'),
    q('Zustand vs Context?', 'Zustand avoids Provider boilerplate and prevents the “all consumers re-render” problem via selectors.', 'Mid'),
    q('Zustand vs Redux Toolkit?', 'Zustand is lighter for simple global state. RTK fits larger apps needing middleware, DevTools conventions, and RTK Query.', 'Senior'),
    q('Persistence middleware?', 'zustand/middleware persist can sync slices to localStorage with hydration handling.', 'Mid'),
    q('Do you need a Provider?', 'Not for the default store. Optional context stores exist if you need per-tree isolation.', 'Junior'),
  ],
  'jotai': [
    q('What is Jotai?', 'An atomic state library — you compose small atoms bottom-up instead of one big store.', 'Mid'),
    q('Jotai vs Zustand?', 'Jotai is atom-based and great for derived/async atoms. Zustand is a single store with a simpler mental model for many apps.', 'Senior'),
    q('What is a derived atom?', 'An atom whose value is computed from other atoms — updates when dependencies change.', 'Mid'),
    q('Async atoms?', 'Atoms can hold promises/async reads; UI can suspend or show loading depending on integration.', 'Senior'),
    q('When choose Jotai?', 'When state naturally splits into many independent pieces with complex derived relationships.', 'Mid'),
    q('Provider in Jotai?', 'Optional Provider scopes atoms per tree; without it, atoms are app-global.', 'Mid'),
  ],
  'recoil': [
    q('What is Recoil?', 'Meta’s atomic state library with atoms and selectors. Less common in new projects than Zustand/Jotai, but still appears in interviews.', 'Mid'),
    q('Atoms vs selectors?', 'Atoms hold state. Selectors derive/compute values (sync or async) from atoms.', 'Mid'),
    q('Atom families?', 'Factories for parameterized atoms — e.g. one atom per item id.', 'Senior'),
    q('RecoilRoot requirement?', 'Yes — the tree must be wrapped in RecoilRoot for atoms to work.', 'Junior'),
    q('Why might teams avoid Recoil today?', 'Slower ecosystem momentum vs Zustand/Jotai/Redux; prefer libraries with clearer long-term maintenance.', 'Senior'),
    q('Recoil vs Context?', 'Recoil provides fine-grained subscriptions; Context re-renders all consumers of a value.', 'Mid'),
  ],
  'native-fetch': [
    q('Problems with useEffect-only fetching?', 'No caching, deduplication, retries, or shared loading state. Race conditions need AbortController. Prefer TanStack Query for server state.', 'Mid'),
    q('How do you cancel a fetch?', 'const controller = new AbortController(); fetch(url, { signal: controller.signal }); abort in effect cleanup.', 'Mid'),
    q('Loading and error state pattern?', 'Track status flags or a status enum (idle/loading/success/error) plus data and error fields.', 'Junior'),
    q('Where should caching live?', 'In memory (Query client), HTTP cache headers, or a global store — not ad-hoc variables per component.', 'Senior'),
    q('Handling non-OK responses?', 'Check response.ok; throw or set error for 4xx/5xx instead of assuming JSON success.', 'Junior'),
    q('JSON parsing pitfalls?', 'Empty responses, wrong content-type, and double-parsing. Guard and provide clear errors.', 'Mid'),
  ],
  'react-query': [
    q('What is TanStack Query?', 'A server-state library. useQuery caches by queryKey and provides data, status, refetch, and background revalidation (stale-while-revalidate).', 'Mid'),
    q('What is a query key?', 'A unique cache identity, usually an array like ["users", userId]. Include every variable the query depends on.', 'Mid'),
    q('useMutation purpose?', 'For creates/updates/deletes. On success, invalidate or update related queries so the UI stays fresh.', 'Mid'),
    q('What are optimistic updates?', 'Update the cache immediately in onMutate, snapshot previous data, and roll back in onError if the server fails.', 'Senior'),
    q('useInfiniteQuery?', 'For paginated/infinite scroll lists — manages pages and fetchNextPage.', 'Mid'),
    q('Why not put server data only in Redux?', 'Server state needs caching, staleness, and retries. TanStack Query specializes in that; keep Redux for true client state.', 'Senior'),
  ],
  'swr': [
    q('What is SWR?', 'A lightweight data-fetching library from Vercel using stale-while-revalidate: show cached data, then revalidate in the background.', 'Mid'),
    q('TanStack Query vs SWR?', 'Both revalidate cached data. TanStack Query has richer mutations, DevTools, and infinite query APIs; SWR is smaller/simpler.', 'Senior'),
    q('Basic useSWR usage?', 'const { data, error, isLoading } = useSWR(key, fetcher). Key null disables the request.', 'Junior'),
    q('How do mutations work in SWR?', 'Use mutate to update cache locally and/or revalidate from the server.', 'Mid'),
    q('Revalidation triggers?', 'Focus, reconnect, interval polling, and manual mutate — configurable per hook/global config.', 'Mid'),
    q('When choose SWR?', 'Smaller apps or Next.js-centric stacks wanting a minimal API with good defaults.', 'Mid'),
  ],
  'axios-integration': [
    q('Axios vs fetch?', 'Axios adds interceptors, automatic JSON transforms, request cancellation helpers, and timeouts. fetch is native and enough for many apps.', 'Mid'),
    q('What are Axios interceptors?', 'Middleware for requests/responses — attach auth tokens, refresh on 401, or normalize errors globally.', 'Mid'),
    q('How do you use Axios with TanStack Query?', 'Pass an axios call as queryFn/mutationFn. Query libraries manage cache; Axios manages HTTP.', 'Mid'),
    q('Custom hooks with Axios?', 'Wrap common endpoints in hooks, but prefer TanStack Query for shared server state instead of hand-rolled hooks alone.', 'Mid'),
    q('Error handling pattern?', 'Normalize error shape in an interceptor; surface message/status to UI; avoid leaking stack traces.', 'Senior'),
    q('Base URL and instances?', 'create an axios instance with baseURL and headers for each API to keep config DRY.', 'Junior'),
  ],
  'css-modules': [
    q('What are CSS Modules?', 'CSS files where class names are locally scoped and hashed at build time (Button_primary_x7f2a). Zero runtime cost. Vite supports them by default.', 'Junior'),
    q('How do you compose classes?', 'Import styles and use styles.btn, or composes: in the CSS module for composition.', 'Mid'),
    q('Global vs local styles?', 'Default classes are local. Use :global(.name) sparingly for third-party or truly global selectors.', 'Mid'),
    q('Pros of CSS Modules?', 'No naming collisions, no runtime CSS-in-JS cost, works well with SSR/RSC.', 'Mid'),
    q('Cons?', 'Dynamic theming is less ergonomic than CSS variables + Tailwind or CSS-in-JS.', 'Mid'),
    q('CSS Modules vs Tailwind?', 'Modules keep styles in CSS files; Tailwind uses utility classes in JSX. Both avoid runtime CSS-in-JS.', 'Junior'),
  ],
  'styled-components': [
    q('What is styled-components?', 'A CSS-in-JS library that creates components with attached styles using template literals, with theming support.', 'Junior'),
    q('Trade-offs of CSS-in-JS?', 'Great for dynamic styles colocated with components, but adds runtime cost and is awkward with React Server Components.', 'Mid'),
    q('How does theming work?', 'ThemeProvider supplies a theme object; styled components read props.theme.', 'Mid'),
    q('SSR considerations?', 'Need stylesheet extraction/hydration setup to avoid flash of unstyled content.', 'Senior'),
    q('styled-components vs Emotion?', 'Similar ideas; Emotion is often faster and offers a css prop. For new RSC-heavy apps, prefer Tailwind/CSS Modules.', 'Senior'),
    q('Dynamic styles example?', 'const Button = styled.button`color: ${p => p.$primary ? "white" : "black"}`; use transient props ($primary) to avoid DOM warnings.', 'Mid'),
  ],
  'emotion': [
    q('What is Emotion?', 'A CSS-in-JS library supporting the css prop and styled API, commonly used for dynamic styling and theming.', 'Mid'),
    q('css prop vs styled API?', 'css prop styles elements/components inline with Emotion; styled creates reusable styled components.', 'Mid'),
    q('Emotion vs styled-components?', 'Emotion generally has better performance and a flexible css prop; both are runtime CSS-in-JS.', 'Mid'),
    q('Theming with Emotion?', 'ThemeProvider + useTheme, or pass theme into css functions.', 'Mid'),
    q('RSC compatibility?', 'Runtime CSS-in-JS is problematic on the server component graph — prefer zero-runtime approaches for RSC apps.', 'Senior'),
    q('When pick Emotion?', 'Existing Emotion codebase, need css prop, or complex dynamic styles in a client-only app.', 'Mid'),
  ],
  'tailwind-css': [
    q('What is Tailwind CSS?', 'A utility-first CSS framework. You compose classes like flex, p-4, text-lg in JSX. Tailwind v4 integrates with Vite via @tailwindcss/vite.', 'Junior'),
    q('Pros of Tailwind?', 'Fast UI iteration, consistent design tokens, and small production CSS after unused utilities are removed.', 'Junior'),
    q('Cons of Tailwind?', 'Verbose class strings in JSX and a learning curve for the utility vocabulary.', 'Mid'),
    q('How do you handle dark mode?', 'Use the dark: variant and/or class strategy on the html element, often toggled via state/localStorage.', 'Mid'),
    q('Custom theme configuration?', 'Extend colors, spacing, and fonts in the Tailwind config / CSS theme — keep a single design system source.', 'Mid'),
    q('Tailwind vs CSS Modules?', 'Tailwind speeds building UIs with utilities; Modules keep traditional CSS structure. Many teams use both.', 'Mid'),
  ],
  'css-in-js-patterns': [
    q('What are inline styles in React?', 'The style prop takes a JS object: style={{ marginTop: 8 }}. Good for dynamic values; cannot express pseudo-selectors or media queries.', 'Junior'),
    q('Style object patterns?', 'Extract shared style objects, but remember new object literals break referential equality for memoized children.', 'Mid'),
    q('When are inline styles enough?', 'Highly dynamic positions/sizes, or one-off values. Prefer CSS/Tailwind for hover states and responsive design.', 'Mid'),
    q('Performance note?', 'Creating style objects every render can be fine, but avoid passing new objects into heavily memoized trees without need.', 'Senior'),
    q('CSS variables for dynamic theming?', 'Set style={{ ["--accent"]: color }} on a parent and use var(--accent) in CSS — powerful hybrid approach.', 'Mid'),
    q('Inline styles vs className?', 'className for reusable/static rules; inline for values that change frequently from state.', 'Junior'),
  ],
  'component-libraries': [
    q('MUI vs Chakra vs shadcn/ui?', 'MUI: full Material system, larger bundle. Chakra: accessible composable primitives. shadcn/ui: copy-paste Radix + Tailwind components you own.', 'Mid'),
    q('What is Radix UI?', 'Headless accessible primitives (Dialog, Select, etc.) — behavior and a11y without forced styling.', 'Mid'),
    q('Why do teams like shadcn/ui?', 'No black-box package lock-in — components live in your repo and are fully customizable.', 'Mid'),
    q('Trade-offs of heavy UI kits?', 'Faster delivery vs bundle size, design constraints, and upgrade coupling.', 'Senior'),
    q('How do you theme MUI/Chakra?', 'ThemeProvider with a theme object controlling colors, typography, and component defaults.', 'Junior'),
    q('Accessibility and component libraries?', 'Prefer libraries that handle focus traps, keyboard nav, and ARIA — still verify against your designs.', 'Mid'),
  ],
  'react-testing-library': [
    q('What is React Testing Library’s guiding principle?', 'Test software the way users use it — query by role, label, and text, not by implementation details or class names.', 'Mid'),
    q('getBy vs queryBy vs findBy?', 'getBy throws if missing; queryBy returns null (assert absence); findBy is async and waits for the element.', 'Mid'),
    q('Why prefer userEvent over fireEvent?', 'userEvent simulates fuller user interactions (hover, tab, typing) more realistically than low-level fireEvent.', 'Mid'),
    q('How do you test async UI?', 'Use findBy queries or waitFor. Mock network with MSW for integration-style tests.', 'Mid'),
    q('Should you test component state directly?', 'No. Assert visible UI and behavior. State is an implementation detail.', 'Junior'),
    q('Custom render for providers?', 'Wrap render in a helper that includes Router/QueryClient/Theme providers used by the app.', 'Mid'),
  ],
  'vitest': [
    q('Why Vitest for Vite projects?', 'It reuses Vite’s transform pipeline and config, supports native ESM, and is typically faster than Jest in Vite apps.', 'Mid'),
    q('Is the Jest API compatible?', 'Largely yes — describe/it/expect and many Jest-style mocks work, easing migration.', 'Junior'),
    q('How do you run RTL with Vitest?', 'Install Testing Library + jsdom/happy-dom environment, then render/screen as usual.', 'Mid'),
    q('Mocking in Vitest?', 'vi.fn(), vi.mock(), and vi.spyOn cover most unit-test mocking needs.', 'Mid'),
    q('Coverage?', 'Vitest integrates coverage providers (e.g. v8/istanbul) via config — useful in CI gates.', 'Mid'),
    q('Watch mode benefits?', 'Re-runs only affected tests on change — tight feedback loop with Vite HMR-style DX.', 'Junior'),
  ],
  'jest': [
    q('When is Jest still used?', 'Legacy CRA apps, many React Native setups, and older codebases. New Vite apps often choose Vitest.', 'Mid'),
    q('What are Jest matchers?', 'expect(x).toBe / toEqual / toHaveBeenCalled — assertions for values and mocks.', 'Junior'),
    q('jest.mock purpose?', 'Replace modules with mocks for isolation — network clients, routers, etc.', 'Mid'),
    q('Snapshot testing — when?', 'For stable, rarely changing UI contracts. Prefer RTL behavior assertions for interactive components.', 'Mid'),
    q('Timer mocks?', 'jest.useFakeTimers() to test debounced/throttled logic without real waits.', 'Senior'),
    q('Jest vs Vitest briefly?', 'Similar APIs; Vitest aligns better with Vite/ESM. Jest has a larger historical ecosystem.', 'Mid'),
  ],
  'e2e-testing': [
    q('Unit vs integration vs E2E?', 'Unit: isolated functions/components. Integration: component + children + mocked API. E2E: real browser flows (Playwright/Cypress).', 'Mid'),
    q('Playwright vs Cypress?', 'Both are strong. Playwright excels at cross-browser and parallel runs; Cypress has a polished interactive runner DX.', 'Mid'),
    q('What should E2E cover?', 'Critical paths only — login, checkout, core happy paths — because E2E is slower and more brittle.', 'Senior'),
    q('How do you keep E2E stable?', 'Use test ids sparingly, prefer role/text, isolate test data, and avoid depending on animations/timing flakes.', 'Senior'),
    q('Component testing?', 'Some tools test components in a real browser with less full-app overhead — a middle ground.', 'Mid'),
    q('CI tip for E2E?', 'Run on PRs against preview environments; shard tests; retry only known flakes carefully.', 'Senior'),
  ],
  'type-definitions': [
    q('How do you type React component props?', 'Define a Props type/interface and annotate the function parameters. Prefer this over React.FC in modern TypeScript React.', 'Junior'),
    q('ReactNode vs ReactElement?', 'ReactNode is anything renderable (elements, strings, null, arrays). ReactElement is a specific JSX element object.', 'Mid'),
    q('How do you type events?', 'React.ChangeEvent<HTMLInputElement>, React.MouseEvent<HTMLButtonElement>, React.FormEvent<HTMLFormElement>, etc.', 'Mid'),
    q('How do you type useState and useRef?', 'useState<User | null>(null); useRef<HTMLInputElement>(null) for DOM refs.', 'Mid'),
    q('Typing children?', 'children?: React.ReactNode is the usual pattern.', 'Junior'),
    q('Why avoid React.FC by default?', 'Historically implied children and offered little benefit; explicit props are clearer with React 19 types.', 'Senior'),
  ],
  'advanced-typescript': [
    q('How do you type a generic component?', 'function List<T>({ items, renderItem }: { items: T[]; renderItem: (item: T) => React.ReactNode }) { ... }.', 'Senior'),
    q('Partial, Pick, and Omit?', 'Partial makes fields optional; Pick selects keys; Omit removes keys — common when extending component props.', 'Mid'),
    q('What are discriminated unions?', 'Unions with a shared tag field (type: "loading" | "error") so TypeScript narrows safely in switches.', 'Mid'),
    q('How do you type Context?', 'createContext<T | undefined>(undefined) plus a hook that throws if used outside the Provider.', 'Mid'),
    q('Typing HOCs / render props?', 'Use generics to preserve the wrapped component’s props; infer carefully to avoid any.', 'Senior'),
    q('Type guards?', 'Functions that return arg is Type so TypeScript narrows after the check — useful for API responses.', 'Mid'),
  ],
  'build-configuration': [
    q('Vite vs Webpack for React?', 'Vite: native ESM dev server + Rollup production builds. Webpack: bundles in development too — usually slower for large apps.', 'Mid'),
    q('How do Vite env variables work?', 'VITE_ prefix in .env; access via import.meta.env. Client-visible — never store secrets there.', 'Mid'),
    q('What is tree shaking?', 'Dead-code elimination of unused ES module exports. Prefer ES module builds of libraries (e.g. lodash-es).', 'Mid'),
    q('How do you analyze bundle size?', 'rollup-plugin-visualizer / Vite analyzers to find large dependencies and duplicate packages.', 'Mid'),
    q('Code splitting in Vite?', 'Dynamic import() creates async chunks automatically — pair with React.lazy for routes.', 'Junior'),
    q('Asset optimization tips?', 'Hash filenames for caching, compress images, and avoid importing huge assets into the JS graph unnecessarily.', 'Mid'),
  ],
  'deployment': [
    q('How do you deploy a React SPA?', 'Build to dist/, host static files on Vercel/Netlify/etc., and configure SPA fallback so all routes serve index.html.', 'Junior'),
    q('CSR vs SSR vs SSG?', 'CSR renders in the browser; SSR renders HTML per request; SSG prebuilds HTML at build time.', 'Senior'),
    q('What belongs in CI/CD?', 'install → lint → test → build → deploy. Cache dependencies; use preview deployments for PRs.', 'Senior'),
    q('Docker for a SPA?', 'Multi-stage: Node builds the app; nginx (or similar) serves dist/ with gzip and SPA routing.', 'Senior'),
    q('Environment management?', 'Separate env vars per environment in the host dashboard; keep secrets server-side.', 'Mid'),
    q('Performance monitoring after deploy?', 'Web Vitals, error tracking (Sentry), and real-user monitoring to catch regressions.', 'Mid'),
  ],
  'framer-motion': [
    q('What is Framer Motion?', 'A React animation library for declarative animations, gestures, layout animations, and scroll-linked effects.', 'Mid'),
    q('What are variants?', 'Named animation states (hidden/visible) you orchestrate on parents/children for coordinated motion.', 'Mid'),
    q('Layout animations?', 'layout prop animates position/size changes when React layout shifts — great for shared-element-like effects.', 'Senior'),
    q('AnimatePresence purpose?', 'Animates components as they exit the tree (modals, lists) — otherwise unmount is instant.', 'Mid'),
    q('Gestures?', 'Built-in drag/hover/tap handlers to build interactive motion UIs.', 'Junior'),
    q('Performance tip?', 'Prefer transform/opacity; avoid animating layout properties when possible; reduce motion for a11y.', 'Senior'),
  ],
  'react-spring': [
    q('What is React Spring?', 'A physics-based animation library using springs instead of duration-only tweens for natural motion.', 'Mid'),
    q('Framer Motion vs React Spring?', 'Framer is more feature-rich for UI gestures/layout. React Spring focuses on spring physics primitives.', 'Mid'),
    q('Basic spring idea?', 'You animate toward a goal value; stiffness/damping control the feel rather than a fixed CSS duration alone.', 'Mid'),
    q('useSpring / useTransition?', 'Hooks to create spring values and transition lists of items in/out.', 'Mid'),
    q('When choose React Spring?', 'When you want physics-driven interaction and already like its API; otherwise Framer is more common in UI kits.', 'Senior'),
    q('Accessibility?', 'Respect prefers-reduced-motion and provide non-animated equivalents.', 'Mid'),
  ],
  'css-animations': [
    q('CSS transitions vs animations?', 'Transitions interpolate when a property changes. Animations use @keyframes and can loop without a triggering state change.', 'Junior'),
    q('When prefer CSS over JS animation libraries?', 'Simple hover/focus effects and one-off transitions — less JS weight and often smoother.', 'Mid'),
    q('Performance best practices?', 'Animate transform and opacity; avoid top/left/width when possible to reduce layout thrash.', 'Mid'),
    q('How do you trigger CSS transitions in React?', 'Toggle classes or style values based on state; ensure the browser sees a from→to change.', 'Junior'),
    q('Animation patterns for lists?', 'Staggered delays, AnimatePresence-like exit classes, or FLIP techniques for layout moves.', 'Senior'),
    q('Reduced motion?', 'Use @media (prefers-reduced-motion: reduce) to disable or simplify animations.', 'Mid'),
  ],
  'aria': [
    q('When should you use ARIA?', 'Only when native HTML semantics are insufficient. Prefer <button> over <div role="button">.', 'Mid'),
    q('What are ARIA roles and attributes?', 'They describe purpose and state to assistive tech — role, aria-label, aria-expanded, aria-live, etc.', 'Junior'),
    q('Keyboard navigation basics?', 'All interactive elements reachable via Tab; Enter/Space activate buttons; Escape closes dialogs; arrow keys for menus.', 'Mid'),
    q('Focus management?', 'Move focus into modals on open and restore it on close; don’t trap users without an exit.', 'Mid'),
    q('What are live regions?', 'aria-live areas that announce dynamic updates (toasts, status) to screen readers.', 'Senior'),
    q('Semantic HTML examples?', 'nav, main, header, button, label + input — often removes the need for extra ARIA.', 'Junior'),
  ],
  'accessibility-tools': [
    q('How do you test accessibility?', 'Automated checks (axe, Lighthouse), keyboard-only testing, and screen reader spot checks.', 'Mid'),
    q('What does axe DevTools catch?', 'Missing labels, contrast issues, invalid ARIA, and many common WCAG failures — not everything.', 'Mid'),
    q('Why isn’t automation enough?', 'It misses focus order nuance, meaningful labels, and real AT user experience. Manual testing is required.', 'Senior'),
    q('Lighthouse accessibility score?', 'A useful CI signal, not a guarantee of full WCAG compliance.', 'Junior'),
    q('Testing Library a11y queries?', 'Prefer getByRole and getByLabelText — they encode accessibility into tests.', 'Mid'),
    q('Color contrast?', 'Aim for WCAG AA contrast ratios for text and UI controls; verify in design and with tooling.', 'Junior'),
  ],
  'react-i18next': [
    q('How does react-i18next work?', 'An i18n instance loads translation resources; useTranslation() returns t("key") and language utilities.', 'Mid'),
    q('How do you switch languages?', 'i18n.changeLanguage("fr") — components using useTranslation re-render with new strings.', 'Junior'),
    q('Pluralization and interpolation?', 'i18next supports plural forms and embedding variables into strings via t options.', 'Mid'),
    q('Namespace organization?', 'Split translations by feature/namespace and lazy-load them to keep bundles smaller.', 'Senior'),
    q('Formatting dates/numbers?', 'Use i18n formatting or Intl APIs with the active locale for consistent UX.', 'Mid'),
    q('Hard-coded strings pitfall?', 'They break i18n. Keep user-visible copy in translation files from the start for multi-locale apps.', 'Junior'),
  ],
  'security-best-practices': [
    q('How does React help prevent XSS?', 'JSX escapes values by default. Risk comes from dangerouslySetInnerHTML, unsanitized HTML, and unsafe URLs.', 'Mid'),
    q('When is dangerouslySetInnerHTML acceptable?', 'Only with sanitized HTML (e.g. DOMPurify) from trusted pipelines — never raw user HTML.', 'Mid'),
    q('Where should JWTs be stored?', 'Prefer HttpOnly Secure cookies to reduce XSS token theft. localStorage is vulnerable if XSS exists.', 'Senior'),
    q('What is CSP?', 'Content Security Policy headers restrict script sources and reduce XSS impact. Configure at the host/server.', 'Senior'),
    q('CSRF protection?', 'For cookie-based auth, use SameSite cookies and CSRF tokens on state-changing requests.', 'Senior'),
    q('Dependency security?', 'Regularly audit packages (npm audit), pin versions, and avoid unmaintained libraries with known CVEs.', 'Mid'),
  ],
  'micro-frontends': [
    q('What are micro-frontends?', 'Splitting a frontend into independently deployable apps composed together at runtime or build time.', 'Senior'),
    q('What is Module Federation?', 'A Webpack/Vite approach to share code at runtime between separately built applications.', 'Senior'),
    q('Benefits?', 'Team autonomy, independent releases, and scaling large orgs — at the cost of complexity.', 'Mid'),
    q('Challenges?', 'Shared dependencies, routing, styling isolation, auth, and consistent UX across fragments.', 'Senior'),
    q('When NOT to use micro-frontends?', 'Small teams/apps — the operational overhead outweighs benefits.', 'Mid'),
    q('Integration patterns?', 'Module Federation, iframes (isolation), or build-time package composition.', 'Mid'),
  ],
  'pwa': [
    q('What is a PWA?', 'A Progressive Web App is installable, works offline via service workers, and has a web app manifest for icons/name.', 'Mid'),
    q('Service worker role?', 'Intercepts network requests and applies cache strategies for offline/fast repeat visits.', 'Mid'),
    q('Cache strategies?', 'Cache-first for static assets; network-first for fresh API data; stale-while-revalidate as a hybrid.', 'Senior'),
    q('vite-plugin-pwa?', 'Generates service worker and manifest integration for Vite apps.', 'Mid'),
    q('Push notifications?', 'Require permission, a service worker, and a push service — optional PWA capability.', 'Mid'),
    q('PWA limitations?', 'iOS quirks, storage limits, and update/versioning complexity for caches.', 'Senior'),
  ],
  'websockets': [
    q('WebSockets vs HTTP?', 'WebSockets provide a persistent bidirectional channel — better for chat, collaboration, and live updates than polling.', 'Mid'),
    q('WebSockets vs SSE?', 'WebSockets are bidirectional. SSE is server-to-client over HTTP with simpler reconnection semantics.', 'Senior'),
    q('How do you use WebSockets in React?', 'Open the connection in useEffect and close it in cleanup. Store latest handlers in refs to avoid stale closures.', 'Mid'),
    q('Socket.io benefits?', 'Fallbacks, rooms, acknowledgements, and reconnection helpers on top of WebSockets.', 'Mid'),
    q('Reconnection handling?', 'Backoff retries, re-auth on reconnect, and resyncing missed state after downtime.', 'Senior'),
    q('Security considerations?', 'Authenticate the socket, validate messages, and use wss:// in production.', 'Senior'),
  ],
  'server-sent-events': [
    q('What are Server-Sent Events?', 'A one-way server-to-client stream over HTTP using EventSource — good for feeds and notifications.', 'Mid'),
    q('When prefer SSE over WebSockets?', 'When you only need server push, want simpler infra, and automatic reconnection is enough.', 'Mid'),
    q('How do you use EventSource in React?', 'Create EventSource in useEffect, handle onmessage/onerror, and close on cleanup.', 'Mid'),
    q('SSE limitations?', 'Mostly unidirectional; some proxy buffering issues; binary data is awkward compared to WebSockets.', 'Senior'),
    q('Auth with SSE?', 'Cookies work with same-origin; token query params are riskier. Design carefully for CORS/credentials.', 'Senior'),
    q('Live updates pattern?', 'Server pushes events; React updates state; optionally reconcile with a REST snapshot on reconnect.', 'Mid'),
  ],
  'react-devtools': [
    q('How do React DevTools help?', 'Inspect the component tree, props/state/hooks, highlight updates, and profile render/commit timings.', 'Mid'),
    q('What is the Profiler for?', 'Finding slow commits and which components rendered and why — essential for performance interviews.', 'Mid'),
    q('Why did my component render?', 'DevTools can show prop/state/hook changes that caused an update.', 'Junior'),
    q('Debugging hooks state?', 'Expand the hooks section on a fiber to see useState/useEffect dependencies and values.', 'Mid'),
    q('Production profiling?', 'Use a profiling build when needed; be careful shipping heavy instrumentation to all users.', 'Senior'),
    q('Common interview tip?', 'Describe a systematic approach: reproduce → DevTools highlight updates → Profiler → fix memoization/state location.', 'Senior'),
  ],
  'browser-devtools': [
    q('How do you find memory leaks?', 'Chrome Memory tools: heap snapshots, detached DOM nodes, growing listeners. Often missing effect cleanup in React.', 'Senior'),
    q('Performance panel usage?', 'Record interactions, find long tasks, layout thrashing, and expensive scripting.', 'Mid'),
    q('Network debugging for React apps?', 'Check waterfall, caching headers, duplicate fetches, and large payloads.', 'Junior'),
    q('Why is my React app janky?', 'Main-thread long tasks, excessive re-renders, huge lists without virtualization, or unoptimized images.', 'Mid'),
    q('Console tips?', 'Breakpoints, conditional breakpoints, and logging render counts carefully in development.', 'Junior'),
    q('CORS errors — what to check?', 'Server Access-Control headers, credentials mode, and whether the browser preflight OPTIONS succeeds.', 'Mid'),
  ],
  'react-compiler': [
    q('What is the React Compiler?', 'A build-time tool that auto-memoizes components and values by analyzing purity — reducing manual useMemo/useCallback/React.memo.', 'Senior'),
    q('Does it replace all memoization?', 'Often for eligible components, but you still need good state architecture. It’s opt-in and incremental.', 'Senior'),
    q('What code works best with the Compiler?', 'Pure render functions without hidden side effects. Side effects belong in effects, not render.', 'Mid'),
    q('How do you adopt it?', 'Enable the Babel plugin / tooling, start on a subset of components, and fix purity violations it reports.', 'Mid'),
    q('Interview stance on useMemo with Compiler?', 'Know both: with Compiler, less manual memo; without Compiler, memoize measured hotspots.', 'Senior'),
    q('Is Compiler required for React 19?', 'No. React 19 works without it. Compiler is an optimization layer on top.', 'Junior'),
  ],
  'actions-form-handling': [
    q('What are React 19 Actions?', 'Async functions used as form actions or inside transitions. React tracks pending state and supports progressive enhancement.', 'Mid'),
    q('What is useFormStatus?', 'Reads pending state of the parent <form> — typically used in a SubmitButton to disable/show loading without prop drilling.', 'Mid'),
    q('What is useActionState?', 'Manages state returned from an action (e.g. server validation errors) paired with a form action.', 'Mid'),
    q('Progressive enhancement meaning?', 'The form can still submit if JS is slow/disabled — especially with server actions in frameworks.', 'Senior'),
    q('Client-only action example?', 'async function submit(formData) { await api.save(formData) } passed to <form action={submit}>.', 'Mid'),
    q('Actions vs classic onSubmit?', 'Actions integrate pending states and FormData more cleanly; onSubmit + preventDefault remains valid.', 'Junior'),
  ],
  'useoptimistic-hook': [
    q('What is useOptimistic?', 'A React 19 hook that shows optimistic UI while an async action runs, then settles to the real result (or reverts on failure).', 'Mid'),
    q('How does the API work?', 'const [optimisticState, addOptimistic] = useOptimistic(state, updateFn). Call addOptimistic during the action.', 'Mid'),
    q('Typical use cases?', 'Likes, todos, chat messages — UI updates instantly before the server confirms.', 'Junior'),
    q('How do you handle errors?', 'If the action throws, React discards the optimistic state and you show an error — pair with proper rollback messaging.', 'Mid'),
    q('useOptimistic vs TanStack Query optimistic updates?', 'Similar UX goal. useOptimistic is UI-local; Query optimistic updates operate on the server-state cache.', 'Senior'),
    q('Why optimistic UI helps interviews?', 'Shows you understand perceived performance and failure handling, not just happy-path fetching.', 'Mid'),
  ],
  'document-metadata': [
    q('Document metadata in React 19?', 'You can render <title> and <meta> inside components; React hoists them into document head.', 'Mid'),
    q('Why does this matter?', 'Simplifies SEO and per-route titles without react-helmet in many cases.', 'Junior'),
    q('Async metadata?', 'Frameworks may resolve metadata asynchronously while streaming — depends on your RSC/framework setup.', 'Senior'),
    q('Multiple titles competing?', 'React resolves document metadata according to its precedence rules; prefer setting metadata near route roots.', 'Mid'),
    q('vs react-helmet-async?', 'Helmet is still used in older apps; React 19 built-in metadata covers common cases.', 'Mid'),
    q('Social/Open Graph tags?', 'Render appropriate meta tags for previews — still verify with platform debuggers after deploy.', 'Mid'),
  ],
  'ref-as-prop': [
    q('What changed with refs in React 19?', 'ref can be passed as a normal prop to function components. forwardRef is often unnecessary.', 'Mid'),
    q('Do you still need forwardRef?', 'For compatibility and some library patterns yes, but new code can accept ref directly.', 'Mid'),
    q('TypeScript impact?', 'Ref typing is simpler — include ref on props instead of the forwardRef generic dance in many cases.', 'Senior'),
    q('Callback refs still valid?', 'Yes. Function refs still run on mount/unmount with the node.', 'Junior'),
    q('Exposing imperative APIs?', 'useImperativeHandle still applies when parents should call child methods.', 'Mid'),
    q('Migration tip?', 'Replace forwardRef wrappers gradually; keep tests around focus management components.', 'Mid'),
  ],
  'context-as-provider': [
    q('Context as Provider syntax in React 19?', 'You can write <ThemeContext value={theme}> instead of <ThemeContext.Provider value={theme}>.', 'Mid'),
    q('Does behavior change?', 'No — it’s cleaner syntax with the same Provider semantics.', 'Junior'),
    q('Performance still matters?', 'Yes. Memoize value and split contexts; new syntax doesn’t fix re-render issues.', 'Mid'),
    q('Multiple contexts?', 'Compose providers the same way as before; naming is just shorter.', 'Junior'),
    q('Migration?', 'Codemod or gradually replace .Provider usage; both forms work during transition.', 'Mid'),
    q('Interview one-liner?', 'React 19 lets the context object itself act as the Provider component.', 'Junior'),
  ],
  'async-components': [
    q('What are async components in modern React?', 'Components that can await data during render (especially on the server) and integrate with Suspense for loading UI.', 'Senior'),
    q('How does Suspense fit?', 'When a child suspends on a Promise, the nearest Suspense boundary shows fallback until resolution.', 'Mid'),
    q('Client vs server async?', 'Async Server Components are first-class in RSC. On the client, use() / frameworks orchestrate suspending data.', 'Senior'),
    q('Error handling?', 'Pair Suspense with Error Boundaries for failed promises/render errors.', 'Mid'),
    q('Loading states?', 'Prefer Suspense fallbacks and granular boundaries over manual isLoading flags where the architecture supports it.', 'Mid'),
    q('Pitfall?', 'Don’t spawn new Promises every render without caching — you’ll suspend forever/refetch endlessly.', 'Senior'),
  ],
  'use-hook': [
    q('What is the use() hook?', 'React 19’s use() unwraps a Promise or reads Context during render. With Promises it suspends until resolved.', 'Senior'),
    q('How is use() different from other hooks?', 'It can be called conditionally, unlike useState/useEffect, because of how it participates in render/Suspense.', 'Senior'),
    q('use(promise) example?', 'const data = use(resourcePromise); // suspends; parent Suspense shows fallback.', 'Mid'),
    q('use(context) vs useContext?', 'use(Context) can read context and may be called conditionally; useContext cannot be conditional.', 'Mid'),
    q('Error handling with use()?', 'Rejected promises propagate to the nearest Error Boundary (or framework error handling).', 'Mid'),
    q('When not to use use()?', 'For simple client state — still use useState. use() is for Promise/context unwrapping patterns.', 'Junior'),
  ],
  'server-components-stable': [
    q('What does “stable Server Components” mean in React 19?', 'The RSC model and protocol are production-ready for frameworks; Next.js App Router is the main adoption path.', 'Senior'),
    q('Client/Server boundaries?', 'Mark client graphs with "use client". Server Components can render Client Components as children but not import client-only hooks into server files.', 'Senior'),
    q('Data fetching in RSC?', 'Fetch directly in Server Components. Avoid shipping that logic to the client bundle.', 'Mid'),
    q('Streaming SSR?', 'HTML streams as Suspense boundaries resolve — faster first paint for shells.', 'Senior'),
    q('Serialization rules?', 'Props from server to client must be serializable — no functions/classes.', 'Mid'),
    q('When keep a CSR SPA?', 'Simple dashboards behind login, or teams not ready for a framework RSC architecture.', 'Mid'),
  ],
  'improved-hydration': [
    q('What is hydration?', 'Attaching React event handlers/state to server-rendered HTML so it becomes interactive.', 'Junior'),
    q('What causes hydration mismatches?', 'Date.now(), Math.random(), invalid HTML nesting, or branching on typeof window during render.', 'Senior'),
    q('React 19 hydration improvements?', 'Clearer error messages and diffs that help locate mismatches faster.', 'Mid'),
    q('How do you fix mismatch bugs?', 'Keep initial client render identical to server HTML; move browser-only values into useEffect; use useId for IDs.', 'Mid'),
    q('Invalid HTML example?', '<p><div></div></p> — browser “fixes” DOM differently than React expects.', 'Mid'),
    q('suppressHydrationWarning?', 'Rare escape hatch for known differences (e.g. timestamps). Prefer fixing the root cause.', 'Senior'),
  ],
  'enhanced-suspense': [
    q('What improved about Suspense?', 'Better support for nested boundaries, streaming, and combining with error handling in modern React/framework setups.', 'Mid'),
    q('Why nest Suspense boundaries?', 'So a slow widget doesn’t block the entire page shell — granular loading UX.', 'Mid'),
    q('Suspense + Error Boundaries?', 'Suspense handles waiting; Error Boundaries handle failures. Place both strategically.', 'Mid'),
    q('Loading patterns?', 'Skeleton screens, staggered reveals, and route-level + section-level boundaries.', 'Junior'),
    q('Client data Suspense?', 'Requires a Suspense-aware data library or framework integration — not plain useEffect alone.', 'Senior'),
    q('Common mistake?', 'One giant Suspense around the whole app — users see a single blank fallback too often.', 'Mid'),
  ],
  'asset-loading': [
    q('How does React 19 improve asset loading?', 'Better integration with resource loading patterns — preload/preinit style APIs and framework guidance for fonts/images/scripts.', 'Mid'),
    q('Why preload critical assets?', 'Improves LCP by fetching fonts/hero images earlier in the critical path.', 'Mid'),
    q('Image optimization basics?', 'Correct dimensions, modern formats, lazy-loading below the fold, and CDN resizing.', 'Junior'),
    q('Font loading tips?', 'Use font-display strategies and preload primary fonts to reduce FOIT/FOUT jank.', 'Mid'),
    q('Resource hints?', '<prefetch>/<preload> (and framework helpers) tell the browser what you’ll need soon.', 'Senior'),
    q('Bundle vs asset loading?', 'Code splitting reduces JS; asset loading optimizes images/fonts/CSS — both matter for performance.', 'Mid'),
  ],
  'web-components': [
    q('Can React work with Web Components?', 'Yes. React 19 improves custom element interop — passing props and listening to events is smoother than older versions.', 'Mid'),
    q('What is Shadow DOM impact?', 'Styles and DOM are encapsulated. Portals/events/CSS piercing need careful design.', 'Senior'),
    q('When use Web Components in a React app?', 'Design-system sharing across frameworks, or embedding third-party widgets authored as custom elements.', 'Mid'),
    q('Event handling differences?', 'Custom events may need explicit listeners; React’s synthetic system doesn’t always map 1:1 to custom element events.', 'Senior'),
    q('Props vs attributes?', 'Custom elements often use attributes/properties differently than React props — follow the element’s docs.', 'Mid'),
    q('SSR considerations?', 'Custom elements may need client-only mounting if they depend on browser APIs.', 'Mid'),
  ],
  'typescript-improvements': [
    q('What improved in React 19 TypeScript types?', 'Better ref-as-prop typing, improved useRef/useReducer inference, and cleaner component prop patterns.', 'Mid'),
    q('ref typing change?', 'Treat ref like a regular optional prop on function components instead of always using forwardRef generics.', 'Senior'),
    q('Why does better inference matter?', 'Less manual generic annotation and fewer any casts around hooks and context.', 'Mid'),
    q('Context typing tip?', 'Still create a typed context and a safe consumer hook that throws outside the Provider.', 'Junior'),
    q('Breaking type changes?', 'Expect some type errors when upgrading @types/react — fix gradually; they’re usually improvements.', 'Mid'),
    q('ReactElement vs JSX.Element?', 'Prefer React.ReactElement / React.ReactNode from the React namespace for clarity in modern types.', 'Mid'),
  ],
  'concurrent-features': [
    q('What concurrent features should you know for interviews?', 'createRoot, automatic batching, useTransition, useDeferredValue, Suspense, and interruptible rendering.', 'Mid'),
    q('What improved in React 19 regarding concurrency?', 'Refinements around Actions, optimistic UI, Suspense/hydration messaging, and ecosystem stability — building on React 18’s model.', 'Senior'),
    q('Priority scheduling in plain terms?', 'React processes urgent interactions before heavy non-urgent renders so the UI feels responsive.', 'Mid'),
    q('Do you opt into concurrency?', 'Using createRoot opts into the concurrent renderer. Legacy render does not.', 'Junior'),
    q('Practical adoption?', 'Start with transitions on slow interactions; add Suspense where your data layer supports it.', 'Mid'),
    q('Measuring success?', 'Better interaction responsiveness (INP), fewer blocked inputs, and Profiler commits that don’t stall typing.', 'Senior'),
  ],
  'error-boundaries-enhancements': [
    q('What Error Boundary enhancements matter in React 19?', 'Better alignment with modern SSR/hydration error reporting and recovery patterns in framework apps — boundaries remain class-based.', 'Mid'),
    q('Are hooks available for error boundaries yet?', 'No. You still implement getDerivedStateFromError and componentDidCatch on a class component (or use a small library wrapper).', 'Mid'),
    q('Error recovery patterns?', 'Reset keys on boundaries, “Try again” buttons, and route-level error elements in React Router/Next.js.', 'Mid'),
    q('Fallback UI best practices?', 'Explain what failed, offer retry/navigation, and keep surrounding app chrome intact.', 'Junior'),
    q('Logging in componentDidCatch?', 'Send errors to monitoring with component stack; don’t only render fallback silently.', 'Mid'),
    q('Composition of boundaries?', 'Nested boundaries isolate failures — a chart crash shouldn’t blank the whole dashboard.', 'Senior'),
  ],
};

function serializeQuestion(question) {
  const parts = [
    `    q: ${JSON.stringify(question.q)}`,
    `    a: ${JSON.stringify(question.a)}`,
    `    level: ${JSON.stringify(question.level)}`,
  ];
  if (question.points) parts.push(`    points: ${JSON.stringify(question.points)}`);
  if (question.code) parts.push(`    code: ${JSON.stringify(question.code)}`);
  return `  {\n${parts.join(',\n')}\n  }`;
}

function serializeEntry(entry) {
  const questions = entry.sections[0].questions.map(serializeQuestion).join(',\n');
  return `  ${JSON.stringify(entry.contentId)}: {
    title: ${JSON.stringify(entry.title)},
    subtitle: ${JSON.stringify(entry.subtitle)},
    level: ${JSON.stringify(entry.level)},
    tip: ${JSON.stringify(entry.tip)},
    sections: [
      {
        title: 'Most Asked Questions',
        questions: [
${questions}
        ],
      },
    ],
  }`;
}

const missing = [];
const thin = [];
const entries = [];

for (const phase of corePhases.filter(isLearningPhase)) {
  for (const module of phase.modules) {
    for (const lesson of module.lessons) {
      const questions = curated[lesson.content];
      if (!questions) {
        missing.push(lesson.content);
        continue;
      }
      if (questions.length < 6) thin.push(`${lesson.content} (${questions.length})`);
      entries.push({
        contentId: lesson.content,
        title: `${lesson.title} — Most Asked Interview Questions`,
        subtitle: `${phase.title} · ${module.title}`,
        level: 'Junior to Senior',
        tip: `Answer with a clear definition, a concrete example, and one trade-off for "${lesson.title}". Prefer React 19 / current APIs.`,
        sections: [{ title: 'Most Asked Questions', questions }],
      });
    }
  }
}

if (missing.length || thin.length) {
  console.error('Missing lessons:', missing);
  console.error('Thin lessons (<6):', thin);
  process.exit(1);
}

const body = entries.map(serializeEntry).join(',\n');
const output = `// Auto-generated by scripts/generate-interview-qa.mjs
export const interviewQA = {
${body}
};
`;

writeFileSync(new URL('../src/data/interviewQA.js', import.meta.url), output);

const counts = entries.map((e) => e.sections[0].questions.length);
const badTemplates = entries.flatMap((e) =>
  e.sections[0].questions.filter((qa) => /When discussing|how would you answer/i.test(qa.a + qa.q))
);
console.log(`Generated ${entries.length} lessons, ${counts.reduce((a, b) => a + b, 0)} questions (min ${Math.min(...counts)}, max ${Math.max(...counts)}).`);
if (badTemplates.length) {
  console.error('Template answers still present:', badTemplates.length);
  process.exit(1);
}
