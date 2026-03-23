import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const applyTheme = (nextTheme: Theme) => {
    localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const syncFromStorage = (event: StorageEvent) => {
      if (event.key !== storageKey || !event.newValue) return;
      setTheme(event.newValue as Theme);
    };

    const syncFromParent = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== 'VETIUS_THEME') return;

      const nextTheme = event.data.theme;
      if (nextTheme === 'light' || nextTheme === 'dark') {
        applyTheme(nextTheme);
      }
    };

    window.addEventListener('storage', syncFromStorage);
    window.addEventListener('message', syncFromParent);

    return () => {
      window.removeEventListener('storage', syncFromStorage);
      window.removeEventListener('message', syncFromParent);
    };
  }, [storageKey]);

  const value = {
    theme,
    setTheme: applyTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
