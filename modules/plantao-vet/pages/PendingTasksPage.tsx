import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCheck,
  CheckSquare2,
  Clock3,
  Filter,
  Search,
  UserRound,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { EmptyState } from '../components/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import {
  compareScheduledTimes,
  getTaskCategoryLabel,
  getTaskPriorityLabel,
} from '../lib/presentation';
import { getActiveShift, getActiveShiftPatients, getActiveShiftTasks, usePlantaoVetSnapshot } from '../store/selectors';
import { usePlantaoVetStore } from '../store/usePlantaoVetStore';
import { Task, TaskCategory, TaskPriority } from '../types';

type GroupByMode = 'time' | 'patient' | 'priority';
type StatusFilter = 'all' | 'open' | 'completed';

const CATEGORY_OPTIONS: Array<{ value: 'all' | TaskCategory; label: string }> = [
  { value: 'all', label: 'Todas categorias' },
  { value: 'exam', label: 'Exame' },
  { value: 'procedure', label: 'Procedimento' },
  { value: 'feeding', label: 'Alimentacao' },
  { value: 'medication', label: 'Medicacao' },
  { value: 'monitoring', label: 'Monitoramento' },
  { value: 'tutor', label: 'Tutor' },
  { value: 'discharge', label: 'Alta' },
  { value: 'documents', label: 'Documentos' },
  { value: 'other', label: 'Outros' },
];

function openShiftSelector() {
  window.dispatchEvent(new Event('plantao-vet:open-shift-selector'));
}

function getPriorityClasses(priority: TaskPriority) {
  switch (priority) {
    case 'high':
      return 'border-[var(--pv-accent-red)]/20 bg-[var(--pv-accent-red)]/10 text-[var(--pv-accent-red)]';
    case 'medium':
      return 'border-[var(--pv-accent-yellow)]/20 bg-[var(--pv-accent-yellow)]/10 text-[var(--pv-accent-yellow-strong)]';
    case 'low':
    default:
      return 'border-[var(--pv-accent-green)]/20 bg-[var(--pv-accent-green)]/10 text-[var(--pv-accent-green-strong)]';
  }
}

function sortTasks(tasks: Task[]) {
  return [...tasks].sort((left, right) => {
    const byTime = compareScheduledTimes(left.scheduledTime, right.scheduledTime);

    if (byTime !== 0) {
      return byTime;
    }

    return left.title.localeCompare(right.title);
  });
}

