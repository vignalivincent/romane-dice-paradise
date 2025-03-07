import { FC } from 'react';
import { ScoreCategoryUI } from '../../constants/categories';

interface CategoryCellProps {
  category: ScoreCategoryUI;
  shouldCollapse?: boolean;
}

export const CategoryCell: FC<CategoryCellProps> = ({ 
  category,
  shouldCollapse = false 
}) => (
  <div className={`
    flex items-center gap-1.5 bg-gradient-to-r ${category.color} rounded-lg
    ${shouldCollapse ? 'p-1.5 h-10 justify-center' : 'p-2 h-12'}
  `}>
    <div className={`
      text-base flex items-center justify-center bg-white/10 rounded-lg shrink-0
      ${shouldCollapse ? 'w-7 h-7' : 'w-8 h-8'}
    `}>
      {category.icon}
    </div>
    {!shouldCollapse && (
      <div className="min-w-0 flex-1">
        <div className="font-bold text-white truncate text-base">
          {category.name}
        </div>
        <div className="text-sm text-white/90 truncate">
          {category.description}
        </div>
      </div>
    )}
  </div>
); 