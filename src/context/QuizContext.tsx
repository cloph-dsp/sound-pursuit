import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { getAvailableQuestions, QUESTIONS_TO_ADVANCE, shuffleQuestions, calculateNextLevel } from '../utils/quiz';
import { allQuestions } from '../data/questions';
import { Question, QuizState, QuizProgress } from '../types/quiz';

interface QuizContextProps {
  progress: QuizProgress;
  currentQuestion: Question | null;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
  selectedAnswer: number | null;
  isAnswered: boolean;
  feedback: string;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questionsNeeded: number;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  handleAnswerSelect: (answer: number) => void;
  handleAnswerClick: (answer: number) => void;
  handleNextQuestion: () => void;
  handleTimerEnd: () => void;
}

const QuizContext = createContext<QuizContextProps | null>(null);

const initialProgress: QuizProgress = {
  currentLevel: 'easy',
  correctAnswers: 0,
  answeredQuestions: [],
  questionsNeededForNextLevel: QUESTIONS_TO_ADVANCE,
};

const initialState: QuizState = {
  progress: initialProgress,
  currentQuestion: null,
  selectedAnswer: null,
  isAnswered: false,
  feedback: '',
  score: 0,
  timer: 30,
};

const FEEDBACK_DELAY = 2000; // 2 seconds delay before next question

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<QuizState>(initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prevState) => {
        if (prevState.timer > 0 && !prevState.isAnswered) {
          return { ...prevState, timer: prevState.timer - 1 };
        } else if (prevState.timer === 0 && !prevState.isAnswered) {
          handleTimerEnd();
          return prevState;
        }
        return prevState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!state.currentQuestion) {
      const initialQuestions = getAvailableQuestions(allQuestions, 'easy', new Set());
      if (initialQuestions.length > 0) {
        const firstQuestion = initialQuestions[Math.floor(Math.random() * initialQuestions.length)];
        setState((prevState) => ({ ...prevState, currentQuestion: firstQuestion, timer: 30 }));
      }
    }
  }, []);

  const handleAnswerSelect = (answer: number) => {
    if (!state.currentQuestion || state.isAnswered) return;
    
    const isCorrect = answer === state.currentQuestion.correctAnswer;
    const points = state.currentQuestion.difficulty === 'easy' ? 10 : 
                   state.currentQuestion.difficulty === 'medium' ? 20 : 30;
    const feedback = isCorrect 
      ? `Correct! +${points} points`
      : `Incorrect. The correct answer was: ${state.currentQuestion.answerChoices[state.currentQuestion.correctAnswer]}`;

    setState((prevState) => {
      const newCorrectAnswers = isCorrect ? prevState.progress.correctAnswers + 1 : prevState.progress.correctAnswers;
      const questionsNeeded = QUESTIONS_TO_ADVANCE - newCorrectAnswers;
      
      // Check if we should advance to next level
      let newLevel = prevState.progress.currentLevel;
      if (newCorrectAnswers >= QUESTIONS_TO_ADVANCE) {
        newLevel = calculateNextLevel(prevState.progress);
      }

      return {
        ...prevState,
        isAnswered: true,
        selectedAnswer: answer,
        feedback,
        score: isCorrect ? prevState.score + points : prevState.score,
        progress: {
          ...prevState.progress,
          currentLevel: newLevel,
          answeredQuestions: [...prevState.progress.answeredQuestions, prevState.currentQuestion!.id],
          correctAnswers: newLevel !== prevState.progress.currentLevel ? 0 : newCorrectAnswers,
          questionsNeededForNextLevel: questionsNeeded <= 0 ? QUESTIONS_TO_ADVANCE : questionsNeeded
        }
      };
    });

    setTimeout(() => handleNextQuestion(), FEEDBACK_DELAY);
  };

  const handleNextQuestion = () => {
    const nextQuestions = getAvailableQuestions(
      allQuestions,
      state.progress.currentLevel,
      new Set(state.progress.answeredQuestions)
    );

    if (nextQuestions.length > 0) {
      // Shuffle the questions
      const { shuffled: shuffledQuestions } = shuffleQuestions(nextQuestions, 0);
      const nextQuestion = shuffledQuestions[0];
      
      // Shuffle answer choices and track new correct answer position
      const { shuffled: shuffledAnswers, newCorrectIndex } = shuffleQuestions(
        nextQuestion.answerChoices,
        nextQuestion.correctAnswer
      );

      setState((prevState) => ({
        ...prevState,
        isAnswered: false,
        selectedAnswer: null,
        feedback: '',
        currentQuestion: {
          ...nextQuestion,
          answerChoices: shuffledAnswers,
          correctAnswer: newCorrectIndex
        },
        timer: 30,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        currentQuestion: null,
        feedback: 'Quiz completed! Great job!',
      }));
    }
  };

  const handleTimerEnd = useCallback(() => {
    if (!state.currentQuestion || state.isAnswered) return;
    
    // Mark as incorrect when time runs out
    handleAnswerSelect(-1);
    
    // Show feedback for incorrect answer
    setState((prevState) => ({
      ...prevState,
      feedback: `Time's up! The correct answer was: ${state.currentQuestion!.answerChoices[state.currentQuestion!.correctAnswer]}`,
    }));
    
    // Auto advance after delay
    setTimeout(() => {
      handleNextQuestion();
    }, FEEDBACK_DELAY);
  }, [state.currentQuestion, state.isAnswered, handleNextQuestion]);

  const handleAnswerClick = handleAnswerSelect;

  return (
    <QuizContext.Provider
      value={{
        ...state,
        setCurrentQuestion: (question) => setState((prevState) => ({ ...prevState, currentQuestion: question as Question | null })),
        handleAnswerSelect,
        handleAnswerClick,
        handleNextQuestion,
        handleTimerEnd,
        difficulty: state.progress.currentLevel,
        questionsNeeded: state.progress.questionsNeededForNextLevel,
        setTimer: (newTimer) => setState((prevState) => ({ ...prevState, timer: newTimer as number })),
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
