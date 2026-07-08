import React from 'react';
import { AlertTriangle, Clipboard, Droplets, Gauge, ShieldCheck, Stethoscope } from 'lucide-react';
import { cn } from '../../../../lib/utils';

type Species = 'cat' | 'dog';
type CreatinineUnit = 'mgdl' | 'umol';

type StageResult = {
  stage: number;
  byCreatinine: number;
  bySdma: number | null;
  warning?: string;
};

const stageTone: Record<number, string> = {
  1: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-900 dark:text-emerald-100',
  2: 'border-sky-500/30 bg-sky-500/[0.08] text-sky-900 dark:text-sky-100',
  3: 'border-amber-500/35 bg-amber-500/[0.1] text-amber-950 dark:text-amber-100',
  4: 'border-red-500/35 bg-red-500/[0.1] text-red-950 dark:text-red-100',
};

function convertCreatinine(value: number, unit: CreatinineUnit) {
  if (!Number.isFinite(value) || value < 0) return 0;
  return unit === 'umol' ? value / 88.4 : value;
}

function stageByCreatinine(species: Species, creatinineMgDl: number) {
  if (species === 'cat') {
    if (creatinineMgDl < 1.6) return 1;
    if (creatinineMgDl <= 2.8) return 2;
    if (creatinineMgDl <= 5.0) return 3;
    return 4;
  }

  if (creatinineMgDl < 1.4) return 1;
  if (creatinineMgDl <= 2.8) return 2;
  if (creatinineMgDl <= 5.0) return 3;
  return 4;
}

