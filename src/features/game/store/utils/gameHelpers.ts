import { Player, GameHistory } from '@/types/game';

/**
 * Checks if the game is complete (all players have filled all score categories)
 */
export const isGameComplete = (players: Player[]): boolean => {
  if (players.length === 0) return false;

  return players.every(
    (player) =>
      Object.values(player.scores).length === 13 && // 13 is the total number of categories
      Object.values(player.scores).every((score) => score !== undefined)
  );
};

/**
 * Checks if there is game history available
 */
export const hasGameHistory = (gameHistory: GameHistory[]): boolean => {
  return gameHistory.length > 0;
};
