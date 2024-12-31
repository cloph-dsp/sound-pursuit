import React from 'react';
import ScoreDisplay from './ScoreDisplay';
import AnswerGrid from './AnswerGrid';
import { useQuizContext } from '../context/QuizContext';

const QuizCard: React.FC = () => {
  const quizContext = useQuizContext();

  if (!quizContext) {
    return <div>Loading...</div>;
  }

  const {
    currentQuestion,
    selectedAnswer,
    isAnswered,
    feedback,
    score,
    difficulty,
    progress,
    timer,
    handleAnswerClick,
    handleTimerEnd
  } = quizContext;

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <div className="mb-8">
        <ScoreDisplay
          score={score}
          difficulty={difficulty}
          questionsNeeded={progress.questionsNeededForNextLevel}
          timer={timer}
          onTimerEnd={handleTimerEnd}
        />
      </div>
      <h2 className="text-xl font-bold mb-4 dark:text-white">{currentQuestion.question}</h2>
      <AnswerGrid
        answers={currentQuestion.answerChoices}
        selectedAnswer={selectedAnswer}
        isAnswered={isAnswered}
        correctAnswer={currentQuestion.correctAnswer}
        onSelect={handleAnswerClick}
      />
      {isAnswered && (
        <div className="mt-4">
          <p className={`text-center ${feedback.includes('Correct') ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
            {feedback}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizCard;