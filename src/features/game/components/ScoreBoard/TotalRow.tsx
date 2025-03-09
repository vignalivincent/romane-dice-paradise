import { FC } from 'react';
import { CategoryCell } from './CategoryCell';
import { SectionEnum } from '@/types/game';

interface TotalRowProps {
  label?: string;
  values: number[];
  players: number;
  className?: (value: number) => string;
  hideLabel?: boolean;
  isBonus?: boolean;
  isExpanded?: boolean;
  isFocused?: boolean;
  onToggleExpand?: () => void;
}

export const TotalRow: FC<TotalRowProps> = ({
  label,
  values,
  players,
  className,
  hideLabel = false,
  isBonus = false,
  isExpanded = false,
  isFocused = false,
  onToggleExpand,
}) => {
  if (isBonus) {
    const bonusCategory = {
      id: 'bonus',
      name: 'Bonus (+35pts)',
      description: 'Au dela de 62 points ci dessus.',
      icon: '🤑',
      color: 'from-emerald-400/10 to-emerald-500/10',
      section: SectionEnum.upper,
    };

    return (
      <div className="grid gap-x-2" style={{ gridTemplateColumns: '44px minmax(0, 1fr)' }}>
        <CategoryCell category={bonusCategory} isExpanded={isExpanded} isFocused={isFocused} onFocus={onToggleExpand} />
        <div className="grid gap-x-1" style={{ gridTemplateColumns: `repeat(${players}, 1fr)` }}>
          {values.map((value, index) => (
            <div
              key={index}
              className={`
                h-12 flex items-center justify-center font-bold rounded-lg
                ${className ? className(value) : 'bg-white/10 text-white'}
              `}>
              {value}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-x-2" style={{ gridTemplateColumns: '44px minmax(0, 1fr)' }}>
      {!hideLabel && label && <div className="h-12 flex items-center justify-center font-bold text-white/90 text-sm">{label}</div>}
      {hideLabel && <div className="h-12" />}
      <div className="grid gap-x-1" style={{ gridTemplateColumns: `repeat(${players}, 1fr)` }}>
        {values.map((value, index) => (
          <div
            key={index}
            className={`
              h-12 flex items-center justify-center font-bold rounded-lg
              ${className ? className(value) : 'bg-white/10 text-white'}
            `}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
