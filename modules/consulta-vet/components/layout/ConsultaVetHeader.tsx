import React from 'react';
import { Search, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../../utils/theme';

interface ConsultaVetHeaderProps {
  onMenuClick: () => void;
}

export function ConsultaVetHeader({ onMenuClick }: ConsultaVetHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md transition-colors md:px-8">
      <div className="flex flex-1 items-center gap-4">
        <button onClick={onMenuClick} className="flex h-11 w-11 items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden">
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar doenças, medicamentos e consensos..."
            className="w-full rounded-full border border-transparent bg-muted py-2 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
          aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          DR
        </div>
      </div>
    </header>
  );
}
