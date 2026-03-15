import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, FileText, Link2, Plus, Sparkles, Trash2, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { EmptyState } from '../components/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { createEntityId } from '../lib/createId';
import { findLikelyShiftPatientMatches } from '../lib/patientMatching';
import { getExamCategoryLabel } from '../lib/patientClinical';
import { getTaskCategoryLabel, getTaskPriorityLabel } from '../lib/presentation';
import { createEmptyNutritionSupport, createEmptyShiftPatientFields } from '../lib/shiftPatientDefaults';
import { parseSmartImportText, SmartImportDraft } from '../lib/smartImport';
import { getActiveShift, getActiveShiftPatients, usePlantaoVetSnapshot } from '../store/selectors';
import { usePlantaoVetStore } from '../store/usePlantaoVetStore';
import { usePlantaoVetUiStore } from '../store/usePlantaoVetUiStore';
import { MedicationEntry, PatientExamRecord, PatientVitalsRecord, Problem, TaskCategory, TaskPriority } from '../types';

type PreviewState = { draft: SmartImportDraft; ignoredWarnings: string[] };

const TASK_CATEGORIES: TaskCategory[] = ['exam', 'procedure', 'feeding', 'medication', 'monitoring', 'tutor', 'discharge', 'documents', 'communication', 'hydration', 'nutrition', 'hygiene', 'other'];
const TASK_PRIORITIES: TaskPriority[] = ['high', 'medium', 'low'];
const normalize = (value?: string | null) => (value || '').trim().toLowerCase();
const mergeText = (current: string, incoming: string) => (!incoming ? current : !current || current === 'não informado' ? incoming : current.includes(incoming) ? current : `${current}\n\n${incoming}`.trim());
const preferText = (current: string, incoming: string) => (!incoming ? current : !current || current === 'não informado' || current.length < 3 ? incoming : incoming.length > current.length + 10 ? incoming : current);

function buildKeys(shiftId: string | null) {
  const base = `smart-import:${shiftId || 'no-shift'}`;
  return { raw: `${base}:raw`, preview: `${base}:preview`, target: `${base}:target` };
}

function buildEmptyProblem(): Problem {
  const timestamp = new Date().toISOString();
  return {
    id: createEntityId('problem'),
    title: '',
    status: 'active',
    priority: 'medium',
    notes: '',
    startedAt: null,
    resolvedAt: null,
    origin: 'manual',
    sourceLabel: 'preview',
    reviewRequired: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    deletedAt: null,
  };
}

