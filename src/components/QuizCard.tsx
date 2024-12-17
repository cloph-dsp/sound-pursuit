import React, { useMemo } from 'react';
import type { Question } from '../types/quiz';
import ScoreDisplay from './ScoreDisplay';
import AnswerGrid from './AnswerGrid';

interface QuizCardProps {
  currentQuestion: Question;
  selectedAnswer: number | null;
  handleAnswerSelect: (index: number) => void;
  isAnswered: boolean;
  feedback: string;
  score: number;
  level: number;
}

export default function QuizCard({
  currentQuestion,
  selectedAnswer,
  handleAnswerSelect,
  isAnswered,
  feedback,
  score,
  level,
}: QuizCardProps) {
  // Randomize answers and maintain their original indices
  const shuffledAnswers = useMemo(() => {
    const answersWithIndex = currentQuestion.answerChoices.map((answer, index) => ({
      answer,
      originalIndex: index,
    }));

    // Shuffle the answers
    for (let i = answersWithIndex.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answersWithIndex[i], answersWithIndex[j]] = [answersWithIndex[j], answersWithIndex[i]];
    }

    return answersWithIndex;
  }, [currentQuestion]);

  // Find the shuffled index of the correct answer
  const shuffledCorrectIndex = useMemo(() => {
    return shuffledAnswers.findIndex(
      (item) => item.originalIndex === currentQuestion.correctAnswer
    );
  }, [shuffledAnswers, currentQuestion]);

  // Map the selected index back to the original index
  const handleSelect = (shuffledIndex: number) => {
    const originalIndex = shuffledAnswers[shuffledIndex].originalIndex;
    handleAnswerSelect(originalIndex); // Pass the original index to the parent logic
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
      <ScoreDisplay score={score} level={level} />

      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">
          {currentQuestion.question}
        </h2>
      </div>

      <AnswerGrid
        answers={shuffledAnswers.map((item) => item.answer)} // Shuffled answers
        selectedAnswer={
          selectedAnswer !== null
            ? shuffledAnswers.findIndex((item) => item.originalIndex === selectedAnswer)
            : null
        } // Map selected answer to shuffled index
        correctAnswer={shuffledCorrectIndex} // Shuffled correct index
        isAnswered={isAnswered}
        onSelect={handleSelect}
      />

      {feedback && (
        <div
          className={`mt-6 p-4 rounded-xl text-center font-medium ${
            feedback.includes('Correct')
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
}
