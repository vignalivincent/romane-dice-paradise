import { StateCreator } from 'zustand';
import { Leaderboard, Player, ScoreCategory, ScoreState } from '@/types/game';
import { PlayersSlice } from './playersSlice';
import { HistorySlice } from './historySlice';
import { calculateTotal, getMaxScore, getScoreStyle, getUpperBonus } from '../utils';

export const hasPlayerCompletedAllCategories = (player: Player): boolean => {
  return Object.values(player.scores).length === 13;
};

export const isGameComplete = (players: Player[]): boolean => {
  if (players.length === 0) return false;
  return players.every(hasPlayerCompletedAllCategories);
};

export const resetPlayerScores = (player: Player): Player => ({
  ...player,
  scores: {},
});

export interface CurrentGameSlice {
  isStarted: boolean;
  isGameEnded: boolean;
  isGameComplete: boolean;
  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  getLeaderboard: () => Leaderboard;
  getMaxScore: (category: ScoreCategory) => number;
  getUpperBonus: (player: Player) => number;
  getScoreStyle: (score: ScoreState | undefined, maxScore: number) => string;
}

type CurrentGameSliceDependencies = PlayersSlice & HistorySlice;

export const createCurrentGameSlice: StateCreator<CurrentGameSliceDependencies & CurrentGameSlice, [], [], CurrentGameSlice> = (set, get) => ({
  isStarted: false,
  isGameEnded: false,
  isGameComplete: false,

  getPlayersWithScores: () => {
    const { players } = get();
    return players.map((player) => ({
      id: player.id,
      name: player.name,
      score: calculateTotal(player),
    }));
  },

  getWinner: () => {
    const { isGameComplete, getLeaderboard } = get();

    if (!isGameComplete) return null;

    const playersWithScores = getLeaderboard();
    if (playersWithScores.length === 0) return null;

    return playersWithScores.reduce((max, player) => (!max || player.score > max.score ? player : max), playersWithScores[0]);
  },

  startGame: () => {
    set({ isStarted: true, isGameEnded: false });
  },

  endGame: () => {
    set((state) => {
      const { addGameToHistory } = get();

      const allZeroScores = state.players.every((player) => calculateTotal(player) === 0);

      if (allZeroScores) {
        return { isStarted: true, isGameEnded: true };
      }

      addGameToHistory();
      // Don't call resetGame() here as it conflicts with the state we're setting

      return { isStarted: true, isGameEnded: true };
    });
  },

  resetGame: () =>
    set((state) => ({
      isStarted: false,
      isGameEnded: false,
      isGameComplete: false, // Make sure isGameComplete is also reset
      players: state.players.map(resetPlayerScores),
    })),

  getLeaderboard: () => {
    const { players } = get();

    const leaderBoard = players
      .map((player) => ({
        id: player.id,
        name: player.name,
        score: calculateTotal(player),
      }))
      .sort((a, b) => b.score - a.score);

    return leaderBoard;
  },

  getUpperBonus,
  getMaxScore,
  getScoreStyle,
});
