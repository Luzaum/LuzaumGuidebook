import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Plus, X } from 'lucide-react';

import { breedOptionsForSpecies } from '../../receituario-vet/rxReferenceData';
import { createEntityId } from '../lib/createId';
import {
  createEmptyNutritionSupport,
  createEmptyShiftPatientFields,
  createMedicationEntryFromName,
  createWeightRecord,
} from '../lib/shiftPatientDefaults';
import { getActiveShift, usePlantaoVetSnapshot } from '../store/selectors';
import { usePlantaoVetStore } from '../store/usePlantaoVetStore';
import { usePlantaoVetUiStore } from '../store/usePlantaoVetUiStore';
import { Species } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

interface ManualPatientDialogProps {
  open: boolean;
  onClose: () => void;
}

type ManualPatientForm = {
  name: string;
  tutorName: string;
  species: Species;
  breed: string;
  ageLabel: string;
  weightLabel: string;
  mainDiagnosis: string;
  summary: string;
  patientObservations: string;
  alertBadges: string[];
  medications: string[];
};

const DRAFT_KEY = 'manual-patient-dialog';

function buildDefaultForm(): ManualPatientForm {
  return {
    name: '',
    tutorName: '',
    species: 'canina',
    breed: '',
    ageLabel: '',
    weightLabel: '',
    mainDiagnosis: '',
    summary: '',
    patientObservations: '',
    alertBadges: [''],
    medications: [''],
  };
}

function speciesToRx(species: Species) {
  return species === 'felina' ? 'Felina' : 'Canina';
}

function repairLabel(value: string) {
  return value
    .replace(/Ã§/g, 'ç')
    .replace(/Ã£/g, 'ã')
    .replace(/Ã©/g, 'é')
    .replace(/Ãª/g, 'ê')
    .replace(/Ã¡/g, 'á')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãµ/g, 'õ')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã­/g, 'í');
}

