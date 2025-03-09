import { StateCreator } from 'zustand';
import { GameHistory } from '@/types/game';
import { CurrentGameSlice } from './currentGameSlice';
import { PlayersSlice } from './playersSlice';

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
  addGameToHistory: () => void;
}

type HistorySliceDependencies = PlayersSlice & CurrentGameSlice;

export const createHistorySlice: StateCreator<HistorySliceDependencies & HistorySlice, [], [], HistorySlice> = (set, get) => ({
  gameHistory: [],

  addGameToHistory: () => {
    const { getLeaderboard } = get();
    const leaderBoard = getLeaderboard();
    const { id: winnerId } = leaderBoard[0];

    set((state) => ({
      gameHistory: [
        ...state.gameHistory,
        {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          players: leaderBoard,
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
