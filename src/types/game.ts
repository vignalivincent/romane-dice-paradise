export type ScoreCategory = 
  | 'ones' | 'twos' | 'threes' | 'fours' | 'fives' | 'sixes'  // Section supérieure
  | 'threeOfAKind' | 'fourOfAKind' | 'fullHouse'              // Section inférieure
  | 'smallStraight' | 'largeStraight' | 'yahtzee' | 'chance'; // Section inférieure

export type Scores = {
  [K in ScoreCategory]?: number;
};

export interface Player {
  id: string;
  name: string;
  scores: {
    [key in ScoreCategory]?: number;
  };
}

export interface GameHistory {
  id: string;
  date: string;
  players: Array<{
    id: string;
    name: string;
    score: number;
  }>;
  winnerId: string;
}

export interface GameState {
  players: Player[];
  isStarted: boolean;
  gameHistory: GameHistory[];
} 