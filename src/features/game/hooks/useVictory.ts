import { useState, useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

interface UseVictoryProps {
  onReset: () => void;
  isGameEnded: boolean;
}

export const useVictory = ({ onReset, isGameEnded }: UseVictoryProps) => {
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const hasShownModal = useRef(false);

  const isGameComplete = useGameStore((state) => state.isGameComplete());
  const playersWithTotalScores = useGameStore((state) => state.getPlayersWithScores());
  const winner = useGameStore((state) => state.getWinner());

  useEffect(() => {
    if (isGameComplete && isGameEnded && !hasShownModal.current) {
      setIsVictoryModalOpen(true);
      hasShownModal.current = true;
    } else if (!isGameEnded) {
      hasShownModal.current = false;
    }
  }, [isGameComplete, isGameEnded]);

  const closeVictoryModal = useCallback(() => {
    setIsVictoryModalOpen(false);
  }, []);

  const handleNewGame = useCallback(() => {
    setIsVictoryModalOpen(false);
    onReset();
  }, [onReset]);

  return {
    isVictoryModalOpen,
    winner,
    playersWithTotalScores,
    closeVictoryModal,
    handleNewGame,
    isGameComplete,
  };
};
