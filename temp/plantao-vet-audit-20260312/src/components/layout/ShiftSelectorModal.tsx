import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAppStore } from '@/store/patientStore';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, X, Sun, Moon, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { ShiftType } from '@/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ShiftSelectorModal({ isOpen, onClose }: Props) {
  const { shifts, activeShiftId, setActiveShift, createShift } = useAppStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!isOpen) return null;

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const shiftsOnSelectedDate = shifts.filter(s => s.dateISO === selectedDateStr);

  const handleCreateShift = (type: ShiftType) => {
    const newShift = createShift(selectedDateStr, type);
    setActiveShift(newShift.id);
    onClose();
  };

  const handleSelectShift = (id: string) => {
    setActiveShift(id);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-4xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Calendar Section */}
          <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-[var(--border)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--text-main)] capitalize">
                {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-[var(--text-muted)] py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for start of month */}
              {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2" />
              ))}
              
              {daysInMonth.map((day, i) => {
                const dayStr = format(day, 'yyyy-MM-dd');
                const dayShifts = shifts.filter(s => s.dateISO === dayStr);
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isTodayDate = isToday(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      relative flex flex-col items-center justify-center p-2 rounded-xl h-14 transition-all
                      ${!isCurrentMonth ? 'opacity-30' : ''}
                      ${isSelected ? 'bg-[var(--primary)] text-white shadow-md' : 'hover:bg-[var(--surface-hover)] text-[var(--text-main)]'}
                      ${isTodayDate && !isSelected ? 'border border-[var(--primary)] text-[var(--primary)]' : 'border border-transparent'}
                    `}
                  >
                    <span className="text-sm font-medium">{format(day, 'd')}</span>
                    
                    {/* Shift Indicators */}
                    <div className="flex gap-1 mt-1">
                      {dayShifts.map(s => (
                        <div 
                          key={s.id} 
                          className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : s.shiftType === 'diurno' ? 'bg-[var(--accent-yellow)]' : 'bg-[var(--primary)]'}`}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-80 bg-[var(--surface-hover)]/30 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-main)] capitalize">
                  {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  {shiftsOnSelectedDate.length} plantões registrados
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-[var(--text-muted)]">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              {shiftsOnSelectedDate.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Plantões Existentes</h4>
                  {shiftsOnSelectedDate.map(shift => (
                    <div 
                      key={shift.id}
                      onClick={() => handleSelectShift(shift.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between
                        ${activeShiftId === shift.id 
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                          : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${shift.shiftType === 'diurno' ? 'bg-[var(--accent-yellow)]/20 text-[var(--accent-yellow)]' : 'bg-[var(--primary)]/20 text-[var(--primary)]'}`}>
                          {shift.shiftType === 'diurno' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text-main)] capitalize">{shift.shiftType}</p>
                          <p className="text-xs text-[var(--text-muted)]">
                            {shift.shiftType === 'diurno' ? '07:00 - 19:00' : '19:00 - 07:00'}
                          </p>
                        </div>
                      </div>
                      {activeShiftId === shift.id && (
                        <span className="text-xs font-bold text-[var(--primary)] uppercase">Ativo</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-center text-[var(--text-muted)]">
                  <CalendarIcon className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-sm">Nenhum plantão neste dia.</p>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3 border-t border-[var(--border)] pt-6">
              <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Criar Novo Plantão</h4>
              
              {!shiftsOnSelectedDate.some(s => s.shiftType === 'diurno') && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-12 border-[var(--border)] hover:bg-[var(--accent-yellow)]/10 hover:text-[var(--accent-yellow)] hover:border-[var(--accent-yellow)]/50"
                  onClick={() => handleCreateShift('diurno')}
                >
                  <Sun className="w-5 h-5" />
                  Criar Plantão Diurno
                </Button>
              )}
              
              {!shiftsOnSelectedDate.some(s => s.shiftType === 'noturno') && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-12 border-[var(--border)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] hover:border-[var(--primary)]/50"
                  onClick={() => handleCreateShift('noturno')}
                >
                  <Moon className="w-5 h-5" />
                  Criar Plantão Noturno
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
