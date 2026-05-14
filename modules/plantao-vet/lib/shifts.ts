import { Shift, ShiftType } from '../types';

export const SHIFT_TYPE_LABELS: Record<ShiftType, string> = {
  diurno: 'Plantao diurno',
  noturno: 'Plantao noturno',
  night: 'Plantao noturno',
};

export const SHIFT_WINDOW_LABELS: Record<ShiftType, string> = {
  diurno: '07:00 - 19:00',
  noturno: '19:00 - 07:00',
  night: '19:00 - 07:00',
};

const SHIFT_SORT_ORDER: Record<ShiftType, number> = {
  diurno: 0,
  noturno: 1,
  night: 1,
};

export function buildShiftLabel(dateISO: string, shiftType: ShiftType) {
  return `${formatDateShort(dateISO)} - ${SHIFT_TYPE_LABELS[shiftType]}`;
}

export function formatDateLong(dateISO: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${dateISO}T12:00:00`));
}

export function formatDateShort(dateISO: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${dateISO}T12:00:00`));
}

export function compareShifts(a: Shift, b: Shift) {
  if (a.dateISO === b.dateISO) {
    return SHIFT_SORT_ORDER[a.shiftType] - SHIFT_SORT_ORDER[b.shiftType];
  }

  return a.dateISO.localeCompare(b.dateISO);
}

export function getShiftTone(shiftType: ShiftType) {
  return shiftType === 'diurno' ? 'amber' : 'sky';
}
