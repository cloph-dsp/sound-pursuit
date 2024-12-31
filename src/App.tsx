import React, { useState, useEffect } from 'react';
import { QuizProvider } from './context/QuizContext';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import SettingsButton from './components/SettingsButton';
import SettingsMenu from './components/SettingsMenu';

const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode && JSON.parse(savedMode)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <QuizProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto py-4">
          <Header />
          <QuizCard />
          <SettingsButton onClick={() => setIsSettingsOpen(true)} />
          <SettingsMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
      </div>
    </QuizProvider>
  );
};

export default App;