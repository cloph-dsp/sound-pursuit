import React from 'react';
import { useQuiz } from '../context/QuizContext';
import QuizCard from './QuizCard';
import Header from './Header';

export default function QuizApp() {
  const quizState = useQuiz();

  if (!quizState.currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center p-8">
      {/* Header */}
      <Header />

      {/* Main Quiz Card */}
      <div className="w-full max-w-3xl">
        <QuizCard {...quizState} />
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-blue-200/30 dark:bg-blue-400/20 blur-2xl rounded-full animate-pulse delay-200"></div>
      </div>
    </div>
  );
}
