import { useState, useCallback } from 'react';
import type { QuizProgress } from '../types/quiz';
import { QUESTIONS_TO_ADVANCE } from '../utils/quiz';

export function useQuizProgress() {
  const [progress, setProgress] = useState<QuizProgress>({
    answeredQuestions: [],
    correctAnswers: 0,
    currentLevel: 'easy',
    questionsNeededForNextLevel: QUESTIONS_TO_ADVANCE,
  });

  const updateProgress = useCallback((questionId: number, isCorrect: boolean) => {
    setProgress((prev) => {
      const newCorrectAnswers = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;
      const newQuestionsNeeded = QUESTIONS_TO_ADVANCE - newCorrectAnswers;

      return {
        ...prev,
        answeredQuestions: [...prev.answeredQuestions, questionId],
        correctAnswers: newCorrectAnswers,
        questionsNeededForNextLevel: newQuestionsNeeded,
      };
    });
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
      answeredQuestions: [],
    }));
  }, []);

  return {
    progress,
    updateProgress,
    advanceLevel,
    resetAnsweredQuestionsForLevel,
  };
}
