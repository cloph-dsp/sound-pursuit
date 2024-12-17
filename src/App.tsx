import React from 'react';
import { QuizProvider } from './context/QuizContext';
import QuizApp from './components/QuizApp';

export default function App() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}
