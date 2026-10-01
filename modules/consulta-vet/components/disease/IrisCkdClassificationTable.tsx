import { ReadableTable } from '../shared/ReadableTable';
import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  Droplets,
  ExternalLink,
  Gauge,
  HeartPulse,
  Info,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../../../lib/utils';

type Species = 'dog' | 'cat';
type CreatinineUnit = 'mgdl' | 'umol';

interface IrisCkdClassificationTableProps {
  defaultSpecies?: Species;
  className?: string;
}

const STAGES = [
  {
    number: 1,
    title: 'Estágio 1',
    label: 'Não azotêmico',
    tone: 'border-sky-400/40 bg-sky-500/10 text-sky-950 dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-100',
    activeHeaderClass: 'bg-sky-600 text-white dark:bg-sky-600',
    activeCellClass: 'bg-sky-500/20 font-bold text-sky-950 dark:bg-sky-900/40 dark:text-sky-100 ring-2 ring-sky-500',
    description: 'Néfrons funcionais reduzidos, rim incapaz de concentrar urina ou proteinúria glomerular, mas creatinina ainda normal.',
  },
  {
    number: 2,
    title: 'Estágio 2',
    label: 'Azotemia leve',
    tone: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-100',
    activeHeaderClass: 'bg-emerald-600 text-white dark:bg-emerald-600',
    activeCellClass: 'bg-emerald-500/20 font-bold text-emerald-950 dark:bg-emerald-900/40 dark:text-emerald-100 ring-2 ring-emerald-500',
    description: 'Azotemia renal inicial. Sintomas clínicos discretos ou ausentes; início da perda de capacidade compensatória.',
  },
  {
    number: 3,
    title: 'Estágio 3',
    label: 'Azotemia moderada',
    tone: 'border-amber-400/40 bg-amber-500/10 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-100',
    activeHeaderClass: 'bg-amber-600 text-white dark:bg-amber-600',
    activeCellClass: 'bg-amber-500/20 font-bold text-amber-950 dark:bg-amber-900/40 dark:text-amber-100 ring-2 ring-amber-500',
    description: 'Sinais urêmicos clínicos evidentes (náusea, vômitos, perda de peso, anemia, hiperfosfatemia e acidose).',
  },
  {
    number: 4,
    title: 'Estágio 4',
    label: 'Azotemia grave',
    tone: 'border-rose-400/40 bg-rose-500/10 text-rose-950 dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-100',
    activeHeaderClass: 'bg-rose-600 text-white dark:bg-rose-600',
    activeCellClass: 'bg-rose-500/20 font-bold text-rose-950 dark:bg-rose-900/40 dark:text-rose-100 ring-2 ring-rose-500',
    description: 'Crise urêmica sistêmica grave. Risco iminente de óbito; prioridade para conforto, nutrição e qualidade de vida.',
  },
] as const;

function convertToMgDl(val: number, unit: CreatinineUnit): number {
  if (!Number.isFinite(val) || val <= 0) return 0;
  return unit === 'umol' ? val / 88.4 : val;
}

function classifyStageByCreatinine(species: Species, crMgDl: number): number {
  if (species === 'cat') {
    if (crMgDl < 1.6) return 1;
    if (crMgDl <= 2.8) return 2;
    if (crMgDl <= 5.0) return 3;
    return 4;
  }
  if (crMgDl < 1.4) return 1;
  if (crMgDl <= 2.8) return 2;
  if (crMgDl <= 5.0) return 3;
  return 4;
}

function classifyStageBySdma(species: Species, sdma: number): number | null {
  if (!Number.isFinite(sdma) || sdma <= 0) return null;
  if (species === 'cat') {
    if (sdma < 18) return 1;
    if (sdma <= 25) return 2;
    if (sdma <= 38) return 3;
    return 4;
  }
  if (sdma < 18) return 1;
  if (sdma <= 35) return 2;
  if (sdma <= 54) return 3;
  return 4;
}

