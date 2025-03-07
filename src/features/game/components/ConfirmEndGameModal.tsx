import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ConfirmEndGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmEndGameModal: FC<ConfirmEndGameModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex h-screen w-screen items-center justify-center p-4 z-50 backdrop-blur-sm bg-black/30"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 space-y-6 transform transition-all relative border border-white/20"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center space-y-4">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600">
            {t('game.endGame.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('game.endGame.description')}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-xl transition-colors text-lg"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-colors text-lg"
          >
            {t('common.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}; 