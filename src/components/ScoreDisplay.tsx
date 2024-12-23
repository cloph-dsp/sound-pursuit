import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questionsNeeded: number;
}

export default function ScoreDisplay({ score, difficulty, questionsNeeded }: ScoreDisplayProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 w-full">
      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full dark:bg-gray-700">
        <Trophy className="w-5 h-5 text-blue-500 dark:text-gray-100" />
        <span className="text-blue-700 font-medium dark:text-gray-100">Score: {score}</span>
      </div>
      <div className="flex flex-col items-center mt-4 sm:mt-0">
        <div className="px-4 py-2 bg-blue-50 rounded-full dark:bg-gray-700">
          <span className="text-blue-700 font-medium dark:text-gray-100">Difficulty: {difficulty}</span>
        </div>
        {questionsNeeded > 0 && (
          <div className="px-4 py-2 bg-blue-50 rounded-full dark:bg-gray-700 mt-2">
            <span className="text-blue-700 font-medium dark:text-gray-100">
              {questionsNeeded} more to advance
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
