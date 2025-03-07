import { FC } from 'react';

interface ModalHeaderProps {
  title: string;
  description: string;
  onClose: () => void;
}

export const ModalHeader: FC<ModalHeaderProps> = ({
  title,
  description,
  onClose,
}) => {
  return (
    <>
      <button
        onClick={onClose}
        className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-red-500 hover:text-red-600 transition-colors text-2xl"
      >
        ✕
      </button>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-purple-900">{title}</h3>
        <p className="text-purple-600">{description}</p>
      </div>
    </>
  );
}; 