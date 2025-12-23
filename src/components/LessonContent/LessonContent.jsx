import SetupEnvironment from './lessons/SetupEnvironment';
import JSXDeepDive from './lessons/JSXDeepDive';
import Components from './lessons/Components';
import StateManagement from './lessons/StateManagement';
import EventHandling from './lessons/EventHandling';
import UseEffectHook from './lessons/UseEffectHook';
import ComponentLifecycle from './lessons/ComponentLifecycle';
import UseRefHook from './lessons/UseRefHook';
import UseContextHook from './lessons/UseContextHook';
import UseReducerHook from './lessons/UseReducerHook';
import UseCallbackHook from './lessons/UseCallbackHook';
import UseMemoHook from './lessons/UseMemoHook';
import UseLayoutEffectHook from './lessons/UseLayoutEffectHook';
import UseDebugValueHook from './lessons/UseDebugValueHook';
import UseIdHook from './lessons/UseIdHook';
import UseTransitionHook from './lessons/UseTransitionHook';
import UseDeferredValueHook from './lessons/UseDeferredValueHook';
import UseSyncExternalStoreInsertionEffectHook from './lessons/UseSyncExternalStoreInsertionEffectHook';
import ReactMemo from './lessons/ReactMemo';
import CodeSplitting from './lessons/CodeSplitting';
import PerformancePatterns from './lessons/PerformancePatterns';
import CompoundComponents from './lessons/CompoundComponents';
import RenderProps from './lessons/RenderProps';
import HigherOrderComponents from './lessons/HigherOrderComponents';
import CustomHooks from './lessons/CustomHooks';
import ControlledUncontrolledComponents from './lessons/ControlledUncontrolledComponents';
import Portal from './lessons/Portal';
import ErrorBoundaries from './lessons/ErrorBoundaries';
import ErrorHandlingPatterns from './lessons/ErrorHandlingPatterns';
import ConcurrentRendering from './lessons/ConcurrentRendering';
import Suspense from './lessons/Suspense';
import ServerComponents from './lessons/ServerComponents';
import Transitions from './lessons/Transitions';
import RouterSetup from './lessons/RouterSetup';
import RouterComponentsHooks from './lessons/RouterComponentsHooks';
import AdvancedRouting from './lessons/AdvancedRouting';
import ControlledForms from './lessons/ControlledForms';
import FormLibraries from './lessons/FormLibraries';
import UncontrolledForms from './lessons/UncontrolledForms';
import AdvancedContextPatterns from './lessons/AdvancedContextPatterns';
import ReduxToolkit from './lessons/ReduxToolkit';
import Zustand from './lessons/Zustand';
import Jotai from './lessons/Jotai';
import Recoil from './lessons/Recoil';
import NativeFetch from './lessons/NativeFetch';
import ReactQuery from './lessons/ReactQuery';
import SWR from './lessons/SWR';
import AxiosIntegration from './lessons/AxiosIntegration';
import CSSModules from './lessons/CSSModules';
import StyledComponents from './lessons/StyledComponents';
import Emotion from './lessons/Emotion';
import TailwindCSS from './lessons/TailwindCSS';
import CSSInJSPatterns from './lessons/CSSInJSPatterns';
import ComponentLibraries from './lessons/ComponentLibraries';
import ReactTestingLibrary from './lessons/ReactTestingLibrary';
import Vitest from './lessons/Vitest';
import Jest from './lessons/Jest';
import E2ETesting from './lessons/E2ETesting';
import TypeDefinitions from './lessons/TypeDefinitions';
import AdvancedTypeScript from './lessons/AdvancedTypeScript';
import BuildConfiguration from './lessons/BuildConfiguration';
import Deployment from './lessons/Deployment';
import FramerMotion from './lessons/FramerMotion';
import ReactSpring from './lessons/ReactSpring';
import CSSAnimations from './lessons/CSSAnimations';
import ARIA from './lessons/ARIA';
import AccessibilityTools from './lessons/AccessibilityTools';
import ReactI18next from './lessons/ReactI18next';
import SecurityBestPractices from './lessons/SecurityBestPractices';
import MicroFrontends from './lessons/MicroFrontends';
import PWA from './lessons/PWA';
import WebSockets from './lessons/WebSockets';
import ServerSentEvents from './lessons/ServerSentEvents';
import ReactDevTools from './lessons/ReactDevTools';
import BrowserDevTools from './lessons/BrowserDevTools';
import ReactCompiler from './lessons/ReactCompiler';
import ActionsFormHandling from './lessons/ActionsFormHandling';
import UseOptimisticHook from './lessons/UseOptimisticHook';
import DocumentMetadata from './lessons/DocumentMetadata';
import RefAsProp from './lessons/RefAsProp';
import ContextAsProvider from './lessons/ContextAsProvider';
import AsyncComponents from './lessons/AsyncComponents';
import UseHook from './lessons/UseHook';
import ServerComponentsStable from './lessons/ServerComponentsStable';
import ImprovedHydration from './lessons/ImprovedHydration';
import EnhancedSuspense from './lessons/EnhancedSuspense';
import AssetLoading from './lessons/AssetLoading';
import WebComponents from './lessons/WebComponents';
import TypeScriptImprovements from './lessons/TypeScriptImprovements';
import ConcurrentFeatures from './lessons/ConcurrentFeatures';
import ErrorBoundariesEnhancements from './lessons/ErrorBoundariesEnhancements';
import ReactFundamentalsCheatsheet from './lessons/ReactFundamentalsCheatsheet';
import VirtualDomCheatsheet from './lessons/VirtualDomCheatsheet';
import HooksCheatsheet from './lessons/HooksCheatsheet';
import CustomHooksCheatsheet from './lessons/CustomHooksCheatsheet';
import PerformanceCheatsheet from './lessons/PerformanceCheatsheet';
import PerformancePitfallsCheatsheet from './lessons/PerformancePitfallsCheatsheet';
import FundamentalsInterviewQuestions from './lessons/FundamentalsInterviewQuestions';
import HooksInterviewQuestions from './lessons/HooksInterviewQuestions';

