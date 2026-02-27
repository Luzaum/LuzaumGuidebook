import React, { useEffect, useMemo, useState } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, User, PawPrint, Stethoscope } from 'lucide-react';
import { format, addDays, subDays, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameMonth, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useData, Appointment } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { Modal } from '../components/ui/Modal';
import { cn } from '../lib/utils';
import { APPOINTMENT_CATEGORIES } from '../constants';

export const Calendar = () => {
  const { appointments, addAppointment, patients, tutors, getPatientName, getTutorName } = useData();
  const { getVeterinariansForSelection } = useClinicAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({ type: 'Consulta Geral', status: 'Agendado', date: new Date() });
  const [selectedTime, setSelectedTime] = useState('09:00');
  const draftKey = 'dv:calendar:draft';

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(draftKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<{
        selectedDate: string;
        currentMonth: string;
        isModalOpen: boolean;
        selectedTime: string;
        newAppointment: Partial<Appointment>;
      }>;
      if (parsed.selectedDate) setSelectedDate(new Date(parsed.selectedDate));
      if (parsed.currentMonth) setCurrentMonth(new Date(parsed.currentMonth));
      if (typeof parsed.isModalOpen === 'boolean') setIsModalOpen(parsed.isModalOpen);
      if (typeof parsed.selectedTime === 'string') setSelectedTime(parsed.selectedTime);
      if (parsed.newAppointment) {
        setNewAppointment({
          ...parsed.newAppointment,
          date: parsed.newAppointment.date ? new Date(parsed.newAppointment.date) : new Date(),
        });
      }
    } catch (error) {
      console.warn('[Calendar] Failed to hydrate draft:', error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        draftKey,
        JSON.stringify({
          selectedDate,
          currentMonth,
          isModalOpen,
          selectedTime,
          newAppointment,
        }),
      );
    } catch (error) {
      console.warn('[Calendar] Failed to persist draft:', error);
    }
  }, [selectedDate, currentMonth, isModalOpen, selectedTime, newAppointment]);

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  const vets = getVeterinariansForSelection();
  const filteredAppointments = useMemo(
    () => appointments.filter((apt) => isSameDay(new Date(apt.date), selectedDate)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [appointments, selectedDate],
  );
  const patientsForTutor = useMemo(() => {
    if (!newAppointment.tutorId) return [];
    return patients.filter((p) => p.tutorId === newAppointment.tutorId);
  }, [patients, newAppointment.tutorId]);

  const handlePrevDay = () => setSelectedDate(subDays(selectedDate, 1));
  const handleNextDay = () => setSelectedDate(addDays(selectedDate, 1));
  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
  };

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const renderMiniCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="dv-glass-card bg-white/90 dark:bg-neutral-900/70 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100/80 dark:border-neutral-800/80 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">{format(currentMonth, 'MMMM yyyy', { locale: ptBR })}</h3>
          <div className="flex gap-1">
            <button onClick={handlePrevMonth} className="p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg text-gray-500"><ChevronLeft size={18} /></button>
            <button onClick={handleNextMonth} className="p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg text-gray-500"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => <div key={index} className="text-center text-xs font-bold text-gray-400 py-1">{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, idx) => {
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isTodayDate = isToday(day);
            const hasAppointments = appointments.some((apt) => isSameDay(new Date(apt.date), day));
            return (
              <button key={idx} onClick={() => setSelectedDate(day)} className={cn('relative h-9 rounded-xl text-sm font-medium transition-all flex items-center justify-center', !isCurrentMonth && 'text-gray-300 dark:text-neutral-700', isCurrentMonth && !isSelected && 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800', isSelected && 'bg-primary text-white shadow-lg shadow-primary/30 scale-105 font-bold', isTodayDate && !isSelected && 'text-primary font-bold bg-primary/10')}>
                {format(day, 'd')}
                {hasAppointments && !isSelected && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppointment.title || !newAppointment.patientId || !newAppointment.tutorId || !newAppointment.date || !newAppointment.type) return;
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const appointmentDate = new Date(newAppointment.date);
    appointmentDate.setHours(hours, minutes, 0, 0);

    addAppointment({ id: Math.random().toString(36).substr(2, 9), ...newAppointment as Appointment, date: appointmentDate, status: 'Agendado' });
    setIsModalOpen(false);
    setNewAppointment({ type: 'Consulta Geral', status: 'Agendado', date: new Date() });
    setSelectedTime('09:00');
    window.localStorage.removeItem(draftKey);
  };

  return (
    <div className="dv-aurora-bg dv-section-enter h-full flex flex-col gap-6 rounded-[28px] p-3 md:p-5">
      <div className="dv-glass-card flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/65 dark:bg-neutral-900/55 backdrop-blur-md p-6 rounded-3xl border border-gray-100/80 dark:border-neutral-800/80 shadow-sm transition-all duration-300">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Agenda</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Agenda organizada por horário (mais cedo para mais tarde).</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white dark:bg-neutral-900 rounded-xl p-1 border border-gray-200 dark:border-neutral-800 shadow-sm">
            <button onClick={handlePrevDay} className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg text-gray-500 transition-colors"><ChevronLeft size={20} /></button>
            <div className="px-4 font-bold text-gray-900 dark:text-white min-w-[190px] text-center capitalize">{format(selectedDate, "EEEE, d 'de' MMM", { locale: ptBR })}</div>
            <button onClick={handleNextDay} className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg text-gray-500 transition-colors"><ChevronRight size={20} /></button>
          </div>
          <button onClick={handleToday} className="p-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 font-bold">Hoje</button>
          <button onClick={() => setIsModalOpen(true)} className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-bold inline-flex items-center gap-2"><Plus size={20} />Novo Agendamento</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-full overflow-hidden">
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6 overflow-y-auto">{renderMiniCalendar()}</div>

        <div className="flex-1 dv-glass-card bg-white/65 dark:bg-neutral-900/55 backdrop-blur-md rounded-3xl border border-gray-100/80 dark:border-neutral-800/80 shadow-sm overflow-hidden flex flex-col transition-all duration-300">
          <div className="p-6 border-b border-gray-100 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><CalendarIcon size={24} /></div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Compromissos do Dia</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{filteredAppointments.length} agendamentos encontrados</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-24 text-gray-500">Sem agendamentos para este dia.</div>
            ) : (
              filteredAppointments.map((apt) => {
                const category = APPOINTMENT_CATEGORIES.find((c) => c.id === apt.type) || APPOINTMENT_CATEGORIES[0];
                return (
                  <div key={apt.id} className="grid grid-cols-[80px_1fr] items-stretch rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900">
                    <div className="border-r border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm font-bold text-primary bg-primary/5">{format(new Date(apt.date), 'HH:mm')}</div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className={`font-bold text-gray-900 dark:text-white ${apt.status === 'Concluído' ? 'line-through text-green-600' : ''}`}>{apt.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{category.label}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${apt.status === 'Concluído' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{apt.status}</span>
                      </div>
                      <div className="mt-3 grid md:grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <span className="inline-flex items-center gap-1.5"><PawPrint size={14} /> {getPatientName(apt.patientId)}</span>
                        <span className="inline-flex items-center gap-1.5"><User size={14} /> {getTutorName(apt.tutorId)}</span>
                        <span className="inline-flex items-center gap-1.5"><Stethoscope size={14} /> {apt.veterinarianName || 'Veterinário não informado'}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Agendamento" className="max-w-3xl">
        <form onSubmit={handleSaveAppointment} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
              <input type="text" required className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl" value={newAppointment.title || ''} onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl" value={newAppointment.type} onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value as Appointment['type'] })}>
                {APPOINTMENT_CATEGORIES.map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data</label>
              <input type="date" required className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl" value={newAppointment.date ? format(new Date(newAppointment.date), 'yyyy-MM-dd') : ''} onChange={(e) => setNewAppointment({ ...newAppointment, date: new Date(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hora</label>
              <select required className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                {timeSlots.map((time) => <option key={time} value={time}>{time}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tutor</label>
              <select required className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl" value={newAppointment.tutorId || ''} onChange={(e) => setNewAppointment({ ...newAppointment, tutorId: e.target.value, patientId: '' })}>
                <option value="">Selecione um tutor</option>
                {tutors.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Paciente</label>
              <select required disabled={!newAppointment.tutorId} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl" value={newAppointment.patientId || ''} onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}>
                <option value="">Selecione um paciente</option>
                {patientsForTutor.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Médico veterinário responsável</label>
              <select required className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl" value={newAppointment.veterinarianName || ''} onChange={(e) => setNewAppointment({ ...newAppointment, veterinarianName: e.target.value })}>
                <option value="">Selecione o veterinário</option>
                {vets.map((vet) => <option key={vet.id} value={vet.name}>{vet.name}{vet.crmv ? ` - ${vet.crmv}` : ''}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Observações</label>
            <textarea className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl min-h-[90px]" value={newAppointment.notes || ''} onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold">Cancelar</button>
            <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold">Agendar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


