import { Question, QuizProgress } from '../types/quiz';

export const QUESTIONS_TO_ADVANCE = 30;

export const getAvailableQuestions = (
  allQuestions: Question[],
  difficulty: 'easy' | 'medium' | 'hard',
  answeredQuestions: Set<number>
): Question[] => {
  return allQuestions.filter(
    (question) =>
      question.difficulty === difficulty && !answeredQuestions.has(question.id)
  );
};

export function shuffleQuestions<T>(array: T[], correctAnswer: number): { 
  shuffled: T[], 
  newCorrectIndex: number 
} {
  const shuffled = [...array];
  const correctItem = shuffled[correctAnswer];
  
  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Find new position of correct answer
  const newCorrectIndex = shuffled.findIndex(item => item === correctItem);
  
  return { shuffled, newCorrectIndex };
}

export function calculateNextLevel(progress: QuizProgress): 'easy' | 'medium' | 'hard' {
  if (
    progress.currentLevel === 'easy' &&
    progress.correctAnswers >= QUESTIONS_TO_ADVANCE
  ) {
    return 'medium';
  }

  if (
    progress.currentLevel === 'medium' &&
    progress.correctAnswers >= QUESTIONS_TO_ADVANCE
  ) {
    return 'hard';
  }

  return progress.currentLevel;
}

export function getQuestionsNeededForNextLevel(progress: QuizProgress): number {
  if (progress.currentLevel === 'hard') return 0;
  const remaining = QUESTIONS_TO_ADVANCE - progress.correctAnswers;
  return remaining > 0 ? remaining : 0;
}