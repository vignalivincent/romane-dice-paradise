import { StateCreator } from 'zustand';
import { Player, ScoreCategory } from '@/types/game';

// Constants
const UPPER_BONUS_THRESHOLD = 62;
const UPPER_BONUS_VALUE = 35;

export interface ScoresSlice {
  getMaxScore: (category: ScoreCategory) => number;
  calculateSectionTotal: (player: Player, section: 'upper' | 'lower') => number;
  calculateTotal: (player: Player) => number;
  getUpperBonus: (player: Player) => number;
  getLeadingPlayer: () => Player;
  getScoreStyle: (score: number | undefined, maxScore: number) => string;
  getPlayersWithTotalScores: () => Array<{ name: string; score: number }>;
}

// Define what we need from other slices
interface ScoreSliceWithDepencies extends ScoresSlice {
  players: Player[];
}

// Changed the StateCreator type to correctly include dependencies
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
        return 30;
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

    return categories.reduce((sum, [, score]) => sum + (score || 0), 0);
  },

  calculateTotal: (player) => {
    const upperTotal = get().calculateSectionTotal(player, 'upper');
    const lowerTotal = get().calculateSectionTotal(player, 'lower');
    console.log('upperTotal', upperTotal);
    console.log('lowerTotal', lowerTotal);
    const bonus = get().getUpperBonus(player);
    console.log('bonus', bonus);
    console.log(upperTotal + lowerTotal + bonus);
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

    // Score of 0 : pale red
    if (score === 0) {
      return 'bg-red-50 border border-red-200';
    }

    // Maximum score : pale green
    if (score === maxScore) {
      return 'bg-emerald-50 border border-emerald-200';
    }

    // Intermediate score : red to green gradient
    const percentage = score / maxScore;
    if (percentage <= 0.33) {
      return 'bg-red-50';
    } else if (percentage <= 0.66) {
      return 'bg-yellow-50';
    } else {
      return 'bg-green-50';
    }
  },

  getPlayersWithTotalScores: () => {
    const { players } = get();
    return players.map((player) => ({
      name: player.name,
      score: get().calculateTotal(player),
    }));
  },
});
