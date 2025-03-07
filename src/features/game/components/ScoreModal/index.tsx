import { FC } from 'react';
import { ScoreCategory } from '@/types/game';
import { ChanceInput } from './ChanceInput';
import { ScoreGrid } from './ScoreGrid';
import { ModalHeader } from './ModalHeader';
import { useScoreModal } from '../../hooks/useScoreModal';

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (score: number) => void;
  category: {
    id: ScoreCategory;
    name: string;
    description: string;
  };
}

export const ScoreModal: FC<ScoreModalProps> = (props) => {
  const {
    chanceValue,
    setChanceValue,
    handleChanceSubmit,
    handleBarrer,
    handleScoreSelect,
    possibleScores,
  } = useScoreModal(props);

  if (!props.isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex h-screen w-screen items-center justify-center p-4 z-50 bg-black/40"
      onClick={props.onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-6 transform transition-all relative"
        onClick={e => e.stopPropagation()}
      >
        <ModalHeader
          title={props.category.name}
          description={props.category.description}
          onClose={props.onClose}
        />

        {props.category.id === 'chance' ? (
          <ChanceInput
            value={chanceValue}
            onChange={setChanceValue}
            onSubmit={handleChanceSubmit}
            onBarrer={handleBarrer}
          />
        ) : (
          <ScoreGrid
            scores={possibleScores}
            onSelect={handleScoreSelect}
            onBarrer={handleBarrer}
          />
        )}
      </div>
    </div>
  );
}; 