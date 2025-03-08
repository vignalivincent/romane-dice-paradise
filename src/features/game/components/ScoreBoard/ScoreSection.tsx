import { FC } from 'react';
import { Player } from '@/types/game';
import { ScoreCategoryUI } from '../../constants/categories';
import { CategoryCell } from './CategoryCell';
import { ScoreCell } from './ScoreCell';

interface ScoreSectionProps {
  categories: ScoreCategoryUI[];
  players: Player[];
  onSelect: (playerId: string, category: ScoreCategoryUI['id']) => void;
  focusedCategory: ScoreCategoryUI | null;
  onCategoryFocus: (category: ScoreCategoryUI) => void;
  isExpanded: boolean;
}

export const ScoreSection: FC<ScoreSectionProps> = ({ categories, players, onSelect, focusedCategory, onCategoryFocus, isExpanded }) => {
  const getCategoryTopOffset = (index: number) => {
    const cellHeight = 48; // h-12 in pixels
    const gap = 6; // space-y-1.5 in pixels
    return `${index * (cellHeight + gap)}px`;
  };

  return (
    <div className="relative">
      <div
        className="grid gap-x-2"
        style={{
          gridTemplateColumns: '44px minmax(0, 1fr)',
        }}>
        {/* Catégories */}
        <div className="space-y-1.5 relative">
          {categories.map((category, index) => (
            <div key={category.id} style={{ height: '48px' }}>
              <CategoryCell
                category={category}
                isExpanded={isExpanded}
                isFocused={!isExpanded && focusedCategory?.id === category.id}
                onFocus={onCategoryFocus}
                style={
                  !isExpanded && focusedCategory?.id === category.id
                    ? {
                        position: 'absolute',
                        top: getCategoryTopOffset(index),
                        left: 0,
                        right: 0,
                      }
                    : undefined
                }
              />
            </div>
          ))}
        </div>

        {/* Scores */}
        <div
          className="grid gap-x-1 w-full"
          style={{
            gridTemplateColumns: `repeat(${players.length}, 1fr)`,
          }}>
          {players.map((player) => (
            <div key={player.id} className="space-y-1.5 min-w-0">
              {categories.map((category) => (
                <ScoreCell key={category.id} player={player} category={category} onSelect={onSelect} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
