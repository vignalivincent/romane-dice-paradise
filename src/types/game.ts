export type ScoreCategory =
  | 'ones'
  | 'twos'
  | 'threes'
  | 'fours'
  | 'fives'
  | 'sixes'
  | 'threeOfAKind'
  | 'fourOfAKind'
  | 'fullHouse'
  | 'smallStraight'
  | 'largeStraight'
  | 'yahtzee'
  | 'chance';

export type ScoreState = number | 'crossed' | undefined;

export interface Player {
  id: string;
  name: string;
  scores: Partial<Record<ScoreCategory, ScoreState>>;
}

export interface PlayerScore {
  id: string;
  name: string;
  score: number;
}

export interface GameHistory {
  id: string;
  date: string;
  players: PlayerScore[];
  winnerId: string;
}

export interface GameState {
  players: Player[];
  isStarted: boolean;
  gameHistory: GameHistory[];
}
