import { FC } from 'react';

interface TotalRowProps {
  label?: string;
  values: number[];
  players: number;
  shouldCollapse?: boolean;
  className?: (value: number) => string;
  hideLabel?: boolean;
}

export const TotalRow: FC<TotalRowProps> = ({
  label,
  values,
  players,
  shouldCollapse = false,
  className,
  hideLabel = false
}) => {
  return (
    <div className="grid gap-x-4" style={{ gridTemplateColumns: `${shouldCollapse ? '60px' : '100px'} minmax(0, 1fr)` }}>
      {!hideLabel && label && (
        <div className="font-bold text-white/90 text-sm text-center">
          {label}
        </div>
      )}
      {hideLabel && <div />}
      <div className="grid gap-x-1" style={{ gridTemplateColumns: `repeat(${players}, 1fr)` }}>
        {values.map((value, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-center font-bold rounded-lg
              ${shouldCollapse ? 'h-8 text-sm' : 'h-10 text-base'}
              ${className ? className(value) : 'bg-white/10 text-white'}
            `}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}; 