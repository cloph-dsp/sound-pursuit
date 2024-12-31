import React from 'react';
import Timer from './Timer';

interface ScoreDisplayProps {
  score: number;
  difficulty: string;
  questionsNeeded: number;
  timer: number;
  onTimerEnd: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  difficulty,
  questionsNeeded,
  timer,
  onTimerEnd
}) => {
  return (
    <div className="flex justify-between items-center space-x-6">
      <div className="flex flex-col space-y-2">
        <div className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow-lg">
          <p className="text-sm font-semibold">Score: {score}</p>
        </div>
        <div className="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow-lg">
          <p className="text-xs">Next Level: {questionsNeeded} Qs</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow-lg">
          <Timer timer={timer} onTimerEnd={onTimerEnd} />
        </div>
        <div className="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow-lg">
          <p className="text-xs">Difficulty: {difficulty}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;