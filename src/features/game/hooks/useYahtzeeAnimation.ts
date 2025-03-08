import { useState, useCallback } from 'react';

export function useYahtzeeAnimation() {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const stopAnimation = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return { isPlaying, playAnimation, stopAnimation };
}
