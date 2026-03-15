import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PencilLine, Plus, X } from 'lucide-react';

import { createEntityId } from '../lib/createId';
import { PatientVitalsRecord } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

interface VitalsRecordDialogProps {
  open: boolean;
  onClose: () => void;
  initialRecord?: PatientVitalsRecord | null;
  onSubmit: (record: PatientVitalsRecord) => void;
}

function buildDefaultForm() {
  const now = new Date();
  return {
    date: now.toISOString().slice(0, 10),
    time: now.toISOString().slice(11, 16),
    authorLabel: '',
    heartRate: '',
    respiratoryRate: '',
    temperature: '',
    systolicPressure: '',
    glucose: '',
    mucousMembranes: '',
    capillaryRefillTime: '',
    cardiacAuscultation: '',
    pulmonaryAuscultation: '',
    pain: '',
    mentalState: '',
    hydration: '',
    vomiting: 'no' as 'yes' | 'no',
    vomitingDescription: '',
    diarrhea: 'no' as 'yes' | 'no',
    diarrheaDescription: '',
    urinated: 'unknown' as 'yes' | 'no' | 'unknown',
    defecated: 'unknown' as 'yes' | 'no' | 'unknown',
    fed: 'unknown' as 'yes' | 'no' | 'unknown',
    feedingDetails: '',
    appetite: 'unknown' as 'yes' | 'no' | 'unknown',
    observations: '',
  };
}

function booleanFromField(value: 'yes' | 'no' | 'unknown') {
  if (value === 'yes') return true;
  if (value === 'no') return false;
  return null;
}

function fieldFromBoolean(value: boolean | null) {
  if (value === true) return 'yes';
  if (value === false) return 'no';
  return 'unknown';
}

