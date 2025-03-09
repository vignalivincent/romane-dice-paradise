import { FC, CSSProperties } from 'react';
import { cn } from '@/utils/cn';
import { LucideMinusCircle, LucidePlusCircle, LucideTally3, LucideTally4 } from 'lucide-react';
import { ScoreCategoryUI } from '@/types/game';

interface CategoryCellProps {
  category: ScoreCategoryUI;
  isExpanded?: boolean;
  isFocused?: boolean;
  style?: CSSProperties;
  onFocus?: (category: ScoreCategoryUI) => void;
}

export const CategoryCell: FC<CategoryCellProps> = ({ category, isExpanded = false, isFocused = false, style, onFocus }) => {
  const showContent = isExpanded || isFocused;

  return (
    <>
      <div className="relative transition-all duration-300 ease-in-out h-12 category-cell" style={style}>
        <div
          role="button"
          onClick={() => !isExpanded && onFocus?.(category)}
          className={cn(
            'flex items-center gap-1.5 rounded-lg transition-all cursor-pointer hover:brightness-110 h-12',
            showContent
              ? 'absolute left-0 w-[calc(100vw-4rem)] px-3 shadow-lg bg-gradient-to-r from-purple-300 to-indigo-400'
              : cn('w-full justify-center bg-gradient-to-r', category.color)
          )}>
          {!showContent && (
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
              {category.id === 'threeOfAKind' && <LucideTally3 className="w-3 h-3 text-purple-900" />}
              {category.id === 'fourOfAKind' && <LucideTally4 className="w-3 h-3 text-purple-900" />}
              {category.id === 'smallStraight' && <LucideMinusCircle className="w-3 h-3 text-purple-900" />}
              {category.id === 'largeStraight' && <LucidePlusCircle className="w-3 h-3 text-purple-900" />}
            </div>
          )}
          <div className="flex items-center justify-center bg-white/10 rounded-lg shrink-0 w-8 h-8">{category.icon}</div>
          {showContent && (
            <div className="min-w-0 flex-1">
              <div className="font-bold text-white truncate text-sm">{category.name}</div>
              <div className="text-xs text-white/90 truncate">{category.description}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
