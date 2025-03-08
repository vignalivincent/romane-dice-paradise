import { FC } from 'react';
import { ChanceInput } from './ChanceInput';
import { ScoreGrid } from './ScoreGrid';
import { ModalHeader } from './ModalHeader';
import { useScoreModal } from '../../hooks/useScoreModal';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ScoreCategory, ScoreState } from '@/types/game'; // Correct import of ScoreState

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScoreUpdate: (score: ScoreState) => void; // Single handler for all score states
  category: {
    id: ScoreCategory;
    name: string;
    description: string;
  };
  playerName: string;
}

export const ScoreModal: FC<ScoreModalProps> = (props) => {
  const { chanceValue, setChanceValue, handleChanceSubmit, handleCrossOut, handleScoreSelect, possibleScores, handleReset } = useScoreModal(props);

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
          <ModalHeader title={props.category.name} description={props.category.description} onClose={props.onClose} />
        </div>

        {props.category.id === 'chance' ? (
          <ChanceInput value={chanceValue} onChange={setChanceValue} onSubmit={handleChanceSubmit} onReset={handleReset} />
        ) : (
          <ScoreGrid scores={possibleScores} onSelect={handleScoreSelect} onBarrer={handleCrossOut} onReset={handleReset} />
        )}
      </DialogContent>
    </Dialog>
  );
};
