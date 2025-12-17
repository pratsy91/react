import { useState, createContext, useContext } from 'react';

// Compound Component Pattern - Implicit State Sharing
const ToggleContext = createContext();

function Toggle({ children, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

function ToggleOn({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
}

function ToggleOff({ children }) {
  const { on } = useContext(ToggleContext);
  return !on ? children : null;
}

function ToggleButton() {
  const { on, toggle } = useContext(ToggleContext);
  return (
    <button
      onClick={toggle}
      className={`px-4 py-2 rounded ${
        on ? 'bg-green-500' : 'bg-gray-300'
      } text-white`}
    >
      {on ? 'ON' : 'OFF'}
    </button>
  );
}

// Compound Component with Flexible API
const AccordionContext = createContext();

function Accordion({ children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div className="border rounded">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionHeader({ children }) {
  const { toggle } = useContext(AccordionContext);
  return (
    <button
      onClick={toggle}
      className="w-full p-4 text-left bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
    >
      {children}
      <span className="text-xl">▼</span>
    </button>
  );
}

function AccordionContent({ children }) {
  const { isOpen } = useContext(AccordionContext);
  return isOpen ? <div className="p-4">{children}</div> : null;
}

function CompoundComponents() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Compound Components</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Implicit State Sharing</h3>
        <p className="text-gray-700 mb-4">
          Compound components share state implicitly through context, allowing flexible composition.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-4">
            <Toggle defaultOn={false}>
              <div className="space-y-2">
                <ToggleOn>
                  <p className="text-green-600 font-semibold">The toggle is ON</p>
                </ToggleOn>
                <ToggleOff>
                  <p className="text-gray-600">The toggle is OFF</p>
                </ToggleOff>
                <ToggleButton />
              </div>
            </Toggle>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`<Toggle>
  <ToggleOn>ON content</ToggleOn>
  <ToggleOff>OFF content</ToggleOff>
  <ToggleButton />
</Toggle>

// All components share state through context`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Context in Compound Components</h3>
        <p className="text-gray-700 mb-4">
          Use React Context to share state between compound component parts.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <Accordion defaultOpen={false}>
            <AccordionHeader>
              Click to expand/collapse
            </AccordionHeader>
            <AccordionContent>
              <p className="text-gray-700">
                This content is shown/hidden based on the accordion state.
                The state is shared through context between AccordionHeader and AccordionContent.
              </p>
            </AccordionContent>
          </Accordion>
          <pre className="text-sm bg-white p-2 rounded mt-4">{`const Context = createContext();

function Parent({ children }) {
  const [state, setState] = useState();
  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  );
}

function Child() {
  const { state } = useContext(Context);
  return <div>{state}</div>;
}`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Flexible Component APIs</h3>
        <p className="text-gray-700 mb-4">
          Compound components allow users to compose components in any order they want.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4 mb-4">
            <div>
              <p className="text-sm font-semibold mb-2">Example 1: Standard order</p>
              <Toggle>
                <ToggleButton />
                <ToggleOn>Visible when ON</ToggleOn>
                <ToggleOff>Visible when OFF</ToggleOff>
              </Toggle>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Example 2: Different order</p>
              <Toggle>
                <ToggleOn>ON first</ToggleOn>
                <ToggleOff>OFF second</ToggleOff>
                <ToggleButton />
              </Toggle>
            </div>
          </div>
          <pre className="text-sm bg-white p-2 rounded">{`// Flexible - any order works!
<Toggle>
  <ToggleButton />
  <ToggleOn>Content</ToggleOn>
</Toggle>

// Or
<Toggle>
  <ToggleOn>Content</ToggleOn>
  <ToggleButton />
</Toggle>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Benefits of Compound Components</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
            <li><strong>Flexibility:</strong> Users can compose components in any order</li>
            <li><strong>Separation of concerns:</strong> Each part handles its own rendering</li>
            <li><strong>Reusability:</strong> Components can be used independently or together</li>
            <li><strong>Better API:</strong> More intuitive than passing many props</li>
            <li><strong>Implicit state:</strong> State is shared automatically through context</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Real-World Examples</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">Common libraries using compound components:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
            <li>React Router: <code className="bg-gray-200 px-1 rounded">&lt;Route&gt;</code> components</li>
            <li>Reach UI: <code className="bg-gray-200 px-1 rounded">&lt;Menu&gt;</code>, <code className="bg-gray-200 px-1 rounded">&lt;Dialog&gt;</code></li>
            <li>Material-UI: <code className="bg-gray-200 px-1 rounded">&lt;Select&gt;</code> components</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CompoundComponents;

