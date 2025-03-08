import { StateCreator } from 'zustand';
import { Player, ScoreCategory } from '@/types/game';

// Constants
const MAX_PLAYERS = 5;

export interface PlayersSlice {
  players: Player[];
  canAddPlayer: () => boolean;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updatePlayerScore: (playerId: string, category: ScoreCategory, value: number) => void;
}

export const createPlayersSlice: StateCreator<PlayersSlice, [], [], PlayersSlice> = (set, get) => ({
  players: [],

  canAddPlayer: () => {
    return get().players.length < MAX_PLAYERS;
  },

  addPlayer: (name) =>
    set((state) => {
      // Check if name already exists (case insensitive)
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

  updatePlayerScore: (playerId, category, value) =>
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
    })),
});
