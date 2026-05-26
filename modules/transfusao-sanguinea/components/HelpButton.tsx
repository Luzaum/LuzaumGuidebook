import React from 'react';
import { HelpCircle } from 'lucide-react';

interface HelpButtonProps {
  term: string;
  onOpenModal: (term: string) => void;
  className?: string;
}

export const HelpButton: React.FC<HelpButtonProps> = React.memo(({ term, onOpenModal, className }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onOpenModal(term);
      }}
      className={`inline-flex items-center justify-center ml-1.5 p-1 rounded-full 
                 text-red-500 bg-red-500/10 hover:bg-red-500/20 active:scale-95
                 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 
                 cursor-pointer ${className}`}
      title="Saiba mais"
    >
      <HelpCircle className="h-4 w-4 stroke-[2.5]" />
    </button>
  );
});

HelpButton.displayName = 'HelpButton';
export default HelpButton;
