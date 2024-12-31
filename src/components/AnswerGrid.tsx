import React from 'react';

interface AnswerGridProps {
  answers: string[];
  selectedAnswer: number | null;
  correctAnswer: number;
  isAnswered: boolean;
  onSelect: (index: number) => void;
}

const AnswerGrid: React.FC<AnswerGridProps> = ({ answers, selectedAnswer, correctAnswer, isAnswered, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {answers.map((answer, index) => {
        const isCorrect = isAnswered && index === correctAnswer;
        const isSelectedIncorrect = isAnswered && 
          index === selectedAnswer && 
          selectedAnswer !== correctAnswer;

        return (
          <button
            key={index}
            onClick={() => onSelect(index)}
            disabled={isAnswered}
            className={`p-4 rounded-lg text-left font-medium border ${
              isCorrect
                ? 'bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-100'
                : isSelectedIncorrect
                ? 'bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-100'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
};

export default AnswerGrid;
