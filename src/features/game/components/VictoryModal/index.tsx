import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

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
        <DialogTitle className="sr-only">
          {t('victory.title')} - {actualWinner.name}
        </DialogTitle>
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🏆</div>
          <h2 className="text-3xl font-bold text-purple-900">
            {t('victory.title')}
          </h2>
          <p className="text-xl text-purple-600">
            <b> {actualWinner.name}</b> {t('victory.winner')}
          </p>
          <div className="inline-block border-2 border-purple-900 rounded-lg px-4 py-2">
            <p className="text-2xl font-bold text-purple-900">
              {actualWinner.score} {t('victory.points')}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-purple-900">
            {t('victory.scores')}
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
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-colors text-xl shadow-md hover:shadow-lg border-2 border-purple-400"
        >
          {t('victory.actions.newGame')}
        </button>
      </DialogContent>
    </Dialog>
  );
}; 