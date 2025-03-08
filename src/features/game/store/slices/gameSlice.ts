import { StateCreator } from 'zustand';
import { GameHistory, Player } from '@/types/game';

// Define the base types without dependency on other slices
export interface GameSlice {
  isStarted: boolean;
  gameHistory: GameHistory[];
  
  hasGameHistory: () => boolean;
  isGameComplete: () => boolean;
  
  startGame: () => void;
  endGame: () => void;
  startNewGameWithSamePlayers: () => void;
  resetGame: () => void;
}

// Define what we need from other slices without directly importing them
interface GameSliceDependencies {
  players: Player[];
  getLeadingPlayer: () => Player | null;
  calculateTotal: (player: Player) => number;
}

// Use StateCreator with a generic state type that includes dependencies
export const createGameSlice: StateCreator<
  GameSliceDependencies & GameSlice,
  [],
  [],
  GameSlice
> = (set, get) => ({
  isStarted: false,
  gameHistory: [],
  
  hasGameHistory: () => {
    return get().gameHistory.length > 0;
  },
  
  isGameComplete: () => {
    const { players } = get();
    if (players.length === 0) return false;
    
    return players.every(player => 
      Object.values(player.scores).length === 13 && // 13 is the total number of categories
      Object.values(player.scores).every(score => score !== undefined)
    );
  },
  
  startGame: () =>
    set(() => ({ isStarted: true })),
    
  endGame: () =>
    set((state) => {
      const winner = get().getLeadingPlayer();
      if (!winner) return state;

      // Save the game in history
      const gameRecord: GameHistory = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        players: state.players.map(player => ({
          id: player.id,
          name: player.name,
          score: get().calculateTotal(player)
        })),
        winnerId: winner.id
      };

      return {
        isStarted: false,
        players: state.players.map(player => ({
          ...player,
          scores: {}
        })),
        gameHistory: [...state.gameHistory, gameRecord]
      };
    }),
    
  startNewGameWithSamePlayers: () =>
    set((state) => ({
      isStarted: true,
      players: state.players.map(player => ({
        ...player,
        scores: {}
      }))
    })),
    
  resetGame: () =>
    set(() => ({
      players: [],
      isStarted: false,
      gameHistory: []
    })),
});
