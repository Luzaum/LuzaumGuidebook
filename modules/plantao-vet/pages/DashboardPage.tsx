import React, { useMemo, useState } from 'react';
import {
  Activity,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Repeat,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { EmptyState } from '../components/EmptyState';
import { ImportFromShiftDialog } from '../components/ImportFromShiftDialog';
import { ManualPatientDialog } from '../components/ManualPatientDialog';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import {
  getActiveMedicationEntries,
  getLatestVitalsRecord,
  getNutritionSummary,
  getTubeTypeLabel,
} from '../lib/patientClinical';
import {
  compareScheduledTimes,
  getPatientStatusLabel,
  getPatientStatusVariant,
  getSpeciesLabel,
} from '../lib/presentation';
import { formatDateLong, SHIFT_TYPE_LABELS } from '../lib/shifts';
import {
  getActiveShift,
  getActiveShiftBulletins,
  getActiveShiftPatients,
  getActiveShiftTasks,
  getDashboardSummary,
  usePlantaoVetSnapshot,
} from '../store/selectors';

const metrics = [
  { key: 'activePatients', label: 'Total pacientes', icon: Activity, tone: 'text-[var(--pv-primary)]' },
  { key: 'activeTasks', label: 'Pendências', icon: Clock, tone: 'text-[var(--pv-accent-yellow-strong)]' },
  { key: 'bulletins', label: 'Boletins', icon: FileText, tone: 'text-[var(--pv-accent-green-strong)]' },
] as const;

function openShiftSelector() {
  window.dispatchEvent(new Event('plantao-vet:open-shift-selector'));
}

export function DashboardPage() {
  const navigate = useNavigate();
  const snapshot = usePlantaoVetSnapshot();
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [manualDialogOpen, setManualDialogOpen] = useState(false);

  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);
  const patients = useMemo(() => getActiveShiftPatients(snapshot), [snapshot]);
  const tasks = useMemo(() => getActiveShiftTasks(snapshot), [snapshot]);
  const bulletins = useMemo(() => getActiveShiftBulletins(snapshot), [snapshot]);
  const summary = useMemo(() => getDashboardSummary(snapshot), [snapshot]);

  const tasksByPatientId = useMemo(() => {
    return tasks.reduce<Record<string, typeof tasks>>((acc, task) => {
      if (!task.shiftPatientId) {
        return acc;
      }

      if (!acc[task.shiftPatientId]) {
        acc[task.shiftPatientId] = [];
      }

      acc[task.shiftPatientId].push(task);
      acc[task.shiftPatientId].sort((a, b) => compareScheduledTimes(a.scheduledTime, b.scheduledTime));
      return acc;
    }, {});
  }, [tasks]);

  const bulletinsByPatientId = useMemo(() => {
    return bulletins.reduce<Record<string, number>>((acc, bulletin) => {
      if (!bulletin.shiftPatientId) {
        return acc;
      }

      acc[bulletin.shiftPatientId] = (acc[bulletin.shiftPatientId] || 0) + 1;
      return acc;
    }, {});
  }, [bulletins]);

  if (!snapshot.isHydrated) {
    return <div className="px-2 py-6 text-sm text-[var(--pv-text-muted)]">Carregando módulo...</div>;
  }

  return (
    <>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--pv-text-main)]">Plantão Internação</h1>
            <p className="mt-1 flex items-center gap-2 text-[var(--pv-text-muted)]">
              <Calendar className="h-4 w-4" />
              {activeShift
                ? `${formatDateLong(activeShift.dateISO)} - ${SHIFT_TYPE_LABELS[activeShift.shiftType]}`
                : 'Selecione ou crie um plantão para começar'}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button variant="outline" onClick={() => navigate('/plantao-vet/importar')}>
              <FileText className="mr-2 h-4 w-4" />
              Importar prontuário
            </Button>
            <Button variant="outline" onClick={() => setImportDialogOpen(true)} disabled={!activeShift}>
              <Repeat className="mr-2 h-4 w-4" />
              Importar de outro plantão
            </Button>
            <Button variant="outline" onClick={() => setManualDialogOpen(true)} disabled={!activeShift}>
              <Users className="mr-2 h-4 w-4" />
              Adicionar paciente
            </Button>
            <Button onClick={() => navigate('/plantao-vet/passagem')}>Passagem de plantão</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.key} className="plantao-vet-metric">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`rounded-xl bg-[var(--pv-surface-hover)] p-3 ${metric.tone}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--pv-text-muted)]">{metric.label}</p>
                    <p className="text-2xl font-bold text-[var(--pv-text-main)]">{summary[metric.key]}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {activeShift ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-dashed bg-[var(--pv-surface-hover)]/35">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-medium text-[var(--pv-text-main)]">Fila operacional</p>
                  <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                    {summary.activeTasks} pendência(s) aberta(s) para o turno atual.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/plantao-vet/pendencias')}>
                  Abrir pendências
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed bg-[var(--pv-surface-hover)]/35">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-medium text-[var(--pv-text-main)]">Boletins do turno</p>
                  <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                    {summary.bulletins} boletim(ns) salvo(s) no plantão ativo.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/plantao-vet/passagem')}>
                  Abrir passagem
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed bg-[var(--pv-surface-hover)]/35">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-medium text-[var(--pv-text-main)]">Atalho rápido</p>
                  <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                    Organize pacientes, tarefas e boletins sem sair do contexto do plantão.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/plantao-vet/pacientes')}>
                  Abrir pacientes
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {!activeShift ? (
          <EmptyState
            icon={Calendar}
            eyebrow="Plantão ativo"
            title="Nenhum plantão selecionado"
            description="Use o seletor no topo da tela para abrir um plantão existente ou criar um plantão diurno ou noturno. O dashboard sempre reflete apenas o turno ativo."
            primaryAction={{ label: 'Criar plantão', onClick: openShiftSelector }}
            secondaryAction={{ label: 'Abrir pacientes', href: '/plantao-vet/pacientes' }}
          >
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              O módulo continua integrado ao VETIUS com persistência isolada por clínica.
            </div>
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              <Button variant="outline" className="w-full" onClick={openShiftSelector}>
                Importar pacientes de outro plantão
              </Button>
            </div>
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              <Button variant="outline" className="w-full" onClick={openShiftSelector}>
                Importar prontuário ou adicionar paciente
              </Button>
            </div>
          </EmptyState>
        ) : patients.length === 0 ? (
          <EmptyState
            icon={Users}
            eyebrow="Plantão vazio"
            title="Este plantão ainda não possui pacientes"
            description="Importe um prontuário, traga pacientes de outro plantão ou cadastre um caso manualmente. Assim que houver pacientes, eles aparecerão aqui com atalhos para a ficha."
            primaryAction={{ label: 'Importar prontuário', href: '/plantao-vet/importar' }}
            secondaryAction={{ label: 'Importar de outro plantão', onClick: () => setImportDialogOpen(true) }}
          >
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              <Button variant="outline" className="w-full" onClick={() => setManualDialogOpen(true)}>
                Adicionar paciente manualmente
              </Button>
            </div>
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              <Button variant="outline" className="w-full" onClick={openShiftSelector}>
                Criar outro plantão
              </Button>
            </div>
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              {SHIFT_TYPE_LABELS[activeShift.shiftType]} ativo em {formatDateLong(activeShift.dateISO)}.
            </div>
          </EmptyState>
        ) : (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-[var(--pv-text-main)]">Pacientes do turno</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {patients.map((patient) => {
                const patientTasks = (tasksByPatientId[patient.id] || []).filter((task) => !task.completed);
                const nextTask = patientTasks[0];
                const activeProblems = patient.problems.filter((problem) => problem.status === 'active' && !problem.deletedAt);
                const latestVitals = getLatestVitalsRecord(patient);
                const activeMedications = getActiveMedicationEntries(patient);
                const nutritionSummaryLabel = getNutritionSummary(patient);
                const hasCriticalTasks = patientTasks.some((task) => task.priority === 'high');

                return (
                  <Card
                    key={patient.id}
                    className="group cursor-pointer overflow-hidden transition-all duration-200 hover:border-[var(--pv-primary)]/40"
                    onClick={() => navigate(`/plantao-vet/paciente/${patient.id}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <CardTitle className="text-xl">{patient.displayName}</CardTitle>
                            <Badge variant={getPatientStatusVariant(patient.status)}>
                              {getPatientStatusLabel(patient.status)}
                            </Badge>
                            {patient.importedFromShiftId ? (
                              <Badge variant="secondary">Importado do plantão anterior</Badge>
                            ) : null}
                          </div>
                          <p className="text-sm text-[var(--pv-text-muted)]">
                            {getSpeciesLabel(patient.species)} - {patient.breed || 'Raça não informada'} -{' '}
                            {patient.baseWeightLabel || patient.weightLabel || 'Peso não informado'} - Tutor:{' '}
                            {patient.tutorName || 'Não informado'}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[var(--pv-text-muted)] group-hover:text-[var(--pv-primary)]"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <p className="mb-1 text-sm font-medium text-[var(--pv-text-main)]">Diagnóstico / suspeita</p>
                        <p className="text-sm text-[var(--pv-text-muted)]">
                          {patient.mainDiagnosis || 'Sem diagnóstico principal registrado.'}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {patient.alertBadges.length > 0 ? (
                          patient.alertBadges.map((badge) => (
                            <Badge key={badge} variant="outline" className="bg-[var(--pv-surface-hover)]">
                              {badge}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="secondary">Sem alertas cadastrados</Badge>
                        )}
                        {activeMedications.length > 0 ? <Badge variant="outline">Medicação em uso</Badge> : null}
                        {patient.nutritionSupport.tubeInUse ? (
                          <Badge variant="outline">Sonda {getTubeTypeLabel(patient.nutritionSupport.tubeType)}</Badge>
                        ) : null}
                        {hasCriticalTasks ? <Badge variant="destructive">Pendência crítica</Badge> : null}
                      </div>

                      {nextTask ? (
                        <div className="flex items-center justify-between rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-[var(--pv-accent-yellow)]" />
                            <p className="text-sm font-medium text-[var(--pv-text-main)]">Próxima pendência</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[var(--pv-text-muted)]">
                            <Clock className="h-4 w-4" />
                            {(nextTask.scheduledTime || 'Sem horário') + ' - ' + nextTask.title}
                          </div>
                        </div>
                      ) : null}

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-3">
                          <p className="mb-1 text-sm font-medium text-[var(--pv-text-main)]">Contexto clínico</p>
                          <p className="text-sm text-[var(--pv-text-muted)]">
                            {activeProblems.length > 0
                              ? activeProblems.map((problem) => problem.title).join(' • ')
                              : patient.definingPhrase || 'Sem problemas ativos estruturados.'}
                          </p>
                        </div>
                        <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-3">
                          <p className="mb-1 text-sm font-medium text-[var(--pv-text-main)]">Nutrição / suporte</p>
                          <p className="text-sm text-[var(--pv-text-muted)]">
                            {nutritionSummaryLabel || 'Sem resumo nutricional estruturado.'}
                          </p>
                        </div>
                      </div>

                      {latestVitals ? (
                        <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-3 text-sm text-[var(--pv-text-muted)]">
                          <p className="mb-1 font-medium text-[var(--pv-text-main)]">Parâmetros recentes</p>
                          <p>
                            FC {latestVitals.heartRate || '--'} • FR {latestVitals.respiratoryRate || '--'} • TR{' '}
                            {latestVitals.temperature || '--'} • PAS {latestVitals.systolicPressure || '--'}
                          </p>
                        </div>
                      ) : null}

                      <div className="flex items-center justify-between border-t border-[var(--pv-border)] pt-4 text-sm text-[var(--pv-text-muted)]">
                        <span>{activeProblems.length} problema(s) ativo(s)</span>
                        <span>{patientTasks.length} pendência(s) aberta(s)</span>
                        <span>{bulletinsByPatientId[patient.id] || 0} boletim(ns)</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <ImportFromShiftDialog open={importDialogOpen} onClose={() => setImportDialogOpen(false)} />
      <ManualPatientDialog open={manualDialogOpen} onClose={() => setManualDialogOpen(false)} />
    </>
  );
}
