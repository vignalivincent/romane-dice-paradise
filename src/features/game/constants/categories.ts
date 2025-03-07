import { ScoreCategory } from '@/types/game';

export interface ScoreCategoryUI {
  id: ScoreCategory;
  name: string;
  description: string;
  section: 'upper' | 'lower';
  icon: string;
  color: string;
}

export const SCORE_CATEGORIES: ScoreCategoryUI[] = [
  // Section supérieure
  { id: 'ones', name: 'Aa', description: 'Total des 1', section: 'upper', icon: '1️⃣', color: 'from-blue-400/10 to-blue-500/10' },
  { id: 'twos', name: 'Deux', description: 'Total des 2', section: 'upper', icon: '2️⃣', color: 'from-blue-400/10 to-blue-500/10' },
  { id: 'threes', name: 'Trois', description: 'Total des 3', section: 'upper', icon: '3️⃣', color: 'from-blue-400/10 to-blue-500/10' },
  { id: 'fours', name: 'Quatre', description: 'Total des 4', section: 'upper', icon: '4️⃣', color: 'from-blue-400/10 to-blue-500/10' },
  { id: 'fives', name: 'Cinq', description: 'Total des 5', section: 'upper', icon: '5️⃣', color: 'from-blue-400/10 to-blue-500/10' },
  { id: 'sixes', name: 'Six', description: 'Total des 6', section: 'upper', icon: '6️⃣', color: 'from-blue-400/10 to-blue-500/10' },
  
  // Section inférieure
  { id: 'threeOfAKind', name: 'Brelan', description: '3 dés identiques', section: 'lower', icon: '🎲', color: 'from-purple-400/10 to-purple-500/10' },
  { id: 'fourOfAKind', name: 'Carré', description: '4 dés identiques', section: 'lower', icon: '🎲', color: 'from-purple-400/10 to-purple-500/10' },
  { id: 'fullHouse', name: 'Full', description: '3 + 2 dés identiques', section: 'lower', icon: '🏠', color: 'from-purple-400/10 to-purple-500/10' },
  { id: 'smallStraight', name: 'Petite suite', description: '4 dés qui se suivent', section: 'lower', icon: '➡️', color: 'from-purple-400/10 to-purple-500/10' },
  { id: 'largeStraight', name: 'Grande suite', description: '5 dés qui se suivent', section: 'lower', icon: '⏭️', color: 'from-purple-400/10 to-purple-500/10' },
  { id: 'yahtzee', name: 'Yams', description: '5 dés identiques', section: 'lower', icon: '🌟', color: 'from-yellow-400/10 to-yellow-500/10' },
  { id: 'chance', name: 'Chance', description: 'Total de tous les dés', section: 'lower', icon: '🎯', color: 'from-purple-400/10 to-purple-500/10' },
]; 