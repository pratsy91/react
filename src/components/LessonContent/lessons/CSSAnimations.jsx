import { useState } from 'react';

function CSSAnimations() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">CSS Animations</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">CSS Transitions</h3>
        <p className="text-gray-700 mb-4">
          Use CSS transitions for simple property changes.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Basic transition
.transition {
  transition: property duration timing-function delay;
}

.example {
  transition: opacity 0.3s ease-in-out;
}

// Multiple properties
.multi {
  transition: opacity 0.3s, transform 0.3s;
}

// All properties
.all {
  transition: all 0.3s ease;
}

// Transition properties
.transition {
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0.1s;
}

// Timing functions
.ease { transition-timing-function: ease; }
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }
.linear { transition-timing-function: linear; }
.cubic-bezier { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }

// Hover transitions
.button {
  background-color: blue;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: red;
}

// Transform transitions
.card {
  transform: scale(1);
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.1);
}

// Opacity transitions
.fade {
  opacity: 1;
  transition: opacity 0.3s;
}

.fade.hidden {
  opacity: 0;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">CSS Animations</h3>
        <p className="text-gray-700 mb-4">
          Create keyframe animations for complex animations.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Keyframe animation
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.element {
  animation: slideIn 0.5s ease-in-out;
}

// Multiple keyframes
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

// Animation properties
.animated {
  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-delay: 0.1s;
  animation-iteration-count: 3;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

// Shorthand
.animated {
  animation: slideIn 0.5s ease-in-out 0.1s 3 normal forwards;
}

// Infinite animation
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Animation direction
.normal { animation-direction: normal; }
.reverse { animation-direction: reverse; }
.alternate { animation-direction: alternate; }
.alternate-reverse { animation-direction: alternate-reverse; }

// Animation fill mode
.none { animation-fill-mode: none; }
.forwards { animation-fill-mode: forwards; }
.backwards { animation-fill-mode: backwards; }
.both { animation-fill-mode: both; }

// Pause animation
.paused {
  animation-play-state: paused;
}

// Complex keyframe animation
@keyframes complex {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  50% {
    opacity: 0.5;
    transform: translateY(-10px) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Animation Patterns</h3>
        <p className="text-gray-700 mb-4">
          Common animation patterns and best practices.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Fade in
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}

// Slide in
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

// Scale in
@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

// Rotate
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Pulse
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

// Shake
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

// Stagger children (with CSS)
.parent {
  display: flex;
}

.child {
  animation: fadeIn 0.3s ease-in;
}

.child:nth-child(1) { animation-delay: 0.1s; }
.child:nth-child(2) { animation-delay: 0.2s; }
.child:nth-child(3) { animation-delay: 0.3s; }

// Reduced motion
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// Performance optimization
.will-change {
  will-change: transform, opacity;
}

.gpu-accelerated {
  transform: translateZ(0);
  /* or */
  transform: translate3d(0, 0, 0);
}

// React with CSS animations
function AnimatedComponent() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className={\`fade-in \${isVisible ? 'visible' : ''}\`}>
      Content
    </div>
  );
}

// CSS variables for dynamic animations
.element {
  --duration: 0.3s;
  --delay: 0.1s;
  transition: opacity var(--duration) ease var(--delay);
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default CSSAnimations;

