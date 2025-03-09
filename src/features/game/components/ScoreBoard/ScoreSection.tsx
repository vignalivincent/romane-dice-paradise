import { FC } from 'react';
import { Player, ScoreCategoryUI, SectionEnum } from '@/types/game';
import { CategoryCell } from './CategoryCell';
import { ScoreCell } from './ScoreCell';
import { cn } from '@/utils/cn';
import { getCellHeightStyle, getFocusedCategoryStyle, getGridTemplateColumns, getSectionSpacingClass } from './scoreUtils';

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
  const isLowerSection = categories.every((c) => c.section === SectionEnum.lower);
  const sectionSpacingClass = getSectionSpacingClass(isLowerSection);
  const gridTemplateColumns = getGridTemplateColumns(players.length);
  const cellHeightStyle = getCellHeightStyle();

  return (
    <div className="relative">
      <div
        className="grid gap-x-2"
        style={{
          gridTemplateColumns: gridTemplateColumns.main,
        }}>
        <div className={cn('relative', sectionSpacingClass)}>
          {categories.map((category, index) => (
            <div key={category.id} style={cellHeightStyle}>
              <CategoryCell
                category={category}
                isExpanded={isExpanded}
                isFocused={!isExpanded && focusedCategory?.id === category.id}
                onFocus={onCategoryFocus}
                style={!isExpanded && focusedCategory?.id === category.id ? getFocusedCategoryStyle(index, isLowerSection) : undefined}
              />
            </div>
          ))}
        </div>

        <div
          className="grid gap-x-1 w-full"
          style={{
            gridTemplateColumns: gridTemplateColumns.players,
          }}>
          {players.map((player) => (
            <div key={player.id} className={cn('min-w-0', sectionSpacingClass)}>
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
