import { StateCreator } from 'zustand';
import { Player } from '@/types/game';

// Core game logic functions - kept within the store file
export const hasPlayerCompletedAllCategories = (player: Player): boolean => {
  // Note: crossed-out counts as completed
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

export interface PlayerWithScore {
  id: string;
  name: string;
  score: number;
}

export interface CurrentGameSlice {
  isStarted: boolean;
  isGameEnded: boolean;

  isGameComplete: () => boolean;
  getPlayersWithScores: () => PlayerWithScore[];
  getWinner: () => PlayerWithScore | null;

  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
}

interface CurrentGameSliceDependencies {
  players: Player[];
  getLeadingPlayer: () => Player | null;
  calculateTotal: (player: Player) => number;
  addGameToHistory: (players: PlayerWithScore[], winnerId: string) => void;
}

export const createCurrentGameSlice: StateCreator<CurrentGameSliceDependencies & CurrentGameSlice, [], [], CurrentGameSlice> = (set, get) => {
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
        id: player.id,
        name: player.name,
        score: get().calculateTotal(player),
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

    isGameComplete: () => {
      const { players } = get();

      if (!players || players.length === 0) {
        console.log('Game not complete: No players');
        return false;
      }

      const allCategoriesComplete = players.every((player) => {
        const filledCategories = Object.keys(player.scores).length;
        const totalCategories = 13;

        return filledCategories >= totalCategories;
      });

      console.log(`Game complete check: ${allCategoriesComplete ? 'Yes' : 'No'}`);
      return allCategoriesComplete;
    },

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

        const playersWithScores = get().getPlayersWithScores();

        // Add game to history (handled by history slice)
        get().addGameToHistory(playersWithScores, winner.id);

        return {
          isStarted: true,
          isGameEnded: true,
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
