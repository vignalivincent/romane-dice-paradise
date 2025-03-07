import { FC, useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateBarbaName } from '@/utils/nameGenerator';
import { useGameStore } from '@/features/game/store/gameStore';

interface AddPlayerFormProps {
  onAdd: (name: string) => void;
  disabled: boolean;
  placeholder: string;
  addLabel: string;
}

export const AddPlayerForm: FC<AddPlayerFormProps> = ({
  onAdd,
  disabled,
  placeholder,
  addLabel,
}) => {
  const [name, setName] = useState('');
  const canAddPlayer = useGameStore(state => state.canAddPlayer);

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const generateRandomName = () => {
    setName(generateBarbaName());
  };

  const isDisabled = disabled || !canAddPlayer();

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="flex-1 flex gap-2">
        <Input
          placeholder={placeholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isDisabled}
          className="flex-1 bg-white/80 border-purple-200 placeholder:text-purple-900/50 text-purple-950 font-medium text-base lg:text-lg h-12 sm:h-14 rounded-lg focus:ring-2 focus:ring-purple-500/50"
        />
        <Button
          onClick={generateRandomName}
          disabled={isDisabled}
          className="shrink-0 bg-purple-500/90 hover:bg-purple-500 text-white w-12 sm:w-14 h-12 sm:h-14 rounded-lg flex items-center justify-center"
        >
          🎲
        </Button>
      </div>
      <Button 
        onClick={handleAdd} 
        disabled={isDisabled || !name.trim()}
        className="w-full sm:w-40 bg-purple-600/90 hover:bg-purple-600 text-white font-semibold text-base lg:text-lg h-12 sm:h-14 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        {addLabel}
      </Button>
    </div>
  );
}; 