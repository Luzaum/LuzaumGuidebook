import React, { useEffect, useMemo, useState } from 'react';
import { Activity, CheckCircle2, Copy, FileText, MessageSquare, RefreshCw } from 'lucide-react';

import { EmptyState } from '../components/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Textarea } from '../components/ui/Textarea';
import { buildPatientHandoverText, buildShiftHandoverText } from '../lib/clinicalText';
import {
  getActiveMedicationEntries,
  getLatestVitalsRecord,
  getNutritionSummary,
  getRecentExamRecords,
  getTubeTypeLabel,
} from '../lib/patientClinical';
import { getPatientStatusLabel, getPatientStatusVariant } from '../lib/presentation';
import {
  getActiveShift,
  getActiveShiftPatients,
  getActiveShiftTasks,
  usePlantaoVetSnapshot,
} from '../store/selectors';

export function ShiftHandoverPage() {
  const snapshot = usePlantaoVetSnapshot();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);
  const patients = useMemo(() => getActiveShiftPatients(snapshot), [snapshot]);
  const tasks = useMemo(() => getActiveShiftTasks(snapshot), [snapshot]);
  const generatedDrafts = useMemo(() => {
    return patients.reduce<Record<string, string>>((acc, patient) => {
      acc[patient.id] = buildPatientHandoverText(patient, tasks);
      return acc;
    }, {});
  }, [patients, tasks]);
  const [patientDrafts, setPatientDrafts] = useState<Record<string, string>>({});
  const [handoverText, setHandoverText] = useState('');

  useEffect(() => {
    setPatientDrafts((current) => {
      const nextDrafts: Record<string, string> = {};

      patients.forEach((patient) => {
        nextDrafts[patient.id] = current[patient.id] || generatedDrafts[patient.id];
      });

      return nextDrafts;
    });
  }, [generatedDrafts, patients]);

  useEffect(() => {
    const nextText =
      patients.map((patient) => patientDrafts[patient.id] || generatedDrafts[patient.id] || '').join('\n\n') ||
      buildShiftHandoverText(patients, tasks);

    setHandoverText(nextText);
  }, [generatedDrafts, patientDrafts, patients, tasks]);

  async function handleCopy(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1800);
  }

  function handleResetPatientDraft(patientId: string) {
    setPatientDrafts((current) => ({
      ...current,
      [patientId]: generatedDrafts[patientId] || current[patientId] || '',
    }));
  }

  if (!snapshot.isHydrated) {
    return <div className="px-2 py-6 text-sm text-[var(--pv-text-muted)]">Carregando modulo...</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--pv-text-main)]">Passagem de Plantao</h1>
          <p className="mt-1 text-[var(--pv-text-muted)]">
            {activeShift
              ? `Resumo consolidado dos ${patients.length} paciente(s) do plantao ativo`
              : 'Selecione um plantao para consolidar a passagem'}
          </p>
        </div>

        <Button onClick={() => handleCopy(handoverText, 'all')}>
          {copiedKey === 'all' ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {copiedKey === 'all' ? 'Copiado!' : 'Copiar passagem completa'}
        </Button>
      </div>

      {!activeShift ? (
        <EmptyState
          icon={FileText}
          eyebrow="Passagem estruturada"
          title="Nenhum plantao ativo selecionado"
          description="A passagem do plantao sempre nasce do turno ativo. Selecione um plantao na topbar para consolidar pacientes, problemas, pendencias e boletins do mesmo contexto."
          primaryAction={{ label: 'Ir ao dashboard', href: '/plantao-vet/dashboard' }}
          secondaryAction={{ label: 'Abrir pacientes', href: '/plantao-vet/pacientes' }}
        >
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            O texto da passagem continua alinhado ao plantao ativo e a clinica selecionada.
          </div>
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            Problemas ativos, observacoes importantes e pendencias abertas sao consolidados automaticamente.
          </div>
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            Cada paciente gera um texto proprio, e o plantao inteiro pode ser copiado em um clique.
          </div>
        </EmptyState>
      ) : patients.length === 0 ? (
        <EmptyState
          icon={Activity}
          eyebrow="Sem casos ativos"
          title="Nao existem pacientes para consolidar neste plantao"
          description="Assim que o plantao tiver pacientes vinculados, esta tela monta cards por caso e um preview editavel da passagem para o proximo turno."
          primaryAction={{ label: 'Abrir pacientes', href: '/plantao-vet/pacientes' }}
          secondaryAction={{ label: 'Importar prontuario', href: '/plantao-vet/importar' }}
        >
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            A tela ja esta ligada aos dados reais do plantao ativo.
          </div>
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            O preview considera resumo, frase definidora, alertas, problemas, tarefas e plano do proximo turno.
          </div>
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            O layout segue a estrutura de cards e preview do prototipo original.
          </div>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
          <div className="space-y-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--pv-text-main)]">
              <Activity className="h-5 w-5 text-[var(--pv-primary)]" />
              Pacientes
            </h2>

            {patients.map((patient) => {
              const openTasks = tasks.filter((task) => task.shiftPatientId === patient.id && !task.completed);
              const activeProblems = patient.problems.filter((problem) => problem.status === 'active');
              const currentDraft = patientDrafts[patient.id] || generatedDrafts[patient.id] || '';
              const latestVitals = getLatestVitalsRecord(patient);
              const recentExams = getRecentExamRecords(patient, 2);
              const activeMedications = getActiveMedicationEntries(patient);
              const nutritionSummary = getNutritionSummary(patient);

              return (
                <Card key={patient.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {patient.displayName}
                          <Badge variant={getPatientStatusVariant(patient.status)}>
                            {getPatientStatusLabel(patient.status)}
                          </Badge>
                          {patient.importedFromShiftId ? (
                            <Badge variant="secondary">Importado do plantao anterior</Badge>
                          ) : null}
                        </CardTitle>
                        <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                          {patient.mainDiagnosis || 'Sem diagnostico principal registrado.'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleResetPatientDraft(patient.id)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerar
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleCopy(currentDraft, patient.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          {copiedKey === patient.id ? 'Copiado!' : 'Copiar'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-3 text-sm">
                        <p className="mb-1 font-medium text-[var(--pv-text-main)]">Frase definidora</p>
                        <p className="text-[var(--pv-text-muted)]">
                          {patient.definingPhrase || 'Sem frase definidora registrada.'}
                        </p>
                      </div>

                      <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-3 text-sm">
                        <p className="mb-1 font-medium text-[var(--pv-text-main)]">Alertas</p>
                        <p className="text-[var(--pv-text-muted)]">
                          {patient.alertBadges.length > 0 ? patient.alertBadges.join(', ') : 'Sem alertas registrados.'}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-3">
                        <p className="mb-2 text-sm font-medium text-[var(--pv-text-main)]">Problemas ativos</p>
                        {activeProblems.length > 0 ? (
                          <ul className="space-y-2 text-sm text-[var(--pv-text-muted)]">
                            {activeProblems.map((problem) => (
                              <li key={problem.id}>{problem.title}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-[var(--pv-text-muted)]">Nenhum problema ativo.</p>
                        )}
                      </div>

                      <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-3">
                        <p className="mb-2 text-sm font-medium text-[var(--pv-text-main)]">Pendencias abertas</p>
                        {openTasks.length > 0 ? (
                          <ul className="space-y-2 text-sm text-[var(--pv-text-muted)]">
                            {openTasks.map((task) => (
                              <li key={task.id}>
                                {(task.scheduledTime || '--') + ' • ' + task.title}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-[var(--pv-text-muted)]">Nenhuma pendencia aberta.</p>
                        )}
                        </div>
                      </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-3">
                        <p className="mb-2 text-sm font-medium text-[var(--pv-text-main)]">Parametros recentes</p>
                        {latestVitals ? (
                          <div className="space-y-1 text-sm text-[var(--pv-text-muted)]">
                            <p>{`FC ${latestVitals.heartRate || '--'} • FR ${latestVitals.respiratoryRate || '--'} • TR ${latestVitals.temperature || '--'}`}</p>
                            <p>{`PAS ${latestVitals.systolicPressure || '--'} • Glicemia ${latestVitals.glucose || '--'}`}</p>
                            <p>{`Mucosas ${latestVitals.mucousMembranes || '--'} • TPC ${latestVitals.capillaryRefillTime || '--'}`}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-[var(--pv-text-muted)]">Sem parametros recentes.</p>
                        )}
                      </div>
                      <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-3">
                        <p className="mb-2 text-sm font-medium text-[var(--pv-text-main)]">Exames recentes</p>
                        {recentExams.length > 0 ? (
                          <ul className="space-y-2 text-sm text-[var(--pv-text-muted)]">
                            {recentExams.map((exam) => (
                              <li key={exam.id}>{`${exam.title || 'Exame'} • ${exam.summary || 'Sem resumo'}`}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-[var(--pv-text-muted)]">Sem exames recentes.</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/35 p-3">
                        <p className="mb-1 text-sm font-medium text-[var(--pv-text-main)]">Nutricao / suporte</p>
                        <p className="text-sm text-[var(--pv-text-muted)]">
                          {nutritionSummary || 'Sem resumo nutricional estruturado.'}
                          {patient.nutritionSupport.tubeInUse ? ` • ${getTubeTypeLabel(patient.nutritionSupport.tubeType)}` : ''}
                        </p>
                      </div>
                      <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/35 p-3">
                        <p className="mb-1 text-sm font-medium text-[var(--pv-text-main)]">Medicacoes em uso</p>
                        <p className="text-sm text-[var(--pv-text-muted)]">
                          {activeMedications.length > 0 ? activeMedications.map((medication) => medication.name).join(', ') : 'Nenhuma medicação ativa.'}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/35 p-3">
                        <p className="mb-1 text-sm font-medium text-[var(--pv-text-main)]">Observacoes importantes</p>
                        <p className="text-sm text-[var(--pv-text-muted)]">
                          {patient.importantNotes || 'Sem observacoes importantes registradas.'}
                        </p>
                      </div>
                      <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)]/35 p-3">
                        <p className="mb-1 text-sm font-medium text-[var(--pv-text-main)]">Plano do proximo turno</p>
                        <p className="text-sm text-[var(--pv-text-muted)]">
                          {patient.nextShiftPlan || 'Sem plano registrado para o proximo turno.'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-[var(--pv-text-main)]">
                        <MessageSquare className="h-4 w-4 text-[var(--pv-primary)]" />
                        Preview editavel
                      </div>
                      <Textarea
                        value={currentDraft}
                        onChange={(event) =>
                          setPatientDrafts((current) => ({
                            ...current,
                            [patient.id]: event.target.value,
                          }))
                        }
                        className="min-h-[240px] resize-y font-mono text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--pv-text-muted)]">
              <FileText className="h-5 w-5" />
              Preview geral do plantao
            </h2>

            <Card className="sticky top-24">
              <CardContent className="space-y-4 p-6">
                <Textarea
                  value={handoverText}
                  onChange={(event) => setHandoverText(event.target.value)}
                  className="min-h-[620px] resize-none font-mono text-sm"
                />
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setHandoverText(buildShiftHandoverText(patients, tasks))}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerar tudo
                  </Button>
                  <Button onClick={() => handleCopy(handoverText, 'all-bottom')}>
                    <Copy className="mr-2 h-4 w-4" />
                    {copiedKey === 'all-bottom' ? 'Copiado!' : 'Copiar texto'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
