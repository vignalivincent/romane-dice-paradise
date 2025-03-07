import { FC } from 'react';
import { ScoreCategory } from '@/types/game';
import { ChanceInput } from './ChanceInput';
import { ScoreGrid } from './ScoreGrid';
import { AdditionalScoreGrid } from './AdditionalScoreGrid';
import { ModalHeader } from './ModalHeader';
import { useScoreModal } from '../../hooks/useScoreModal';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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
    handleAdditionalScoreSelect,
    possibleScores,
    additionalScores,
    baseScore,
    needsAdditionalScore,
  } = useScoreModal(props);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent fullWidth className="space-y-6">
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
        ) : needsAdditionalScore ? (
          <AdditionalScoreGrid
            scores={additionalScores}
            onSelect={handleAdditionalScoreSelect}
            onCancel={() => handleBarrer()}
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