import { FC } from 'react';
import { Player } from '@/types/game';
import { ScoreCategoryUI } from './types';
import { CategoryCell } from './CategoryCell';
import { ScoreCell } from './ScoreCell';

interface ScoreSectionProps {
  categories: ScoreCategoryUI[];
  players: Player[];
  onSelect: (playerId: string, category: ScoreCategoryUI['id']) => void;
}

export const ScoreSection: FC<ScoreSectionProps> = ({ categories, players, onSelect }) => (
  <div className="grid gap-1.5" style={{ gridTemplateColumns: `160px minmax(0, 1fr)` }}>
    {/* Colonne des catégories */}
    <div className="space-y-1.5">
      {categories.map(category => (
        <div key={category.id}>
          <CategoryCell category={category} />
        </div>
      ))}
    </div>

    {/* Grille des scores */}
    <div className="space-y-1.5">
      {categories.map(category => (
        <div key={category.id} className="grid" style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
          {players.map(player => (
            <div key={`${category.id}-${player.id}`} className="px-0.5">
              <ScoreCell
                category={category}
                player={player}
                onSelect={onSelect}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
); 