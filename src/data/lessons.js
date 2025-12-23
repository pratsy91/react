export const phases = [
  {
    id: 'phase-1',
    title: 'Phase 1: Foundation & Core Concepts',
    description: 'Weeks 1-2: Master the fundamentals of React',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: React Fundamentals',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Setup & Environment',
            topics: [
              'Vite setup and configuration',
              'Project structure and organization',
              'ESLint, Prettier configuration',
              'Understanding build tools and bundling'
            ],
            content: 'setup-environment'
          },
          {
            id: 'lesson-1-2',
            title: 'JSX Deep Dive',
            topics: [
              'JSX syntax and expressions',
              'JSX vs createElement',
              'Fragments (`<>` and `<React.Fragment>`)',
              'JSX transformations and Babel',
              'Conditional rendering (ternary, &&, ||, if-else)',
              'Lists and keys (key prop importance)',
              'JSX escaping and security'
            ],
            content: 'jsx-deep-dive'
          },
          {
            id: 'lesson-1-3',
            title: 'Components',
            topics: [
              'Function components',
              'Component composition',
              'Props (passing, destructuring, default props)',
              'Children prop',
              'Props validation with PropTypes',
              'Component naming conventions'
            ],
            content: 'components'
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Module 2: State & Events',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'State Management (useState)',
            topics: [
              'useState hook basics',
              'State updates (functional updates)',
              'State batching',
              'State with objects and arrays',
              'Lazy initial state',
              'Multiple state variables vs single object'
            ],
            content: 'state-management-usestate'
          },
          {
            id: 'lesson-2-2',
            title: 'Event Handling',
            topics: [
              'All synthetic events (onClick, onChange, onSubmit, onFocus, onBlur, etc.)',
              'Event object and properties',
              'Event pooling (legacy)',
              'preventDefault and stopPropagation',
              'Event delegation',
              'Custom event handlers',
              'Keyboard events, mouse events, touch events, form events'
            ],
            content: 'event-handling'
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Module 3: Effects & Lifecycle',
        lessons: [
          {
            id: 'lesson-3-1',
            title: 'useEffect Hook',
            topics: [
              'Basic effects',
              'Cleanup functions',
              'Dependency arrays (empty, with deps, no array)',
              'Multiple effects',
              'Effect execution timing',
              'Fetching data with useEffect',
              'Race conditions in effects',
              'Effect dependencies best practices'
            ],
            content: 'useeffect-hook'
          },
          {
            id: 'lesson-3-2',
            title: 'Component Lifecycle',
            topics: [
              'Mount, update, unmount phases',
              'Lifecycle equivalents in hooks',
              'Understanding re-renders',
              'Rendering behavior'
            ],
            content: 'component-lifecycle'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Intermediate Hooks & Optimization',
    description: 'Weeks 3-4: Master all React hooks and performance optimization',
    modules: [
      {
        id: 'module-4',
        title: 'Module 4: All React Hooks',
        lessons: [
          {
            id: 'lesson-4-1',
            title: 'useRef',
            topics: [
              'DOM references',
              'Mutable values that persist',
              'Ref forwarding with forwardRef',
              'useImperativeHandle',
              'Callback refs',
              'Refs with TypeScript'
            ],
            content: 'useref-hook'
          },
          {
            id: 'lesson-4-2',
            title: 'useContext',
            topics: [
              'Creating context',
              'Provider and Consumer',
              'Multiple contexts',
              'Context composition',
              'Dynamic context values',
              'Context with reducers'
            ],
            content: 'usecontext-hook'
          },
          {
            id: 'lesson-4-3',
            title: 'useReducer',
            topics: [
              'Reducer pattern',
              'Actions and action types',
              'Complex state logic',
              'useReducer vs useState',
              'Combining with context',
              'Init function'
            ],
            content: 'usereducer-hook'
          },
          {
            id: 'lesson-4-4',
            title: 'useCallback',
            topics: [
              'Memoizing callbacks',
              'Dependency arrays',
              'When to use useCallback',
              'Performance implications',
              'Common pitfalls'
            ],
            content: 'usecallback-hook'
          },
          {
            id: 'lesson-4-5',
            title: 'useMemo',
            topics: [
              'Memoizing values',
              'Expensive calculations',
              'Referential equality',
              'When to use useMemo',
              'Performance optimization'
            ],
            content: 'usememo-hook'
          },
          {
            id: 'lesson-4-6',
            title: 'useLayoutEffect',
            topics: [
              'Synchronous effects',
              'DOM measurements',
              'useLayoutEffect vs useEffect',
              'Use cases and performance'
            ],
            content: 'uselayouteffect-hook'
          },
          {
            id: 'lesson-4-7',
            title: 'useDebugValue',
            topics: [
              'Custom hook debugging',
              'Formatting debug values',
              'DevTools integration'
            ],
            content: 'usedebugvalue-hook'
          },
          {
            id: 'lesson-4-8',
            title: 'useId (React 18)',
            topics: [
              'Generating unique IDs',
              'SSR compatibility',
              'Accessibility IDs'
            ],
            content: 'useid-hook'
          },
          {
            id: 'lesson-4-9',
            title: 'useTransition (React 18)',
            topics: [
              'Concurrent rendering',
              'Marking updates as transitions',
              'isPending state',
              'UI responsiveness'
            ],
            content: 'usetransition-hook'
          },
          {
            id: 'lesson-4-10',
            title: 'useDeferredValue (React 18)',
            topics: [
              'Deferring non-urgent updates',
              'Debouncing alternative',
              'Performance optimization'
            ],
            content: 'usedeferredvalue-hook'
          },
          {
            id: 'lesson-4-11',
            title: 'useSyncExternalStore & useInsertionEffect (React 18)',
            topics: [
              'useSyncExternalStore: Subscribing to external stores',
              'Snapshot and subscribe functions',
              'Library integration',
              'useInsertionEffect: CSS-in-JS libraries',
              'DOM mutations before layout effects'
            ],
            content: 'usesyncexternalstore-insertioneffect-hook'
          }
        ]
      },
      {
        id: 'module-5',
        title: 'Module 5: Performance Optimization',
        lessons: [
          {
            id: 'lesson-5-1',
            title: 'React.memo',
            topics: [
              'Component memoization',
              'Custom comparison functions',
              'When to use memo',
              'Shallow comparison'
            ],
            content: 'react-memo'
          },
          {
            id: 'lesson-5-2',
            title: 'Code Splitting',
            topics: [
              'React.lazy',
              'Suspense boundary',
              'Dynamic imports',
              'Route-based splitting',
              'Component-based splitting',
              'Error boundaries with lazy loading'
            ],
            content: 'code-splitting'
          },
          {
            id: 'lesson-5-3',
            title: 'Performance Patterns',
            topics: [
              'Windowing/virtualization',
              'Debouncing and throttling',
              'Optimistic UI updates',
              'Request deduplication',
              'Image lazy loading',
              'Bundle analysis and optimization'
            ],
            content: 'performance-patterns'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Advanced Patterns & Architecture',
    description: 'Weeks 5-6: Master advanced patterns and error handling',
    modules: [
      {
        id: 'module-6',
        title: 'Module 6: Advanced Component Patterns',
        lessons: [
          {
            id: 'lesson-6-1',
            title: 'Compound Components',
            topics: [
              'Implicit state sharing',
              'Context in compound components',
              'Flexible component APIs'
            ],
            content: 'compound-components'
          },
          {
            id: 'lesson-6-2',
            title: 'Render Props',
            topics: [
              'Function as children',
              'Render prop pattern',
              'HOC vs render props'
            ],
            content: 'render-props'
          },
          {
            id: 'lesson-6-3',
            title: 'Higher-Order Components (HOC)',
            topics: [
              'Creating HOCs',
              'Props manipulation',
              'Multiple HOCs composition',
              'HOC best practices and pitfalls'
            ],
            content: 'higher-order-components'
          },
          {
            id: 'lesson-6-4',
            title: 'Custom Hooks',
            topics: [
              'Creating custom hooks',
              'Hook composition',
              'Hook testing',
              'Common custom hooks patterns',
              'Sharing logic between components'
            ],
            content: 'custom-hooks'
          },
          {
            id: 'lesson-6-5',
            title: 'Controlled vs Uncontrolled Components',
            topics: [
              'Controlled inputs',
              'Uncontrolled with refs',
              'When to use each',
              'File inputs and special cases'
            ],
            content: 'controlled-uncontrolled-components'
          },
          {
            id: 'lesson-6-6',
            title: 'Portal',
            topics: [
              'createPortal',
              'Rendering outside parent',
              'Modal and tooltip patterns',
              'Event bubbling through portals'
            ],
            content: 'portal'
          }
        ]
      },
      {
        id: 'module-7',
        title: 'Module 7: Error Handling & Boundaries',
        lessons: [
          {
            id: 'lesson-7-1',
            title: 'Error Boundaries',
            topics: [
              'getDerivedStateFromError',
              'componentDidCatch (class-based)',
              'Error boundary placement',
              'Fallback UI',
              'Error reporting',
              'React 18+ error handling improvements'
            ],
            content: 'error-boundaries'
          },
          {
            id: 'lesson-7-2',
            title: 'Error Handling Patterns',
            topics: [
              'Try-catch in event handlers',
              'Error handling in async code',
              'Graceful degradation',
              'Error logging services integration'
            ],
            content: 'error-handling-patterns'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    title: 'Phase 4: React 18 Concurrent Features',
    description: 'Week 7: Master React 18 concurrent rendering and advanced features',
    modules: [
      {
        id: 'module-8',
        title: 'Module 8: Concurrent React',
        lessons: [
          {
            id: 'lesson-8-1',
            title: 'Concurrent Rendering',
            topics: [
              'Automatic batching',
              'startTransition API',
              'Concurrent features overview',
              'Interruptible rendering',
              'Priority-based rendering'
            ],
            content: 'concurrent-rendering'
          },
          {
            id: 'lesson-8-2',
            title: 'Suspense',
            topics: [
              'Suspense for code splitting',
              'Suspense for data fetching',
              'Multiple Suspense boundaries',
              'Suspense best practices',
              'SuspenseList (experimental)'
            ],
            content: 'suspense'
          },
          {
            id: 'lesson-8-3',
            title: 'Server Components (React Server Components)',
            topics: [
              'Understanding RSC',
              'Client vs Server components',
              'Use cases and benefits',
              'Limitations and considerations'
            ],
            content: 'server-components'
          },
          {
            id: 'lesson-8-4',
            title: 'Transitions',
            topics: [
              'useTransition hook deep dive',
              'startTransition function',
              'Urgent vs non-urgent updates',
              'Loading states management'
            ],
            content: 'transitions'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-5',
    title: 'Phase 5: Routing & Navigation',
    description: 'Week 8: Master React Router and advanced routing patterns',
    modules: [
      {
        id: 'module-9',
        title: 'Module 9: React Router',
        lessons: [
          {
            id: 'lesson-9-1',
            title: 'Router Setup',
            topics: [
              'BrowserRouter, HashRouter, MemoryRouter',
              'RouterProvider (v6.4+)',
              'createBrowserRouter',
              'createRoutesFromElements'
            ],
            content: 'router-setup'
          },
          {
            id: 'lesson-9-2',
            title: 'All Router Components & Hooks',
            topics: [
              'Routes, Route',
              'Link, NavLink',
              'Navigate',
              'Outlet',
              'useNavigate',
              'useLocation',
              'useParams',
              'useSearchParams',
              'useMatch',
              'useRoutes',
              'useResolvedPath',
              'useHref',
              'useInRouterContext',
              'useNavigationType',
              'useOutlet',
              'useOutletContext'
            ],
            content: 'router-components-hooks'
          },
          {
            id: 'lesson-9-3',
            title: 'Advanced Routing',
            topics: [
              'Nested routes',
              'Dynamic routes',
              'Protected routes',
              'Route guards',
              'Lazy loaded routes',
              'Data loading with loaders',
              'Actions and forms',
              'Error elements',
              'Index routes',
              'Layout routes',
              'Scroll restoration',
              'Route parameters and query strings'
            ],
            content: 'advanced-routing'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-6',
    title: 'Phase 6: Forms & Validation',
    description: 'Week 9: Master form handling and validation in React',
    modules: [
      {
        id: 'module-10',
        title: 'Module 10: Form Handling',
        lessons: [
          {
            id: 'lesson-10-1',
            title: 'Controlled Forms',
            topics: [
              'Input, textarea, select',
              'Checkboxes and radio buttons',
              'File uploads',
              'Multi-step forms',
              'Dynamic form fields'
            ],
            content: 'controlled-forms'
          },
          {
            id: 'lesson-10-2',
            title: 'Form Libraries',
            topics: [
              'React Hook Form (complete API)',
              'Formik (complete API)',
              'Form validation strategies',
              'Custom validation',
              'Yup, Zod integration',
              'Field arrays and nested forms'
            ],
            content: 'form-libraries'
          },
          {
            id: 'lesson-10-3',
            title: 'Uncontrolled Forms',
            topics: [
              'Form refs',
              'FormData API',
              'Native form handling'
            ],
            content: 'uncontrolled-forms'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-7',
    title: 'Phase 7: State Management',
    description: 'Weeks 10-11: Master Context API and external state management libraries',
    modules: [
      {
        id: 'module-11',
        title: 'Module 11: Context API Deep Dive',
        lessons: [
          {
            id: 'lesson-11-1',
            title: 'Advanced Context Patterns',
            topics: [
              'Multiple context providers',
              'Context composition',
              'Performance optimization',
              'Context splitting',
              'Context with useReducer'
            ],
            content: 'advanced-context-patterns'
          }
        ]
      },
      {
        id: 'module-12',
        title: 'Module 12: External State Management',
        lessons: [
          {
            id: 'lesson-12-1',
            title: 'Redux Toolkit',
            topics: [
              'Store setup',
              'Slices and reducers',
              'All RTK hooks (useSelector, useDispatch, useStore)',
              'createSlice, createAsyncThunk',
              'RTK Query (complete API)',
              'Middleware',
              'Redux DevTools'
            ],
            content: 'redux-toolkit'
          },
          {
            id: 'lesson-12-2',
            title: 'Zustand',
            topics: [
              'Store creation',
              'Subscriptions',
              'Middleware',
              'Persistence',
              'All Zustand APIs'
            ],
            content: 'zustand'
          },
          {
            id: 'lesson-12-3',
            title: 'Jotai',
            topics: [
              'Atoms',
              'Derived atoms',
              'Async atoms',
              'All Jotai hooks and utilities'
            ],
            content: 'jotai'
          },
          {
            id: 'lesson-12-4',
            title: 'Recoil',
            topics: [
              'Atoms and selectors',
              'Atom families',
              'Selector families',
              'All Recoil hooks'
            ],
            content: 'recoil'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-8',
    title: 'Phase 8: Data Fetching & API Integration',
    description: 'Week 12: Master data fetching and API integration in React',
    modules: [
      {
        id: 'module-13',
        title: 'Module 13: Data Fetching',
        lessons: [
          {
            id: 'lesson-13-1',
            title: 'Native Fetch',
            topics: [
              'Fetch API with useEffect',
              'Abort controllers',
              'Error handling',
              'Loading states',
              'Caching strategies'
            ],
            content: 'native-fetch'
          },
          {
            id: 'lesson-13-2',
            title: 'React Query / TanStack Query',
            topics: [
              'Complete API coverage',
              'useQuery, useMutation, useInfiniteQuery',
              'Query invalidation',
              'Optimistic updates',
              'Cache management',
              'Prefetching',
              'Suspense mode',
              'Query keys strategies'
            ],
            content: 'react-query'
          },
          {
            id: 'lesson-13-3',
            title: 'SWR',
            topics: [
              'Complete SWR API',
              'Revalidation strategies',
              'Mutations',
              'All SWR hooks'
            ],
            content: 'swr'
          },
          {
            id: 'lesson-13-4',
            title: 'Axios Integration',
            topics: [
              'Interceptors',
              'Request/response handling',
              'Custom hooks with Axios'
            ],
            content: 'axios-integration'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-9',
    title: 'Phase 9: Styling Solutions',
    description: 'Week 13: Master all styling approaches in React',
    modules: [
      {
        id: 'module-14',
        title: 'Module 14: All Styling Approaches',
        lessons: [
          {
            id: 'lesson-14-1',
            title: 'CSS Modules',
            topics: [
              'Setup and usage',
              'Composition',
              'Global vs local styles'
            ],
            content: 'css-modules'
          },
          {
            id: 'lesson-14-2',
            title: 'Styled Components',
            topics: [
              'Complete styled-components API',
              'Theming',
              'Dynamic styles',
              'Server-side rendering'
            ],
            content: 'styled-components'
          },
          {
            id: 'lesson-14-3',
            title: 'Emotion',
            topics: [
              'css prop',
              'styled API',
              'Theming and variants'
            ],
            content: 'emotion'
          },
          {
            id: 'lesson-14-4',
            title: 'Tailwind CSS',
            topics: [
              'Utility-first approach',
              'Custom configuration',
              'Component patterns',
              'JIT mode'
            ],
            content: 'tailwind-css'
          },
          {
            id: 'lesson-14-5',
            title: 'CSS-in-JS Patterns',
            topics: [
              'Inline styles',
              'Style object patterns',
              'Dynamic styling'
            ],
            content: 'css-in-js-patterns'
          },
          {
            id: 'lesson-14-6',
            title: 'Component Libraries',
            topics: [
              'Material-UI (MUI) - complete API',
              'Chakra UI - complete API',
              'Ant Design',
              'shadcn/ui',
              'Radix UI primitives'
            ],
            content: 'component-libraries'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-10',
    title: 'Phase 10: Testing',
    description: 'Weeks 14-15: Master testing strategies in React',
    modules: [
      {
        id: 'module-15',
        title: 'Module 15: Testing Strategies',
        lessons: [
          {
            id: 'lesson-15-1',
            title: 'React Testing Library',
            topics: [
              'All queries (getBy, queryBy, findBy)',
              'User events and interactions',
              'Async testing',
              'Custom renders',
              'Testing hooks (@testing-library/react-hooks)',
              'Testing context',
              'Testing custom hooks'
            ],
            content: 'react-testing-library'
          },
          {
            id: 'lesson-15-2',
            title: 'Vitest',
            topics: [
              'Test setup',
              'Assertions',
              'Mocking',
              'Coverage'
            ],
            content: 'vitest'
          },
          {
            id: 'lesson-15-3',
            title: 'Jest',
            topics: [
              'Test suites and specs',
              'Matchers (all Jest matchers)',
              'Mocking modules and functions',
              'Snapshot testing',
              'Timer mocks',
              'Mock functions (jest.fn, jest.mock, etc.)'
            ],
            content: 'jest'
          },
          {
            id: 'lesson-15-4',
            title: 'E2E Testing',
            topics: [
              'Playwright',
              'Cypress',
              'Component testing'
            ],
            content: 'e2e-testing'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-11',
    title: 'Phase 11: TypeScript Integration',
    description: 'Week 16: Master TypeScript with React',
    modules: [
      {
        id: 'module-16',
        title: 'Module 16: TypeScript with React',
        lessons: [
          {
            id: 'lesson-16-1',
            title: 'Type Definitions',
            topics: [
              'FC, ReactNode, ReactElement',
              'Props typing',
              'Children typing',
              'Event types (all synthetic events)',
              'Ref types',
              'Hook types'
            ],
            content: 'type-definitions'
          },
          {
            id: 'lesson-16-2',
            title: 'Advanced TypeScript',
            topics: [
              'Generic components',
              'Utility types (Partial, Pick, Omit, etc.)',
              'Discriminated unions',
              'Type guards',
              'Context typing',
              'HOC typing',
              'Render props typing'
            ],
            content: 'advanced-typescript'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-12',
    title: 'Phase 12: Build & Deploy',
    description: 'Week 17: Master production optimization and deployment',
    modules: [
      {
        id: 'module-17',
        title: 'Module 17: Production Optimization',
        lessons: [
          {
            id: 'lesson-17-1',
            title: 'Build Configuration',
            topics: [
              'Vite configuration',
              'Environment variables',
              'Build optimization',
              'Asset optimization',
              'Tree shaking',
              'Code splitting strategies'
            ],
            content: 'build-configuration'
          },
          {
            id: 'lesson-17-2',
            title: 'Deployment',
            topics: [
              'Vercel, Netlify, Railway',
              'Docker containerization',
              'CI/CD pipelines',
              'Environment management',
              'Performance monitoring'
            ],
            content: 'deployment'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-13',
    title: 'Phase 13: Advanced Topics',
    description: 'Weeks 18-20: Master advanced React concepts and patterns',
    modules: [
      {
        id: 'module-18',
        title: 'Module 18: Animations',
        lessons: [
          {
            id: 'lesson-18-1',
            title: 'Framer Motion',
            topics: [
              'Complete API coverage',
              'Variants and animations',
              'Gestures',
              'Layout animations',
              'Scroll animations'
            ],
            content: 'framer-motion'
          },
          {
            id: 'lesson-18-2',
            title: 'React Spring',
            topics: [
              'Springs and physics',
              'Transitions',
              'All hooks'
            ],
            content: 'react-spring'
          },
          {
            id: 'lesson-18-3',
            title: 'CSS Animations',
            topics: [
              'CSS transitions',
              'CSS animations',
              'Animation patterns'
            ],
            content: 'css-animations'
          }
        ]
      },
      {
        id: 'module-19',
        title: 'Module 19: Accessibility (a11y)',
        lessons: [
          {
            id: 'lesson-19-1',
            title: 'ARIA',
            topics: [
              'ARIA attributes',
              'Semantic HTML',
              'Keyboard navigation',
              'Screen reader testing',
              'Focus management',
              'Live regions'
            ],
            content: 'aria'
          },
          {
            id: 'lesson-19-2',
            title: 'Accessibility Tools',
            topics: [
              'axe DevTools',
              'Lighthouse',
              'Testing accessibility'
            ],
            content: 'accessibility-tools'
          }
        ]
      },
      {
        id: 'module-20',
        title: 'Module 20: Internationalization (i18n)',
        lessons: [
          {
            id: 'lesson-20-1',
            title: 'react-i18next',
            topics: [
              'Complete API',
              'Translation management',
              'Language switching',
              'Pluralization',
              'Formatting (dates, numbers)'
            ],
            content: 'react-i18next'
          }
        ]
      },
      {
        id: 'module-21',
        title: 'Module 21: Security',
        lessons: [
          {
            id: 'lesson-21-1',
            title: 'Security Best Practices',
            topics: [
              'XSS prevention',
              'CSRF protection',
              'Content Security Policy',
              'Secure authentication patterns',
              'Input sanitization',
              'Dependency security'
            ],
            content: 'security-best-practices'
          }
        ]
      },
      {
        id: 'module-22',
        title: 'Module 22: Advanced Patterns',
        lessons: [
          {
            id: 'lesson-22-1',
            title: 'Micro-frontends',
            topics: [
              'Module federation',
              'Independent deployments',
              'Shared dependencies'
            ],
            content: 'micro-frontends'
          },
          {
            id: 'lesson-22-2',
            title: 'PWA',
            topics: [
              'Service workers',
              'Offline support',
              'Web app manifest',
              'Push notifications',
              'Cache strategies'
            ],
            content: 'pwa'
          }
        ]
      },
      {
        id: 'module-23',
        title: 'Module 23: Real-time Features',
        lessons: [
          {
            id: 'lesson-23-1',
            title: 'WebSockets',
            topics: [
              'Socket.io integration',
              'Real-time updates',
              'Reconnection handling'
            ],
            content: 'websockets'
          },
          {
            id: 'lesson-23-2',
            title: 'Server-Sent Events',
            topics: [
              'EventSource API',
              'Live updates'
            ],
            content: 'server-sent-events'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-14',
    title: 'Phase 14: DevTools & Debugging',
    description: 'Week 21: Master developer tools and debugging',
    modules: [
      {
        id: 'module-24',
        title: 'Module 24: Developer Tools',
        lessons: [
          {
            id: 'lesson-24-1',
            title: 'React DevTools',
            topics: [
              'Component tree inspection',
              'Props and state inspection',
              'Profiler',
              'Performance monitoring',
              'Debugging hooks'
            ],
            content: 'react-devtools'
          },
          {
            id: 'lesson-24-2',
            title: 'Browser DevTools',
            topics: [
              'Performance profiling',
              'Memory leaks detection',
              'Network monitoring'
            ],
            content: 'browser-devtools'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-15',
    title: 'Phase 15: Recent Updates',
    description: 'Week 22: React 19 - All New Features & APIs',
    modules: [
      {
        id: 'module-25',
        title: 'Module 25: React 19 - Complete Coverage',
        lessons: [
          {
            id: 'lesson-25-1',
            title: 'React Compiler',
            topics: [
              'Automatic optimization',
              'Compiler configuration',
              'Memoization improvements',
              'Performance enhancements',
              'Migration guide'
            ],
            content: 'react-compiler'
          },
          {
            id: 'lesson-25-2',
            title: 'Actions & Form Handling',
            topics: [
              'Form actions',
              'useActionState hook',
              'useFormStatus hook',
              'Server actions',
              'Progressive enhancement'
            ],
            content: 'actions-form-handling'
          },
          {
            id: 'lesson-25-3',
            title: 'useOptimistic Hook',
            topics: [
              'Optimistic updates',
              'useOptimistic API',
              'UI responsiveness',
              'Error handling',
              'Rollback patterns'
            ],
            content: 'useoptimistic-hook'
          },
          {
            id: 'lesson-25-4',
            title: 'Document Metadata',
            topics: [
              'Built-in title support',
              'Meta tags',
              'Async metadata',
              'Document head management',
              'SEO improvements'
            ],
            content: 'document-metadata'
          },
          {
            id: 'lesson-25-5',
            title: 'Ref as Prop',
            topics: [
              'Ref forwarding improvements',
              'Ref prop support',
              'Component refs',
              'Forward ref patterns',
              'TypeScript support'
            ],
            content: 'ref-as-prop'
          },
          {
            id: 'lesson-25-6',
            title: 'Context as Provider',
            topics: [
              'Context provider pattern',
              'Context composition',
              'Provider improvements',
              'Performance optimizations',
              'Multiple contexts'
            ],
            content: 'context-as-provider'
          },
          {
            id: 'lesson-25-7',
            title: 'Async Components',
            topics: [
              'Async component support',
              'Promise handling',
              'Suspense integration',
              'Error boundaries',
              'Loading states'
            ],
            content: 'async-components'
          },
          {
            id: 'lesson-25-8',
            title: 'use Hook',
            topics: [
              'use() hook API',
              'Promise unwrapping',
              'Context reading',
              'Suspense integration',
              'Error handling'
            ],
            content: 'use-hook'
          },
          {
            id: 'lesson-25-9',
            title: 'Server Components (Stable)',
            topics: [
              'Stable Server Components',
              'RSC architecture',
              'Client/Server boundaries',
              'Data fetching',
              'Streaming SSR'
            ],
            content: 'server-components-stable'
          },
          {
            id: 'lesson-25-10',
            title: 'Improved Hydration',
            topics: [
              'Better hydration errors',
              'Error messages',
              'Hydration mismatch detection',
              'SSR improvements',
              'Debugging tools'
            ],
            content: 'improved-hydration'
          },
          {
            id: 'lesson-25-11',
            title: 'Enhanced Suspense',
            topics: [
              'Suspense improvements',
              'Multiple boundaries',
              'Nested Suspense',
              'Error boundaries integration',
              'Loading patterns'
            ],
            content: 'enhanced-suspense'
          },
          {
            id: 'lesson-25-12',
            title: 'Asset Loading',
            topics: [
              'Resource hints',
              'Preloading',
              'Image optimization',
              'Font loading',
              'Performance improvements'
            ],
            content: 'asset-loading'
          },
          {
            id: 'lesson-25-13',
            title: 'Web Components',
            topics: [
              'Web Components support',
              'Custom elements',
              'Shadow DOM',
              'Integration patterns',
              'Event handling'
            ],
            content: 'web-components'
          },
          {
            id: 'lesson-25-14',
            title: 'TypeScript Improvements',
            topics: [
              'Better type inference',
              'Ref types',
              'Context types',
              'Component types',
              'Hook types'
            ],
            content: 'typescript-improvements'
          },
          {
            id: 'lesson-25-15',
            title: 'Concurrent Features',
            topics: [
              'Enhanced concurrent rendering',
              'Automatic batching improvements',
              'Transition API updates',
              'Priority scheduling',
              'Performance optimizations'
            ],
            content: 'concurrent-features'
          },
          {
            id: 'lesson-25-16',
            title: 'Error Boundaries Enhancements',
            topics: [
              'Improved error boundaries',
              'Error recovery',
              'Error reporting',
              'Fallback UI patterns',
              'Error boundary composition'
            ],
            content: 'error-boundaries-enhancements'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-16',
    title: 'Phase 16: Interview Cheatsheets',
    description: 'Complete React Interview Preparation - Quick Reference & Common Questions',
    modules: [
      {
        id: 'module-26',
        title: 'Module 26: React Fundamentals Cheatsheet',
        lessons: [
          {
            id: 'lesson-26-1',
            title: 'React Core Concepts Cheatsheet',
            topics: [
              'JSX syntax and rules',
              'Components and props',
              'State and lifecycle',
              'Event handling',
              'Conditional rendering',
              'Lists and keys',
              'Component composition'
            ],
            content: 'react-fundamentals-cheatsheet'
          },
          {
            id: 'lesson-26-2',
            title: 'Virtual DOM & Reconciliation Cheatsheet',
            topics: [
              'Virtual DOM concept',
              'Reconciliation algorithm',
              'Diffing algorithm',
              'Key prop importance',
              'Performance implications',
              'Render optimization'
            ],
            content: 'virtual-dom-cheatsheet'
          }
        ]
      },
      {
        id: 'module-27',
        title: 'Module 27: React Hooks Cheatsheet',
        lessons: [
          {
            id: 'lesson-27-1',
            title: 'All Hooks Quick Reference',
            topics: [
              'useState - state management',
              'useEffect - side effects',
              'useContext - context consumption',
              'useReducer - complex state',
              'useCallback - memoized callbacks',
              'useMemo - memoized values',
              'useRef - refs and mutable values',
              'useLayoutEffect - synchronous effects',
              'useImperativeHandle - ref forwarding',
              'useDebugValue - dev tools',
              'useId - unique IDs',
              'useTransition - non-urgent updates',
              'useDeferredValue - deferred values',
              'useSyncExternalStore - external stores',
              'useInsertionEffect - CSS-in-JS',
              'useOptimistic - optimistic updates',
              'useActionState - form actions',
              'useFormStatus - form status',
              'use() - promise/context unwrapping'
            ],
            content: 'hooks-cheatsheet'
          },
          {
            id: 'lesson-27-2',
            title: 'Custom Hooks Patterns Cheatsheet',
            topics: [
              'Custom hook rules',
              'Common custom hooks',
              'Hook composition',
              'Sharing logic with hooks',
              'Hook best practices'
            ],
            content: 'custom-hooks-cheatsheet'
          }
        ]
      },
      {
        id: 'module-28',
        title: 'Module 28: Performance Optimization Cheatsheet',
        lessons: [
          {
            id: 'lesson-28-1',
            title: 'Performance Optimization Quick Reference',
            topics: [
              'React.memo - component memoization',
              'useMemo - value memoization',
              'useCallback - function memoization',
              'Code splitting - React.lazy',
              'Virtualization - react-window',
              'Debouncing and throttling',
              'Bundle optimization',
              'Profiling with DevTools'
            ],
            content: 'performance-cheatsheet'
          },
          {
            id: 'lesson-28-2',
            title: 'Common Performance Pitfalls',
            topics: [
              'Unnecessary re-renders',
              'Expensive computations',
              'Large component trees',
              'Memory leaks',
              'Bundle size issues',
              'Anti-patterns to avoid'
            ],
            content: 'performance-pitfalls-cheatsheet'
          }
        ]
      },
      {
        id: 'module-29',
        title: 'Module 29: Common Interview Questions',
        lessons: [
          {
            id: 'lesson-29-1',
            title: 'React Fundamentals Interview Questions',
            topics: [
              'What is React?',
              'JSX vs JavaScript',
              'Components vs Elements',
              'Props vs State',
              'Controlled vs Uncontrolled',
              'Keys in lists',
              'Synthetic events',
              'Virtual DOM explanation'
            ],
            content: 'fundamentals-interview-questions'
          },
          {
            id: 'lesson-29-2',
            title: 'Hooks Interview Questions',
            topics: [
              'Rules of hooks',
              'useState vs useReducer',
              'useEffect dependencies',
              'useCallback vs useMemo',
              'Custom hooks',
              'Hook lifecycle',
              'Hook optimization'
            ],
            content: 'hooks-interview-questions'
          },
          {
            id: 'lesson-29-3',
            title: 'Advanced React Interview Questions',
            topics: [
              'Error boundaries',
              'Higher-order components',
              'Render props pattern',
              'Compound components',
              'Context API vs Redux',
              'Server Components',
              'Concurrent features',
              'React 19 features'
            ],
            content: 'advanced-interview-questions'
          }
        ]
      },
      {
        id: 'module-30',
        title: 'Module 30: React Patterns Cheatsheet',
        lessons: [
          {
            id: 'lesson-30-1',
            title: 'Component Patterns Quick Reference',
            topics: [
              'Container/Presentational pattern',
              'Higher-Order Components (HOC)',
              'Render Props pattern',
              'Compound Components',
              'Controlled Components',
              'Uncontrolled Components',
              'Custom Hooks pattern'
            ],
            content: 'patterns-cheatsheet'
          }
        ]
      },
      {
        id: 'module-31',
        title: 'Module 31: State Management Cheatsheet',
        lessons: [
          {
            id: 'lesson-31-1',
            title: 'State Management Solutions Comparison',
            topics: [
              'useState - local state',
              'useReducer - complex state',
              'Context API - global state',
              'Redux Toolkit - predictable state',
              'Zustand - simple state',
              'Jotai - atomic state',
              'Recoil - Facebook state',
              'When to use each'
            ],
            content: 'state-management-comparison'
          }
        ]
      },
      {
        id: 'module-32',
        title: 'Module 32: Routing & Forms Cheatsheet',
        lessons: [
          {
            id: 'lesson-32-1',
            title: 'React Router Cheatsheet',
            topics: [
              'Router setup',
              'Route configuration',
              'Navigation hooks',
              'Nested routes',
              'Protected routes',
              'Route parameters',
              'Query strings',
              'Programmatic navigation'
            ],
            content: 'routing-cheatsheet'
          },
          {
            id: 'lesson-32-2',
            title: 'Form Handling Cheatsheet',
            topics: [
              'Controlled forms',
              'Uncontrolled forms',
              'Form validation',
              'React Hook Form',
              'Formik',
              'Form libraries comparison',
              'Best practices'
            ],
            content: 'forms-cheatsheet'
          }
        ]
      },
      {
        id: 'module-33',
        title: 'Module 33: Testing & TypeScript Cheatsheet',
        lessons: [
          {
            id: 'lesson-33-1',
            title: 'Testing Cheatsheet',
            topics: [
              'React Testing Library',
              'Jest basics',
              'Vitest setup',
              'Testing hooks',
              'Testing components',
              'E2E testing',
              'Test best practices',
              'Common testing patterns'
            ],
            content: 'testing-cheatsheet'
          },
          {
            id: 'lesson-33-2',
            title: 'TypeScript with React Cheatsheet',
            topics: [
              'Component types',
              'Props types',
              'Hook types',
              'Event types',
              'Generic components',
              'Utility types',
              'Type guards',
              'Common patterns'
            ],
            content: 'typescript-react-cheatsheet'
          }
        ]
      },
      {
        id: 'module-34',
        title: 'Module 34: React 18/19 Features Cheatsheet',
        lessons: [
          {
            id: 'lesson-34-1',
            title: 'React 18 Features Cheatsheet',
            topics: [
              'Concurrent rendering',
              'Automatic batching',
              'Transitions',
              'Suspense improvements',
              'useId hook',
              'useTransition',
              'useDeferredValue',
              'useSyncExternalStore'
            ],
            content: 'react18-features-cheatsheet'
          },
          {
            id: 'lesson-34-2',
            title: 'React 19 Features Cheatsheet',
            topics: [
              'React Compiler',
              'Actions & Form Handling',
              'useOptimistic hook',
              'Document Metadata',
              'Ref as Prop',
              'Context as Provider',
              'Async Components',
              'use() Hook',
              'Server Components (Stable)',
              'Improved Hydration',
              'Enhanced Suspense',
              'Asset Loading',
              'Web Components',
              'TypeScript Improvements'
            ],
            content: 'react19-features-cheatsheet'
          }
        ]
      },
      {
        id: 'module-35',
        title: 'Module 35: Best Practices & Common Mistakes',
        lessons: [
          {
            id: 'lesson-35-1',
            title: 'React Best Practices Cheatsheet',
            topics: [
              'Component design',
              'State management',
              'Performance optimization',
              'Code organization',
              'Naming conventions',
              'File structure',
              'Accessibility',
              'Security practices'
            ],
            content: 'best-practices-cheatsheet'
          },
          {
            id: 'lesson-35-2',
            title: 'Common Mistakes & Solutions',
            topics: [
              'Mutating state directly',
              'Missing keys in lists',
              'Infinite loops in useEffect',
              'Stale closures',
              'Memory leaks',
              'Unnecessary re-renders',
              'Anti-patterns',
              'How to fix them'
            ],
            content: 'common-mistakes-cheatsheet'
          }
        ]
      }
    ]
  }
];

// Helper function to get all lessons
export const getAllLessons = () => {
  return phases.flatMap(phase => 
    phase.modules.flatMap(module => 
      module.lessons.map(lesson => ({
        ...lesson,
        moduleId: module.id,
        moduleTitle: module.title,
        phaseId: phase.id,
        phaseTitle: phase.title
      }))
    )
  );
};

// Helper function to get lesson by ID
export const getLessonById = (lessonId) => {
  const allLessons = getAllLessons();
  return allLessons.find(lesson => lesson.id === lessonId);
};

// Helper function to get next/previous lesson
export const getNavigationLessons = (currentLessonId) => {
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
  
  return {
    previous: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  };
};

