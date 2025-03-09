import { FC } from 'react';
import { Player, ScoreCategoryUI } from '@/types/game';
import { CategoryCell } from './CategoryCell';
import { ScoreCell } from './ScoreCell';

interface ScoreSectionProps {
  categories: ScoreCategoryUI[];
  players: Player[];
  onSelect: (playerId: string, category: ScoreCategoryUI['id']) => void;
  focusedCategory: ScoreCategoryUI | null;
  onCategoryFocus: (category: ScoreCategoryUI) => void;
  isExpanded: boolean;
  isGameEnded?: boolean;
}

export const ScoreSection: FC<ScoreSectionProps> = ({ categories, players, onSelect, focusedCategory, onCategoryFocus, isExpanded, isGameEnded = false }) => {
  const getCategoryTopOffset = (index: number) => {
    const cellHeight = 48;
    const gap = 6;
    return `${index * (cellHeight + gap)}px`;
  };

  return (
    <div className="relative">
      <div
        className="grid gap-x-2"
        style={{
          gridTemplateColumns: '44px minmax(0, 1fr)',
        }}>
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

        <div
          className="grid gap-x-1 w-full"
          style={{
            gridTemplateColumns: `repeat(${players.length}, 1fr)`,
          }}>
          {players.map((player) => (
            <div key={player.id} className="space-y-1.5 min-w-0">
              {categories.map((category) => (
                <ScoreCell key={category.id} player={player} category={category} onSelect={onSelect} isGameEnded={isGameEnded} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
