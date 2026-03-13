import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  CheckSquare2,
  Copy,
  FileText,
  MessageSquare,
  PencilLine,
  Plus,
  RefreshCw,
  Save,
  Stethoscope,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { EmptyState } from '../components/EmptyState';
import { TaskEditorDialog } from '../components/TaskEditorDialog';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Textarea } from '../components/ui/Textarea';
import { buildBulletinText } from '../lib/clinicalText';
import {
  compareScheduledTimes,
  getPatientStatusLabel,
  getPatientStatusVariant,
  getProblemPriorityLabel,
  getSpeciesLabel,
  getTaskCategoryLabel,
  getTaskPriorityLabel,
} from '../lib/presentation';
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
import { Bulletin, Task } from '../types';

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

export function PatientDetailPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const snapshot = usePlantaoVetSnapshot();
  const toggleTaskCompleted = usePlantaoVetStore((state) => state.toggleTaskCompleted);
  const upsertShiftPatient = usePlantaoVetStore((state) => state.upsertShiftPatient);
  const upsertBulletin = usePlantaoVetStore((state) => state.upsertBulletin);

  const [activeTab, setActiveTab] = useState('resumo');
  const [bulletinType, setBulletinType] = useState<'clinical' | 'tutor'>('clinical');
  const [bulletinTitle, setBulletinTitle] = useState('');
  const [bulletinText, setBulletinText] = useState('');
  const [importantNotesDraft, setImportantNotesDraft] = useState('');
  const [nextShiftPlanDraft, setNextShiftPlanDraft] = useState('');
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
  const generatedBulletinText = useMemo(() => {
    if (!patient) {
      return '';
    }

    return buildBulletinText(patient, patientTasks, bulletinType);
  }, [bulletinType, patient, patientTasks]);

  useEffect(() => {
    if (!patient) {
      return;
    }

    setImportantNotesDraft(patient.importantNotes || '');
    setNextShiftPlanDraft(patient.nextShiftPlan || '');
  }, [patient?.id]);

  useEffect(() => {
    if (!patient) {
      return;
    }

    setBulletinTitle(bulletinType === 'clinical' ? 'Boletim veterinario' : 'Boletim tutor');
    setBulletinText(generatedBulletinText);
  }, [bulletinType, patient?.id]);

  async function handleCopy(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1600);
  }

  function handleSaveContext() {
    if (!patient) {
      return;
    }

    upsertShiftPatient({
      ...patient,
      importantNotes: importantNotesDraft.trim(),
      nextShiftPlan: nextShiftPlanDraft.trim(),
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
    });

    upsertShiftPatient({
      ...patient,
      importantNotes: importantNotesDraft.trim(),
      nextShiftPlan: nextShiftPlanDraft.trim(),
      lastBulletinAt: savedBulletin.updatedAt,
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
      <div className="space-y-6 pb-12">
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
              {getSpeciesLabel(patient.species)} - {patient.breed || 'Raca nao informada'} -{' '}
              {patient.ageLabel || 'Idade nao informada'} - {patient.weightLabel || 'Peso nao informado'} - Tutor:{' '}
              {patient.tutorName || 'Nao informado'}
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
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto pb-2">
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
              <TabsTrigger value="boletins" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Boletins
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-6">
            <TabsContent value="resumo" className="grid grid-cols-1 gap-6 lg:grid-cols-12">
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

                  <div>
                    <p className="mb-2 text-sm font-medium text-[var(--pv-text-muted)]">Medicacoes em uso</p>
                    {patient.medicationsInUse.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {patient.medicationsInUse.map((medication) => (
                          <Badge key={medication} variant="outline" className="bg-[var(--pv-surface-hover)]">
                            {medication}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--pv-text-muted)]">Nenhuma medicacao em uso registrada.</p>
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
                      <p className="font-medium text-[var(--pv-text-main)]">
                        {patientTasks.filter((task) => !task.completed).length}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium text-[var(--pv-text-muted)]">Boletins no turno</p>
                      <p className="font-medium text-[var(--pv-text-main)]">{patientBulletins.length}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium text-[var(--pv-text-muted)]">Origem</p>
                      <p className="font-medium text-[var(--pv-text-main)]">
                        {patient.importedFromShiftId
                          ? patient.importedFromDate
                            ? formatDateLong(patient.importedFromDate)
                            : 'Plantao anterior'
                          : 'Criado neste plantao'}
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
                      <Textarea
                        className="min-h-[120px] resize-y"
                        value={importantNotesDraft}
                        onChange={(event) => setImportantNotesDraft(event.target.value)}
                        placeholder="Ex.: resposta a medicacao, pontos criticos, comportamento, risco de descompensacao."
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[var(--pv-text-main)]">Plano / pontos de atencao</p>
                      <Textarea
                        className="min-h-[120px] resize-y"
                        value={nextShiftPlanDraft}
                        onChange={(event) => setNextShiftPlanDraft(event.target.value)}
                        placeholder="Ex.: repetir exame, manter monitoramento, revisar alta, contato com tutor."
                      />
                    </div>
                    <Button onClick={handleSaveContext}>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar contexto do turno
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="problemas">
              <div className="space-y-4">
                {patient.problems.length > 0 ? (
                  patient.problems.map((problem) => (
                    <Card key={problem.id}>
                      <CardContent className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center">
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-[var(--pv-text-main)]">{problem.title}</h3>
                            <Badge variant="outline" className="uppercase">
                              {problem.status}
                            </Badge>
                            {problem.priority === 'high' ? (
                              <Badge variant="destructive">{getProblemPriorityLabel(problem.priority)}</Badge>
                            ) : null}
                          </div>
                          <p className="text-sm text-[var(--pv-text-muted)]">
                            {problem.notes || 'Sem observacoes registradas.'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <EmptyState
                    icon={AlertCircle}
                    eyebrow="Problemas"
                    title="Nenhum problema registrado neste plantao"
                    description="Quando os problemas forem adicionados ao caso dentro do plantao ativo, eles aparecerao aqui."
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="tarefas">
              <div className="space-y-4">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--pv-text-main)]">Fila operacional do paciente</h2>
                    <p className="text-sm text-[var(--pv-text-muted)]">
                      As tarefas criadas aqui entram automaticamente nas Pendencias Gerais do plantao.
                    </p>
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
                          <button
                            type="button"
                            onClick={() => toggleTaskCompleted(task.id)}
                            className={[
                              'mt-1 flex h-7 w-7 items-center justify-center rounded-md border transition-colors',
                              task.completed
                                ? 'border-[var(--pv-accent-green)] bg-[var(--pv-accent-green)] text-white'
                                : 'border-[var(--pv-border)] bg-[var(--pv-surface-hover)] hover:border-[var(--pv-primary)]',
                            ].join(' ')}
                            aria-label={task.completed ? `Reabrir ${task.title}` : `Concluir ${task.title}`}
                          >
                            {task.completed ? <CheckSquare2 className="h-4 w-4" /> : null}
                          </button>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p
                                className={[
                                  'font-semibold',
                                  task.completed
                                    ? 'text-[var(--pv-text-muted)] line-through'
                                    : 'text-[var(--pv-text-main)]',
                                ].join(' ')}
                              >
                                {task.title}
                              </p>
                              <Badge variant="outline" className="bg-[var(--pv-surface-hover)] text-[10px] uppercase">
                                {getTaskCategoryLabel(task.category)}
                              </Badge>
                              <Badge
                                variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'warning' : 'secondary'}
                              >
                                {getTaskPriorityLabel(task.priority)}
                              </Badge>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-3 text-sm text-[var(--pv-text-muted)]">
                              <span>{task.scheduledTime || 'Sem horario definido'}</span>
                              {task.completedAt ? <span>Concluida em {new Date(task.completedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span> : null}
                            </div>
                            {task.description ? (
                              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--pv-text-muted)]">
                                {task.description}
                              </p>
                            ) : null}
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
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <EmptyState
                    icon={CheckSquare2}
                    eyebrow="Tarefas"
                    title="Nenhuma tarefa registrada para este paciente"
                    description="Crie medicacoes, monitoramentos, exames, orientacoes ao tutor ou pendencias administrativas. Tudo entra automaticamente na tela de Pendencias."
                    primaryAction={{ label: 'Adicionar tarefa', onClick: openNewTaskDialog }}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="boletins">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Gerador de boletim</CardTitle>
                      <CardDescription>
                        Gera um texto base a partir do resumo, alertas, problemas e tarefas do plantao ativo.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant={bulletinType === 'clinical' ? 'default' : 'outline'}
                        className="h-12 w-full justify-start gap-3"
                        onClick={() => setBulletinType('clinical')}
                      >
                        <Stethoscope className="h-5 w-5" />
                        Boletim veterinario
                      </Button>
                      <Button
                        variant={bulletinType === 'tutor' ? 'default' : 'outline'}
                        className="h-12 w-full justify-start gap-3"
                        onClick={() => setBulletinType('tutor')}
                      >
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
                        <Button variant="outline" onClick={() => setBulletinText(generatedBulletinText)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerar texto base
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => handleCopy(bulletinText, 'bulletin-editor')}
                          disabled={!bulletinText.trim()}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          {copiedKey === 'bulletin-editor' ? 'Copiado!' : 'Copiar texto'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Boletins salvos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {patientBulletins.length > 0 ? (
                        patientBulletins.map((bulletin) => (
                          <div key={bulletin.id} className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="font-medium text-[var(--pv-text-main)]">
                                  {bulletin.title || 'Boletim sem titulo'}
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--pv-text-muted)]">
                                  {getBulletinTypeLabel(bulletin.type)} •{' '}
                                  {new Date(bulletin.updatedAt).toLocaleString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                              <Badge variant="outline">{bulletin.authorLabel || 'Equipe'}</Badge>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setBulletinType(bulletin.type === 'tutor' ? 'tutor' : 'clinical');
                                  setBulletinTitle(bulletin.title);
                                  setBulletinText(bulletin.content);
                                }}
                              >
                                Abrir
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleCopy(bulletin.content, bulletin.id)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                {copiedKey === bulletin.id ? 'Copiado!' : 'Copiar'}
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-[var(--pv-text-muted)]">
                          Nenhum boletim salvo ainda neste plantao.
                        </p>
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
                      <Textarea
                        value={bulletinText}
                        onChange={(event) => setBulletinText(event.target.value)}
                        className="min-h-[460px] resize-none bg-[var(--pv-surface-hover)]/45 font-mono text-sm"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <TaskEditorDialog
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
        shiftId={activeShift?.id || null}
        shiftPatientId={patient.id}
        patientLabel={patient.displayName}
        initialTask={editingTask}
      />
    </>
  );
}
