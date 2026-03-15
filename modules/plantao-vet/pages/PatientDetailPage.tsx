import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  CheckSquare2,
  Copy,
  FileText,
  FlaskConical,
  HeartPulse,
  MessageSquare,
  PencilLine,
  Pill,
  Plus,
  RefreshCw,
  Save,
  Stethoscope,
  Trash2,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { EmptyState } from '../components/EmptyState';
import { ExamRecordDialog } from '../components/ExamRecordDialog';
import { MedicationEditorDialog } from '../components/MedicationEditorDialog';
import { TaskEditorDialog } from '../components/TaskEditorDialog';
import { VitalsRecordDialog } from '../components/VitalsRecordDialog';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Textarea } from '../components/ui/Textarea';
import { buildBulletinText } from '../lib/clinicalText';
import {
  getActiveMedicationEntries,
  getLatestDailySummaryEntries,
  getExamCategoryLabel,
  formatClinicalBoolean,
  getLatestVitalsRecord,
  getLatestWeightLabel,
  getRecentExamRecords,
  getTubeTypeLabel,
  getVitalTrend,
} from '../lib/patientClinical';
import {
  compareScheduledTimes,
  getPatientStatusLabel,
  getPatientStatusVariant,
  getProblemPriorityLabel,
  getProblemStatusLabel,
  getSpeciesLabel,
  getTaskCategoryLabel,
  getTaskPriorityLabel,
} from '../lib/presentation';
import { createDailySummaryEntry, createEmptyNutritionSupport, createWeightRecord } from '../lib/shiftPatientDefaults';
import { formatDateLong, SHIFT_TYPE_LABELS } from '../lib/shifts';
import {
  getActiveShift,
  getActiveShiftPatients,
  getActiveShiftTasks,
  getShiftById,
  getShiftPatientBulletins,
  usePlantaoVetSnapshot,
} from '../store/selectors';
import { usePlantaoVetStore } from '../store/usePlantaoVetStore';
import { usePlantaoVetUiStore } from '../store/usePlantaoVetUiStore';
import { Bulletin, MedicationEntry, NutritionSupport, PatientExamRecord, PatientVitalsRecord, Problem, Task } from '../types';

function getBulletinTypeLabel(type: Bulletin['type']) {
  switch (type) {
    case 'tutor':
      return 'Boletim tutor';
    case 'handover':
      return 'Passagem';
    case 'clinical':
    default:
      return 'Boletim veterinario';
  }
}

