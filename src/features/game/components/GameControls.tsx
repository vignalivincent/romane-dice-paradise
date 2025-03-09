import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { InfoMessage } from '@/components/ui/InfoMessage';
import { usePlayers } from '../store/gameStore';
import { useGame } from '../store/gameStore';
import { useToast } from '@/components/ui/use-toast';

export const GameControls: FC = () => {
  const { t } = useTranslation();
  const { players } = usePlayers();
  const { hasStarted, doEndGame, doStartGame } = useGame();
  const { toast } = useToast();
  const hasEnoughPlayers = players.length >= 2;

  const handleStartGame = () => {
    doStartGame();
    toast({
      variant: 'primary',
      description: 'Que le meilleure gagne ! 🏆',
      className: 'text-xl font-bold',
    });
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex flex-col gap-4">
        <Button
          onClick={hasStarted ? doEndGame : handleStartGame}
          disabled={!hasEnoughPlayers && !hasStarted}
          className={`w-full text-white font-semibold text-base lg:text-lg h-12 sm:h-14 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 ${
            hasStarted ? 'bg-amber-600/90 hover:bg-amber-600' : 'bg-emerald-600/90 hover:bg-emerald-600'
          }`}>
          {hasStarted ? `${t('game.controls.end')} 🎲` : `${t('game.controls.start')} ✨`}
        </Button>
        {!hasEnoughPlayers && !hasStarted && <InfoMessage>{t('game.controls.minPlayers')}</InfoMessage>}
      </div>
    </div>
  );
};
