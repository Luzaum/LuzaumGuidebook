import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarClock, PencilLine, Plus, X } from 'lucide-react';

import { createEntityId } from '../lib/createId';
import { getTaskCategoryLabel, getTaskPriorityLabel } from '../lib/presentation';
import { Task, TaskCategory, TaskPriority } from '../types';
import { usePlantaoVetStore } from '../store/usePlantaoVetStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

const TASK_CATEGORIES: TaskCategory[] = [
  'exam',
  'procedure',
  'feeding',
  'medication',
  'monitoring',
  'tutor',
  'discharge',
  'documents',
  'other',
];

const TASK_PRIORITIES: TaskPriority[] = ['high', 'medium', 'low'];

interface TaskEditorDialogProps {
  open: boolean;
  onClose: () => void;
  shiftId: string | null;
  shiftPatientId: string | null;
  patientLabel?: string;
  initialTask?: Task | null;
}

export function TaskEditorDialog({
  open,
  onClose,
  shiftId,
  shiftPatientId,
  patientLabel,
  initialTask,
}: TaskEditorDialogProps) {
  const upsertTask = usePlantaoVetStore((state) => state.upsertTask);
  const [form, setForm] = useState({
    title: '',
    category: 'monitoring' as TaskCategory,
    priority: 'medium' as TaskPriority,
    scheduledTime: '',
    description: '',
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm({
      title: initialTask?.title || '',
      category: initialTask?.category || 'monitoring',
      priority: initialTask?.priority || 'medium',
      scheduledTime: initialTask?.scheduledTime || '',
      description: initialTask?.description || '',
    });
  }, [initialTask, open]);

  const dialogTitle = useMemo(
    () => (initialTask ? 'Editar tarefa do paciente' : 'Nova tarefa do paciente'),
    [initialTask]
  );

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetAndClose() {
    setForm({
      title: '',
      category: 'monitoring',
      priority: 'medium',
      scheduledTime: '',
      description: '',
    });
    onClose();
  }

  function handleSubmit() {
    if (!shiftId || !shiftPatientId || !form.title.trim()) {
      return;
    }

    upsertTask({
      id: initialTask?.id || createEntityId('task'),
      shiftId,
      shiftPatientId,
      title: form.title.trim(),
      description: form.description.trim(),
      scheduledTime: form.scheduledTime.trim() || null,
      category: form.category,
      priority: form.priority,
      completed: initialTask?.completed || false,
      completedAt: initialTask?.completedAt || null,
    });

    resetAndClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="plantao-vet-backdrop" onClick={resetAndClose} aria-label="Fechar editor de tarefa" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            className="plantao-vet-modal relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl"
          >
            <div className="border-b border-[var(--pv-border)] px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[var(--pv-text-main)]">{dialogTitle}</h2>
                  <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                    {patientLabel
                      ? `Tarefa vinculada a ${patientLabel}.`
                      : 'Preencha os detalhes operacionais desta pendencia.'}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={resetAndClose} aria-label="Fechar dialogo">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <Input
                  placeholder="Titulo da tarefa"
                  value={form.title}
                  onChange={(event) => updateField('title', event.target.value)}
                />
              </div>

              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Categoria</span>
                <select
                  className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                  value={form.category}
                  onChange={(event) => updateField('category', event.target.value as TaskCategory)}
                >
                  {TASK_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {getTaskCategoryLabel(category)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Prioridade</span>
                <select
                  className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                  value={form.priority}
                  onChange={(event) => updateField('priority', event.target.value as TaskPriority)}
                >
                  {TASK_PRIORITIES.map((priority) => (
                    <option key={priority} value={priority}>
                      {getTaskPriorityLabel(priority)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm md:col-span-2">
                <span className="font-medium text-[var(--pv-text-main)]">Horario programado</span>
                <div className="relative">
                  <CalendarClock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--pv-text-muted)]" />
                  <Input
                    placeholder="Ex.: 08:00"
                    className="pl-9"
                    value={form.scheduledTime}
                    onChange={(event) => updateField('scheduledTime', event.target.value)}
                  />
                </div>
              </label>

              <label className="space-y-2 text-sm md:col-span-2">
                <span className="font-medium text-[var(--pv-text-main)]">Observacoes</span>
                <Textarea
                  placeholder="Detalhes importantes para executar a tarefa"
                  className="min-h-[120px] resize-y"
                  value={form.description}
                  onChange={(event) => updateField('description', event.target.value)}
                />
              </label>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[var(--pv-border)] px-6 py-5 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={resetAndClose}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={!shiftId || !shiftPatientId || !form.title.trim()}>
                {initialTask ? <PencilLine className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {initialTask ? 'Salvar tarefa' : 'Adicionar tarefa'}
              </Button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
