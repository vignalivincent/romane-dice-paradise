import { StateCreator } from 'zustand';
import { Player, ScoreCategory, ScoreState } from '@/types/game';

// Constants
const UPPER_BONUS_THRESHOLD = 62;
const UPPER_BONUS_VALUE = 35;

export interface ScoresSlice {
  getMaxScore: (category: ScoreCategory) => number;
  calculateSectionTotal: (player: Player, section: 'upper' | 'lower') => number;
  calculateTotal: (player: Player) => number;
  getUpperBonus: (player: Player) => number;
  getLeadingPlayer: () => Player;
  getScoreStyle: (score: ScoreState | undefined, maxScore: number) => string;
}

interface ScoreSliceWithDepencies extends ScoresSlice {
  players: Player[];
}

const getScoreValue = (score: ScoreState | undefined): number => {
  if (score === undefined) return 0;
  if (score === 'crossed') return 0;
  return score;
};

export const createScoresSlice: StateCreator<ScoreSliceWithDepencies, [], [], ScoresSlice> = (_, get) => ({
  getMaxScore: (category) => {
    switch (category) {
      case 'ones':
        return 5;
      case 'twos':
        return 10;
      case 'threes':
        return 15;
      case 'fours':
        return 20;
      case 'fives':
        return 25;
      case 'sixes':
        return 30;
      case 'threeOfAKind':
        return 30;
      case 'fourOfAKind':
        return 40;
      case 'fullHouse':
        return 25;
      case 'smallStraight':
        return 30;
      case 'largeStraight':
        return 40;
      case 'yahtzee':
        return 50;
      case 'chance':
        return 30;
      default:
        return 0;
    }
  },

  calculateSectionTotal: (player, section) => {
    const categories = Object.entries(player.scores).filter(([category]) => {
      if (section === 'upper') {
        return ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'].includes(category);
      }
      return !['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'].includes(category);
    });

    return categories.reduce((sum, [, score]) => sum + getScoreValue(score), 0);
  },

  calculateTotal: (player) => {
    const upperTotal = get().calculateSectionTotal(player, 'upper');
    const lowerTotal = get().calculateSectionTotal(player, 'lower');
    const bonus = get().getUpperBonus(player);
    return upperTotal + lowerTotal + bonus;
  },

  getUpperBonus: (player) => {
    const upperTotal = get().calculateSectionTotal(player, 'upper');
    return upperTotal >= UPPER_BONUS_THRESHOLD ? UPPER_BONUS_VALUE : 0;
  },

  getLeadingPlayer: () => {
    const { players } = get();

    return players.reduce((leader, player) => {
      const leaderTotal = get().calculateTotal(leader);
      const playerTotal = get().calculateTotal(player);
      return playerTotal > leaderTotal ? player : leader;
    });
  },

  getScoreStyle: (score, maxScore) => {
    if (score === undefined) return 'bg-transparent';

    if (score === 'crossed') {
      return 'text-red-500 font-bold text-xl bg-transparent ';
    }

    if (score === 0) {
      return 'bg-red-50 border border-red-200';
    }

    if (score === maxScore) {
      return 'bg-emerald-50 border border-emerald-200';
    }

    const percentage = score / maxScore;
    if (percentage <= 0.33) {
      return 'bg-red-50';
    } else if (percentage <= 0.66) {
      return 'bg-yellow-50';
    } else {
      return 'bg-green-50';
    }
  },
});
