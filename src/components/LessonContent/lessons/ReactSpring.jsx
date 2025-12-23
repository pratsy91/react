import { useState } from 'react';

function ReactSpring() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React Spring</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding React Spring</h3>
        <p className="text-blue-800 mb-2">
          React Spring is a spring-physics based animation library for React. Unlike traditional animation libraries that use 
          easing functions, React Spring uses physics-based animations that feel more natural and organic. It's declarative, 
          performant, and provides hooks for creating smooth animations.
        </p>
        <div className="text-blue-800 space-y-2">
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Spring Physics:</strong> Natural, physics-based animations</li>
            <li><strong>Declarative API:</strong> Define animations declaratively with hooks</li>
            <li><strong>Interpolation:</strong> Animate between values smoothly</li>
            <li><strong>Performance:</strong> Uses requestAnimationFrame and GPU acceleration</li>
            <li><strong>Hooks API:</strong> useSpring, useSprings, useTrail, useTransition</li>
            <li><strong>Gesture Support:</strong> Works with react-use-gesture</li>
          </ul>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Natural, organic-feeling animations</li>
            <li>High performance with GPU acceleration</li>
            <li>Declarative and easy to use</li>
            <li>Interpolates between any values</li>
            <li>Works with React and React Native</li>
            <li>Small bundle size</li>
          </ul>
          <p className="mt-2"><strong>When to Use React Spring:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>When you want physics-based, natural animations</li>
            <li>For complex animation sequences</li>
            <li>When you need to interpolate between values</li>
            <li>For gesture-based animations</li>
            <li>When performance is critical</li>
          </ul>
        </div>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Springs and Physics</h3>
        <p className="text-gray-700 mb-4">
          React Spring uses spring physics for natural animations.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install @react-spring/web

// Basic spring
import { useSpring, animated } from '@react-spring/web';

function FadeIn() {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 200, friction: 20 }
  });
  
  return <animated.div style={props}>Hello</animated.div>;
}

// Spring configuration
const config = {
  tension: 200,      // Spring tension (stiffness)
  friction: 20,      // Spring friction (damping)
  mass: 1,           // Mass of the spring
  precision: 0.01,    // Precision threshold
  velocity: 0,        // Initial velocity
  clamp: false       // Clamp values
};

// Preset configurations
import { config } from '@react-spring/core';

// config.default - Default spring
// config.gentle - Gentle spring
// config.wobbly - Wobbly spring
// config.stiff - Stiff spring
// config.slow - Slow spring
// config.molasses - Very slow spring

useSpring({
  from: { x: 0 },
  to: { x: 100 },
  config: config.wobbly
});

// Multiple properties
const props = useSpring({
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0px)' }
});

// Conditional animations
const props = useSpring({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'scale(1)' : 'scale(0.8)'
});

// Immediate animations
const props = useSpring({
  opacity: 1,
  immediate: true  // No animation
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Transitions</h3>
        <p className="text-gray-700 mb-4">
          Create smooth transitions between states.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// useTransition for lists
import { useTransition, animated } from '@react-spring/web';

function List({ items }) {
  const transitions = useTransition(items, {
    from: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -20 },
    config: { tension: 200, friction: 20 }
  });
  
  return transitions((style, item) => (
    <animated.div style={style}>
      {item.name}
    </animated.div>
  ));
}

// Trail animation
import { useTrail, animated } from '@react-spring/web';

function Trail({ items }) {
  const trail = useTrail(items.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    config: { tension: 200, friction: 20 }
  });
  
  return trail.map((props, index) => (
    <animated.div key={index} style={props}>
      {items[index]}
    </animated.div>
  ));
}

// Chain animations
const props = useSpring({
  from: { x: 0 },
  to: [
    { x: 100 },
    { y: 100 },
    { x: 0, y: 0 }
  ],
  config: { tension: 200, friction: 20 }
});

// Delay
const props = useSpring({
  from: { opacity: 0 },
  to: { opacity: 1 },
  delay: 500
});

// Loop animations
const props = useSpring({
  from: { rotate: 0 },
  to: { rotate: 360 },
  loop: true,
  config: { duration: 2000 }
});

// Reverse animations
const props = useSpring({
  from: { x: 0 },
  to: { x: 100 },
  reverse: true
});`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">All Hooks</h3>
        <p className="text-gray-700 mb-4">
          React Spring provides multiple hooks for different use cases.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// useSpring - Single value animation
import { useSpring, animated } from '@react-spring/web';

function Component() {
  const props = useSpring({ opacity: 1 });
  return <animated.div style={props}>Content</animated.div>;
}

// useSprings - Multiple independent springs
import { useSprings, animated } from '@react-spring/web';

function Items({ items }) {
  const springs = useSprings(
    items.length,
    items.map(item => ({ opacity: 1, transform: 'scale(1)' }))
  );
  
  return springs.map((props, i) => (
    <animated.div key={i} style={props}>
      {items[i]}
    </animated.div>
  ));
}

// useTransition - List transitions
import { useTransition, animated } from '@react-spring/web';

function List({ items }) {
  const transitions = useTransition(items, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  
  return transitions((style, item) => (
    <animated.div style={style}>{item}</animated.div>
  ));
}

// useTrail - Sequential animations
import { useTrail, animated } from '@react-spring/web';

function Trail({ items }) {
  const trail = useTrail(items.length, {
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  
  return trail.map((props, i) => (
    <animated.div key={i} style={props}>
      {items[i]}
    </animated.div>
  ));
}

// useChain - Chain multiple animations
import { useChain, useSpring, useSpringRef } from '@react-spring/web';

function Chained() {
  const spring1 = useSpringRef();
  const spring2 = useSpringRef();
  
  const props1 = useSpring({
    ref: spring1,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  
  const props2 = useSpring({
    ref: spring2,
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' }
  });
  
  useChain([spring1, spring2]);
  
  return (
    <>
      <animated.div style={props1}>First</animated.div>
      <animated.div style={props2}>Second</animated.div>
    </>
  );
}

// useSpringValue - Manual control
import { useSpringValue, animated } from '@react-spring/web';

function Manual() {
  const opacity = useSpringValue(0);
  
  return (
    <>
      <animated.div style={{ opacity }}>Content</animated.div>
      <button onClick={() => opacity.start(1)}>Show</button>
    </>
  );
}

// useScroll - Scroll-based animations
import { useScroll, animated, useSpring } from '@react-spring/web';

function ScrollAnimation() {
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(scrollYProgress, {
    from: { value: 0 },
    to: { value: 1 }
  });
  
  return <animated.div style={{ opacity }}>Content</animated.div>;
}

// useGesture - Gesture support
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

function Draggable() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => api.start({ x, y })
  });
  
  return <animated.div {...bind()} style={{ x, y }}>Drag me</animated.div>;
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default ReactSpring;

