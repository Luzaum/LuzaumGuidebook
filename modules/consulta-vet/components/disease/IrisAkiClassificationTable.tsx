import { ReadableTable } from '../shared/ReadableTable';
import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  Droplets,
  ExternalLink,
  Flame,
  Gauge,
  HeartPulse,
  Info,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { cn } from '../../../../lib/utils';

type Species = 'dog' | 'cat';
type CreatinineUnit = 'mgdl' | 'umol';
type UrineOutputMode = 'normal' | 'oliguric' | 'anuric' | 'custom';
type VolemicStatus = 'euvolemic' | 'dehydrated' | 'overloaded';

interface IrisAkiClassificationTableProps {
  defaultSpecies?: Species;
  className?: string;
}

const AKI_GRADES = [
  {
    grade: 'I',
    title: 'Grau I',
    label: 'Não-azotêmico',
    tone: 'border-sky-400/40 bg-sky-500/10 text-sky-950 dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-100',
    activeHeaderClass: 'bg-sky-600 text-white dark:bg-sky-600',
    activeCellClass: 'bg-sky-500/20 font-bold text-sky-950 dark:bg-sky-900/40 dark:text-sky-100 ring-2 ring-sky-500',
    severity: 'Lesão precoce / subclínica',
    crMgDl: '< 1,6 mg/dL',
    crUmol: '< 140 µmol/L',
    kinetics: 'Aumento agudo ≥ 0,3 mg/dL em 48h OU oligúria documentada (< 1 mL/kg/h por 6h) OU nefrotoxina documentada',
  },
  {
    grade: 'II',
    title: 'Grau II',
    label: 'Azotemia leve',
    tone: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-100',
    activeHeaderClass: 'bg-emerald-600 text-white dark:bg-emerald-600',
    activeCellClass: 'bg-emerald-500/20 font-bold text-emerald-950 dark:bg-emerald-900/40 dark:text-emerald-100 ring-2 ring-emerald-500',
    severity: 'Lesão renal aguda leve',
    crMgDl: '1,6 a 2,8 mg/dL',
    crUmol: '141 a 247 µmol/L',
    kinetics: 'Azotemia leve de instalação aguda ou piora documentada sobre função basal',
  },
  {
    grade: 'III',
    title: 'Grau III',
    label: 'Azotemia moderada',
    tone: 'border-amber-400/40 bg-amber-500/10 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-100',
    activeHeaderClass: 'bg-amber-600 text-white dark:bg-amber-600',
    activeCellClass: 'bg-amber-500/20 font-bold text-amber-950 dark:bg-amber-900/40 dark:text-amber-100 ring-2 ring-amber-500',
    severity: 'Lesão renal moderada',
    crMgDl: '2,9 a 5,0 mg/dL',
    crUmol: '248 a 442 µmol/L',
    kinetics: 'Azotemia moderada; uremia em evolução; desregulação hidroeletrolítica frequente',
  },
  {
    grade: 'IV',
    title: 'Grau IV',
    label: 'Azotemia grave',
    tone: 'border-rose-400/40 bg-rose-500/10 text-rose-950 dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-100',
    activeHeaderClass: 'bg-rose-600 text-white dark:bg-rose-600',
    activeCellClass: 'bg-rose-500/20 font-bold text-rose-950 dark:bg-rose-900/40 dark:text-rose-100 ring-2 ring-rose-500',
    severity: 'Lesão renal grave',
    crMgDl: '5,1 a 10,0 mg/dL',
    crUmol: '443 a 884 µmol/L',
    kinetics: 'Azotemia severa; sinais sistêmicos urêmicos marcantes (gastrite, hipercalemia, acidose)',
  },
  {
    grade: 'V',
    title: 'Grau V',
    label: 'Falência crítica',
    tone: 'border-purple-400/40 bg-purple-500/10 text-purple-950 dark:border-purple-500/30 dark:bg-purple-950/40 dark:text-purple-100',
    activeHeaderClass: 'bg-purple-600 text-white dark:bg-purple-600',
    activeCellClass: 'bg-purple-500/20 font-bold text-purple-950 dark:bg-purple-900/40 dark:text-purple-100 ring-2 ring-purple-500',
    severity: 'Falência renal aguda crítica',
    crMgDl: '> 10,0 mg/dL',
    crUmol: '> 884 µmol/L',
    kinetics: 'Altíssimo risco vital; indicação formal de suporte dialítico imediato (IHD / CRRT / DP)',
  },
] as const;

