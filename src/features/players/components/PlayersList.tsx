import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '@/features/game/store/gameStore';
import { InfoMessage } from '@/components/ui/InfoMessage';
import { AddPlayerForm } from './AddPlayerForm';
import { PlayerCard } from './PlayerCard';

export const PlayersList: FC = () => {
  const { t } = useTranslation();
  const { players, addPlayer, removePlayer, isStarted } = useGameStore();

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex flex-col gap-4">
        <AddPlayerForm
          onAdd={addPlayer}
          disabled={isStarted}
          placeholder={t('players.input.placeholder')}
          addLabel={t('players.actions.add')}
        />

        <div className="flex-1 grid content-start gap-3 min-h-0 overflow-y-auto pr-1 lg:pr-2">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onRemove={removePlayer}
              disabled={isStarted}
              removeLabel={t('players.actions.remove')}
            />
          ))}

          {players.length === 0 && (
            <div className="flex items-center justify-center h-[40vh] lg:h-[50vh]">
              <InfoMessage withSparkles>
                {t('players.status.empty')}
              </InfoMessage>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 