function stageBySdma(species: Species, sdma: number) {
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

function getIrisStage(species: Species, creatinineMgDl: number, sdma: number): StageResult {
  const byCreatinine = stageByCreatinine(species, creatinineMgDl);
  const bySdma = stageBySdma(species, sdma);
  const stage = Math.max(byCreatinine, bySdma ?? byCreatinine);
  const warning =
    bySdma && bySdma > byCreatinine
      ? 'SDMA sugere estágio mais avançado que a creatinina. Confirme persistência, massa muscular e tendência seriada.'
      : undefined;
  return { stage, byCreatinine, bySdma, warning };
}

function getProteinuriaSubstage(species: Species, upc: number, activeSediment: boolean) {
  if (activeSediment) {
    return {
      label: 'UPC não interpretável',
      warning: 'UPC pode estar falsamente aumentada por inflamação/hematúria. Trate ou interprete o sedimento e repita UPC.',
    };
  }
  if (!Number.isFinite(upc) || upc < 0) return { label: 'UPC não informada' };
  if (upc < 0.2) return { label: 'não proteinúrico' };
  if (species === 'cat') return { label: upc <= 0.4 ? 'borderline' : 'proteinúrico' };
  return { label: upc <= 0.5 ? 'borderline' : 'proteinúrico' };
}

function getBloodPressureSubstage(sbp: number, hasTod: boolean) {
  if (!Number.isFinite(sbp) || sbp <= 0) return { label: 'PA não informada' };
  if (sbp < 140) return { label: 'normotenso / risco mínimo' };
  if (sbp < 160) return { label: 'pré-hipertenso / baixo risco' };
  if (sbp < 180) {
    return {
      label: hasTod ? 'hipertenso com lesão em órgão-alvo' : 'hipertenso / risco moderado',
      warning: hasTod
        ? 'Lesão em órgão-alvo presente: trate sem aguardar comprovação de persistência.'
        : 'Se PAS >=160 mmHg for persistente, recomenda-se tratamento.',
    };
  }
  return {
    label: hasTod ? 'hipertensão grave com lesão em órgão-alvo' : 'hipertensão grave / alto risco',
    warning: 'PAS >=180 mmHg: alto risco de lesão em órgão-alvo. Confirmar técnica e intervir com prioridade.',
  };
}

function recommendations(stage: number, species: Species) {
  const phosphorusTarget = stage === 1 ? 'avaliar tendência e causa' : stage === 2 ? '<4,5-4,6 mg/dL' : stage === 3 ? '<5,0 mg/dL' : '<6,0 mg/dL';
  const base = [
    'Confirmar estabilidade, hidratação e ausência de causa pré ou pós-renal antes de concluir estadiamento definitivo.',
    `Alvo de fósforo: ${phosphorusTarget}; usar dieta renal e quelante se persistir acima do alvo.`,
    'Subestadiar e tratar proteinúria persistente e hipertensão conforme risco.',
    'Monitorar peso, escore muscular, apetite, vômitos, creatinina/SDMA, ureia, fósforo, potássio, cálcio, UPC, urinálise e PA.',
  ];
  if (species === 'cat') base.push('Em gatos, valorize hipocalemia, sarcopenia, aceitação da dieta e hidratação domiciliar quando indicada.');
  if (stage >= 3) base.push('Pesquisar e tratar náuseas, acidose, anemia, hipocalemia e desidratação recorrente.');
  if (stage === 4) base.push('Priorizar conforto, calorias, hidratação segura, controle de náusea e metas realistas com o tutor.');
  return base;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-1.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function inputClass() {
  return 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/45 focus:ring-2 focus:ring-primary/15';
}

export function CKDStagingCalculator() {
  const [species, setSpecies] = React.useState<Species>('cat');
  const [creatinine, setCreatinine] = React.useState('2.0');
  const [unit, setUnit] = React.useState<CreatinineUnit>('mgdl');
  const [sdma, setSdma] = React.useState('20');
  const [stable, setStable] = React.useState(true);
  const [preRenalExcluded, setPreRenalExcluded] = React.useState(true);
  const [postRenalExcluded, setPostRenalExcluded] = React.useState(true);
  const [upc, setUpc] = React.useState('0.1');
  const [activeSediment, setActiveSediment] = React.useState(false);
  const [sbp, setSbp] = React.useState('130');
  const [tod, setTod] = React.useState(false);
  const [uremic, setUremic] = React.useState(false);
  const [lowMuscle, setLowMuscle] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const creatinineMgDl = convertCreatinine(Number(creatinine), unit);
  const sdmaValue = Number(sdma);
  const upcValue = Number(upc);
  const sbpValue = Number(sbp);
  const canStage = stable && preRenalExcluded && postRenalExcluded;
  const iris = getIrisStage(species, creatinineMgDl, sdmaValue);
  const proteinuria = getProteinuriaSubstage(species, upcValue, activeSediment);
  const bp = getBloodPressureSubstage(sbpValue, tod);
  const plan = recommendations(iris.stage, species);
  const problems = [
    lowMuscle ? 'creatinina pode subestimar por sarcopenia' : null,
    uremic ? 'sinais urêmicos presentes' : null,
    proteinuria.label.includes('proteinúrico') ? 'proteinúria persistente a confirmar/tratar' : null,
    sbpValue >= 160 || tod ? 'hipertensão/risco de órgão-alvo' : null,
    activeSediment ? 'sedimento ativo invalida UPC' : null,
  ].filter(Boolean) as string[];

  const copyText = `DRC IRIS estágio ${canStage ? iris.stage : 'não definitivo'}, subestágio proteinúria: ${proteinuria.label}, subestágio PA: ${bp.label}. Recomenda-se avaliar dieta renal, fósforo, potássio, hidratação, pressão arterial, UPC, urocultura, sinais gastrointestinais, anemia e acidose conforme estágio. Reavaliar conforme gravidade e após introdução de terapias.`;

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="rounded-[28px] border border-border bg-card/92 p-5 shadow-sm md:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-800 dark:text-cyan-100">
            <Stethoscope className="h-3.5 w-3.5" />
            Calculadora IRIS 2023
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Estadiamento de DRC</h2>
          <p className="mt-2 max-w-[92ch] text-sm leading-7 text-muted-foreground">
            Use em paciente estável, hidratado e após excluir causas pré-renais e pós-renais. O resultado apoia a decisão clínica; não substitui tendência seriada e contexto.
          </p>
        </div>
        <button
          type="button"
          onClick={copySummary}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          <Clipboard className="h-4 w-4" />
          {copied ? 'Copiado' : 'Copiar resumo'}
        </button>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <div className="grid gap-4 rounded-2xl border border-border/70 bg-background/60 p-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Espécie">
            <select className={inputClass()} value={species} onChange={(e) => setSpecies(e.target.value as Species)}>
              <option value="cat">Gato</option>
              <option value="dog">Cão</option>
            </select>
          </Field>
          <Field label="Creatinina">
            <input className={inputClass()} value={creatinine} onChange={(e) => setCreatinine(e.target.value)} inputMode="decimal" />
          </Field>
          <Field label="Unidade">
            <select className={inputClass()} value={unit} onChange={(e) => setUnit(e.target.value as CreatinineUnit)}>
              <option value="mgdl">mg/dL</option>
              <option value="umol">umol/L</option>
            </select>
          </Field>
          <Field label="SDMA (ug/dL)">
            <input className={inputClass()} value={sdma} onChange={(e) => setSdma(e.target.value)} inputMode="decimal" />
          </Field>
          <Field label="UPC">
            <input className={inputClass()} value={upc} onChange={(e) => setUpc(e.target.value)} inputMode="decimal" />
          </Field>
          <Field label="PAS (mmHg)">
            <input className={inputClass()} value={sbp} onChange={(e) => setSbp(e.target.value)} inputMode="numeric" />
          </Field>

          {[
            ['Paciente hidratado e estável', stable, setStable],
            ['Causa pré-renal corrigida/excluída', preRenalExcluded, setPreRenalExcluded],
            ['Causa pós-renal corrigida/excluída', postRenalExcluded, setPostRenalExcluded],
            ['Sedimento urinário ativo', activeSediment, setActiveSediment],
            ['Lesão em órgão-alvo', tod, setTod],
            ['Sinais urêmicos', uremic, setUremic],
            ['Massa muscular reduzida', lowMuscle, setLowMuscle],
          ].map(([label, checked, setter]) => (
            <label key={label as string} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-3 py-2.5 text-sm text-foreground">
              <input
                type="checkbox"
                checked={checked as boolean}
                onChange={(e) => (setter as React.Dispatch<React.SetStateAction<boolean>>)(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span>{label as string}</span>
            </label>
          ))}
        </div>

        <div className="space-y-4">
          {!canStage ? (
            <div className="rounded-2xl border border-amber-500/35 bg-amber-500/[0.09] p-4 text-amber-950 dark:text-amber-100">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm leading-7">
                  Não aplicar estadiamento IRIS definitivo. Estabilize, corrija causas pré/pós-renais e repita creatinina/SDMA.
                </p>
              </div>
            </div>
          ) : null}

          <div className={cn('rounded-2xl border p-5', stageTone[iris.stage])}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-75">Resultado</p>
                <p className="mt-2 text-4xl font-black tracking-tight">IRIS {canStage ? iris.stage : '?'}</p>
              </div>
              <Gauge className="h-9 w-9 opacity-80" />
            </div>
            <div className="mt-4 grid gap-2 text-sm leading-6 sm:grid-cols-2">
              <p>Creatinina: {creatinineMgDl.toFixed(2)} mg/dL (estágio {iris.byCreatinine})</p>
              <p>SDMA: {iris.bySdma ? `estágio ${iris.bySdma}` : 'não informado'}</p>
              <p>UPC: {proteinuria.label}</p>
              <p>PA: {bp.label}</p>
            </div>
          </div>

          {[iris.warning, proteinuria.warning, bp.warning, lowMuscle ? 'Creatinina pode subestimar estágio. Valorize SDMA e tendência seriada.' : null, sbpValue > 0 && sbpValue < 120 ? 'PAS <120 mmHg: alerta para hipotensão, especialmente após anti-hipertensivo.' : null]
            .filter(Boolean)
            .map((warning) => (
              <div key={warning} className="rounded-xl border border-amber-500/30 bg-amber-500/[0.07] px-4 py-3 text-sm leading-6 text-amber-950 dark:text-amber-100">
                {warning}
              </div>
            ))}

          <div className="rounded-2xl border border-border/70 bg-background/65 p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">Conduta sugerida</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground/88">
              {plan.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {problems.length ? (
              <div className="mt-4 rounded-xl border border-border/60 bg-card/70 p-3">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  <Droplets className="h-3.5 w-3.5" />
                  Problemas detectados
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/85">{problems.join('; ')}.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