function buildEmptyMedication(): MedicationEntry {
  const timestamp = new Date().toISOString();
  return {
    id: createEntityId('medication'),
    name: '',
    concentration: '',
    dose: '',
    frequency: '',
    route: '',
    observations: '',
    status: 'active',
    startedAt: timestamp,
    suspendedAt: null,
    inPrescription: true,
    newBadgeDate: timestamp.slice(0, 10),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function safePreview(value: unknown): PreviewState | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<PreviewState>;
  if (!candidate.draft || typeof candidate.draft !== 'object') return null;
  return { draft: candidate.draft as SmartImportDraft, ignoredWarnings: Array.isArray(candidate.ignoredWarnings) ? candidate.ignoredWarnings : [] };
}

function PreviewBlock({ title, description, actions, children }: { title: string; description?: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-3 rounded-xl border border-[var(--pv-border)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-[var(--pv-text-main)]">{title}</p>
          {description ? <p className="mt-1 text-sm text-[var(--pv-text-muted)]">{description}</p> : null}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

export function SmartImportPage() {
  const navigate = useNavigate();
  const snapshot = usePlantaoVetSnapshot();
  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);
  const activePatients = useMemo(() => getActiveShiftPatients(snapshot), [snapshot]);
  const upsertPatientMaster = usePlantaoVetStore((state) => state.upsertPatientMaster);
  const upsertShiftPatient = usePlantaoVetStore((state) => state.upsertShiftPatient);
  const upsertTask = usePlantaoVetStore((state) => state.upsertTask);
  const upsertBulletin = usePlantaoVetStore((state) => state.upsertBulletin);
  const setUiDraft = usePlantaoVetUiStore((state) => state.setDraft);
  const clearUiDraft = usePlantaoVetUiStore((state) => state.clearDraft);
  const setUiValue = usePlantaoVetUiStore((state) => state.setValue);
  const clearUiValue = usePlantaoVetUiStore((state) => state.clearValue);
  const setUiJson = usePlantaoVetUiStore((state) => state.setJson);
  const clearUiJson = usePlantaoVetUiStore((state) => state.clearJson);
  const keys = buildKeys(activeShift?.id || null);
  const storedRawText = usePlantaoVetUiStore((state) => state.drafts[keys.raw] || '');
  const storedTarget = usePlantaoVetUiStore((state) => (state.values[keys.target] as 'new' | string) || 'new');
  const storedPreviewValue = usePlantaoVetUiStore((state) => state.json[keys.preview]);
  const [rawText, setRawText] = useState('');
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<'new' | string>('new');
  const [isProcessing, setIsProcessing] = useState(false);
  const initializedScopeRef = useRef('');
  const storageScopeKey = `${keys.raw}|${keys.target}|${keys.preview}`;

  useEffect(() => {
    if (!snapshot.isHydrated || initializedScopeRef.current === storageScopeKey) return;
    initializedScopeRef.current = storageScopeKey;
    setRawText(storedRawText);
    setSelectedPatientId(storedTarget);
    setPreview(safePreview(storedPreviewValue));
  }, [snapshot.isHydrated, storageScopeKey, storedPreviewValue, storedRawText, storedTarget]);

  const draft = preview?.draft || null;
  const possibleMatches = useMemo(() => (draft ? findLikelyShiftPatientMatches(activePatients, draft.name) : []), [activePatients, draft]);

  function updateRawText(value: string) {
    setRawText(value);
    setUiDraft(keys.raw, value);
  }

  function updateSelectedPatient(value: 'new' | string) {
    setSelectedPatientId(value);
    setUiValue(keys.target, value);
  }

  function applyPreview(nextPreview: PreviewState | null) {
    setPreview(nextPreview);
    if (nextPreview) setUiJson(keys.preview, nextPreview);
    else clearUiJson(keys.preview);
  }

  function updateDraft(updater: (current: SmartImportDraft) => SmartImportDraft) {
    applyPreview(preview ? { ...preview, draft: updater(preview.draft) } : preview);
  }

  function persistImportedTasks(shiftPatientId: string, tasks: SmartImportDraft['tasks']) {
    tasks.forEach((task) =>
      upsertTask({
        id: createEntityId('task'),
        shiftId: activeShift?.id || '',
        shiftPatientId,
        title: task.title,
        description: task.description,
        scheduledTime: task.scheduledTime,
        category: task.category,
        priority: task.priority,
        completed: task.completed || false,
        completedAt: task.completed ? new Date().toISOString() : null,
        origin: 'imported',
        reviewRequired: task.reviewRequired || false,
      })
    );
  }

  function handleOrganize() {
    if (!rawText.trim()) return;
    setIsProcessing(true);
    window.setTimeout(() => {
      applyPreview({ draft: parseSmartImportText(rawText), ignoredWarnings: [] });
      updateSelectedPatient('new');
      setIsProcessing(false);
    }, 250);
  }

  function handleClear() {
    setRawText('');
    setPreview(null);
    setSelectedPatientId('new');
    clearUiDraft(keys.raw);
    clearUiValue(keys.target);
    clearUiJson(keys.preview);
  }

  function handleConfirmImport() {
    if (!activeShift || !draft) return;
    const filteredWarnings = draft.importWarnings.filter((item) => !preview?.ignoredWarnings.includes(item));

    if (selectedPatientId === 'new') {
      const patientMasterId = createEntityId('patient-master');
      const shiftPatientId = createEntityId('shift-patient');
      upsertPatientMaster({
        id: patientMasterId,
        clinicId: snapshot.scopeClinicId,
        name: draft.name,
        species: draft.species,
        breed: draft.breed,
        sex: 'unknown',
        ageLabel: draft.ageLabel,
        weightLabel: draft.weightLabel,
        tutorName: draft.tutorName,
      });
      upsertShiftPatient({
        ...createEmptyShiftPatientFields(),
        id: shiftPatientId,
        shiftId: activeShift.id,
        patientMasterId,
        displayName: draft.name,
        species: draft.species,
        breed: draft.breed,
        ageLabel: draft.ageLabel,
        weightLabel: draft.weightLabel,
        baseWeightLabel: draft.baseWeightLabel || draft.weightLabel,
        weightHistory: draft.weightHistory,
        tutorName: draft.tutorName,
        medicalRecordNumber: draft.medicalRecordNumber,
        admissionDateLabel: draft.admissionDateLabel,
        responsibleVet: draft.responsibleVet,
        belongings: draft.belongings,
        patientObservations: draft.patientObservations,
        mainDiagnosis: draft.mainDiagnosis,
        status: draft.status,
        summary: draft.summary,
        clinicalHistory: draft.clinicalHistory,
        currentComplaint: draft.currentComplaint,
        currentAdmissionReason: draft.currentAdmissionReason,
        definingPhrase: draft.definingPhrase,
        importantNotes: draft.importantNotes,
        nextShiftPlan: draft.nextShiftPlan,
        alertBadges: draft.alertBadges,
        tags: draft.tags,
        medicationsInUse: draft.medicationsInUse,
        medicationEntries: draft.medicationEntries,
        vitalsRecords: draft.vitalsRecords,
        examRecords: draft.examRecords,
        nutritionSupport: { ...createEmptyNutritionSupport(), ...draft.nutritionSupport },
        problems: draft.problems,
        dailySummaryEntries: draft.dailySummaryEntries.map((entry) => ({ ...entry, shiftId: activeShift.id, shiftPatientId })),
        sourceRecordText: rawText,
        importWarnings: filteredWarnings,
        lastBulletinAt: null,
      });
      persistImportedTasks(shiftPatientId, draft.tasks);
      draft.bulletinDrafts.forEach((bulletin) => {
        if (!bulletin.content.trim()) return;
        upsertBulletin({
          id: createEntityId('bulletin'),
          shiftId: activeShift.id,
          shiftPatientId,
          type: bulletin.type,
          title: bulletin.title,
          content: bulletin.content,
          authorLabel: bulletin.authorLabel || 'Importação',
          generated: true,
          manualEdited: false,
        });
      });
      handleClear();
      navigate(`/plantao-vet/paciente/${shiftPatientId}`);
      return;
    }

    const existing = activePatients.find((patient) => patient.id === selectedPatientId);
    if (!existing) return;

    upsertPatientMaster({
      id: existing.patientMasterId,
      clinicId: snapshot.scopeClinicId,
      name: preferText(existing.displayName, draft.name),
      species: existing.species !== 'outra' ? existing.species : draft.species,
      breed: preferText(existing.breed, draft.breed),
      sex: 'unknown',
      ageLabel: preferText(existing.ageLabel, draft.ageLabel),
      weightLabel: preferText(existing.weightLabel, draft.weightLabel),
      tutorName: preferText(existing.tutorName, draft.tutorName),
    });

    upsertShiftPatient({
      ...existing,
      displayName: preferText(existing.displayName, draft.name),
      species: existing.species !== 'outra' ? existing.species : draft.species,
      breed: preferText(existing.breed, draft.breed),
      ageLabel: preferText(existing.ageLabel, draft.ageLabel),
      weightLabel: preferText(existing.weightLabel, draft.weightLabel),
      baseWeightLabel: preferText(existing.baseWeightLabel || existing.weightLabel, draft.baseWeightLabel || draft.weightLabel),
      weightHistory: [...existing.weightHistory, ...draft.weightHistory].filter((item, index, list) => list.findIndex((candidate) => `${normalize(candidate.label)}|${candidate.recordedAt}` === `${normalize(item.label)}|${item.recordedAt}`) === index),
      tutorName: preferText(existing.tutorName, draft.tutorName),
      medicalRecordNumber: preferText(existing.medicalRecordNumber, draft.medicalRecordNumber),
      admissionDateLabel: preferText(existing.admissionDateLabel, draft.admissionDateLabel),
      responsibleVet: preferText(existing.responsibleVet, draft.responsibleVet),
      belongings: mergeText(existing.belongings, draft.belongings),
      patientObservations: mergeText(existing.patientObservations, draft.patientObservations),
      mainDiagnosis: preferText(existing.mainDiagnosis, draft.mainDiagnosis),
      summary: preferText(existing.summary, draft.summary),
      clinicalHistory: mergeText(existing.clinicalHistory, draft.clinicalHistory),
      currentComplaint: preferText(existing.currentComplaint, draft.currentComplaint),
      currentAdmissionReason: preferText(existing.currentAdmissionReason, draft.currentAdmissionReason),
      definingPhrase: preferText(existing.definingPhrase, draft.definingPhrase),
      importantNotes: mergeText(existing.importantNotes, draft.importantNotes),
      nextShiftPlan: mergeText(existing.nextShiftPlan, draft.nextShiftPlan),
      alertBadges: [...new Set([...existing.alertBadges, ...draft.alertBadges])],
      tags: [...new Set([...(existing.tags || []), ...(draft.tags || [])])],
      medicationEntries: [...existing.medicationEntries, ...draft.medicationEntries],
      medicationsInUse: [...new Set([...(existing.medicationsInUse || []), ...draft.medicationsInUse])],
      vitalsRecords: [...existing.vitalsRecords, ...draft.vitalsRecords].filter((item, index, list) => list.findIndex((candidate) => `${candidate.recordedAt}|${normalize(candidate.heartRate)}|${normalize(candidate.temperature)}` === `${item.recordedAt}|${normalize(item.heartRate)}|${normalize(item.temperature)}`) === index),
      examRecords: [...existing.examRecords, ...draft.examRecords].filter((item, index, list) => list.findIndex((candidate) => `${normalize(candidate.title)}|${candidate.recordedAt}|${normalize(candidate.mainFinding)}` === `${normalize(item.title)}|${item.recordedAt}|${normalize(item.mainFinding)}`) === index),
      nutritionSupport: { ...existing.nutritionSupport, ...draft.nutritionSupport },
      problems: [...existing.problems, ...draft.problems].filter((item, index, list) => list.findIndex((candidate) => normalize(candidate.title) === normalize(item.title)) === index),
      dailySummaryEntries: [...draft.dailySummaryEntries.map((entry) => ({ ...entry, shiftId: existing.shiftId, shiftPatientId: existing.id })), ...existing.dailySummaryEntries],
      sourceRecordText: mergeText(existing.sourceRecordText || '', rawText),
      importWarnings: [...new Set([...(existing.importWarnings || []), ...filteredWarnings])],
    });

    persistImportedTasks(existing.id, draft.tasks);
    draft.bulletinDrafts.forEach((bulletin) => {
      if (!bulletin.content.trim()) return;
      upsertBulletin({
        id: createEntityId('bulletin'),
        shiftId: activeShift.id,
        shiftPatientId: existing.id,
        type: bulletin.type,
        title: bulletin.title,
        content: bulletin.content,
        authorLabel: bulletin.authorLabel || 'Importação',
        generated: true,
        manualEdited: false,
      });
    });
    handleClear();
    navigate(`/plantao-vet/paciente/${existing.id}`);
  }

  if (!snapshot.isHydrated) return <div className="px-2 py-6 text-sm text-[var(--pv-text-muted)]">Carregando módulo...</div>;
  if (!activeShift) {
    return (
      <div className="space-y-8 pb-12">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-[var(--pv-text-main)]">
            <Sparkles className="h-8 w-8 text-[var(--pv-primary)]" />
            Prontuário inteligente
          </h1>
          <p className="mt-2 text-lg text-[var(--pv-text-muted)]">Cole o texto bruto da ficha do paciente para organizar as informações dentro do plantão ativo.</p>
        </div>
        <EmptyState icon={FileText} eyebrow="Importação com contexto" title="Nenhum plantão ativo para receber um prontuário" description="A importação sempre grava dentro do plantão ativo selecionado. Abra ou crie um plantão na topbar para receber o paciente no turno correto." primaryAction={{ label: 'Voltar ao dashboard', href: '/plantao-vet/dashboard' }} />
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-8 pb-12">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-[var(--pv-text-main)]">
          <Sparkles className="h-8 w-8 text-[var(--pv-primary)]" />
          Prontuário inteligente
        </h1>
        <p className="mt-2 text-lg text-[var(--pv-text-muted)]">Cole o texto bruto da ficha do paciente. O sistema extrai um preview estruturado, permite corrigir tudo antes de salvar e sugere vínculo quando houver caso semelhante no plantão ativo.</p>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <Card className="relative min-w-0 overflow-hidden border-[var(--pv-border)] shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-[var(--pv-primary)]" />Texto bruto do prontuário</CardTitle>
            <CardDescription>Cole histórico, evolução, parâmetros e prescrições. Nada será salvo antes da confirmação final.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Textarea value={rawText} onChange={(event) => updateRawText(event.target.value)} placeholder="Cole aqui o texto do prontuário..." className="min-h-[360px] resize-y bg-[var(--pv-surface-hover)]/60 font-mono text-[15px] leading-6 text-[var(--pv-text-main)]" disabled={isProcessing} />
              {isProcessing ? <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)]/90 backdrop-blur-sm"><Wand2 className="mb-3 h-7 w-7 text-[var(--pv-primary)]" /><p className="font-medium text-[var(--pv-text-main)]">Organizando prontuário...</p></div> : null}
            </div>
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex w-full gap-3 sm:w-auto">
                <Button variant="outline" onClick={handleClear} disabled={isProcessing || (!rawText && !draft)}>Limpar</Button>
                <Button variant="secondary" onClick={() => updateRawText('Paciente: Bidu, canino, poodle, 10 anos, 8 kg. Tutor: João Silva. Motivo da consulta: tosse seca há 2 semanas. Prescrição inicial: Furosemida 2 mg/kg BID.')} disabled={isProcessing || rawText.length > 0}>Usar exemplo</Button>
              </div>
              <Button size="lg" onClick={handleOrganize} disabled={isProcessing || !rawText.trim()} className="w-full sm:w-auto">
                {isProcessing ? 'Organizando...' : 'Organizar prontuário'}
                {!isProcessing ? <ArrowRight className="ml-2 h-5 w-5" /> : null}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit min-w-0 border-[var(--pv-border)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Link2 className="h-5 w-5 text-[var(--pv-primary)]" />Preview editável</CardTitle>
            <CardDescription>Revise e corrija o que for necessário antes de criar um novo paciente ou mesclar com um caso já aberto.</CardDescription>
          </CardHeader>
          <CardContent className="min-w-0 space-y-5">
            {draft ? (
              <div className="space-y-4">
                <PreviewBlock title="Identificação" description="Campos fixos da ficha antes de gravar no plantão.">
                  <div className="grid gap-3 md:grid-cols-2">
                    <Input value={draft.name} onChange={(event) => updateDraft((current) => ({ ...current, name: event.target.value }))} placeholder="Nome" />
                    <Input value={draft.tutorName} onChange={(event) => updateDraft((current) => ({ ...current, tutorName: event.target.value }))} placeholder="Tutor" />
                    <select className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={draft.species} onChange={(event) => updateDraft((current) => ({ ...current, species: event.target.value as SmartImportDraft['species'] }))}><option value="canina">Canina</option><option value="felina">Felina</option><option value="outra">Outra</option></select>
                    <Input value={draft.breed} onChange={(event) => updateDraft((current) => ({ ...current, breed: event.target.value }))} placeholder="Raça" />
                    <Input value={draft.ageLabel} onChange={(event) => updateDraft((current) => ({ ...current, ageLabel: event.target.value }))} placeholder="Idade" />
                    <Input value={draft.baseWeightLabel || draft.weightLabel} onChange={(event) => updateDraft((current) => ({ ...current, baseWeightLabel: event.target.value, weightLabel: event.target.value || current.weightLabel }))} placeholder="Peso-base" />
                    <Input value={draft.medicalRecordNumber} onChange={(event) => updateDraft((current) => ({ ...current, medicalRecordNumber: event.target.value }))} placeholder="Ficha" />
                    <Input value={draft.admissionDateLabel} onChange={(event) => updateDraft((current) => ({ ...current, admissionDateLabel: event.target.value }))} placeholder="Data de admissão" />
                    <Input className="md:col-span-2" value={draft.responsibleVet} onChange={(event) => updateDraft((current) => ({ ...current, responsibleVet: event.target.value }))} placeholder="Veterinário responsável" />
                    <Input className="md:col-span-2" value={draft.belongings} onChange={(event) => updateDraft((current) => ({ ...current, belongings: event.target.value }))} placeholder="Pertences" />
                  </div>
                </PreviewBlock>
                <PreviewBlock title="Resumo clínico" description="Resumo, frase definidora, tags e campos centrais do caso.">
                  <div className="grid gap-3">
                    <Input value={draft.mainDiagnosis} onChange={(event) => updateDraft((current) => ({ ...current, mainDiagnosis: event.target.value }))} placeholder="Diagnóstico / suspeita principal" />
                    <Textarea value={draft.summary} onChange={(event) => updateDraft((current) => ({ ...current, summary: event.target.value }))} className="min-h-[92px]" placeholder="Resumo clínico" />
                    <Textarea value={draft.definingPhrase} onChange={(event) => updateDraft((current) => ({ ...current, definingPhrase: event.target.value }))} className="min-h-[72px]" placeholder="Frase definidora" />
                    <Input value={draft.tags.join(', ')} onChange={(event) => updateDraft((current) => ({ ...current, tags: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))} placeholder="Tags separadas por vírgula" />
                  </div>
                </PreviewBlock>
                <PreviewBlock title="Problemas" actions={<Button variant="outline" size="sm" onClick={() => updateDraft((current) => ({ ...current, problems: [...current.problems, buildEmptyProblem()] }))}><Plus className="mr-2 h-4 w-4" />Adicionar</Button>}>
                  <div className="space-y-2">
                    {draft.problems.map((problem) => (
                      <div key={problem.id} className="grid gap-2 md:grid-cols-[minmax(0,1fr)_140px_120px_40px]">
                        <Input value={problem.title} onChange={(event) => updateDraft((current) => ({ ...current, problems: current.problems.map((item) => item.id === problem.id ? { ...item, title: event.target.value } : item) }))} />
                        <select className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={problem.status} onChange={(event) => updateDraft((current) => ({ ...current, problems: current.problems.map((item) => item.id === problem.id ? { ...item, status: event.target.value as Problem['status'] } : item) }))}><option value="active">Ativo</option><option value="resolved">Resolvido</option><option value="historical">Histórico</option><option value="suspected">Suspeito</option></select>
                        <select className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={problem.priority} onChange={(event) => updateDraft((current) => ({ ...current, problems: current.problems.map((item) => item.id === problem.id ? { ...item, priority: event.target.value as Problem['priority'] } : item) }))}><option value="high">Alta prioridade</option><option value="medium">Média prioridade</option><option value="low">Baixa prioridade</option></select>
                        <Button variant="ghost" size="icon" onClick={() => updateDraft((current) => ({ ...current, problems: current.problems.filter((item) => item.id !== problem.id) }))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                </PreviewBlock>
                <PreviewBlock title="Tarefas do turno">
                  <div className="space-y-2">
                    {draft.tasks.map((task, index) => (
                      <div key={`${task.title}-${index}`} className="grid gap-2 md:grid-cols-[minmax(0,1fr)_96px_130px_120px_40px]">
                        <Input value={task.title} onChange={(event) => updateDraft((current) => ({ ...current, tasks: current.tasks.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item) }))} />
                        <Input value={task.scheduledTime || ''} onChange={(event) => updateDraft((current) => ({ ...current, tasks: current.tasks.map((item, itemIndex) => itemIndex === index ? { ...item, scheduledTime: event.target.value } : item) }))} placeholder="08:00" />
                        <select className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={task.category} onChange={(event) => updateDraft((current) => ({ ...current, tasks: current.tasks.map((item, itemIndex) => itemIndex === index ? { ...item, category: event.target.value as TaskCategory } : item) }))}>{TASK_CATEGORIES.map((category) => <option key={category} value={category}>{getTaskCategoryLabel(category)}</option>)}</select>
                        <select className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={task.priority} onChange={(event) => updateDraft((current) => ({ ...current, tasks: current.tasks.map((item, itemIndex) => itemIndex === index ? { ...item, priority: event.target.value as TaskPriority } : item) }))}>{TASK_PRIORITIES.map((priority) => <option key={priority} value={priority}>{getTaskPriorityLabel(priority)}</option>)}</select>
                        <Button variant="ghost" size="icon" onClick={() => updateDraft((current) => ({ ...current, tasks: current.tasks.filter((_, itemIndex) => itemIndex !== index) }))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                </PreviewBlock>
                <PreviewBlock title="Parâmetros extraídos">
                  {draft.vitalsRecords.length > 0 ? (
                    <div className="space-y-2">
                      {draft.vitalsRecords.map((record: PatientVitalsRecord) => (
                        <div key={record.id} className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/40 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-medium text-[var(--pv-text-main)]">{new Date(record.recordedAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                              <p className="mt-1 text-sm text-[var(--pv-text-muted)]">{[`FC ${record.heartRate || '--'}`, `FR ${record.respiratoryRate || '--'}`, `TR ${record.temperature || '--'}`, record.systolicPressure ? `PAS ${record.systolicPressure}` : ''].filter(Boolean).join(' • ')}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => updateDraft((current) => ({ ...current, vitalsRecords: current.vitalsRecords.filter((item) => item.id !== record.id) }))}><Trash2 className="mr-2 h-4 w-4" />Remover</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-[var(--pv-text-muted)]">Nenhum parâmetro estruturado identificado.</p>}
                </PreviewBlock>
                <PreviewBlock title="Exames reais">
                  {draft.examRecords.length > 0 ? (
                    <div className="space-y-2">
                      {draft.examRecords.map((exam: PatientExamRecord) => (
                        <div key={exam.id} className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/40 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-medium text-[var(--pv-text-main)]">{exam.title || getExamCategoryLabel(exam.category)}</p>
                              <p className="mt-1 text-sm text-[var(--pv-text-muted)]">{exam.mainFinding}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => updateDraft((current) => ({ ...current, examRecords: current.examRecords.filter((item) => item.id !== exam.id) }))}><Trash2 className="mr-2 h-4 w-4" />Remover</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-[var(--pv-text-muted)]">Nenhum exame real com achado principal foi identificado.</p>}
                </PreviewBlock>
                <PreviewBlock title="Medicações" actions={<Button variant="outline" size="sm" onClick={() => updateDraft((current) => ({ ...current, medicationEntries: [...current.medicationEntries, buildEmptyMedication()] }))}><Plus className="mr-2 h-4 w-4" />Adicionar</Button>}>
                  {draft.medicationEntries.length > 0 ? (
                    <div className="space-y-2">
                      {draft.medicationEntries.map((medication) => (
                        <div key={medication.id} className="grid gap-2 rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/40 p-3 md:grid-cols-[minmax(0,1fr)_90px_120px_120px_40px]">
                          <Input value={medication.name} onChange={(event) => updateDraft((current) => ({ ...current, medicationEntries: current.medicationEntries.map((item) => item.id === medication.id ? { ...item, name: event.target.value } : item) }))} placeholder="Nome" />
                          <Input value={medication.dose} onChange={(event) => updateDraft((current) => ({ ...current, medicationEntries: current.medicationEntries.map((item) => item.id === medication.id ? { ...item, dose: event.target.value } : item) }))} placeholder="Dose" />
                          <Input value={medication.frequency} onChange={(event) => updateDraft((current) => ({ ...current, medicationEntries: current.medicationEntries.map((item) => item.id === medication.id ? { ...item, frequency: event.target.value } : item) }))} placeholder="Frequência" />
                          <Input value={medication.route} onChange={(event) => updateDraft((current) => ({ ...current, medicationEntries: current.medicationEntries.map((item) => item.id === medication.id ? { ...item, route: event.target.value } : item) }))} placeholder="Via" />
                          <Button variant="ghost" size="icon" onClick={() => updateDraft((current) => ({ ...current, medicationEntries: current.medicationEntries.filter((item) => item.id !== medication.id) }))}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-[var(--pv-text-muted)]">Nenhuma medicação estruturada foi identificada.</p>}
                </PreviewBlock>
                <PreviewBlock title="Timeline / resumo diário">
                  {draft.dailySummaryEntries.length > 0 ? (
                    <div className="space-y-2">
                      {draft.dailySummaryEntries.map((entry) => (
                        <div key={entry.id} className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/40 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-medium text-[var(--pv-text-main)]">{entry.title}</p>
                                <Badge variant="outline">{new Date(entry.occurredAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</Badge>
                              </div>
                              <Input className="mt-2" value={entry.content} onChange={(event) => updateDraft((current) => ({ ...current, dailySummaryEntries: current.dailySummaryEntries.map((item) => item.id === entry.id ? { ...item, content: event.target.value } : item) }))} />
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => updateDraft((current) => ({ ...current, dailySummaryEntries: current.dailySummaryEntries.filter((item) => item.id !== entry.id) }))}><Trash2 className="mr-2 h-4 w-4" />Remover</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-[var(--pv-text-muted)]">Nenhum evento estruturado foi gerado ainda.</p>}
                </PreviewBlock>
                {draft.importWarnings.length > 0 ? (
                  <PreviewBlock title="Warnings da importação">
                    {draft.importWarnings.map((warning) => (
                      <div key={warning} className="flex items-start justify-between gap-3 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] p-3 text-sm">
                        <div className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 text-[var(--pv-accent-yellow-strong)]" /><p className={preview?.ignoredWarnings.includes(warning) ? 'text-[var(--pv-text-muted)] line-through' : 'text-[var(--pv-text-main)]'}>{warning}</p></div>
                        <Button variant="outline" size="sm" onClick={() => applyPreview(preview ? { ...preview, ignoredWarnings: preview.ignoredWarnings.includes(warning) ? preview.ignoredWarnings.filter((item) => item !== warning) : [...preview.ignoredWarnings, warning] } : preview)}>{preview?.ignoredWarnings.includes(warning) ? 'Restaurar' : 'Ignorar'}</Button>
                      </div>
                    ))}
                  </PreviewBlock>
                ) : null}
                <PreviewBlock title="Destino da importação">
                  <label className="flex items-start gap-3 rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-4">
                    <input type="radio" name="smart-import-target" checked={selectedPatientId === 'new'} onChange={() => updateSelectedPatient('new')} />
                    <div><p className="font-medium text-[var(--pv-text-main)]">Criar novo paciente</p><p className="mt-1 text-sm text-[var(--pv-text-muted)]">Nada é salvo antes da confirmação.</p></div>
                  </label>
                  {possibleMatches.map((match) => (
                    <label key={match.patient.id} className="mt-3 flex items-start gap-3 rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-4">
                      <input type="radio" name="smart-import-target" checked={selectedPatientId === match.patient.id} onChange={() => updateSelectedPatient(match.patient.id)} />
                      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="font-medium text-[var(--pv-text-main)]">{match.patient.displayName}</p><Badge variant="secondary">Compatibilidade {Math.round(match.score * 100)}%</Badge></div><p className="mt-1 text-sm text-[var(--pv-text-muted)]">{match.patient.mainDiagnosis || 'Sem diagnóstico principal registrado.'}</p></div>
                    </label>
                  ))}
                </PreviewBlock>
                <Button className="w-full" onClick={handleConfirmImport}>{selectedPatientId === 'new' ? 'Confirmar criação do paciente' : 'Mesclar com paciente existente'}</Button>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[var(--pv-border)] bg-[var(--pv-surface)] p-6 text-center">
                <Wand2 className="mx-auto mb-3 h-8 w-8 text-[var(--pv-text-muted)]/50" />
                <p className="font-medium text-[var(--pv-text-main)]">Nenhum preview gerado ainda</p>
                <p className="mt-1 text-sm text-[var(--pv-text-muted)]">Use “Organizar prontuário” para extrair identificação, problemas, tarefas, parâmetros, exames, medicações e timeline antes de confirmar.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
