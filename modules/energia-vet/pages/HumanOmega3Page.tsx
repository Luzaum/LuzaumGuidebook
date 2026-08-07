import React, { useMemo, useState } from 'react'
import { AlertTriangle, Fish, Search, ShieldAlert } from 'lucide-react'
import { cn } from '../lib/utils'
import { isNutritionFeatureEnabled } from '../lib/featureFlags'
import {
  DRUG_INTERACTION_ALERTS,
  getHumanOmega3ProductById,
  getHumanOmega3Stats,
  searchHumanOmega3Catalog,
} from '../lib/humanOmega3/catalogService'
import { calculateOmega3Dose, costPer1000MgEpaDha } from '../lib/humanOmega3/doseCalculator'
import { canCalculateDose, shouldWarnSubstituteBalanced } from '../lib/humanOmega3/regulatoryValidation'
import {
  HUMAN_OMEGA3_DISCLAIMERS,
  type HumanOmega3Product,
  type VeterinaryOmega3Indication,
} from '../lib/humanOmega3/types'
import { PRESET_LABELS_PT, VETERINARY_OMEGA3_PRESETS } from '../lib/humanOmega3/veterinaryDoses'

const SUITABILITY_LABEL: Record<HumanOmega3Product['veterinarySuitability'], string> = {
  preferred: 'Preferencial',
  preferred_high_concentration: 'Preferencial — alta concentração',
  acceptable: 'Adequado',
  acceptable_with_flavoring_review: 'Adequado (revisar aromatizante)',
  specific_use: 'Uso específico',
  label_required: 'Conferir rótulo',
  low_concentration: 'Baixa concentração',
  not_preferred: 'Não preferencial',
  specialist_only_extra_active: 'Especialista — ativo extra',
  blocked: 'Bloqueado',
  blocked_multiple_micronutrients: 'Bloqueado — multivitamínico',
  blocked_chewable_human_product: 'Bloqueado — mastigável',
  blocked_as_epa_dha_substitute: 'Bloqueado — ALA',
}

function FeatureDisabledPanel() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center">
      <Fish className="mx-auto h-10 w-10 text-muted-foreground" />
      <h1 className="mt-4 text-2xl font-bold text-foreground">Ômega-3 humanos (CODEX)</h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
        Catálogo de suplementos humanos passíveis de uso extrarrótulo em cães e gatos, cadastrados como alimentos
        suplementares. Ative com{' '}
        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">VITE_NUTRITION_HUMAN_OMEGA3=true</code>.
      </p>
    </div>
  )
}

