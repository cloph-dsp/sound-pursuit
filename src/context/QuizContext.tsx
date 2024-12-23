import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getAvailableQuestions, QUESTIONS_TO_ADVANCE } from '../utils/quiz';
import { allQuestions } from '../data/questions';
import { Question } from '../types/quiz';

interface Progress {
  currentLevel: number;
  answeredQuestions: number[];
  questionsNeededForNextLevel: number;
}

interface QuizContextProps {
  progress: Progress;
  currentQuestion: Question | null;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
  selectedAnswer: number | null;
  isAnswered: boolean;
  feedback: string;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
  handleAnswerSelect: (answer: number) => void;
}

const QuizContext = createContext<QuizContextProps | null>(null);

const initialProgress: Progress = {
  currentLevel: 1,
  answeredQuestions: [],
  questionsNeededForNextLevel: QUESTIONS_TO_ADVANCE,
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer: number) => {
    if (!currentQuestion || isAnswered) return;
  
    // 1. First mark as answered and store selection
    setIsAnswered(true);
    setSelectedAnswer(answer);
  
    // 2. Determine correctness and prepare feedback
    const isCorrect = answer === currentQuestion.correctAnswer;
    const points = currentQuestion.difficulty === 'easy' ? 10 : 
                   currentQuestion.difficulty === 'medium' ? 20 : 30;
    const feedback = isCorrect 
      ? `Correct! +${points} points`
      : `Incorrect. The correct answer was: ${currentQuestion.answerChoices[currentQuestion.correctAnswer]}`;
    
    // 3. Show feedback and update score
    setFeedback(feedback);
    if (isCorrect) {
      setScore(prevScore => prevScore + points);
    }
  
    // 4. Update progress
    const currentQuestionId = currentQuestion.id;
    setProgress(prevProgress => ({
      ...prevProgress,
      answeredQuestions: [...prevProgress.answeredQuestions, currentQuestionId]
    }));
  
    // 5. Wait for feedback display BEFORE preparing next question
    setTimeout(() => {
      const levelMap = { 1: 'easy', 2: 'medium', 3: 'hard' } as const;
      const nextQuestions = getAvailableQuestions(
        allQuestions,
        levelMap[progress.currentLevel as 1 | 2 | 3],
        new Set([...progress.answeredQuestions, currentQuestionId])
      );
  
      if (nextQuestions.length > 0) {
        const nextQuestion = nextQuestions[Math.floor(Math.random() * nextQuestions.length)];
        
        // 6. Reset states and move to next question
        setTimeout(() => {
          setIsAnswered(false);
          setSelectedAnswer(null);
          setFeedback('');
          setCurrentQuestion(nextQuestion);
        }, 500); // Small delay after feedback before resetting
      }
    }, 2000); // Show feedback for 2 seconds
  };

  return (
    <QuizContext.Provider
      value={{
        progress,
        currentQuestion,
        setCurrentQuestion,
        selectedAnswer,
        isAnswered,
        feedback,
        score,
        difficulty: { 1: 'easy', 2: 'medium', 3: 'hard' }[progress.currentLevel as 1 | 2 | 3] as 'easy' | 'medium' | 'hard',
        handleAnswerSelect,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
