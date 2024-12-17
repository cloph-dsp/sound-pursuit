import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  level: number;
  questionsNeeded?: number;
}

export default function ScoreDisplay({ score, level, questionsNeeded }: ScoreDisplayProps) {
  return (
    <div className="flex justify-between items-center mb-8 w-full">
      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
        <Trophy className="w-5 h-5 text-blue-500" />
        <span className="text-blue-700 font-medium">Score: {score}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 bg-blue-50 rounded-full">
          <span className="text-blue-700 font-medium">Level {level}</span>
        </div>
        {questionsNeeded > 0 && (
          <div className="px-4 py-2 bg-blue-50/50 rounded-full">
            <span className="text-blue-600/80 font-medium">
              {questionsNeeded} more to advance
            </span>
          </div>
        )}
      </div>
    </div>
  );
}