import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface YahtzeeAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
}

export const YahtzeeAnimation: React.FC<YahtzeeAnimationProps> = ({ isActive, onComplete, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete, duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={500} recycle={false} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-5xl font-bold text-yellow-500 animate-bounce bg-black bg-opacity-30 p-6 rounded-xl">YAHTZEE!</div>
      </div>
    </div>
  );
};
