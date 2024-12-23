import React, { useState, useEffect } from 'react';

interface QuizCardProps {
  currentQuestion: Question | null;
  selectedAnswer: number | null;
  handleAnswerSelect: (answer: number) => void;
  isAnswered: boolean;
  feedback: string;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const QuizCard: React.FC<QuizCardProps> = ({
  currentQuestion,
  selectedAnswer,
  handleAnswerSelect,
  isAnswered,
  feedback,
  score,
  difficulty,
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);

  useEffect(() => {
    if (currentQuestion) {
      const answers = [...currentQuestion.answerChoices];
      const correctIndex = currentQuestion.correctAnswer;
      const correctAnswer = answers.splice(correctIndex, 1)[0];
      const shuffled = [...answers].sort(() => Math.random() - 0.5);
      const newCorrectIndex = Math.floor(Math.random() * (shuffled.length + 1));
      shuffled.splice(newCorrectIndex, 0, correctAnswer);
      setShuffledAnswers(shuffled);
      setCorrectAnswerIndex(newCorrectIndex);
    }
  }, [currentQuestion]);

  if (!currentQuestion) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <p className="text-center text-gray-600">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 dark:text-gray-100">{currentQuestion.question}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={isAnswered}
            className={`p-4 rounded-lg text-left font-medium border ${
              isAnswered && index === correctAnswerIndex
                ? 'bg-green-100 border-green-500 text-green-800'
                : isAnswered && index === selectedAnswer
                ? 'bg-red-100 border-red-500 text-red-800'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'
            }`}
          >
            {answer}
          </button>
        ))}
      </div>
      {isAnswered && <div className="feedback mt-4 text-sm dark:text-gray-100">{feedback}</div>}
    </div>
  );
};

export default QuizCard;