import { StateCreator } from 'zustand';
import { Player, ScoreCategory, ScoreState } from '@/types/game';
import { CurrentGameSlice } from './currentGameSlice';
import { MAX_PLAYERS } from '@/features/game/constants/maxPlayers';

export interface PlayersSlice {
  players: Player[];
  canAddPlayer: () => boolean;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updatePlayerScore: (playerId: string, category: ScoreCategory, value: ScoreState) => void;
}

export const createPlayersSlice: StateCreator<PlayersSlice & CurrentGameSlice, [], [], PlayersSlice> = (set, get) => {
  return {
    players: [],

    canAddPlayer: () => {
      return get().players.length < MAX_PLAYERS;
    },

    addPlayer: (name) =>
      set((state) => {
        const nameExists = state.players.some((player) => player.name.toLowerCase() === name.toLowerCase());

        if (nameExists || state.players.length >= MAX_PLAYERS) return state;

        return {
          players: [
            ...state.players,
            {
              id: crypto.randomUUID(),
              name,
              scores: {},
            },
          ],
        };
      }),

    removePlayer: (id) =>
      set((state) => ({
        players: state.players.filter((p) => p.id !== id),
      })),

    updatePlayerScore: (playerId, category, value) => {
      set((state) => ({
        players: state.players.map((player) =>
          player.id === playerId
            ? {
                ...player,
                scores: {
                  ...player.scores,
                  [category]: value,
                },
              }
            : player
        ),
      }));

      const { players } = get();
      const isGameComplete = players.every((player) => {
        const filledCategories = Object.keys(player.scores).length;
        return filledCategories >= 13;
      });

      set({ isGameComplete });
    },
  };
};
