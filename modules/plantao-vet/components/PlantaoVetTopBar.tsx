import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, ChevronDown, Menu, Moon, Sun } from 'lucide-react';

import { useTheme } from '@/utils/theme';

import { formatDateLong, SHIFT_WINDOW_LABELS, SHIFT_TYPE_LABELS } from '../lib/shifts';
import { getActiveShift, usePlantaoVetSnapshot } from '../store/selectors';
import { ShiftSelectorModal } from './ShiftSelectorModal';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface PlantaoVetTopBarProps {
  clinicName: string | null;
  onMenuClick: () => void;
}

export function PlantaoVetTopBar({ clinicName, onMenuClick }: PlantaoVetTopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const snapshot = usePlantaoVetSnapshot();
  const [selectorOpen, setSelectorOpen] = useState(false);
  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);

  useEffect(() => {
    function handleOpenShiftSelector() {
      setSelectorOpen(true);
    }

    window.addEventListener('plantao-vet:open-shift-selector', handleOpenShiftSelector);

    return () => {
      window.removeEventListener('plantao-vet:open-shift-selector', handleOpenShiftSelector);
    };
  }, []);

  return (
    <>
      <header className="plantao-vet-topbar">
        <div className="plantao-vet-content flex items-center gap-3 py-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Abrir menu">
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
            <Button
              variant="outline"
              className="h-11 min-w-[260px] justify-between rounded-xl px-4"
              onClick={() => setSelectorOpen(true)}
            >
              <span className="flex min-w-0 items-center gap-3">
                <Calendar className="h-4 w-4 shrink-0 text-[var(--pv-primary)]" />
                <span className="min-w-0 truncate text-left">
                  {activeShift ? (
                    <>
                      {formatDateLong(activeShift.dateISO)} • {SHIFT_TYPE_LABELS[activeShift.shiftType]}
                    </>
                  ) : (
                    'Nenhum plantao ativo'
                  )}
                </span>
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-[var(--pv-text-muted)]" />
            </Button>

            {activeShift ? (
              <Badge variant="outline" className="px-3 py-1">
                {SHIFT_WINDOW_LABELS[activeShift.shiftType]}
              </Badge>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden text-right md:block">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--pv-text-muted)]">
                Clinica ativa
              </p>
              <p className="max-w-[220px] truncate text-sm font-medium text-[var(--pv-text-main)]">
                {clinicName || 'Nao identificada'}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <ShiftSelectorModal open={selectorOpen} onClose={() => setSelectorOpen(false)} />
    </>
  );
}
