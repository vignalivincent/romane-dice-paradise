import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { GameHistory, Player } from '@/types/game';

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameHistory: GameHistory[];
  currentPlayers: Player[];
}

export const RankingModal: FC<RankingModalProps> = ({
  isOpen,
  onClose,
  gameHistory,
  currentPlayers,
}) => {
  const { t } = useTranslation();

  // Récupérer les IDs des joueurs actuels
  const currentPlayerIds = currentPlayers.map(player => player.id);

  // Calculer les statistiques uniquement pour les joueurs actuels
  const playerStats = gameHistory.reduce((stats, game) => {
    game.players
      .filter(player => currentPlayerIds.includes(player.id))
      .forEach(player => {
        if (!stats[player.id]) {
          stats[player.id] = {
            name: player.name,
            victories: 0,
            totalScore: 0,
            gamesPlayed: 0,
            averageScore: 0,
          };
        }
        
        stats[player.id].totalScore += player.score;
        stats[player.id].gamesPlayed += 1;
        if (player.id === game.winnerId) {
          stats[player.id].victories += 1;
        }
        stats[player.id].averageScore = Math.round(stats[player.id].totalScore / stats[player.id].gamesPlayed);
      });
    return stats;
  }, {} as Record<string, {
    name: string;
    victories: number;
    totalScore: number;
    gamesPlayed: number;
    averageScore: number;
  }>);

  // S'assurer que tous les joueurs actuels sont inclus, même ceux sans historique
  currentPlayers.forEach(player => {
    if (!playerStats[player.id]) {
      playerStats[player.id] = {
        name: player.name,
        victories: 0,
        totalScore: 0,
        gamesPlayed: 0,
        averageScore: 0,
      };
    }
  });

  // Convertir en tableau et trier par nombre de victoires
  const sortedStats = Object.values(playerStats).sort((a, b) => 
    b.victories - a.victories || b.averageScore - a.averageScore
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent fullWidth className="space-y-6">
        <DialogTitle className="sr-only">
          {t('ranking.title')}
        </DialogTitle>
        <div className="text-center space-y-4">
          <div className="text-4xl">🏆</div>
          <h2 className="text-2xl font-bold text-purple-900">
            {t('ranking.title')}
          </h2>
        </div>

        <div className="space-y-4">
          {sortedStats.map((stats, index) => (
            <div
              key={stats.name}
              className="p-4 rounded-lg bg-purple-50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
                  </span>
                  <span className="font-bold text-lg text-purple-900">
                    {stats.name}
                  </span>
                </div>
                <span className="font-medium text-purple-700">
                  {stats.victories} {t('ranking.victories')}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-purple-600">
                  {t('ranking.gamesPlayed')}: <span className="font-medium">{stats.gamesPlayed}</span>
                </div>
                <div className="text-purple-600">
                  {t('ranking.averageScore')}: <span className="font-medium">{stats.averageScore}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-3 rounded-xl transition-colors"
        >
          {t('common.close')}
        </button>
      </DialogContent>
    </Dialog>
  );
}; 