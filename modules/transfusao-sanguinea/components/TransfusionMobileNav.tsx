import React from 'react';
import { Menu } from 'lucide-react';
import { titleForTransfusionPage, type TransfusionPage } from '../navConfig';

interface TransfusionMobileNavProps {
  activeKey: TransfusionPage;
  onOpenMobileMenu: () => void;
}

export const TransfusionMobileNav: React.FC<TransfusionMobileNavProps> = ({ 
  activeKey, 
  onOpenMobileMenu 
}) => {
  return (
    <header className="sticky top-0 z-30 flex md:hidden items-center justify-between px-4 py-3 bg-card border-b border-border/80 text-foreground shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-red-500/20 active:scale-95 transition-all"
          aria-label="Abrir menu de hemoterapia"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-sm font-bold tracking-tight text-foreground select-none">
          {titleForTransfusionPage(activeKey)}
        </span>
      </div>

      <div className="flex items-center">
        <span className="h-8 w-8 rounded-lg flex items-center justify-center bg-red-500/10 text-base font-bold select-none">
          🩸
        </span>
      </div>
    </header>
  );
};

TransfusionMobileNav.displayName = 'TransfusionMobileNav';
export default TransfusionMobileNav;
