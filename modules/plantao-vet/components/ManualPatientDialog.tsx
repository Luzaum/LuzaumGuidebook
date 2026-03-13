import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

import { createEntityId } from '../lib/createId';
import { getActiveShift, usePlantaoVetSnapshot } from '../store/selectors';
import { usePlantaoVetStore } from '../store/usePlantaoVetStore';
import { Species } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

interface ManualPatientDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ManualPatientDialog({ open, onClose }: ManualPatientDialogProps) {
  const snapshot = usePlantaoVetSnapshot();
  const upsertPatientMaster = usePlantaoVetStore((state) => state.upsertPatientMaster);
  const upsertShiftPatient = usePlantaoVetStore((state) => state.upsertShiftPatient);
  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);

  const [form, setForm] = useState({
    name: '',
    species: 'canina' as Species,
    breed: '',
    ageLabel: '',
    weightLabel: '',
    tutorName: '',
    mainDiagnosis: '',
    summary: '',
    definingPhrase: '',
    alerts: '',
    medications: '',
  });

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetAndClose() {
    setForm({
      name: '',
      species: 'canina',
      breed: '',
      ageLabel: '',
      weightLabel: '',
      tutorName: '',
      mainDiagnosis: '',
      summary: '',
      definingPhrase: '',
      alerts: '',
      medications: '',
    });
    onClose();
  }

  function handleSubmit() {
    if (!activeShift || !form.name.trim()) {
      return;
    }

    const patientMasterId = createEntityId('patient-master');
    const shiftPatientId = createEntityId('shift-patient');

    upsertPatientMaster({
      id: patientMasterId,
      clinicId: snapshot.scopeClinicId,
      name: form.name.trim(),
      species: form.species,
      breed: form.breed.trim(),
      sex: 'unknown',
      ageLabel: form.ageLabel.trim(),
      weightLabel: form.weightLabel.trim(),
      tutorName: form.tutorName.trim(),
    });

    upsertShiftPatient({
      id: shiftPatientId,
      shiftId: activeShift.id,
      patientMasterId,
      displayName: form.name.trim(),
      species: form.species,
      breed: form.breed.trim(),
      ageLabel: form.ageLabel.trim(),
      weightLabel: form.weightLabel.trim(),
      tutorName: form.tutorName.trim(),
      mainDiagnosis: form.mainDiagnosis.trim(),
      status: 'watch',
      summary: form.summary.trim(),
      definingPhrase: form.definingPhrase.trim(),
      importantNotes: '',
      nextShiftPlan: '',
      alertBadges: form.alerts
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      medicationsInUse: form.medications
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      problems: [],
      importedFromShiftId: null,
      importedFromDate: null,
      importedFromShiftType: null,
      sourceRecordText: null,
      lastBulletinAt: null,
    });

    resetAndClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="plantao-vet-backdrop" onClick={resetAndClose} aria-label="Fechar cadastro manual" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            className="plantao-vet-modal relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl"
          >
            <div className="border-b border-[var(--pv-border)] px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[var(--pv-text-main)]">Adicionar paciente</h2>
                  <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                    Cadastro rapido do paciente direto no plantao ativo.
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={resetAndClose} aria-label="Fechar dialogo">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2">
              <Input placeholder="Nome do paciente" value={form.name} onChange={(event) => updateField('name', event.target.value)} />
              <Input placeholder="Tutor" value={form.tutorName} onChange={(event) => updateField('tutorName', event.target.value)} />
              <select
                className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                value={form.species}
                onChange={(event) => updateField('species', event.target.value as Species)}
              >
                <option value="canina">Canina</option>
                <option value="felina">Felina</option>
                <option value="outra">Outra</option>
              </select>
              <Input placeholder="Raca" value={form.breed} onChange={(event) => updateField('breed', event.target.value)} />
              <Input placeholder="Idade" value={form.ageLabel} onChange={(event) => updateField('ageLabel', event.target.value)} />
              <Input placeholder="Peso" value={form.weightLabel} onChange={(event) => updateField('weightLabel', event.target.value)} />
              <div className="md:col-span-2">
                <Input
                  placeholder="Diagnostico / suspeita"
                  value={form.mainDiagnosis}
                  onChange={(event) => updateField('mainDiagnosis', event.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Textarea placeholder="Resumo do caso" value={form.summary} onChange={(event) => updateField('summary', event.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Input
                  placeholder="Frase definidora"
                  value={form.definingPhrase}
                  onChange={(event) => updateField('definingPhrase', event.target.value)}
                />
              </div>
              <Input
                placeholder="Alertas (separados por virgula)"
                value={form.alerts}
                onChange={(event) => updateField('alerts', event.target.value)}
              />
              <Input
                placeholder="Medicacoes em uso (separadas por virgula)"
                value={form.medications}
                onChange={(event) => updateField('medications', event.target.value)}
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[var(--pv-border)] px-6 py-5 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={resetAndClose}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={!activeShift || !form.name.trim()}>
                <Plus className="mr-2 h-4 w-4" />
                Criar paciente
              </Button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