export function VitalsRecordDialog({ open, onClose, initialRecord, onSubmit }: VitalsRecordDialogProps) {
  const [form, setForm] = useState(buildDefaultForm());

  useEffect(() => {
    if (!open) {
      return;
    }

    if (!initialRecord) {
      setForm(buildDefaultForm());
      return;
    }

    const recordedDate = new Date(initialRecord.recordedAt);
    setForm({
      date: recordedDate.toISOString().slice(0, 10),
      time: recordedDate.toISOString().slice(11, 16),
      authorLabel: initialRecord.authorLabel,
      heartRate: initialRecord.heartRate,
      respiratoryRate: initialRecord.respiratoryRate,
      temperature: initialRecord.temperature,
      systolicPressure: initialRecord.systolicPressure,
      glucose: initialRecord.glucose,
      mucousMembranes: initialRecord.mucousMembranes,
      capillaryRefillTime: initialRecord.capillaryRefillTime,
      cardiacAuscultation: initialRecord.cardiacAuscultation,
      pulmonaryAuscultation: initialRecord.pulmonaryAuscultation,
      pain: initialRecord.pain,
      mentalState: initialRecord.mentalState || '',
      hydration: initialRecord.hydration,
      vomiting: initialRecord.vomiting ? 'yes' : 'no',
      vomitingDescription: initialRecord.vomitingDescription || '',
      diarrhea: initialRecord.diarrhea ? 'yes' : 'no',
      diarrheaDescription: initialRecord.diarrheaDescription || '',
      urinated: fieldFromBoolean(initialRecord.urinated),
      defecated: fieldFromBoolean(initialRecord.defecated),
      fed: fieldFromBoolean(initialRecord.fed),
      feedingDetails: initialRecord.feedingDetails || '',
      appetite: fieldFromBoolean(initialRecord.appetite),
      observations: initialRecord.observations,
    });
  }, [initialRecord, open]);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit() {
    onSubmit({
      id: initialRecord?.id || createEntityId('vitals'),
      recordedAt: new Date(`${form.date}T${form.time}:00`).toISOString(),
      authorLabel: form.authorLabel.trim(),
      heartRate: form.heartRate.trim(),
      respiratoryRate: form.respiratoryRate.trim(),
      temperature: form.temperature.trim(),
      systolicPressure: form.systolicPressure.trim(),
      glucose: form.glucose.trim(),
      mucousMembranes: form.mucousMembranes.trim(),
      capillaryRefillTime: form.capillaryRefillTime.trim(),
      cardiacAuscultation: form.cardiacAuscultation.trim(),
      pulmonaryAuscultation: form.pulmonaryAuscultation.trim(),
      pain: form.pain.trim(),
      mentalState: form.mentalState.trim(),
      hydration: form.hydration.trim(),
      vomiting: form.vomiting === 'yes',
      vomitingDescription: form.vomiting === 'yes' ? form.vomitingDescription.trim() : '',
      diarrhea: form.diarrhea === 'yes',
      diarrheaDescription: form.diarrhea === 'yes' ? form.diarrheaDescription.trim() : '',
      urinated: booleanFromField(form.urinated),
      defecated: booleanFromField(form.defecated),
      fed: booleanFromField(form.fed),
      feedingDetails: form.fed === 'yes' ? form.feedingDetails.trim() : '',
      appetite: booleanFromField(form.appetite),
      observations: form.observations.trim(),
    });
    onClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="plantao-vet-backdrop" onClick={onClose} aria-label="Fechar parâmetros" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            className="plantao-vet-modal relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl"
          >
            <div className="border-b border-[var(--pv-border)] px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[var(--pv-text-main)]">
                    {initialRecord ? 'Editar parâmetros' : 'Novo registro de parâmetros'}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                    Registre sinais vitais, estado mental, eliminações e alimentação do paciente.
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
              <Input type="date" value={form.date} onChange={(e) => updateField('date', e.target.value)} />
              <Input type="time" value={form.time} onChange={(e) => updateField('time', e.target.value)} />
              <Input placeholder="Autor opcional" value={form.authorLabel} onChange={(e) => updateField('authorLabel', e.target.value)} />
              <Input placeholder="Estado mental" value={form.mentalState} onChange={(e) => updateField('mentalState', e.target.value)} />
              <Input placeholder="FC" value={form.heartRate} onChange={(e) => updateField('heartRate', e.target.value)} />
              <Input placeholder="FR" value={form.respiratoryRate} onChange={(e) => updateField('respiratoryRate', e.target.value)} />
              <Input placeholder="TR" value={form.temperature} onChange={(e) => updateField('temperature', e.target.value)} />
              <Input placeholder="PAS" value={form.systolicPressure} onChange={(e) => updateField('systolicPressure', e.target.value)} />
              <Input placeholder="Glicemia" value={form.glucose} onChange={(e) => updateField('glucose', e.target.value)} />
              <Input placeholder="Mucosas" value={form.mucousMembranes} onChange={(e) => updateField('mucousMembranes', e.target.value)} />
              <Input placeholder="TPC" value={form.capillaryRefillTime} onChange={(e) => updateField('capillaryRefillTime', e.target.value)} />
              <Input placeholder="Hidratação" value={form.hydration} onChange={(e) => updateField('hydration', e.target.value)} />
              <Input placeholder="Ausculta cardíaca" value={form.cardiacAuscultation} onChange={(e) => updateField('cardiacAuscultation', e.target.value)} />
              <Input placeholder="Ausculta pulmonar" value={form.pulmonaryAuscultation} onChange={(e) => updateField('pulmonaryAuscultation', e.target.value)} />
              <Input placeholder="Dor" value={form.pain} onChange={(e) => updateField('pain', e.target.value)} />
              <div className="hidden xl:block" />

              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Vômito</span>
                <select className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={form.vomiting} onChange={(e) => updateField('vomiting', e.target.value as 'yes' | 'no')}>
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Diarreia</span>
                <select className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={form.diarrhea} onChange={(e) => updateField('diarrhea', e.target.value as 'yes' | 'no')}>
                  <option value="no">Não</option>
                  <option value="yes">Sim</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Urinou</span>
                <select className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={form.urinated} onChange={(e) => updateField('urinated', e.target.value as 'yes' | 'no' | 'unknown')}>
                  <option value="unknown">Não informado</option>
                  <option value="yes">Sim</option>
                  <option value="no">Não</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Defecou</span>
                <select className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={form.defecated} onChange={(e) => updateField('defecated', e.target.value as 'yes' | 'no' | 'unknown')}>
                  <option value="unknown">Não informado</option>
                  <option value="yes">Sim</option>
                  <option value="no">Não</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Alimentou</span>
                <select className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={form.fed} onChange={(e) => updateField('fed', e.target.value as 'yes' | 'no' | 'unknown')}>
                  <option value="unknown">Não informado</option>
                  <option value="yes">Sim</option>
                  <option value="no">Não</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-medium text-[var(--pv-text-main)]">Apetite</span>
                <select className="h-10 w-full rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={form.appetite} onChange={(e) => updateField('appetite', e.target.value as 'yes' | 'no' | 'unknown')}>
                  <option value="unknown">Não informado</option>
                  <option value="yes">Sim</option>
                  <option value="no">Não</option>
                </select>
              </label>

              {form.vomiting === 'yes' ? (
                <div className="md:col-span-2">
                  <Input placeholder="Descrição do vômito" value={form.vomitingDescription} onChange={(e) => updateField('vomitingDescription', e.target.value)} />
                </div>
              ) : null}
              {form.diarrhea === 'yes' ? (
                <div className="md:col-span-2">
                  <Input placeholder="Descrição da diarreia" value={form.diarrheaDescription} onChange={(e) => updateField('diarrheaDescription', e.target.value)} />
                </div>
              ) : null}
              {form.fed === 'yes' ? (
                <div className="md:col-span-2">
                  <Input placeholder="Alimento recebido / via alimentar" value={form.feedingDetails} onChange={(e) => updateField('feedingDetails', e.target.value)} />
                </div>
              ) : null}

              <div className="md:col-span-2 xl:col-span-4">
                <Textarea
                  className="min-h-[120px] resize-y"
                  placeholder="Observações gerais"
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
                {initialRecord ? 'Salvar parâmetros' : 'Adicionar parâmetros'}
              </Button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
