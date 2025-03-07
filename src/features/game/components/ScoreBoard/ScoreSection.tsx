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
    <div className="grid gap-x-4 gap-y-1.5" style={{ gridTemplateColumns: `${shouldCollapse ? '100px' : '160px'} minmax(0, 1fr)` }}>
      {/* Colonne des catégories */}
      <div className="space-y-1.5">
        {categories.map(category => (
          <div key={category.id}>
            <CategoryCell 
              category={category} 
              shouldCollapse={shouldCollapse}
            />
          </div>
        ))}
      </div>

      {/* Grille des scores */}
      <div className="space-y-1.5">
        {categories.map(category => (
          <div key={category.id} className="grid gap-x-1" style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
            {players.map(player => (
              <div key={`${category.id}-${player.id}`}>
                <ScoreCell
                  category={category}
                  player={player}
                  onSelect={onSelect}
                  shouldCollapse={shouldCollapse}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}; 