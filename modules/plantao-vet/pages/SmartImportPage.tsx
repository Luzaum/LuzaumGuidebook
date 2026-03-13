import React, { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, FileText, Link2, Sparkles, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { EmptyState } from '../components/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Textarea } from '../components/ui/Textarea';
import { createEntityId } from '../lib/createId';
import { findLikelyShiftPatientMatches } from '../lib/patientMatching';
import { getSpeciesLabel } from '../lib/presentation';
import { parseSmartImportText, SmartImportDraft } from '../lib/smartImport';
import { getActiveShift, getActiveShiftPatients, usePlantaoVetSnapshot } from '../store/selectors';
import { usePlantaoVetStore } from '../store/usePlantaoVetStore';

export function SmartImportPage() {
  const navigate = useNavigate();
  const snapshot = usePlantaoVetSnapshot();
  const upsertPatientMaster = usePlantaoVetStore((state) => state.upsertPatientMaster);
  const upsertShiftPatient = usePlantaoVetStore((state) => state.upsertShiftPatient);

  const activeShift = useMemo(() => getActiveShift(snapshot), [snapshot]);
  const activePatients = useMemo(() => getActiveShiftPatients(snapshot), [snapshot]);

  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [draft, setDraft] = useState<SmartImportDraft | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<'new' | string>('new');

  const possibleMatches = useMemo(() => {
    if (!draft) {
      return [];
    }

    return findLikelyShiftPatientMatches(activePatients, draft.name);
  }, [activePatients, draft]);

  function handleUseExample() {
    setRawText(`Paciente: Bidu, Canino, Poodle, 10 anos, 8kg. Tutor: Joao Silva.
Motivo da consulta: Tosse seca ha 2 semanas, piora a noite, cansaco facil.
Historico: Nega vomitos ou diarreia. Apetite preservado.
Exame fisico: Mucosas normocoradas, TPC 2s, FC 140bpm, FR 40mpm. Ausculta cardiaca com sopro sistolico.
Suspeita: Insuficiencia cardiaca congestiva secundaria a doenca valvar mitral.
Conduta: Solicito ecocardiograma e radiografia de torax.
Prescricao inicial: Furosemida 2mg/kg BID, Pimobendan 0.25mg/kg BID.
Observacoes: Manter em repouso, monitorar frequencia respiratoria, exame pendente e jejum de 8h.`);
    setDraft(null);
    setSelectedPatientId('new');
  }

  function handleClear() {
    setRawText('');
    setDraft(null);
    setSelectedPatientId('new');
  }

  function handleOrganize() {
    if (!rawText.trim()) {
      return;
    }

    setIsProcessing(true);

    window.setTimeout(() => {
      const nextDraft = parseSmartImportText(rawText);
      setDraft(nextDraft);
      setSelectedPatientId('new');
      setIsProcessing(false);
    }, 700);
  }

  function handleConfirmImport() {
    if (!activeShift || !draft) {
      return;
    }

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
        id: shiftPatientId,
        shiftId: activeShift.id,
        patientMasterId,
        displayName: draft.name,
        species: draft.species,
        breed: draft.breed,
        ageLabel: draft.ageLabel,
        weightLabel: draft.weightLabel,
        tutorName: draft.tutorName,
        mainDiagnosis: draft.mainDiagnosis,
        status: 'watch',
        summary: draft.summary,
        definingPhrase: draft.definingPhrase,
        importantNotes: '',
        nextShiftPlan: '',
        alertBadges: draft.alertBadges,
        medicationsInUse: draft.medicationsInUse,
        problems: [],
        importedFromShiftId: null,
        importedFromDate: null,
        importedFromShiftType: null,
        sourceRecordText: rawText,
        lastBulletinAt: null,
      });

      navigate(`/plantao-vet/paciente/${shiftPatientId}`);
      return;
    }

    const existingPatient = activePatients.find((patient) => patient.id === selectedPatientId);

    if (!existingPatient) {
      return;
    }

    upsertPatientMaster({
      id: existingPatient.patientMasterId,
      clinicId: snapshot.scopeClinicId,
      name: existingPatient.displayName || draft.name,
      species: draft.species || existingPatient.species,
      breed: existingPatient.breed || draft.breed,
      sex: 'unknown',
      ageLabel: existingPatient.ageLabel || draft.ageLabel,
      weightLabel: existingPatient.weightLabel || draft.weightLabel,
      tutorName: existingPatient.tutorName || draft.tutorName,
    });

    upsertShiftPatient({
      id: existingPatient.id,
      shiftId: existingPatient.shiftId,
      patientMasterId: existingPatient.patientMasterId,
      displayName: existingPatient.displayName,
      species: existingPatient.species,
      breed: existingPatient.breed || draft.breed,
      ageLabel: existingPatient.ageLabel || draft.ageLabel,
      weightLabel: existingPatient.weightLabel || draft.weightLabel,
      tutorName: existingPatient.tutorName || draft.tutorName,
      mainDiagnosis: existingPatient.mainDiagnosis || draft.mainDiagnosis,
      status: existingPatient.status,
      summary: existingPatient.summary || draft.summary,
      definingPhrase: existingPatient.definingPhrase || draft.definingPhrase,
      importantNotes: existingPatient.importantNotes,
      nextShiftPlan: existingPatient.nextShiftPlan,
      alertBadges: Array.from(new Set([...existingPatient.alertBadges, ...draft.alertBadges])),
      medicationsInUse: Array.from(new Set([...(existingPatient.medicationsInUse || []), ...draft.medicationsInUse])),
      problems: existingPatient.problems,
      importedFromShiftId: existingPatient.importedFromShiftId,
      importedFromDate: existingPatient.importedFromDate,
      importedFromShiftType: existingPatient.importedFromShiftType,
      sourceRecordText: existingPatient.sourceRecordText || rawText,
      lastBulletinAt: existingPatient.lastBulletinAt,
    });

    navigate(`/plantao-vet/paciente/${existingPatient.id}`);
  }

  if (!snapshot.isHydrated) {
    return <div className="px-2 py-6 text-sm text-[var(--pv-text-muted)]">Carregando modulo...</div>;
  }

  if (!activeShift) {
    return (
      <div className="space-y-8 pb-12">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-[var(--pv-text-main)]">
            <Sparkles className="h-8 w-8 text-[var(--pv-primary)]" />
            Prontuario Inteligente
          </h1>
          <p className="mt-2 text-lg text-[var(--pv-text-muted)]">
            Cole o texto bruto da ficha do paciente para organizar as informacoes dentro do plantao ativo.
          </p>
        </div>

        <EmptyState
          icon={FileText}
          eyebrow="Importacao com contexto"
          title="Nenhum plantao ativo para receber um prontuario"
          description="A importacao sempre grava dentro do plantao ativo selecionado. Abra ou crie um plantao na topbar para receber o paciente no turno correto."
          primaryAction={{ label: 'Voltar ao dashboard', href: '/plantao-vet/dashboard' }}
        >
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            O modulo continua usando a store nova, sem reintroduzir a store antiga do prototipo.
          </div>
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            A persistencia segue isolada por clinica e por plantao.
          </div>
          <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-bg)] p-4">
            Assim que houver um plantao ativo, esta tela volta ao layout completo do ZIP.
          </div>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-[var(--pv-text-main)]">
          <Sparkles className="h-8 w-8 text-[var(--pv-primary)]" />
          Prontuario Inteligente
        </h1>
        <p className="mt-2 text-lg text-[var(--pv-text-muted)]">
          Cole o texto bruto da ficha do paciente. O sistema extrai um preview, sugere vinculo quando houver nome semelhante e cria o caso dentro do plantao ativo.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <Card className="relative overflow-hidden border-[var(--pv-border)] shadow-lg">
          <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-[var(--pv-primary)]/8 blur-3xl" />

          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[var(--pv-primary)]" />
              Texto Bruto do Prontuario
            </CardTitle>
            <CardDescription>
              Cole historico, evolucao, exames e prescricoes. Nesta fase, o importador extrai campos essenciais, mostra preview e permite confirmar criacao ou vinculo.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            <div className="relative">
              <Textarea
                value={rawText}
                onChange={(event) => setRawText(event.target.value)}
                placeholder="Cole aqui o texto do prontuario..."
                className="min-h-[320px] resize-y bg-[var(--pv-surface-hover)]/60 font-mono text-base"
                disabled={isProcessing}
              />

              {isProcessing ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-[var(--pv-border)] bg-[var(--pv-surface)]/90 backdrop-blur-sm">
                  <div className="relative mb-4 h-16 w-16">
                    <div className="absolute inset-0 rounded-full border-4 border-[var(--pv-primary)]/20" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-[var(--pv-primary)] border-t-transparent" />
                    <Wand2 className="absolute inset-0 m-auto h-6 w-6 text-[var(--pv-primary)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--pv-text-main)]">Organizando prontuario...</h3>
                  <p className="mt-2 text-sm text-[var(--pv-text-muted)]">
                    Extraindo identificacao, resumo, alertas e medicacoes.
                  </p>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex w-full gap-3 sm:w-auto">
                <Button variant="outline" onClick={handleClear} disabled={isProcessing || !rawText}>
                  Limpar
                </Button>
                <Button variant="secondary" onClick={handleUseExample} disabled={isProcessing || rawText.length > 0}>
                  Usar Exemplo
                </Button>
              </div>

              <Button
                size="lg"
                onClick={handleOrganize}
                disabled={isProcessing || !rawText.trim()}
                className="w-full sm:w-auto"
              >
                {isProcessing ? 'Organizando...' : 'Organizar Prontuario'}
                {!isProcessing ? <ArrowRight className="ml-2 h-5 w-5" /> : null}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit border-[var(--pv-border)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Link2 className="h-5 w-5 text-[var(--pv-primary)]" />
              Preview da Extracao
            </CardTitle>
            <CardDescription>
              Revise os campos antes de criar um novo paciente ou vincular ao caso ja existente no plantao.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {draft ? (
              <>
                <div className="space-y-3 rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pv-text-muted)]">Nome</p>
                    <p className="text-base font-medium text-[var(--pv-text-main)]">{draft.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm text-[var(--pv-text-muted)]">
                    <div>
                      <p className="font-medium">Especie</p>
                      <p>{getSpeciesLabel(draft.species)}</p>
                    </div>
                    <div>
                      <p className="font-medium">Peso</p>
                      <p>{draft.weightLabel || 'Nao informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Tutor</p>
                      <p>{draft.tutorName || 'Nao informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Diagnostico</p>
                      <p>{draft.mainDiagnosis || 'Nao informado'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pv-text-muted)]">Resumo</p>
                    <p className="mt-1 text-sm text-[var(--pv-text-main)]">{draft.summary || 'Sem resumo extraido.'}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {draft.alertBadges.length > 0 ? draft.alertBadges.map((badge) => <Badge key={badge} variant="outline">{badge}</Badge>) : <Badge variant="secondary">Sem alertas extraidos</Badge>}
                    {draft.medicationsInUse.length > 0 ? draft.medicationsInUse.map((medication) => <Badge key={medication} variant="outline">{medication}</Badge>) : null}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-[var(--pv-text-main)]">Destino da importacao</p>
                  <label className="flex items-start gap-3 rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-4">
                    <input
                      type="radio"
                      name="smart-import-target"
                      checked={selectedPatientId === 'new'}
                      onChange={() => setSelectedPatientId('new')}
                    />
                    <div>
                      <p className="font-medium text-[var(--pv-text-main)]">Criar novo paciente neste plantao</p>
                      <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                        Cria um novo ShiftPatient usando os campos extraidos do prontuario.
                      </p>
                    </div>
                  </label>

                  {possibleMatches.length > 0 ? (
                    possibleMatches.map((match) => (
                      <label key={match.patient.id} className="flex items-start gap-3 rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface)] p-4">
                        <input
                          type="radio"
                          name="smart-import-target"
                          checked={selectedPatientId === match.patient.id}
                          onChange={() => setSelectedPatientId(match.patient.id)}
                        />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-[var(--pv-text-main)]">{match.patient.displayName}</p>
                            <Badge variant="secondary">Compatibilidade {Math.round(match.score * 100)}%</Badge>
                          </div>
                          <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                            {match.patient.mainDiagnosis || 'Sem diagnostico principal registrado.'}
                          </p>
                        </div>
                      </label>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-[var(--pv-border)] bg-[var(--pv-surface)] p-4 text-sm text-[var(--pv-text-muted)]">
                      Nenhum paciente semelhante encontrado no plantao ativo.
                    </div>
                  )}
                </div>

                <Button className="w-full" onClick={handleConfirmImport}>
                  {selectedPatientId === 'new' ? 'Confirmar criacao do paciente' : 'Vincular ao paciente existente'}
                </Button>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-[var(--pv-border)] bg-[var(--pv-surface)] p-6 text-center">
                <Wand2 className="mx-auto mb-3 h-8 w-8 text-[var(--pv-text-muted)]/50" />
                <p className="font-medium text-[var(--pv-text-main)]">Nenhum preview gerado ainda</p>
                <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
                  Use "Organizar Prontuario" para extrair os campos essenciais antes de confirmar.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-4">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--pv-primary)]/10 text-[var(--pv-primary)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <h4 className="font-medium text-[var(--pv-text-main)]">Preview antes de gravar</h4>
          <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
            O fluxo agora extrai os campos essenciais e deixa a confirmacao explicita.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-4">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--pv-accent-yellow)]/12 text-[var(--pv-accent-yellow-strong)]">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h4 className="font-medium text-[var(--pv-text-main)]">Sugestao de merge</h4>
          <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
            Se houver nome semelhante no plantao ativo, o modulo sugere vincular ao paciente existente.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--pv-border)] bg-[var(--pv-surface-hover)] p-4">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--pv-accent-green)]/12 text-[var(--pv-accent-green-strong)]">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <h4 className="font-medium text-[var(--pv-text-main)]">Plantao real</h4>
          <p className="mt-1 text-sm text-[var(--pv-text-muted)]">
            O prontuario agora entra como paciente real no plantao ativo, com possibilidade de criacao ou vinculo.
          </p>
        </div>
      </div>
    </div>
  );
}
