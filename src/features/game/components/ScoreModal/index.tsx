import { FC } from 'react';
import { ScoreCategory } from '@/types/game';
import { ChanceInput } from './ChanceInput';
import { ScoreGrid } from './ScoreGrid';
import { AdditionalScoreGrid } from './AdditionalScoreGrid';
import { ModalHeader } from './ModalHeader';
import { useScoreModal } from '../../hooks/useScoreModal';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (score: number) => void;
  category: {
    id: ScoreCategory;
    name: string;
    description: string;
  };
  playerName: string;
}

export const ScoreModal: FC<ScoreModalProps> = (props) => {
  const {
    chanceValue,
    setChanceValue,
    handleChanceSubmit,
    handleBarrer,
    handleScoreSelect,
    handleAdditionalScoreSelect,
    possibleScores,
    additionalScores,
    baseScore,
    needsAdditionalScore,
  } = useScoreModal(props);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent fullWidth className="space-y-6">
        <DialogTitle className="sr-only">
          Score pour {props.category.name} - {props.playerName}
        </DialogTitle>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-full shadow-lg border-2 border-white/30 font-bold text-lg text-center">
            {props.playerName}
          </div>
          <ModalHeader
            title={props.category.name}
            description={props.category.description}
            onClose={props.onClose}
          />
        </div>

        {props.category.id === 'chance' ? (
          <ChanceInput
            value={chanceValue}
            onChange={setChanceValue}
            onSubmit={handleChanceSubmit}
            onBarrer={handleBarrer}
          />
        ) : needsAdditionalScore ? (
          <AdditionalScoreGrid
            scores={additionalScores}
            onSelect={handleAdditionalScoreSelect}
            baseScore={baseScore!}
            category={props.category.id}
          />
        ) : (
          <ScoreGrid
            scores={possibleScores}
            onSelect={handleScoreSelect}
            onBarrer={handleBarrer}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}; 