import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@/ui/components/dialog';
import { PlayerStatCard } from './PlayerStatCard';
import { useHistory } from '@/store/gameStore';

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RankingModal: FC<RankingModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { getSortedPlayerStats } = useHistory();

  const playerStats = getSortedPlayerStats();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-6 w-[90vw] max-w-[400px]">
        <DialogTitle className="sr-only">{t('ranking.title')}</DialogTitle>
        <div className="text-center space-y-4">
          <div className="text-4xl">🏆</div>
          <h2 className="text-xl font-bold text-purple-900">{t('ranking.title')}</h2>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {playerStats.map((stats, index) => (
            <PlayerStatCard
              key={stats.name}
              name={stats.name}
              wins={stats.wins}
              gamesPlayed={stats.gamesPlayed}
              averageScore={stats.averageScore}
              rank={index}
            />
          ))}

          {playerStats.length === 0 && <div className="text-center text-gray-500 py-4">{t('ranking.noGamesPlayed')}</div>}
        </div>

        <button onClick={onClose} className="w-full bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-3 rounded-xl transition-colors">
          {t('common.close')}
        </button>
      </DialogContent>
    </Dialog>
  );
};
