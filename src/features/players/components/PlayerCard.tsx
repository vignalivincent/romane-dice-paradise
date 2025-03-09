import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Player } from '@/types/game';
import { t } from 'i18next';

interface PlayerCardProps {
  player: Player;
  onRemove: (id: string) => void;
}

export const PlayerCard: FC<PlayerCardProps> = ({ player, onRemove }) => (
  <Card className="w-full p-4 sm:p-5 flex justify-between items-center bg-white/80 border-purple-100 hover:bg-white/90 transition-all shadow-md hover:shadow-lg">
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <span className="font-bold truncate text-purple-950 text-base lg:text-lg">{player.name}</span>
    </div>
    <Button
      variant="destructive"
      size="sm"
      onClick={() => onRemove(player.id)}
      className="shrink-0 ml-4 bg-red-500/90 hover:bg-red-500 text-white font-semibold h-10 px-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50">
      {t('players.actions.remove')}
    </Button>
  </Card>
);
