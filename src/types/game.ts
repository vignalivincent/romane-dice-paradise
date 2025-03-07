export type ScoreCategory = 
  | 'ones' | 'twos' | 'threes' | 'fours' | 'fives' | 'sixes'  // Section supérieure
  | 'threeOfAKind' | 'fourOfAKind' | 'fullHouse'              // Section inférieure
  | 'smallStraight' | 'largeStraight' | 'yahtzee' | 'chance'; // Section inférieure

export type Scores = {
  [K in ScoreCategory]?: number;
};

export type Player = {
  id: string;
  name: string;
  scores: Scores;
};

export type GameState = {
  isStarted: boolean;
  players: Player[];
}; 