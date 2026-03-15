import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PencilLine, Plus, X } from 'lucide-react';

import { createEntityId } from '../lib/createId';
import { getExamCategoryLabel } from '../lib/patientClinical';
import { ExamCategory, PatientExamRecord } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

const EXAM_CATEGORIES: ExamCategory[] = [
  'hemogram',
  'biochemical',
  'electrolytes',
  'urinalysis',
  'blood_gas',
  'imaging',
  'rapid',
  'other',
];

interface ExamRecordDialogProps {
  open: boolean;
  onClose: () => void;
  initialRecord?: PatientExamRecord | null;
  onSubmit: (record: PatientExamRecord) => void;
}

function buildDefaultForm() {
  return {
    category: 'hemogram' as ExamCategory,
    recordedAt: new Date().toISOString().slice(0, 16),
    title: '',
    summary: '',
    findings: '',
    observations: '',
  };
}

export function ExamRecordDialog({ open, onClose, initialRecord, onSubmit }: ExamRecordDialogProps) {
  const [form, setForm] = useState(buildDefaultForm());

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm(
      initialRecord
        ? {
            category: initialRecord.category,
            recordedAt: initialRecord.recordedAt.slice(0, 16),
            title: initialRecord.title,
            summary: initialRecord.summary,
            findings: initialRecord.findings,
            observations: initialRecord.observations,
          }
        : buildDefaultForm()
    );
  }, [initialRecord, open]);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit() {
    onSubmit({
      id: initialRecord?.id || createEntityId('exam'),
      category: form.category,
      recordedAt: form.recordedAt,
      title: form.title.trim(),
      summary: form.summary.trim(),
      findings: form.findings.trim(),
      observations: form.observations.trim(),
    });
    onClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="plantao-vet-backdrop" onClick={onClose} aria-label="Fechar exames" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            className="plantao-vet-modal relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl"
          >
            <div className="border-b border-[var(--pv-border)] px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[var(--pv-text-main)]">
                    {initialRecord ? 'Editar exame' : 'Novo exame'}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                    Registre laudo curto, categoria e achados principais em texto livre.
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Categoria</span>
                <select
                  className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                  value={form.category}
                  onChange={(event) => updateField('category', event.target.value as ExamCategory)}
                >
                  {EXAM_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {getExamCategoryLabel(category)}
                    </option>
                  ))}
                </select>
              </label>
              <Input type="datetime-local" value={form.recordedAt} onChange={(e) => updateField('recordedAt', e.target.value)} />
              <div className="md:col-span-2">
                <Input placeholder="Titulo do exame" value={form.title} onChange={(e) => updateField('title', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  className="min-h-[90px] resize-y"
                  placeholder="Resumo / laudo curto"
                  value={form.summary}
                  onChange={(e) => updateField('summary', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  className="min-h-[120px] resize-y font-mono text-sm"
                  placeholder="Valores principais / achados em texto livre"
                  value={form.findings}
                  onChange={(e) => updateField('findings', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  className="min-h-[90px] resize-y"
                  placeholder="Observacoes"
                  value={form.observations}
                  onChange={(e) => updateField('observations', e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[var(--pv-border)] px-6 py-5 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                {initialRecord ? <PencilLine className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {initialRecord ? 'Salvar exame' : 'Adicionar exame'}
              </Button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
