import { useState, useCallback } from 'react';
import type { Question } from '../types/quiz';

interface QuizState {
  currentQuestion: Question | null;
  selectedAnswer: number | null;
  isAnswered: boolean;
  feedback: string;
  score: number;
  showingFeedback: boolean; // NEW: To control feedback display timing
}

export function useQuizState() {
  const [state, setState] = useState<QuizState>({
    currentQuestion: null,
    selectedAnswer: null,
    isAnswered: false,
    feedback: '',
    score: 0,
    showingFeedback: false, // NEW
  });

  const updateQuestion = useCallback((question: Question | null) => {
    setState({
      currentQuestion: question,
      selectedAnswer: null,
      isAnswered: false,
      feedback: '',
      score: state.score,
      showingFeedback: false, // Reset feedback state
    });
  }, [state.score]);

  const updateScore = useCallback((points: number) => {
    setState(prev => ({
      ...prev,
      score: prev.score + points,
    }));
  }, []);

  const setAnswer = useCallback((index: number, isCorrect: boolean, correctAnswer: string) => {
    setState(prev => ({
      ...prev,
      selectedAnswer: index,
      isAnswered: true,
      showingFeedback: true,
      feedback: isCorrect
        ? `Correct! +${prev.currentQuestion?.difficulty === 'easy' ? 10 : 
            prev.currentQuestion?.difficulty === 'medium' ? 20 : 30} points`
        : `Incorrect. The correct answer was: ${correctAnswer}`,
    }));
  }, []);

  const clearFeedback = useCallback(() => {
    setState(prev => ({
      ...prev,
      feedback: '',
      showingFeedback: false, // NEW: Reset feedback flag
    }));
  }, []);

  const handleAnswerSelect = (index: number, correctAnswerIndex: number, shuffledAnswers: string[]) => {
    const isCorrect = index === correctAnswerIndex;
    const correctAnswer = shuffledAnswers[correctAnswerIndex];
    setAnswer(index, isCorrect, correctAnswer);
  };

  return {
    ...state,
    updateQuestion,
    updateScore,
    setAnswer,
    clearFeedback,
    handleAnswerSelect,
  };
}
