import { ULTRASOUND_COMPLEMENTARY_BOOKS } from '../../data/ultrasoundComplementaryAssessment';
import { ULTRASOUND_CLINICAL_IMAGES } from '../../data/ultrasoundClinicalImages';
import { ReadableTable } from '../../components/shared/ReadableTable';
import { UltrasoundReportInterpretation } from '../../components/UltrasoundReportInterpretation';
import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  Baby,
  BookOpen,
  Cat,
  ChevronLeft,
  ChevronRight,
  Dog,
  Info,
  LucideIcon,
  Ruler,
  ScanLine,
  Search,
  X,
  Table2,
  TriangleAlert,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { ConsultaVetPageHero } from '../../components/layout/ConsultaVetPageHero';
import {
  getUltrasoundEvidenceGap,
  getDogHeartPredictedMean,
  getUltrasoundOrgan,
  getUltrasoundQualitativeFindings,
  getUltrasoundReferenceValues,
  ULTRASOUND_ORGANS,
  ULTRASOUND_SOURCES,
  UltrasoundLifeStage,
  UltrasoundOrganId,
  UltrasoundSpecies,
} from '../../data/ultrasoundReferenceData';
import { cn } from '../../../../lib/utils';

const VALID_ORGAN_IDS = new Set<UltrasoundOrganId>(ULTRASOUND_ORGANS.map((organ) => organ.id));

const SPECIES_OPTIONS: Array<{ id: UltrasoundSpecies; label: string; icon: LucideIcon }> = [
  { id: 'dog', label: 'Cão', icon: Dog },
  { id: 'cat', label: 'Gato', icon: Cat },
];

const LIFE_STAGE_OPTIONS: Array<{ id: UltrasoundLifeStage; label: string; description: string }> = [
  { id: 'adult', label: 'Adulto', description: 'Referência adulta/geral' },
  { id: 'young', label: 'Filhote', description: 'Somente dados pediátricos publicados' },
];

function isUltrasoundOrganId(value: string | null): value is UltrasoundOrganId {
  return Boolean(value && VALID_ORGAN_IDS.has(value as UltrasoundOrganId));
}