function formatDateTime(dateTime: string | null) {
  if (!dateTime) {
    return 'Nao informado';
  }

  return new Date(dateTime).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getMedicationStatusBadgeVariant(status: MedicationEntry['status']) {
  return status === 'active' ? 'success' : 'secondary';
}

function buildNutritionDraft(nutritionSupport?: NutritionSupport | null) {
  return {
    ...createEmptyNutritionSupport(),
    ...(nutritionSupport || {}),
  };
}

export function PatientDetailPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const snapshot = usePlantaoVetSnapshot();
  const toggleTaskCompleted = usePlantaoVetStore((state) => state.toggleTaskCompleted);
  const deleteTask = usePlantaoVetStore((state) => state.deleteTask);
  const deleteBulletin = usePlantaoVetStore((state) => state.deleteBulletin);
  const appendDailySummaryEntry = usePlantaoVetStore((state) => state.appendDailySummaryEntry);
  const updateDailySummaryEntry = usePlantaoVetStore((state) => state.updateDailySummaryEntry);
  const deleteDailySummaryEntry = usePlantaoVetStore((state) => state.deleteDailySummaryEntry);
  const upsertShiftPatient = usePlantaoVetStore((state) => state.upsertShiftPatient);
  const upsertBulletin = usePlantaoVetStore((state) => state.upsertBulletin);
  const storedActiveTab = usePlantaoVetUiStore((state) => state.values[`patient-tab:${patientId || 'unknown'}`]);
  const storedDailySummaryDraft = usePlantaoVetUiStore((state) => state.drafts[`patient-daily-draft:${patientId || 'unknown'}`]);
  const storedScroll = usePlantaoVetUiStore((state) => state.values[`patient-scroll:${patientId || 'unknown'}`]);
  const setUiValue = usePlantaoVetUiStore((state) => state.setValue);
  const setUiDraft = usePlantaoVetUiStore((state) => state.setDraft);

  const [activeTab, setActiveTab] = useState(storedActiveTab || 'resumo');
  const [bulletinType, setBulletinType] = useState<'clinical' | 'tutor'>('clinical');
  const [bulletinTitle, setBulletinTitle] = useState('');
  const [bulletinText, setBulletinText] = useState('');
  const [importantNotesDraft, setImportantNotesDraft] = useState('');
  const [nextShiftPlanDraft, setNextShiftPlanDraft] = useState('');
  const [nutritionDraft, setNutritionDraft] = useState(buildNutritionDraft());
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [vitalsDialogOpen, setVitalsDialogOpen] = useState(false);
  const [editingVitals, setEditingVitals] = useState<PatientVitalsRecord | null>(null);
  const [examDialogOpen, setExamDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<PatientExamRecord | null>(null);
  const [medicationDialogOpen, setMedicationDialogOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<MedicationEntry | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedVitalsId, setExpandedVitalsId] = useState<string | null>(null);
  const [expandedExamId, setExpandedExamId] = useState<string | null>(null);
  const [examCategoryFilter, setExamCategoryFilter] = useState<'all' | PatientExamRecord['category']>('all');
  const [dailySummaryDraft, setDailySummaryDraft] = useState(storedDailySummaryDraft || '');
  const [selectedExamIds, setSelectedExamIds] = useState<string[]>([]);
  const [selectedDailySummaryIds, setSelectedDailySummaryIds] = useState<string[]>([]);
  const [selectedBulletinIds, setSelectedBulletinIds] = useState<string[]>([]);
  const [problemDraft, setProblemDraft] = useState({ title: '', status: 'active' as Problem['status'], notes: '' });
  const [editingProblemId, setEditingProblemId] = useState<string | null>(null);
  const [tagDraft, setTagDraft] = useState('');
  const [baseWeightDraft, setBaseWeightDraft] = useState('');
  const [weightHistoryDraft, setWeightHistoryDraft] = useState({ label: '', recordedAt: new Date().toISOString().slice(0, 16) });
  const pageRef = useRef<HTMLDivElement | null>(null);

  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);
  const patients = useMemo(() => getActiveShiftPatients(snapshot), [snapshot]);
  const tasks = useMemo(() => getActiveShiftTasks(snapshot), [snapshot]);
  const patient = useMemo(() => patients.find((item) => item.id === patientId) || null, [patientId, patients]);
  const patientTasks = useMemo(() => {
    if (!patient) {
      return [];
    }

    return [...tasks]
      .filter((task) => task.shiftPatientId === patient.id)
      .sort((left, right) => compareScheduledTimes(left.scheduledTime, right.scheduledTime));
  }, [patient, tasks]);
  const patientBulletins = useMemo(
    () =>
      [...getShiftPatientBulletins(snapshot, patient?.id || null)].sort(
        (left, right) => right.updatedAt.localeCompare(left.updatedAt)
      ),
    [patient?.id, snapshot]
  );
  const importedFromShift = useMemo(
    () => getShiftById(snapshot, patient?.importedFromShiftId || null),
    [patient?.importedFromShiftId, snapshot]
  );
  const activeMedications = useMemo(() => (patient ? getActiveMedicationEntries(patient) : []), [patient]);
  const sortedMedicationEntries = useMemo(() => {
    if (!patient) {
      return [];
    }

    return [...patient.medicationEntries].sort((left, right) => {
      if (left.status !== right.status) {
        return left.status === 'active' ? -1 : 1;
      }

      return (right.startedAt || right.updatedAt).localeCompare(left.startedAt || left.updatedAt);
    });
  }, [patient]);
  const sortedVitalsRecords = useMemo(
    () =>
      patient ? [...patient.vitalsRecords].sort((left, right) => right.recordedAt.localeCompare(left.recordedAt)) : [],
    [patient]
  );
  const filteredExamRecords = useMemo(() => {
    if (!patient) {
      return [];
    }

    return [...patient.examRecords]
      .filter((exam) => Boolean((exam.mainFinding || '').trim()))
      .filter((exam) => examCategoryFilter === 'all' || exam.category === examCategoryFilter)
      .sort((left, right) => right.recordedAt.localeCompare(left.recordedAt));
  }, [examCategoryFilter, patient]);
  const latestVitals = useMemo(() => (patient ? getLatestVitalsRecord(patient) : null), [patient]);
  const recentExams = useMemo(() => (patient ? getRecentExamRecords(patient, 2) : []), [patient]);
  const dailySummaryEntries = useMemo(() => (patient ? getLatestDailySummaryEntries(patient, 50) : []), [patient]);
  const generatedBulletinText = useMemo(() => {
    if (!patient) {
      return '';
    }

    return buildBulletinText(
      {
        ...patient,
        importantNotes: importantNotesDraft,
        nextShiftPlan: nextShiftPlanDraft,
        nutritionSupport: nutritionDraft,
      },
      patientTasks,
      bulletinType,
      { shiftType: activeShift?.shiftType || null, authorLabel: 'Equipe do plantão' }
    );
  }, [activeShift?.shiftType, bulletinType, importantNotesDraft, nextShiftPlanDraft, nutritionDraft, patient, patientTasks]);

  useEffect(() => {
    if (!patient) {
      return;
    }

    setImportantNotesDraft(patient.importantNotes || '');
    setNextShiftPlanDraft(patient.nextShiftPlan || '');
    setNutritionDraft(buildNutritionDraft(patient.nutritionSupport));
    setBaseWeightDraft(patient.baseWeightLabel || patient.weightLabel || '');
  }, [patient?.id]);

  useEffect(() => {
    if (!patient) {
      return;
    }

    setBulletinTitle(bulletinType === 'clinical' ? 'Boletim veterinario' : 'Boletim tutor');
    setBulletinText(generatedBulletinText);
  }, [bulletinType, patient?.id]);

  useEffect(() => {
    if (!patientId) {
      return;
    }

    setUiDraft(`patient-daily-draft:${patientId}`, dailySummaryDraft);
  }, [dailySummaryDraft, patientId, setUiDraft]);

  useEffect(() => {
    if (!patientId || !storedScroll) {
      return;
    }

    const scrollTop = Number(storedScroll);
    if (!Number.isNaN(scrollTop)) {
      window.setTimeout(() => window.scrollTo({ top: scrollTop }), 60);
    }
  }, [patientId, storedScroll]);

  useEffect(() => {
    if (!patientId) {
      return;
    }

    const handleScroll = () => setUiValue(`patient-scroll:${patientId}`, String(window.scrollY));
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [patientId, setUiValue]);

  useEffect(() => {
    if (patientId) {
      setUiValue(`patient-tab:${patientId}`, activeTab);
    }
  }, [activeTab, patientId, setUiValue]);

  async function handleCopy(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1600);
  }

  function persistPatient(nextPatient: typeof patient) {
    if (!nextPatient) {
      return;
    }

    upsertShiftPatient(nextPatient);
  }

  function handleSaveContext() {
    if (!patient) {
      return;
    }

    persistPatient({
      ...patient,
      importantNotes: importantNotesDraft.trim(),
      nextShiftPlan: nextShiftPlanDraft.trim(),
      nutritionSupport: {
        ...nutritionDraft,
        updatedAt: new Date().toISOString(),
      },
      dailySummaryEntries: nutritionDraft.updatedAt || nutritionDraft.nutritionNotes || nutritionDraft.supportNotes
        ? [
            createDailySummaryEntry({
              shiftId: patient.shiftId,
              shiftPatientId: patient.id,
              type: 'nutrition',
              title: 'Atualização de nutrição / suporte',
              content: [nutritionDraft.dietType, nutritionDraft.feedingRoute, nutritionDraft.fluidTherapy, nutritionDraft.supportNotes]
                .filter(Boolean)
                .join(' • '),
              occurredAt: new Date().toISOString(),
              manual: false,
            }),
            ...patient.dailySummaryEntries,
          ]
        : patient.dailySummaryEntries,
    });
  }

  function handleSaveBulletin() {
    if (!patient || !activeShift || !bulletinText.trim()) {
      return;
    }

    const savedBulletin = upsertBulletin({
      shiftId: activeShift.id,
      shiftPatientId: patient.id,
      type: bulletinType,
      title: bulletinTitle.trim() || (bulletinType === 'clinical' ? 'Boletim veterinario' : 'Boletim tutor'),
      content: bulletinText.trim(),
      authorLabel: 'Equipe do plantao',
      generated: true,
      manualEdited: bulletinText.trim() !== generatedBulletinText.trim(),
    });

    persistPatient({
      ...patient,
      importantNotes: importantNotesDraft.trim(),
      nextShiftPlan: nextShiftPlanDraft.trim(),
      nutritionSupport: {
        ...nutritionDraft,
        updatedAt: new Date().toISOString(),
      },
      lastBulletinAt: savedBulletin.updatedAt,
    });
  }

  function handleRegenerateBulletin() {
    if (bulletinText.trim() && bulletinText.trim() !== generatedBulletinText.trim()) {
      const confirmed = window.confirm('O texto atual foi editado manualmente. Deseja sobrescrevê-lo pelo texto base gerado?');
      if (!confirmed) {
        return;
      }
    }

    setBulletinText(generatedBulletinText);
  }

  function handleSubmitVitals(record: PatientVitalsRecord) {
    if (!patient) {
      return;
    }

    const nextRecords = [...patient.vitalsRecords.filter((item) => item.id !== record.id), record].sort((left, right) =>
      right.recordedAt.localeCompare(left.recordedAt)
    );

    persistPatient({
      ...patient,
      vitalsRecords: nextRecords,
      dailySummaryEntries: [
        createDailySummaryEntry({
          shiftId: patient.shiftId,
          shiftPatientId: patient.id,
          type: 'parameter',
          title: 'Parâmetros registrados',
          content: `FC ${record.heartRate || '--'} • FR ${record.respiratoryRate || '--'} • TR ${record.temperature || '--'}`,
          occurredAt: record.recordedAt,
          sourceId: record.id,
        }),
        ...patient.dailySummaryEntries,
      ],
    });
  }

  function handleDeleteVitals(recordId: string) {
    if (!patient || !window.confirm('Excluir este registro de parametros?')) {
      return;
    }

    persistPatient({
      ...patient,
      vitalsRecords: patient.vitalsRecords.filter((record) => record.id !== recordId),
    });
  }

  function handleSubmitExam(record: PatientExamRecord) {
    if (!patient) {
      return;
    }

    const nextRecords = [...patient.examRecords.filter((item) => item.id !== record.id), record].sort((left, right) =>
      right.recordedAt.localeCompare(left.recordedAt)
    );

    persistPatient({
      ...patient,
      examRecords: nextRecords,
      dailySummaryEntries: [
        createDailySummaryEntry({
          shiftId: patient.shiftId,
          shiftPatientId: patient.id,
          type: 'exam',
          title: record.title || 'Exame registrado',
          content: record.summary || record.findings || 'Exame sem resumo.',
          occurredAt: record.recordedAt,
          sourceId: record.id,
        }),
        ...patient.dailySummaryEntries,
      ],
    });
  }

  function handleDeleteExam(recordId: string) {
    if (!patient) {
      return;
    }

    persistPatient({
      ...patient,
      examRecords: patient.examRecords.filter((record) => record.id !== recordId),
    });
  }

  function handleSubmitMedication(medication: MedicationEntry) {
    if (!patient) {
      return;
    }

    const nextEntries = [...patient.medicationEntries.filter((item) => item.id !== medication.id), medication];
    const activeNames = nextEntries.filter((item) => item.status === 'active').map((item) => item.name).filter(Boolean);

    persistPatient({
      ...patient,
      medicationEntries: nextEntries,
      medicationsInUse: activeNames,
      dailySummaryEntries: [
        createDailySummaryEntry({
          shiftId: patient.shiftId,
          shiftPatientId: patient.id,
          type: medication.status === 'suspended' ? 'medication_suspended' : 'medication_added',
          title: medication.status === 'suspended' ? 'Medicação suspensa' : 'Medicação atualizada',
          content: [medication.name, medication.dose, medication.frequency, medication.route].filter(Boolean).join(' • '),
          occurredAt: medication.updatedAt,
          sourceId: medication.id,
        }),
        ...patient.dailySummaryEntries,
      ],
    });
  }

  function handleMedicationStatusChange(medication: MedicationEntry, status: MedicationEntry['status']) {
    handleSubmitMedication({
      ...medication,
      status,
      suspendedAt: status === 'suspended' ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
    });
  }

  function openNewTaskDialog() {
    setEditingTask(null);
    setTaskDialogOpen(true);
  }

  function openEditTaskDialog(task: Task) {
    setEditingTask(task);
    setTaskDialogOpen(true);
  }

  function handleDeleteMedication(medicationId: string) {
    if (!patient) {
      return;
    }

    const nextEntries = patient.medicationEntries.filter((entry) => entry.id !== medicationId);
    persistPatient({
      ...patient,
      medicationEntries: nextEntries,
      medicationsInUse: nextEntries.filter((entry) => entry.status === 'active').map((entry) => entry.name),
    });
  }

  function handleDeleteTask(taskId: string) {
    deleteTask(taskId);
  }

  function handleDeleteBulletin(bulletinId: string) {
    deleteBulletin(bulletinId);
  }

  function handleAddManualDailySummary() {
    if (!patient || !dailySummaryDraft.trim()) {
      return;
    }

    appendDailySummaryEntry(patient.id, {
      type: 'manual',
      title: 'Registro manual',
      content: dailySummaryDraft.trim(),
      details: dailySummaryDraft.trim(),
      occurredAt: new Date().toISOString(),
      manual: true,
      sourceType: 'manual',
      relatedEntityType: 'manual',
    });
    setDailySummaryDraft('');
  }

  function handleDeleteDailySummary(entryId: string) {
    if (!patient) {
      return;
    }
    deleteDailySummaryEntry(patient.id, entryId);
  }

  function handleToggleDoctorVet(entryId: string, currentValue: boolean) {
    if (!patient) {
      return;
    }

    updateDailySummaryEntry(patient.id, entryId, {
      doctorVetReported: !currentValue,
      doctorVetReportedAt: !currentValue ? new Date().toISOString() : null,
    });
  }

  function handleDoctorVetNote(entryId: string, note: string) {
    if (!patient) {
      return;
    }

    updateDailySummaryEntry(patient.id, entryId, {
      doctorVetReportNote: note,
    });
  }

  function handleSubmitProblem() {
    if (!patient || !problemDraft.title.trim()) {
      return;
    }

    const timestamp = new Date().toISOString();
    const nextProblem: Problem =
      patient.problems.find((item) => item.id === editingProblemId) || {
        id: `problem-${Math.random().toString(36).slice(2, 10)}`,
        title: '',
        status: 'active',
        priority: 'medium',
        notes: '',
        startedAt: timestamp,
        resolvedAt: null,
        origin: 'manual',
        sourceLabel: 'manual',
        reviewRequired: false,
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      };

    persistPatient({
      ...patient,
      problems: [
        {
          ...nextProblem,
          title: problemDraft.title.trim(),
          status: problemDraft.status,
          notes: problemDraft.notes.trim(),
          resolvedAt: problemDraft.status === 'resolved' ? nextProblem.resolvedAt || timestamp : null,
          updatedAt: timestamp,
        },
        ...patient.problems.filter((item) => item.id !== nextProblem.id),
      ],
    });

    setProblemDraft({ title: '', status: 'active', notes: '' });
    setEditingProblemId(null);
  }

  function handleEditProblem(problem: Problem) {
    setEditingProblemId(problem.id);
    setProblemDraft({ title: problem.title, status: problem.status, notes: problem.notes || '' });
  }

  function handleDeleteProblem(problemId: string) {
    if (!patient) {
      return;
    }

    persistPatient({
      ...patient,
      problems: patient.problems.filter((item) => item.id !== problemId),
    });
  }

  function handleToggleProblemResolved(problem: Problem) {
    if (!patient) {
      return;
    }

    const timestamp = new Date().toISOString();
    persistPatient({
      ...patient,
      problems: patient.problems.map((item) =>
        item.id === problem.id
          ? {
              ...item,
              status: item.status === 'resolved' ? 'active' : 'resolved',
              resolvedAt: item.status === 'resolved' ? null : timestamp,
              updatedAt: timestamp,
            }
          : item
      ),
    });
  }

  function handleAddTag() {
    if (!patient || !tagDraft.trim()) {
      return;
    }

    persistPatient({
      ...patient,
      tags: [...new Set([...(patient.tags || []), tagDraft.trim()])],
    });
    setTagDraft('');
  }

  function handleRemoveTag(tag: string) {
    if (!patient) {
      return;
    }

    persistPatient({
      ...patient,
      tags: (patient.tags || []).filter((item) => item !== tag),
    });
  }

  function handleSaveBaseWeight() {
    if (!patient || !baseWeightDraft.trim()) {
      return;
    }

    persistPatient({
      ...patient,
      baseWeightLabel: baseWeightDraft.trim(),
      weightLabel: patient.weightLabel || baseWeightDraft.trim(),
    });
  }

  function handleAddWeightHistory() {
    if (!patient || !weightHistoryDraft.label.trim()) {
      return;
    }

    const recordedAt = weightHistoryDraft.recordedAt
      ? new Date(weightHistoryDraft.recordedAt).toISOString()
      : new Date().toISOString();

    persistPatient({
      ...patient,
      weightHistory: [
        createWeightRecord(weightHistoryDraft.label.trim(), 'manual', recordedAt),
        ...patient.weightHistory,
      ],
    });
    setWeightHistoryDraft({ label: '', recordedAt: new Date().toISOString().slice(0, 16) });
  }

  function handleBulkDeleteExams() {
    if (!patient || selectedExamIds.length === 0) {
      return;
    }

    persistPatient({
      ...patient,
      examRecords: patient.examRecords.filter((record) => !selectedExamIds.includes(record.id)),
    });
    setSelectedExamIds([]);
  }

  function handleBulkDeleteDailySummary() {
    if (!patient || selectedDailySummaryIds.length === 0) {
      return;
    }

    persistPatient({
      ...patient,
      dailySummaryEntries: patient.dailySummaryEntries.filter((entry) => !selectedDailySummaryIds.includes(entry.id)),
    });
    setSelectedDailySummaryIds([]);
  }

  function handleBulkDeleteBulletins() {
    selectedBulletinIds.forEach((bulletinId) => deleteBulletin(bulletinId));
    setSelectedBulletinIds([]);
  }

  if (!snapshot.isHydrated) {
    return <div className="px-2 py-6 text-sm text-[var(--pv-text-muted)]">Carregando modulo...</div>;
  }

  if (!patient || !activeShift || patient.shiftId !== activeShift.id) {
    return (
      <EmptyState
        icon={FileText}
        eyebrow="Paciente"
        title="Paciente nao encontrado neste plantao"
        description="A ficha detalhada sempre respeita o plantao ativo. Se o caso nao estiver vinculado ao turno atual, ele nao aparece aqui."
        primaryAction={{ label: 'Voltar aos pacientes', href: '/plantao-vet/pacientes' }}
      />
    );
  }

  return (
    <>
      <div ref={pageRef} className="space-y-6 pb-12">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/plantao-vet/pacientes')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-[var(--pv-text-main)]">{patient.displayName}</h1>
              <Badge variant={getPatientStatusVariant(patient.status)}>{getPatientStatusLabel(patient.status)}</Badge>
              {patient.importedFromShiftId ? <Badge variant="secondary">Importado do plantao anterior</Badge> : null}
            </div>
            <p className="mt-1 text-[var(--pv-text-muted)]">
              {getSpeciesLabel(patient.species)} - {patient.breed || 'Raca nao informada'} - {patient.ageLabel || 'Idade nao informada'} - {getLatestWeightLabel(patient) || 'Peso nao informado'} - Tutor: {patient.tutorName || 'Nao informado'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="px-3 py-1">
            {activeShift.label}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            {formatDateLong(activeShift.dateISO)} - {SHIFT_TYPE_LABELS[activeShift.shiftType]}
          </Badge>
          {patient.importedFromShiftId ? (
            <Badge variant="secondary" className="px-3 py-1">
              {patient.importedFromDate ? `Origem: ${formatDateLong(patient.importedFromDate)}` : 'Origem: plantao anterior'}
            </Badge>
          ) : null}
          {importedFromShift ? (
            <Badge variant="secondary" className="px-3 py-1">
              {SHIFT_TYPE_LABELS[importedFromShift.shiftType]}
            </Badge>
          ) : patient.importedFromShiftType ? (
            <Badge variant="secondary" className="px-3 py-1">
              {SHIFT_TYPE_LABELS[patient.importedFromShiftType]}
            </Badge>
          ) : null}
        </div>

        <div className="rounded-xl border border-[var(--pv-primary)]/20 bg-[var(--pv-primary)]/6 p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-[var(--pv-primary)]/12 p-2 text-[var(--pv-primary)]">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--pv-primary)]">
                O que define este paciente hoje
              </h3>
              <p className="text-lg font-medium italic text-[var(--pv-text-main)]">
                "{patient.definingPhrase || 'Sem frase definidora registrada para este turno.'}"
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {patient.alertBadges.length > 0 ? (
            patient.alertBadges.map((badge) => (
              <Badge key={badge} variant="outline" className="bg-[var(--pv-surface-hover)] px-3 py-1.5 text-sm">
                {badge}
              </Badge>
            ))
          ) : (
            <Badge variant="secondary" className="px-3 py-1.5 text-sm">
              Sem alertas cadastrados
            </Badge>
          )}
          {nutritionDraft.tubeInUse ? <Badge variant="outline">Sonda: {getTubeTypeLabel(nutritionDraft.tubeType)}</Badge> : null}
          {activeMedications.length > 0 ? <Badge variant="outline">{activeMedications.length} medicacao(oes) ativa(s)</Badge> : null}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full min-w-0">
          <div className="overflow-x-auto pb-2 min-w-0">
            <TabsList className="min-w-max">
              <TabsTrigger value="resumo" className="gap-2">
                <FileText className="h-4 w-4" />
                Resumo
              </TabsTrigger>
              <TabsTrigger value="problemas" className="gap-2">
                <AlertCircle className="h-4 w-4" />
                Problemas
              </TabsTrigger>
              <TabsTrigger value="tarefas" className="gap-2">
                <CheckSquare2 className="h-4 w-4" />
                Tarefas
              </TabsTrigger>
              <TabsTrigger value="parametros" className="gap-2">
                <HeartPulse className="h-4 w-4" />
                Parametros
              </TabsTrigger>
              <TabsTrigger value="exames" className="gap-2">
                <FlaskConical className="h-4 w-4" />
                Exames
              </TabsTrigger>
              <TabsTrigger value="medicacoes" className="gap-2">
                <Pill className="h-4 w-4" />
                Medicacoes
              </TabsTrigger>
              <TabsTrigger value="boletins" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Boletins
              </TabsTrigger>
              <TabsTrigger value="resumo-diario" className="gap-2">
                <FileText className="h-4 w-4" />
                Resumo diário
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-6 min-w-0">
            <TabsContent value="resumo" className="grid min-w-0 w-full grid-cols-1 gap-6 lg:grid-cols-12">
              <Card className="lg:col-span-7">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-[var(--pv-primary)]" />
                    Resumo clinico
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="mb-2 text-sm font-medium text-[var(--pv-text-muted)]">Diagnostico / suspeita</p>
                    <p className="text-[var(--pv-text-main)]">{patient.mainDiagnosis || 'Nao informado'}</p>
                  </div>
                  <p className="whitespace-pre-wrap leading-7 text-[var(--pv-text-main)]">
                    {patient.summary || 'Sem resumo clinico registrado.'}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-4">
                      <p className="mb-3 text-sm font-medium text-[var(--pv-text-main)]">Tags do paciente</p>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {(patient.tags || []).length > 0 ? (
                          patient.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="gap-2 pr-1">
                              {tag}
                              <button type="button" className="rounded-full px-1 text-[var(--pv-text-muted)] hover:text-[var(--pv-text-main)]" onClick={() => handleRemoveTag(tag)}>
                                ×
                              </button>
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-[var(--pv-text-muted)]">Sem tags cadastradas.</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Input value={tagDraft} onChange={(event) => setTagDraft(event.target.value)} placeholder="Ex.: observação, agressivo, isolamento" />
                        <Button variant="outline" onClick={handleAddTag} disabled={!tagDraft.trim()}>
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-4">
                      <p className="mb-3 text-sm font-medium text-[var(--pv-text-main)]">Peso-base e histórico</p>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input value={baseWeightDraft} onChange={(event) => setBaseWeightDraft(event.target.value)} placeholder="Peso-base" />
                          <Button variant="outline" onClick={handleSaveBaseWeight} disabled={!baseWeightDraft.trim()}>
                            Salvar peso-base
                          </Button>
                        </div>
                        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_180px_auto]">
                          <Input value={weightHistoryDraft.label} onChange={(event) => setWeightHistoryDraft((current) => ({ ...current, label: event.target.value }))} placeholder="Novo peso / observação" />
                          <Input type="datetime-local" value={weightHistoryDraft.recordedAt} onChange={(event) => setWeightHistoryDraft((current) => ({ ...current, recordedAt: event.target.value }))} />
                          <Button variant="outline" onClick={handleAddWeightHistory} disabled={!weightHistoryDraft.label.trim()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Registrar
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {patient.weightHistory.length > 0 ? (
                            patient.weightHistory.slice(0, 5).map((entry) => (
                              <div key={entry.id} className="rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 py-2 text-sm text-[var(--pv-text-muted)]">
                                <span className="font-medium text-[var(--pv-text-main)]">{entry.label}</span>
                                {' • '}
                                {formatDateTime(entry.recordedAt)}
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-[var(--pv-text-muted)]">Sem histórico de peso registrado.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-4">
                      <p className="mb-2 text-sm font-medium text-[var(--pv-text-main)]">Parametros mais recentes</p>
                      {latestVitals ? (
                        <div className="space-y-2 text-sm text-[var(--pv-text-muted)]">
                          <p>{formatDateTime(latestVitals.recordedAt)}</p>
                          <p>FC {latestVitals.heartRate || '--'} • FR {latestVitals.respiratoryRate || '--'} • TR {latestVitals.temperature || '--'}</p>
                          <p>PAS {latestVitals.systolicPressure || '--'} • Glicemia {latestVitals.glucose || '--'}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-[var(--pv-text-muted)]">Sem parametros registrados.</p>
                      )}
                    </div>
                    <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-4">
                      <p className="mb-2 text-sm font-medium text-[var(--pv-text-main)]">Exames recentes</p>
                      {recentExams.length > 0 ? (
                        <div className="space-y-2 text-sm text-[var(--pv-text-muted)]">
                          {recentExams.map((exam) => (
                            <div key={exam.id}>
                              <p className="font-medium text-[var(--pv-text-main)]">{exam.title || getExamCategoryLabel(exam.category)}</p>
                              <p>{exam.summary || 'Sem resumo curto.'}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[var(--pv-text-muted)]">Sem exames registrados.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-[var(--pv-text-muted)]">Medicacoes ativas</p>
                    {activeMedications.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {activeMedications.map((medication) => (
                          <Badge key={medication.id} variant="outline" className="bg-[var(--pv-surface-hover)]">
                            {medication.name}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--pv-text-muted)]">Nenhuma medicacao ativa registrada.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6 lg:col-span-5">
                <Card className="bg-[var(--pv-surface-hover)]/45">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Stethoscope className="h-5 w-5 text-[var(--pv-primary)]" />
                      Contexto do turno
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="mb-1 text-sm font-medium text-[var(--pv-text-muted)]">Pendencias abertas</p>
                      <p className="font-medium text-[var(--pv-text-main)]">{patientTasks.filter((task) => !task.completed).length}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium text-[var(--pv-text-muted)]">Boletins no turno</p>
                      <p className="font-medium text-[var(--pv-text-main)]">{patientBulletins.length}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium text-[var(--pv-text-muted)]">Origem</p>
                      <p className="font-medium text-[var(--pv-text-main)]">
                        {patient.importedFromShiftId ? (patient.importedFromDate ? formatDateLong(patient.importedFromDate) : 'Plantao anterior') : 'Criado neste plantao'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Observacoes e plano</CardTitle>
                    <CardDescription>
                      Estes campos alimentam automaticamente a passagem de plantao e os boletins.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[var(--pv-text-main)]">Observacoes importantes</p>
                      <Textarea className="min-h-[120px] resize-y" value={importantNotesDraft} onChange={(event) => setImportantNotesDraft(event.target.value)} placeholder="Ex.: resposta a medicacao, pontos criticos, comportamento, risco de descompensacao." />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[var(--pv-text-main)]">Plano / pontos de atencao</p>
                      <Textarea className="min-h-[120px] resize-y" value={nextShiftPlanDraft} onChange={(event) => setNextShiftPlanDraft(event.target.value)} placeholder="Ex.: repetir exame, manter monitoramento, revisar alta, contato com tutor." />
                    </div>
                    <Button onClick={handleSaveContext}>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar contexto do turno
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="problemas" className="min-w-0 w-full">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Editor de problemas</CardTitle>
                    <CardDescription>Adicione, edite, resolva ou reabra problemas do plantão ativo.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
                    <Input value={problemDraft.title} onChange={(event) => setProblemDraft((current) => ({ ...current, title: event.target.value }))} placeholder="Título do problema" />
                    <select className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={problemDraft.status} onChange={(event) => setProblemDraft((current) => ({ ...current, status: event.target.value as Problem['status'] }))}>
                      <option value="active">Ativo</option>
                      <option value="resolved">Resolvido</option>
                      <option value="historical">Histórico</option>
                      <option value="suspected">Suspeito</option>
                    </select>
                    <Textarea className="min-h-[88px] resize-y md:col-span-2" value={problemDraft.notes} onChange={(event) => setProblemDraft((current) => ({ ...current, notes: event.target.value }))} placeholder="Observações do problema" />
                    <div className="flex flex-wrap gap-2 md:col-span-2">
                      <Button onClick={handleSubmitProblem} disabled={!problemDraft.title.trim()}>
                        <Plus className="mr-2 h-4 w-4" />
                        {editingProblemId ? 'Salvar problema' : 'Adicionar problema'}
                      </Button>
                      {editingProblemId ? (
                        <Button variant="outline" onClick={() => { setEditingProblemId(null); setProblemDraft({ title: '', status: 'active', notes: '' }); }}>
                          Cancelar edição
                        </Button>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>

                {patient.problems.length > 0 ? (
                  patient.problems.map((problem) => (
                    <Card key={problem.id}>
                      <CardContent className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center">
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-[var(--pv-text-main)]">{problem.title}</h3>
                            <Badge variant="outline" className="uppercase">
                              {getProblemStatusLabel(problem.status)}
                            </Badge>
                            {problem.priority === 'high' ? <Badge variant="destructive">{getProblemPriorityLabel(problem.priority)}</Badge> : null}
                          </div>
                          <p className="text-sm text-[var(--pv-text-muted)]">{problem.notes || 'Sem observacoes registradas.'}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditProblem(problem)}>
                            <PencilLine className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                          <Button variant={problem.status === 'resolved' ? 'secondary' : 'default'} size="sm" onClick={() => handleToggleProblemResolved(problem)}>
                            {problem.status === 'resolved' ? 'Reabrir' : 'Resolver'}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteProblem(problem.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <EmptyState icon={AlertCircle} eyebrow="Problemas" title="Nenhum problema registrado neste plantao" description="Quando os problemas forem adicionados ao caso dentro do plantao ativo, eles aparecerao aqui." />
                )}
              </div>
            </TabsContent>

            <TabsContent value="tarefas" className="min-w-0 w-full">
              <div className="space-y-4">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--pv-text-main)]">Fila operacional do paciente</h2>
                    <p className="text-sm text-[var(--pv-text-muted)]">As tarefas criadas aqui entram automaticamente nas Pendencias Gerais do plantao.</p>
                  </div>
                  <Button onClick={openNewTaskDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova tarefa
                  </Button>
                </div>

                {patientTasks.length > 0 ? (
                  patientTasks.map((task) => (
                    <Card key={task.id} className={task.completed ? 'opacity-75' : ''}>
                      <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex items-start gap-4">
                          <button type="button" onClick={() => toggleTaskCompleted(task.id)} className={['mt-1 flex h-7 w-7 items-center justify-center rounded-md border transition-colors', task.completed ? 'border-[var(--pv-accent-green)] bg-[var(--pv-accent-green)] text-white' : 'border-[var(--pv-border)] bg-[var(--pv-surface-hover)] hover:border-[var(--pv-primary)]'].join(' ')} aria-label={task.completed ? `Reabrir ${task.title}` : `Concluir ${task.title}`}>
                            {task.completed ? <CheckSquare2 className="h-4 w-4" /> : null}
                          </button>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className={['font-semibold', task.completed ? 'text-[var(--pv-text-muted)] line-through' : 'text-[var(--pv-text-main)]'].join(' ')}>{task.title}</p>
                              <Badge variant="outline" className="bg-[var(--pv-surface-hover)] text-[10px] uppercase">
                                {getTaskCategoryLabel(task.category)}
                              </Badge>
                              <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'warning' : 'secondary'}>
                                {getTaskPriorityLabel(task.priority)}
                              </Badge>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-3 text-sm text-[var(--pv-text-muted)]">
                              <span>{task.scheduledTime || 'Sem horario definido'}</span>
                              {task.completedAt ? <span>Concluida em {formatDateTime(task.completedAt)}</span> : null}
                            </div>
                            {task.description ? <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--pv-text-muted)]">{task.description}</p> : null}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEditTaskDialog(task)}>
                            <PencilLine className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                          <Button variant={task.completed ? 'secondary' : 'default'} size="sm" onClick={() => toggleTaskCompleted(task.id)}>
                            {task.completed ? 'Reabrir' : 'Concluir'}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <EmptyState icon={CheckSquare2} eyebrow="Tarefas" title="Nenhuma tarefa registrada para este paciente" description="Crie medicacoes, monitoramentos, exames, orientacoes ao tutor ou pendencias administrativas. Tudo entra automaticamente na tela de Pendencias." primaryAction={{ label: 'Adicionar tarefa', onClick: openNewTaskDialog }} />
                )}
              </div>
            </TabsContent>

            <TabsContent value="parametros" className="min-w-0 w-full">
              <div className="space-y-4">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--pv-text-main)]">Parametros seriados</h2>
                    <p className="text-sm text-[var(--pv-text-muted)]">Registre sinais vitais e exame fisico resumido em ordem cronologica.</p>
                  </div>
                  <Button onClick={() => { setEditingVitals(null); setVitalsDialogOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo registro
                  </Button>
                </div>

                {sortedVitalsRecords.length > 0 ? (
                  sortedVitalsRecords.map((record, index) => {
                    const previousRecord = sortedVitalsRecords[index + 1];
                    const isExpanded = expandedVitalsId === record.id;

                    return (
                      <Card key={record.id}>
                        <CardContent className="space-y-4 p-4">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-semibold text-[var(--pv-text-main)]">{formatDateTime(record.recordedAt)}</p>
                                {record.authorLabel ? <Badge variant="outline">{record.authorLabel}</Badge> : null}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">FC {record.heartRate || '--'}</Badge>
                                <Badge variant="outline">FR {record.respiratoryRate || '--'}</Badge>
                                <Badge variant="outline">TR {record.temperature || '--'}</Badge>
                                <Badge variant="outline">PAS {record.systolicPressure || '--'}</Badge>
                                <Badge variant="outline">Glicemia {record.glucose || '--'}</Badge>
                              </div>
                              {previousRecord ? (
                                <div className="flex flex-wrap gap-2 text-xs text-[var(--pv-text-muted)]">
                                  <span>FC {getVitalTrend(record.heartRate, previousRecord.heartRate)}</span>
                                  <span>FR {getVitalTrend(record.respiratoryRate, previousRecord.respiratoryRate)}</span>
                                  <span>TR {getVitalTrend(record.temperature, previousRecord.temperature)}</span>
                                </div>
                              ) : null}
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" onClick={() => setExpandedVitalsId(isExpanded ? null : record.id)}>
                                {isExpanded ? 'Recolher' : 'Expandir'}
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => { setEditingVitals(record); setVitalsDialogOpen(true); }}>
                                <PencilLine className="mr-2 h-4 w-4" />
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteVitals(record.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </Button>
                            </div>
                          </div>

                          {isExpanded ? (
                            <div className="grid gap-3 border-t border-[var(--pv-border)] pt-4 md:grid-cols-2">
                              <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-3 text-sm">
                                <p className="mb-1 font-medium text-[var(--pv-text-main)]">Exame fisico</p>
                                <p className="text-[var(--pv-text-muted)]">Mucosas: {record.mucousMembranes || '--'}</p>
                                <p className="text-[var(--pv-text-muted)]">TPC: {record.capillaryRefillTime || '--'}</p>
                                <p className="text-[var(--pv-text-muted)]">Dor: {record.pain || '--'}</p>
                                <p className="text-[var(--pv-text-muted)]">Hidratacao: {record.hydration || '--'}</p>
                                <p className="text-[var(--pv-text-muted)]">Estado mental: {record.mentalState || '--'}</p>
                              </div>
                              <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-3 text-sm">
                                <p className="mb-1 font-medium text-[var(--pv-text-main)]">Auscultas</p>
                                <p className="text-[var(--pv-text-muted)]">Cardiaca: {record.cardiacAuscultation || '--'}</p>
                                <p className="text-[var(--pv-text-muted)]">Pulmonar: {record.pulmonaryAuscultation || '--'}</p>
                              </div>
                              <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-3 text-sm">
                                <p className="mb-1 font-medium text-[var(--pv-text-main)]">Eliminações e alimentação</p>
                                <p className="text-[var(--pv-text-muted)]">Urinou: {formatClinicalBoolean(record.urinated)}</p>
                                <p className="text-[var(--pv-text-muted)]">Defecou: {formatClinicalBoolean(record.defecated)}</p>
                                <p className="text-[var(--pv-text-muted)]">Alimentou: {formatClinicalBoolean(record.fed)}</p>
                                {record.feedingDetails ? <p className="text-[var(--pv-text-muted)]">Via / alimento: {record.feedingDetails}</p> : null}
                              </div>
                              <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-3 text-sm">
                                <p className="mb-1 font-medium text-[var(--pv-text-main)]">Intercorrências</p>
                                <p className="text-[var(--pv-text-muted)]">Vômito: {formatClinicalBoolean(record.vomiting, 'Sim', 'Não')}</p>
                                {record.vomitingDescription ? <p className="text-[var(--pv-text-muted)]">{record.vomitingDescription}</p> : null}
                                <p className="text-[var(--pv-text-muted)]">Diarreia: {formatClinicalBoolean(record.diarrhea, 'Sim', 'Não')}</p>
                                {record.diarrheaDescription ? <p className="text-[var(--pv-text-muted)]">{record.diarrheaDescription}</p> : null}
                              </div>
                              <div className="md:col-span-2 rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-3 text-sm text-[var(--pv-text-muted)]">
                                {record.observations || 'Sem observacoes adicionais.'}
                              </div>
                            </div>
                          ) : null}
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <EmptyState icon={HeartPulse} eyebrow="Parametros" title="Nenhum parametro registrado neste plantao" description="Registre sinais vitais, mucosas, TPC, auscultas e observacoes para acompanhar a evolucao do paciente no turno." primaryAction={{ label: 'Adicionar parametros', onClick: () => { setEditingVitals(null); setVitalsDialogOpen(true); } }} />
                )}
              </div>
            </TabsContent>

            <TabsContent value="exames" className="min-w-0 w-full">
              <div className="space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--pv-text-main)]">Exames do paciente</h2>
                    <p className="text-sm text-[var(--pv-text-muted)]">Mostra apenas exames reais com achados principais clínicos.</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <select className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]" value={examCategoryFilter} onChange={(event) => setExamCategoryFilter(event.target.value as 'all' | PatientExamRecord['category'])}>
                      <option value="all">Todas categorias</option>
                      <option value="hemogram">Hemograma</option>
                      <option value="biochemical">Bioquimico</option>
                      <option value="electrolytes">Eletrolitos</option>
                      <option value="urinalysis">Urinalise</option>
                      <option value="blood_gas">Gasometria</option>
                      <option value="imaging">Imagem</option>
                      <option value="rapid">Rapidos</option>
                      <option value="other">Outros</option>
                    </select>
                    <Button onClick={() => { setEditingExam(null); setExamDialogOpen(true); }}>
                      <Plus className="mr-2 h-4 w-4" />
                      Novo exame
                    </Button>
                    {selectedExamIds.length > 0 ? (
                      <Button variant="ghost" onClick={handleBulkDeleteExams}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir selecionados
                      </Button>
                    ) : null}
                  </div>
                </div>

                {filteredExamRecords.length > 0 ? (
                  filteredExamRecords.map((exam) => {
                    const isExpanded = expandedExamId === exam.id;

                    return (
                      <Card key={exam.id}>
                        <CardContent className="space-y-4 p-4">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedExamIds.includes(exam.id)}
                                  onChange={(event) =>
                                    setSelectedExamIds((current) =>
                                      event.target.checked ? [...current, exam.id] : current.filter((item) => item !== exam.id)
                                    )
                                  }
                                />
                                <p className="font-semibold text-[var(--pv-text-main)]">{exam.title || getExamCategoryLabel(exam.category)}</p>
                                <Badge variant="outline">{getExamCategoryLabel(exam.category)}</Badge>
                                <Badge variant="secondary">{formatDateTime(exam.recordedAt)}</Badge>
                              </div>
                              <p className="mt-2 text-sm text-[var(--pv-text-muted)]">{exam.summary || 'Sem resumo curto registrado.'}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" onClick={() => setExpandedExamId(isExpanded ? null : exam.id)}>
                                {isExpanded ? 'Recolher' : 'Expandir'}
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => { setEditingExam(exam); setExamDialogOpen(true); }}>
                                <PencilLine className="mr-2 h-4 w-4" />
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteExam(exam.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </Button>
                            </div>
                          </div>

                          {isExpanded ? (
                            <div className="space-y-3 border-t border-[var(--pv-border)] pt-4">
                              <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-3">
                                <p className="mb-1 text-sm font-medium text-[var(--pv-text-main)]">Achados principais</p>
                                <p className="whitespace-pre-wrap text-sm text-[var(--pv-text-muted)]">{exam.findings || 'Sem valores principais registrados.'}</p>
                              </div>
                              <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-3">
                                <p className="mb-1 text-sm font-medium text-[var(--pv-text-main)]">Observacoes</p>
                                <p className="whitespace-pre-wrap text-sm text-[var(--pv-text-muted)]">{exam.observations || 'Sem observacoes adicionais.'}</p>
                              </div>
                            </div>
                          ) : null}
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <EmptyState icon={FlaskConical} eyebrow="Exames" title="Nenhum exame registrado neste plantao" description="Adicione hemograma, bioquimico, eletrolitos, urinanalise, imagem ou outros exames com resumo e achados principais." primaryAction={{ label: 'Adicionar exame', onClick: () => { setEditingExam(null); setExamDialogOpen(true); } }} />
                )}
              </div>
            </TabsContent>
            <TabsContent value="medicacoes" className="min-w-0 w-full">
              <div className="space-y-4">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--pv-text-main)]">Medicacoes / prescricao em uso</h2>
                    <p className="text-sm text-[var(--pv-text-muted)]">Adicione, edite, suspenda ou reative medicações utilizadas neste plantao.</p>
                  </div>
                  <Button onClick={() => { setEditingMedication(null); setMedicationDialogOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova medicacao
                  </Button>
                </div>

                {sortedMedicationEntries.length > 0 ? (
                  sortedMedicationEntries.map((medication) => (
                    <Card key={medication.id}>
                      <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-[var(--pv-text-main)]">{medication.name}</p>
                            <Badge variant={getMedicationStatusBadgeVariant(medication.status)}>{medication.status === 'active' ? 'Ativa' : 'Suspensa'}</Badge>
                            {medication.updatedAt !== medication.createdAt ? <Badge variant="outline">Atualizada</Badge> : null}
                          </div>
                          <p className="text-sm text-[var(--pv-text-muted)]">{[medication.dose, medication.frequency, medication.route].filter(Boolean).join(' • ') || 'Sem posologia detalhada'}</p>
                          <p className="text-sm text-[var(--pv-text-muted)]">Inicio: {formatDateTime(medication.startedAt)} {medication.suspendedAt ? `• Suspensa: ${formatDateTime(medication.suspendedAt)}` : ''}</p>
                          {medication.observations ? <p className="whitespace-pre-wrap text-sm text-[var(--pv-text-muted)]">{medication.observations}</p> : null}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" onClick={() => { setEditingMedication(medication); setMedicationDialogOpen(true); }}>
                            <PencilLine className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                          {medication.status === 'active' ? (
                            <Button variant="outline" size="sm" onClick={() => handleMedicationStatusChange(medication, 'suspended')}>
                              Suspender
                            </Button>
                          ) : (
                            <Button variant="secondary" size="sm" onClick={() => handleMedicationStatusChange(medication, 'active')}>
                              Reativar
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteMedication(medication.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <EmptyState icon={Pill} eyebrow="Medicacoes" title="Nenhuma medicacao estruturada neste plantao" description="Registre medicações ativas ou suspensas com dose, frequencia, via e observacoes para enriquecer o acompanhamento clinico." primaryAction={{ label: 'Adicionar medicacao', onClick: () => { setEditingMedication(null); setMedicationDialogOpen(true); } }} />
                )}
              </div>
            </TabsContent>

            <TabsContent value="boletins" className="min-w-0 w-full">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Gerador de boletim</CardTitle>
                      <CardDescription>Gera um texto base a partir do resumo, alertas, tarefas, parametros, exames, nutricao e medicacoes do plantao ativo.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant={bulletinType === 'clinical' ? 'default' : 'outline'} className="h-12 w-full justify-start gap-3" onClick={() => setBulletinType('clinical')}>
                        <Stethoscope className="h-5 w-5" />
                        Boletim veterinario
                      </Button>
                      <Button variant={bulletinType === 'tutor' ? 'default' : 'outline'} className="h-12 w-full justify-start gap-3" onClick={() => setBulletinType('tutor')}>
                        <MessageSquare className="h-5 w-5" />
                        Boletim tutor
                      </Button>
                      <div className="space-y-2 pt-2">
                        <p className="text-sm font-medium text-[var(--pv-text-main)]">Titulo</p>
                        <Input value={bulletinTitle} onChange={(event) => setBulletinTitle(event.target.value)} />
                      </div>
                      <div className="flex flex-col gap-2 pt-2">
                        <Button onClick={handleSaveBulletin}>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar boletim
                        </Button>
                        <Button variant="outline" onClick={handleRegenerateBulletin}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerar texto base
                        </Button>
                        <Button variant="secondary" onClick={() => handleCopy(bulletinText, 'bulletin-editor')} disabled={!bulletinText.trim()}>
                          <Copy className="mr-2 h-4 w-4" />
                          {copiedKey === 'bulletin-editor' ? 'Copiado!' : 'Copiar texto'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-3">
                        <CardTitle className="text-lg">Boletins salvos</CardTitle>
                        {selectedBulletinIds.length > 0 ? (
                          <Button variant="ghost" size="sm" onClick={handleBulkDeleteBulletins}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir selecionados
                          </Button>
                        ) : null}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {patientBulletins.length > 0 ? (
                        patientBulletins.map((bulletin) => (
                          <div key={bulletin.id} className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="mb-2">
                                  <input
                                    type="checkbox"
                                    checked={selectedBulletinIds.includes(bulletin.id)}
                                    onChange={(event) =>
                                      setSelectedBulletinIds((current) =>
                                        event.target.checked ? [...current, bulletin.id] : current.filter((item) => item !== bulletin.id)
                                      )
                                    }
                                  />
                                </div>
                                <p className="font-medium text-[var(--pv-text-main)]">{bulletin.title || 'Boletim sem titulo'}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--pv-text-muted)]">
                                  {getBulletinTypeLabel(bulletin.type)} • {formatDateTime(bulletin.updatedAt)}
                                </p>
                              </div>
                              <Badge variant="outline">{bulletin.authorLabel || 'Equipe'}</Badge>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" onClick={() => { setBulletinType(bulletin.type === 'tutor' ? 'tutor' : 'clinical'); setBulletinTitle(bulletin.title); setBulletinText(bulletin.content); }}>
                                Abrir
                              </Button>
                              <Button variant="secondary" size="sm" onClick={() => handleCopy(bulletin.content, bulletin.id)}>
                                <Copy className="mr-2 h-4 w-4" />
                                {copiedKey === bulletin.id ? 'Copiado!' : 'Copiar'}
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteBulletin(bulletin.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-[var(--pv-text-muted)]">Nenhum boletim salvo ainda neste plantao.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-8">
                  <Card className="flex h-full flex-col">
                    <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="h-5 w-5 text-[var(--pv-primary)]" />
                        Preview e edicao
                      </CardTitle>
                      <Badge variant="outline">{bulletinType === 'clinical' ? 'Veterinario' : 'Tutor'}</Badge>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Textarea value={bulletinText} onChange={(event) => setBulletinText(event.target.value)} className="min-h-[520px] resize-none bg-[var(--pv-surface-hover)]/45 font-mono text-sm" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resumo-diario" className="min-w-0 w-full">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-lg">Resumo diário da internação</CardTitle>
                      {selectedDailySummaryIds.length > 0 ? (
                        <Button variant="ghost" size="sm" onClick={handleBulkDeleteDailySummary}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir selecionados
                        </Button>
                      ) : null}
                    </div>
                    <CardDescription>
                      Esta seção consolida eventos do turno e também aceita inserção manual para boletins, passagem e histórico rápido.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={dailySummaryDraft}
                      onChange={(event) => setDailySummaryDraft(event.target.value)}
                      placeholder="Registrar observação manual do turno, procedimento, mudança de suporte, intercorrência ou resumo clínico."
                      className="min-h-[120px] resize-y"
                    />
                    <Button onClick={handleAddManualDailySummary} disabled={!dailySummaryDraft.trim()}>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar ao resumo diário
                    </Button>
                  </CardContent>
                </Card>

                {dailySummaryEntries.length > 0 ? (
                  dailySummaryEntries.map((entry) => (
                    <Card key={entry.id}>
                      <CardContent className="flex min-w-0 flex-col gap-4 p-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedDailySummaryIds.includes(entry.id)}
                              onChange={(event) =>
                                setSelectedDailySummaryIds((current) =>
                                  event.target.checked ? [...current, entry.id] : current.filter((item) => item !== entry.id)
                                )
                              }
                            />
                            <p className="font-semibold text-[var(--pv-text-main)]">{entry.title}</p>
                            <Badge variant="outline">
                              {new Date(entry.occurredAt).toLocaleString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </Badge>
                            {entry.manual ? <Badge variant="secondary">Manual</Badge> : null}
                            {entry.doctorVetReported ? <Badge variant="success">Já passado ao doctor vet</Badge> : null}
                          </div>
                          <p className="whitespace-pre-wrap text-sm text-[var(--pv-text-muted)]">{entry.content}</p>
                          {entry.details ? <p className="mt-2 whitespace-pre-wrap text-xs text-[var(--pv-text-muted)]">{entry.details}</p> : null}
                          <div className="mt-3 flex flex-col gap-3 rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/45 p-3">
                            <label className="flex items-center gap-2 text-sm text-[var(--pv-text-main)]">
                              <input type="checkbox" checked={entry.doctorVetReported} onChange={() => handleToggleDoctorVet(entry.id, entry.doctorVetReported)} />
                              Já passei isso para o doctor vet?
                            </label>
                            <Input value={entry.doctorVetReportNote || ''} onChange={(event) => handleDoctorVetNote(entry.id, event.target.value)} placeholder="Observação sobre o que foi repassado ao doctor vet" />
                            {entry.doctorVetReportedAt ? <p className="text-xs text-[var(--pv-text-muted)]">Marcado em {new Date(entry.doctorVetReportedAt).toLocaleString('pt-BR')}</p> : null}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteDailySummary(entry.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <EmptyState
                    icon={FileText}
                    eyebrow="Resumo diário"
                    title="Nenhum evento consolidado ainda"
                    description="Parâmetros, exames, medicações e tarefas concluídas começam a alimentar esta timeline automaticamente. Você também pode inserir registros manuais."
                  />
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <TaskEditorDialog open={taskDialogOpen} onClose={() => setTaskDialogOpen(false)} shiftId={activeShift?.id || null} shiftPatientId={patient.id} patientLabel={patient.displayName} initialTask={editingTask} />
      <VitalsRecordDialog open={vitalsDialogOpen} onClose={() => setVitalsDialogOpen(false)} initialRecord={editingVitals} onSubmit={handleSubmitVitals} />
      <ExamRecordDialog open={examDialogOpen} onClose={() => setExamDialogOpen(false)} initialRecord={editingExam} onSubmit={handleSubmitExam} />
      <MedicationEditorDialog open={medicationDialogOpen} onClose={() => setMedicationDialogOpen(false)} initialMedication={editingMedication} onSubmit={handleSubmitMedication} />
    </>
  );
}

