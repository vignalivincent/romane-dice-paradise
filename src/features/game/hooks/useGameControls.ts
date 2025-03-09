import { useEffect } from 'react';
import { useGame } from '@/store/gameStore';

export const useGameControls = () => {
  const { hasEnded, gameHistory, doResetGame, doEndGame, isGameComplete } = useGame();

  useEffect(() => {
    if (isGameComplete && !hasEnded) {
      doEndGame();
    }
  }, [isGameComplete, hasEnded, doEndGame]);

  const handleEndGameClick = (openConfirmEndGameModal: () => void) => {
    if (hasEnded) {
      doResetGame();
      return;
    }
    openConfirmEndGameModal();
  };

  const handleEndGameConfirm = (closeConfirmEndGameModal: () => void) => {
    doEndGame();
    closeConfirmEndGameModal();
  };

  return {
    gameHistory,
    handleEndGameClick,
    handleEndGameConfirm,
  };
};
