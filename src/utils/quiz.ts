import { Question, QuizProgress } from '../types/quiz';

export const QUESTIONS_TO_ADVANCE: number = 30;

export function getAvailableQuestions(
  allQuestions: Question[],
  difficulty: 'easy' | 'medium' | 'hard',
  answeredQuestions: Set<number> // Ensure it's a Set
): Question[] {
  return allQuestions.filter(
    q => q.difficulty === difficulty && !answeredQuestions.has(q.id) // Use Set method
  );
}

export function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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
  return QUESTIONS_TO_ADVANCE - progress.correctAnswers;
}