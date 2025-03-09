import { useState, useEffect } from 'react';
import { ScoreCategory, ScoreCategoryUI } from '@/types/game';

export const useScoreBoardState = () => {
  const [selectedCell, setSelectedCell] = useState<{
    playerId: string;
    category: ScoreCategory;
  } | null>(null);

  const [focusedCategory, setFocusedCategory] = useState<ScoreCategoryUI | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBonusExpanded, setIsBonusExpanded] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.category-cell') && (focusedCategory || isBonusExpanded)) {
        setFocusedCategory(null);
        setIsBonusExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [focusedCategory, isBonusExpanded]);

  const handleCategoryFocus = (category: ScoreCategoryUI) => {
    if (isExpanded) return;
    setFocusedCategory(focusedCategory?.id === category.id ? null : category);
    setIsBonusExpanded(false);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    setFocusedCategory(null);
    setIsBonusExpanded(false);
  };

  const handleToggleBonusExpand = () => {
    if (isExpanded) return;
    setIsBonusExpanded(!isBonusExpanded);
    setFocusedCategory(null);
  };

  return {
    selectedCell,
    setSelectedCell,
    focusedCategory,
    isExpanded,
    isBonusExpanded,
    handleCategoryFocus,
    handleToggleExpand,
    handleToggleBonusExpand,
  };
};
