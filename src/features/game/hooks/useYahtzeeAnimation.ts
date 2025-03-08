import { useState, useCallback } from 'react';

export function useYahtzeeAnimation(duration = 3000) {
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  const playAnimation = useCallback(() => {
    console.log('Triggering Yahtzee animation!');
    setIsAnimationActive(true);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    console.log('Animation completed');
    setIsAnimationActive(false);
  }, []);

  return {
    isAnimationActive,
    playAnimation,
    handleAnimationComplete,
    animationDuration: duration,
  };
}
