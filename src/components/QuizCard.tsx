import React from 'react';
import ScoreDisplay from './ScoreDisplay';
import AnswerGrid from './AnswerGrid';
import { useQuizContext } from '../context/QuizContext';
import { motion } from 'framer-motion';

const QuizCard: React.FC = () => {
  const {
    currentQuestion,
    selectedAnswer,
    isAnswered,
    feedback,
    difficulty,
    progress,
    timer,
    handleAnswerClick,
    handleTimerEnd
  } = useQuizContext();

  if (!currentQuestion) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative backdrop-blur-md bg-white/5 dark:bg-gray-800/10
                 shadow-[0_4px_16px_0_rgba(31,38,135,0.25)] 
                 rounded-2xl p-8 max-w-4xl mx-auto border border-white/10"
    >
      <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br 
                    from-blue-500/5 to-purple-500/5 rounded-2xl -z-10" />
      
      <div className="pb-4">
        <ScoreDisplay
          difficulty={difficulty}
          questionsNeeded={progress.questionsNeededForNextLevel}
          timer={timer}
          onTimerEnd={handleTimerEnd}
        />
      </div>

      <motion.h2 
        key={currentQuestion.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold mb-6 bg-clip-text text-transparent 
                   bg-gradient-to-r from-blue-400 to-purple-500"
      >
        {currentQuestion.question}
      </motion.h2>

      <motion.div
        layout
        className="grid gap-4"
      >
        <AnswerGrid
          answers={currentQuestion.answerChoices}
          selectedAnswer={selectedAnswer}
          isAnswered={isAnswered}
          correctAnswer={currentQuestion.correctAnswer}
          onSelect={handleAnswerClick}
        />
      </motion.div>

      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <p className={`text-center text-lg font-medium
            ${feedback.includes('Correct') 
              ? 'text-emerald-400 dark:text-emerald-300' 
              : 'text-rose-400 dark:text-rose-300'}`}
          >
            {feedback}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizCard;