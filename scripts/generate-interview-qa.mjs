/**
 * Generates src/data/interviewQA.js — lesson-wise Q&A keyed by content id.
 * Run: node scripts/generate-interview-qa.mjs
 */
import { writeFileSync } from 'fs';
import { corePhases } from '../src/data/lessons.js';
import { isLearningPhase } from '../src/data/buildPhase17.js';

function q(question, answer, level = 'Mid', extra = {}) {
  return { q: question.startsWith('Q:') ? question : `Q: ${question}`, a: answer, level, ...extra };
}

const curated = {
  'setup-environment': [
    q('Why use Vite instead of Create React App in 2025?', 'CRA is deprecated. Vite 7 uses native ESM in dev for instant HMR, Rollup for production, and first-class React 19 support via @vitejs/plugin-react.', 'Mid'),
    q('What is the role of ESLint and Prettier in a React project?', 'ESLint catches bugs and enforces patterns (e.g. hooks rules). Prettier formats code consistently.', 'Junior'),
    q('How do you structure a modern React + Vite project?', 'src/ for components, pages, hooks; public/ for static assets; vite.config.js; .env with VITE_ prefix for client vars.', 'Mid'),
    q('What does the Vite dev server do differently from Webpack?', 'Vite serves ESM natively — no full bundle on startup. Transforms on demand for near-instant HMR.', 'Senior'),
  ],
  'jsx-deep-dive': [
    q('What is JSX? Does the browser understand it?', 'JSX is a syntax extension compiled by Vite/Babel to createElement or the automatic jsx runtime. Browsers do not parse JSX.', 'Junior'),
    q('Why must list items have a unique key prop?', 'Keys identify items during reconciliation. Index keys break on reorder/filter causing state bugs.', 'Junior'),
    q('What is reconciliation?', 'React compares new vs previous virtual tree and applies minimal DOM updates.', 'Mid'),
    q('Explain conditional rendering in JSX.', 'Ternary, &&, early return, or extracted subcomponents for complex conditions.', 'Mid'),
  ],
  'components': [
    q('What is the difference between props and state?', 'Props are read-only from parent. State is internal and mutable via setState/useState.', 'Junior'),
    q('Can you mutate props?', 'No — one-way data flow. Parent owns state and passes callbacks.', 'Junior'),
    q('Function vs class components today?', 'Use function components with hooks (React 19). Classes only for error boundaries.', 'Mid'),
    q('What is component composition?', 'Nest components and use children prop instead of inheritance.', 'Mid'),
  ],
  'state-management-usestate': [
    q('Explain useState and functional updates.', 'Returns [value, setter]. Use prev => when next state depends on previous value.', 'Junior'),
    q('Why does React batch state updates?', 'Performance — multiple setStates in one event become one re-render. React 18+ batches everywhere.', 'Mid'),
    q('How update object/array state immutably?', 'Spread/copy: setUser(u => ({ ...u, name })). Never mutate state directly.', 'Junior'),
    q('What is lazy initial state?', 'useState(() => expensive()) runs initializer once on mount.', 'Mid'),
  ],
  'event-handling': [
    q('What are synthetic events?', 'Cross-browser wrappers around native events. React 17+ attaches to root; no event pooling.', 'Mid'),
    q('preventDefault vs stopPropagation?', 'preventDefault blocks default browser behavior. stopPropagation stops bubbling.', 'Junior'),
    q('How pass arguments to handlers?', 'Arrow wrapper: onClick={() => handle(id)} — never invoke during render.', 'Mid'),
  ],
  'useeffect-hook': [
    q('When does useEffect run?', 'After paint. [] once; [deps] on change; cleanup before re-run/unmount.', 'Junior'),
    q('Common useEffect mistakes?', 'Missing deps, infinite loops, no cleanup, fetch races without abort.', 'Mid'),
    q('useEffect vs data fetching libraries?', 'TanStack Query handles cache/dedup/retry — prefer over raw useEffect for server state.', 'Mid'),
  ],
  'component-lifecycle': [
    q('What is the component lifecycle with hooks?', 'Mount: render then useEffect. Update: re-render then effect if deps changed. Unmount: effect cleanup runs.', 'Mid'),
    q('What triggers a re-render?', 'State change in the component, parent re-render, or context value change for consumers.', 'Junior'),
    q('What does React Strict Mode do in development?', 'Double-invokes render and effects to expose missing cleanup. Production runs once.', 'Mid'),
    q('useEffect vs useLayoutEffect in lifecycle?', 'useEffect runs after paint. useLayoutEffect runs synchronously after DOM update before paint — for measurements.', 'Mid'),
    q('How do class lifecycle methods map to hooks?', 'componentDidMount → useEffect([], fn). componentDidUpdate → useEffect with deps. componentWillUnmount → return cleanup from effect.', 'Mid'),
    q('When does effect cleanup run?', 'Before the effect runs again (deps changed) and on component unmount. Required for timers, subscriptions, listeners.', 'Mid'),
  ],
  'useref-hook': [
    q('useRef vs useState?', 'useRef persists without re-render — DOM refs, timers, mutable values.', 'Junior'),
    q('What is a callback ref?', 'ref={node => ...} for mount/unmount access — useful for measure/integrate libs.', 'Mid'),
    q('ref as prop in React 19?', 'ref is a normal prop on function components — forwardRef often unnecessary.', 'Mid'),
  ],
  'usecontext-hook': [
    q('How does useContext work?', 'Reads nearest Provider; re-renders when value changes.', 'Junior'),
    q('Context performance pitfall?', 'All consumers re-render — split context or use selectors.', 'Mid'),
    q('Context vs props?', 'Context for global low-frequency data; props for local flow.', 'Mid'),
  ],
  'usereducer-hook': [
    q('useReducer vs useState?', 'useReducer for complex predictable state via actions.', 'Mid'),
    q('Reducer pattern?', 'Pure (state, action) => newState — testable and predictable.', 'Mid'),
  ],
  'usecallback-hook': [
    q('What does useCallback do?', 'Memoizes function reference when deps unchanged.', 'Mid'),
    q('When use useCallback?', 'Stable callbacks for memo children or effect deps — measure first.', 'Mid'),
  ],
  'usememo-hook': [
    q('What does useMemo do?', 'Caches computed values between renders when deps unchanged.', 'Mid'),
    q('useMemo vs useCallback?', 'Values vs functions — both preserve referential equality.', 'Junior'),
  ],
  'uselayouteffect-hook': [
    q('useLayoutEffect vs useEffect?', 'Layout runs sync before paint — for DOM measure/flicker prevention.', 'Mid'),
  ],
  'usedebugvalue-hook': [
    q('What is useDebugValue?', 'Custom label in DevTools for custom hooks — dev only.', 'Mid'),
  ],
  'useid-hook': [
    q('What is useId?', 'SSR-safe unique IDs for accessibility attributes.', 'Mid'),
  ],
  'usetransition-hook': [
    q('What is useTransition?', '[isPending, startTransition] — marks updates non-urgent.', 'Mid'),
  ],
  'usedeferredvalue-hook': [
    q('What is useDeferredValue?', 'Defers a value update integrated with concurrent rendering.', 'Mid'),
  ],
  'usesyncexternalstore-insertioneffect-hook': [
    q('useSyncExternalStore purpose?', 'Safe external store subscription in concurrent React.', 'Senior'),
    q('useInsertionEffect purpose?', 'Inject styles before layout — CSS-in-JS libraries.', 'Senior'),
  ],
  'react-memo': [
    q('What does React.memo do?', 'Skips re-render if props shallow-equal.', 'Mid'),
    q('When use React.memo?', 'Expensive components with stable props — profile first.', 'Mid'),
  ],
  'code-splitting': [
    q('How code-split in React?', 'React.lazy + Suspense or dynamic import(). Vite splits chunks automatically.', 'Mid'),
  ],
  'performance-patterns': [
    q('Optimize large lists?', 'Virtualization, pagination, memoized rows, stable keys.', 'Mid'),
  ],
  'compound-components': [
    q('What are compound components?', 'Related components (Tabs.List, Tabs.Panel) sharing implicit state via Context.', 'Mid'),
    q('Why use compound components?', 'Flexible API without prop explosion on one component.', 'Mid'),
  ],
  'render-props': [
    q('What is render props pattern?', 'Component receives function as prop/child to share state: <DataFetcher render={data => ...} />.', 'Mid'),
    q('Render props vs hooks?', 'Hooks preferred today — render props still valid for inversion of control.', 'Mid'),
  ],
  'higher-order-components': [
    q('What is a HOC?', 'Function(Component) => EnhancedComponent — adds behavior/props.', 'Mid'),
    q('HOC vs custom hooks?', 'Prefer hooks for logic reuse; HOC when wrapping JSX tree.', 'Senior'),
  ],
  'custom-hooks': [
    q('How create custom hooks?', 'Function starting with use calling other hooks — extracts reusable stateful logic.', 'Mid'),
    q('Rules of Hooks?', 'Top level only; only in React functions/custom hooks.', 'Junior'),
  ],
  'controlled-uncontrolled-components': [
    q('Controlled vs uncontrolled inputs?', 'Controlled: React state is source of truth. Uncontrolled: DOM/ref/FormData holds value.', 'Junior'),
  ],
  'portal': [
    q('What are React Portals?', 'createPortal renders elsewhere in DOM but keeps React tree/events.', 'Mid'),
    q('Portal use cases?', 'Modals, tooltips, dropdowns escaping overflow:hidden.', 'Mid'),
  ],
  'error-boundaries': [
    q('What are error boundaries?', 'Catch render errors in children — class components with getDerivedStateFromError.', 'Mid'),
    q('What errors are NOT caught?', 'Event handlers, async, SSR — use try/catch there.', 'Mid'),
  ],
  'error-handling-patterns': [
    q('Handle errors in async/event code?', 'try/catch, error state for UI, log to monitoring (Sentry).', 'Mid'),
  ],
  'concurrent-rendering': [
    q('What is Concurrent React?', 'Interruptible rendering — urgent updates prioritized (React 18+ with createRoot).', 'Mid'),
    q('Automatic batching in React 18?', 'All setStates batch — promises, timeouts, native events.', 'Mid'),
  ],
  'suspense': [
    q('What is Suspense?', 'Shows fallback while children load — code splitting and data (with framework support).', 'Mid'),
  ],
  'server-components': [
    q('What are React Server Components?', 'Run on server — zero client JS for that component, access DB directly, stream HTML.', 'Senior'),
    q('RSC vs Client Components?', 'Server: data/static. Client: interactivity, hooks, browser APIs.', 'Senior'),
  ],
  'transitions': [
    q('startTransition use case?', 'Mark filter/search updates non-urgent while input stays responsive.', 'Mid'),
  ],
  'router-setup': [
    q('BrowserRouter vs createBrowserRouter?', 'Data router (RR 7) supports loaders, actions, errorElement — recommended for production.', 'Mid'),
  ],
  'router-components-hooks': [
    q('Explain useNavigate, useParams, useLocation, useSearchParams.', 'Navigate programmatically; read :params; location object; query string read/write.', 'Junior'),
    q('Link vs NavLink?', 'NavLink adds active styling when route matches.', 'Junior'),
  ],
  'advanced-routing': [
    q('How implement protected routes?', 'Auth wrapper returning Navigate or loader redirect in data router.', 'Mid'),
    q('What are route loaders?', 'Fetch data before render — useLoaderData in component.', 'Senior'),
  ],
  'controlled-forms': [
    q('How handle controlled inputs?', 'value + onChange tied to state — single source of truth.', 'Junior'),
  ],
  'form-libraries': [
    q('Why React Hook Form popular?', 'Uncontrolled refs = fewer re-renders; great Zod/TS integration.', 'Mid'),
    q('RHF vs Formik?', 'RHF faster/lighter; Formik more controlled/reducer-style.', 'Mid'),
  ],
  'uncontrolled-forms': [
    q('When use uncontrolled forms?', 'Simple forms, file inputs, FormData, React 19 Actions.', 'Mid'),
  ],
  'advanced-context-patterns': [
    q('Optimize Context performance?', 'Split contexts, memoize value, avoid { ... } new object each render.', 'Mid'),
  ],
  'redux-toolkit': [
    q('What are Redux Toolkit slices?', 'createSlice — reducers + actions + Immer mutable syntax.', 'Mid'),
    q('RTK Query vs TanStack Query?', 'Both cache server data — pick one per app.', 'Senior'),
  ],
  'zustand': [
    q('Why Zustand popular?', 'Minimal store, no Provider, selector subscriptions prevent extra renders.', 'Mid'),
  ],
  'jotai': [
    q('Jotai vs Zustand?', 'Jotai atomic bottom-up; Zustand single top-down store.', 'Senior'),
  ],
  'recoil': [
    q('What is Recoil?', 'Facebook atomic state — atoms + selectors. Less common than Zustand today.', 'Mid'),
  ],
  'native-fetch': [
    q('Problems with useEffect-only fetch?', 'No cache, dedup, retry; race conditions need AbortController.', 'Mid'),
  ],
  'react-query': [
    q('What is TanStack Query?', 'Server state library — useQuery caches by queryKey, stale-while-revalidate.', 'Mid'),
    q('What is a query key?', 'Unique cache identifier — include all variables: ["users", userId].', 'Mid'),
  ],
  'swr': [
    q('TanStack Query vs SWR?', 'Both SWR pattern; TanStack Query richer mutations/DevTools.', 'Senior'),
  ],
  'axios-integration': [
    q('Axios vs fetch?', 'Axios: interceptors, transforms, timeouts. fetch is native and sufficient for simple cases.', 'Mid'),
  ],
  'css-modules': [
    q('What are CSS Modules?', 'Scoped hashed class names at build time — zero runtime cost.', 'Junior'),
  ],
  'styled-components': [
    q('CSS-in-JS trade-offs?', 'Dynamic styles vs runtime cost; RSC prefers CSS Modules/Tailwind.', 'Mid'),
  ],
  'emotion': [
    q('Emotion vs styled-components?', 'Emotion faster, supports css prop. Both runtime CSS-in-JS.', 'Mid'),
  ],
  'tailwind-css': [
    q('Tailwind vs traditional CSS?', 'Utility-first, design tokens, purged production CSS. v4 integrates with Vite via @tailwindcss/vite.', 'Junior'),
  ],
  'css-in-js-patterns': [
    q('Inline styles in React?', 'style={{ }} object — good for dynamic values; poor for pseudo selectors.', 'Junior'),
  ],
  'component-libraries': [
    q('shadcn/ui vs MUI?', 'shadcn: copy-paste Radix+Tailwind you own. MUI: full Material system, larger bundle.', 'Mid'),
  ],
  'react-testing-library': [
    q('RTL guiding principle?', 'Test behavior users see — query by role/label, not implementation.', 'Mid'),
    q('getBy vs queryBy vs findBy?', 'getBy throws if missing; queryBy returns null; findBy async/waitFor.', 'Mid'),
  ],
  'vitest': [
    q('Vitest vs Jest for Vite?', 'Vitest shares Vite config/transform — faster native ESM.', 'Mid'),
  ],
  'jest': [
    q('When still use Jest?', 'Legacy projects, RN ecosystem — Vite projects prefer Vitest.', 'Mid'),
  ],
  'e2e-testing': [
    q('Unit vs E2E testing?', 'Many RTL tests; few Playwright/Cypress for critical user journeys.', 'Mid'),
  ],
  'type-definitions': [
    q('How type component props?', 'interface Props { ... } on function params — avoid React.FC for children.', 'Junior'),
    q('ReactNode vs ReactElement?', 'ReactNode: anything renderable. ReactElement: JSX element specifically.', 'Mid'),
  ],
  'advanced-typescript': [
    q('Generic components in React?', 'function List<T>({ items }: { items: T[] }) — preserves item type.', 'Senior'),
    q('Partial, Pick, Omit use cases?', 'Partial for drafts; Pick/Omit for extending component props.', 'Mid'),
  ],
  'build-configuration': [
    q('Vite vs Webpack?', 'Vite: ESM dev server + Rollup prod. Webpack: full bundle dev — slower.', 'Mid'),
    q('Environment variables in Vite?', 'VITE_ prefix in .env; access via import.meta.env — never secrets.', 'Mid'),
  ],
  'deployment': [
    q('Deploy React SPA to Vercel?', 'Build to dist/, configure SPA redirect to index.html, set env vars.', 'Junior'),
    q('CSR vs SSR vs SSG?', 'CSR in browser; SSR per request; SSG at build time.', 'Senior'),
  ],
  'framer-motion': [
    q('Framer Motion use case?', 'Declarative animations, layout animations, gestures — popular for React UI.', 'Mid'),
  ],
  'react-spring': [
    q('React Spring vs Framer Motion?', 'Spring physics-based; Framer more feature-rich declarative API.', 'Mid'),
  ],
  'css-animations': [
    q('CSS transitions vs animations?', 'Transitions: property change A→B. Animations: keyframes, loops.', 'Junior'),
  ],
  'aria': [
    q('When use ARIA?', 'Only when semantic HTML insufficient — prefer button over div role=button.', 'Mid'),
  ],
  'accessibility-tools': [
    q('How test accessibility?', 'axe DevTools, Lighthouse, keyboard-only testing, screen readers.', 'Mid'),
  ],
  'react-i18next': [
    q('How react-i18next works?', 'useTranslation() returns t("key"); switch language via i18n.changeLanguage.', 'Mid'),
  ],
  'security-best-practices': [
    q('XSS prevention in React?', 'JSX escapes by default; sanitize dangerouslySetInnerHTML with DOMPurify.', 'Mid'),
    q('Where store JWT?', 'HttpOnly cookies preferred over localStorage.', 'Senior'),
  ],
  'micro-frontends': [
    q('What are micro-frontends?', 'Independent deployable frontends composed at runtime — Module Federation.', 'Senior'),
  ],
  'pwa': [
    q('What is a PWA?', 'Installable web app with service worker offline support + manifest.', 'Mid'),
  ],
  'websockets': [
    q('WebSockets vs SSE?', 'WebSockets bidirectional; SSE server→client only over HTTP.', 'Senior'),
  ],
  'server-sent-events': [
    q('When use SSE?', 'Live feeds, notifications — simpler than WebSockets for one-way streams.', 'Mid'),
  ],
  'react-devtools': [
    q('React DevTools Profiler?', 'Find slow components, why re-rendered, commit duration.', 'Mid'),
  ],
  'browser-devtools': [
    q('Debug memory leaks?', 'Performance/Memory tab — detached DOM, missing effect cleanup.', 'Senior'),
  ],
  'react-compiler': [
    q('What is React Compiler?', 'Build-time auto-memoization — reduces manual useMemo/memo.', 'Senior'),
  ],
  'actions-form-handling': [
    q('React 19 Actions?', 'Async form action prop; useFormStatus for pending; progressive enhancement.', 'Mid'),
  ],
  'useoptimistic-hook': [
    q('What is useOptimistic?', 'Show optimistic UI during async action; auto revert on error.', 'Mid'),
  ],
  'document-metadata': [
    q('Document metadata in React 19?', 'Render <title> and <meta> in components — hoisted to head.', 'Mid'),
  ],
  'ref-as-prop': [
    q('ref as prop in React 19?', 'Pass ref like any prop — forwardRef often unnecessary.', 'Mid'),
  ],
  'context-as-provider': [
    q('Context as Provider syntax?', '<ThemeContext value={x}> replaces .Provider in React 19.', 'Mid'),
  ],
  'async-components': [
    q('Async components in React 19?', 'Components async with Suspense — await data during render with use().', 'Senior'),
  ],
  'use-hook': [
    q('What is the use() hook?', 'Unwrap promises/context in render; works with Suspense; can be conditional.', 'Senior'),
  ],
  'server-components-stable': [
    q('RSC stable in React 19?', 'Stable protocol; primary adoption via Next.js App Router.', 'Senior'),
  ],
  'improved-hydration': [
    q('Hydration mismatch causes?', 'Date.now(), random IDs, window checks during render — use useId/useEffect.', 'Senior'),
  ],
  'enhanced-suspense': [
    q('Nested Suspense boundaries?', 'Granular loading — shell fast, slow parts stream independently.', 'Mid'),
  ],
  'asset-loading': [
    q('Preload assets in React 19?', 'Resource hints for fonts/images — faster LCP.', 'Mid'),
  ],
  'web-components': [
    q('Web Components in React 19?', 'Better custom element integration — pass props, listen to events.', 'Mid'),
  ],
  'typescript-improvements': [
    q('React 19 TS changes?', 'ref as prop types; improved useRef/useReducer inference.', 'Mid'),
  ],
  'concurrent-features': [
    q('Enhanced concurrent features in React 19?', 'Improved batching, transitions, scheduling optimizations.', 'Senior'),
  ],
  'error-boundaries-enhancements': [
    q('Error boundary improvements in React 19?', 'Better error recovery patterns and SSR error handling.', 'Mid'),
  ],
};

function buildFromTopics(lessonTitle, topics) {
  return topics.map((topic) =>
    q(
      `Explain "${topic}" — how would you answer this in an interview?`,
      `When discussing ${topic} in ${lessonTitle}: give a clear definition, explain why it matters in React 19 apps, describe a real use case, and mention one common mistake or trade-off interviewers expect.`,
      'Mid'
    )
  );
}

function getQuestionsForLesson(lesson) {
  const questions = [...(curated[lesson.content] || [])];
  const seen = new Set(questions.map((item) => item.q));

  for (const topicQuestion of buildFromTopics(lesson.title, lesson.topics)) {
    if (questions.length >= 10) break;
    if (!seen.has(topicQuestion.q)) {
      questions.push(topicQuestion);
      seen.add(topicQuestion.q);
    }
  }

  const fallbacks = [
    q(
      `What is ${lesson.title} and why is it important in React 19?`,
      `${lesson.title} is a core React concept. Explain the problem it solves, when to use it vs alternatives, and give a concise code or architecture example from production experience.`,
      'Mid'
    ),
    q(
      `What are the most common ${lesson.title} interview follow-up questions?`,
      `Interviewers often ask about edge cases, performance implications, testing strategy, and how ${lesson.title} interacts with hooks, Suspense, or Server Components in modern React apps.`,
      'Senior'
    ),
    q(
      `Describe a real-world scenario where you used ${lesson.title}.`,
      `Use the STAR format: situation, task, action, result. Tie the answer to measurable outcomes (performance, maintainability, fewer bugs) and mention React 19 / current ecosystem tools.`,
      'Mid'
    ),
  ];

  for (const fallback of fallbacks) {
    if (questions.length >= 6) break;
    if (!seen.has(fallback.q)) {
      questions.push(fallback);
      seen.add(fallback.q);
    }
  }

  return questions.slice(0, 10);
}

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

const entries = [];
for (const phase of corePhases.filter(isLearningPhase)) {
  for (const module of phase.modules) {
    for (const lesson of module.lessons) {
      const questions = getQuestionsForLesson(lesson);
      entries.push({
        contentId: lesson.content,
        title: `${lesson.title} — Most Asked Interview Questions`,
        subtitle: `${phase.title} · ${module.title}`,
        level: 'Junior to Senior',
        tip: `When answering "${lesson.title}" questions: definition → example → trade-off. Use React 19 / latest APIs.`,
        sections: [{ title: 'Most Asked Questions', questions }],
      });
    }
  }
}

const body = entries.map(serializeEntry).join(',\n');
const output = `// Auto-generated by scripts/generate-interview-qa.mjs
export const interviewQA = {
${body}
};
`;

writeFileSync(new URL('../src/data/interviewQA.js', import.meta.url), output);
console.log(`Generated ${entries.length} lesson-wise Q&A entries.`);