function DisclaimerBanner() {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 md:p-5">
      <div className="flex gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" />
        <ul className="space-y-1.5 text-sm leading-6 text-foreground/90">
          {HUMAN_OMEGA3_DISCLAIMERS.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function HumanOmega3Page() {
  const enabled = isNutritionFeatureEnabled('nutrition_human_omega3')
  const stats = useMemo(() => getHumanOmega3Stats(), [])

  const [query, setQuery] = useState('')
  const [clinicalOnly, setClinicalOnly] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog')
  const [weightKg, setWeightKg] = useState('10')
  const [indication, setIndication] = useState<VeterinaryOmega3Indication>('nutritional_general')
  const [dietEpaDhaMg, setDietEpaDhaMg] = useState('0')
  const [packagePrice, setPackagePrice] = useState('')

  const products = useMemo(
    () =>
      searchHumanOmega3Catalog({
        query: query || undefined,
        clinicalOnly,
        includeBlocked: true,
      }),
    [query, clinicalOnly],
  )

  const selected = useMemo(
    () => (selectedId ? getHumanOmega3ProductById(selectedId) : undefined),
    [selectedId],
  )

  const doseResult = useMemo(() => {
    if (!selected || !canCalculateDose(selected)) return null
    const weight = Number.parseFloat(weightKg.replace(',', '.'))
    if (!Number.isFinite(weight) || weight <= 0) return null
    const diet = Number.parseFloat(dietEpaDhaMg.replace(',', '.')) || 0
    return calculateOmega3Dose({
      weightKg: weight,
      species,
      product: selected,
      prescription: VETERINARY_OMEGA3_PRESETS[indication],
      dietEpaDhaMgPerDay: diet,
    })
  }, [selected, weightKg, species, indication, dietEpaDhaMg])

  const costEstimate = useMemo(() => {
    if (!selected?.epaDhaMgPerUnit || !doseResult) return null
    const price = Number.parseFloat(packagePrice.replace(',', '.'))
    const sku = selected.skus[0]
    if (!Number.isFinite(price) || price <= 0 || !sku) return null
    const per1000 = costPer1000MgEpaDha(price, sku.packageUnits, selected.epaDhaMgPerUnit)
    const pricePerUnit = price / sku.packageUnits
    const monthlyLower = doseResult.lowerOption * 30 * pricePerUnit
    const monthlyUpper = doseResult.upperOption * 30 * pricePerUnit
    return { per1000, monthlyLower, monthlyUpper, pricePerUnit }
  }, [selected, packagePrice, doseResult])

  if (!enabled) return <FeatureDisabledPanel />

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">CODEX • Alimentos • NutriçãoVET</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Ômega-3 humanos (Brasil)</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Suplementos alimentares humanos cadastrados como alimentos suplementares para cálculo de EPA e DHA em cães e
          gatos. Não são produtos veterinários registrados — uso extrarrótulo sob prescrição do médico-veterinário.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ['Pesquisados', stats.total],
            ['Preferenciais', stats.preferred],
            ['Adequados', stats.acceptable],
            ['Cálculo clínico', stats.clinicalEnabled],
            ['Bloqueados', stats.blocked],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border/70 bg-muted/20 px-4 py-3">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <DisclaimerBanner />

      <section className="rounded-2xl border border-border bg-card p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <label className="min-w-[220px] flex-1">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Busca</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nome, fabricante…"
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm"
              />
            </div>
          </label>
          <label className="flex items-center gap-2 pb-2 text-sm">
            <input
              type="checkbox"
              checked={clinicalOnly}
              onChange={(e) => setClinicalOnly(e.target.checked)}
              className="rounded border-border"
            />
            Somente com cálculo clínico habilitado
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2">Produto</th>
                <th className="px-3 py-2">EPA/cáps</th>
                <th className="px-3 py-2">DHA/cáps</th>
                <th className="px-3 py-2">EPA+DHA</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={cn(
                    'cursor-pointer border-b border-border/60 transition-colors hover:bg-muted/30',
                    selectedId === product.id && 'bg-primary/5',
                  )}
                  onClick={() => setSelectedId(product.id)}
                >
                  <td className="px-3 py-3">
                    <p className="font-medium text-foreground">{product.commercialName}</p>
                    <p className="text-xs text-muted-foreground">{product.manufacturer}</p>
                  </td>
                  <td className="px-3 py-3 tabular-nums">{product.epaMgPerUnit ?? '—'}</td>
                  <td className="px-3 py-3 tabular-nums">{product.dhaMgPerUnit ?? '—'}</td>
                  <td className="px-3 py-3 tabular-nums">{product.epaDhaMgPerUnit ?? '—'}</td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                        canCalculateDose(product)
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-500/10 text-amber-800 dark:text-amber-200',
                      )}
                    >
                      {SUITABILITY_LABEL[product.veterinarySuitability]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <h2 className="text-lg font-semibold text-foreground">Calculadora EPA / DHA</h2>
            <p className="mt-1 text-sm text-muted-foreground">{selected.commercialName}</p>

            {!canCalculateDose(selected) && (
              <div className="mt-4 flex gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                Cálculo clínico desabilitado — conferir rótulo ou resolver conflito de dados antes de prescrever.
              </div>
            )}

            {shouldWarnSubstituteBalanced(selected) && (
              <p className="mt-3 text-sm text-amber-800 dark:text-amber-200">
                Perfil DHA predominante — não substituir produto balanceado EPA:DHA sem revisão clínica.
              </p>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label>
                <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">Espécie</span>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value as 'dog' | 'cat')}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                >
                  <option value="dog">Cão</option>
                  <option value="cat">Gato</option>
                </select>
              </label>
              <label>
                <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">Peso (kg)</span>
                <input
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">Indicação</span>
                <select
                  value={indication}
                  onChange={(e) => setIndication(e.target.value as VeterinaryOmega3Indication)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                >
                  {(Object.keys(PRESET_LABELS_PT) as VeterinaryOmega3Indication[]).map((key) => (
                    <option key={key} value={key}>
                      {PRESET_LABELS_PT[key]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                  EPA+DHA já na dieta (mg/dia)
                </span>
                <input
                  value={dietEpaDhaMg}
                  onChange={(e) => setDietEpaDhaMg(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                  Preço da embalagem (R$) — opcional
                </span>
                <input
                  value={packagePrice}
                  onChange={(e) => setPackagePrice(e.target.value)}
                  placeholder="Comparador de custo"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                />
              </label>
            </div>

            {doseResult && (
              <dl className="mt-5 space-y-2 rounded-xl bg-muted/30 p-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Alvo EPA+DHA (ajustado dieta)</dt>
                  <dd className="font-medium tabular-nums">{doseResult.adjustedCombinedTargetMg.toFixed(1)} mg</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Cápsulas exatas</dt>
                  <dd className="font-medium tabular-nums">{doseResult.exactCapsules.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Opção inferior ({doseResult.lowerOption} cáps)</dt>
                  <dd className="tabular-nums">
                    EPA+DHA {doseResult.lowerEffective.epaDhaMg.toFixed(0)} mg (
                    {doseResult.percentDifferenceLower.toFixed(1)}%)
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Opção superior ({doseResult.upperOption} cáps)</dt>
                  <dd className="tabular-nums">
                    EPA+DHA {doseResult.upperEffective.epaDhaMg.toFixed(0)} mg (
                    {doseResult.percentDifferenceUpper.toFixed(1)}%)
                  </dd>
                </div>
                <p className="pt-2 text-xs text-muted-foreground">
                  Fração de cápsula não habilitada automaticamente — escolha prática pelo médico-veterinário.
                </p>
                {costEstimate?.per1000 != null && (
                  <>
                    <div className="flex justify-between gap-4 border-t border-border/60 pt-2">
                      <dt className="text-muted-foreground">Custo / 1.000 mg EPA+DHA</dt>
                      <dd className="font-medium tabular-nums">R$ {costEstimate.per1000.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Custo mensal (inf–sup)</dt>
                      <dd className="tabular-nums">
                        R$ {costEstimate.monthlyLower.toFixed(2)} – R$ {costEstimate.monthlyUpper.toFixed(2)}
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            )}

            {doseResult?.felineLimitAlert && (
              <p className="mt-3 text-sm font-medium text-amber-800 dark:text-amber-200">{doseResult.felineLimitAlert}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <h3 className="font-semibold text-foreground">Interações e cautelas</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {DRUG_INTERACTION_ALERTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {selected.qualityIssues.length > 0 && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm">
                <h3 className="font-semibold text-foreground">Questões de qualidade / rótulo</h3>
                <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                  {selected.qualityIssues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
            {selected.certificationClaims.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Certificações declaradas pelo fabricante ({selected.certificationClaims.join(', ')}) — não constituem
                auditoria independente do Vetius.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
