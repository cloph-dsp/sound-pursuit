import { useState, useCallback } from 'react';
import type { QuizProgress } from '../types/quiz';
import { QUESTIONS_TO_ADVANCE } from '../utils/quiz';

export function useQuizProgress() {
  const [progress, setProgress] = useState<QuizProgress>({
    answeredQuestions: new Set<number>(), // Initialize as a Set
    correctAnswers: 0,
    currentLevel: 'easy',
    questionsNeededForNextLevel: QUESTIONS_TO_ADVANCE,
  });

  const updateProgress = useCallback((questionId: number, isCorrect: boolean) => {
    setProgress((prev) => ({
      ...prev,
      answeredQuestions: new Set([...prev.answeredQuestions, questionId]), // Ensure it's a Set
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
    }));
  }, []);

  const advanceLevel = useCallback((newLevel: 'easy' | 'medium' | 'hard') => {
    setProgress((prev) => ({
      ...prev,
      currentLevel: newLevel,
      correctAnswers: 0,
      questionsNeededForNextLevel: QUESTIONS_TO_ADVANCE,
    }));
  }, []);

  const resetAnsweredQuestionsForLevel = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      answeredQuestions: new Set(),
    }));
  }, []);

  return {
    progress,
    updateProgress,
    advanceLevel,
    resetAnsweredQuestionsForLevel,
  };
}
