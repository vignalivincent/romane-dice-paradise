import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScoreCategory, SectionEnum } from '@/types/game';
import { ScoreModal } from '../ScoreModal';
import { VictoryModal } from '../VictoryModal';
import { RankingModal } from '../RankingModal';
import { ConfirmEndGameModal } from '../ConfirmEndGameModal';
import { PlayersHeader } from './PlayersHeader';
import { ScoreSection } from './ScoreSection';
import { TotalRow } from './TotalRow';
import { SCORE_CATEGORIES } from '../../constants/categories';
import { useYahtzeeAnimation } from '../../hooks/useYahtzeeAnimation';
import { YahtzeeAnimation } from '../YahtzeeAnimation';
import { useGame, usePlayers, useScore } from '@/store/gameStore';
import { calculateSectionTotal } from '@/store/utils';
import { useScoreBoardState } from '../../hooks/useScoreBoardState';
import { useScoreBoardModals } from '../../hooks/useScoreBoardModals';
import { useGameControls } from '../../hooks/useGameControls';

export const ScoreBoard: FC = () => {
  const { playAnimation, isAnimationActive, handleAnimationComplete, animationDuration } = useYahtzeeAnimation();
  const { hasStarted, hasEnded } = useGame();
  const { getUpperBonus } = useScore();
  const { players } = usePlayers();
  const { t } = useTranslation();

  const { selectedCell, setSelectedCell, focusedCategory, isExpanded, isBonusExpanded, handleCategoryFocus, handleToggleExpand, handleToggleBonusExpand } =
    useScoreBoardState();

  const { gameHistory, handleEndGameClick, handleEndGameConfirm } = useGameControls();

  const {
    scoreModalOpen,
    openScoreModal,
    closeScoreModal,
    confirmEndGameOpen,
    openConfirmEndGameModal,
    closeConfirmEndGameModal,
    rankingModalOpen,
    openRankingModal,
    closeRankingModal,
    isVictoryModalOpen,
    closeVictoryModal,
    handleNewGame,
  } = useScoreBoardModals();

  const handleCellClick = (playerId: string, category: ScoreCategory) => {
    if (!hasStarted) return;
    setSelectedCell({ playerId, category });
    openScoreModal();
  };

  if (!hasStarted || players.length === 0) return null;

  const upperCategories = SCORE_CATEGORIES.filter((cat) => cat.section === SectionEnum.upper && cat.id !== 'bonus');
  const lowerCategories = SCORE_CATEGORIES.filter((cat) => cat.section === SectionEnum.lower);

  const upperTotals = players.map((player) => calculateSectionTotal(player, SectionEnum.upper));
  const lowerTotals = players.map((player) => calculateSectionTotal(player, SectionEnum.lower));
  const bonusValue = players.map((player) => getUpperBonus(player));

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
            isGameEnded={hasEnded}
          />

          <TotalRow values={upperTotals} players={players.length} hideLabel />

          <div className="category-cell">
            <TotalRow
              values={bonusValue}
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
            isGameEnded={hasEnded}
          />

          <TotalRow values={lowerTotals} players={players.length} hideLabel />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => handleEndGameClick(openConfirmEndGameModal)}
          className={`flex-1 ${hasEnded ? 'bg-emerald-500/90 hover:bg-emerald-500' : 'bg-red-500/90 hover:bg-red-500'} 
            text-white font-semibold text-sm lg:text-base h-12 sm:h-14 rounded-lg 
            transition-all shadow-lg hover:shadow-xl flex items-center justify-center`}>
          {hasEnded ? `${t('game.actions.new')} 🎲` : `${t('game.actions.end')} 🏁`}
        </button>

        {gameHistory.length >= 1 && (
          <button
            onClick={openRankingModal}
            className="w-12 sm:w-14 bg-purple-500/90 hover:bg-purple-500 text-white font-semibold h-12 sm:h-14 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
            🏆
          </button>
        )}

        {selectedCell && (
          <ScoreModal
            isOpen={scoreModalOpen}
            onClose={closeScoreModal}
            onYahtzee={playAnimation}
            category={selectedCell ? SCORE_CATEGORIES.find((c) => c.id === selectedCell.category)! : SCORE_CATEGORIES[0]}
            player={players.find((p) => p.id === selectedCell!.playerId)!}
          />
        )}

        {hasEnded && <VictoryModal isOpen={isVictoryModalOpen} onClose={closeVictoryModal} onNewGame={handleNewGame} />}

        <RankingModal isOpen={rankingModalOpen} onClose={closeRankingModal} />

        <YahtzeeAnimation isActive={isAnimationActive} onComplete={handleAnimationComplete} duration={animationDuration} />

        <ConfirmEndGameModal isOpen={confirmEndGameOpen} onClose={closeConfirmEndGameModal} onConfirm={() => handleEndGameConfirm(closeConfirmEndGameModal)} />
      </div>
    </div>
  );
};
