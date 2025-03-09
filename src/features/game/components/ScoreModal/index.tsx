import { FC } from 'react';
import { ChanceInput } from './ChanceInput';
import { ScoreGrid } from './ScoreGrid';
import { ModalHeader } from './ModalHeader';
import { useScoreModal } from '../../hooks/useScoreModal';
import { Dialog, DialogContent, DialogTitle } from '@/ui/components/dialog';
import { Player, ScoreCategoryUI } from '@/types/game'; // Correct import of ScoreState

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ScoreCategoryUI;
  player: Player;
  onYahtzee: () => void;
}

export const ScoreModal: FC<ScoreModalProps> = ({ player, category, isOpen, onClose, onYahtzee }) => {
  const { name } = player;
  const { chanceValue, setChanceValue, handleChanceSubmit, handleCrossOut, handleScoreSelect, possibleScores, handleReset } = useScoreModal({
    isOpen,
    onClose,
    category: category.id,
    player,
    onYahtzee,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent fullWidth className="space-y-6">
        <DialogTitle className="sr-only">
          Score pour {category.name} - {name}
        </DialogTitle>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-full shadow-lg border-2 border-white/30 font-bold text-lg text-center">
            {name}
          </div>
          <ModalHeader title={category.name} description={category.description} onClose={onClose} />
        </div>

        {category.id === 'chance' ? (
          <ChanceInput value={chanceValue} onChange={setChanceValue} onSubmit={handleChanceSubmit} onReset={handleReset} />
        ) : (
          <ScoreGrid scores={possibleScores} onSelect={handleScoreSelect} onBarrer={handleCrossOut} onReset={handleReset} />
        )}
      </DialogContent>
    </Dialog>
  );
};
