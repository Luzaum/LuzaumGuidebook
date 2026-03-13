import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Moon, Sun, X } from 'lucide-react';

import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { SHIFT_TYPE_LABELS, SHIFT_WINDOW_LABELS } from '../lib/shifts';
import {
  getActiveShift,
  getOrderedShifts,
  getShiftsByDate,
  usePlantaoVetSnapshot,
} from '../store/selectors';
import { usePlantaoVetStore } from '../store/usePlantaoVetStore';
import { ShiftType } from '../types';

const WEEKDAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, offset: number) {
  return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function toDateISO(date: Date) {
  return new Intl.DateTimeFormat('sv-SE').format(date);
}

function getCalendarDays(month: Date) {
  const firstDay = startOfMonth(month);
  const year = firstDay.getFullYear();
  const monthIndex = firstDay.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingBlanks = firstDay.getDay();
  const cells: Array<Date | null> = Array.from({ length: leadingBlanks }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, monthIndex, day));
  }

  return cells;
}

function isSameCalendarDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

interface ShiftSelectorModalProps {
  open: boolean;
  onClose: () => void;
}

export function ShiftSelectorModal({ open, onClose }: ShiftSelectorModalProps) {
  const snapshot = usePlantaoVetSnapshot();
  const createShift = usePlantaoVetStore((state) => state.createShift);
  const setActiveShift = usePlantaoVetStore((state) => state.setActiveShift);

  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);
  const orderedShifts = useMemo(() => getOrderedShifts(snapshot), [snapshot]);

  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(today));
  const [selectedDateISO, setSelectedDateISO] = useState(() => toDateISO(today));

  useEffect(() => {
    if (!open) {
      return;
    }

    const referenceDate = activeShift?.dateISO
      ? new Date(`${activeShift.dateISO}T12:00:00`)
      : new Date();

    setCurrentMonth(startOfMonth(referenceDate));
    setSelectedDateISO(toDateISO(referenceDate));
  }, [activeShift?.dateISO, open]);

  const shiftsOnSelectedDate = useMemo(
    () => getShiftsByDate(snapshot, selectedDateISO),
    [selectedDateISO, snapshot]
  );

  const monthDays = useMemo(() => getCalendarDays(currentMonth), [currentMonth]);

  function handleCreateShift(shiftType: ShiftType) {
    const createdShift = createShift({ dateISO: selectedDateISO, shiftType });
    setActiveShift(createdShift.id);
    onClose();
  }

  function handleSelectShift(shiftId: string) {
    setActiveShift(shiftId);
    onClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="plantao-vet-backdrop" onClick={onClose} aria-label="Fechar seletor de plantao" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            className="plantao-vet-modal relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl"
          >
            <div className="grid min-h-[560px] lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="border-b border-[var(--pv-border)] p-6 lg:border-b-0 lg:border-r">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold capitalize text-[var(--pv-text-main)]">
                      {getMonthLabel(currentMonth)}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                      Selecione um dia para abrir ou criar um plantao.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-7 gap-2">
                  {WEEKDAY_LABELS.map((label) => (
                    <div
                      key={label}
                      className="px-2 py-2 text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--pv-text-muted)]"
                    >
                      {label}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {monthDays.map((day, index) => {
                    if (!day) {
                      return <div key={`blank-${index}`} className="h-16 rounded-xl" />;
                    }

                    const dateISO = toDateISO(day);
                    const dayShifts = orderedShifts.filter((shift) => shift.dateISO === dateISO);
                    const isSelected = selectedDateISO === dateISO;
                    const isToday = isSameCalendarDay(day, today);

                    return (
                      <button
                        key={dateISO}
                        type="button"
                        onClick={() => setSelectedDateISO(dateISO)}
                        className={[
                          'flex h-16 flex-col items-center justify-center rounded-xl border text-sm transition-colors',
                          isSelected
                            ? 'border-[var(--pv-primary)] bg-[var(--pv-primary)] text-white shadow-sm'
                            : 'border-transparent bg-[var(--pv-surface)] text-[var(--pv-text-main)] hover:bg-[var(--pv-surface-hover)]',
                          isToday && !isSelected ? 'ring-1 ring-[var(--pv-primary)]/40' : '',
                        ].join(' ')}
                      >
                        <span className="font-medium">{day.getDate()}</span>
                        <span className="mt-1 flex gap-1">
                          {dayShifts.slice(0, 2).map((shift) => (
                            <span
                              key={shift.id}
                              className={[
                                'h-1.5 w-1.5 rounded-full',
                                isSelected
                                  ? 'bg-white'
                                  : shift.shiftType === 'diurno'
                                    ? 'bg-[var(--pv-accent-yellow)]'
                                    : 'bg-[var(--pv-primary)]',
                              ].join(' ')}
                            />
                          ))}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col bg-[var(--pv-surface-hover)]/45 p-6">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold capitalize text-[var(--pv-text-main)]">
                      {new Intl.DateTimeFormat('pt-BR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      }).format(new Date(`${selectedDateISO}T12:00:00`))}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                      {shiftsOnSelectedDate.length} plantao(es) encontrado(s)
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar modal">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  {shiftsOnSelectedDate.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pv-text-muted)]">
                        Plantoes existentes
                      </p>
                      {shiftsOnSelectedDate.map((shift) => {
                        const isActive = activeShift?.id === shift.id;
                        const isDayShift = shift.shiftType === 'diurno';

                        return (
                          <button
                            key={shift.id}
                            type="button"
                            onClick={() => handleSelectShift(shift.id)}
                            className={[
                              'flex w-full items-center justify-between rounded-2xl border bg-[var(--pv-surface)] p-4 text-left transition-colors',
                              isActive
                                ? 'border-[var(--pv-primary)] bg-[var(--pv-primary)]/5'
                                : 'border-[var(--pv-border)] hover:border-[var(--pv-primary)]/35',
                            ].join(' ')}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={[
                                  'flex h-10 w-10 items-center justify-center rounded-xl',
                                  isDayShift
                                    ? 'bg-[var(--pv-accent-yellow)]/15 text-[var(--pv-accent-yellow-strong)]'
                                    : 'bg-[var(--pv-primary)]/10 text-[var(--pv-primary)]',
                                ].join(' ')}
                              >
                                {isDayShift ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                              </div>
                              <div>
                                <p className="font-semibold text-[var(--pv-text-main)]">
                                  {SHIFT_TYPE_LABELS[shift.shiftType]}
                                </p>
                                <p className="text-sm text-[var(--pv-text-muted)]">
                                  {SHIFT_WINDOW_LABELS[shift.shiftType]}
                                </p>
                              </div>
                            </div>
                            {isActive ? <Badge variant="default">Ativo</Badge> : null}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--pv-border)] bg-[var(--pv-surface)] p-6 text-center">
                      <Calendar className="mb-3 h-8 w-8 text-[var(--pv-text-muted)]/50" />
                      <p className="font-medium text-[var(--pv-text-main)]">Nenhum plantao neste dia</p>
                      <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                        Crie um plantao diurno ou noturno para comecar.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3 border-t border-[var(--pv-border)] pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pv-text-muted)]">
                    Criar novo plantao
                  </p>
                  {!shiftsOnSelectedDate.some((shift) => shift.shiftType === 'diurno') ? (
                    <Button
                      variant="outline"
                      className="h-12 w-full justify-start gap-3"
                      onClick={() => handleCreateShift('diurno')}
                    >
                      <Sun className="h-5 w-5 text-[var(--pv-accent-yellow-strong)]" />
                      Criar Plantao Diurno
                    </Button>
                  ) : null}
                  {!shiftsOnSelectedDate.some((shift) => shift.shiftType === 'noturno') ? (
                    <Button
                      variant="outline"
                      className="h-12 w-full justify-start gap-3"
                      onClick={() => handleCreateShift('noturno')}
                    >
                      <Moon className="h-5 w-5 text-[var(--pv-primary)]" />
                      Criar Plantao Noturno
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
