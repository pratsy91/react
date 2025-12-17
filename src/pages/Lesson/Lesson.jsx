import { useParams, Link } from 'react-router-dom';
import { getLessonById, getNavigationLessons } from '../../data/lessons';
import LessonContent from '../../components/LessonContent/LessonContent';

function Lesson() {
  const { lessonId } = useParams();
  const lesson = getLessonById(lessonId);
  const { previous, next } = getNavigationLessons(lessonId);

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{lesson.phaseTitle}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{lesson.moduleTitle}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{lesson.title}</span>
      </nav>

      {/* Lesson Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            {lesson.phaseTitle}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
        <p className="text-gray-600">{lesson.moduleTitle}</p>
      </div>

      {/* Topics List */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Topics Covered</h2>
        <ul className="space-y-2">
          {lesson.topics.map((topic, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-3 mt-1">✓</span>
              <span className="text-gray-700">{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <LessonContent contentId={lesson.content} />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-6">
        {previous ? (
          <Link
            to={`/lesson/${previous.id}`}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <span className="mr-2">←</span>
            <div>
              <div className="text-xs text-gray-500">Previous</div>
              <div className="font-semibold">{previous.title}</div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        <Link
          to="/"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Home
        </Link>

        {next ? (
          <Link
            to={`/lesson/${next.id}`}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <div className="text-right mr-2">
              <div className="text-xs text-gray-500">Next</div>
              <div className="font-semibold">{next.title}</div>
            </div>
            <span>→</span>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Lesson;

