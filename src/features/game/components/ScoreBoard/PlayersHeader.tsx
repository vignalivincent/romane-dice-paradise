import { FC } from 'react';
import { Player } from '@/types/game';
import { Crown, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayersHeaderProps {
  players: Player[];
  currentPlayerId: string | null;
  leadingPlayerId: string | null;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const PlayersHeader: FC<PlayersHeaderProps> = ({
  players,
  currentPlayerId,
  leadingPlayerId,
  isExpanded,
  onToggleExpand,
}) => {
  const shouldTruncate = players.length >= 5;
  const shouldTruncateShort = players.length === 6;
  const totalScore = (player: Player) => Object.values(player.scores).reduce((sum, score) => sum + (score || 0), 0);

  const truncateName = (name: string): string => {
    if (!shouldTruncate) return name;
    if (shouldTruncateShort) {
      return name.length > 5 ? `${name.slice(0, 5)}.` : name;
    }
    return name.length > 6 ? `${name.slice(0, 6)}.` : name;
  };

  return (
    <div className="grid gap-x-2" style={{ gridTemplateColumns: '44px minmax(0, 1fr)' }}>
      <button 
        onClick={onToggleExpand}
        className={cn(
          "h-12 w-12 flex items-center justify-center rounded-lg transition-all duration-200 overflow-hidden",
          "backdrop-blur-sm border-2 shadow-lg",
          isExpanded 
            ? "bg-purple-500/90 text-white border-purple-400 hover:bg-purple-500" 
            : "bg-purple-400/10 text-purple-400 hover:bg-purple-400/20 border-purple-400/50"
        )}
        title={isExpanded ? "Masquer les détails" : "Afficher les détails"}
      >
        <div className="-m-1">
          {isExpanded ? (
            <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
          ) : (
            <ChevronRight className="w-6 h-6 stroke-[1.5]" />
          )}
        </div>
      </button>
      <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
        {players.map((player) => {
          const isLeading = player.id === leadingPlayerId;
          const isCurrentPlayer = player.id === currentPlayerId;

          return (
            <div key={player.id} className="relative min-w-0">
              <div className={`
                flex flex-col items-center justify-center h-12
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
                  "text-xs mt-5",
                  isCurrentPlayer ? "text-purple-900" : "text-purple-700"
                )}>
                  {truncateName(player.name)}
                </div>
                <div className={cn(
                  "font-medium mt-0.5 w-full text-center px-1",
                  "text-xs",
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