export function IrisCkdClassificationTable({
  defaultSpecies = 'dog',
  className = '',
}: IrisCkdClassificationTableProps) {
  const [species, setSpecies] = useState<Species>(defaultSpecies);
  const [creatinine, setCreatinine] = useState('2.2');
  const [unit, setUnit] = useState<CreatinineUnit>('mgdl');
  const [sdma, setSdma] = useState('22');
  const [upc, setUpc] = useState('0.3');
  const [sbp, setSbp] = useState('145');
  const [isStable, setIsStable] = useState(true);
  const [preRenalExcluded, setPreRenalExcluded] = useState(true);
  const [postRenalExcluded, setPostRenalExcluded] = useState(true);
  const [hasTod, setHasTod] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const crValue = Number(creatinine.replace(',', '.'));
  const crMgDl = convertToMgDl(crValue, unit);
  const sdmaValue = Number(sdma.replace(',', '.'));
  const upcValue = Number(upc.replace(',', '.'));
  const sbpValue = Number(sbp.replace(',', '.'));

  const crStage = classifyStageByCreatinine(species, crMgDl);
  const sdmaStage = classifyStageBySdma(species, sdmaValue);
  const calculatedStage = sdmaStage ? Math.max(crStage, sdmaStage) : crStage;

  const isEligibleToStage = isStable && preRenalExcluded && postRenalExcluded;

  const proteinuriaSubstage = useMemo(() => {
    if (!Number.isFinite(upcValue) || upcValue < 0) return { key: 'unknown', label: 'Não informada', abbr: '—' };
    if (upcValue < 0.2) return { key: 'NP', label: 'Não proteinúrico', abbr: 'NP', tone: 'text-emerald-700 dark:text-emerald-300' };
    const limit = species === 'cat' ? 0.4 : 0.5;
    if (upcValue <= limit) return { key: 'PL', label: 'Proteinúria limítrofe', abbr: 'PL', tone: 'text-amber-700 dark:text-amber-300' };
    return { key: 'P', label: 'Proteinúrico', abbr: 'P', tone: 'text-rose-700 dark:text-rose-300' };
  }, [upcValue, species]);

  const bloodPressureSubstage = useMemo(() => {
    if (!Number.isFinite(sbpValue) || sbpValue <= 0) return { key: 'unknown', label: 'Não informada', risk: '—' };
    if (sbpValue < 140) return { key: 'normo', label: 'Normotenso', risk: 'Mínimo', tone: 'text-emerald-700 dark:text-emerald-300' };
    if (sbpValue < 160) return { key: 'pre', label: 'Pré-hipertenso', risk: 'Baixo', tone: 'text-sky-700 dark:text-sky-300' };
    if (sbpValue < 180) {
      return {
        key: 'hyper',
        label: hasTod ? 'Hipertenso com lesão em órgão-alvo' : 'Hipertenso',
        risk: 'Moderado',
        tone: 'text-amber-700 dark:text-amber-300',
      };
    }
    return {
      key: 'severe',
      label: hasTod ? 'Hipertensão severa com lesão em órgão-alvo' : 'Hipertensão severa',
      risk: 'Alto',
      tone: 'text-rose-700 dark:text-rose-300',
    };
  }, [sbpValue, hasTod]);

  const phosphorusTarget = useMemo(() => {
    switch (calculatedStage) {
      case 1:
        return '2,5 a 4,5 mg/dL (avaliar tendência basal e causa)';
      case 2:
        return species === 'cat' ? '2,5 a 4,6 mg/dL (< 4,6 mg/dL)' : '2,5 a 4,5 mg/dL (< 4,5 mg/dL)';
      case 3:
        return '2,5 a 5,0 mg/dL (< 5,0 mg/dL)';
      case 4:
      default:
        return '2,5 a 6,0 mg/dL (< 6,0 mg/dL; priorizar aceitação alimentar e qualidade de vida)';
    }
  }, [calculatedStage, species]);

  const classificationSummaryText = isEligibleToStage
    ? `Classificação IRIS DRC: Estágio ${calculatedStage} | Subestádio RPCU: ${proteinuriaSubstage.abbr} (${proteinuriaSubstage.label}) | PA: ${bloodPressureSubstage.label} (PAS ${sbpValue || '—'} mmHg) | Alvo Fósforo: ${phosphorusTarget}`
    : 'Paciente instável/desidratado: adiar estadiamento IRIS definitivo até estabilização e euvolemia.';

  const handleCopy = () => {
    navigator.clipboard.writeText(classificationSummaryText);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <section
      aria-label="Tabelas de Estadiamento e Classificação IRIS de DRC"
      className={cn(
        'my-8 overflow-hidden rounded-[26px] border border-border/80 bg-card p-4 shadow-sm md:p-7',
        className
      )}
    >
      <div className="flex flex-col gap-3 border-b border-border/70 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Gauge className="h-4 w-4" />
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Consenso Internacional IRIS
            </p>
          </div>
          <h3 className="mt-1 text-xl font-extrabold text-foreground md:text-2xl">
            Tabelas Funcionais de Estadiamento e Classificação da DRC
          </h3>
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">
            Tabelas oficiais dinâmicas com destaque em tempo real do estágio e subestágios conforme dados do paciente.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
          >
            <Clipboard className="h-3.5 w-3.5" />
            {hasCopied ? 'Copiado!' : 'Copiar Classificação'}
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border/70 bg-muted/[0.08] p-4 md:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          1. Painel de Entrada do Paciente (Interativo)
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Espécie</span>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value as Species)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
            >
              <option value="dog">🐶 Cão</option>
              <option value="cat">🐱 Gato</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Creatinina</span>
            <input
              type="text"
              inputMode="decimal"
              value={creatinine}
              onChange={(e) => setCreatinine(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
              placeholder="ex: 2.2"
            />
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Unidade</span>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as CreatinineUnit)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
            >
              <option value="mgdl">mg/dL</option>
              <option value="umol">µmol/L</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">SDMA (µg/dL)</span>
            <input
              type="text"
              inputMode="decimal"
              value={sdma}
              onChange={(e) => setSdma(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
              placeholder="ex: 22"
            />
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">RPCU (UPC)</span>
            <input
              type="text"
              inputMode="decimal"
              value={upc}
              onChange={(e) => setUpc(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
              placeholder="ex: 0.3"
            />
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">PAS (mmHg)</span>
            <input
              type="text"
              inputMode="numeric"
              value={sbp}
              onChange={(e) => setSbp(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
              placeholder="ex: 145"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 pt-2 text-xs">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 transition hover:bg-muted/50">
            <input
              type="checkbox"
              checked={isStable}
              onChange={(e) => setIsStable(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-medium text-foreground">Paciente hidratado e estável</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 transition hover:bg-muted/50">
            <input
              type="checkbox"
              checked={preRenalExcluded}
              onChange={(e) => setPreRenalExcluded(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-medium text-foreground">Causas pré-renais excluídas</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 transition hover:bg-muted/50">
            <input
              type="checkbox"
              checked={postRenalExcluded}
              onChange={(e) => setPostRenalExcluded(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-medium text-foreground">Causas pós-renais excluídas</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 transition hover:bg-muted/50">
            <input
              type="checkbox"
              checked={hasTod}
              onChange={(e) => setHasTod(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-medium text-foreground">Lesão em órgão-alvo (TOD) presente</span>
          </label>
        </div>
      </div>

      {!isEligibleToStage && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/[0.08] p-4 text-xs leading-relaxed text-amber-950 dark:text-amber-100 md:text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p>
            <strong>Alerta Oficial IRIS:</strong> O estadiamento da DRC só deve ser aplicado após confirmação inequívoca de cronicidade, paciente euvolêmico e clinicamente estável. Em caso de desidratação, hipovolemia ou obstrução, estabilize o paciente antes de concluir o estadiamento definitivo.
          </p>
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-primary/25 bg-primary/[0.04] p-4 md:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Resultado da Classificação IRIS
              </p>
              <h4 className="text-lg font-black text-foreground md:text-xl">
                {isEligibleToStage ? `DRC Estágio ${calculatedStage}` : 'Estadiamento Adiado (Instabilidade)'}
                <span className="ml-2 text-xs font-semibold text-muted-foreground">
                  ({species === 'dog' ? 'Espécie Canina' : 'Espécie Felina'})
                </span>
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('rounded-lg px-2.5 py-1 text-xs font-bold ring-1 ring-border/50', STAGES[calculatedStage - 1].tone)}>
              {STAGES[calculatedStage - 1].label}
            </span>
            <span className="rounded-lg bg-background px-2.5 py-1 text-xs font-bold text-foreground ring-1 ring-border">
              RPCU: {proteinuriaSubstage.abbr}
            </span>
            <span className="rounded-lg bg-background px-2.5 py-1 text-xs font-bold text-foreground ring-1 ring-border">
              PA: {bloodPressureSubstage.risk} risco
            </span>
          </div>
        </div>

        <div className="mt-3 grid gap-2 border-t border-border/50 pt-3 text-xs md:grid-cols-2 md:text-sm">
          <p className="text-foreground/90">
            <strong>Creatinina avaliada:</strong> {crMgDl.toFixed(2)} mg/dL ({unit === 'umol' ? `${crValue} µmol/L` : `${Math.round(crMgDl * 88.4)} µmol/L`}) → Estágio {crStage}
          </p>
          <p className="text-foreground/90">
            <strong>SDMA avaliado:</strong> {sdmaValue ? `${sdmaValue} µg/dL → Estágio ${sdmaStage ?? '—'}` : 'Não informado'}
          </p>
          <p className="text-foreground/90">
            <strong>Subestádio de Proteinúria:</strong> {proteinuriaSubstage.label} (RPCU {upcValue || '—'})
          </p>
          <p className="text-foreground/90">
            <strong>Subestádio Pressórico:</strong> {bloodPressureSubstage.label} (PAS {sbpValue || '—'} mmHg)
          </p>
          <p className="text-foreground/90 md:col-span-2">
            <strong>Alvo Terapêutico de Fósforo Sérico:</strong> {phosphorusTarget}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
            Tabela 1 — Estadiamento IRIS de DRC por Creatinina e SDMA (Cães e Gatos)
          </h4>
          <p className="text-xs text-muted-foreground">
            A coluna correspondente ao estágio do paciente está destacada em tempo real. Clique em qualquer coluna para alternar o estágio.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/80 bg-background">
          <ReadableTable className="w-full min-w-[700px] border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-border/80 bg-muted/60">
                <th className="px-4 py-3 font-bold text-muted-foreground">Marcador / Espécie</th>
                {STAGES.map((s) => {
                  const isActive = isEligibleToStage && calculatedStage === s.number;
                  return (
                    <th
                      key={s.number}
                      onClick={() => setCreatinine(s.number === 1 ? '1.0' : s.number === 2 ? '2.0' : s.number === 3 ? '3.5' : '6.0')}
                      className={cn(
                        'cursor-pointer px-4 py-3 text-center transition',
                        isActive ? s.activeHeaderClass : 'text-foreground hover:bg-muted/80'
                      )}
                    >
                      <div className="font-extrabold">{s.title}</div>
                      <div className="text-[11px] opacity-80">{s.label}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-foreground">
                  Creatinina (mg/dL) — 🐶 Cão
                </td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 1 && species === 'dog' && 'font-bold bg-primary/10 text-primary')}>&lt; 1,4</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 2 && species === 'dog' && 'font-bold bg-primary/10 text-primary')}>1,4 a 2,8</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 3 && species === 'dog' && 'font-bold bg-primary/10 text-primary')}>2,9 a 5,0</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 4 && species === 'dog' && 'font-bold bg-primary/10 text-primary')}>&gt; 5,0</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-foreground">
                  Creatinina (mg/dL) — 🐱 Gato
                </td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 1 && species === 'cat' && 'font-bold bg-primary/10 text-primary')}>&lt; 1,6</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 2 && species === 'cat' && 'font-bold bg-primary/10 text-primary')}>1,6 a 2,8</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 3 && species === 'cat' && 'font-bold bg-primary/10 text-primary')}>2,9 a 5,0</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 4 && species === 'cat' && 'font-bold bg-primary/10 text-primary')}>&gt; 5,0</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-foreground">
                  Creatinina (µmol/L) — Cão / Gato
                </td>
                <td className="px-4 py-3 text-center tabular-nums">&lt; 125 (cão) / &lt; 140 (gato)</td>
                <td className="px-4 py-3 text-center tabular-nums">125 a 250 (cão) / 140 a 250 (gato)</td>
                <td className="px-4 py-3 text-center tabular-nums">251 a 440</td>
                <td className="px-4 py-3 text-center tabular-nums">&gt; 440</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-foreground">
                  SDMA (µg/dL) — 🐶 Cão
                </td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 1 && species === 'dog' && 'font-bold bg-primary/10 text-primary')}>&lt; 18</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 2 && species === 'dog' && 'font-bold bg-primary/10 text-primary')}>18 a 35</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 3 && species === 'dog' && 'font-bold bg-primary/10 text-primary')}>36 a 54</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 4 && species === 'dog' && 'font-bold bg-primary/10 text-primary')}>&gt; 54</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-foreground">
                  SDMA (µg/dL) — 🐱 Gato
                </td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 1 && species === 'cat' && 'font-bold bg-primary/10 text-primary')}>&lt; 18</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 2 && species === 'cat' && 'font-bold bg-primary/10 text-primary')}>18 a 25</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 3 && species === 'cat' && 'font-bold bg-primary/10 text-primary')}>26 a 38</td>
                <td className={cn('px-4 py-3 text-center tabular-nums', isEligibleToStage && calculatedStage === 4 && species === 'cat' && 'font-bold bg-primary/10 text-primary')}>&gt; 38</td>
              </tr>
            </tbody>
          </ReadableTable>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
              Tabela 2 — Subestadiamento IRIS por Proteinúria (RPCU)
            </h4>
            <p className="text-xs text-muted-foreground">
              Relação proteína/creatinina urinária em urina não inflamada/sem sangue.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/80 bg-background">
            <ReadableTable className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border/80 bg-muted/60">
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Subestádio</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">🐶 Cão</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">🐱 Gato</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Conduta IRIS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr
                  onClick={() => setUpc('0.1')}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    proteinuriaSubstage.key === 'NP' && 'bg-emerald-500/15 font-bold text-emerald-950 dark:text-emerald-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 font-semibold">Não proteinúrico (NP)</td>
                  <td className="px-3.5 py-2.5 tabular-nums">&lt; 0,2</td>
                  <td className="px-3.5 py-2.5 tabular-nums">&lt; 0,2</td>
                  <td className="px-3.5 py-2.5">Monitoramento de rotina</td>
                </tr>
                <tr
                  onClick={() => setUpc(species === 'cat' ? '0.3' : '0.35')}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    proteinuriaSubstage.key === 'PL' && 'bg-amber-500/15 font-bold text-amber-950 dark:text-amber-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 font-semibold">Proteinúria limítrofe (PL)</td>
                  <td className="px-3.5 py-2.5 tabular-nums">0,2 a 0,5</td>
                  <td className="px-3.5 py-2.5 tabular-nums">0,2 a 0,4</td>
                  <td className="px-3.5 py-2.5">Reavaliar em 2 meses</td>
                </tr>
                <tr
                  onClick={() => setUpc('0.8')}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    proteinuriaSubstage.key === 'P' && 'bg-rose-500/15 font-bold text-rose-950 dark:text-rose-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 font-semibold">Proteinúrico (P)</td>
                  <td className="px-3.5 py-2.5 tabular-nums">&gt; 0,5</td>
                  <td className="px-3.5 py-2.5 tabular-nums">&gt; 0,4</td>
                  <td className="px-3.5 py-2.5">Investigar e tratar (IECA/BRA)</td>
                </tr>
              </tbody>
            </ReadableTable>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
              Tabela 3 — Subestadiamento IRIS por Pressão Arterial Sistólica (PAS)
            </h4>
            <p className="text-xs text-muted-foreground">
              Classificação pelo risco de lesão em órgão-alvo (olhos, encéfalo, coração e rins).
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/80 bg-background">
            <ReadableTable className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border/80 bg-muted/60">
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">PAS (mmHg)</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Subestádio</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Risco TOD</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Conduta IRIS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr
                  onClick={() => setSbp('125')}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    bloodPressureSubstage.key === 'normo' && 'bg-emerald-500/15 font-bold text-emerald-950 dark:text-emerald-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 tabular-nums">&lt; 140</td>
                  <td className="px-3.5 py-2.5 font-semibold">Normotenso</td>
                  <td className="px-3.5 py-2.5">Mínimo</td>
                  <td className="px-3.5 py-2.5">Monitorar em consultas</td>
                </tr>
                <tr
                  onClick={() => setSbp('150')}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    bloodPressureSubstage.key === 'pre' && 'bg-sky-500/15 font-bold text-sky-950 dark:text-sky-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 tabular-nums">140 a 159</td>
                  <td className="px-3.5 py-2.5 font-semibold">Pré-hipertenso</td>
                  <td className="px-3.5 py-2.5">Baixo</td>
                  <td className="px-3.5 py-2.5">Reavaliar periodicamente</td>
                </tr>
                <tr
                  onClick={() => setSbp('170')}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    bloodPressureSubstage.key === 'hyper' && 'bg-amber-500/15 font-bold text-amber-950 dark:text-amber-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 tabular-nums">160 a 179</td>
                  <td className="px-3.5 py-2.5 font-semibold">Hipertenso</td>
                  <td className="px-3.5 py-2.5">Moderado</td>
                  <td className="px-3.5 py-2.5">Tratar se persistente/TOD</td>
                </tr>
                <tr
                  onClick={() => setSbp('190')}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    bloodPressureSubstage.key === 'severe' && 'bg-rose-500/15 font-bold text-rose-950 dark:text-rose-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 tabular-nums">≥ 180</td>
                  <td className="px-3.5 py-2.5 font-semibold">Gravemente hipertenso</td>
                  <td className="px-3.5 py-2.5">Alto</td>
                  <td className="px-3.5 py-2.5">Tratar com prioridade</td>
                </tr>
              </tbody>
            </ReadableTable>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
            Tabela 4 — Alvos Terapêuticos de Fósforo Sérico por Estágio IRIS
          </h4>
          <p className="text-xs text-muted-foreground">
            Metas oficiais para prevenção e controle do Hiperparatireoidismo Secundário Renal (CKD-MBD).
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/80 bg-background">
          <ReadableTable className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-border/80 bg-muted/60">
                <th className="px-4 py-3 font-bold text-muted-foreground">Estágio IRIS</th>
                <th className="px-4 py-3 font-bold text-muted-foreground">Fósforo Sérico Alvo</th>
                <th className="px-4 py-3 font-bold text-muted-foreground">Conduta Nutricional e Terapêutica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr className={cn('hover:bg-muted/30 transition', isEligibleToStage && calculatedStage === 1 && 'bg-primary/10 font-bold')}>
                <td className="px-4 py-3 font-semibold">Estágio 1</td>
                <td className="px-4 py-3 tabular-nums">2,5 a 4,5 mg/dL</td>
                <td className="px-4 py-3">Avaliar tendência e causa subjacente; transição para dieta preventiva se tendência de alta</td>
              </tr>
              <tr className={cn('hover:bg-muted/30 transition', isEligibleToStage && calculatedStage === 2 && 'bg-primary/10 font-bold')}>
                <td className="px-4 py-3 font-semibold">Estágio 2</td>
                <td className="px-4 py-3 tabular-nums">2,5 a 4,5 mg/dL (cão) / 2,5 a 4,6 mg/dL (gato)</td>
                <td className="px-4 py-3">Dieta renal coadjuvante restrita em fósforo; adicionar quelante entérico se permanecer &gt; alvo</td>
              </tr>
              <tr className={cn('hover:bg-muted/30 transition', isEligibleToStage && calculatedStage === 3 && 'bg-primary/10 font-bold')}>
                <td className="px-4 py-3 font-semibold">Estágio 3</td>
                <td className="px-4 py-3 tabular-nums">2,5 a 5,0 mg/dL</td>
                <td className="px-4 py-3">Dieta renal mandatória associada a quelante de fósforo (carbonato de cálcio ou sevelâmer) nas refeições</td>
              </tr>
              <tr className={cn('hover:bg-muted/30 transition', isEligibleToStage && calculatedStage === 4 && 'bg-primary/10 font-bold')}>
                <td className="px-4 py-3 font-semibold">Estágio 4</td>
                <td className="px-4 py-3 tabular-nums">2,5 a 6,0 mg/dL</td>
                <td className="px-4 py-3">Meta pragmática priorizando ingestão calórica e qualidade de vida; quelante administrado com alimento</td>
              </tr>
            </tbody>
          </ReadableTable>
        </div>
      </div>
    </section>
  );
}

export { IrisCkdClassificationTable as CKDStagingCalculator };
