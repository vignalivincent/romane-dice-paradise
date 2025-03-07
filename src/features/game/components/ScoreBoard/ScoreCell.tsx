import { FC } from 'react';
import { useGameStore } from '../../store/gameStore';
import { ScoreCategoryUI } from './types';
import { Player } from '@/types/game';

interface ScoreCellProps {
  category: ScoreCategoryUI;
  player: Player;
  onSelect: (playerId: string, category: ScoreCategoryUI['id']) => void;
}

export const ScoreCell: FC<ScoreCellProps> = ({ category, player, onSelect }) => {
  const { getMaxScore, getScoreStyle } = useGameStore();
  const score = player.scores[category.id];
  const maxScore = getMaxScore(category.id);

  return (
    <button
      onClick={() => onSelect(player.id, category.id)}
      className={`w-full h-10 flex items-center justify-center font-bold text-lg rounded-lg transition-colors ${
        getScoreStyle(score, maxScore)
      } hover:bg-opacity-75 text-purple-900`}
    >
      {score ?? '-'}
    </button>
  );
}; 