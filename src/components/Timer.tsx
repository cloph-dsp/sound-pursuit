import React from 'react';

interface TimerProps {
  timer: number;
  onTimerEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ timer, onTimerEnd }) => {
  React.useEffect(() => {
    if (timer === 0) {
      onTimerEnd();
    }
  }, [timer, onTimerEnd]);

  return <div className="text-sm font-semibold">Time: {timer}s</div>;
};

export default Timer;