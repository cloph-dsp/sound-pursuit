import React, { useState, useEffect } from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import SettingsButton from './components/SettingsButton';
import SettingsMenu from './components/SettingsMenu';
import ScoreDisplay from './components/ScoreDisplay';
import { getAvailableQuestions } from './utils/quiz';
import { allQuestions } from './data/questions';
import { Question } from './types/quiz';

const QuizContent: React.FC = () => {
  const { 
    progress, 
    currentQuestion, 
    setCurrentQuestion, 
    selectedAnswer, 
    isAnswered, 
    feedback, 
    score,
    difficulty,
    handleAnswerSelect 
  } = useQuiz();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      const availableQuestions = getAvailableQuestions(
        allQuestions,
        difficulty,
        new Set(progress.answeredQuestions)
      );
      if (availableQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        setCurrentQuestion(availableQuestions[randomIndex]);
      }
    };

    fetchQuestion();
  }, [progress, setCurrentQuestion, difficulty]);

  return (
    <div className="container flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <SettingsButton onClick={() => setIsSettingsOpen(true)} />
      <ScoreDisplay 
        score={score} 
        difficulty={difficulty} 
        questionsNeeded={progress.questionsNeededForNextLevel}
      />
      <QuizCard
        currentQuestion={currentQuestion}
        selectedAnswer={selectedAnswer}
        handleAnswerSelect={handleAnswerSelect}
        isAnswered={isAnswered}
        feedback={feedback}
        score={score}
        difficulty={difficulty}
      />
      <SettingsMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QuizProvider>
      <Header />
      <QuizContent />
    </QuizProvider>
  );
};

export default App;
