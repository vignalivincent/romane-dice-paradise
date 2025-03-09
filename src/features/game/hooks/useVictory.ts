import { useState, useEffect } from 'react';
import { useGame } from '../store/gameStore';

export function useVictory() {
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const { hasEnded, doResetGame } = useGame();

  useEffect(() => {
    if (hasEnded) {
      setIsVictoryModalOpen(true);
    }
  }, [hasEnded]);

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