// Debug: Verify import
if (typeof HooksInterviewQuestions === 'undefined') {
  console.error('HooksInterviewQuestions import failed!');
}
import AdvancedInterviewQuestions from './lessons/AdvancedInterviewQuestions';
import PatternsCheatsheet from './lessons/PatternsCheatsheet';
import StateManagementComparison from './lessons/StateManagementComparison';
import RoutingCheatsheet from './lessons/RoutingCheatsheet';
import FormsCheatsheet from './lessons/FormsCheatsheet';
import TestingCheatsheet from './lessons/TestingCheatsheet';
import TypeScriptReactCheatsheet from './lessons/TypeScriptReactCheatsheet';
import React18FeaturesCheatsheet from './lessons/React18FeaturesCheatsheet';
import React19FeaturesCheatsheet from './lessons/React19FeaturesCheatsheet';
import BestPracticesCheatsheet from './lessons/BestPracticesCheatsheet';
import CommonMistakesCheatsheet from './lessons/CommonMistakesCheatsheet';

const contentComponents = {
  'setup-environment': SetupEnvironment,
  'jsx-deep-dive': JSXDeepDive,
  'components': Components,
  'state-management-usestate': StateManagement,
  'event-handling': EventHandling,
  'useeffect-hook': UseEffectHook,
  'component-lifecycle': ComponentLifecycle,
  'useref-hook': UseRefHook,
  'usecontext-hook': UseContextHook,
  'usereducer-hook': UseReducerHook,
  'usecallback-hook': UseCallbackHook,
  'usememo-hook': UseMemoHook,
  'uselayouteffect-hook': UseLayoutEffectHook,
  'usedebugvalue-hook': UseDebugValueHook,
  'useid-hook': UseIdHook,
  'usetransition-hook': UseTransitionHook,
  'usedeferredvalue-hook': UseDeferredValueHook,
  'usesyncexternalstore-insertioneffect-hook': UseSyncExternalStoreInsertionEffectHook,
  'react-memo': ReactMemo,
  'code-splitting': CodeSplitting,
  'performance-patterns': PerformancePatterns,
  'compound-components': CompoundComponents,
  'render-props': RenderProps,
  'higher-order-components': HigherOrderComponents,
  'custom-hooks': CustomHooks,
  'controlled-uncontrolled-components': ControlledUncontrolledComponents,
  'portal': Portal,
  'error-boundaries': ErrorBoundaries,
  'error-handling-patterns': ErrorHandlingPatterns,
  'concurrent-rendering': ConcurrentRendering,
  'suspense': Suspense,
  'server-components': ServerComponents,
  'transitions': Transitions,
  'router-setup': RouterSetup,
  'router-components-hooks': RouterComponentsHooks,
  'advanced-routing': AdvancedRouting,
  'controlled-forms': ControlledForms,
  'form-libraries': FormLibraries,
  'uncontrolled-forms': UncontrolledForms,
  'advanced-context-patterns': AdvancedContextPatterns,
  'redux-toolkit': ReduxToolkit,
  'zustand': Zustand,
  'jotai': Jotai,
  'recoil': Recoil,
  'native-fetch': NativeFetch,
  'react-query': ReactQuery,
  'swr': SWR,
  'axios-integration': AxiosIntegration,
  'css-modules': CSSModules,
  'styled-components': StyledComponents,
  'emotion': Emotion,
  'tailwind-css': TailwindCSS,
  'css-in-js-patterns': CSSInJSPatterns,
  'component-libraries': ComponentLibraries,
  'react-testing-library': ReactTestingLibrary,
  'vitest': Vitest,
  'jest': Jest,
  'e2e-testing': E2ETesting,
  'type-definitions': TypeDefinitions,
  'advanced-typescript': AdvancedTypeScript,
  'build-configuration': BuildConfiguration,
  'deployment': Deployment,
  'framer-motion': FramerMotion,
  'react-spring': ReactSpring,
  'css-animations': CSSAnimations,
  'aria': ARIA,
  'accessibility-tools': AccessibilityTools,
  'react-i18next': ReactI18next,
  'security-best-practices': SecurityBestPractices,
  'micro-frontends': MicroFrontends,
  'pwa': PWA,
  'websockets': WebSockets,
  'server-sent-events': ServerSentEvents,
  'react-devtools': ReactDevTools,
  'browser-devtools': BrowserDevTools,
  'react-compiler': ReactCompiler,
  'actions-form-handling': ActionsFormHandling,
  'useoptimistic-hook': UseOptimisticHook,
  'document-metadata': DocumentMetadata,
  'ref-as-prop': RefAsProp,
  'context-as-provider': ContextAsProvider,
  'async-components': AsyncComponents,
  'use-hook': UseHook,
  'server-components-stable': ServerComponentsStable,
  'improved-hydration': ImprovedHydration,
  'enhanced-suspense': EnhancedSuspense,
  'asset-loading': AssetLoading,
  'web-components': WebComponents,
  'typescript-improvements': TypeScriptImprovements,
  'concurrent-features': ConcurrentFeatures,
  'error-boundaries-enhancements': ErrorBoundariesEnhancements,
  // Phase 16: Interview Cheatsheets
  'react-fundamentals-cheatsheet': ReactFundamentalsCheatsheet,
  'virtual-dom-cheatsheet': VirtualDomCheatsheet,
  'hooks-cheatsheet': HooksCheatsheet,
  'custom-hooks-cheatsheet': CustomHooksCheatsheet,
  'performance-cheatsheet': PerformanceCheatsheet,
  'performance-pitfalls-cheatsheet': PerformancePitfallsCheatsheet,
  'fundamentals-interview-questions': FundamentalsInterviewQuestions,
  'hooks-interview-questions': HooksInterviewQuestions, // Debug: Verify this is defined
  'advanced-interview-questions': AdvancedInterviewQuestions,
  'patterns-cheatsheet': PatternsCheatsheet,
  'state-management-comparison': StateManagementComparison,
  'routing-cheatsheet': RoutingCheatsheet,
  'forms-cheatsheet': FormsCheatsheet,
  'testing-cheatsheet': TestingCheatsheet,
  'typescript-react-cheatsheet': TypeScriptReactCheatsheet,
  'react18-features-cheatsheet': React18FeaturesCheatsheet,
  'react19-features-cheatsheet': React19FeaturesCheatsheet,
  'best-practices-cheatsheet': BestPracticesCheatsheet,
  'common-mistakes-cheatsheet': CommonMistakesCheatsheet,
};

