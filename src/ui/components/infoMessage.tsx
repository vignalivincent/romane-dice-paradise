import { FC, ReactNode } from 'react';

interface InfoMessageProps {
  children: ReactNode;
  icon?: ReactNode;
  withSparkles?: boolean;
}

export const InfoMessage: FC<InfoMessageProps> = ({ children, icon, withSparkles = false }) => (
  <div className="flex items-center justify-center gap-3 px-6 py-4 border border-red-400 border-dotted  backdrop-blur-sm rounded-2xl">
    {icon}
    {withSparkles && <span className="opacity-75">✨</span>}
    <span className="text-red-500 text-xs font-normal lg:text-base">{children}</span>
    {withSparkles && <span className="opacity-75">✨</span>}
  </div>
);
