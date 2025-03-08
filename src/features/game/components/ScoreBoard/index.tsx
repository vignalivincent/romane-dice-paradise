import { FC, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/gameStore';
import { useVictory } from '../../hooks/useVictory';
import { ScoreCategory } from '@/types/game';
import { ScoreModal } from '../ScoreModal';
import { VictoryModal } from '../VictoryModal';
import { RankingModal } from '../RankingModal';
import { ConfirmEndGameModal } from '../ConfirmEndGameModal';
import { PlayersHeader } from './PlayersHeader';
import { ScoreSection } from './ScoreSection';
import { TotalRow } from './TotalRow';
import { SCORE_CATEGORIES } from '../../constants/categories';
import { TOAST_MESSAGES } from '../../constants/toastMessages';
import { useToast } from '@/components/ui/use-toast';
import { ScoreCategoryUI } from '../../constants/categories';

export const ScoreBoard: FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const {
    players,
    isStarted,
    isGameEnded,
    gameHistory,
    hasGameHistory,
    updatePlayerScore,
    endGame,
    resetGame,
    calculateSectionTotal,
    getUpperBonus,
    getMaxScore,
  } = useGameStore();

  const [selectedCell, setSelectedCell] = useState<{
    playerId: string;
    category: ScoreCategory;
  } | null>(null);

  const [focusedCategory, setFocusedCategory] = useState<ScoreCategoryUI | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBonusExpanded, setIsBonusExpanded] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmEndGameOpen, setConfirmEndGameOpen] = useState(false);
  const [rankingModalOpen, setRankingModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.category-cell') && (focusedCategory || isBonusExpanded)) {
        setFocusedCategory(null);
        setIsBonusExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [focusedCategory, isBonusExpanded]);

  const isGameCompleteDirect = useGameStore((state) => state.isGameComplete());

  const { isVictoryModalOpen, winner, playersWithTotalScores, closeVictoryModal, handleNewGame } = useVictory({
    onReset: resetGame,
    isGameEnded,
  });

  const hasEndedGame = useRef(false);
  const prevGameComplete = useRef(isGameCompleteDirect);

  useEffect(() => {
    if (isGameCompleteDirect !== prevGameComplete.current) {
      prevGameComplete.current = isGameCompleteDirect;

      if (isGameCompleteDirect && !isGameEnded && !hasEndedGame.current) {
        hasEndedGame.current = true;
        setTimeout(() => {
          endGame();
        }, 0);
      } else if (!isGameCompleteDirect) {
        hasEndedGame.current = false;
      }
    }
  }, [isGameCompleteDirect, isGameEnded, endGame]);

  if (!isStarted || players.length === 0) return null;

  const handleCategoryFocus = (category: ScoreCategoryUI) => {
    if (isExpanded) return;
    setFocusedCategory(focusedCategory?.id === category.id ? null : category);
    setIsBonusExpanded(false);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    setFocusedCategory(null);
    setIsBonusExpanded(false);
  };

  const handleToggleBonusExpand = () => {
    if (isExpanded) return;
    setIsBonusExpanded(!isBonusExpanded);
    setFocusedCategory(null);
  };

  const handleCellClick = (playerId: string, category: ScoreCategory) => {
    if (isGameEnded) {
      toast({
        variant: TOAST_MESSAGES.gameEnded.variant,
        title: TOAST_MESSAGES.gameEnded.title,
        description: TOAST_MESSAGES.gameEnded.description,
      });
      return;
    }

    if (!isStarted) return;
    setSelectedCell({ playerId, category });
    setModalOpen(true);
  };

  const handleScoreSelect = (score: number) => {
    if (!selectedCell) return;
    const { playerId, category } = selectedCell;
    const player = players.find((p) => p.id === playerId);
    const maxScore = getMaxScore(category);

    updatePlayerScore(playerId, category, score);

    if (score === maxScore && player) {
      toast({
        variant: TOAST_MESSAGES.maxScore.variant,
        title: TOAST_MESSAGES.maxScore.title,
        description: TOAST_MESSAGES.maxScore.description(player.name),
        className: TOAST_MESSAGES.maxScore.className,
      });
    } else if (score === 0 && player) {
      toast({
        variant: TOAST_MESSAGES.zeroScore.variant,
        title: TOAST_MESSAGES.zeroScore.title,
        description: TOAST_MESSAGES.zeroScore.description(player.name),
        className: TOAST_MESSAGES.zeroScore.className,
      });
    }

    setModalOpen(false);
    setSelectedCell(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCell(null);
  };

  const handleEndGameClick = () => {
    if (isGameEnded) {
      resetGame();
      return;
    }

    setConfirmEndGameOpen(true);
  };

  const handleEndGameConfirm = () => {
    endGame();
    setConfirmEndGameOpen(false);
  };

  const upperCategories = SCORE_CATEGORIES.filter((cat) => cat.section === 'upper');
  const lowerCategories = SCORE_CATEGORIES.filter((cat) => cat.section === 'lower');

  const upperTotals = players.map((player) => calculateSectionTotal(player, 'upper'));
  const lowerTotals = players.map((player) => calculateSectionTotal(player, 'lower'));
  const bonusValues = players.map((player) => getUpperBonus(player));

  return (
    <div className="space-y-10">
      <div className="space-y-1.5">
        <PlayersHeader isExpanded={isExpanded} onToggleExpand={handleToggleExpand} />

        <div className="space-y-1.5">
          <ScoreSection
            categories={upperCategories}
            players={players}
            onSelect={handleCellClick}
            focusedCategory={focusedCategory}
            onCategoryFocus={handleCategoryFocus}
            isExpanded={isExpanded}
            isGameEnded={isGameEnded}
          />

          <TotalRow values={upperTotals} players={players.length} hideLabel />

          <div className="category-cell">
            <TotalRow
              values={bonusValues}
              players={players.length}
              className={(value) => (value > 0 ? 'bg-emerald-400/20 text-emerald-50' : 'bg-white/10 text-white/50')}
              isBonus
              isExpanded={isExpanded}
              isFocused={isBonusExpanded}
              onToggleExpand={handleToggleBonusExpand}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <ScoreSection
            categories={lowerCategories}
            players={players}
            onSelect={handleCellClick}
            focusedCategory={focusedCategory}
            onCategoryFocus={handleCategoryFocus}
            isExpanded={isExpanded}
            isGameEnded={isGameEnded}
          />

          <TotalRow values={lowerTotals} players={players.length} hideLabel />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleEndGameClick}
          className={`flex-1 ${isGameEnded ? 'bg-emerald-500/90 hover:bg-emerald-500' : 'bg-red-500/90 hover:bg-red-500'} 
            text-white font-semibold text-sm lg:text-base h-12 sm:h-14 rounded-lg 
            transition-all shadow-lg hover:shadow-xl flex items-center justify-center`}>
          {isGameEnded ? `${t('game.actions.new')} 🎲` : `${t('game.actions.end')} 🏁`}
        </button>

        {hasGameHistory() && (
          <button
            onClick={() => setRankingModalOpen(true)}
            className="w-12 sm:w-14 bg-purple-500/90 hover:bg-purple-500 text-white font-semibold h-12 sm:h-14 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
            🏆
          </button>
        )}

        <ScoreModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          onSelect={handleScoreSelect}
          category={selectedCell ? SCORE_CATEGORIES.find((c) => c.id === selectedCell.category)! : SCORE_CATEGORIES[0]}
          playerName={selectedCell ? players.find((p) => p.id === selectedCell.playerId)?.name || '' : ''}
        />

        {winner && (
          <VictoryModal isOpen={isVictoryModalOpen} onClose={closeVictoryModal} onNewGame={handleNewGame} winner={winner} players={playersWithTotalScores} />
        )}

        <RankingModal isOpen={rankingModalOpen} onClose={() => setRankingModalOpen(false)} gameHistory={gameHistory} currentPlayers={players} />

        <ConfirmEndGameModal isOpen={confirmEndGameOpen} onClose={() => setConfirmEndGameOpen(false)} onConfirm={handleEndGameConfirm} />
      </div>
    </div>
  );
};
