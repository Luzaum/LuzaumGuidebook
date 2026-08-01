import React from 'react';
import { ExternalLink, Info } from 'lucide-react';

const stages = [
  {
    number: 1,
    label: 'Não azotêmico',
    tone: 'border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-100',
  },
  {
    number: 2,
    label: 'Azotemia leve',
    tone: 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100',
  },
  {
    number: 3,
    label: 'Azotemia moderada',
    tone: 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100',
  },
  {
    number: 4,
    label: 'Azotemia grave',
    tone: 'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100',
  },
] as const;

const stageRows = [
  {
    label: 'Creatinina',
    unit: 'mg/dL',
    values: ['< 1,4', '< 1,6', '1,4–2,8', '1,6–2,8', '2,9–5,0', '2,9–5,0', '> 5,0', '> 5,0'],
  },
  {
    label: 'Creatinina',
    unit: 'µmol/L',
    values: ['< 125', '< 140', '125–250', '140–250', '251–440', '251–440', '> 440', '> 440'],
  },
  {
    label: 'SDMA',
    unit: 'µg/dL',
    values: ['< 18', '< 18', '18–35', '18–25', '36–54', '26–38', '> 54', '> 38'],
  },
] as const;

const proteinuriaRows = [
  { label: 'Não proteinúrico', abbreviation: 'NP', dog: '< 0,2', cat: '< 0,2' },
  { label: 'Proteinúria limítrofe', abbreviation: 'PL', dog: '0,2–0,5', cat: '0,2–0,4' },
  { label: 'Proteinúrico', abbreviation: 'P', dog: '> 0,5', cat: '> 0,4' },
] as const;

const bloodPressureRows = [
  { pressure: '< 140', label: 'Normotenso', risk: 'Mínimo' },
  { pressure: '140–159', label: 'Pré-hipertenso', risk: 'Baixo' },
  { pressure: '160–179', label: 'Hipertenso', risk: 'Moderado' },
  { pressure: '≥ 180', label: 'Gravemente hipertenso', risk: 'Alto' },
] as const;

function SpeciesLabel({ species }: { species: 'Cão' | 'Gato' }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span aria-hidden="true">{species === 'Cão' ? '🐶' : '🐱'}</span>
      {species}
    </span>
  );
}

export function IrisCkdStagingTables() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4 text-sm leading-relaxed text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100">
        <div className="flex items-start gap-2.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            Use este estadiamento somente após diagnosticar DRC, em paciente hidratado e estável,
            com creatinina ou SDMA — idealmente ambos — avaliados em pelo menos duas ocasiões.
          </p>
        </div>
      </div>

      <section aria-labelledby="iris-stage-table-title" className="space-y-3">
        <div>
          <h4 id="iris-stage-table-title" className="font-semibold text-foreground">
            1. Estadiamento por creatinina e SDMA
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            O estágio é definido pela função renal. Se creatinina e SDMA permanecerem discordantes,
            a IRIS recomenda considerar o estágio mais alto após nova avaliação.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-background/70">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-center text-sm">
              <caption className="sr-only">
                Estadiamento IRIS 2026 da doença renal crônica em cães e gatos
              </caption>
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="w-[18%] border-b border-r border-border bg-muted/80 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    Marcador
                  </th>
                  {stages.map((stage) => (
                    <th
                      key={stage.number}
                      colSpan={2}
                      scope="colgroup"
                      className={`border-b border-r px-3 py-3 last:border-r-0 ${stage.tone}`}
                    >
                      <span className="block text-sm font-bold">Estágio {stage.number}</span>
                      <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-wide opacity-75">
                        {stage.label}
                      </span>
                    </th>
                  ))}
                </tr>
                <tr className="bg-muted/45 text-xs font-semibold text-muted-foreground">
                  {stages.flatMap((stage) => [
                    <th
                      key={`${stage.number}-dog`}
                      scope="col"
                      className="border-b border-r border-border px-3 py-2.5"
                    >
                      <SpeciesLabel species="Cão" />
                    </th>,
                    <th
                      key={`${stage.number}-cat`}
                      scope="col"
                      className="border-b border-r border-border px-3 py-2.5 last:border-r-0"
                    >
                      <SpeciesLabel species="Gato" />
                    </th>,
                  ])}
                </tr>
              </thead>
              <tbody>
                {stageRows.map((row) => (
                  <tr key={`${row.label}-${row.unit}`} className="border-b border-border/70 last:border-b-0">
                    <th
                      scope="row"
                      className="border-r border-border bg-muted/25 px-4 py-3 text-left font-semibold text-foreground"
                    >
                      <span className="block">{row.label}</span>
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        {row.unit}
                      </span>
                    </th>
                    {row.values.map((value, index) => (
                      <td
                        key={`${row.label}-${row.unit}-${index}`}
                        className="border-r border-border/70 px-3 py-3 font-medium tabular-nums text-foreground/90 last:border-r-0"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <section aria-labelledby="iris-proteinuria-title" className="space-y-3">
          <div>
            <h4 id="iris-proteinuria-title" className="font-semibold text-foreground">
              2. Subestadiamento por proteinúria
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Relação proteína/creatinina urinária (UPC).
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-background/70">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Subestadiamento IRIS 2026 por proteinúria
                </caption>
                <thead className="bg-muted/80 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Subestádio</th>
                    <th scope="col" className="px-4 py-3 text-center font-semibold">Cão</th>
                    <th scope="col" className="px-4 py-3 text-center font-semibold">Gato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/70">
                  {proteinuriaRows.map((row) => (
                    <tr key={row.abbreviation}>
                      <th scope="row" className="px-4 py-3 font-semibold text-foreground">
                        {row.label}
                        <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                          {row.abbreviation}
                        </span>
                      </th>
                      <td className="px-4 py-3 text-center font-medium tabular-nums text-foreground/90">{row.dog}</td>
                      <td className="px-4 py-3 text-center font-medium tabular-nums text-foreground/90">{row.cat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section aria-labelledby="iris-pressure-title" className="space-y-3">
          <div>
            <h4 id="iris-pressure-title" className="font-semibold text-foreground">
              3. Subestadiamento por pressão arterial
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Classificação pela PAS e pelo risco futuro de lesão em órgão-alvo.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-background/70">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[430px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Subestadiamento IRIS 2026 por pressão arterial sistólica
                </caption>
                <thead className="bg-muted/80 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">PAS (mmHg)</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Subestádio</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Risco</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/70">
                  {bloodPressureRows.map((row) => (
                    <tr key={row.pressure}>
                      <th scope="row" className="px-4 py-3 font-semibold tabular-nums text-foreground">
                        {row.pressure}
                      </th>
                      <td className="px-4 py-3 text-foreground/90">{row.label}</td>
                      <td className="px-4 py-3 text-foreground/90">{row.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-2 text-sm leading-relaxed text-foreground/90">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Não estadiar durante desidratação, obstrução, LRA ou alteração rápida da função renal.
          </li>
          <li>
            Confirmar proteinúria renal persistente, excluindo causas pré e pós-renais; idealmente,
            usar ao menos duas amostras obtidas ao longo de duas semanas.
          </li>
          <li>
            Classificar pressão arterial com múltiplas determinações e registrar lesão em
            órgão-alvo quando presente.
          </li>
        </ul>
      </div>

      <a
        href="https://www.iris-kidney.com/s/IRIS_staging_guidelines-2026.pdf"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        Consultar o quadro oficial IRIS 2026
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}
