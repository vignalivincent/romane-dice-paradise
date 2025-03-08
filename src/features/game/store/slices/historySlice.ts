import { StateCreator } from 'zustand';
import { GameHistory, Player } from '@/types/game';
import { PlayerWithScore } from './currentGameSlice';

export interface PlayerStats {
  gamesPlayed: number;
  wins: number;
  highestScore: number;
  averageScore: number;
  name: string;
}

export interface HistorySlice {
  gameHistory: GameHistory[];
  getSortedPlayerStats: () => PlayerStats[];
  addGameToHistory: (players: PlayerWithScore[], winnerId: string) => void;
}

interface HistorySliceDependencies {
  players: Player[];
}

export const createHistorySlice: StateCreator<HistorySliceDependencies & HistorySlice, [], [], HistorySlice> = (set, get) => ({
  gameHistory: [],

  addGameToHistory: (players: PlayerWithScore[], winnerId: string) => {
    set((state) => ({
      gameHistory: [
        ...state.gameHistory,
        {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          players,
          winnerId,
        },
      ],
    }));
  },

  getSortedPlayerStats: () => {
    const { players, gameHistory } = get();

    return players
      .map((player) => {
        const playerGames = gameHistory.filter((game) => game.players.some((p) => p.id === player.id));

        if (playerGames.length === 0) {
          return {
            gamesPlayed: 0,
            wins: 0,
            highestScore: 0,
            averageScore: 0,
            name: player.name,
          };
        }

        const scores = playerGames.map((game) => game.players.find((p) => p.id === player.id)?.score || 0);

        const totalScore = scores.reduce((sum, score) => sum + score, 0);

        return {
          gamesPlayed: playerGames.length,
          wins: gameHistory.filter((game) => game.winnerId === player.id).length,
          highestScore: Math.max(...scores),
          name: player.name,
          averageScore: Math.round(totalScore / scores.length),
        };
      })
      .filter((stats) => stats.name)
      .sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        return b.averageScore - a.averageScore;
      });
  },
});