export function ManualPatientDialog({ open, onClose }: ManualPatientDialogProps) {
  const snapshot = usePlantaoVetSnapshot();
  const upsertPatientMaster = usePlantaoVetStore((state) => state.upsertPatientMaster);
  const upsertShiftPatient = usePlantaoVetStore((state) => state.upsertShiftPatient);
  const uiDraft = usePlantaoVetUiStore((state) => state.drafts[DRAFT_KEY]);
  const setDraft = usePlantaoVetUiStore((state) => state.setDraft);
  const clearDraft = usePlantaoVetUiStore((state) => state.clearDraft);
  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);
  const [form, setForm] = useState<ManualPatientForm>(buildDefaultForm());

  useEffect(() => {
    if (!open) return;
    if (!uiDraft) {
      setForm(buildDefaultForm());
      return;
    }

    try {
      const parsed = JSON.parse(uiDraft) as ManualPatientForm;
      setForm({
        ...buildDefaultForm(),
        ...parsed,
        alertBadges: parsed.alertBadges?.length ? parsed.alertBadges : [''],
        medications: parsed.medications?.length ? parsed.medications : [''],
      });
    } catch {
      setForm(buildDefaultForm());
    }
  }, [open, uiDraft]);

  useEffect(() => {
    if (!open) return;
    setDraft(DRAFT_KEY, JSON.stringify(form));
  }, [form, open, setDraft]);

  const breedOptions = useMemo(
    () => breedOptionsForSpecies(speciesToRx(form.species)).map(repairLabel),
    [form.species]
  );

  function updateField<K extends keyof ManualPatientForm>(key: K, value: ManualPatientForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateListField(key: 'alertBadges' | 'medications', index: number, value: string) {
    setForm((current) => ({
      ...current,
      [key]: current[key].map((entry, entryIndex) => (entryIndex === index ? value : entry)),
    }));
  }

  function appendListField(key: 'alertBadges' | 'medications') {
    setForm((current) => ({ ...current, [key]: [...current[key], ''] }));
  }

  function removeListField(key: 'alertBadges' | 'medications', index: number) {
    setForm((current) => ({
      ...current,
      [key]: current[key].length > 1 ? current[key].filter((_, entryIndex) => entryIndex !== index) : [''],
    }));
  }

  function isDirty() {
    return JSON.stringify(form) !== JSON.stringify(buildDefaultForm());
  }

  function handleRequestClose() {
    if (isDirty() && !window.confirm('Existem dados preenchidos neste cadastro manual. Deseja realmente fechar?')) {
      return;
    }
    onClose();
  }

  function resetAndClose() {
    clearDraft(DRAFT_KEY);
    setForm(buildDefaultForm());
    onClose();
  }

  function handleSubmit() {
    if (!activeShift || !form.name.trim()) {
      return;
    }

    const patientMasterId = createEntityId('patient-master');
    const shiftPatientId = createEntityId('shift-patient');
    const weightLabel = form.weightLabel.trim();
    const alertBadges = form.alertBadges.map((value) => value.trim()).filter(Boolean);
    const medicationNames = form.medications.map((value) => value.trim()).filter(Boolean);

    upsertPatientMaster({
      id: patientMasterId,
      clinicId: snapshot.scopeClinicId,
      name: form.name.trim(),
      species: form.species,
      breed: form.breed.trim(),
      sex: 'unknown',
      ageLabel: form.ageLabel.trim(),
      weightLabel,
      tutorName: form.tutorName.trim(),
    });

    upsertShiftPatient({
      ...createEmptyShiftPatientFields(),
      id: shiftPatientId,
      shiftId: activeShift.id,
      patientMasterId,
      displayName: form.name.trim(),
      species: form.species,
      breed: form.breed.trim(),
      ageLabel: form.ageLabel.trim(),
      weightLabel,
      baseWeightLabel: weightLabel,
      weightHistory: weightLabel ? [createWeightRecord(weightLabel, 'cadastro manual', new Date().toISOString(), true)] : [],
      tutorName: form.tutorName.trim(),
      mainDiagnosis: form.mainDiagnosis.trim(),
      status: 'watch',
      summary: form.summary.trim(),
      definingPhrase: form.mainDiagnosis.trim()
        ? `Paciente internado para acompanhamento de ${form.mainDiagnosis.trim().toLowerCase()}.`
        : '',
      patientObservations: form.patientObservations.trim(),
      alertBadges,
      tags: alertBadges,
      medicationsInUse: medicationNames,
      medicationEntries: medicationNames.map((name) => createMedicationEntryFromName(name)),
      vitalsRecords: [],
      examRecords: [],
      nutritionSupport: {
        ...createEmptyNutritionSupport(),
        currentWeight: weightLabel,
      },
      problems: form.mainDiagnosis.trim()
        ? [
            {
              id: createEntityId('problem'),
              title: form.mainDiagnosis.trim(),
              status: 'active',
              priority: 'medium',
              notes: '',
              startedAt: null,
              resolvedAt: null,
              origin: 'manual',
              sourceLabel: 'cadastro manual',
              reviewRequired: false,
              deletedAt: null,
            },
          ]
        : [],
      dailySummaryEntries: [],
      importedFromShiftId: null,
      importedFromDate: null,
      importedFromShiftType: null,
      sourceRecordText: null,
      importWarnings: [],
      lastBulletinAt: null,
    });

    resetAndClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="plantao-vet-backdrop" onClick={handleRequestClose} aria-label="Fechar cadastro manual" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            className="plantao-vet-modal relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl"
          >
            <div className="border-b border-[var(--pv-border)] px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[var(--pv-text-main)]">Adicionar paciente</h2>
                  <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                    Cadastro manual completo dentro do plantão ativo, com rascunho salvo localmente.
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleRequestClose} aria-label="Fechar diálogo">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2">
              <Input placeholder="Nome do paciente" value={form.name} onChange={(event) => updateField('name', event.target.value)} />
              <Input placeholder="Nome do tutor" value={form.tutorName} onChange={(event) => updateField('tutorName', event.target.value)} />

              <select
                className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                value={form.species}
                onChange={(event) => updateField('species', event.target.value as Species)}
              >
                <option value="canina">Canino</option>
                <option value="felina">Felino</option>
                <option value="outra">Outra</option>
              </select>
              <div>
                <Input
                  placeholder="Raça"
                  list="plantao-vet-breed-options"
                  value={form.breed}
                  onChange={(event) => updateField('breed', event.target.value)}
                />
                <datalist id="plantao-vet-breed-options">
                  {breedOptions.map((breed) => (
                    <option key={breed} value={breed} />
                  ))}
                </datalist>
              </div>

              <Input placeholder="Idade" value={form.ageLabel} onChange={(event) => updateField('ageLabel', event.target.value)} />
              <Input placeholder="Peso" value={form.weightLabel} onChange={(event) => updateField('weightLabel', event.target.value)} />

              <div className="md:col-span-2">
                <Input
                  placeholder="Diagnóstico / suspeita"
                  value={form.mainDiagnosis}
                  onChange={(event) => updateField('mainDiagnosis', event.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <Textarea placeholder="Resumo do caso" value={form.summary} onChange={(event) => updateField('summary', event.target.value)} />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  placeholder="Observações do paciente (comportamento, agressividade, manejo, observações gerais)"
                  value={form.patientObservations}
                  onChange={(event) => updateField('patientObservations', event.target.value)}
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[var(--pv-text-main)]">Alertas</p>
                  <Button variant="outline" size="sm" onClick={() => appendListField('alertBadges')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar alerta
                  </Button>
                </div>
                {form.alertBadges.map((alertValue, index) => (
                  <div key={`alert-${index}`} className="flex gap-2">
                    <Input
                      placeholder="Ex.: Agressivo, cardiopata, isolamento, sonda"
                      value={alertValue}
                      onChange={(event) => updateListField('alertBadges', index, event.target.value)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeListField('alertBadges', index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[var(--pv-text-main)]">Medicações em uso</p>
                  <Button variant="outline" size="sm" onClick={() => appendListField('medications')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar medicação
                  </Button>
                </div>
                {form.medications.map((medicationValue, index) => (
                  <div key={`med-${index}`} className="flex gap-2">
                    <Input
                      placeholder="Ex.: Dipirona 500 mg/mL, 25 mg/kg, BID"
                      value={medicationValue}
                      onChange={(event) => updateListField('medications', index, event.target.value)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeListField('medications', index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {isDirty() ? (
              <div className="mx-6 mb-2 flex items-center gap-2 rounded-xl border border-[var(--pv-warning-border)] bg-[var(--pv-warning-bg)] px-4 py-3 text-sm text-[var(--pv-text-main)]">
                <AlertTriangle className="h-4 w-4 text-[var(--pv-warning-text)]" />
                Este modal mantém rascunho local e não fecha automaticamente se houver dados preenchidos.
              </div>
            ) : null}

            <div className="flex flex-col-reverse gap-3 border-t border-[var(--pv-border)] px-6 py-5 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={handleRequestClose}>
                Fechar
              </Button>
              <Button variant="secondary" onClick={resetAndClose}>
                Limpar rascunho
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
