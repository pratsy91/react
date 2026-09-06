const LEARNING_PHASE_PATTERN = /^phase-(?:[1-9]|1[0-5])$/;

export function isLearningPhase(phase) {
  return LEARNING_PHASE_PATTERN.test(phase.id);
}

export function buildInterviewQuestionsPhase(learningPhases) {
  return {
    id: 'phase-17',
    title: 'Phase 17: Most Asked Interview Questions',
    description:
      'Lesson-wise Q&A for every topic — React 19, Router 7, Vite 7. Junior to senior level.',
    modules: learningPhases.flatMap((phase) =>
      phase.modules.map((module) => ({
        id: `qa-${module.id}`,
        title: module.title,
        lessons: module.lessons.map((lesson) => ({
          id: `qa-${lesson.id}`,
          title: `${lesson.title} — Interview Q&A`,
          topics: [
            `Most asked interview questions on ${lesson.title}`,
            ...lesson.topics.slice(0, 6),
          ],
          content: `interview-qa-${lesson.content}`,
          sourcePhase: phase.title,
          sourceModule: module.title,
          sourceLesson: lesson.title,
        })),
      }))
    ),
  };
}
