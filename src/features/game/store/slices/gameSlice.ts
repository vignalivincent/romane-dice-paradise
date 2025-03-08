import { StateCreator } from 'zustand';
import { GameHistory, Player } from '@/types/game';

// Core game logic functions - kept within the store file
export const hasPlayerCompletedAllCategories = (player: Player): boolean => {
  return Object.values(player.scores).length === 13 && Object.values(player.scores).every((score) => score !== undefined);
};

export const isGameComplete = (players: Player[]): boolean => {
  if (players.length === 0) return false;
  return players.every(hasPlayerCompletedAllCategories);
};

export const calculatePlayerScore = (player: Player): number => {
  return Object.values(player.scores).reduce((sum, score) => sum + (score || 0), 0);
};

export const resetPlayerScores = (player: Player): Player => ({
  ...player,
  scores: {},
});

export interface PlayerWithScore {
  name: string;
  score: number;
}

export interface GameSlice {
  isStarted: boolean;
  isGameEnded: boolean;
  gameHistory: GameHistory[];

  hasGameHistory: () => boolean;
  isGameComplete: () => boolean;
  getPlayersWithScores: () => PlayerWithScore[];
  getWinner: () => PlayerWithScore | null;

  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
}

interface GameSliceDependencies {
  players: Player[];
  getLeadingPlayer: () => Player | null;
  calculateTotal: (player: Player) => number;
}

export const createGameSlice: StateCreator<GameSliceDependencies & GameSlice, [], [], GameSlice> = (set, get) => {
  const memoizedIsGameComplete = (() => {
    let lastPlayers: Player[] = [];
    let lastResult = false;

    return () => {
      const players = get().players;
      if (players === lastPlayers) return lastResult;

      lastPlayers = players;
      lastResult = isGameComplete(players);
      return lastResult;
    };
  })();

  const memoizedGetPlayersWithScores = (() => {
    let lastPlayers: Player[] = [];
    let lastResult: PlayerWithScore[] = [];

    return () => {
      const players = get().players;
      if (players === lastPlayers) return lastResult;

      lastPlayers = players;
      lastResult = players.map((player) => ({
        name: player.name,
        score: calculatePlayerScore(player),
      }));
      return lastResult;
    };
  })();

  const memoizedGetWinner = (() => {
    let lastPlayers: Player[] = [];
    let lastResult: PlayerWithScore | null = null;

    return () => {
      const players = get().players;
      if (players === lastPlayers) return lastResult;

      lastPlayers = players;

      if (!memoizedIsGameComplete()) {
        lastResult = null;
        return null;
      }

      const playersWithScores = memoizedGetPlayersWithScores();

      if (playersWithScores.length === 0) {
        lastResult = null;
        return null;
      }

      lastResult = playersWithScores.reduce((max, player) => (!max || player.score > max.score ? player : max), playersWithScores[0]);

      return lastResult;
    };
  })();

  return {
    isStarted: false,
    isGameEnded: false,
    gameHistory: [],

    hasGameHistory: () => get().gameHistory.length > 0,
    isGameComplete: memoizedIsGameComplete,
    getPlayersWithScores: memoizedGetPlayersWithScores,
    getWinner: memoizedGetWinner,

    startGame: () => {
      if (!get().isStarted) {
        set({ isStarted: true, isGameEnded: false });
      }
    },

    endGame: () => {
      if (get().isGameEnded) return;

      set((state) => {
        if (state.isGameEnded) return state;

        const winner = get().getLeadingPlayer();
        if (!winner) return state;

        const allZeroScores = state.players.every((player) => get().calculateTotal(player) === 0);
        if (allZeroScores) {
          return {
            isStarted: true,
            isGameEnded: true,
          };
        }

        const gameRecord: GameHistory = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          players: state.players.map((player) => ({
            id: player.id,
            name: player.name,
            score: get().calculateTotal(player),
          })),
          winnerId: winner.id,
        };

        return {
          isStarted: true,
          isGameEnded: true,
          gameHistory: [...state.gameHistory, gameRecord],
        };
      });
    },

    resetGame: () =>
      set((state) => ({
        isStarted: false,
        isGameEnded: false,
        players: state.players.map(resetPlayerScores),
      })),
  };
};
