import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Stethoscope,
  Star,
  RotateCcw,
  TestTube,
  Image as ImageIcon,
  Syringe,
  Users,
  Bed,
  Clock,
  MapPin,
  User,
  PawPrint,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { format, addDays, subDays, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameMonth, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useData, Appointment } from '../context/DataContext';
import { Modal } from '../components/ui/Modal';
import { cn } from '../lib/utils';

import { APPOINTMENT_CATEGORIES } from '../constants';

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => {
  const { getPatientName, getTutorName } = useData();
  const category = APPOINTMENT_CATEGORIES.find(c => c.id === appointment.type) || APPOINTMENT_CATEGORIES[0];
  const Icon = category.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative overflow-hidden bg-white dark:bg-neutral-800/50 backdrop-blur-sm border border-gray-100 dark:border-neutral-700/50 rounded-2xl p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${category.color}`} />
      
      <div className="flex items-start justify-between mb-3 pl-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${category.color} bg-opacity-10 text-${category.color.split('-')[1]}-600 dark:text-${category.color.split('-')[1]}-400`}>
            <Icon size={18} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{appointment.title}</h3>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{category.label}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-neutral-700">
          <Clock size={14} className="text-gray-500" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
            {format(new Date(appointment.date), 'HH:mm')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pl-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-700 flex items-center justify-center text-gray-500">
            <PawPrint size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Paciente</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate max-w-[100px]">
              {getPatientName(appointment.patientId)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-700 flex items-center justify-center text-gray-500">
            <User size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Tutor</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate max-w-[100px]">
              {getTutorName(appointment.tutorId)}
            </span>
          </div>
        </div>
      </div>

      {appointment.status === 'Confirmado' && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 size={16} className="text-emerald-500" />
        </div>
      )}
    </motion.div>
  );
};

export const Calendar = () => {
  const { appointments, addAppointment, patients, tutors, getTutorName } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    type: 'Consulta Geral',
    status: 'Agendado',
    date: new Date()
  });
  const [selectedTime, setSelectedTime] = useState('09:00');

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  const filteredAppointments = appointments.filter(apt => 
    isSameDay(new Date(apt.date), selectedDate)
  );

  // Group appointments by category
  const groupedAppointments = APPOINTMENT_CATEGORIES.reduce((acc, category) => {
    const apts = filteredAppointments.filter(apt => apt.type === category.id);
    if (apts.length > 0) {
      acc[category.id] = apts;
    }
    return acc;
  }, {} as Record<string, Appointment[]>);

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
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
          </h3>
          <div className="flex gap-1">
            <button onClick={handlePrevMonth} className="p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg text-gray-500">
              <ChevronLeft size={18} />
            </button>
            <button onClick={handleNextMonth} className="p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg text-gray-500">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
            <div key={index} className="text-center text-xs font-bold text-gray-400 py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, idx) => {
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isTodayDate = isToday(day);
            const hasAppointments = appointments.some(apt => isSameDay(new Date(apt.date), day));

            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "relative h-9 rounded-xl text-sm font-medium transition-all flex items-center justify-center",
                  !isCurrentMonth && "text-gray-300 dark:text-neutral-700",
                  isCurrentMonth && !isSelected && "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800",
                  isSelected && "bg-primary text-white shadow-lg shadow-primary/30 scale-105 font-bold",
                  isTodayDate && !isSelected && "text-primary font-bold bg-primary/10"
                )}
              >
                {format(day, 'd')}
                {hasAppointments && !isSelected && (
                  <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppointment.title && newAppointment.patientId && newAppointment.tutorId && newAppointment.date && newAppointment.type) {
      // Combine date and time
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const appointmentDate = new Date(newAppointment.date);
      appointmentDate.setHours(hours, minutes, 0, 0);

      addAppointment({
        id: Math.random().toString(36).substr(2, 9),
        ...newAppointment as Appointment,
        date: appointmentDate
      });
      setIsModalOpen(false);
      setNewAppointment({
        type: 'Consulta Geral',
        status: 'Agendado',
        date: new Date()
      });
      setSelectedTime('09:00');
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md p-6 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Agenda</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Gerencie seus compromissos e procedimentos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white dark:bg-neutral-900 rounded-xl p-1 border border-gray-200 dark:border-neutral-800 shadow-sm">
            <button onClick={handlePrevDay} className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg text-gray-500 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="px-4 font-bold text-gray-900 dark:text-white min-w-[140px] text-center capitalize">
              {format(selectedDate, "EEEE, d 'de' MMM", { locale: ptBR })}
            </div>
            <button onClick={handleNextDay} className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg text-gray-500 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          <button 
            onClick={handleToday}
            className="p-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 font-bold transition-colors shadow-sm"
          >
            Hoje
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-bold transition-all flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Novo Agendamento</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-full overflow-hidden">
        {/* Sidebar / Mini Calendar */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6 overflow-y-auto custom-scrollbar">
          {renderMiniCalendar()}
          
          {/* Categories Legend */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Categorias</h3>
            <div className="space-y-3">
              {APPOINTMENT_CATEGORIES.map(cat => (
                <div key={cat.id} className="flex items-center gap-3 group cursor-pointer">
                  <div className={`w-3 h-3 rounded-full ${cat.color} group-hover:scale-125 transition-transform`} />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Agenda View */}
        <div className="flex-1 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 dark:border-neutral-800 flex justify-between items-center bg-white/50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <CalendarIcon size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Compromissos do Dia</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredAppointments.length} agendamentos encontrados
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
            {Object.keys(groupedAppointments).length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-20 h-20 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                  <CalendarIcon size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sem agendamentos</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  Não há compromissos agendados para este dia. Clique em "Novo Agendamento" para adicionar.
                </p>
              </div>
            ) : (
              APPOINTMENT_CATEGORIES.map(category => {
                const categoryAppointments = groupedAppointments[category.id];
                if (!categoryAppointments) return null;

                return (
                  <div key={category.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${category.color}`} />
                        {category.label}
                      </h3>
                      <div className="h-px flex-1 bg-gray-100 dark:bg-neutral-800" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {categoryAppointments.map(apt => (
                        <AppointmentCard key={apt.id} appointment={apt} />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Agendamento"
        className="max-w-2xl"
      >
        <form onSubmit={handleSaveAppointment} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newAppointment.title || ''}
                onChange={e => setNewAppointment({...newAppointment, title: e.target.value})}
                placeholder="Ex: Consulta de Rotina"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
              <select
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newAppointment.type}
                onChange={e => setNewAppointment({...newAppointment, type: e.target.value as any})}
              >
                {APPOINTMENT_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={newAppointment.date ? format(new Date(newAppointment.date), 'yyyy-MM-dd') : ''}
                  onChange={e => setNewAppointment({...newAppointment, date: new Date(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hora</label>
                <select
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={selectedTime}
                  onChange={e => setSelectedTime(e.target.value)}
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Paciente</label>
              <select
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newAppointment.patientId || ''}
                onChange={e => setNewAppointment({...newAppointment, patientId: e.target.value})}
              >
                <option value="">Selecione um paciente</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({getTutorName(p.tutorId)})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tutor</label>
              <select
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={newAppointment.tutorId || ''}
                onChange={e => setNewAppointment({...newAppointment, tutorId: e.target.value})}
              >
                <option value="">Selecione um tutor</option>
                {tutors.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Observações</label>
            <textarea
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[100px]"
              value={newAppointment.notes || ''}
              onChange={e => setNewAppointment({...newAppointment, notes: e.target.value})}
              placeholder="Detalhes adicionais..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2.5 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Agendar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
