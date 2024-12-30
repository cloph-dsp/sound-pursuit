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
                ? 'bg-green-100 border-green-500 text-green-800'
                : isSelectedIncorrect
                ? 'bg-red-100 border-red-500 text-red-800'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
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
