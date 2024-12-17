import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { allQuestions } from '../data/questions';
import { useQuizState } from '../hooks/useQuizState';
import { useQuizProgress } from '../hooks/useQuizProgress';
import {
  getAvailableQuestions,
  shuffleQuestions,
  calculateNextLevel,
  getQuestionsNeededForNextLevel,
} from '../utils/quiz';
import type { Question } from '../types/quiz';

interface QuizContextType {
  score: number;
  level: number;
  currentQuestion: Question | null;
  selectedAnswer: number | null;
  isAnswered: boolean;
  feedback: string;
  handleAnswerSelect: (index: number) => void;
  questionsNeeded: number;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const {
    currentQuestion,
    selectedAnswer,
    isAnswered,
    feedback,
    score,
    showingFeedback,
    updateQuestion,
    updateScore,
    setAnswer,
    clearFeedback,
  } = useQuizState();

  const {
    progress,
    updateProgress,
    advanceLevel,
    resetAnsweredQuestionsForLevel,
  } = useQuizProgress();

  const getNextQuestion = useCallback(() => {
    const availableQuestions = getAvailableQuestions(
      allQuestions,
      progress.currentLevel,
      progress.answeredQuestions
    );

    if (availableQuestions.length === 0) {
      resetAnsweredQuestionsForLevel();
      return shuffleQuestions(
        getAvailableQuestions(allQuestions, progress.currentLevel, new Set())
      )[0];
    }

    return shuffleQuestions(availableQuestions)[0];
  }, [progress.currentLevel, progress.answeredQuestions, resetAnsweredQuestionsForLevel]);

  useEffect(() => {
    if (!showingFeedback) {
      const nextQuestion = getNextQuestion();
      updateQuestion(nextQuestion);
    }
  }, [showingFeedback, getNextQuestion, updateQuestion]);

  const handleAnswerSelect = useCallback(
    (index: number) => {
      if (isAnswered || !currentQuestion || showingFeedback) return;

      const isCorrect = index === currentQuestion.correctAnswer;
      const points =
        progress.currentLevel === 'easy'
          ? 10
          : progress.currentLevel === 'medium'
          ? 20
          : 30;

      setAnswer(index, isCorrect, currentQuestion.answerChoices[currentQuestion.correctAnswer]);
      updateProgress(currentQuestion.id, isCorrect);

      if (isCorrect) {
        updateScore(points);
      }

      setTimeout(() => {
        const nextLevel = calculateNextLevel(progress);

        if (nextLevel !== progress.currentLevel) {
          advanceLevel(nextLevel);
        }

        clearFeedback();
      }, 2000); // Delay for feedback display
    },
    [
      currentQuestion,
      isAnswered,
      showingFeedback,
      progress,
      setAnswer,
      updateProgress,
      updateScore,
      advanceLevel,
      clearFeedback,
    ]
  );

  const questionsNeeded = getQuestionsNeededForNextLevel(progress);

  const value = {
    score,
    level:
      progress.currentLevel === 'easy' ? 1 : progress.currentLevel === 'medium' ? 2 : 3,
    currentQuestion,
    selectedAnswer,
    isAnswered,
    feedback,
    handleAnswerSelect,
    questionsNeeded,
  };

  return (
    <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
