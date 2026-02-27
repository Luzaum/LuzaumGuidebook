import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Clock3,
  Plus,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  X,
} from 'lucide-react';
import { addDays, format, isSameDay, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { Modal } from '../components/ui/Modal';
import { useData, ExecutionTask } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { dvPath } from '../DadosVeterinariosModule';

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
const ROUTE_OPTIONS = ['VO', 'IV', 'IM', 'SC', 'ID', 'IN', 'Retal', 'Auricular', 'Oftálmica', 'Tópica', 'Nebulização', 'CRI'];
const DOSE_UNITS = ['mg', 'mg/kg', 'g', 'mcg', 'mcg/kg', 'mL', 'mL/kg', 'UI', 'UI/kg', 'gota', 'gotas', 'comprimido', 'cp', 'cápsula', 'ampola', 'frasco', '%'];

const normalizeHour = (hour: number) => String(hour).padStart(2, '0');

const safeFormat = (date: Date | string | undefined, fmt: string, fallback = '—') => {
  try {
    if (!date) return fallback;
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return fallback;
    return format(d, fmt, { locale: ptBR });
  } catch {
    return fallback;
  }
};

const nowTimeString = () => {
  const now = new Date();
  return `${normalizeHour(now.getHours())}:${normalizeHour(now.getMinutes())}`;
};

const getCellStyle = (total: number, done: number) => {
  if (total <= 0) return 'bg-gray-100 text-gray-400 border border-gray-200 dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700';
  if (done >= total) return 'bg-emerald-500 text-white shadow-sm shadow-emerald-200 dark:shadow-emerald-900';
  if (done <= 0) return 'bg-red-500 text-white shadow-sm shadow-red-200 dark:shadow-red-900';
  return 'bg-sky-500 text-white shadow-sm shadow-sky-200 dark:shadow-sky-900';
};

const buildSchedules = (dateValue: string, timeValue: string, applicationsPerDay: number) => {
  const [h, m] = timeValue.split(':').map(Number);
  const start = new Date(dateValue + 'T00:00:00');
  start.setHours(h, m, 0, 0);
  if (Number.isNaN(start.getTime())) return [];
  const safeFreq = Math.min(24, Math.max(1, Number(applicationsPerDay) || 1));
  const intervalMinutes = (24 * 60) / safeFreq;
  return Array.from({ length: safeFreq }, (_, index) => {
    const scheduled = new Date(start);
    scheduled.setMinutes(start.getMinutes() + Math.round(index * intervalMinutes));
    return scheduled;
  });
};

const ic = 'w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm';
const lc = 'block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1';

export const ExecutionMap = () => {
  const {
    internments,
    executionTasks,
    addExecutionTask,
    updateExecutionTask,
    getPatientName,
    getTutorName,
  } = useData();
  const { currentUser, selectedClinicId } = useClinicAuth();

  /* ── date nav ── */
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const selectedDateValue = useMemo(() => {
    const d = new Date(selectedDate + 'T00:00:00');
    return isNaN(d.getTime()) ? new Date() : d;
  }, [selectedDate]);
  const currentHour = useMemo(
    () => (isSameDay(selectedDateValue, new Date()) ? new Date().getHours() : -1),
    [selectedDateValue],
  );
  const changeDay = (direction: -1 | 1) => {
    const base = new Date(selectedDate + 'T00:00:00');
    setSelectedDate(format(direction < 0 ? subDays(base, 1) : addDays(base, 1), 'yyyy-MM-dd'));
  };

  /* ── selected internment (for task list at bottom) ── */
  const [selectedInternmentId, setSelectedInternmentId] = useState('');

  /* ── new-task modal ── */
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [quickHour, setQuickHour] = useState(8);
  const [quickInternmentId, setQuickInternmentId] = useState('');
  const [medication, setMedication] = useState('');
  const [doseAmount, setDoseAmount] = useState('');
  const [doseUnit, setDoseUnit] = useState('mg/kg');
  const [route, setRoute] = useState('VO');
  const [notes, setNotes] = useState('');
  const [quickTime, setQuickTime] = useState('08:00');
  const [applicationsPerDay, setApplicationsPerDay] = useState(1);

  /* ── task-view / completion modal ── */
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewInternmentId, setViewInternmentId] = useState('');
  const [viewHour, setViewHour] = useState(0);
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [doneTimeInput, setDoneTimeInput] = useState('');
  const [completionNotes, setCompletionNotes] = useState('');

  /* ── derived ── */
  const dayTasks = useMemo(
    () => executionTasks.filter((task) => isSameDay(new Date(task.scheduledAt), selectedDateValue)),
    [executionTasks, selectedDateValue],
  );

  const dayMap = useMemo(() => {
    const map = new Map<string, { total: number; done: number }>();
    dayTasks.forEach((task) => {
      const hour = new Date(task.scheduledAt).getHours();
      const key = `${task.internmentId}-${hour}`;
      const current = map.get(key) || { total: 0, done: 0 };
      current.total += 1;
      if (task.done) current.done += 1;
      map.set(key, current);
    });
    return map;
  }, [dayTasks]);

  const selectedInternmentTasks = useMemo(
    () =>
      dayTasks
        .filter((task) => task.internmentId === selectedInternmentId)
        .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()),
    [dayTasks, selectedInternmentId],
  );

  /* tasks shown in the view/completion modal */
  const viewTasks = useMemo(() => {
    if (!viewModalOpen) return [];
    return dayTasks
      .filter(
        (task) =>
          task.internmentId === viewInternmentId &&
          new Date(task.scheduledAt).getHours() === viewHour,
      )
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }, [dayTasks, viewModalOpen, viewInternmentId, viewHour]);

  /* ── handlers ── */
  const openCellModal = (internmentId: string, hour: number) => {
    const key = `${internmentId}-${hour}`;
    const stats = dayMap.get(key) || { total: 0, done: 0 };
    if (stats.total > 0) {
      // show existing tasks
      setViewInternmentId(internmentId);
      setViewHour(hour);
      setCompletingTaskId(null);
      setDoneTimeInput('');
      setCompletionNotes('');
      setViewModalOpen(true);
    } else {
      // create new task
      setQuickInternmentId(internmentId);
      setQuickHour(hour);
      setQuickTime(`${normalizeHour(hour)}:00`);
      setApplicationsPerDay(1);
      setQuickModalOpen(true);
    }
  };

  const createQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInternmentId || !medication.trim()) return;
    const internment = internments.find((item) => item.id === quickInternmentId);
    if (!internment) return;
    const schedules = buildSchedules(selectedDate, quickTime, applicationsPerDay);
    if (!schedules.length) return;
    const dosage = doseAmount.trim() ? `${doseAmount.trim()} ${doseUnit}` : undefined;
    schedules.forEach((scheduledAt, index) => {
      addExecutionTask({
        clinicId: selectedClinicId === 'all' ? internment.clinicId : selectedClinicId,
        internmentId: internment.id,
        patientId: internment.patientId,
        tutorId: internment.tutorId,
        scheduledAt,
        medication: medication.trim(),
        dosage,
        route: route || undefined,
        notes: notes.trim()
          ? `${notes.trim()}${schedules.length > 1 ? ` | Aplicação ${index + 1}/${schedules.length}` : ''}`
          : undefined,
        doneBy: currentUser.name,
      });
    });
    setQuickModalOpen(false);
    setMedication('');
    setDoseAmount('');
    setDoseUnit('mg/kg');
    setRoute('VO');
    setNotes('');
    setApplicationsPerDay(1);
  };

  const startCompletion = (task: ExecutionTask) => {
    setCompletingTaskId(task.id);
    setDoneTimeInput(nowTimeString());
    setCompletionNotes('');
  };

  const confirmCompletion = (taskId: string) => {
    const [h, m] = doneTimeInput.split(':').map(Number);
    const doneAt = new Date();
    if (!isNaN(h) && !isNaN(m)) doneAt.setHours(h, m, 0, 0);
    updateExecutionTask(taskId, {
      done: true,
      doneAt,
      doneBy: currentUser.name,
      completionNotes: completionNotes.trim() || undefined,
    });
    setCompletingTaskId(null);
    setCompletionNotes('');
    setDoneTimeInput('');
  };

  const undoCompletion = (taskId: string) => {
    updateExecutionTask(taskId, {
      done: false,
      doneAt: undefined,
      doneBy: undefined,
      completionNotes: undefined,
    });
  };

  const toggleDone = (taskId: string, done: boolean) => {
    updateExecutionTask(taskId, {
      done: !done,
      doneAt: !done ? new Date() : undefined,
      doneBy: !done ? currentUser.name : undefined,
    });
  };

  /* ─────────────────────── RENDER ─────────────────────── */
  return (
    <div className="space-y-6 text-gray-900 dark:text-gray-100 min-h-full flex flex-col">
      <header className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mapa de Execução</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Clique em uma célula <span className="text-gray-400">vazia</span> para adicionar um lançamento, ou em uma célula{' '}
          <span className="text-red-500 font-medium">vermelha</span> /{' '}
          <span className="text-sky-500 font-medium">azul</span> para ver e concluir tarefas.
        </p>
      </header>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 flex-1 flex flex-col">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => changeDay(-1)}
              className="px-2.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              <ChevronLeft size={16} />
            </button>
            <label className="text-sm text-gray-700 dark:text-gray-200">Data:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              type="button"
              onClick={() => changeDay(1)}
              className="px-2.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              <ChevronRight size={16} />
            </button>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
              {safeFormat(selectedDateValue, 'dd/MM/yyyy')}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="text-red-500 font-medium">●</span> pendente &nbsp;
            <span className="text-sky-500 font-medium">●</span> parcial &nbsp;
            <span className="text-emerald-500 font-medium">●</span> concluído
          </p>
        </div>

        <div className="mt-4 overflow-auto border border-gray-200 dark:border-gray-700 rounded-xl flex-1 min-h-0">
          <table className="min-w-[1360px] w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="sticky left-0 z-20 bg-gray-50 dark:bg-gray-800 text-left px-3 py-2 border-r border-gray-200 dark:border-gray-700 min-w-[270px] text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Animal internado
                </th>
                {HOURS.map((hour) => (
                  <th
                    key={hour}
                    className={`w-12 h-12 text-xs font-bold border-l border-gray-200 dark:border-gray-700 ${
                      currentHour === hour
                        ? 'bg-yellow-100 dark:bg-yellow-700/20 text-yellow-700 dark:text-yellow-300'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {normalizeHour(hour)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {internments.length === 0 ? (
                <tr>
                  <td colSpan={25} className="text-center py-16 text-gray-400 dark:text-gray-500 text-sm">
                    Nenhum paciente internado. Cadastre internamentos para visualizar o mapa.
                  </td>
                </tr>
              ) : (
                internments.map((internment) => {
                  const patientName = getPatientName(internment.patientId);
                  const tutorName = getTutorName(internment.tutorId);
                  const isSelected = selectedInternmentId === internment.id;

                  return (
                    <tr
                      key={internment.id}
                      className={`transition-colors ${isSelected ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'}`}
                    >
                      <td
                        className="sticky left-0 z-10 bg-white dark:bg-gray-900 border-r border-t border-gray-200 dark:border-gray-700 px-3 py-2 align-top cursor-pointer"
                        onClick={() => setSelectedInternmentId((prev) => (prev === internment.id ? '' : internment.id))}
                      >
                        <Link
                          to={dvPath(`patients/${internment.patientId}?tab=Resumo`)}
                          className="text-sm font-bold text-primary underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {patientName}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{tutorName}</p>
                        <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                            Leito {internment.bed}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                            {internment.sector}
                          </span>
                        </div>
                      </td>

                      {HOURS.map((hour) => {
                        const key = `${internment.id}-${hour}`;
                        const stats = dayMap.get(key) || { total: 0, done: 0 };
                        const cellClass = getCellStyle(stats.total, stats.done);
                        const hasTasks = stats.total > 0;
                        return (
                          <td
                            key={key}
                            className={`border-t border-l border-gray-200 dark:border-gray-700 text-center h-11 ${
                              currentHour === hour ? 'bg-yellow-100/70 dark:bg-yellow-700/10' : ''
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => openCellModal(internment.id, hour)}
                              className={`w-7 h-7 rounded-full text-[11px] font-bold inline-flex items-center justify-center transition-all hover:scale-110 ${cellClass} ${hasTasks ? 'cursor-pointer' : 'cursor-cell'}`}
                              title={
                                hasTasks
                                  ? `${stats.done}/${stats.total} concluídas — clique para ver`
                                  : `Adicionar lançamento às ${normalizeHour(hour)}h`
                              }
                            >
                              {hasTasks ? stats.total : <Plus size={9} />}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Task list at bottom ── */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Clock3 size={16} className="text-primary" />
          {selectedInternmentId
            ? `Lançamentos — ${getPatientName(internments.find((i) => i.id === selectedInternmentId)?.patientId ?? '')}`
            : 'Selecione um paciente no mapa para ver os lançamentos do dia'}
          {selectedInternmentTasks.length > 0 && (
            <span className="ml-auto text-xs font-normal text-gray-400 dark:text-gray-500">
              {selectedInternmentTasks.filter((t) => t.done).length}/{selectedInternmentTasks.length} concluídos
            </span>
          )}
        </h2>
        <div className="space-y-2">
          {selectedInternmentTasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-xl border p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${
                task.done
                  ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div>
                <p className={`font-semibold text-sm ${task.done ? 'line-through text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                  {task.medication}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5 flex-wrap mt-0.5">
                  <Clock3 size={11} /> {safeFormat(task.scheduledAt, 'dd/MM/yyyy HH:mm')}
                  {task.dosage && <> · <span className="font-medium">{task.dosage}</span></>}
                  {task.route && <> · {task.route}</>}
                </p>
                {task.notes && <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{task.notes}</p>}
                {task.done && (
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Concluído {safeFormat(task.doneAt, "'às' HH:mm")} por {task.doneBy}
                    {task.completionNotes && <> — {task.completionNotes}</>}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => toggleDone(task.id, task.done)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 flex-shrink-0 transition-colors ${
                  task.done
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <CheckCircle2 size={14} />
                {task.done ? 'Concluído (desfazer)' : 'Marcar como feito'}
              </button>
            </div>
          ))}
          {!selectedInternmentTasks.length && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedInternmentId ? 'Nenhum lançamento para este paciente nesta data.' : ''}
            </p>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          MODAL 1 — View & Complete tasks in a slot
         ═══════════════════════════════════════════════════ */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setCompletingTaskId(null);
        }}
        title={`Tarefas das ${normalizeHour(viewHour)}h — ${getPatientName(internments.find((i) => i.id === viewInternmentId)?.patientId ?? '')}`}
        className="max-w-2xl"
      >
        <div className="space-y-3">
          {viewTasks.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma tarefa encontrada.</p>
          )}

          <AnimatePresence>
            {viewTasks.map((task) => {
              const isExpanded = completingTaskId === task.id;
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border overflow-hidden ${
                    task.done
                      ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {/* task summary row */}
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${task.done ? 'line-through text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                        {task.medication}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <Clock size={11} /> Agendado {safeFormat(task.scheduledAt, "HH:mm 'de' dd/MM/yyyy")}
                        {task.dosage && <> · <span className="font-medium">{task.dosage}</span></>}
                        {task.route && <> · {task.route}</>}
                      </p>
                      {task.notes && (
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{task.notes}</p>
                      )}
                      {task.done && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Concluído {safeFormat(task.doneAt, "'às' HH:mm")} por {task.doneBy}
                          {task.completionNotes && ` — ${task.completionNotes}`}
                        </p>
                      )}
                    </div>

                    {/* action buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {task.done ? (
                        <button
                          type="button"
                          onClick={() => undoCompletion(task.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          Desfazer
                        </button>
                      ) : isExpanded ? (
                        <button
                          type="button"
                          onClick={() => setCompletingTaskId(null)}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startCompletion(task)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition-colors inline-flex items-center gap-1.5"
                        >
                          <ClipboardCheck size={13} /> Concluir
                        </button>
                      )}
                    </div>
                  </div>

                  {/* expandable completion form */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 space-y-3">
                          <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                            Registrar conclusão
                          </p>

                          {/* time row */}
                          <div>
                            <label className={lc}>Hora de execução</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="time"
                                value={doneTimeInput}
                                onChange={(e) => setDoneTimeInput(e.target.value)}
                                className={`${ic} flex-1`}
                              />
                              <button
                                type="button"
                                onClick={() => setDoneTimeInput(nowTimeString())}
                                className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
                              >
                                Agora
                              </button>
                            </div>
                          </div>

                          {/* completion notes */}
                          <div>
                            <label className={lc}>Observações de como foi feito</label>
                            <textarea
                              value={completionNotes}
                              onChange={(e) => setCompletionNotes(e.target.value)}
                              placeholder="Ex.: administrado sem intercorrências, paciente tolerou bem…"
                              rows={3}
                              className={`${ic} resize-none`}
                            />
                          </div>

                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setCompletingTaskId(null)}
                              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300"
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              onClick={() => confirmCompletion(task.id)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                            >
                              <CheckCircle2 size={14} /> Marcar como concluído
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* link to add more to this slot */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => {
                setViewModalOpen(false);
                setQuickInternmentId(viewInternmentId);
                setQuickHour(viewHour);
                setQuickTime(`${normalizeHour(viewHour)}:00`);
                setApplicationsPerDay(1);
                setQuickModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-1.5"
            >
              <Plus size={12} /> Adicionar novo lançamento neste horário
            </button>
          </div>
        </div>
      </Modal>

      {/* ═══════════════════════════════════════════════════
          MODAL 2 — Add new task
         ═══════════════════════════════════════════════════ */}
      <Modal
        isOpen={quickModalOpen}
        onClose={() => setQuickModalOpen(false)}
        title={`Novo lançamento • ${normalizeHour(quickHour)}h`}
        className="max-w-4xl"
      >
        <form onSubmit={createQuickTask} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lc}>Data</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={ic}
              />
            </div>
            <div>
              <label className={lc}>Paciente</label>
              <select
                value={quickInternmentId}
                onChange={(e) => setQuickInternmentId(e.target.value)}
                className={ic}
              >
                <option value="">Selecione...</option>
                {internments.map((item) => (
                  <option key={item.id} value={item.id}>
                    {getPatientName(item.patientId)} • Leito {item.bed}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-3">
              <label className={lc}>Medicação / procedimento *</label>
              <input
                required
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                placeholder="Ex.: Dipirona IV"
                className={ic}
              />
            </div>
            <div>
              <label className={lc}>Hora inicial</label>
              <input
                type="time"
                value={quickTime}
                onChange={(e) => setQuickTime(e.target.value)}
                className={ic}
              />
            </div>
            <div>
              <label className={lc}>Frequência/dia</label>
              <input
                type="number"
                min={1}
                max={24}
                value={applicationsPerDay}
                onChange={(e) =>
                  setApplicationsPerDay(Math.min(24, Math.max(1, Number(e.target.value) || 1)))
                }
                className={ic}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-end pb-2">
              Horários calculados automaticamente.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className={lc}>Dose</label>
              <input
                value={doseAmount}
                onChange={(e) => setDoseAmount(e.target.value)}
                placeholder="Ex.: 25"
                className={ic}
              />
            </div>
            <div>
              <label className={lc}>Unidade</label>
              <select value={doseUnit} onChange={(e) => setDoseUnit(e.target.value)} className={ic}>
                {DOSE_UNITS.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={lc}>Via</label>
              <select value={route} onChange={(e) => setRoute(e.target.value)} className={ic}>
                {ROUTE_OPTIONS.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-end pb-2">
              Via e unidade via dropdown.
            </div>
          </div>

          <div>
            <label className={lc}>Observações / conduta</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Descrição, janela de administração, alertas…"
              rows={3}
              className={`${ic} resize-none`}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setQuickModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary text-white font-semibold text-sm inline-flex items-center gap-2"
            >
              <Plus size={14} /> Salvar lançamento
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
