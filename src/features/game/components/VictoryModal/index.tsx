import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner?: {
    name: string;
    score: number;
  };
  players: {
    name: string;
    score: number;
  }[];
}

export const VictoryModal: FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  winner,
  players,
}) => {
  const { t } = useTranslation();

  // Si pas de gagnant, on prend le joueur avec le plus haut score
  const actualWinner = winner || players.reduce((prev, current) => 
    (current.score > prev.score) ? current : prev
  , players[0]);

  if (!actualWinner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent fullWidth className="space-y-6">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🏆</div>
          <h2 className="text-3xl font-bold text-purple-900">
            {t('victory.congratulations')}
          </h2>
          <p className="text-xl text-purple-600">
            {actualWinner.name} {t('victory.wins')} !
          </p>
          <p className="text-2xl font-bold text-purple-900">
            {actualWinner.score} {t('victory.points')}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-purple-900">
            {t('victory.finalScores')}:
          </h3>
          <div className="space-y-2">
            {players
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <div
                  key={player.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-purple-50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
                    </span>
                    <span className="font-medium text-purple-900">
                      {player.name}
                    </span>
                  </div>
                  <span className="font-bold text-purple-900">
                    {player.score}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-4 rounded-xl transition-colors text-xl shadow-sm hover:shadow-md"
        >
          {t('victory.newGame')}
        </button>
      </DialogContent>
    </Dialog>
  );
}; 