function LessonContent({ contentId }) {
  // Debug log for hooks-interview-questions specifically
  if (contentId === 'hooks-interview-questions') {
    console.log('Looking up hooks-interview-questions');
    console.log('HooksInterviewQuestions import:', typeof HooksInterviewQuestions);
    console.log('In contentComponents:', typeof contentComponents['hooks-interview-questions']);
  }
  
  const ContentComponent = contentComponents[contentId];

  if (!ContentComponent) {
    console.warn(`Content component not found for contentId: "${contentId}"`);
    console.log('Available contentIds:', Object.keys(contentComponents));
    console.log('Looking for:', contentId);
    console.log('Type of ContentComponent:', typeof ContentComponent);
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Content coming soon...</p>
        <p className="text-sm text-gray-500 mt-2">Content ID: {contentId}</p>
        <p className="text-xs text-gray-400 mt-1">Check console for debugging info</p>
      </div>
    );
  }

  // Additional check for component validity
  if (typeof ContentComponent !== 'function') {
    console.error(`ContentComponent for "${contentId}" is not a function:`, ContentComponent);
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: Component is not a valid function</p>
        <p className="text-sm text-gray-500 mt-2">Content ID: {contentId}</p>
      </div>
    );
  }

  try {
    return <ContentComponent />;
  } catch (error) {
    console.error(`Error rendering component for "${contentId}":`, error);
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error rendering component</p>
        <p className="text-sm text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }
}

export default LessonContent;
