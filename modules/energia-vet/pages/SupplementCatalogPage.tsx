import React, { useMemo, useState } from 'react'
import { AlertTriangle, FlaskConical, Search, ShieldCheck } from 'lucide-react'
import { cn } from '../lib/utils'
import { isNutritionFeatureEnabled } from '../lib/featureFlags'
import {
  getSupplementCatalogStats,
  getSupplementManufacturers,
  searchSupplementCatalog,
} from '../lib/supplementCatalog'
import type { CatalogEligibility, SupplementSpecies } from '../lib/supplementCatalog/types'

const ELIGIBILITY_LABEL: Record<CatalogEligibility, string> = {
  eligible: 'Elegível',
  staging_only: 'Staging',
  excluded: 'Excluído',
}

const ELIGIBILITY_CLASS: Record<CatalogEligibility, string> = {
  eligible: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  staging_only: 'bg-amber-500/10 text-amber-800 dark:text-amber-200',
  excluded: 'bg-destructive/10 text-destructive',
}

function FeatureDisabledPanel() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center">
      <FlaskConical className="mx-auto h-10 w-10 text-muted-foreground" />
      <h1 className="mt-4 text-2xl font-bold text-foreground">Catálogo CODEX de suplementos</h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
        O catálogo nacional exclusivo de suplementos alimentares está implementado, mas permanece desligado por padrão.
        Ative com <code className="rounded bg-muted px-1.5 py-0.5 text-xs">VITE_NUTRITION_SUPPLEMENT_CATALOG=true</code> para
        usar a interface. O modo legado de alimentos continua inalterado.
      </p>
    </div>
  )
}

export default function SupplementCatalogPage() {
  const enabled = isNutritionFeatureEnabled('nutrition_supplement_catalog')
  const stats = useMemo(() => getSupplementCatalogStats(), [])
  const manufacturers = useMemo(() => getSupplementManufacturers(), [])

  const [query, setQuery] = useState('')
  const [manufacturerSlug, setManufacturerSlug] = useState('')
  const [species, setSpecies] = useState<SupplementSpecies | ''>('')
  const [eligibility, setEligibility] = useState<CatalogEligibility | ''>('')
  const [clinicalOnly, setClinicalOnly] = useState(false)

  const result = useMemo(
    () =>
      searchSupplementCatalog({
        query: query || undefined,
        manufacturerSlug: manufacturerSlug || undefined,
        species: species || undefined,
        catalogEligibility: eligibility || undefined,
        clinicalOnly,
      }),
    [query, manufacturerSlug, species, eligibility, clinicalOnly],
  )

  if (!enabled) return <FeatureDisabledPanel />

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">CODEX • NutriçãoVET</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Suplementos alimentares (Brasil)</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Catálogo exclusivo de suplementos, probióticos, premixes e alimentos complementares para cães e gatos.
          Medicamentos veterinários, tópicos e injetáveis não entram aqui.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Fabricantes', stats.manufacturers],
            ['Produtos', stats.productsTotal],
            ['Staging', stats.productsStaging],
            ['Elegíveis', stats.productsEligible],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border/70 bg-muted/20 px-4 py-3">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="rounded-2xl border border-border bg-card p-4 md:p-6">
        <div className="grid gap-3 lg:grid-cols-6">
          <label className="lg:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Busca</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nome comercial, marca…"
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm"
              />
            </div>
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fabricante</span>
            <select
              value={manufacturerSlug}
              onChange={(e) => setManufacturerSlug(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
            >
              <option value="">Todos</option>
              {manufacturers.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Espécie</span>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value as SupplementSpecies | '')}
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
            >
              <option value="">Ambas</option>
              <option value="dog">Cão</option>
              <option value="cat">Gato</option>
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Situação</span>
            <select
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value as CatalogEligibility | '')}
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
            >
              <option value="">Todas</option>
              <option value="eligible">Elegível</option>
              <option value="staging_only">Staging</option>
              <option value="excluded">Excluído</option>
            </select>
          </label>
          <label className="flex items-end">
            <span className="inline-flex min-h-11 w-full items-center gap-2 rounded-xl border border-border px-3 text-sm">
              <input
                type="checkbox"
                checked={clinicalOnly}
                onChange={(e) => setClinicalOnly(e.target.checked)}
                className="h-4 w-4"
              />
              Só liberados clinicamente
            </span>
          </label>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{result.total} produto(s) encontrado(s)</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.items.map((product) => (
          <article key={product.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold leading-snug text-foreground">{product.commercialName}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{product.brand ?? product.manufacturerSlug}</p>
              </div>
              <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase', ELIGIBILITY_CLASS[product.catalogEligibility])}>
                {ELIGIBILITY_LABEL[product.catalogEligibility]}
              </span>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Classe</dt>
                <dd className="text-right font-medium">{product.productClass.replace(/_/g, ' ')}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Categoria</dt>
                <dd className="text-right font-medium">{product.primaryCategory.replace(/_/g, ' ')}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Espécies</dt>
                <dd className="text-right font-medium">{product.species.join(', ')}</dd>
              </div>
            </dl>
            {product.clinicalRecommendationEnabled ? (
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Liberado para recomendação clínica
              </p>
            ) : (
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                <AlertTriangle className="h-3.5 w-3.5" />
                Rótulo ou classificação pendente
              </p>
            )}
            {product.notes ? <p className="mt-3 text-xs leading-6 text-muted-foreground">{product.notes}</p> : null}
          </article>
        ))}
      </div>
    </div>
  )
}
