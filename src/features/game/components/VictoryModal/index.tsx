import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: {
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex h-screen w-screen items-center justify-center p-4 z-50 backdrop-blur-sm bg-black/30"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-lg p-6 space-y-6 transform transition-all relative border border-white/20"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🏆</div>
          <h2 className="text-3xl font-bold text-purple-900">
            {t('victory.congratulations')}
          </h2>
          <p className="text-xl text-purple-600">
            {winner.name} {t('victory.wins')} !
          </p>
          <p className="text-2xl font-bold text-purple-900">
            {winner.score} {t('victory.points')}
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
      </div>
    </div>
  );
}; 