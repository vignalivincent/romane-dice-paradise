import { useGame } from '@/store/gameStore';
import { useState, useEffect } from 'react';

export function useVictory() {
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const { hasEnded, doResetGame } = useGame();

  // Reset the modal state when hasEnded changes to false
  useEffect(() => {
    if (hasEnded) {
      setIsVictoryModalOpen(true);
    } else {
      setIsVictoryModalOpen(false);
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
