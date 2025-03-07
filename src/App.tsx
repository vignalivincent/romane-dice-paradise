import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PlayersList } from '@/features/players/components/PlayersList';
import { GameControls } from '@/features/game/components/GameControls';
import { ScoreBoard } from '@/features/game/components/ScoreBoard';
import { Toaster } from '@/components/ui/toaster';
import { useGameStore } from '@/features/game/store/gameStore';
import '@/i18n';

const App: FC = () => {
  const { t } = useTranslation();
  const { isStarted } = useGameStore();

  return (
    <div className="min-h-screen w-screen overflow-x-hidden flex flex-col bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
      <main className="flex-1 flex flex-col w-full p-4 sm:p-6 md:p-8">
        <div className="mx-auto w-full max-w-5xl flex flex-col flex-1">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] tracking-tight">
              🎲 {t('app.title')} 🎲
            </h1>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] mt-3 italic">
              {t('app.subtitle')} ✨
            </p>
          </div>
          
          {!isStarted ? (
            <div className="flex flex-col flex-1 gap-6">
              <div className="backdrop-blur-md bg-white/40 rounded-xl p-4 sm:p-6 shadow-xl ring-1 ring-white/50 flex flex-col">
                <PlayersList />
              </div>
              
              <div className="backdrop-blur-md bg-white/40 rounded-xl p-4 sm:p-6 shadow-xl ring-1 ring-white/50 flex flex-col mt-auto">
                <GameControls />
              </div>
            </div>
          ) : (
            <div className="flex-1 backdrop-blur-md bg-white/40 rounded-xl p-4 sm:p-6 shadow-xl ring-1 ring-white/50">
              <ScoreBoard />
            </div>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default App;
