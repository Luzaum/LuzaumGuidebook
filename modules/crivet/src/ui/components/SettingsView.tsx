import React from 'react';
import { Settings, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { PageHeader } from './PageHeader';
import { cn } from '../lib/utils';

export const SettingsView: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { id: 'light' as const, label: 'Claro', icon: Sun },
    { id: 'dark' as const, label: 'Escuro', icon: Moon },
    { id: 'system' as const, label: 'Sistema', icon: Monitor },
  ];

  return (
    <div className="mx-auto w-full max-w-lg">
      <PageHeader
        icon={Settings}
        title="Configurações"
        description="Preferências de aparência do app"
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Tema</h3>
        <div className="grid grid-cols-3 gap-2">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = theme === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setTheme(option.id)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border py-4 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-300'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400',
                )}
              >
                <Icon className="h-5 w-5" />
                {option.label}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          A preferência é salva automaticamente neste dispositivo.
        </p>
      </div>
    </div>
  );
};
