import { Link } from 'react-router-dom';
import { phases } from '../../data/lessons';

function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Master React.js
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Complete React.js learning platform covering every concept, hook, API, and method
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to={`/lesson/${phases[0].modules[0].lessons[0].id}`}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Learning
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        {phases.map(phase => (
          <div key={phase.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {phase.title}
              </h2>
              <p className="text-gray-600">{phase.description}</p>
            </div>

            <div className="space-y-6">
              {phase.modules.map(module => (
                <div key={module.id} className="border-l-4 border-blue-500 pl-4">
                  <Link
                    to={`/lesson/${module.lessons[0].id}`}
                    className="text-xl font-semibold text-gray-800 mb-3 block hover:text-blue-600 transition-colors"
                  >
                    {module.title}
                  </Link>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {module.lessons.map(lesson => (
                      <Link
                        key={lesson.id}
                        to={`/lesson/${lesson.id}`}
                        className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-300 border-2 border-transparent transition-all"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {lesson.title}
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {lesson.topics.slice(0, 3).map((topic, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                          {lesson.topics.length > 3 && (
                            <li className="text-blue-600 font-medium">
                              +{lesson.topics.length - 3} more topics
                            </li>
                          )}
                        </ul>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

