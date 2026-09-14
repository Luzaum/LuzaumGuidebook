import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, BookOpen, ChevronLeft, ChevronRight, HeartPulse, Info, Ruler, TriangleAlert } from 'lucide-react';
import { ConsultaVetPageHero } from '../../components/layout/ConsultaVetPageHero';
import {
  calculateVhs,
  interpretVhs,
  VHS_REFERENCES,
  VHS_SOURCE,
  VhsSpecies,
} from '../../data/vhsReferenceData';
import { cn } from '../../../../lib/utils';

const RESULT_TONES = {
  below: 'border-sky-500/30 bg-sky-500/[0.08] text-sky-700 dark:text-sky-300',
  within: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-700 dark:text-emerald-300',
  above: 'border-rose-500/30 bg-rose-500/[0.08] text-rose-700 dark:text-rose-300',
} as const;

export function VhsReferencePage() {
  const [species, setSpecies] = useState<VhsSpecies>('dog');
  const [referenceId, setReferenceId] = useState('dog-general');
  const [longAxisV, setLongAxisV] = useState(5.1);
  const [shortAxisV, setShortAxisV] = useState(4.6);

  const references = useMemo(
    () => VHS_REFERENCES.filter((reference) => reference.species === species),
    [species]
  );
  const selectedReference =
    references.find((reference) => reference.id === referenceId) ?? references[0];
  const vhs = calculateVhs(longAxisV, shortAxisV);
  const interpretation = selectedReference && vhs > 0 ? interpretVhs(vhs, selectedReference) : null;

  const selectSpecies = (nextSpecies: VhsSpecies) => {
    setSpecies(nextSpecies);
    setReferenceId(nextSpecies === 'dog' ? 'dog-general' : 'cat-general');
  };

  return (
    <div className="mx-auto w-full max-w-[1360px] space-y-6 p-4 md:p-8">
      <nav
        className="consulta-vet-breadcrumb flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground"
        aria-label="Navegação estrutural"
      >
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">Início</Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <Link to="/consulta-vet/referencias-rapidas" className="transition-colors hover:text-primary">
          Referências clínicas
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <span className="text-foreground">VHS</span>
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
            title="VHS — Vertebral Heart Score"
            description="Some os eixos cardíacos convertidos em corpos vertebrais e compare o resultado com a referência adequada."
            icon={HeartPulse}
            accent="rose"
            compact
          />
        </div>
      </div>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(340px,.88fr)]" aria-labelledby="vhs-method-title">
        <figure className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
          <img
            src="/consulta-vet/reference-apps/vhs-measurement.svg"
            alt="Esquema da medição do VHS: eixo longo da carina ao ápice, eixo curto perpendicular e transposição a partir de T4."
            className="aspect-[16/9] w-full object-cover"
          />
          <figcaption className="border-t border-border/60 px-4 py-3 text-[11px] leading-relaxed text-muted-foreground sm:px-5">
            Ilustração original do ConsultaVET, sem reprodução de figura de terceiros. Método adaptado da descrição e das Figuras 9.15–9.16 do BSAVA Thoracic Imaging, 2ª ed.
          </figcaption>
        </figure>

        <article className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Ruler className="h-5 w-5 text-rose-500" aria-hidden />
            <h2 id="vhs-method-title" className="text-base font-extrabold text-foreground">Como medir</h2>
          </div>
          <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            {[
              'Use uma radiografia torácica lateral bem posicionada; direita ou esquerda são aceitas.',
              'Meça o eixo longo da margem ventral da carina até o contorno mais ventral do ápice cardíaco.',
              'Meça o maior eixo curto, perpendicular ao longo, na região central da silhueta.',
              'Transponha cada medida à coluna, iniciando na borda cranial de T4, e conte até 0,1 vértebra.',
              'Some eixo longo (L) + eixo curto (S). O resultado é o VHS em vértebras (v).',
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-[11px] font-black text-rose-600 dark:text-rose-300">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-6" aria-labelledby="vhs-calculator-title">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500">Calculadora</p>
            <h2 id="vhs-calculator-title" className="mt-1 text-xl font-extrabold tracking-tight text-foreground">Calcule e interprete</h2>
          </div>
          <p className="text-xs text-muted-foreground">VHS = L + S · unidade: vértebras (v)</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(330px,.8fr)]">
          <div className="space-y-5">
            <fieldset>
              <legend className="mb-2 text-xs font-bold text-foreground">Espécie</legend>
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted/45 p-1.5">
                {([
                  ['dog', 'Cão'],
                  ['cat', 'Gato'],
                ] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => selectSpecies(value)}
                    className={cn(
                      'rounded-xl px-4 py-2.5 text-sm font-bold transition',
                      species === value
                        ? 'bg-background text-foreground shadow-sm ring-1 ring-border/70'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    aria-pressed={species === value}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block space-y-2">
              <span className="text-xs font-bold text-foreground">Referência para comparação</span>
              <select
                value={selectedReference?.id}
                onChange={(event) => setReferenceId(event.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {references.map((reference) => (
                  <option key={reference.id} value={reference.id}>{reference.label}</option>
                ))}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-bold text-foreground">Eixo longo — L (v)</span>
                <input
                  type="number"
                  min="0.1"
                  max="15"
                  step="0.1"
                  inputMode="decimal"
                  value={longAxisV}
                  onChange={(event) => setLongAxisV(Number(event.target.value))}
                  className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-lg font-extrabold text-foreground outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-bold text-foreground">Eixo curto — S (v)</span>
                <input
                  type="number"
                  min="0.1"
                  max="15"
                  step="0.1"
                  inputMode="decimal"
                  value={shortAxisV}
                  onChange={(event) => setShortAxisV(Number(event.target.value))}
                  className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-lg font-extrabold text-foreground outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </label>
            </div>
          </div>

          <aside aria-live="polite" className="flex min-h-[260px] flex-col rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-background to-rose-500/[0.06] p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              <Activity className="h-4 w-4 text-primary" aria-hidden /> Resultado
            </div>
            <div className="mt-5 flex items-end gap-2">
              <strong className="text-5xl font-black tracking-[-0.06em] text-foreground sm:text-6xl">{vhs || '—'}</strong>
              <span className="pb-1.5 text-sm font-bold text-muted-foreground">v</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{longAxisV || 0} + {shortAxisV || 0} vértebras</p>

            {selectedReference && interpretation ? (
              <div className={cn('mt-5 rounded-2xl border p-4', RESULT_TONES[interpretation.status])}>
                <p className="text-sm font-extrabold">{interpretation.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed opacity-90">{interpretation.summary}</p>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/[0.08] p-4 text-xs text-amber-800 dark:text-amber-200">
                Informe valores maiores que zero para os dois eixos.
              </div>
            )}

            {selectedReference ? (
              <div className="mt-auto pt-5 text-xs text-muted-foreground">
                <p className="font-bold text-foreground">{selectedReference.label}</p>
                <p className="mt-1">
                  Comparação: {selectedReference.lower.toFixed(1)}–{selectedReference.upper.toFixed(1)} v
                  {selectedReference.mean !== undefined ? ` · média ${selectedReference.mean.toFixed(1)} v` : ''}
                </p>
                {selectedReference.intervalBasis === 'derived-2sd' ? (
                  <p className="mt-1 text-[10px] leading-relaxed">Intervalo comparativo calculado como média ± 2 DP; o livro publica média ± DP.</p>
                ) : null}
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(300px,.75fr)]">
        <div className="flex gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/[0.07] p-4 text-sm text-amber-950 dark:text-amber-100">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p className="leading-relaxed">
            <strong>Interprete com cautela.</strong> Raça, conformação torácica, fase respiratória, ciclo cardíaco, escore corporal e anomalias vertebrais alteram o VHS. A ecocardiografia continua sendo o padrão para avaliar câmaras cardíacas.
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.17em] text-primary">
            <BookOpen className="h-4 w-4" aria-hidden /> Fonte do livro
          </div>
          <p className="mt-3 text-sm font-bold text-foreground">{VHS_SOURCE.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {VHS_SOURCE.edition}, {VHS_SOURCE.year}. {VHS_SOURCE.chapter}; {VHS_SOURCE.pages}.
          </p>
          <div className="mt-3 flex gap-2 text-[11px] leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>As faixas de raça exibidas como intervalo são derivadas de média ± 2 DP e aparecem identificadas como tal.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
