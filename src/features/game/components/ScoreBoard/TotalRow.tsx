import { FC } from 'react';
import { cn } from '@/utils/cn';
import { CategoryCell } from './CategoryCell';
import { SCORE_CATEGORIES } from '../../constants/categories';
import { getCellClassName } from './scoreUtils';
import { TotalRowVariant } from '@/types/game';

interface TotalRowProps {
  values: number[];
  players: number;
  isBonus?: boolean;
  isExpanded?: boolean;
  isFocused?: boolean;
  onToggleExpand?: () => void;
  className?: string;
  variant?: TotalRowVariant;
}

export const TotalRow: FC<TotalRowProps> = ({
  values,
  players,
  isBonus = false,
  isExpanded = false,
  isFocused = false,
  onToggleExpand,
  className,
  variant = 'default',
}) => {
  if (isBonus) {
    const bonusCategory = SCORE_CATEGORIES.find((cat) => cat.id === 'bonus')!;

    return (
      <div className="grid gap-x-2" style={{ gridTemplateColumns: '44px minmax(0, 1fr)' }}>
        <CategoryCell category={bonusCategory} isExpanded={isExpanded} isFocused={isFocused} onFocus={onToggleExpand} />
        <div className="grid gap-x-1" style={{ gridTemplateColumns: `repeat(${players}, 1fr)` }}>
          {values.map((value, index) => (
            <div key={index} className={cn('h-12 flex items-center justify-center font-bold rounded-lg', className, getCellClassName(value, variant, isBonus))}>
              {value}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-x-2" style={{ gridTemplateColumns: '44px minmax(0, 1fr)' }}>
      <div className="h-12"></div>

      <div className="grid gap-x-1" style={{ gridTemplateColumns: `repeat(${players}, 1fr)` }}>
        {values.map((value, index) => (
          <div key={index} className={cn('h-12 flex items-center justify-center font-bold text-base rounded-lg', className, getCellClassName(value, variant))}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
