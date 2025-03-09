import { useState } from 'react';
import { useVictory } from './useVictory';

export const useScoreBoardModals = () => {
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [confirmEndGameOpen, setConfirmEndGameOpen] = useState(false);
  const [rankingModalOpen, setRankingModalOpen] = useState(false);

  const { isVictoryModalOpen, closeVictoryModal, handleNewGame } = useVictory();

  return {
    scoreModalOpen,
    openScoreModal: () => setScoreModalOpen(true),
    closeScoreModal: () => setScoreModalOpen(false),

    confirmEndGameOpen,
    openConfirmEndGameModal: () => setConfirmEndGameOpen(true),
    closeConfirmEndGameModal: () => setConfirmEndGameOpen(false),

    rankingModalOpen,
    openRankingModal: () => setRankingModalOpen(true),
    closeRankingModal: () => setRankingModalOpen(false),

    isVictoryModalOpen,
    closeVictoryModal,
    handleNewGame,
  };
};
