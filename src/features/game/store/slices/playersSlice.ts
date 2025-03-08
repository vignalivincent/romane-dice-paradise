import { StateCreator } from 'zustand';
import { Player, ScoreCategory, ScoreState } from '@/types/game';

// Constants
const MAX_PLAYERS = 5;

export interface Leaderboard {
  ranking: Array<{
    playerId: string;
    playerName: string;
    score: number;
  }>;
  scoreByPlayerId: Record<string, number>;
  playerById: Record<string, Player>;
  highestScore: number;
  lowestScore: number | null;
  averageScore: number;
}

export interface PlayersSlice {
  players: Player[];
  getLeaderboard: () => Leaderboard;
  canAddPlayer: () => boolean;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updatePlayerScore: (playerId: string, category: ScoreCategory, value: ScoreState) => void;
  crossOutPlayerScore: (playerId: string, category: ScoreCategory) => void;
}

interface StoreWithScores {
  calculateTotal: (player: Player) => number;
}

export const createPlayersSlice: StateCreator<PlayersSlice & StoreWithScores, [], [], PlayersSlice> = (set, get) => ({
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

  crossOutPlayerScore: (playerId, category) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId
          ? {
              ...player,
              scores: {
                ...player.scores,
                [category]: 'crossed',
              },
            }
          : player
      ),
    })),

  getLeaderboard: () => {
    const { players, calculateTotal } = get();

    if (players.length === 0) {
      return {
        ranking: [],
        scoreByPlayerId: {},
        playerById: {},
        highestScore: 0,
        lowestScore: null,
        averageScore: 0,
      };
    }

    const scoreByPlayerId: Record<string, number> = {};
    const playerById: Record<string, Player> = {};
    let totalScore = 0;

    players.forEach((player) => {
      const score = calculateTotal(player);
      scoreByPlayerId[player.id] = score;
      playerById[player.id] = player;
      totalScore += score;
    });

    const ranking = players
      .map((player) => ({
        playerId: player.id,
        playerName: player.name,
        score: scoreByPlayerId[player.id],
      }))
      .sort((a, b) => b.score - a.score);

    const highestScore = ranking[0]?.score || 0;
    const lowestScore = ranking[ranking.length - 1]?.score || null;
    const averageScore = players.length > 0 ? totalScore / players.length : 0;

    return {
      ranking,
      scoreByPlayerId,
      playerById,
      highestScore,
      lowestScore,
      averageScore,
    };
  },
});
