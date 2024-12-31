import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  answers: string[];
  selectedAnswer: number | null;
  isAnswered: boolean;
  correctAnswer: number;
  onSelect: (index: number) => void;
}

const AnswerGrid: React.FC<Props> = ({
  answers,
  selectedAnswer,
  isAnswered,
  correctAnswer,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {answers.map((answer, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => !isAnswered && onSelect(index)}
          className={`
            relative p-4 rounded-xl text-left transition-all duration-200
            backdrop-blur-md border 
            ${isAnswered
              ? index === correctAnswer
                ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-400'
                : index === selectedAnswer
                  ? 'border-rose-400/50 bg-rose-400/10 text-rose-400'
                  : 'border-white/10 bg-white/5 text-gray-400'
              : 'border-white/10 bg-white/5 hover:bg-white/10 text-white'}
          `}
        >
          <span className="relative z-10">{answer}</span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent" />
        </motion.button>
      ))}
    </div>
  );
};

export default AnswerGrid;
