import React from 'react';

function RoutingCheatsheet() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">React Router Cheatsheet</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">React Router Quick Reference</h3>
        <p className="text-blue-800 mb-2">
          Essential React Router patterns and APIs for interviews.
        </p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Basic Setup</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded overflow-x-auto">{`// Router setup
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>

// Navigation
<Link to="/about">About</Link>
<NavLink to="/about" className={({isActive}) => ...}>
  About
</NavLink>

// Programmatic navigation
const navigate = useNavigate();
navigate('/about');`}</pre>
        </div>
      </section>
    </div>
  );
}

export default RoutingCheatsheet;

