import { FC } from 'react';
import { ScoreCategoryUI } from './types';


interface CategoryCellProps {
  category: ScoreCategoryUI;
}

export const CategoryCell: FC<CategoryCellProps> = ({ category }) => (
  <div className={`flex items-center gap-1.5 bg-gradient-to-r ${category.color} p-1.5 rounded-lg h-10`}>
    <div className="text-base w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg shrink-0">
      {category.icon}
    </div>
    <div className="min-w-0 flex-1">
      <div className="font-bold text-white text-sm truncate">{category.name}</div>
      <div className="text-xs text-white/90 truncate">{category.description}</div>
    </div>
  </div>
); 