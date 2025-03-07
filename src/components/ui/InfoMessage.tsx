import { FC, ReactNode } from 'react';

interface InfoMessageProps {
  children: ReactNode;
  icon?: ReactNode;
  withSparkles?: boolean;
}

export const InfoMessage: FC<InfoMessageProps> = ({ children, icon, withSparkles = false }) => (
  <div className="flex items-center justify-center gap-3 px-6 py-4 bg-red-100/20 backdrop-blur-sm border border-red-200/30 rounded-2xl">
    {icon}
    {withSparkles && <span className="opacity-75">✨</span>}
    <span className="text-white font-medium text-sm lg:text-base">
      {children}
    </span>
    {withSparkles && <span className="opacity-75">✨</span>}
  </div>
); 