import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/gameStore';

export const GameControls: FC = () => {
  const { t } = useTranslation();
  const { players, isStarted, startGame } = useGameStore();

  // Ensure this function only triggers state updates once
  const handleStartGame = () => {
    if (players.length < 2) return;
    if (!isStarted) {
      startGame();
    }
  };

  return (
    <div className="mb-8 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-white">{t('game.controls.title')}</h2>

      {players.length < 2 ? (
        <p className="text-white/70 mb-4">{t('game.controls.minPlayers')}</p>
      ) : (
        <button
          onClick={handleStartGame}
          disabled={isStarted}
          className={`
            w-full py-3 rounded-lg font-bold text-lg
            ${isStarted ? 'bg-gray-500/50 cursor-not-allowed text-white/50' : 'bg-purple-500 hover:bg-purple-600 text-white'}
          `}>
          {t('game.controls.start')}
        </button>
      )}
    </div>
  );
};
