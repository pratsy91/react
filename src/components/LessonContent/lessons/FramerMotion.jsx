import { useState } from 'react';

function FramerMotion() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Framer Motion</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Complete API Coverage</h3>
        <p className="text-gray-700 mb-4">
          Framer Motion is a production-ready motion library for React.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install framer-motion

// Basic motion component
import { motion } from 'framer-motion';

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello
    </motion.div>
  );
}

// All motion components
import { 
  motion,
  AnimatePresence,
  MotionConfig,
  Reorder,
  LayoutGroup
} from 'framer-motion';

// Motion components for all HTML elements
<motion.div />
<motion.span />
<motion.button />
<motion.h1 />
<motion.svg />
<motion.path />
// ... and all other HTML elements

// Animation props
<motion.div
  initial={{ opacity: 0 }}        // Initial state
  animate={{ opacity: 1 }}        // Animate to
  exit={{ opacity: 0 }}           // Exit animation
  whileHover={{ scale: 1.1 }}    // Hover state
  whileTap={{ scale: 0.9 }}       // Tap/click state
  whileFocus={{ scale: 1.05 }}    // Focus state
  whileInView={{ opacity: 1 }}   // When in viewport
  transition={{ duration: 0.3 }}   // Transition config
/>

// Transform properties
<motion.div
  animate={{
    x: 100,           // Translate X
    y: 50,            // Translate Y
    scale: 1.5,       // Scale
    rotate: 45,       // Rotate (degrees)
    opacity: 0.5       // Opacity
  }}
/>

// Color animations
<motion.div
  animate={{
    backgroundColor: '#ff0000',
    color: '#ffffff'
  }}
/>

// Layout animations
<motion.div layout>
  {/* Automatically animates layout changes */}
</motion.div>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Variants and Animations</h3>
        <p className="text-gray-700 mb-4">
          Use variants to organize and reuse animations.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

function List() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.li variants={itemVariants}>Item 1</motion.li>
      <motion.li variants={itemVariants}>Item 2</motion.li>
      <motion.li variants={itemVariants}>Item 3</motion.li>
    </motion.ul>
  );
}

// Conditional variants
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -100 }
};

function Menu({ isOpen }) {
  return (
    <motion.div
      variants={variants}
      animate={isOpen ? 'open' : 'closed'}
    >
      Menu
    </motion.div>
  );
}

// Variant propagation
const parentVariants = {
  open: {
    transition: { staggerChildren: 0.1 }
  }
};

const childVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -20 }
};

// Custom transition per variant
const variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.3 }
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2 }
  }
};

// Animation controls
import { useAnimation } from 'framer-motion';

function ControlledAnimation() {
  const controls = useAnimation();
  
  return (
    <>
      <motion.div animate={controls} />
      <button onClick={() => controls.start({ x: 100 })}>
        Animate
      </button>
    </>
  );
}

// Sequence animations
controls.start([
  { x: 100, transition: { duration: 0.5 } },
  { y: 100, transition: { duration: 0.5 } },
  { x: 0, y: 0, transition: { duration: 0.5 } }
]);`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Gestures</h3>
        <p className="text-gray-700 mb-4">
          Add gesture support to your components.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Drag
<motion.div
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  dragElastic={0.2}
  onDragEnd={(event, info) => {
    console.log('Drag ended', info.point);
  }}
/>

// Drag directions
<motion.div
  drag="x"        // Only horizontal
  drag="y"        // Only vertical
  drag={true}     // All directions
/>

// Drag with snap
<motion.div
  drag="x"
  dragSnapToOrigin
  dragMomentum={false}
/>

// While dragging
<motion.div
  drag
  whileDrag={{ scale: 1.1, rotate: 5 }}
/>

// Pan gestures
<motion.div
  onPan={(event, info) => {
    console.log('Panning', info.point);
  }}
  onPanStart={(event, info) => {
    console.log('Pan started');
  }}
  onPanEnd={(event, info) => {
    console.log('Pan ended');
  }}
/>

// Pinch gestures
<motion.div
  onPinch={(event, info) => {
    console.log('Pinching', info.scale);
  }}
/>

// Hover gestures
<motion.div
  whileHover={{ scale: 1.1 }}
  onHoverStart={() => console.log('Hover started')}
  onHoverEnd={() => console.log('Hover ended')}
/>

// Tap gestures
<motion.div
  whileTap={{ scale: 0.9 }}
  onTap={(event, info) => {
    console.log('Tapped', info.point);
  }}
/>

// Focus gestures
<motion.input
  whileFocus={{ scale: 1.05 }}
  onFocus={() => console.log('Focused')}
/>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Layout Animations</h3>
        <p className="text-gray-700 mb-4">
          Animate layout changes automatically.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Layout animation
<motion.div layout>
  {/* Automatically animates position/size changes */}
</motion.div>

// Layout ID for shared layout animations
<motion.div layoutId="shared">
  {/* Animates between components with same layoutId */}
</motion.div>

// Layout group
import { LayoutGroup } from 'framer-motion';

<LayoutGroup>
  <motion.div layoutId="item-1" />
  <motion.div layoutId="item-2" />
</LayoutGroup>

// Shared layout animation
function Modal({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          layoutId="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Content
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Layout animation with spring
<motion.div
  layout
  transition={{
    layout: { type: 'spring', stiffness: 300, damping: 30 }
  }}
/>

// AnimatePresence for exit animations
import { AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  {items.map(item => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {item.name}
    </motion.div>
  ))}
</AnimatePresence>

// Reorder component
import { Reorder } from 'framer-motion';

function SortableList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  
  return (
    <Reorder.Group values={items} onReorder={setItems}>
      {items.map(item => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Scroll Animations</h3>
        <p className="text-gray-700 mb-4">
          Animate elements based on scroll position.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm bg-white p-2 rounded">{`// Scroll-triggered animations
import { useScroll, useTransform, useSpring } from 'framer-motion';

function ScrollAnimation() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  return <motion.div style={{ opacity }}>Content</motion.div>;
}

// Scroll into view
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
>
  Content
</motion.div>

// Scroll progress
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'blue',
        transformOrigin: '0%'
      }}
    />
  );
}

// Parallax scroll
function Parallax() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  
  return <motion.div style={{ y }}>Parallax content</motion.div>;
}

// Scroll-linked animations
function ScrollLinked() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  return <motion.div style={{ rotate }}>Rotating</motion.div>;
}

// Intersection observer
const { ref, inView } = useInView({
  threshold: 0.5
});

<motion.div
  ref={ref}
  animate={inView ? 'visible' : 'hidden'}
  variants={variants}
/>`}</pre>
        </div>
      </section>
    </div>
  );
}

export default FramerMotion;

