import { useState, useEffect } from 'react';
import { Player, ScoreCategory, SectionEnum } from '@/types/game';
import { getPotentialScoreListByCategory } from '../constants/potentialScore';
import { useScore } from '@/store/gameStore';
import { toast } from '@/ui/hooks/use-toast';
import { TOAST_MESSAGES } from '../constants/toastMessages';
import { t } from 'i18next';
import { calculateSectionTotal, getMaxScore } from '@/store/utils';
import { BONUS } from '../constants/bonus';
import { SCORE_CATEGORIES } from '../constants/categories';

const MIN_CHANCE_VALUE = 1;
const MAX_CHANCE_VALUE = 30;

interface UseScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player;
  category: ScoreCategory;
  onYahtzee: () => void;
}

export const useScoreModal = ({ isOpen, onClose, category, player, onYahtzee }: UseScoreModalProps) => {
  const { doUpdateScore } = useScore();
  const [chanceValue, setChanceValue] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setChanceValue('');
    }
  }, [isOpen]);

  const handleChanceSubmit = () => {
    const value = parseInt(chanceValue);
    if (!isNaN(value) && value >= MIN_CHANCE_VALUE && value <= MAX_CHANCE_VALUE) {
      doUpdateScore(player.id, category, value);
      onClose();
    }
  };

  const handleReset = () => {
    setChanceValue('');
    doUpdateScore(player.id, category, undefined);
    onClose();
  };

  const handleCrossOut = () => {
    doUpdateScore(player.id, category, 'crossed');
    toast({
      variant: TOAST_MESSAGES.zeroScore.variant,
      title: t(TOAST_MESSAGES.zeroScore.title),
      description: t(TOAST_MESSAGES.zeroScore.description, { name: player.name }),
    });
    onClose();
  };

  const handleScoreSelect = (score: number) => {
    doUpdateScore(player.id, category, score);
    if (score === getMaxScore(category)) {
      toast({
        variant: TOAST_MESSAGES.maxScore.variant,
        title: t(TOAST_MESSAGES.maxScore.title),
        description: t(TOAST_MESSAGES.maxScore.description, { name: player.name }),
      });
    }
    if (category === 'yahtzee') {
      toast({
        variant: TOAST_MESSAGES.yahtzee.variant,
        description: t(TOAST_MESSAGES.yahtzee.description, { name: player.name }),
      });
      onYahtzee();
    }

    const currentUpperTotal = calculateSectionTotal(player, SectionEnum.upper);
    const upperCategories = Object.values(SCORE_CATEGORIES).filter((cat) => cat.section === SectionEnum.upper);
    const isUpperCategory = upperCategories.some((c) => c.id === category);
    const isBonusUnlocked = isUpperCategory && currentUpperTotal < BONUS.upper.threshold && currentUpperTotal + score >= BONUS.upper.threshold;
    if (isBonusUnlocked) {
      toast({
        variant: TOAST_MESSAGES.unlockBonus.variant,
        title: t(TOAST_MESSAGES.unlockBonus.title),
        description: t(TOAST_MESSAGES.unlockBonus.description, { name: player.name }),
      });
    }
    onClose();
  };

  return {
    chanceValue,
    setChanceValue,
    handleChanceSubmit,
    handleReset,
    handleCrossOut,
    handleScoreSelect,
    possibleScores: getPotentialScoreListByCategory(category),
  };
};
