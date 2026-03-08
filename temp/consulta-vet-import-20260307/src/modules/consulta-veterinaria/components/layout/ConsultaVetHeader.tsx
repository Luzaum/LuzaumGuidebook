import React, { useEffect, useState } from 'react';
import { Search, Menu, Moon, Sun } from 'lucide-react';

interface ConsultaVetHeaderProps {
  onMenuClick: () => void;
}

export function ConsultaVetHeader({ onMenuClick }: ConsultaVetHeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark') || 
                       localStorage.getItem('theme') === 'dark';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const newIsDark = !prev;
      if (newIsDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newIsDark;
    });
  };

  return (
    <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-8 shrink-0 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-md">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar doenças, medicamentos, consensos..."
            className="w-full pl-10 pr-4 py-2 bg-muted border-transparent rounded-full text-sm focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
          DR
        </div>
      </div>
    </header>
  );
}
