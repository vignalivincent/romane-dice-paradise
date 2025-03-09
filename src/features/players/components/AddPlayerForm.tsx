import { FC, useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { generateBarbaName } from '@/utils/nameGenerator';
import { usePlayers } from '@/features/game/store/gameStore';
import { t } from 'i18next';
interface AddPlayerFormProps {
  onAdd: (name: string) => boolean;
}

const MAX_NAME_LENGTH = 10;

export const AddPlayerForm: FC<AddPlayerFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const { canAddPlayer } = usePlayers();
  const { toast } = useToast();

  const handleAdd = () => {
    if (name.trim()) {
      const success = onAdd(name.trim());
      if (!success) {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Un joueur avec ce nom existe déjà',
        });
      } else {
        toast({
          variant: 'default',
          title: 'Succès',
          description: 'Le joueur a été ajouté',
        });
        setName('');
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_NAME_LENGTH) {
      setName(value);
    }
  };

  const generateRandomName = () => {
    setName(generateBarbaName());
  };

  const isDisabled = !canAddPlayer;
  const placeholder = t('players.input.placeholder');
  const addLabel = t('players.actions.add');
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="flex-1 flex gap-2">
        <Input
          placeholder={`${placeholder} (max ${MAX_NAME_LENGTH} caractères)`}
          value={name}
          onChange={handleNameChange}
          onKeyPress={handleKeyPress}
          disabled={isDisabled}
          maxLength={MAX_NAME_LENGTH}
          className="flex-1 bg-white/80 border-purple-200 placeholder:text-purple-900/50 text-purple-950 font-medium text-base lg:text-lg h-12 sm:h-14 rounded-lg focus:ring-2 focus:ring-purple-500/50"
        />
        <Button
          onClick={generateRandomName}
          disabled={isDisabled}
          className="shrink-0 bg-purple-500/90 hover:bg-purple-500 text-white w-12 sm:w-14 h-12 sm:h-14 rounded-lg flex items-center justify-center">
          🎲
        </Button>
      </div>
      <Button
        onClick={handleAdd}
        disabled={isDisabled || !name.trim()}
        className="w-full sm:w-40 bg-purple-600/90 hover:bg-purple-600 text-white font-semibold text-base lg:text-lg h-12 sm:h-14 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50">
        {addLabel}
      </Button>
    </div>
  );
};
