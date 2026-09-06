import { Link, useLocation } from 'react-router-dom';
import { phases } from '../../data/lessons';

function Navigation() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            React Mastery
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            
            <div className="relative group">
              <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                Lessons
              </button>
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-h-[70vh] overflow-y-auto">
                <div className="py-2">
                  {phases.map(phase => (
                    <div key={phase.id} className="px-4 py-2">
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {phase.title}
                      </div>
                      {phase.modules.map(module => (
                        <div key={module.id} className="ml-2">
                          <Link
                            to={`/lesson/${module.lessons[0].id}`}
                            className="text-xs font-medium text-gray-600 mb-1 block hover:text-blue-600"
                          >
                            {module.title}
                          </Link>
                          {module.lessons.map(lesson => (
                            <Link
                              key={lesson.id}
                              to={`/lesson/${lesson.id}`}
                              className="block text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-2 py-1 rounded"
                            >
                              {lesson.title}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

