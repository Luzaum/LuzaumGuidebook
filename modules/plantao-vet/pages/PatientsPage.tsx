import React, { useMemo, useState } from 'react';
import { ChevronRight, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { EmptyState } from '../components/EmptyState';
import { ImportFromShiftDialog } from '../components/ImportFromShiftDialog';
import { ManualPatientDialog } from '../components/ManualPatientDialog';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import {
  compareScheduledTimes,
  getPatientStatusLabel,
  getPatientStatusVariant,
  getSpeciesLabel,
} from '../lib/presentation';
import {
  getActiveShift,
  getActiveShiftPatients,
  getActiveShiftTasks,
  usePlantaoVetSnapshot,
} from '../store/selectors';

function openShiftSelector() {
  window.dispatchEvent(new Event('plantao-vet:open-shift-selector'));
}

type AlertFilter = 'all' | 'with-alerts' | 'with-import-origin';
type StatusFilter = 'all' | 'critical' | 'watch' | 'stable' | 'discharge_today';
type SortMode = 'name-asc' | 'name-desc' | 'next-task' | 'status';

export function PatientsPage() {
  const navigate = useNavigate();
  const snapshot = usePlantaoVetSnapshot();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [alertFilter, setAlertFilter] = useState<AlertFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('name-asc');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [manualDialogOpen, setManualDialogOpen] = useState(false);

  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);
  const patients = useMemo(() => getActiveShiftPatients(snapshot), [snapshot]);
  const tasks = useMemo(() => getActiveShiftTasks(snapshot), [snapshot]);

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

  const filteredPatients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return patients
      .filter((patient) => {
        if (query) {
          const values = [patient.displayName, patient.mainDiagnosis, patient.tutorName, patient.summary];

          if (!values.some((value) => value.toLowerCase().includes(query))) {
            return false;
          }
        }

        if (statusFilter !== 'all' && patient.status !== statusFilter) {
          return false;
        }

        if (alertFilter === 'with-alerts' && patient.alertBadges.length === 0) {
          return false;
        }

        if (alertFilter === 'with-import-origin' && !patient.importedFromShiftId) {
          return false;
        }

        return true;
      })
      .sort((left, right) => {
        const leftNextTask = (tasksByPatientId[left.id] || []).find((task) => !task.completed);
        const rightNextTask = (tasksByPatientId[right.id] || []).find((task) => !task.completed);

        switch (sortMode) {
          case 'name-desc':
            return right.displayName.localeCompare(left.displayName);
          case 'next-task':
            return compareScheduledTimes(leftNextTask?.scheduledTime || null, rightNextTask?.scheduledTime || null);
          case 'status':
            return left.status.localeCompare(right.status);
          case 'name-asc':
          default:
            return left.displayName.localeCompare(right.displayName);
        }
      });
  }, [alertFilter, patients, searchTerm, sortMode, statusFilter, tasksByPatientId]);

  if (!snapshot.isHydrated) {
    return <div className="px-2 py-6 text-sm text-[var(--pv-text-muted)]">Carregando modulo...</div>;
  }

  return (
    <>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--pv-text-main)]">Pacientes</h1>
            <p className="mt-1 text-[var(--pv-text-muted)]">
              {activeShift ? `${patients.length} paciente(s) no plantao atual` : 'Selecione um plantao para ver os pacientes'}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 xl:w-auto xl:flex-row xl:flex-wrap">
            <div className="relative min-w-[240px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--pv-text-muted)]" />
              <Input
                placeholder="Buscar paciente..."
                className="pl-9"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              >
                <option value="all">Todas criticidades</option>
                <option value="critical">Critico</option>
                <option value="watch">Observacao</option>
                <option value="stable">Estavel</option>
                <option value="discharge_today">Alta hoje</option>
              </select>

              <select
                className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                value={alertFilter}
                onChange={(event) => setAlertFilter(event.target.value as AlertFilter)}
              >
                <option value="all">Todos os alertas</option>
                <option value="with-alerts">Com alertas</option>
                <option value="with-import-origin">Importados</option>
              </select>

              <select
                className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value as SortMode)}
              >
                <option value="name-asc">Ordenar por nome</option>
                <option value="name-desc">Nome decrescente</option>
                <option value="next-task">Proxima pendencia</option>
                <option value="status">Criticidade</option>
              </select>

              <Button variant="outline" size="icon" aria-label="Filtros">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" onClick={() => setImportDialogOpen(true)} disabled={!activeShift}>
                Importar de outro plantao
              </Button>
              <Button variant="outline" onClick={() => setManualDialogOpen(true)} disabled={!activeShift}>
                Adicionar manualmente
              </Button>
              <Button onClick={() => navigate('/plantao-vet/importar')}>Importar prontuario</Button>
            </div>
          </div>
        </div>

        {!activeShift ? (
          <EmptyState
            icon={Search}
            eyebrow="Pacientes por plantao"
            title="Nenhum plantao ativo selecionado"
            description="A lista de pacientes sempre respeita o plantao ativo. Use o seletor da topbar para abrir um turno existente ou criar um novo plantao."
            primaryAction={{ label: 'Criar plantao', onClick: openShiftSelector }}
            secondaryAction={{ label: 'Ir ao dashboard', href: '/plantao-vet/dashboard' }}
          >
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              <Button variant="outline" className="w-full" onClick={openShiftSelector}>
                Importar pacientes de outro plantao
              </Button>
            </div>
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              <Button variant="outline" className="w-full" onClick={openShiftSelector}>
                Importar prontuario
              </Button>
            </div>
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              <Button variant="outline" className="w-full" onClick={openShiftSelector}>
                Adicionar paciente manualmente
              </Button>
            </div>
          </EmptyState>
        ) : patients.length === 0 ? (
          <EmptyState
            icon={Search}
            eyebrow="Plantao vazio"
            title="Este plantao ainda nao possui pacientes"
            description="Importe um prontuario, traga pacientes de outro plantao ou crie um caso manualmente. O fluxo operacional do turno comeca por aqui."
            primaryAction={{ label: 'Importar prontuario', href: '/plantao-vet/importar' }}
            secondaryAction={{ label: 'Importar de outro plantao', onClick: () => setImportDialogOpen(true) }}
          >
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              <Button variant="outline" className="w-full" onClick={() => setManualDialogOpen(true)}>
                Adicionar paciente manualmente
              </Button>
            </div>
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              <Button variant="outline" className="w-full" onClick={openShiftSelector}>
                Criar outro plantao
              </Button>
            </div>
            <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
              O plantao ativo esta pronto para receber pacientes reais, importados ou manuais.
            </div>
          </EmptyState>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => {
              const patientTasks = (tasksByPatientId[patient.id] || []).filter((task) => !task.completed);
              const nextTask = patientTasks[0];
              const activeProblems = patient.problems.filter((problem) => problem.status === 'active');

              return (
                <Card
                  key={patient.id}
                  className="group flex h-full cursor-pointer flex-col transition-all duration-200 hover:border-[var(--pv-primary)]/40"
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
                            <Badge variant="secondary">Importado do plantao anterior</Badge>
                          ) : null}
                        </div>
                        <p className="text-sm text-[var(--pv-text-muted)]">
                          {getSpeciesLabel(patient.species)} - {patient.weightLabel || 'Peso nao informado'} - Tutor:{' '}
                          {patient.tutorName || 'Nao informado'}
                        </p>
                      </div>
                      <ChevronRight className="mt-1 h-5 w-5 text-[var(--pv-text-muted)] group-hover:text-[var(--pv-primary)]" />
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col">
                    <div className="space-y-4">
                      <p className="text-sm text-[var(--pv-text-muted)]">
                        {patient.mainDiagnosis || 'Sem diagnostico principal registrado.'}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {patient.alertBadges.length > 0 ? (
                          patient.alertBadges.map((badge) => (
                            <Badge key={badge} variant="outline" className="bg-[var(--pv-surface-hover)] text-[10px]">
                              {badge}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="secondary">Sem alertas</Badge>
                        )}
                        {patient.medicationsInUse.length > 0 ? <Badge variant="outline">Medicacoes em uso</Badge> : null}
                      </div>

                      {nextTask ? (
                        <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] px-4 py-3">
                          <p className="mb-1 text-sm font-medium text-[var(--pv-text-main)]">Proxima pendencia</p>
                          <p className="text-sm text-[var(--pv-text-muted)]">
                            {(nextTask.scheduledTime || 'Sem horario') + ' - ' + nextTask.title}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[var(--pv-border)] pt-4 text-sm text-[var(--pv-text-muted)]">
                      <span>{activeProblems.length} problema(s)</span>
                      <span>{patientTasks.length} pendencia(s)</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <ImportFromShiftDialog open={importDialogOpen} onClose={() => setImportDialogOpen(false)} />
      <ManualPatientDialog open={manualDialogOpen} onClose={() => setManualDialogOpen(false)} />
    </>
  );
}
