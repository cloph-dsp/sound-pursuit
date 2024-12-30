import React, { useState } from 'react';
import { QuizProvider } from './context/QuizContext';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import SettingsButton from './components/SettingsButton';
import SettingsMenu from './components/SettingsMenu';

const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <QuizProvider>
      <Header />
      <QuizCard />
      <SettingsButton onClick={() => setIsSettingsOpen(true)} />
      <SettingsMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </QuizProvider>
  );
};

export default App;