import { FC } from 'react';
import { useGameStore } from '../../store/gameStore';
import { ScoreCategoryUI } from '../../constants/categories';
import { Player } from '@/types/game';

interface ScoreCellProps {
  category: ScoreCategoryUI;
  player: Player;
  onSelect: (playerId: string, category: ScoreCategoryUI['id']) => void;
  shouldCollapse?: boolean;
}

export const ScoreCell: FC<ScoreCellProps> = ({ 
  category, 
  player, 
  onSelect,
  shouldCollapse = false 
}) => {
  const { getMaxScore, getScoreStyle } = useGameStore();
  const score = player.scores[category.id];
  const maxScore = getMaxScore(category.id);

  return (
    <button
      onClick={() => onSelect(player.id, category.id)}
      className={`
        w-full font-bold rounded-lg transition-colors flex items-center justify-center
        ${shouldCollapse ? 'h-10 text-base' : 'h-12 text-lg'}
        ${getScoreStyle(score, maxScore)}
        hover:bg-opacity-75 text-purple-900
      `}
    >
      {score ?? '-'}
    </button>
  );
}; 