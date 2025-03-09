import { BONUS } from '@/features/game/constants/bonus';
import { SCORE_CATEGORIES } from '@/features/game/constants/categories';
import { BonusCategory, Player, ScoreCategory, ScoreState, SectionEnum } from '@/types/game';

export const getMaxScore = (category: ScoreCategory): number => {
  const standardCategory = category as Exclude<ScoreCategory, BonusCategory>;
  const categoryData = SCORE_CATEGORIES.find((c) => c.id === standardCategory);
  if (categoryData && 'maxScore' in categoryData) {
    return categoryData.maxScore;
  }
  return 0;
};

export const calculateSectionTotal = (player: Player, section: SectionEnum): number => {
  const sectionCategoryIds = SCORE_CATEGORIES.filter((category) => category.section === section).map((category) => category.id);

  return sectionCategoryIds.reduce((total, categoryId) => {
    const score = player.scores[categoryId];
    return total + (typeof score === 'number' ? score : 0);
  }, 0);
};

export const getScoreStyle = (score: ScoreState | undefined, maxScore: number): string => {
  if (score === undefined) return 'bg-transparent';
  if (score === 'crossed') return 'text-red-500 font-bold text-xl bg-transparent';
  if (score === 0) return 'bg-red-50 border border-red-200';
  if (score === maxScore) return 'bg-emerald-50 border border-emerald-200';

  const percentage = score / maxScore;
  if (percentage <= 0.33) return 'bg-red-50';
  if (percentage <= 0.66) return 'bg-yellow-50';
  return 'bg-green-50';
};

export const getUpperBonus = (player: Player): number => {
  const upperTotal = calculateSectionTotal(player, SectionEnum.upper);
  return upperTotal >= BONUS.upper.threshold ? BONUS.upper.value : 0;
};

export const calculateTotal = (player: Player): number => {
  const upperTotal = calculateSectionTotal(player, SectionEnum.upper);
  const lowerTotal = calculateSectionTotal(player, SectionEnum.lower);
  const bonus = getUpperBonus(player);
  return upperTotal + lowerTotal + bonus;
};
