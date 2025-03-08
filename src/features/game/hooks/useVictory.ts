import { useState, useEffect, useRef } from 'react';
import { useGame } from '../store/gameStore';

export function useVictory() {
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const { hasEnded, getWinner, doResetGame } = useGame();
  const victoryShown = useRef(false);

  useEffect(() => {
    const winner = getWinner();
    if (hasEnded && winner && !victoryShown.current) {
      victoryShown.current = true;
      setIsVictoryModalOpen(true);
    } else if (!hasEnded) {
      victoryShown.current = false;
    }
  }, [hasEnded, getWinner]);

  const closeVictoryModal = () => {
    setIsVictoryModalOpen(false);
  };

  const handleNewGame = () => {
    doResetGame();
    setIsVictoryModalOpen(false);
  };

  return {
    isVictoryModalOpen,
    closeVictoryModal,
    handleNewGame,
  };
}
