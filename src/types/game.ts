export type UpperCategory = 'ones' | 'twos' | 'threes' | 'fours' | 'fives' | 'sixes';
export type LowerCategory = 'threeOfAKind' | 'fourOfAKind' | 'fullHouse' | 'smallStraight' | 'largeStraight' | 'yahtzee' | 'chance';
export type BonusCategory = 'bonus';
export type ScoreCategory = UpperCategory | LowerCategory | BonusCategory;

export enum SectionEnum {
  upper = 'upper',
  lower = 'lower',
}

export type ScoreState = 'crossed' | number | undefined;

export type ScoreCategoryUI = StandardScoreCategoryUI | BonusScoreCategoryUI;
interface BaseScoreCategoryUI {
  name: string;
  description: string;
  section: SectionEnum;
  icon: string;
  color: string;
}

interface StandardScoreCategoryUI extends BaseScoreCategoryUI {
  id: UpperCategory | LowerCategory;
  maxScore: number;
}

interface BonusScoreCategoryUI extends BaseScoreCategoryUI {
  id: BonusCategory;
}

interface BasePlayer {
  id: string;
  name: string;
}
interface PlayerLeaderBoard extends BasePlayer {
  score: number;
}

export interface Player extends BasePlayer {
  scores: Partial<Record<ScoreCategory, ScoreState>>;
}
export interface GameHistory {
  id: string;
  date: string;
  players: PlayerLeaderBoard[];
  winnerId: string;
}

export interface GameState {
  players: Player[];
  isStarted: boolean;
  gameHistory: GameHistory[];
}

export type Leaderboard = PlayerLeaderBoard[];
