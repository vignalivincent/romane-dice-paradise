import { FC } from 'react';
import { Player } from '@/types/game';

interface PlayersHeaderProps {
  players: Player[];
  leadingPlayerId?: string;
}

export const PlayersHeader: FC<PlayersHeaderProps> = ({ players, leadingPlayerId }) => (
  <div className="grid" style={{ gridTemplateColumns: `160px minmax(0, 1fr)` }}>
    <div className="h-10 flex items-center font-bold text-sm text-white px-2">
      Catégories
    </div>
    <div className="grid" style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
      {players.map(player => (
        <div
          key={player.id}
          className="flex items-center justify-center gap-1 text-white px-0.5"
        >
          <span className="font-bold text-sm truncate">
            {player.name}
          </span>
          {player.id === leadingPlayerId && (
            <span className="text-yellow-400 text-lg">👑</span>
          )}
        </div>
      ))}
    </div>
  </div>
); 