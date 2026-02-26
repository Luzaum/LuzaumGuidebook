import React, { useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Plus } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { Modal } from '../components/ui/Modal';
import { useData } from '../context/DataContext';
import { useClinicAuth } from '../context/ClinicAuthContext';

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

const normalizeHour = (hour: number) => String(hour).padStart(2, '0');

const getCellStyle = (total: number, done: number) => {
  if (total <= 0) return 'bg-gray-100 text-gray-500 border border-gray-200';
  if (done >= total) return 'bg-green-500 text-white';
  if (done <= 0) return 'bg-red-500 text-white';
  return 'bg-sky-500 text-white';
};

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

  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedInternmentId, setSelectedInternmentId] = useState(internments[0]?.id || '');
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [quickHour, setQuickHour] = useState(8);
  const [quickInternmentId, setQuickInternmentId] = useState(internments[0]?.id || '');

  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [route, setRoute] = useState('');
  const [notes, setNotes] = useState('');

  const selectedDateValue = useMemo(() => new Date(selectedDate), [selectedDate]);
  const currentHour = useMemo(
    () => (isSameDay(selectedDateValue, new Date()) ? new Date().getHours() : -1),
    [selectedDateValue],
  );

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

  const openQuickModal = (internmentId: string, hour: number) => {
    setQuickInternmentId(internmentId);
    setQuickHour(hour);
    setQuickModalOpen(true);
  };

  const createQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInternmentId || !medication.trim()) return;
    const internment = internments.find((item) => item.id === quickInternmentId);
    if (!internment) return;

    const date = new Date(selectedDate);
    date.setHours(quickHour, 0, 0, 0);

    addExecutionTask({
      clinicId: selectedClinicId === 'all' ? internment.clinicId : selectedClinicId,
      internmentId: internment.id,
      patientId: internment.patientId,
      tutorId: internment.tutorId,
      scheduledAt: date,
      medication: medication.trim(),
      dosage: dosage.trim() || undefined,
      route: route.trim() || undefined,
      notes: notes.trim() || undefined,
      doneBy: currentUser.name,
    });

    setQuickModalOpen(false);
    setMedication('');
    setDosage('');
    setRoute('');
    setNotes('');
  };

  const toggleDone = (taskId: string, done: boolean) => {
    updateExecutionTask(taskId, {
      done: !done,
      doneAt: !done ? new Date() : undefined,
      doneBy: !done ? currentUser.name : undefined,
    });
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mapa de Execução</h1>
        <p className="text-sm text-gray-500 mt-1">
          Visualização em grade por hora, no estilo operacional de internamento.
        </p>
      </header>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">Data:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
            />
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              {format(selectedDateValue, "dd/MM/yyyy")}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Cores: <span className="text-red-500">vermelho</span> pendente •{' '}
            <span className="text-sky-500">azul</span> parcial •{' '}
            <span className="text-green-600">verde</span> concluído
          </p>
        </div>

        <div className="mt-4 overflow-auto border border-gray-200 dark:border-gray-700 rounded-xl">
          <table className="min-w-[1360px] w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="sticky left-0 z-20 bg-gray-50 dark:bg-gray-800 text-left px-3 py-2 border-r border-gray-200 dark:border-gray-700 min-w-[270px]">
                  Animal internado
                </th>
                {HOURS.map((hour) => (
                  <th
                    key={hour}
                    className={`w-12 h-12 text-xs font-bold border-l border-gray-200 dark:border-gray-700 ${
                      currentHour === hour ? 'bg-yellow-100 dark:bg-yellow-700/20' : ''
                    }`}
                  >
                    {normalizeHour(hour)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {internments.map((internment) => {
                const patientName = getPatientName(internment.patientId);
                const tutorName = getTutorName(internment.tutorId);
                const isSelected = selectedInternmentId === internment.id;

                return (
                  <tr key={internment.id} className={isSelected ? 'bg-primary/5' : ''}>
                    <td
                      className="sticky left-0 z-10 bg-white dark:bg-gray-900 border-r border-t border-gray-200 dark:border-gray-700 px-3 py-2 align-top cursor-pointer"
                      onClick={() => setSelectedInternmentId(internment.id)}
                    >
                      <p className="text-sm font-bold text-primary underline">{patientName}</p>
                      <p className="text-xs text-gray-500">{tutorName}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Leito {internment.bed}</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">{internment.sector}</span>
                      </div>
                    </td>

                    {HOURS.map((hour) => {
                      const key = `${internment.id}-${hour}`;
                      const stats = dayMap.get(key) || { total: 0, done: 0 };
                      const cellClass = getCellStyle(stats.total, stats.done);
                      return (
                        <td
                          key={key}
                          className={`border-t border-l border-gray-200 dark:border-gray-700 text-center h-11 ${
                            currentHour === hour ? 'bg-yellow-100/70 dark:bg-yellow-700/10' : ''
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => openQuickModal(internment.id, hour)}
                            className={`w-6 h-6 rounded-full text-[11px] font-bold inline-flex items-center justify-center transition-transform hover:scale-110 ${cellClass}`}
                            title={
                              stats.total > 0
                                ? `${stats.done}/${stats.total} concluídas`
                                : `Adicionar lançamento às ${normalizeHour(hour)}h`
                            }
                          >
                            {stats.total > 0 ? stats.total : ''}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          Lançamentos do internamento selecionado
        </h2>
        <div className="space-y-2">
          {selectedInternmentTasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-xl border p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${
                task.done
                  ? 'border-green-300 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div>
                <p
                  className={`font-semibold ${
                    task.done
                      ? 'line-through text-green-700 dark:text-green-300'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {task.medication}
                </p>
                <p className="text-sm text-gray-500 inline-flex items-center gap-1.5">
                  <Clock3 size={14} /> {format(new Date(task.scheduledAt), 'dd/MM/yyyy HH:mm')}
                  {task.dosage ? ` • ${task.dosage}` : ''}
                  {task.route ? ` • ${task.route}` : ''}
                </p>
                {task.notes ? <p className="text-sm text-gray-600 mt-1">{task.notes}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => toggleDone(task.id, task.done)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 ${
                  task.done ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <CheckCircle2 size={14} />
                {task.done ? 'Concluído (desmarcar)' : 'Marcar como feito'}
              </button>
            </div>
          ))}
          {!selectedInternmentTasks.length && (
            <p className="text-sm text-gray-500">
              Nenhum lançamento para o internamento selecionado nesta data.
            </p>
          )}
        </div>
      </section>

      <Modal
        isOpen={quickModalOpen}
        onClose={() => setQuickModalOpen(false)}
        title={`Novo lançamento • ${normalizeHour(quickHour)}h`}
      >
        <form onSubmit={createQuickTask} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
            />
            <select
              value={quickInternmentId}
              onChange={(e) => setQuickInternmentId(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              {internments.map((item) => (
                <option key={item.id} value={item.id}>
                  {getPatientName(item.patientId)} • Leito {item.bed}
                </option>
              ))}
            </select>
          </div>

          <input
            required
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            placeholder="Medicação/procedimento"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="Dose"
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
            />
            <input
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              placeholder="Via"
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
            />
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Descrição do que deve ser feito"
            className="w-full min-h-[80px] px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setQuickModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary text-white font-semibold inline-flex items-center gap-2"
            >
              <Plus size={14} /> Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