export function UltrasoundReferencePage() {
  const reduceMotion = useReducedMotion();
  const [searchParams, setSearchParams] = useSearchParams();
  const [species, setSpecies] = useState<UltrasoundSpecies>('dog');
  const [lifeStage, setLifeStage] = useState<UltrasoundLifeStage>('adult');
  const [weightInput, setWeightInput] = useState('');
  const [organQuery, setOrganQuery] = useState('');
  const filteredOrgans = useMemo(() => {
    const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
    const terms = normalize(organQuery).split(/\s+/).filter(Boolean);
    const aliases: Partial<Record<UltrasoundOrganId, string>> = {
      kidneys: 'rim renal', adrenals: 'adrenal suprarrenal suprarrenais',
      'small-intestine': 'duodeno jejuno ileo', colon: 'intestino grosso',
      'lymph-nodes': 'linfonodo ganglio ganglios', heart: 'cardiaco',
    };
    return ULTRASOUND_ORGANS.filter((organ) => {
      const text = normalize([organ.name, aliases[organ.id] ?? ''].join(' '));
      return terms.every((term) => text.includes(term));
    });
  }, [organQuery]);
  const weightKg = Number(weightInput.replace(',', '.'));
  const validWeightKg = weightInput.trim() !== '' && Number.isFinite(weightKg) && weightKg > 0 ? weightKg : undefined;
  const organParam = searchParams.get('orgao');
  const selectedOrganId = isUltrasoundOrganId(organParam) ? organParam : null;
  const selectedOrgan = selectedOrganId ? getUltrasoundOrgan(selectedOrganId) : null;

  const visibleValues = useMemo(
    () =>
      selectedOrganId
        ? getUltrasoundReferenceValues(selectedOrganId, species, lifeStage)
        : [],
    [lifeStage, selectedOrganId, species]
  );

  const qualitativeFindings = selectedOrganId
    ? getUltrasoundQualitativeFindings(selectedOrganId, species, lifeStage)
    : [];

  const evidenceGap = selectedOrganId
    ? getUltrasoundEvidenceGap(selectedOrganId, species, lifeStage)
    : undefined;

  const openOrgan = (organId: UltrasoundOrganId) => {
    setSearchParams({ orgao: organId });
  };

  const closeOrgan = () => {
    setSearchParams({});
  };

  return (
    <div className="mx-auto w-full max-w-[1360px] space-y-6 p-4 md:p-8">
      <nav
        className="consulta-vet-breadcrumb flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground"
        aria-label="Navegação estrutural"
      >
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">
          Início
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <Link to="/consulta-vet/referencias-rapidas" className="transition-colors hover:text-primary">
          Referências clínicas
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <span className="text-foreground">Ultrassom</span>
        {selectedOrgan ? (
          <>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <span className="text-foreground">{selectedOrgan.name}</span>
          </>
        ) : null}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          to="/consulta-vet/referencias-rapidas"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Voltar aos mini-apps"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <ConsultaVetPageHero
            title="Ultrassom: medidas e interpretação"
            description="Consulte medidas e entenda os termos dos laudos, seus mecanismos e diferenciais. Escolha uma estrutura e a espécie; as medidas também permitem filtrar a fase de vida."
            icon={ScanLine}
            accent="cyan"
            compact
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {selectedOrgan ? (
          <motion.main
            key={selectedOrgan.id}
            initial={reduceMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <section className="rounded-3xl border border-border/70 bg-card p-4 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <button
                    type="button"
                    onClick={closeOrgan}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Voltar à lista de órgãos"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
                      Órgão selecionado
                    </p>
                    <h2 className="mt-1 text-2xl font-black tracking-tight text-foreground">{selectedOrgan.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{selectedOrgan.description}</p>
                    <a href="#interpretar-laudo" className="mt-3 inline-flex rounded-xl bg-primary/10 px-3 py-2 text-sm font-bold text-primary hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Interpretar alterações do laudo ↓</a>
                  </div>
                </div>

                <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-[620px]">
                  <fieldset>
                    <legend className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Espécie
                    </legend>
                    <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-muted/50 p-1.5">
                      {SPECIES_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setSpecies(option.id)}
                            className={cn(
                              'flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-extrabold transition',
                              species === option.id
                                ? 'bg-background text-foreground shadow-sm ring-1 ring-border/70'
                                : 'text-muted-foreground hover:text-foreground'
                            )}
                            aria-pressed={species === option.id}
                          >
                            <Icon className="h-4 w-4" aria-hidden />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Fase de vida
                    </legend>
                    <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-muted/50 p-1.5">
                      {LIFE_STAGE_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setLifeStage(option.id)}
                          title={option.description}
                          className={cn(
                            'flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-extrabold transition',
                            lifeStage === option.id
                              ? 'bg-background text-foreground shadow-sm ring-1 ring-border/70'
                              : 'text-muted-foreground hover:text-foreground'
                          )}
                          aria-pressed={lifeStage === option.id}
                        >
                          {option.id === 'young' ? <Baby className="h-4 w-4" aria-hidden /> : <Activity className="h-4 w-4" aria-hidden />}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  {selectedOrgan.id === 'heart' && species === 'dog' && lifeStage === 'adult' ? (
                    <label className="sm:col-span-2">
                      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Peso do cão para médias cardíacas (kg)</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={weightInput}
                        onChange={(event) => setWeightInput(event.target.value)}
                        placeholder="Ex.: 12,5"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </label>
                  ) : null}
                </div>
              </div>
            </section>

            {qualitativeFindings.length > 0 ? (
              <section className="rounded-3xl border border-border/70 bg-card p-4 shadow-sm sm:p-6" aria-label="Aspecto habitual no ultrassom">
                <div className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
                  <BookOpen className="h-4 w-4" aria-hidden /> Aspecto habitual
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {qualitativeFindings.map((finding) => (
                    <article key={finding.id} className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                      <h3 className="text-sm font-extrabold text-foreground">{finding.label}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{finding.finding}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <AnimatePresence mode="wait" initial={false}>
              <motion.section
                key={`${selectedOrgan.id}-${species}-${lifeStage}`}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -5 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.16 }}
                aria-live="polite"
              >
                {visibleValues.length > 0 ? (
                  <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <Table2 className="h-4 w-4 text-primary" aria-hidden />
                        <h3 className="text-sm font-extrabold text-foreground">
                          {species === 'dog' ? 'Cão' : 'Gato'} · {lifeStage === 'adult' ? 'adulto' : 'filhote'}
                        </h3>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">
                        {visibleValues.length} {visibleValues.length === 1 ? 'referência' : 'referências'}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <ReadableTable className="w-full min-w-[940px] border-collapse text-left text-xs">
                        <thead className="bg-muted/40 text-[10px] uppercase tracking-[0.13em] text-muted-foreground">
                          <tr>
                            <th className="px-4 py-3 font-extrabold sm:px-6">Estrutura / medida</th>
                            <th className="px-4 py-3 font-extrabold">População</th>
                            <th className="px-4 py-3 font-extrabold">Peso / porte</th>
                            <th className="px-4 py-3 font-extrabold">Referência</th>
                            <th className="px-4 py-3 font-extrabold sm:pr-6">Técnica e interpretação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/55">
                          {visibleValues.map((reference) => {
                            const predictedHeartMean = validWeightKg === undefined ? undefined : getDogHeartPredictedMean(reference.id, validWeightKg);
                            return (
                              <tr key={reference.id} className="align-top transition-colors hover:bg-muted/20">
                                <td className="px-4 py-4 font-bold text-foreground sm:px-6">{reference.measurement}</td>
                                <td className="px-4 py-4 leading-relaxed text-muted-foreground">{reference.population}</td>
                                <td className="px-4 py-4 leading-relaxed text-muted-foreground">{reference.weightBand}</td>
                                <td className="whitespace-nowrap px-4 py-4">
                                  <strong className="text-base font-black tabular-nums text-foreground">{reference.value}</strong>{' '}
                                  <span className="font-bold text-primary">{reference.unit}</span>
                                  {predictedHeartMean !== undefined ? (
                                    <span className="mt-1 block whitespace-normal text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                                      Para {validWeightKg!.toLocaleString('pt-BR')} kg: {predictedHeartMean.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} cm de média prevista
                                    </span>
                                  ) : null}
                                </td>
                                <td className="px-4 py-4 sm:pr-6">
                                  <p className="leading-relaxed text-muted-foreground">{reference.technique}</p>
                                  {reference.caution ? (
                                    <p className="mt-2 rounded-lg bg-amber-500/[0.08] px-2.5 py-2 text-[11px] leading-relaxed text-amber-900 dark:text-amber-200">
                                      {reference.caution}
                                    </p>
                                  ) : null}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </ReadableTable>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-amber-500/35 bg-amber-500/[0.06] p-6 sm:p-8">
                    <div className="flex max-w-3xl gap-3">
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-300" aria-hidden />
                      <div>
                        <h3 className="text-sm font-extrabold text-foreground">
                          {qualitativeFindings.length > 0 ? 'Sem limite numérico universal publicado' : 'Sem intervalo quantitativo seguro para este filtro'}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {evidenceGap ?? 'Nenhuma faixa específica foi localizada nas fontes selecionadas.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.section>
            </AnimatePresence>

            <UltrasoundReportInterpretation key={selectedOrgan.id} organ={selectedOrgan.id} species={species} />

            <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,.65fr)]">
              <div className="rounded-2xl border border-border/70 bg-card p-5">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
                  <TriangleAlert className="h-4 w-4" aria-hidden /> Pontos de interpretação
                </div>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {selectedOrgan.cautions.filter(caution => !/^(fonte|referência bibliográfica)/i.test(caution)).map((caution) => (
                    <li key={caution} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span>{caution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.06] p-5">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
                  <Ruler className="h-4 w-4" aria-hidden /> Como ler os valores
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Peso ou porte só aparece como estrato quando há dados publicados para essa separação. “Todos os pesos” significa ausência de estratificação publicada, não equivalência perfeita entre pacientes.
                </p>
              </div>
            </section>
          </motion.main>
        ) : (
          <motion.main
            key="organ-menu"
            initial={reduceMotion ? false : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 14 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <section className="rounded-3xl border border-border/70 bg-card/50 p-4 shadow-sm backdrop-blur-sm sm:p-6" aria-labelledby="organ-grid-title">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">Navegação por órgão</p>
                  <h2 id="organ-grid-title" className="mt-1 text-xl font-black tracking-tight text-foreground">Qual estrutura deseja consultar?</h2>
                </div>
              </div>

              <div className="mb-5 space-y-2">
                <label htmlFor="ultrasound-organ-search" className="block text-sm font-bold text-foreground">Pesquisar órgão</label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                  <input
                    id="ultrasound-organ-search"
                    type="search"
                    value={organQuery}
                    onChange={(event) => setOrganQuery(event.target.value)}
                    placeholder="Ex.: fígado, rim, pâncreas..."
                    aria-controls="ultrasound-organ-results"
                    className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-12 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-search-cancel-button]:appearance-none"
                  />
                  {organQuery ? <button type="button" onClick={() => setOrganQuery('')} aria-label="Limpar pesquisa" className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X className="h-4 w-4" aria-hidden /></button> : null}
                </div>
              </div>
              {filteredOrgans.length === 0 ? <p className="rounded-xl bg-muted/40 p-5 text-sm text-muted-foreground">Nenhum órgão encontrado. Tente outro nome ou limpe a pesquisa.</p> : null}
              <div id="ultrasound-organ-results" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {filteredOrgans.map((organ, index) => {
                  const hasPediatricData = organ.values.some((value) => value.lifeStage === 'young');
                  return (
                    <motion.button
                      key={organ.id}
                      type="button"
                      onClick={() => openOrgan(organ.id)}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? { duration: 0 } : { delay: index * 0.025, duration: 0.2 }}
                      className="group relative min-h-[142px] overflow-hidden rounded-2xl border border-border/65 bg-background/70 p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transform-none"
                    >
                      <span className="flex h-28 w-full items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/[0.06] to-transparent sm:h-32">
                        <img
                          src={`/assets/consulta-vet/ultrasound-organs/${organ.id}.png`}
                          alt=""
                          width={160}
                          height={160}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain p-1 transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none"
                        />
                      </span>
                      <span className="mt-4 block text-sm font-extrabold text-foreground">{organ.name}</span>
                      <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">{organ.description}</span>
                      {hasPediatricData ? (
                        <span className="absolute right-3 top-3 rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
                          Filhote
                        </span>
                      ) : null}
                    </motion.button>
                  );
                })}
              </div>
            </section>

            <div className="flex gap-3 rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.06] p-4 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700 dark:text-cyan-300" aria-hidden />
              <p className="leading-relaxed">
                O selo <strong className="text-foreground">Filhote</strong> indica dado pediátrico publicado — atualmente restrito ao intestino delgado de Beagles de 7–12 semanas. Nos demais filtros pediátricos, o app informa a lacuna diretamente.
              </p>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      <section className="rounded-3xl border border-border/70 bg-card/45 p-5 backdrop-blur-sm sm:p-6" aria-labelledby="ultrasound-sources-title">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" aria-hidden />
          <h2 id="ultrasound-sources-title" className="text-xs font-extrabold uppercase tracking-[0.18em] text-muted-foreground">
            Referências
          </h2>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[...Object.values(ULTRASOUND_SOURCES).map(source => source.title), ...ULTRASOUND_COMPLEMENTARY_BOOKS].map((title) => (
            <article key={title} className="rounded-2xl border border-border/60 bg-background/55 p-4">
              <p className="text-sm font-extrabold text-foreground">{title}</p>
              
            </article>
          ))}
        </div>
        <details className="mt-4 rounded-xl border border-border/60 p-4">
          <summary className="cursor-pointer text-sm font-bold text-primary">Créditos das imagens de acesso aberto</summary>
          <div className="mt-4 space-y-4">{ULTRASOUND_ORGANS.map(organ => {
            const image = ULTRASOUND_CLINICAL_IMAGES[organ.id];
            return <article key={organ.id} className="text-xs leading-relaxed text-muted-foreground"><p className="font-bold text-foreground">{organ.name} · {image.author}</p><a href={image.article} target="_blank" rel="noreferrer" className="text-primary underline">{image.title}</a><p><a href={image.licenseUrl} target="_blank" rel="noreferrer" className="text-primary underline">{image.license}</a> · {image.changes}</p></article>;
          })}</div>
        </details>
        <div className="mt-4 flex gap-2 rounded-xl bg-muted/45 p-3 text-[11px] leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>Ferramenta de consulta rápida. Medidas isoladas não substituem exame completo, correlação clínica, laudo do imaginologista ou amostragem quando indicada.</span>
        </div>
      </section>
    </div>
  );
}
