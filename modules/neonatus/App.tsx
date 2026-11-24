import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Baby,
  Calculator,
  Cat,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Dog,
  Droplets,
  ExternalLink,
  Flame,
  HeartPulse,
  Maximize2,
  Plus,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Thermometer,
  Trash2,
  X,
} from 'lucide-react';
import {
  AGE_ESTIMATION_STAGES,
  CANINE_APGAR_PARAMETERS,
  CANINE_DENTAL_TIMELINE,
  DENTAL_CLINICAL_FIGURES,
  FELINE_APGAR_PARAMETERS,
  FELINE_DENTAL_TIMELINE,
  FELINE_REFLEX_FIGURE,
  FELINE_REFLEX_PARAMETERS,
  INITIAL_CARE_SECTIONS,
  NEWBORN_CARE_FIGURES,
  RESUSCITATION_STEPS,
  SOURCE_LINKS,
  SerialApgarRecord,
  TEMPERATURE_TABLE,
  VITAL_PARAMETERS_TABLE,
  interpretApgarScore,
  interpretFelineReflexScore,
  type ClinicalFigure,
  type NeonatusSpecies,
  type NeonatusTab,
} from './data/neonatusData';

const TABS: Array<{
  id: NeonatusTab;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: 'apgar',
    label: 'Escala de Apgar',
    shortLabel: 'Apgar',
    icon: HeartPulse,
  },
  {
    id: 'cuidados',
    label: 'Cuidados com o Recém-Nascido',
    shortLabel: 'Cuidados',
    icon: Baby,
  },
  {
    id: 'denticao',
    label: 'Dentição e Idade',
    shortLabel: 'Dentição',
    icon: Sparkles,
  },
  {
    id: 'calculadoras',
    label: 'Calculadoras Neonatais',
    shortLabel: 'Cálculos',
    icon: Calculator,
  },
];

