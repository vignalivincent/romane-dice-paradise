import { create } from 'zustand';
import { GameState, Player, ScoreCategory } from '@/types/game';

// Constantes du jeu
const UPPER_BONUS_THRESHOLD = 62;
const UPPER_BONUS_VALUE = 35;
const MAX_PLAYERS = 6;
const STORAGE_KEY = 'romane-dice-paradise-game-state';

// Fonction pour charger l'état depuis le localStorage
const loadState = (): Partial<GameState> => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading state:', error);
  }
  return {};
};

// Fonction pour sauvegarder l'état dans le localStorage
const saveState = (state: GameState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      isStarted: state.isStarted,
      players: state.players,
    }));
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

interface ScoreCategoryUI {
  id: ScoreCategory;
  name: string;
  description: string;
  section: 'upper' | 'lower';
  icon: string;
  color: string;
}

interface GameStore extends GameState {
  // Getters
  getMaxScore: (category: ScoreCategory) => number;
  calculateSectionTotal: (player: Player, section: 'upper' | 'lower') => number;
  calculateTotal: (player: Player) => number;
  getUpperBonus: (player: Player) => number;
  getLeadingPlayer: () => Player | null;
  isGameComplete: () => boolean;
  getScoreStyle: (score: number | undefined, maxScore: number) => string;
  getPlayersWithTotalScores: () => Array<{ name: string; score: number }>;
  canAddPlayer: () => boolean;
  
  // Players actions
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updatePlayerScore: (playerId: string, category: ScoreCategory, value: number) => void;
  
  // Game actions
  startGame: () => void;
  endGame: () => void;
}

// Charger l'état initial depuis le localStorage
const initialState = loadState();

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state with localStorage
  isStarted: initialState.isStarted || false,
  players: initialState.players || [],

  // Getters
  getMaxScore: (category) => {
    switch (category) {
      case 'ones': return 5;
      case 'twos': return 10;
      case 'threes': return 15;
      case 'fours': return 20;
      case 'fives': return 25;
      case 'sixes': return 30;
      case 'threeOfAKind': return 18;
      case 'fourOfAKind': return 24;
      case 'fullHouse': return 25;
      case 'smallStraight': return 30;
      case 'largeStraight': return 40;
      case 'yahtzee': return 50;
      case 'chance': return 30;
      default: return 0;
    }
  },

  calculateSectionTotal: (player, section) => {
    const categories = Object.entries(player.scores)
      .filter(([category]) => {
        if (section === 'upper') {
          return ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'].includes(category);
        }
        return ['threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'largeStraight', 'yahtzee', 'chance'].includes(category);
      });
    
    return categories.reduce((sum, [_, score]) => sum + (score || 0), 0);
  },

  calculateTotal: (player) => {
    const upperTotal = get().calculateSectionTotal(player, 'upper');
    const bonus = upperTotal >= UPPER_BONUS_THRESHOLD ? UPPER_BONUS_VALUE : 0;
    return upperTotal + bonus + get().calculateSectionTotal(player, 'lower');
  },

  getUpperBonus: (player) => {
    const upperTotal = get().calculateSectionTotal(player, 'upper');
    return upperTotal >= UPPER_BONUS_THRESHOLD ? UPPER_BONUS_VALUE : 0;
  },

  getLeadingPlayer: () => {
    const { players } = get();
    if (players.length === 0) return null;

    return players.reduce((leader, player) => {
      const leaderTotal = get().calculateTotal(leader);
      const playerTotal = get().calculateTotal(player);
      return playerTotal > leaderTotal ? player : leader;
    });
  },

  isGameComplete: () => {
    const { players } = get();
    if (players.length === 0) return false;
    
    return players.every(player => 
      Object.values(player.scores).length === 13 && // 13 est le nombre total de catégories
      Object.values(player.scores).every(score => score !== undefined)
    );
  },

  getScoreStyle: (score, maxScore) => {
    if (score === undefined) return 'bg-transparent';
    
    // Score de 0 : rouge pâle
    if (score === 0) {
      return 'bg-red-50 border border-red-200';
    }

    // Score maximum : vert pâle
    if (score === maxScore) {
      return 'bg-emerald-50 border border-emerald-200';
    }

    // Score intermédiaire : mélange de rouge vers vert
    const percentage = score / maxScore;
    if (percentage <= 0.33) {
      return 'bg-red-50';
    } else if (percentage <= 0.66) {
      return 'bg-yellow-50';
    } else {
      return 'bg-green-50';
    }
  },

  getPlayersWithTotalScores: () => {
    const { players } = get();
    return players.map(player => ({
      name: player.name,
      score: get().calculateTotal(player)
    }));
  },

  canAddPlayer: () => {
    const { players } = get();
    return players.length < MAX_PLAYERS;
  },

  // Players actions with persistence
  addPlayer: (name) =>
    set((state) => {
      if (state.players.length >= MAX_PLAYERS) return state;

      const newState = {
        players: [
          ...state.players,
          {
            id: crypto.randomUUID(),
            name,
            scores: {},
          },
        ],
      };

      saveState({ ...state, ...newState });
      return newState;
    }),

  removePlayer: (id) =>
    set((state) => {
      const newState = {
        players: state.players.filter((player) => player.id !== id),
      };

      saveState({ ...state, ...newState });
      return newState;
    }),

  updatePlayerScore: (playerId, category, value) =>
    set((state) => {
      const newState = {
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
      };

      saveState({ ...state, ...newState });
      return newState;
    }),

  // Game actions with persistence
  startGame: () =>
    set((state) => {
      const newState = { isStarted: true };
      saveState({ ...state, ...newState });
      return newState;
    }),

  endGame: () =>
    set((state) => {
      const newState = {
        isStarted: false,
        players: [],
      };
      saveState(newState);
      return newState;
    }),
})); 