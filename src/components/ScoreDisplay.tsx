import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScoreDisplayProps {
  difficulty: string;
  questionsNeeded: number;  // This now shows total required including penalties
  timer: number;
  onTimerEnd: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  difficulty,
  questionsNeeded,  // This now shows total required including penalties
  timer,
  onTimerEnd
}) => {
  useEffect(() => {
    if (timer === 0) {
      onTimerEnd();
    }
  }, [timer, onTimerEnd]);

  const timerProgress = (timer / 30) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center -mt-1">
          <span className="text-xl font-semibold text-gray-300 capitalize">
            Level: {difficulty}
          </span>
          <span className="text-sm text-gray-400">
            {questionsNeeded} more to advance  {/* Updated text for clarity */}
          </span>
        </div>
      </div>

      <div className="w-full">
        <div className="relative h-2 w-full bg-gray-700/30 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${timerProgress}%` }}
            transition={{ duration: 0.3 }}
            className={`absolute h-full rounded-full
              ${timerProgress > 50 
                ? 'bg-emerald-400' 
                : timerProgress > 20 
                  ? 'bg-yellow-400' 
                  : 'bg-rose-400'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;