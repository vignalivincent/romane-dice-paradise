import { FC } from 'react';

interface TotalRowProps {
  label: string;
  values: number[];
  className?: string | ((value: number) => string);
}

export const TotalRow: FC<TotalRowProps> = ({ label, values, className = 'bg-white/10 text-white' }) => (
  <div className="grid gap-0.5" style={{ gridTemplateColumns: `160px repeat(${values.length}, 1fr)` }}>
    <div className="bg-white/10 p-2 rounded-lg h-10 flex items-center">
      <div className="font-bold text-white text-sm">{label}</div>
    </div>
    {values.map((value, index) => (
      <div key={index} className="px-0.5">
        <div className={`w-full h-10 flex items-center justify-center font-bold text-lg rounded-lg ${
          typeof className === 'function' ? className(value) : className
        }`}>
          {value > 0 ? (typeof className === 'function' ? `+${value}` : value) : '-'}
        </div>
      </div>
    ))}
  </div>
); 