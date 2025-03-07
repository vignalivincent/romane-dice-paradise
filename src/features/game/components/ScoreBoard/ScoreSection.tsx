import { FC } from 'react';
import { Player } from '@/types/game';
import { ScoreCategoryUI } from '../../constants/categories';
import { CategoryCell } from './CategoryCell';
import { ScoreCell } from './ScoreCell';

interface ScoreSectionProps {
  categories: ScoreCategoryUI[];
  players: Player[];
  onSelect: (playerId: string, category: ScoreCategoryUI['id']) => void;
}

export const ScoreSection: FC<ScoreSectionProps> = ({ 
  categories, 
  players, 
  onSelect
}) => {
  const shouldCollapse = players.length > 4;

  return (
    <div className="grid gap-x-4 gap-y-1.5" style={{ gridTemplateColumns: `${shouldCollapse ? '60px' : '100px'} minmax(0, 1fr)` }}>
      {/* Catégories */}
      <div className="space-y-1.5">
        {categories.map((category) => (
          <CategoryCell
            key={category.id}
            category={category}
            shouldCollapse={shouldCollapse}
          />
        ))}
      </div>

      {/* Scores */}
      <div className="grid gap-x-1 w-full" style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
        {players.map((player) => (
          <div key={player.id} className="space-y-1.5 min-w-0">
            {categories.map((category) => (
              <ScoreCell
                key={category.id}
                player={player}
                category={category}
                onSelect={onSelect}
                shouldCollapse={shouldCollapse}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}; 