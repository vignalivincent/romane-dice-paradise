import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { PlayersSlice, createPlayersSlice } from './slices/playersSlice';
import { GameSlice, createGameSlice } from './slices/gameSlice';
import { ScoresSlice, createScoresSlice } from './slices/scoresSlice';
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

// For method bundles, use useShallow for stable references
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
