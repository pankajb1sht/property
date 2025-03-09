
import React from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  onClick: () => void;
  className?: string;
  active?: boolean;
  children: React.ReactNode;
  activeClassName?: string;
}

const ActionButton = ({
  onClick,
  className,
  active = false,
  children,
  activeClassName = ''
}: ActionButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        'glass-effect rounded-full p-2 transition-all duration-300 hover:scale-110 focus:outline-none',
        className,
        active && activeClassName
      )}
    >
      {children}
    </button>
  );
};

export default ActionButton;
