import { interviewQA } from '../../../data/interviewQA';

function QuestionCard({ question, level }) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <p className="font-semibold">{question.q}</p>
        {level && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              level === 'Senior'
                ? 'bg-purple-100 text-purple-800'
                : level === 'Mid'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
            }`}
          >
            {level}
          </span>
        )}
      </div>
      <div className="mt-2 space-y-2 text-gray-700">
        {typeof question.a === 'string' ? (
          <p>
            <strong>A:</strong> {question.a}
          </p>
        ) : (
          question.a
        )}
        {question.points && (
          <ul className="list-disc list-inside space-y-1 ml-2">
            {question.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
      </div>
      {question.code && (
        <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm mt-3">
          {question.code}
        </pre>
      )}
    </div>
  );
}

function InterviewQALesson({ contentId }) {
  const data = interviewQA[contentId];

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Interview questions not found for this lesson.</p>
        <p className="text-sm text-gray-500 mt-2">Content ID: {contentId}</p>
      </div>
    );
  }

  const questionCount = data.sections.reduce((sum, s) => sum + s.questions.length, 0);

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.title}</h2>
        <p className="text-gray-700">{data.subtitle}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs bg-white px-2 py-1 rounded border border-blue-200 text-blue-800">
            React 19 · Router 7 · Vite 7
          </span>
          <span className="text-xs bg-white px-2 py-1 rounded border border-blue-200 text-blue-800">
            {data.level}
          </span>
          <span className="text-xs bg-white px-2 py-1 rounded border border-blue-200 text-blue-800">
            {questionCount} questions
          </span>
        </div>
      </div>

      {data.sections.map((section) => (
        <section key={section.title} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
          <div className="space-y-4">
            {section.questions.map((question) => (
              <QuestionCard
                key={question.q}
                question={question}
                level={question.level}
              />
            ))}
          </div>
        </section>
      ))}

      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <p className="font-semibold text-gray-900 mb-1">Interview Tip</p>
        <p className="text-gray-700 text-sm">{data.tip}</p>
      </div>
    </div>
  );
}

export default InterviewQALesson;
