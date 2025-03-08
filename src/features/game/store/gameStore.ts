import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { PlayersSlice, createPlayersSlice } from './slices/playersSlice';
import { GameSlice, createGameSlice } from './slices/gameSlice';
import { ScoresSlice, createScoresSlice } from './slices/scoresSlice';
import { isGameComplete, hasGameHistory } from './utils/gameHelpers';
import { useShallow } from 'zustand/react/shallow';

// Constants
const STORAGE_KEY = 'romane-dice-paradise-game-state';

// Combined store type
type BoundState = PlayersSlice & GameSlice & ScoresSlice;

// Create store with middleware and slices
export const useGameStore = create<BoundState>()(
  devtools(
    persist(
      (set, get, api) => ({
        ...createPlayersSlice(set, get, api),
        ...createGameSlice(set, get, api),
        ...createScoresSlice(set, get, api),
      }),
      {
        name: STORAGE_KEY,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          players: state.players,
          isStarted: state.isStarted,
          gameHistory: state.gameHistory,
        }),
      }
    ),
    { name: 'Game Store' }
  )
);

// Simple primitives
export const useIsGameStarted = () => useGameStore((state) => state.isStarted);
export const usePlayerCount = () => useGameStore((state) => state.players.length);

// Object returns - use useShallow for automatic shallow comparison
export const useGamePlayers = () => useGameStore(useShallow((state) => state.players));

// For method bundles, use useShallow for stable references
export const usePlayerActions = () =>
  useGameStore(
    useShallow((state) => ({
      addPlayer: state.addPlayer,
      removePlayer: state.removePlayer,
      updatePlayerScore: state.updatePlayerScore,
      canAddPlayer: state.canAddPlayer,
    }))
  );

export const useGameActions = () =>
  useGameStore(
    useShallow((state) => ({
      startGame: state.startGame,
      endGame: state.endGame,
      startNewGameWithSamePlayers: state.startNewGameWithSamePlayers,
      resetGame: state.resetGame,
    }))
  );

export const useScoreCalculations = () =>
  useGameStore(
    useShallow((state) => ({
      calculateSectionTotal: state.calculateSectionTotal,
      calculateTotal: state.calculateTotal,
      getUpperBonus: state.getUpperBonus,
      getMaxScore: state.getMaxScore,
      getLeadingPlayer: state.getLeadingPlayer,
      getScoreStyle: state.getScoreStyle,
      getPlayersWithTotalScores: state.getPlayersWithTotalScores,
    }))
  );

// For computed values that depend on state
export const useGameStatus = () =>
  useGameStore(
    useShallow((state) => {
      return {
        isStarted: state.isStarted,
        isComplete: isGameComplete(state.players),
        hasHistory: hasGameHistory(state.gameHistory),
        playerCount: state.players.length,
      };
    })
  );

// For components that need both game state and players
export const useGameWithPlayers = () =>
  useGameStore(
    useShallow((state) => ({
      isStarted: state.isStarted,
      players: state.players,
    }))
  );
