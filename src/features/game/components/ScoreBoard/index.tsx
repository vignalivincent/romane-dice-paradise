import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/gameStore';
import { useVictory } from '../../hooks/useVictory';
import { ScoreCategory } from '@/types/game';
import { ScoreModal } from '../ScoreModal';
import { VictoryModal } from '../VictoryModal';
import { ConfirmEndGameModal } from '../ConfirmEndGameModal';
import { PlayersHeader } from './PlayersHeader';
import { ScoreSection } from './ScoreSection';
import { TotalRow } from './TotalRow';
import { SCORE_CATEGORIES } from './types';

export const ScoreBoard: FC = () => {
  const { t } = useTranslation();
  const { 
    players, 
    isStarted, 
    updatePlayerScore,
    endGame,
    calculateSectionTotal,
    calculateTotal,
    getUpperBonus,
    getLeadingPlayer,
  } = useGameStore();

  const [selectedCell, setSelectedCell] = useState<{
    playerId: string;
    category: ScoreCategory;
  } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmEndGameOpen, setConfirmEndGameOpen] = useState(false);

  const {
    isVictoryModalOpen,
    winner,
    playersWithTotalScores,
    closeVictoryModal
  } = useVictory({
    players,
    onNewGame: endGame
  });

  if (!isStarted || players.length === 0) return null;

  const handleCellClick = (playerId: string, category: ScoreCategory) => {
    if (!isStarted) return;
    setSelectedCell({ playerId, category });
    setModalOpen(true);
  };

  const handleScoreSelect = (score: number) => {
    if (!selectedCell) return;
    updatePlayerScore(selectedCell.playerId, selectedCell.category, score);
    setModalOpen(false);
    setSelectedCell(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCell(null);
  };

  const handleEndGameClick = () => {
    setConfirmEndGameOpen(true);
  };

  const handleEndGameConfirm = () => {
    endGame();
    setConfirmEndGameOpen(false);
  };

  const leadingPlayer = getLeadingPlayer();
  const upperCategories = SCORE_CATEGORIES.filter(cat => cat.section === 'upper');
  const lowerCategories = SCORE_CATEGORIES.filter(cat => cat.section === 'lower');

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <PlayersHeader 
          players={players} 
          leadingPlayerId={leadingPlayer?.id} 
        />

        {/* Section supérieure */}
        <ScoreSection
          categories={upperCategories}
          players={players}
          onSelect={handleCellClick}
        />

        {/* Total section supérieure */}
        <TotalRow
          label="Total Supérieur"
          values={players.map(player => calculateSectionTotal(player, 'upper'))}
        />

        {/* Bonus section supérieure */}
        <TotalRow
          label="Bonus (≥ 62)"
          values={players.map(player => getUpperBonus(player))}
          className={(value) => value > 0 ? 'bg-emerald-400/20 text-emerald-50' : 'bg-white/10 text-white/50'}
        />

        {/* Section inférieure */}
        <ScoreSection
          categories={lowerCategories}
          players={players}
          onSelect={handleCellClick}
        />

        {/* Total section inférieure */}
        <TotalRow
          label="Total Inférieur"
          values={players.map(player => calculateSectionTotal(player, 'lower'))}
        />

        {/* Total général */}
        <TotalRow
          label="Total Général"
          values={players.map(player => calculateTotal(player))}
        />
      </div>

      {/* Bouton terminer la partie */}
      <button
        onClick={handleEndGameClick}
        className="w-full bg-red-500/90 hover:bg-red-500 text-white font-semibold text-base lg:text-lg h-12 sm:h-14 rounded-lg transition-all shadow-lg hover:shadow-xl"
      >
        {t('game.actions.end')} 🏁
      </button>

      <ScoreModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSelect={handleScoreSelect}
        category={selectedCell ? SCORE_CATEGORIES.find(c => c.id === selectedCell.category)! : SCORE_CATEGORIES[0]}
      />

      <VictoryModal
        isOpen={isVictoryModalOpen}
        onClose={closeVictoryModal}
        winner={winner!}
        players={playersWithTotalScores}
      />

      <ConfirmEndGameModal
        isOpen={confirmEndGameOpen}
        onClose={() => setConfirmEndGameOpen(false)}
        onConfirm={handleEndGameConfirm}
      />
    </div>
  );
}; 