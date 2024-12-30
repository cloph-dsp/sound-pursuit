import { useState, useCallback, useEffect } from 'react';
import type { Question } from '../types/quiz';
import { shuffleQuestions } from '../utils/quiz';

interface QuizState {
  currentQuestion: Question | null;
  selectedAnswer: number | null;
  isAnswered: boolean;
  feedback: string;
  score: number;
  showingFeedback: boolean;
  timer: number;
}

export function useQuizState() {
  const [state, setState] = useState<QuizState>({
    currentQuestion: null,
    selectedAnswer: null,
    isAnswered: false,
    feedback: '',
    score: 0,
    showingFeedback: false,
    timer: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({ ...prev, timer: prev.timer + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateQuestion = useCallback((question: Question | null) => {
    if (question) {
      const { shuffled, newCorrectIndex } = shuffleQuestions(
        question.answerChoices,
        question.correctAnswer
      );
      
      setState(prev => ({
        ...prev,
        currentQuestion: {
          ...question,
          answerChoices: shuffled,
          correctAnswer: newCorrectIndex // Update with new index
        },
        selectedAnswer: null,
        isAnswered: false,
        feedback: '',
        showingFeedback: false,
        timer: 0,
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentQuestion: null,
        selectedAnswer: null,
        isAnswered: false,
        feedback: '',
        showingFeedback: false,
        timer: 0,
      }));
    }
  }, []);

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
      showingFeedback: false,
    }));
  }, []);

  const handleAnswerSelect = useCallback((index: number, correctAnswerIndex: number, shuffledAnswers: string[]) => {
    const isCorrect = index === correctAnswerIndex;
    const correctAnswer = shuffledAnswers[correctAnswerIndex];
    setAnswer(index, isCorrect, correctAnswer);
  }, [setAnswer]);

  const handleTimerEnd = useCallback(() => {
    if (state.currentQuestion && !state.isAnswered) {
      const correctAnswerIndex = state.currentQuestion.correctAnswer;
      const correctAnswer = state.currentQuestion.answerChoices[correctAnswerIndex];
      setAnswer(-1, false, correctAnswer);
    }
  }, [state.currentQuestion, state.isAnswered, setAnswer]);

  return {
    ...state,
    updateQuestion,
    updateScore,
    setAnswer,
    clearFeedback,
    handleAnswerSelect,
    handleTimerEnd,
  };
}
