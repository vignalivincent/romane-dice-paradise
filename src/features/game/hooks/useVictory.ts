import { useState, useCallback, useMemo } from 'react';
import { Player } from '@/types/game';

interface UseVictoryProps {
  players: Player[];
  onNewGame: () => void;
}

interface PlayerScore {
  name: string;
  score: number;
}

export const useVictory = ({ players, onNewGame }: UseVictoryProps) => {
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);

  const isGameComplete = useMemo(() => {
    if (players.length === 0) return false;
    return players.every(player => 
      Object.values(player.scores).length === 13 && // 13 is the total number of categories
      Object.values(player.scores).every(score => score !== undefined)
    );
  }, [players]);

  const winner = useMemo(() => {
    if (!isGameComplete) return null;

    const playerWithScores: PlayerScore[] = players.map(player => ({
      name: player.name,
      score: Object.values(player.scores).reduce((sum, score) => sum + (score || 0), 0)
    }));

    return playerWithScores.reduce((max: PlayerScore | null, player) => 
      !max || player.score > max.score ? player : max
    , null);
  }, [players, isGameComplete]);

  const playersWithTotalScores = useMemo(() => 
    players.map(player => ({
      name: player.name,
      score: Object.values(player.scores).reduce((sum, score) => sum + (score || 0), 0)
    }))
  , [players]);

  const closeVictoryModal = useCallback(() => {
    setIsVictoryModalOpen(false);
    onNewGame();
  }, [onNewGame]);

  // Check if game is complete and show modal
  if (isGameComplete && winner && !isVictoryModalOpen) {
    setIsVictoryModalOpen(true);
  }

  return {
    isVictoryModalOpen,
    winner,
    playersWithTotalScores,
    closeVictoryModal
  };
}; 