import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (timer === 0) {
      onTimerEnd();
    }
  }, [timer, onTimerEnd]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <div className="mb-4 sm:mb-0">
        <p className="text-lg font-semibold">Score: {score}</p>
        <p className="text-sm">Next Level: {questionsNeeded} Qs</p>
      </div>
      <div className="text-center">
        <Timer timer={timer} onTimerEnd={onTimerEnd} />
        <p className="text-sm mt-2">Difficulty: {difficulty}</p>
      </div>
    </div>
  );
};

export default ScoreDisplay;