export default function NeonatusApp() {
  const [activeTab, setActiveTab] = useState<NeonatusTab>('apgar');
  const [species, setSpecies] = useState<NeonatusSpecies>('dog');
  const [apgarSelections, setApgarSelections] = useState<Record<string, 0 | 1 | 2>>({});
  const [reflexSelections, setReflexSelections] = useState<Record<string, 0 | 1 | 2>>({});
  const [puppyLabel, setPuppyLabel] = useState('Filhote 1');
  const [timepoint, setTimepoint] = useState<'5 min' | '30 min' | '60 min' | 'Outro'>('5 min');
  const [serialLog, setSerialLog] = useState<SerialApgarRecord[]>([]);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [lightboxFigure, setLightboxFigure] = useState<ClinicalFigure | null>(null);

  // Dentição state
  const [dentalSpecies, setDentalSpecies] = useState<NeonatusSpecies>('dog');
  const [selectedAgeStageId, setSelectedAgeStageId] = useState<string>(AGE_ESTIMATION_STAGES[2].id);

  // Calculadoras state
  const [calcSpecies, setCalcSpecies] = useState<NeonatusSpecies>('dog');
  const [weightGramsInput, setWeightGramsInput] = useState<string>('150');
  const [weekOfLife, setWeekOfLife] = useState<1 | 2 | 3 | 4>(1);

  // Refs for smooth auto-scroll to next option in Apgar & Reflexes
  const apgarParamRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const reflexParamRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const resultSectionRef = useRef<HTMLElement | null>(null);

  const currentApgarParams = species === 'dog' ? CANINE_APGAR_PARAMETERS : FELINE_APGAR_PARAMETERS;

  const apgarStats = useMemo(() => {
    const answeredCount = currentApgarParams.filter((p) => apgarSelections[p.id] !== undefined).length;
    const isComplete = answeredCount === currentApgarParams.length;
    const total = currentApgarParams.reduce((acc, p) => acc + (apgarSelections[p.id] ?? 0), 0);
    const interpretation = isComplete ? interpretApgarScore(total) : null;
    return { answeredCount, isComplete, total, interpretation };
  }, [apgarSelections, currentApgarParams]);

  const reflexStats = useMemo(() => {
    const answeredCount = FELINE_REFLEX_PARAMETERS.filter((p) => reflexSelections[p.id] !== undefined).length;
    const isComplete = answeredCount === FELINE_REFLEX_PARAMETERS.length;
    const total = FELINE_REFLEX_PARAMETERS.reduce((acc, p) => acc + (reflexSelections[p.id] ?? 0), 0);
    const interpretation = isComplete ? interpretFelineReflexScore(total) : null;
    return { answeredCount, isComplete, total, interpretation };
  }, [reflexSelections]);

  const selectedAgeStage = useMemo(
    () => AGE_ESTIMATION_STAGES.find((s) => s.id === selectedAgeStageId) ?? AGE_ESTIMATION_STAGES[0],
    [selectedAgeStageId],
  );

  const parsedWeightGrams = useMemo(() => {
    const normalized = weightGramsInput.replace(',', '.').trim();
    const val = Number.parseFloat(normalized);
    return Number.isFinite(val) && val > 0 ? val : 0;
  }, [weightGramsInput]);

  function scrollToElement(el: HTMLElement | null) {
    if (!el) return;
    window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 90);
  }

  function handleSelectApgarOption(paramIndex: number, paramId: string, points: 0 | 1 | 2) {
    setApgarSelections((prev) => ({ ...prev, [paramId]: points }));
    setCopyFeedback('');

    const nextParam = currentApgarParams[paramIndex + 1];
    if (nextParam) {
      scrollToElement(apgarParamRefs.current[nextParam.id]);
      return;
    }

    if (species === 'cat') {
      const firstReflex = FELINE_REFLEX_PARAMETERS[0];
      if (firstReflex) {
        scrollToElement(reflexParamRefs.current[firstReflex.id]);
        return;
      }
    }

    scrollToElement(resultSectionRef.current);
  }

  function handleSelectReflexOption(reflexIndex: number, reflexId: string, points: 0 | 1 | 2) {
    setReflexSelections((prev) => ({ ...prev, [reflexId]: points }));
    setCopyFeedback('');

    const nextReflex = FELINE_REFLEX_PARAMETERS[reflexIndex + 1];
    if (nextReflex) {
      scrollToElement(reflexParamRefs.current[nextReflex.id]);
      return;
    }

    scrollToElement(resultSectionRef.current);
  }

  function handleSpeciesSwitch(next: NeonatusSpecies) {
    if (next === species) return;
    setSpecies(next);
    setApgarSelections({});
    setReflexSelections({});
    setCopyFeedback('');
  }

  function handleResetApgar() {
    setApgarSelections({});
    setReflexSelections({});
    setCopyFeedback('');
  }

  function handleSaveSerialRecord() {
    if (!apgarStats.isComplete || !apgarStats.interpretation) return;
    const record: SerialApgarRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      puppyLabel: puppyLabel.trim() || 'Filhote',
      species,
      timepoint,
      apgarTotal: apgarStats.total,
      reflexTotal: species === 'cat' && reflexStats.isComplete ? reflexStats.total : null,
      statusLabel: apgarStats.interpretation.title,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    setSerialLog((prev) => [record, ...prev]);
  }

  async function handleCopyApgarResult() {
    if (!apgarStats.isComplete || !apgarStats.interpretation) return;
    const speciesLabel = species === 'dog' ? 'Canino' : 'Felino';
    const lines = [
      `NEONATUS · ESCORE DE APGAR ${speciesLabel.toUpperCase()}`,
      `Paciente: ${puppyLabel.trim() || 'Filhote'} | Momento: ${timepoint}`,
      `Pontuação Apgar: ${apgarStats.total}/10 — ${apgarStats.interpretation.title} (Faixa ${apgarStats.interpretation.range})`,
      '',
      'Parâmetros avaliados:',
      ...currentApgarParams.map((p) => {
        const pts = apgarSelections[p.id];
        const opt = p.options.find((o) => o.points === pts);
        return `- ${p.name}: ${pts} pt(s) (${opt?.label ?? ''})`;
      }),
    ];

    if (species === 'cat' && reflexStats.isComplete && reflexStats.interpretation) {
      lines.push(
        '',
        `Escore de Reflexos Neonatais Felinos: ${reflexStats.total}/6 — ${reflexStats.interpretation.title}`,
        ...FELINE_REFLEX_PARAMETERS.map((p) => {
          const pts = reflexSelections[p.id];
          const opt = p.options.find((o) => o.points === pts);
          return `- ${p.name}: ${pts} pt(s) (${opt?.label ?? ''})`;
        }),
      );
    }

    lines.push(
      '',
      `Conduta / Interpretação: ${apgarStats.interpretation.summary}`,
      'Lembrete: independentemente do escore, apneia, gasping ou bradicardia grave exigem ventilação imediata.',
    );

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopyFeedback('Resultado copiado para a área de transferência!');
      window.setTimeout(() => setCopyFeedback(''), 3500);
    } catch {
      setCopyFeedback('Não foi possível copiar automaticamente.');
    }
  }

  function renderFigureCard(fig: ClinicalFigure) {
    return (
      <figure
        key={fig.id}
        className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-background/70 shadow-sm transition-all hover:border-primary/40"
      >
        <button
          type="button"
          onClick={() => setLightboxFigure(fig)}
          className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950/90 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`Ampliar imagem: ${fig.title}`}
        >
          <img
            src={fig.src}
            alt={fig.alt}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {fig.speciesTag && (
            <span className="absolute left-3 top-3 rounded-lg bg-slate-950/80 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-sm">
              {fig.speciesTag}
            </span>
          )}
          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-lg bg-slate-950/75 px-2 py-1 text-[10px] font-bold text-white opacity-85 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3 w-3" />
            Ampliar
          </span>
        </button>
        <figcaption className="flex flex-1 flex-col gap-1.5 p-4">
          <h4 className="text-sm font-extrabold text-foreground">{fig.title}</h4>
          <p className="text-xs leading-relaxed text-muted-foreground">{fig.caption}</p>
        </figcaption>
      </figure>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 p-4 pb-16 md:p-8">
      {/* Top Breadcrumb / Back Link */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/consulta-vet/referencias-rapidas"
          className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/60 px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Mini-apps
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          <HeartPulse className="h-3.5 w-3.5" />
          Neonatologia · Cães e Gatos
        </span>
      </div>

      {/* Hero Header */}
      <header className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-br from-[#060b20] via-[#0b1536] to-[#131e47] p-5 text-white shadow-xl sm:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl"
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <img
              src="/apps/neonatus.png"
              alt="Ícone do Neonatus: filhotes recém-nascidos de cão e gato aquecidos com linha de pulso cardíaco"
              className="h-24 w-24 rounded-[24%] object-cover shadow-2xl ring-2 ring-amber-400/35 sm:h-28 sm:w-28"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-amber-300 ring-1 ring-amber-400/30">
                Neonatologia Veterinária
              </span>
              <span className="text-xs text-slate-300">
                Guia clínico prático para atendimento de filhotes recém-nascidos
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
              Neonatus{' '}
              <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                Vet
              </span>
            </h1>
            <p className="max-w-3xl text-xs leading-relaxed text-slate-200/90 sm:text-sm">
              Avaliação rápida pela escala de Apgar canina e felina com reflexos neonatais, protocolo prático de
              reanimação e cuidados iniciais com recém-nascidos, identificação de idade pela dentição com fotos e
              calculadoras por peso em gramas.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav
          aria-label="Seções do aplicativo Neonatus"
          className="relative mt-6 flex gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                  active
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-lg shadow-amber-500/25'
                    : 'bg-white/10 text-slate-200 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* =====================================================================
          ABA 1: ESCALA DE APGAR & REFLEXOS NEONATAIS
         ===================================================================== */}
      {activeTab === 'apgar' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Regra clínica inicial */}
          <div className="rounded-2xl border border-amber-500/35 bg-amber-500/[0.08] p-4 sm:p-5">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="font-bold text-foreground">
                  Não aguarde o Apgar para iniciar a reanimação
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  O atendimento imediato ao nascimento deve ser guiado pela vitalidade, esforço respiratório (apneia ou{' '}
                  <em>gasping</em>) e frequência cardíaca. Utilize o escore de Apgar para documentar a evolução seriada
                  (5, 30 e 60 min) e identificar filhotes que precisam de monitorização intensificada.
                </p>
              </div>
            </div>
          </div>

          {/* Seletor de Espécie e Identificação */}
          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-primary">
                  01 · Selecione a Espécie
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSpeciesSwitch('dog')}
                    aria-pressed={species === 'dog'}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                      species === 'dog'
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/25'
                        : 'border-border bg-background/60 hover:border-primary/40'
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        species === 'dog' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Dog className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-foreground">Cão (Canino)</p>
                      <p className="truncate text-[11px] text-muted-foreground">Apgar 0–10 pontos</p>
                    </div>
                    {species === 'dog' && <Check className="h-4 w-4 shrink-0 text-primary" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSpeciesSwitch('cat')}
                    aria-pressed={species === 'cat'}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                      species === 'cat'
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/25'
                        : 'border-border bg-background/60 hover:border-primary/40'
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        species === 'cat' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Cat className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-foreground">Gato (Felino)</p>
                      <p className="truncate text-[11px] text-muted-foreground">Apgar 0–10 + Reflexos 0–6</p>
                    </div>
                    {species === 'cat' && <Check className="h-4 w-4 shrink-0 text-primary" />}
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Identificação do neonato (fita/coleira)
                  </span>
                  <input
                    type="text"
                    value={puppyLabel}
                    onChange={(e) => setPuppyLabel(e.target.value)}
                    placeholder="Ex.: Filhote 1 (Fita Azul)"
                    className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm font-medium text-foreground outline-none focus:border-primary"
                  />
                </label>

                <div className="space-y-1.5">
                  <span className="block text-xs font-semibold text-muted-foreground">
                    Momento da avaliação seriada
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['5 min', '30 min', '60 min', 'Outro'] as const).map((tp) => (
                      <button
                        key={tp}
                        type="button"
                        onClick={() => setTimepoint(tp)}
                        className={`h-11 rounded-xl border text-xs font-bold transition-all ${
                          timepoint === tp
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : 'border-border bg-background text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {species === 'cat' && (
              <div className="mt-5 rounded-2xl border border-rose-500/30 bg-rose-500/[0.06] p-4 text-xs sm:text-sm">
                <p className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  Observação prática sobre a frequência cardíaca em gatinhos
                </p>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  Na escala felina, as faixas de <strong className="text-foreground">&lt; 100 bpm (0 pts)</strong> e{' '}
                  <strong className="text-foreground">&lt; 180 bpm (1 pt)</strong> se sobrepõem e a faixa de{' '}
                  <strong className="text-foreground">180–199 bpm</strong> é uma zona intermediária sem corte explícito.
                  Selecione diretamente a faixa que melhor descreve o quadro do paciente e associe o{' '}
                  <strong className="text-foreground">Escore de Reflexos Neonatais (0–6)</strong> logo abaixo.
                </p>
              </div>
            )}
          </section>

          {/* Grid Principal: Calculadora Interativa + Painel de Resultado */}
          <div className="grid gap-6 xl:grid-cols-12">
            {/* Coluna Esquerda: Seleção rápida com rolagem automática para o próximo parâmetro */}
            <div className="space-y-6 xl:col-span-8">
              <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      02 · Toque para selecionar (avança automaticamente)
                    </span>
                    <h2 className="text-lg font-extrabold text-foreground sm:text-xl">
                      {species === 'dog' ? 'Escore de Apgar Canino (0–10)' : 'Escore de Apgar Felino (0–10)'}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-extrabold text-primary">
                      {apgarStats.answeredCount}/5 selecionados
                    </span>
                    <button
                      type="button"
                      onClick={handleResetApgar}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Limpar
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentApgarParams.map((param, idx) => {
                    const selectedPts = apgarSelections[param.id];
                    return (
                      <div
                        key={param.id}
                        ref={(el) => {
                          apgarParamRefs.current[param.id] = el;
                        }}
                        className={`rounded-2xl border p-4 transition-all ${
                          selectedPts !== undefined
                            ? 'border-primary/40 bg-primary/[0.03]'
                            : 'border-border/80 bg-background/50 hover:border-border'
                        }`}
                      >
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-bold text-foreground sm:text-base">
                              <span
                                className={`mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg text-xs font-extrabold ${
                                  selectedPts !== undefined
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-primary/15 text-primary'
                                }`}
                              >
                                {idx + 1}
                              </span>
                              {param.name}
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">{param.howToAssess}</p>
                          </div>
                          {selectedPts !== undefined && (
                            <span className="rounded-lg bg-primary/15 px-2.5 py-1 text-xs font-extrabold text-primary">
                              {selectedPts} {selectedPts === 1 ? 'ponto' : 'pontos'}
                            </span>
                          )}
                        </div>

                        <div className="grid gap-2.5 sm:grid-cols-3">
                          {param.options.map((opt) => {
                            const active = selectedPts === opt.points;
                            const pointColor =
                              opt.points === 0
                                ? active
                                  ? 'border-rose-500 bg-rose-500/15 text-foreground ring-2 ring-rose-500/25 shadow-sm'
                                  : 'hover:border-rose-500/40 hover:bg-rose-500/[0.04]'
                                : opt.points === 1
                                  ? active
                                    ? 'border-amber-500 bg-amber-500/15 text-foreground ring-2 ring-amber-500/25 shadow-sm'
                                    : 'hover:border-amber-500/40 hover:bg-amber-500/[0.04]'
                                  : active
                                    ? 'border-emerald-500 bg-emerald-500/15 text-foreground ring-2 ring-emerald-500/25 shadow-sm'
                                    : 'hover:border-emerald-500/40 hover:bg-emerald-500/[0.04]';

                            return (
                              <button
                                key={opt.points}
                                type="button"
                                aria-pressed={active}
                                onClick={() => handleSelectApgarOption(idx, param.id, opt.points)}
                                className={`flex min-h-[84px] flex-col justify-between rounded-xl border border-border bg-card p-3.5 text-left transition-all active:scale-[0.98] ${pointColor}`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-extrabold ${
                                      opt.points === 0
                                        ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                                        : opt.points === 1
                                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                          : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                    }`}
                                  >
                                    {opt.points} {opt.points === 1 ? 'pt' : 'pts'}
                                  </span>
                                  {active && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
                                </div>
                                <div className="mt-2">
                                  <p className="text-sm font-extrabold leading-tight text-foreground">{opt.label}</p>
                                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{opt.detail}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Escore Complementar de Reflexos Neonatais Felinos (0-6) */}
              {species === 'cat' && (
                <section className="rounded-3xl border border-primary/25 bg-card p-5 shadow-sm sm:p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                        Escore Complementar Felino (0 a 6 pontos)
                      </span>
                      <h3 className="text-lg font-extrabold text-foreground">
                        Reflexos Neonatais em Gatinhos (Sucção, Procura e Endireitamento)
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Avaliação simples, sem equipamentos, essencial para predizer sobrevivência e capacidade de mamada.
                      </p>
                    </div>
                    <span className="rounded-xl bg-primary/15 px-3 py-1.5 text-xs font-black text-primary">
                      {reflexStats.isComplete ? `Reflexos: ${reflexStats.total}/6` : `${reflexStats.answeredCount}/3 avaliados`}
                    </span>
                  </div>

                  {/* Foto real demonstrando os 3 reflexos em gatinhos */}
                  <div className="mb-5">{renderFigureCard(FELINE_REFLEX_FIGURE)}</div>

                  <div className="space-y-4">
                    {FELINE_REFLEX_PARAMETERS.map((reflex, idx) => {
                      const selectedPts = reflexSelections[reflex.id];
                      return (
                        <div
                          key={reflex.id}
                          ref={(el) => {
                            reflexParamRefs.current[reflex.id] = el;
                          }}
                          className={`rounded-2xl border p-4 transition-all ${
                            selectedPts !== undefined
                              ? 'border-primary/40 bg-primary/[0.03]'
                              : 'border-border/80 bg-background/50'
                          }`}
                        >
                          <div className="mb-2.5">
                            <h4 className="text-sm font-bold text-foreground">
                              {idx + 1}. {reflex.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{reflex.howToAssess}</p>
                          </div>
                          <div className="grid gap-2.5 sm:grid-cols-3">
                            {reflex.options.map((opt) => {
                              const active = selectedPts === opt.points;
                              return (
                                <button
                                  key={opt.points}
                                  type="button"
                                  aria-pressed={active}
                                  onClick={() => handleSelectReflexOption(idx, reflex.id, opt.points)}
                                  className={`flex min-h-[80px] flex-col justify-between rounded-xl border p-3.5 text-left transition-all active:scale-[0.98] ${
                                    active
                                      ? 'border-primary bg-primary/12 ring-2 ring-primary/25 shadow-sm'
                                      : 'border-border bg-card hover:border-primary/40'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-extrabold text-primary">
                                      {opt.points} {opt.points === 1 ? 'pt' : 'pts'}
                                    </span>
                                    {active && <Check className="h-4 w-4 text-primary" />}
                                  </div>
                                  <div className="mt-1.5">
                                    <p className="text-sm font-extrabold text-foreground">{opt.label}</p>
                                    <p className="mt-0.5 text-[11px] text-muted-foreground">{opt.detail}</p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Coluna Direita: Resultado, Interpretação e Registro Seriado */}
            <div className="space-y-6 xl:col-span-4">
              <section
                ref={resultSectionRef}
                aria-live="polite"
                className={`sticky top-20 rounded-3xl border p-5 shadow-md sm:p-6 ${
                  apgarStats.interpretation ? apgarStats.interpretation.panelClass : 'border-border bg-card'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    Pontuação Apgar ({species === 'dog' ? 'Cão' : 'Gato'})
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    {apgarStats.answeredCount}/5 parâmetros
                  </span>
                </div>

                <div className="my-4 flex items-baseline gap-3">
                  <p className="text-5xl font-black tracking-tight text-foreground">
                    {apgarStats.isComplete ? apgarStats.total : '—'}
                    <span className="text-2xl font-bold text-muted-foreground">/10</span>
                  </p>
                  {apgarStats.interpretation && (
                    <span
                      className={`inline-flex items-center rounded-xl border px-3 py-1 text-xs font-extrabold ${apgarStats.interpretation.badgeClass}`}
                    >
                      {apgarStats.interpretation.range} · {apgarStats.interpretation.title}
                    </span>
                  )}
                </div>

                {!apgarStats.isComplete ? (
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Selecione os cinco parâmetros ao lado para calcular a pontuação final do escore de Apgar.
                  </p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs leading-relaxed text-foreground/90 sm:text-sm">
                      {apgarStats.interpretation?.summary}
                    </p>
                  </div>
                )}

                {species === 'cat' && (
                  <div className="mt-4 rounded-2xl border border-border/80 bg-background/70 p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">Reflexos Felinos (0–6):</span>
                      <span className="text-sm font-black text-primary">
                        {reflexStats.isComplete ? `${reflexStats.total}/6` : `${reflexStats.answeredCount}/3 avaliados`}
                      </span>
                    </div>
                    {reflexStats.isComplete && reflexStats.interpretation && (
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        <strong className="text-foreground">{reflexStats.interpretation.title}:</strong>{' '}
                        {reflexStats.interpretation.summary}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-foreground">
                  <strong>Atenção imediata:</strong> Independentemente do escore, apneia, <em>gasping</em> ou
                  bradicardia grave exigem ventilação imediata.
                </div>

                {/* Ações do Resultado */}
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    disabled={!apgarStats.isComplete}
                    onClick={handleSaveSerialRecord}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3.5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-opacity disabled:opacity-40"
                  >
                    <Plus className="h-4 w-4" />
                    Salvar ({timepoint})
                  </button>
                  <button
                    type="button"
                    disabled={!apgarStats.isComplete}
                    onClick={handleCopyApgarResult}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-bold text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar resultado
                  </button>
                </div>

                {copyFeedback && (
                  <p role="status" className="mt-2 text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {copyFeedback}
                  </p>
                )}

                {/* Faixas de Interpretação */}
                <div className="mt-6 border-t border-border/70 pt-4">
                  <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Faixas de Interpretação
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-2">
                      <span className="font-black text-emerald-600 dark:text-emerald-400">7–10 pontos</span>
                      <span className="font-semibold text-foreground">Sem sofrimento aparente</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2">
                      <span className="font-black text-amber-600 dark:text-amber-400">4–6 pontos</span>
                      <span className="font-semibold text-foreground">Sofrimento moderado</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-rose-500/25 bg-rose-500/10 px-3 py-2">
                      <span className="font-black text-rose-600 dark:text-rose-400">0–3 pontos</span>
                      <span className="font-semibold text-foreground">Sofrimento grave</span>
                    </div>
                  </div>
                  <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
                    O registro seriado aos <strong>5, 30 e 60 minutos</strong> acompanha a adaptação respiratória e
                    identifica deterioração tardia ou dificuldades para mamar.
                  </p>
                </div>

                {/* Histórico Seriado da Ninhada */}
                {serialLog.length > 0 && (
                  <div className="mt-5 border-t border-border/70 pt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        Registro Seriado ({serialLog.length})
                      </h4>
                      <button
                        type="button"
                        onClick={() => setSerialLog([])}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-500 hover:underline"
                      >
                        <Trash2 className="h-3 w-3" />
                        Limpar lista
                      </button>
                    </div>
                    <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                      {serialLog.map((rec) => (
                        <div
                          key={rec.id}
                          className="flex items-center justify-between rounded-xl border border-border bg-background/80 px-3 py-2 text-xs"
                        >
                          <div>
                            <p className="font-bold text-foreground">
                              {rec.puppyLabel} · <span className="text-primary">{rec.timepoint}</span>
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {rec.species === 'dog' ? 'Cão' : 'Gato'} · {rec.statusLabel} ({rec.timestamp})
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-foreground">{rec.apgarTotal}/10</span>
                            {rec.reflexTotal !== null && rec.reflexTotal !== undefined && (
                              <span className="block text-[10px] font-bold text-primary">
                                Reflexos: {rec.reflexTotal}/6
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Tabelas de consulta rápida */}
          <section className="space-y-6 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <div>
              <h2 className="text-lg font-extrabold text-foreground sm:text-xl">
                Tabelas de Consulta Rápida — Apgar e Reflexos
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Resumo dos critérios de pontuação para cães e gatos.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Tabela Canina */}
              <div className="space-y-2.5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-foreground sm:text-base">
                  <Dog className="h-4 w-4 text-primary" />
                  Tabela de Apgar Canino
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted/70 uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2.5 font-bold text-foreground">Parâmetro</th>
                        <th className="px-3 py-2.5 font-bold text-rose-600 dark:text-rose-400">0 pts</th>
                        <th className="px-3 py-2.5 font-bold text-amber-600 dark:text-amber-400">1 pt</th>
                        <th className="px-3 py-2.5 font-bold text-emerald-600 dark:text-emerald-400">2 pts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-3 py-2.5 font-semibold text-foreground">Frequência cardíaca</td>
                        <td className="px-3 py-2.5">&lt; 180 bpm</td>
                        <td className="px-3 py-2.5">180–220 bpm</td>
                        <td className="px-3 py-2.5">&gt; 220 bpm</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2.5 font-semibold text-foreground">Esforço respiratório</td>
                        <td className="px-3 py-2.5">Sem vocalização e FR &lt; 6</td>
                        <td className="px-3 py-2.5">Vocalização fraca e FR 6–15</td>
                        <td className="px-3 py-2.5">Vocalização evidente e FR &gt; 15</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2.5 font-semibold text-foreground">Irritabilidade reflexa</td>
                        <td className="px-3 py-2.5">Ausente</td>
                        <td className="px-3 py-2.5">Resposta fraca</td>
                        <td className="px-3 py-2.5">Resposta vigorosa</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2.5 font-semibold text-foreground">Motilidade / tônus</td>
                        <td className="px-3 py-2.5">Flácido</td>
                        <td className="px-3 py-2.5">Algumas flexões</td>
                        <td className="px-3 py-2.5">Movimentos ativos</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2.5 font-semibold text-foreground">Mucosas</td>
                        <td className="px-3 py-2.5">Cianóticas</td>
                        <td className="px-3 py-2.5">Pálidas</td>
                        <td className="px-3 py-2.5">Róseas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tabela Felina */}
              <div className="space-y-2.5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-foreground sm:text-base">
                  <Cat className="h-4 w-4 text-primary" />
                  Tabela de Apgar Felino
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted/70 uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2.5 font-bold text-foreground">Parâmetro</th>
                        <th className="px-3 py-2.5 font-bold text-rose-600 dark:text-rose-400">0 pts</th>
                        <th className="px-3 py-2.5 font-bold text-amber-600 dark:text-amber-400">1 pt</th>
                        <th className="px-3 py-2.5 font-bold text-emerald-600 dark:text-emerald-400">2 pts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-3 py-2.5 font-semibold text-foreground">Frequência cardíaca</td>
                        <td className="px-3 py-2.5">&lt; 100 bpm</td>
                        <td className="px-3 py-2.5">&lt; 180 bpm</td>
                        <td className="px-3 py-2.5">200–280 bpm</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2.5 font-semibold text-foreground">FR e padrão respiratório</td>
                        <td className="px-3 py-2.5">Ausente ou &lt; 10 irpm</td>
                        <td className="px-3 py-2.5">FR &lt; 40, fraca/irregular</td>
                        <td className="px-3 py-2.5">40–160, regular e rítmica</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2.5 font-semibold text-foreground">Tônus muscular</td>
                        <td className="px-3 py-2.5">Flácido</td>
                        <td className="px-3 py-2.5">Algumas flexões</td>
                        <td className="px-3 py-2.5">Movimentos ativos</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2.5 font-semibold text-foreground">Cor das mucosas</td>
                        <td className="px-3 py-2.5">Cianóticas</td>
                        <td className="px-3 py-2.5">Pálidas</td>
                        <td className="px-3 py-2.5">Róseas</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2.5 font-semibold text-foreground">Irritabilidade reflexa</td>
                        <td className="px-3 py-2.5">Ausente</td>
                        <td className="px-3 py-2.5">Algum movimento</td>
                        <td className="px-3 py-2.5">Resposta vigorosa</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabela de Reflexos Felinos */}
            <div className="space-y-2.5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground sm:text-base">
                <Cat className="h-4 w-4 text-primary" />
                Tabela de Reflexos Neonatais Felinos (0–6 pontos)
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[580px] text-left text-xs sm:text-sm">
                  <thead className="bg-muted/70 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-bold text-foreground">Reflexo</th>
                      <th className="px-4 py-3 font-bold text-rose-600 dark:text-rose-400">0 pontos</th>
                      <th className="px-4 py-3 font-bold text-amber-600 dark:text-amber-400">1 ponto</th>
                      <th className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">2 pontos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">Sucção (<em>suckling</em>)</td>
                      <td className="px-4 py-3">Ausente</td>
                      <td className="px-4 py-3">Sucção fraca</td>
                      <td className="px-4 py-3">Sucção forte, com pressão negativa da língua</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">Procura (<em>rooting</em>)</td>
                      <td className="px-4 py-3">Ausente</td>
                      <td className="px-4 py-3">Procura lenta da fonte alimentar</td>
                      <td className="px-4 py-3">Procura imediata e vigorosa</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">Endireitamento (<em>righting</em>)</td>
                      <td className="px-4 py-3">Não retorna da posição dorsal</td>
                      <td className="px-4 py-3">Retorno lento</td>
                      <td className="px-4 py-3">Retorno imediato à posição esternal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* =====================================================================
          ABA 2: CUIDADOS COM O FILHOTE RECÉM-NASCIDO
         ===================================================================== */}
      {activeTab === 'cuidados' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Passo a Passo da Reanimação Neonatal */}
          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-6 space-y-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/15 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-primary">
                <Activity className="h-3.5 w-3.5" />
                Atendimento Imediato ao Nascimento
              </span>
              <h2 className="text-xl font-black text-foreground sm:text-2xl">
                Reanimação e Primeiros Cuidados com o Recém-Nascido
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Os primeiros minutos após o parto exigem aquecimento, secagem com estímulo tátil, desobstrução seletiva
                e ventilação precoce quando não há respiração efetiva.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {RESUSCITATION_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col justify-between rounded-2xl border border-border/80 bg-background/60 p-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-xs font-black text-primary-foreground">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="text-sm font-extrabold text-foreground sm:text-base">{item.title}</h3>
                        <p className="text-xs font-medium text-primary">{item.subtitle}</p>
                      </div>
                    </div>

                    <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {item.keyPoints.map((pt) => (
                        <li key={pt} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {item.warning && (
                    <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/[0.08] p-3 text-xs leading-relaxed text-rose-700 dark:text-rose-300">
                      <strong className="font-bold">Atenção: </strong>
                      {item.warning}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Galeria Visual de Cuidados e Reanimação com Legendas Explicativas */}
          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                Ilustrações e Fotos Clínicas (clique para ampliar)
              </span>
              <h2 className="mt-1 text-xl font-black text-foreground">
                Exemplos Visuais de Reanimação, Amamentação e Manejo Neonatal
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {NEWBORN_CARE_FIGURES.map((fig) => renderFigureCard(fig))}
            </div>
          </section>

          {/* Pilares dos Cuidados Iniciais */}
          <div className="grid gap-6 lg:grid-cols-3">
            {INITIAL_CARE_SECTIONS.map((sec) => (
              <section
                key={sec.id}
                className="flex flex-col justify-between rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6"
              >
                <div className="space-y-3">
                  <span className="inline-block rounded-lg bg-primary/12 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    {sec.badge}
                  </span>
                  <h3 className="text-lg font-extrabold text-foreground">{sec.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{sec.summary}</p>
                  <ul className="space-y-2.5 pt-2 text-xs leading-relaxed text-foreground/90">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {sec.highlightBox && (
                  <div
                    className={`mt-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                      sec.highlightBox.tone === 'rose'
                        ? 'border-rose-500/35 bg-rose-500/10 text-rose-950 dark:text-rose-200'
                        : sec.highlightBox.tone === 'amber'
                          ? 'border-amber-500/35 bg-amber-500/10 text-amber-950 dark:text-amber-200'
                          : 'border-cyan-500/35 bg-cyan-500/10 text-cyan-950 dark:text-cyan-200'
                    }`}
                  >
                    <p className="font-extrabold">{sec.highlightBox.title}</p>
                    <p className="mt-1 opacity-90">{sec.highlightBox.text}</p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Tabelas de Termorregulação e Parâmetros Vitais */}
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-500">
                  <Thermometer className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground sm:text-lg">
                    Temperatura Retal Fisiológica vs. Ambiente
                  </h3>
                  <p className="text-xs text-muted-foreground">Progressão térmica nas primeiras 4 semanas de vida</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/70 text-[11px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-3.5 py-3 font-bold text-foreground">Idade</th>
                      <th className="px-3.5 py-3 font-bold text-foreground">T° Retal (Cão/Gato)</th>
                      <th className="px-3.5 py-3 font-bold text-orange-600 dark:text-orange-400">Ambiente (Ninho)</th>
                      <th className="px-3.5 py-3 font-bold text-foreground">Umidade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {TEMPERATURE_TABLE.map((row) => (
                      <tr key={row.week}>
                        <td className="px-3.5 py-2.5 font-semibold text-foreground">{row.week}</td>
                        <td className="px-3.5 py-2.5">{row.rectalDog}</td>
                        <td className="px-3.5 py-2.5 font-bold text-orange-600 dark:text-orange-400">{row.ambient}</td>
                        <td className="px-3.5 py-2.5">{row.humidity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                <strong>Dica prática:</strong> A caixa-maternidade deve ter gradiente térmico (uma zona aquecida e outra
                livre de calor direto) para o filhote poder se afastar caso sinta calor excessivo.
              </p>
            </section>

            <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground sm:text-lg">
                    Parâmetros Vitais e Metas do Recém-Nascido
                  </h3>
                  <p className="text-xs text-muted-foreground">Valores esperados para cães e gatos neonatos</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/70 text-[11px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-3.5 py-3 font-bold text-foreground">Parâmetro</th>
                      <th className="px-3.5 py-3 font-bold text-foreground">Cão Neonato</th>
                      <th className="px-3.5 py-3 font-bold text-foreground">Gato Neonato</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {VITAL_PARAMETERS_TABLE.map((row) => (
                      <tr key={row.parameter}>
                        <td className="px-3.5 py-2.5 font-semibold text-foreground">{row.parameter}</td>
                        <td className="px-3.5 py-2.5">{row.dog}</td>
                        <td className="px-3.5 py-2.5">{row.cat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* =====================================================================
          ABA 3: DENTIÇÃO DE FILHOTES & ESTIMATIVA DE IDADE
         ===================================================================== */}
      {activeTab === 'denticao' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Estimador Interativo de Idade */}
          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-5 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                Ferramenta Interativa · Estimativa de Idade
              </span>
              <h2 className="text-xl font-black text-foreground sm:text-2xl">
                Como Identificar a Idade pela Dentição e Marcos Físicos
              </h2>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Selecione o estágio dentário e físico observado no exame da cavidade oral para estimar a idade em cães e
                gatos.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              <div className="space-y-2.5 lg:col-span-6">
                {AGE_ESTIMATION_STAGES.map((stage, idx) => {
                  const active = stage.id === selectedAgeStageId;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setSelectedAgeStageId(stage.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                        active
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/25'
                          : 'border-border bg-background/60 hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
                            active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-foreground sm:text-sm">{stage.label}</span>
                      </div>
                      {active && <Check className="h-4 w-4 shrink-0 text-primary" />}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-3xl border border-primary/25 bg-primary/[0.05] p-5 sm:p-6 lg:col-span-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                  Idade Estimada para o Achado Selecionado
                </span>
                <h3 className="mt-1 text-base font-extrabold text-foreground sm:text-lg">{selectedAgeStage.label}</h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Dog className="h-4 w-4 text-primary" />
                      Idade estimada em CÃES
                    </div>
                    <p className="mt-1.5 text-lg font-black text-foreground">{selectedAgeStage.dogAge}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Cat className="h-4 w-4 text-primary" />
                      Idade estimada em GATOS
                    </div>
                    <p className="mt-1.5 text-lg font-black text-foreground">{selectedAgeStage.catAge}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-xs leading-relaxed sm:text-sm">
                  <div className="rounded-2xl border border-border/80 bg-card/90 p-3.5">
                    <p className="font-bold text-foreground">O que observar nos dentes / gengiva:</p>
                    <p className="mt-1 text-muted-foreground">{selectedAgeStage.dentalFindings}</p>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-card/90 p-3.5">
                    <p className="font-bold text-foreground">Marcos físicos e neurológicos associados:</p>
                    <p className="mt-1 text-muted-foreground">{selectedAgeStage.physicalMilestones}</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5">
                    <p className="font-bold text-emerald-700 dark:text-emerald-300">Conduta nutricional nesta fase:</p>
                    <p className="mt-1 text-foreground/90">{selectedAgeStage.dietRecommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Galeria de Fotos Reais de Dentição Canina e Felina */}
          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                Atlas Fotográfico Clínico (clique em qualquer foto para ampliar)
              </span>
              <h2 className="mt-1 text-xl font-black text-foreground sm:text-2xl">
                Fotos Reais da Dentição Canina e Felina (Decídua, Troca e Permanente)
              </h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Compare visualmente o estágio da gengiva edêntula, a erupção dos dentes de leite ("agulhas"), a troca dos
                incisivos/caninos e a retenção decídua.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {DENTAL_CLINICAL_FIGURES.map((fig) => renderFigureCard(fig))}
            </div>
          </section>

          {/* Como Diferenciar Dente de Leite de Permanente */}
          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
              Guia de Inspeção Clínica Oral
            </span>
            <h2 className="mt-1 text-xl font-black text-foreground">
              Como Diferenciar Dentes Decíduos ("Dentes de Leite") de Permanentes
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">1. Coloração e Esmalte</span>
                <h3 className="mt-1 text-sm font-bold text-foreground">Branco-Azulado vs. Marfim</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Os dentes decíduos possuem esmalte mais fino e translúcido, com tonalidade{' '}
                  <strong className="text-foreground">branco-leitosa a levemente azulada</strong>. Os dentes permanentes
                  são mais densos, opacos e de cor <strong className="text-foreground">branco-marfim</strong>.
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">2. Formato Anatômico</span>
                <h3 className="mt-1 text-sm font-bold text-foreground">Aspecto de "Agulha" e Flor-de-Lis</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Caninos decíduos são muito afilados, pontiagudos ("em agulha") e curvados para trás, com colo estreito.
                  Os incisivos permanentes recém-erupcionados apresentam borda incisal trilobada nítida (
                  <strong className="text-foreground">flor-de-lis</strong>).
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">3. Molares e PM1</span>
                <h3 className="mt-1 text-sm font-bold text-foreground">Dentes Sem Predecessor de Leite</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Nenhum filhote possui molares de leite.</strong> Os molares (e o 1º
                  pré-molar no cão) erupcionam diretamente como dentes permanentes; sua presença confirma idade ≥ 4–5 meses.
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">4. Dupla Dentição</span>
                <h3 className="mt-1 text-sm font-bold text-foreground">Retenção de Dentes Decíduos</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Os permanentes erupcionam pelo lado lingual/palatino dos decíduos — exceto o{' '}
                  <strong className="text-foreground">canino superior permanente</strong>, que nasce{' '}
                  <strong className="text-foreground">na frente (rostral)</strong> do canino de leite. Nunca devem
                  permanecer dois dentes no mesmo local.
                </p>
              </div>
            </div>

            {/* Fórmulas Dentárias */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-primary/25 bg-primary/[0.04] p-4">
                <div className="flex items-center gap-2 font-extrabold text-foreground">
                  <Dog className="h-5 w-5 text-primary" />
                  Fórmula Dentária Canina (28 Decíduos → 42 Permanentes)
                </div>
                <ul className="mt-2.5 space-y-1.5 text-xs text-muted-foreground sm:text-sm">
                  <li>
                    <strong className="text-foreground">Decídua (28 dentes):</strong>{' '}
                    <code>2 × (I 3/3, C 1/1, PM 3/3) = 28</code> · Presentes: PM2, PM3 e PM4.
                  </li>
                  <li>
                    <strong className="text-foreground">Permanente (42 dentes):</strong>{' '}
                    <code>2 × (I 3/3, C 1/1, PM 4/4, M 2/3) = 42</code> · 20 superiores e 22 inferiores.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-primary/25 bg-primary/[0.04] p-4">
                <div className="flex items-center gap-2 font-extrabold text-foreground">
                  <Cat className="h-5 w-5 text-primary" />
                  Fórmula Dentária Felina (26 Decíduos → 30 Permanentes)
                </div>
                <ul className="mt-2.5 space-y-1.5 text-xs text-muted-foreground sm:text-sm">
                  <li>
                    <strong className="text-foreground">Decídua (26 dentes):</strong>{' '}
                    <code>2 × (I 3/3, C 1/1, PM 3/2) = 26</code> · 3 pré-molares superiores e 2 inferiores.
                  </li>
                  <li>
                    <strong className="text-foreground">Permanente (30 dentes):</strong>{' '}
                    <code>2 × (I 3/3, C 1/1, PM 3/2, M 1/1) = 30</code> · 16 superiores e 14 inferiores.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tabelas Cronológicas de Erupção Dentária */}
          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                  Cronologia Dentária Completa
                </span>
                <h2 className="text-xl font-black text-foreground">
                  Tabela de Erupção Decídua e Troca para Dentição Permanente
                </h2>
              </div>

              <div className="inline-flex rounded-2xl border border-border bg-background p-1">
                <button
                  type="button"
                  onClick={() => setDentalSpecies('dog')}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    dentalSpecies === 'dog'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Dog className="h-4 w-4" />
                  Cronologia Canina
                </button>
                <button
                  type="button"
                  onClick={() => setDentalSpecies('cat')}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    dentalSpecies === 'cat'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Cat className="h-4 w-4" />
                  Cronologia Felina
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[680px] text-left text-xs sm:text-sm">
                <thead className="bg-muted/70 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3.5 font-bold text-foreground">Grupo Dentário</th>
                    <th className="px-4 py-3.5 font-bold text-amber-600 dark:text-amber-400">
                      Erupção Decídua (Leite)
                    </th>
                    <th className="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                      Erupção Permanente (Troca)
                    </th>
                    <th className="px-4 py-3.5 font-bold text-foreground">Peculiaridades e Dicas de Exame</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(dentalSpecies === 'dog' ? CANINE_DENTAL_TIMELINE : FELINE_DENTAL_TIMELINE).map((row) => (
                    <tr key={row.toothGroup} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-bold text-foreground">{row.toothGroup}</td>
                      <td className="px-4 py-3 font-semibold text-amber-700 dark:text-amber-300">
                        {row.deciduousEruption}
                      </td>
                      <td className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-300">
                        {row.permanentEruption}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.clinicalNotes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* =====================================================================
          ABA 4: CALCULADORAS NEONATAIS
         ===================================================================== */}
      {activeTab === 'calculadoras' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                Cálculos Rápidos por Peso em Gramas (g)
              </span>
              <h2 className="text-xl font-black text-foreground sm:text-2xl">
                Calculadora de Sucedâneo Lácteo, Ganho de Peso e Emergências Neonatais
              </h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Informe a espécie, o peso exato do neonato em <strong>gramas (g)</strong> e a semana de vida para calcular
                capacidade gástrica máxima segura, volume por mamada, metas de ganho ponderal e doses de emergência.
              </p>
            </div>

            <div className="grid gap-5 rounded-2xl border border-border/80 bg-background/60 p-4 sm:grid-cols-3 sm:p-5">
              <div>
                <span className="mb-2 block text-xs font-bold text-muted-foreground">Espécie</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcSpecies('dog')}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition-all ${
                      calcSpecies === 'dog'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-foreground'
                    }`}
                  >
                    <Dog className="h-4 w-4" />
                    Cão
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcSpecies('cat')}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition-all ${
                      calcSpecies === 'cat'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-foreground'
                    }`}
                  >
                    <Cat className="h-4 w-4" />
                    Gato
                  </button>
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-muted-foreground">
                  Peso atual do filhote em GRAMAS (g)
                </span>
                <input
                  type="number"
                  min={30}
                  max={5000}
                  step={5}
                  value={weightGramsInput}
                  onChange={(e) => setWeightGramsInput(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border bg-card px-3.5 text-sm font-black text-foreground outline-none focus:border-primary"
                />
                <span className="mt-1 block text-[11px] text-muted-foreground">
                  Equivale a {(parsedWeightGrams / 1000).toFixed(3).replace('.', ',')} kg
                </span>
              </label>

              <div>
                <span className="mb-2 block text-xs font-bold text-muted-foreground">Semana de vida</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {([1, 2, 3, 4] as const).map((wk) => (
                    <button
                      key={wk}
                      type="button"
                      onClick={() => setWeekOfLife(wk)}
                      className={`h-10 rounded-xl border text-xs font-bold transition-all ${
                        weekOfLife === wk
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-card text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {wk}ª sem
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {parsedWeightGrams > 0 && (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-5">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <Droplets className="h-4 w-4" />
                    Capacidade Gástrica / Mamada
                  </div>
                  <p className="mt-2 text-2xl font-black text-foreground">
                    {((parsedWeightGrams / 100) * 4).toFixed(1).replace('.', ',')} a{' '}
                    {((parsedWeightGrams / 100) * 5).toFixed(1).replace('.', ',')} mL
                  </p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">
                    Limite máximo seguro por refeição (4–5 mL / 100 g)
                  </p>
                  <div className="mt-3 border-t border-emerald-500/20 pt-2.5 text-xs text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Início conservador / debilitados:</strong>{' '}
                      {((parsedWeightGrams / 100) * 2.5).toFixed(1).replace('.', ',')} a{' '}
                      {((parsedWeightGrams / 100) * 3).toFixed(1).replace('.', ',')} mL/mamada
                    </p>
                    <p className="mt-1">
                      <strong className="text-foreground">Frequência ({weekOfLife}ª sem):</strong>{' '}
                      {weekOfLife === 1
                        ? 'A cada 2–3 h (8–10x/dia)'
                        : weekOfLife === 2
                          ? 'A cada 3–4 h (6–8x/dia)'
                          : weekOfLife === 3
                            ? 'A cada 4–5 h (5–6x/dia)'
                            : 'A cada 5–6 h + transição pastosa'}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    <Flame className="h-4 w-4" />
                    Calorias & Meta de Ganho Diário
                  </div>
                  <p className="mt-2 text-2xl font-black text-foreground">
                    {Math.round((parsedWeightGrams / 100) * (weekOfLife === 1 ? 20 : 24))} kcal/dia
                  </p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">
                    ~20–25 kcal por 100 g de peso corporal/dia
                  </p>
                  <div className="mt-3 border-t border-amber-500/20 pt-2.5 text-xs text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Meta de ganho ponderal diário:</strong>{' '}
                      {calcSpecies === 'dog'
                        ? `+${(parsedWeightGrams * 0.05).toFixed(0)} a +${(parsedWeightGrams * 0.1).toFixed(0)} g/dia (5–10%/dia)`
                        : '+10 a +15 g/dia (70–100 g/semana)'}
                    </p>
                    <p className="mt-1">
                      Aquecer o sucedâneo a <strong>37–38 °C</strong> e nunca alimentar se T° retal &lt; 35 °C.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-500/30 bg-rose-500/[0.06] p-5">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    <HeartPulse className="h-4 w-4" />
                    Resgate de Hipoglicemia
                  </div>
                  <p className="mt-2 text-2xl font-black text-foreground">
                    {((parsedWeightGrams / 1000) * 2).toFixed(2).replace('.', ',')} a{' '}
                    {((parsedWeightGrams / 1000) * 4).toFixed(2).replace('.', ',')} mL
                  </p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">
                    de <strong>Dextrose a 10%</strong> IV ou IO lento (2–4 mL/kg)
                  </p>
                  <div className="mt-3 border-t border-rose-500/20 pt-2.5 text-xs text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Como preparar Dextrose 10%:</strong> diluir 1 parte de Glicose
                      50% em 4 partes de NaCl 0,9% ou Água Destilada (ex.: 1 mL Glicose 50% + 4 mL SF 0,9%).
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/[0.06] p-5">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    <Activity className="h-4 w-4" />
                    Fluidos & Adrenalina
                  </div>
                  <p className="mt-2 text-2xl font-black text-foreground">
                    {((parsedWeightGrams / 1000) * 10).toFixed(2).replace('.', ',')} mL
                  </p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">
                    Bolus de cristaloide aquecido IV/IO (10 mL/kg em 15–20 min)
                  </p>
                  <div className="mt-3 border-t border-cyan-500/20 pt-2.5 text-xs text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Manutenção diária (150 mL/kg/dia):</strong>{' '}
                      {((parsedWeightGrams / 1000) * 150).toFixed(1).replace('.', ',')} mL/dia (~
                      {(((parsedWeightGrams / 1000) * 150) / 24).toFixed(2).replace('.', ',')} mL/h)
                    </p>
                    <p className="mt-1">
                      <strong className="text-foreground">Adrenalina (0,01–0,03 mg/kg):</strong>{' '}
                      {((parsedWeightGrams / 1000) * 0.01).toFixed(4).replace('.', ',')} a{' '}
                      {((parsedWeightGrams / 1000) * 0.03).toFixed(4).replace('.', ',')} mg IV/IO
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Rodapé discreto apenas com os links de origem ao final da página */}
      <footer className="rounded-2xl border border-border/70 bg-card/50 p-4 sm:p-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Fontes e Links das Imagens e Protocolos
        </h2>
        <ul className="mt-2.5 grid gap-2 text-xs sm:grid-cols-2 lg:grid-cols-3">
          {SOURCE_LINKS.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </footer>

      {/* Lightbox para ampliar imagens clínicas */}
      {lightboxFigure && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxFigure.title}
          onClick={() => setLightboxFigure(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-slate-950 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <h3 className="text-sm font-extrabold sm:text-base">{lightboxFigure.title}</h3>
              <button
                type="button"
                onClick={() => setLightboxFigure(null)}
                aria-label="Fechar visualização"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto bg-black p-4">
              <img
                src={lightboxFigure.src}
                alt={lightboxFigure.alt}
                className="mx-auto max-h-[64vh] w-auto rounded-xl object-contain"
              />
            </div>
            <p className="border-t border-white/10 px-5 py-3.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
              {lightboxFigure.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
