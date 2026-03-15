import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PencilLine, Plus, X } from 'lucide-react';

import { createEntityId } from '../lib/createId';
import { MedicationEntry } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

interface MedicationEditorDialogProps {
  open: boolean;
  onClose: () => void;
  initialMedication?: MedicationEntry | null;
  onSubmit: (medication: MedicationEntry) => void;
}

const FREQUENCY_OPTIONS = [
  'uma vez ao dia',
  'duas vezes ao dia',
  '4 vezes ao dia',
  '6 vezes ao dia',
  '8 vezes ao dia',
  '12 vezes ao dia',
  '24 vezes ao dia',
];

function buildDefaultForm() {
  return {
    name: '',
    concentration: '',
    dose: '',
    frequency: 'duas vezes ao dia',
    route: '',
    observations: '',
    status: 'active' as MedicationEntry['status'],
    startedAt: new Date().toISOString().slice(0, 16),
    suspendedAt: '',
    inPrescription: 'yes' as 'yes' | 'no',
  };
}

export function MedicationEditorDialog({
  open,
  onClose,
  initialMedication,
  onSubmit,
}: MedicationEditorDialogProps) {
  const [form, setForm] = useState(buildDefaultForm());

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm(
      initialMedication
        ? {
            name: initialMedication.name,
            concentration: initialMedication.concentration || '',
            dose: initialMedication.dose,
            frequency: initialMedication.frequency || 'duas vezes ao dia',
            route: initialMedication.route,
            observations: initialMedication.observations,
            status: initialMedication.status,
            startedAt: initialMedication.startedAt ? initialMedication.startedAt.slice(0, 16) : '',
            suspendedAt: initialMedication.suspendedAt ? initialMedication.suspendedAt.slice(0, 16) : '',
            inPrescription: initialMedication.inPrescription ? 'yes' : 'no',
          }
        : buildDefaultForm()
    );
  }, [initialMedication, open]);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit() {
    const timestamp = new Date().toISOString();
    const startedAt = form.startedAt ? new Date(form.startedAt).toISOString() : timestamp;

    onSubmit({
      id: initialMedication?.id || createEntityId('medication'),
      name: form.name.trim(),
      concentration: form.concentration.trim(),
      dose: form.dose.trim(),
      frequency: form.frequency.trim(),
      route: form.route.trim(),
      observations: form.observations.trim(),
      status: form.status,
      startedAt,
      suspendedAt: form.status === 'suspended' ? (form.suspendedAt ? new Date(form.suspendedAt).toISOString() : timestamp) : null,
      inPrescription: form.inPrescription === 'yes',
      newBadgeDate: initialMedication?.newBadgeDate || startedAt.slice(0, 10),
      createdAt: initialMedication?.createdAt || timestamp,
      updatedAt: timestamp,
    });

    onClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <button className="plantao-vet-backdrop" onClick={onClose} aria-label="Fechar medicação" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            className="plantao-vet-modal relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl"
          >
            <div className="border-b border-[var(--pv-border)] px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[var(--pv-text-main)]">
                    {initialMedication ? 'Editar medicação' : 'Nova medicação em uso'}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                    Registre prescrição em uso no plantão, com dose, frequência, via e status.
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2">
              <Input placeholder="Nome do medicamento" value={form.name} onChange={(e) => updateField('name', e.target.value)} />
              <Input placeholder="Concentração" value={form.concentration} onChange={(e) => updateField('concentration', e.target.value)} />
              <Input placeholder="Dose" value={form.dose} onChange={(e) => updateField('dose', e.target.value)} />
              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Frequência</span>
                <select
                  className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                  value={form.frequency}
                  onChange={(e) => updateField('frequency', e.target.value)}
                >
                  {FREQUENCY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <Input placeholder="Via" value={form.route} onChange={(e) => updateField('route', e.target.value)} />
              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Na prescrição?</span>
                <select
                  className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                  value={form.inPrescription}
                  onChange={(e) => updateField('inPrescription', e.target.value as 'yes' | 'no')}
                >
                  <option value="yes">Sim</option>
                  <option value="no">Não</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Status</span>
                <select
                  className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                  value={form.status}
                  onChange={(e) => updateField('status', e.target.value as MedicationEntry['status'])}
                >
                  <option value="active">Ativa</option>
                  <option value="suspended">Suspensa</option>
                  <option value="concluded">Concluída</option>
                </select>
              </label>
              <Input type="datetime-local" value={form.startedAt} onChange={(e) => updateField('startedAt', e.target.value)} />
              {form.status === 'suspended' ? (
                <Input
                  type="datetime-local"
                  value={form.suspendedAt}
                  onChange={(e) => updateField('suspendedAt', e.target.value)}
                />
              ) : (
                <div className="hidden md:block" />
              )}
              <div className="md:col-span-2">
                <Textarea
                  className="min-h-[120px] resize-y"
                  placeholder="Observações"
                  value={form.observations}
                  onChange={(e) => updateField('observations', e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[var(--pv-border)] px-6 py-5 sm:flex-row sm:items-center sm:justify-end">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button className="min-w-[210px]" onClick={handleSubmit} disabled={!form.name.trim()}>
                {initialMedication ? <PencilLine className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {initialMedication ? 'Salvar medicação' : 'Adicionar medicação'}
              </Button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
