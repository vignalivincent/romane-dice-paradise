import { FC } from 'react';
import { Player } from '@/types/game';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayersHeaderProps {
  players: Player[];
  currentPlayerId: string | null;
  leadingPlayerId: string | null;
}

export const PlayersHeader: FC<PlayersHeaderProps> = ({
  players,
  currentPlayerId,
  leadingPlayerId,
}) => {
  const shouldCollapse = players.length > 4;
  const shouldTruncate = players.length >= 6;
  const totalScore = (player: Player) => Object.values(player.scores).reduce((sum, score) => sum + (score || 0), 0);

  const truncateName = (name: string): string => {
    if (!shouldTruncate) return name;
    return name.length > 7 ? `${name.slice(0, 7)}.` : name;
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: `${shouldCollapse ? '60px' : '100px'} minmax(0, 1fr)` }}>
      <div /> {/* Espace pour aligner avec les catégories */}
      <div className="grid gap-x-1 w-full" style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
        {players.map((player) => {
          const isLeading = player.id === leadingPlayerId;
          const isCurrentPlayer = player.id === currentPlayerId;

          return (
            <div key={player.id} className="relative min-w-0">
              <div className={`
                flex flex-col items-center justify-center 
                ${shouldCollapse ? 'h-14 py-1.5' : 'h-16 py-2'} 
                bg-white/5 rounded-lg px-0.5
                ${isCurrentPlayer ? 'bg-white/10' : ''}
              `}>
                {isLeading && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-purple-400">
                    <Crown className="w-5 h-5 text-yellow-400" />
                  </div>
                )}
                <div className={cn(
                  "font-semibold text-center w-full px-1 leading-tight",
                  shouldCollapse ? "text-[10px] mt-4" : "text-xs mt-5",
                  isCurrentPlayer ? "text-purple-900" : "text-purple-700"
                )}>
                  {truncateName(player.name)}
                </div>
                <div className={cn(
                  "font-medium mt-0.5 w-full text-center px-1",
                  shouldCollapse ? "text-[10px]" : "text-xs",
                  isCurrentPlayer ? "text-purple-800" : "text-purple-600"
                )}>
                  {totalScore(player)} pts
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 