export function PendingTasksPage() {
  const navigate = useNavigate();
  const snapshot = usePlantaoVetSnapshot();
  const toggleTaskCompleted = usePlantaoVetStore((state) => state.toggleTaskCompleted);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupBy, setGroupBy] = useState<GroupByMode>('time');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('open');
  const [priorityFilter, setPriorityFilter] = useState<'all' | TaskPriority>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | TaskCategory>('all');
  const [patientFilter, setPatientFilter] = useState<'all' | string>('all');

  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);
  const tasks = useMemo(() => getActiveShiftTasks(snapshot), [snapshot]);
  const patients = useMemo(() => getActiveShiftPatients(snapshot), [snapshot]);

  const patientsById = useMemo(() => {
    return patients.reduce<Record<string, typeof patients[number]>>((acc, patient) => {
      acc[patient.id] = patient;
      return acc;
    }, {});
  }, [patients]);

  const filteredTasks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return sortTasks(
      tasks.filter((task) => {
        const patient = task.shiftPatientId ? patientsById[task.shiftPatientId] : null;
        const haystack = [
          task.title,
          task.description,
          patient?.displayName || '',
          patient?.mainDiagnosis || '',
        ]
          .join(' ')
          .toLowerCase();

        if (query && !haystack.includes(query)) {
          return false;
        }

        if (statusFilter === 'open' && task.completed) {
          return false;
        }

        if (statusFilter === 'completed' && !task.completed) {
          return false;
        }

        if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
          return false;
        }

        if (categoryFilter !== 'all' && task.category !== categoryFilter) {
          return false;
        }

        if (patientFilter !== 'all' && task.shiftPatientId !== patientFilter) {
          return false;
        }

        return true;
      })
    );
  }, [categoryFilter, patientFilter, patientsById, priorityFilter, searchTerm, statusFilter, tasks]);

  const groupedTasks = useMemo(() => {
    const groups = new Map<string, Task[]>();
    const priorityOrder: Record<string, number> = {
      'Alta prioridade': 0,
      'Media prioridade': 1,
      'Baixa prioridade': 2,
    };

    filteredTasks.forEach((task) => {
      const patient = task.shiftPatientId ? patientsById[task.shiftPatientId] : null;
      const label =
        groupBy === 'patient'
          ? patient?.displayName || 'Pendencias gerais do plantao'
          : groupBy === 'priority'
            ? getTaskPriorityLabel(task.priority)
            : task.scheduledTime || 'Sem horario definido';

      const current = groups.get(label) || [];
      current.push(task);
      groups.set(label, current);
    });

    return Array.from(groups.entries()).sort((left, right) => {
      if (groupBy === 'time') {
        return compareScheduledTimes(
          left[0] === 'Sem horario definido' ? null : left[0],
          right[0] === 'Sem horario definido' ? null : right[0]
        );
      }

      if (groupBy === 'priority') {
        return (priorityOrder[left[0]] ?? 99) - (priorityOrder[right[0]] ?? 99);
      }

      return left[0].localeCompare(right[0]);
    });
  }, [filteredTasks, groupBy, patientsById]);

  const summary = useMemo(() => {
    const openTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);
    const upcomingCritical = sortTasks(openTasks.filter((task) => task.priority === 'high')).slice(0, 3);

    return {
      openCount: openTasks.length,
      completedCount: completedTasks.length,
      upcomingCritical,
    };
  }, [tasks]);

  if (!snapshot.isHydrated) {
    return <div className="px-2 py-6 text-sm text-[var(--pv-text-muted)]">Carregando modulo...</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--pv-text-main)]">Pendencias</h1>
          <p className="mt-1 text-[var(--pv-text-muted)]">
            {activeShift
              ? `${summary.openCount} abertas • ${summary.completedCount} concluidas no plantao ativo`
              : 'Selecione um plantao para centralizar as tarefas do turno'}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 xl:w-auto xl:flex-row xl:flex-wrap">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--pv-text-muted)]" />
            <Input
              placeholder="Buscar por tarefa, paciente ou observacao..."
              className="pl-9"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
              value={groupBy}
              onChange={(event) => setGroupBy(event.target.value as GroupByMode)}
            >
              <option value="time">Agrupar por horario</option>
              <option value="patient">Agrupar por paciente</option>
              <option value="priority">Agrupar por prioridade</option>
            </select>

            <select
              className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            >
              <option value="all">Todos os status</option>
              <option value="open">Abertas</option>
              <option value="completed">Concluidas</option>
            </select>

            <select
              className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value as 'all' | TaskPriority)}
            >
              <option value="all">Todas prioridades</option>
              <option value="high">Alta prioridade</option>
              <option value="medium">Media prioridade</option>
              <option value="low">Baixa prioridade</option>
            </select>

            <select
              className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value as 'all' | TaskCategory)}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              className="h-10 rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)] px-3 text-sm text-[var(--pv-text-main)]"
              value={patientFilter}
              onChange={(event) => setPatientFilter(event.target.value)}
            >
              <option value="all">Todos os pacientes</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.displayName}
                </option>
              ))}
            </select>

            <Button variant="outline" size="icon" aria-label="Filtros ativos">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {!activeShift ? (
        <EmptyState
          icon={CheckSquare2}
          eyebrow="Pendencias gerais"
          title="Nenhum plantao ativo selecionado"
          description="As pendencias sao sempre consolidadas a partir do plantao ativo. Abra um turno na topbar para acompanhar tarefas, pacientes e boletins no mesmo contexto."
          primaryAction={{ label: 'Criar plantao', onClick: openShiftSelector }}
          secondaryAction={{ label: 'Ir ao dashboard', href: '/plantao-vet/dashboard' }}
        >
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            A tela de pendencias usa a mesma store de pacientes, boletins e passagem do turno.
          </div>
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            Ao selecionar um plantao, as tarefas ficam prontas para agrupamento, conclusao e reabertura.
          </div>
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            O dashboard e o detalhe do paciente refletem a mesma fila operacional em tempo real.
          </div>
        </EmptyState>
      ) : tasks.length === 0 ? (
        <EmptyState
          icon={Clock3}
          eyebrow="Sem pendencias"
          title="Nenhuma tarefa registrada neste plantao"
          description="Crie tarefas a partir da ficha do paciente para montar a fila operacional do turno. Exames, medicacoes, monitoramentos e orientacoes passam a aparecer aqui automaticamente."
          primaryAction={{ label: 'Abrir pacientes', href: '/plantao-vet/pacientes' }}
          secondaryAction={{ label: 'Importar prontuario', href: '/plantao-vet/importar' }}
        >
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            Assim que uma tarefa for criada no detalhe do paciente, ela entra nesta lista geral.
          </div>
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            O status de conclusao e reabertura permanece persistido no plantao ativo.
          </div>
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            O mesmo conjunto de tarefas alimenta o dashboard e a passagem de plantao.
          </div>
        </EmptyState>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-xl bg-[var(--pv-surface-hover)] p-3 text-[var(--pv-accent-yellow-strong)]">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-[var(--pv-text-muted)]">Pendencias abertas</p>
                  <p className="text-2xl font-bold text-[var(--pv-text-main)]">{summary.openCount}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-xl bg-[var(--pv-surface-hover)] p-3 text-[var(--pv-accent-green-strong)]">
                  <CheckCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-[var(--pv-text-muted)]">Concluidas</p>
                  <p className="text-2xl font-bold text-[var(--pv-text-main)]">{summary.completedCount}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-xl bg-[var(--pv-surface-hover)] p-3 text-[var(--pv-accent-red)]">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--pv-text-muted)]">Proximas criticas</p>
                    <p className="text-sm font-medium text-[var(--pv-text-main)]">
                      {summary.upcomingCritical.length > 0 ? 'Alta prioridade no radar' : 'Sem criticas abertas'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {summary.upcomingCritical.length > 0 ? (
                    summary.upcomingCritical.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] px-3 py-2 text-sm"
                      >
                        <p className="font-medium text-[var(--pv-text-main)]">{task.title}</p>
                        <p className="text-[var(--pv-text-muted)]">
                          {(task.scheduledTime || 'Sem horario') +
                            ' • ' +
                            (task.shiftPatientId ? patientsById[task.shiftPatientId]?.displayName || 'Paciente' : 'Plantao')}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[var(--pv-text-muted)]">Nenhuma tarefa critica em aberto.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {groupedTasks.length > 0 ? (
              groupedTasks.map(([groupLabel, groupTasks]) => (
                <section key={groupLabel} className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-[var(--pv-text-main)]">{groupLabel}</h2>
                    <Badge variant="outline" className="bg-[var(--pv-surface-hover)]">
                      {groupTasks.length} tarefa(s)
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {groupTasks.map((task) => {
                      const patient = task.shiftPatientId ? patientsById[task.shiftPatientId] : null;

                      return (
                        <Card key={task.id} className={task.completed ? 'opacity-75' : ''}>
                          <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                              <button
                                type="button"
                                onClick={() => toggleTaskCompleted(task.id)}
                                className={[
                                  'mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-colors',
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
                                  <span
                                    className={[
                                      'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase',
                                      getPriorityClasses(task.priority),
                                    ].join(' ')}
                                  >
                                    {getTaskPriorityLabel(task.priority)}
                                  </span>
                                  {task.completed ? <Badge variant="secondary">Concluida</Badge> : null}
                                </div>

                                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[var(--pv-text-muted)]">
                                  <span className="inline-flex items-center gap-1">
                                    <Clock3 className="h-4 w-4" />
                                    {task.scheduledTime || 'Sem horario'}
                                  </span>
                                  <button
                                    type="button"
                                    className="inline-flex items-center gap-1 font-medium text-[var(--pv-primary)] hover:underline"
                                    onClick={() =>
                                      patient
                                        ? navigate(`/plantao-vet/paciente/${patient.id}`)
                                        : navigate('/plantao-vet/pacientes')
                                    }
                                  >
                                    <UserRound className="h-4 w-4" />
                                    {patient?.displayName || 'Pendencia geral do plantao'}
                                  </button>
                                </div>

                                {task.description ? (
                                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--pv-text-muted)]">
                                    {task.description}
                                  </p>
                                ) : null}
                              </div>
                            </div>

                            <div className="flex items-center justify-end gap-2">
                              {patient ? (
                                <Button variant="outline" size="sm" onClick={() => navigate(`/plantao-vet/paciente/${patient.id}`)}>
                                  Abrir paciente
                                </Button>
                              ) : null}
                              <Button variant={task.completed ? 'secondary' : 'default'} size="sm" onClick={() => toggleTaskCompleted(task.id)}>
                                {task.completed ? 'Reabrir' : 'Concluir'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </section>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--pv-border)] bg-[var(--pv-surface)] px-6 py-10 text-center">
                <p className="font-medium text-[var(--pv-text-main)]">Nenhuma tarefa encontrada com os filtros atuais</p>
                <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                  Ajuste busca, status, prioridade, categoria ou paciente para voltar a enxergar a fila operacional.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