function convertToMgDl(val: number, unit: CreatinineUnit): number {
  if (!Number.isFinite(val) || val <= 0) return 0;
  return unit === 'umol' ? val / 88.4 : val;
}

export function IrisAkiClassificationTable({
  defaultSpecies = 'dog',
  className = '',
}: IrisAkiClassificationTableProps) {
  const [species, setSpecies] = useState<Species>(defaultSpecies);
  const [weightKg, setWeightKg] = useState('15');
  const [creatinine, setCreatinine] = useState('3.4');
  const [unit, setUnit] = useState<CreatinineUnit>('mgdl');
  const [hasKineticRise, setHasKineticRise] = useState(true);
  const [urineOutputMode, setUrineOutputMode] = useState<UrineOutputMode>('oliguric');
  const [customUo, setCustomUo] = useState('0.6');
  const [requiresRrt, setRequiresRrt] = useState(false);
  const [sbp, setSbp] = useState('165');
  const [volemicStatus, setVolemicStatus] = useState<VolemicStatus>('euvolemic');
  const [serumPotassium, setSerumPotassium] = useState('5.8');
  const [hasCopied, setHasCopied] = useState(false);

  const crValue = Number(creatinine.replace(',', '.'));
  const crMgDl = convertToMgDl(crValue, unit);
  const weight = Number(weightKg.replace(',', '.')) || (species === 'dog' ? 15 : 4);
  const sbpValue = Number(sbp.replace(',', '.'));
  const kValue = Number(serumPotassium.replace(',', '.'));

  const urineOutputMlKgH = useMemo(() => {
    if (urineOutputMode === 'anuric') return 0;
    if (urineOutputMode === 'oliguric') return 0.5;
    if (urineOutputMode === 'normal') return 2.0;
    const val = Number(customUo.replace(',', '.'));
    return Number.isFinite(val) ? val : 1.5;
  }, [urineOutputMode, customUo]);

  const isOliguric = urineOutputMlKgH < 1.0;

  const calculatedGrade = useMemo(() => {
    if (crMgDl > 10.0) return 'V';
    if (crMgDl >= 5.1) return 'IV';
    if (crMgDl >= 2.9) return 'III';
    if (crMgDl >= 1.6) return 'II';
    if (hasKineticRise || isOliguric) return 'I';
    return 'I';
  }, [crMgDl, hasKineticRise, isOliguric]);

  const bloodPressureSubstage = useMemo(() => {
    if (!Number.isFinite(sbpValue) || sbpValue <= 0) return { key: 'unknown', label: 'Não informada', tone: 'text-muted-foreground' };
    if (sbpValue < 140) return { key: 'normo', label: 'Normotenso (< 140 mmHg)', tone: 'text-emerald-700 dark:text-emerald-300' };
    if (sbpValue < 160) return { key: 'pre', label: 'Pré-hipertenso (140–159 mmHg)', tone: 'text-sky-700 dark:text-sky-300' };
    if (sbpValue < 180) return { key: 'hyper', label: 'Hipertenso (160–179 mmHg)', tone: 'text-amber-700 dark:text-amber-300' };
    return { key: 'severe', label: 'Severamente Hipertenso (≥ 180 mmHg)', tone: 'text-rose-700 dark:text-rose-300' };
  }, [sbpValue]);

  const insAndOutsHourlyRate = useMemo(() => {
    const hourlyUo = urineOutputMlKgH * weight;
    const hourlyInsensible = (20 * weight) / 24;
    return Math.round((hourlyUo + hourlyInsensible) * 10) / 10;
  }, [urineOutputMlKgH, weight]);

  const isHyperkalemic = kValue >= 6.5;

  const fullClassificationLabel = `LRA IRIS Grau ${calculatedGrade} - ${isOliguric ? 'O' : 'NO'} - ${requiresRrt ? 'RRT+' : 'RRT-'} [PAS: ${bloodPressureSubstage.label}]`;

  const handleCopy = () => {
    const summary = `${fullClassificationLabel} | Espécie: ${species === 'dog' ? 'Cão' : 'Gato'} (${weight} kg) | Creatinina: ${crMgDl.toFixed(2)} mg/dL | Débito: ${urineOutputMlKgH} mL/kg/h | Ins & Outs Calculado: ${insAndOutsHourlyRate} mL/h | Volemia: ${volemicStatus} | K+: ${kValue || '—'} mmol/L`;
    navigator.clipboard.writeText(summary);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <section
      aria-label="Tabelas de Estadiamento e Classificação IRIS de Lesão Renal Aguda"
      className={cn(
        'my-8 overflow-hidden rounded-[26px] border border-border/80 bg-card p-4 shadow-sm md:p-7',
        className
      )}
    >
      <div className="flex flex-col gap-3 border-b border-border/70 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Activity className="h-4 w-4" />
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400">
              Consenso Internacional IRIS (Reemitido em 2026)
            </p>
          </div>
          <h3 className="mt-1 text-xl font-extrabold text-foreground md:text-2xl">
            Tabelas Funcionais de Graduação e Subestadiamento da LRA (AKI)
          </h3>
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">
            Tabelas oficiais dinâmicas com destaque em tempo real do Grau I a V, débito urinário, necessidade de diálise e pressão arterial.
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
          1. Painel Clínico de Entrada (Interativo)
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Espécie</span>
            <select
              value={species}
              onChange={(e) => {
                const s = e.target.value as Species;
                setSpecies(s);
                if (s === 'cat' && Number(weightKg) > 10) setWeightKg('4.5');
                if (s === 'dog' && Number(weightKg) < 6) setWeightKg('15');
              }}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
            >
              <option value="dog">🐶 Cão</option>
              <option value="cat">🐱 Gato</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Peso (kg)</span>
            <input
              type="text"
              inputMode="decimal"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
              placeholder="ex: 15"
            />
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Creatinina Atual</span>
            <input
              type="text"
              inputMode="decimal"
              value={creatinine}
              onChange={(e) => setCreatinine(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
              placeholder="ex: 3.4"
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
            <span className="text-[11px] font-semibold text-muted-foreground">Débito Urinário</span>
            <select
              value={urineOutputMode}
              onChange={(e) => setUrineOutputMode(e.target.value as UrineOutputMode)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
            >
              <option value="normal">Não-Oligúrico (≥ 1,0 mL/kg/h)</option>
              <option value="oliguric">Oligúrico (&lt; 1,0 mL/kg/h)</option>
              <option value="anuric">Anúrico (0 mL/kg/h)</option>
              <option value="custom">Informar valor exato</option>
            </select>
          </label>

          {urineOutputMode === 'custom' ? (
            <label className="space-y-1">
              <span className="text-[11px] font-semibold text-muted-foreground">Valor Débito (mL/kg/h)</span>
              <input
                type="text"
                inputMode="decimal"
                value={customUo}
                onChange={(e) => setCustomUo(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
                placeholder="ex: 0.8"
              />
            </label>
          ) : (
            <label className="space-y-1">
              <span className="text-[11px] font-semibold text-muted-foreground">Potássio Sérico (mmol/L)</span>
              <input
                type="text"
                inputMode="decimal"
                value={serumPotassium}
                onChange={(e) => setSerumPotassium(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
                placeholder="ex: 5.8"
              />
            </label>
          )}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Pressão Arterial (PAS mmHg)</span>
            <input
              type="text"
              inputMode="numeric"
              value={sbp}
              onChange={(e) => setSbp(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
              placeholder="ex: 165"
            />
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Status Volêmico</span>
            <select
              value={volemicStatus}
              onChange={(e) => setVolemicStatus(e.target.value as VolemicStatus)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
            >
              <option value="euvolemic">Euvolêmico (hidratado)</option>
              <option value="dehydrated">Desidratado / Hipovolêmico</option>
              <option value="overloaded">Sobrecarga Hídrica (≥ 5-10%)</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Terapia Dialítica (RRT)</span>
            <select
              value={requiresRrt ? 'yes' : 'no'}
              onChange={(e) => setRequiresRrt(e.target.value === 'yes')}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none transition focus:border-primary"
            >
              <option value="no">RRT- (Sem diálise no momento)</option>
              <option value="yes">RRT+ (Em suporte ou indicação de diálise)</option>
            </select>
          </label>

          <div className="flex items-end">
            <label className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-xs transition hover:bg-muted/50">
              <input
                type="checkbox"
                checked={hasKineticRise}
                onChange={(e) => setHasKineticRise(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="font-medium text-foreground">
                Cinética: aumento ≥ 0,3 mg/dL em 48h
              </span>
            </label>
          </div>
        </div>
      </div>

      {volemicStatus === 'overloaded' && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs leading-relaxed text-rose-950 dark:text-rose-100 md:text-sm">
          <AlertOctagon className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
          <div>
            <p className="font-extrabold uppercase tracking-wide">Alerta Crítico de Sobrecarga Hídrica (Fluid Overload ≥ 5-10%):</p>
            <p className="mt-1">
              Interrompa infusões livres de fluidos imediatamente. A sobrecarga hídrica eleva drasticamente a mortalidade em cães e gatos por edema pulmonar e colapso microvascular intrarrenal (síndrome do rim congesto). Considere ultrafiltração por hemodiálise (IHD) ou CRRT de urgência.
            </p>
          </div>
        </div>
      )}

      {isHyperkalemic && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-950 dark:text-amber-100 md:text-sm">
          <Flame className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="font-extrabold uppercase tracking-wide">Emergência Eletrocardiográfica — Hipercalemia Cardiotóxica (K+ ≥ 6,5 mmol/L):</p>
            <p className="mt-1">
              Risco iminente de assistolia ou fibrilação ventricular. Administrar Gluconato de Cálcio a 10% (0,5 a 1,0 mL/kg IV lento ao longo de 10-15 min) sob ECG contínuo para estabilizar membrana miocárdica, associado a Insulina Regular (0,25-0,5 UI/kg) com bólus de glicose 25% e infusão contínua de glicose 2,5-5%.
            </p>
          </div>
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-primary/30 bg-primary/[0.05] p-4 md:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
              <Activity className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Estadiamento Dinâmico Oficial IRIS AKI 2026
              </p>
              <h4 className="text-xl font-black text-foreground md:text-2xl">
                LRA IRIS Grau {calculatedGrade} - {isOliguric ? 'O' : 'NO'} - {requiresRrt ? 'RRT+' : 'RRT-'}
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('rounded-lg px-2.5 py-1 text-xs font-bold ring-1 ring-border/50', AKI_GRADES.find(g => g.grade === calculatedGrade)?.tone)}>
              Grau {calculatedGrade} ({AKI_GRADES.find(g => g.grade === calculatedGrade)?.label})
            </span>
            <span className={cn('rounded-lg px-2.5 py-1 text-xs font-bold ring-1 ring-border/50', isOliguric ? 'bg-rose-500/15 text-rose-900 dark:text-rose-100' : 'bg-emerald-500/15 text-emerald-900 dark:text-emerald-100')}>
              {isOliguric ? 'Subestádio O (Oligoanúrico)' : 'Subestádio NO (Não-Oligúrico)'}
            </span>
            <span className={cn('rounded-lg px-2.5 py-1 text-xs font-bold ring-1 ring-border/50', requiresRrt ? 'bg-purple-500/15 text-purple-900 dark:text-purple-100' : 'bg-muted text-muted-foreground')}>
              {requiresRrt ? 'RRT+ (Diálise)' : 'RRT- (Conservador)'}
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-3 border-t border-border/50 pt-3 text-xs md:grid-cols-3 md:text-sm">
          <div className="rounded-xl border border-border/60 bg-background/80 p-3">
            <p className="font-bold text-foreground">Regra Estrita de Ins and Outs:</p>
            <p className="mt-1 text-foreground/85">
              Taxa Horária Sugerida: <strong>{insAndOutsHourlyRate} mL/h</strong>
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Débito ({Math.round(urineOutputMlKgH * weight * 10) / 10} mL/h) + Perdas insensíveis ({Math.round(((20 * weight) / 24) * 10) / 10} mL/h).
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-background/80 p-3">
            <p className="font-bold text-foreground">Pressão Arterial Sistêmica:</p>
            <p className={cn('mt-1 font-bold', bloodPressureSubstage.tone)}>
              {bloodPressureSubstage.label}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Meta Consenso IRIS 2026: PAS &lt; 160 mmHg com amlodipina oral.
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-background/80 p-3">
            <p className="font-bold text-foreground">Manejo Diurético e Volemia:</p>
            <p className="mt-1 text-foreground/85">
              {isOliguric
                ? volemicStatus === 'euvolemic'
                  ? 'Paciente euvolêmico oligoanúrico: apto ao desafio com Furosemida (2 mg/kg IV). Se não responder em 2-4h, suspender e preparar RRT.'
                  : 'Desafio com furosemida é CONTRAINDICADO em desidratação. Restaure a euvolemia antes.'
                : 'Diurese preservada (≥ 1 mL/kg/h). Manter Ins and Outs rigoroso para evitar sobrecarga.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
            Tabela 1 — Graduação IRIS de Lesão Renal Aguda (Graus I a V) — Consenso IRIS 2026
          </h4>
          <p className="text-xs text-muted-foreground">
            A coluna correspondente ao Grau do paciente está destacada em tempo real. Clique em qualquer coluna para simular o Grau.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/80 bg-background">
          <ReadableTable className="w-full min-w-[760px] border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-border/80 bg-muted/60">
                <th className="px-4 py-3 font-bold text-muted-foreground">Parâmetro IRIS</th>
                {AKI_GRADES.map((g) => {
                  const isActive = calculatedGrade === g.grade;
                  return (
                    <th
                      key={g.grade}
                      onClick={() => setCreatinine(g.grade === 'I' ? '1.2' : g.grade === 'II' ? '2.2' : g.grade === 'III' ? '3.8' : g.grade === 'IV' ? '7.5' : '12.0')}
                      className={cn(
                        'cursor-pointer px-4 py-3 text-center transition',
                        isActive ? g.activeHeaderClass : 'text-foreground hover:bg-muted/80'
                      )}
                    >
                      <div className="font-extrabold">{g.title}</div>
                      <div className="text-[11px] opacity-80">{g.label}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-foreground">Creatinina Sérica (mg/dL)</td>
                {AKI_GRADES.map((g) => (
                  <td
                    key={g.grade}
                    className={cn(
                      'px-4 py-3 text-center tabular-nums',
                      calculatedGrade === g.grade && 'font-bold bg-primary/10 text-primary'
                    )}
                  >
                    {g.crMgDl}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-foreground">Creatinina (µmol/L)</td>
                {AKI_GRADES.map((g) => (
                  <td
                    key={g.grade}
                    className={cn(
                      'px-4 py-3 text-center tabular-nums',
                      calculatedGrade === g.grade && 'font-bold bg-primary/10 text-primary'
                    )}
                  >
                    {g.crUmol}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-foreground">Gravidade Clínica</td>
                {AKI_GRADES.map((g) => (
                  <td
                    key={g.grade}
                    className={cn(
                      'px-4 py-3 text-center text-xs',
                      calculatedGrade === g.grade && 'font-bold bg-primary/10 text-primary'
                    )}
                  >
                    {g.severity}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold text-foreground">Cinética e Critérios Diagnósticos</td>
                {AKI_GRADES.map((g) => (
                  <td
                    key={g.grade}
                    className={cn(
                      'px-4 py-3 text-center text-[11px] leading-tight',
                      calculatedGrade === g.grade && 'font-medium bg-primary/10 text-primary'
                    )}
                  >
                    {g.kinetics}
                  </td>
                ))}
              </tr>
            </tbody>
          </ReadableTable>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
              Tabela 2 — Subestágio de Débito Urinário
            </h4>
            <p className="text-xs text-muted-foreground">
              Medição rigorosa de produção urinária horária pós-euvolemia.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/80 bg-background">
            <ReadableTable className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border/80 bg-muted/60">
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Subestádio</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Critério Horário</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Conduta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr
                  onClick={() => setUrineOutputMode('normal')}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    !isOliguric && 'bg-emerald-500/15 font-bold text-emerald-950 dark:text-emerald-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 font-semibold">Não-Oligúrico (NO)</td>
                  <td className="px-3.5 py-2.5 tabular-nums">≥ 1,0 mL/kg/h</td>
                  <td className="px-3.5 py-2.5">Manter regra de Ins & Outs</td>
                </tr>
                <tr
                  onClick={() => setUrineOutputMode('oliguric')}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    isOliguric && 'bg-rose-500/15 font-bold text-rose-950 dark:text-rose-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 font-semibold">Oligoanúrico (O)</td>
                  <td className="px-3.5 py-2.5 tabular-nums">&lt; 1,0 mL/kg/h por 6h</td>
                  <td className="px-3.5 py-2.5">Restringir fluidos; desafio com furosemida; avaliar RRT</td>
                </tr>
              </tbody>
            </ReadableTable>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
              Tabela 3 — Subestágio de Diálise (RRT)
            </h4>
            <p className="text-xs text-muted-foreground">
              Necessidade de suporte extracorpóreo (IHD / CRRT / DP).
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/80 bg-background">
            <ReadableTable className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border/80 bg-muted/60">
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Subestádio</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Status Clínico</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Critério IRIS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr
                  onClick={() => setRequiresRrt(false)}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    !requiresRrt && 'bg-primary/15 font-bold text-foreground'
                  )}
                >
                  <td className="px-3.5 py-2.5 font-semibold">RRT-</td>
                  <td className="px-3.5 py-2.5">Sem diálise</td>
                  <td className="px-3.5 py-2.5">Tratamento conservador na UTI</td>
                </tr>
                <tr
                  onClick={() => setRequiresRrt(true)}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    requiresRrt && 'bg-purple-500/15 font-bold text-purple-950 dark:text-purple-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 font-semibold">RRT+</td>
                  <td className="px-3.5 py-2.5">Em diálise / indicada</td>
                  <td className="px-3.5 py-2.5">Oligoanúria, hipercalemia refratária, sobrecarga</td>
                </tr>
              </tbody>
            </ReadableTable>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
              Tabela 4 — Subestágio Pressórico (PAS)
            </h4>
            <p className="text-xs text-muted-foreground">
              Classificação mandatória de pressão arterial sistêmica na LRA.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/80 bg-background">
            <ReadableTable className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border/80 bg-muted/60">
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">PAS (mmHg)</th>
                  <th className="px-3.5 py-2.5 font-bold text-muted-foreground">Subestádio</th>
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
                  <td className="px-3.5 py-2.5">Alvo ideal</td>
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
                  <td className="px-3.5 py-2.5">Monitorar PA seriada</td>
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
                  <td className="px-3.5 py-2.5">Amlodipina (alvo &lt; 160)</td>
                </tr>
                <tr
                  onClick={() => setSbp('190')}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/40',
                    bloodPressureSubstage.key === 'severe' && 'bg-rose-500/15 font-bold text-rose-950 dark:text-rose-100'
                  )}
                >
                  <td className="px-3.5 py-2.5 tabular-nums">≥ 180</td>
                  <td className="px-3.5 py-2.5 font-semibold">Severamente hipertenso</td>
                  <td className="px-3.5 py-2.5">Intervenção urgente</td>
                </tr>
              </tbody>
            </ReadableTable>
          </div>
        </div>
      </div>
    </section>
  );
}
