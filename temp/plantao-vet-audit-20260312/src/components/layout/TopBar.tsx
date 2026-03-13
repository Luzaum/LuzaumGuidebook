import React, { useState } from 'react';
import { useAppStore } from '@/store/patientStore';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronDown, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ShiftSelectorModal } from './ShiftSelectorModal';

export function TopBar() {
  const { activeShiftId, shifts } = useAppStore();
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const activeShift = shifts.find(s => s.id === activeShiftId);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md px-6">
        <div className="flex-1 flex items-center gap-4">
          <Button 
            variant="outline" 
            className="gap-2 border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] shadow-sm"
            onClick={() => setIsSelectorOpen(true)}
          >
            <CalendarIcon className="w-4 h-4 text-[var(--primary)]" />
            {activeShift ? (
              <span className="font-medium">
                {format(parseISO(activeShift.dateISO), "dd MMM yyyy", { locale: ptBR })} • <span className="capitalize">{activeShift.shiftType}</span>
              </span>
            ) : (
              <span className="font-medium text-[var(--text-muted)]">Nenhum plantão ativo</span>
            )}
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)] ml-2" />
          </Button>

          {activeShift && (
            <div className="hidden md:flex items-center gap-2">
              <div className={`p-1.5 rounded-md ${activeShift.shiftType === 'diurno' ? 'bg-[var(--accent-yellow)]/10 text-[var(--accent-yellow)]' : 'bg-[var(--primary)]/10 text-[var(--primary)]'}`}>
                {activeShift.shiftType === 'diurno' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </div>
              <span className="text-sm font-medium text-[var(--text-muted)]">
                {activeShift.shiftType === 'diurno' ? '07:00 - 19:00' : '19:00 - 07:00'}
              </span>
            </div>
          )}
        </div>
      </header>

      <ShiftSelectorModal 
        isOpen={isSelectorOpen} 
        onClose={() => setIsSelectorOpen(false)} 
      />
    </>
  );
}
