import { useState, useEffect } from 'react';
import { ScoreCategory, ScoreState } from '@/types/game';

const MIN_CHANCE_VALUE = 1;
const MAX_CHANCE_VALUE = 30;

interface UseScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScoreUpdate: (score: ScoreState) => void;
  category: {
    id: ScoreCategory;
    name: string;
    description: string;
  };
}

export const useScoreModal = ({ isOpen, onClose, onScoreUpdate, category }: UseScoreModalProps) => {
  const [chanceValue, setChanceValue] = useState<string>('');
  const [baseScore, setBaseScore] = useState<number | null>(null);

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
      setBaseScore(null);
    }
  }, [isOpen]);

  const handleChanceSubmit = () => {
    const value = parseInt(chanceValue);
    if (!isNaN(value) && value >= MIN_CHANCE_VALUE && value <= MAX_CHANCE_VALUE) {
      onScoreUpdate(value);
      onClose();
    }
  };

  const handleReset = () => {
    setChanceValue('');
    setBaseScore(null);
    onScoreUpdate(undefined);
    onClose();
  };

  const handleCrossOut = () => {
    onScoreUpdate('crossed');
    onClose();
  };

  const handleScoreSelect = (score: number) => {
    if (category.id === 'threeOfAKind' || category.id === 'fourOfAKind') {
      setBaseScore(score);
    } else {
      onScoreUpdate(score);
      onClose();
    }
  };

  const handleAdditionalScoreSelect = (score: number) => {
    if (baseScore !== null) {
      onScoreUpdate(baseScore + score);
      onClose();
    }
  };

  const calculatePossibleScores = (category: ScoreCategory): number[] => {
    switch (category) {
      case 'ones':
        return [1, 2, 3, 4, 5];
      case 'twos':
        return [2, 4, 6, 8, 10];
      case 'threes':
        return [3, 6, 9, 12, 15];
      case 'fours':
        return [4, 8, 12, 16, 20];
      case 'fives':
        return [5, 10, 15, 20, 25];
      case 'sixes':
        return [6, 12, 18, 24, 30];
      case 'threeOfAKind':
        return [3, 6, 9, 12, 15, 18];
      case 'fourOfAKind':
        return [4, 8, 12, 16, 20, 24];
      case 'fullHouse':
        return [25];
      case 'smallStraight':
        return [30];
      case 'largeStraight':
        return [40];
      case 'yahtzee':
        return [50];
      case 'chance':
        return [5, 10, 15, 20, 25, 30];
      default:
        return [];
    }
  };

  const calculateAdditionalScores = (category: ScoreCategory): number[] => {
    switch (category) {
      case 'threeOfAKind':
        return Array.from({ length: 12 }, (_, i) => i + 1);
      case 'fourOfAKind':
        return Array.from({ length: 6 }, (_, i) => i + 1);
      default:
        return [];
    }
  };

  return {
    chanceValue,
    setChanceValue,
    handleChanceSubmit,
    handleReset,
    handleCrossOut,
    handleScoreSelect,
    handleAdditionalScoreSelect,
    possibleScores: calculatePossibleScores(category.id),
    additionalScores: calculateAdditionalScores(category.id),
    baseScore,
    needsAdditionalScore: (category.id === 'threeOfAKind' || category.id === 'fourOfAKind') && baseScore !== null,
  };
};
