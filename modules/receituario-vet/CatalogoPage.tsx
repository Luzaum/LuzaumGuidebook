import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { CatalogDrug, CatalogPresentation, createEmptyDrug, loadRxDb, removeDrug, saveRxDb, upsertDrug } from './rxDb'
import {
  CONCENTRATION_PER_UNIT_OPTIONS,
  CONCENTRATION_VALUE_UNIT_OPTIONS,
  formatStructuredConcentration,
  parseStructuredConcentration,
} from './rxConcentration'
import { PharmacyType, RouteGroup } from './rxTypes'

const ROUTE_OPTIONS: RouteGroup[] = [
  'ORAL',
  'OTOLOGICO',
  'OFTALMICO',
  'TOPICO',
  'INTRANASAL',
  'RETAL',
  'SC',
  'IM',
  'IV',
  'INALATORIO',
  'TRANSDERMICO',
  'OUTROS',
]

const PHARMACY_OPTIONS: Array<{ value: PharmacyType; label: string }> = [
  { value: 'veterinária', label: 'Veterinária' },
  { value: 'humana', label: 'Humana' },
  { value: 'manipulacao', label: 'Manipulação' },
]

const SPECIES_TARGET_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'Caes', label: 'Cão' },
  { value: 'Gatos', label: 'Gato' },
]

const PRESENTATION_TYPE_OPTIONS = ['Comprimido', 'Cápsula', 'Solução oral', 'Suspensão oral', 'Gotas', 'Injetável', 'Ampola', 'Pomada', 'Spray']

function formatPriceBRLInput(raw: string): string {
  const normalized = String(raw || '')
    .replace(/[^\d,.-]/g, '')
    .replace('.', ',')
    .trim()
  if (!normalized) return ''
  const numberValue = Number(normalized.replace(',', '.'))
  if (!Number.isFinite(numberValue)) return ''
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue)
}

function normalizePharmacyTags(tags: PharmacyType[] | undefined): PharmacyType[] {
  const unique = Array.from(new Set((tags || []).filter(Boolean)))
  return unique.length ? unique : ['veterinária']
}

function cloneDrug(drug: CatalogDrug): CatalogDrug {
  const next = JSON.parse(JSON.stringify(drug)) as CatalogDrug
  next.presentations = next.presentations.map((presentation) => {
    if (presentation.concentrationValue && presentation.concentrationUnit && presentation.concentrationPerUnit) {
      return presentation
    }
    const parsed = parseStructuredConcentration(presentation.concentration || '')
    if (!parsed) return presentation
    return {
      ...presentation,
      concentrationValue: presentation.concentrationValue || parsed.value,
      concentrationUnit: presentation.concentrationUnit || parsed.unit,
      concentrationPerValue: presentation.concentrationPerValue || parsed.perValue || '1',
      concentrationPerUnit: presentation.concentrationPerUnit || parsed.perUnit,
    }
  })
  return next
}

function createPresentation(): CatalogPresentation {
  return {
    id: `pres-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    name: 'Comprimido',
    concentration: '',
    secondaryConcentration: '',
    concentrationValue: '',
    concentrationUnit: 'mg',
    concentrationPerValue: '1',
    concentrationPerUnit: 'comprimido',
    unitLabel: 'comprimido',
    commercialName: '',
    averagePrice: '',
    pharmacyTags: ['veterinária'],
  }
}

export default function CatalogoPage() {
  const location = useLocation()
  const initialDb = useMemo(() => loadRxDb(), [])
  const requestedDrugId = useMemo(() => new URLSearchParams(location.search).get('drug') || '', [location.search])
  const initialSelectedDrug = useMemo(
    () => initialDb.catalog.find((entry) => entry.id === requestedDrugId) || initialDb.catalog[0],
    [initialDb.catalog, requestedDrugId]
  )
  const [catalog, setCatalog] = useState(initialDb.catalog)
  const [selectedId, setSelectedId] = useState(initialSelectedDrug?.id || '')
  const [draft, setDraft] = useState<CatalogDrug>(initialSelectedDrug ? cloneDrug(initialSelectedDrug) : createEmptyDrug())
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!requestedDrugId) return
    const selectedDrug = catalog.find((entry) => entry.id === requestedDrugId)
    if (!selectedDrug || selectedDrug.id === selectedId) return
    setSelectedId(selectedDrug.id)
    setDraft(cloneDrug(selectedDrug))
  }, [catalog, requestedDrugId, selectedId])

  const selectDrug = (drug: CatalogDrug) => {
    setSelectedId(drug.id)
    setDraft(cloneDrug(drug))
  }

  const onNew = () => {
    const empty = createEmptyDrug()
    setSelectedId(empty.id)
    setDraft(empty)
  }

  const onSave = () => {
    const normalizedPresentations = (draft.presentations.length ? draft.presentations : [createPresentation()]).map((presentation) => ({
      ...presentation,
      pharmacyTags: normalizePharmacyTags(presentation.pharmacyTags),
    }))
    const normalizedDraft: CatalogDrug = {
      ...draft,
      presentations: normalizedPresentations,
      pharmacyType: normalizedPresentations[0]?.pharmacyTags?.[0] || 'veterinária',
    }
    const nextDb = upsertDrug(loadRxDb(), normalizedDraft)
    saveRxDb(nextDb)
    setCatalog(nextDb.catalog)
    setSelectedId(normalizedDraft.id)
    setDraft(normalizedDraft)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  const onDelete = () => {
    const nextDb = removeDrug(loadRxDb(), draft.id)
    saveRxDb(nextDb)
    setCatalog(nextDb.catalog)
    if (nextDb.catalog.length > 0) {
      setSelectedId(nextDb.catalog[0].id)
      setDraft(cloneDrug(nextDb.catalog[0]))
      return
    }
    const empty = createEmptyDrug()
    setSelectedId(empty.id)
    setDraft(empty)
  }

  const updatePresentationAt = (
    index: number,
    patch: Partial<CatalogPresentation>,
    opts?: { syncConcentration?: boolean; parseConcentration?: boolean }
  ) => {
    setDraft((prev) => ({
      ...prev,
      presentations: prev.presentations.map((entry, i) => {
        if (i !== index) return entry
        const merged: CatalogPresentation = { ...entry, ...patch }

        if (opts?.parseConcentration) {
          const primary = (merged.concentration || '').split('+')[0]?.trim() || ''
          const secondary = (merged.concentration || '').split('+').slice(1).join('+').trim()
          if (secondary) merged.secondaryConcentration = secondary
          const parsed = parseStructuredConcentration(primary)
          if (parsed) {
            merged.concentrationValue = parsed.value || ''
            merged.concentrationUnit = parsed.unit || merged.concentrationUnit || 'mg'
            merged.concentrationPerValue = parsed.perValue || merged.concentrationPerValue || '1'
            merged.concentrationPerUnit = parsed.perUnit || merged.concentrationPerUnit || 'comprimido'
          }
        }

        if (opts?.syncConcentration) {
          const normalizedPerUnit = (merged.concentrationPerUnit || merged.unitLabel || 'comprimido').trim()
          const primary = formatStructuredConcentration({
            value: merged.concentrationValue || '',
            unit: merged.concentrationUnit || '',
            perValue: merged.concentrationPerValue || '1',
            perUnit: normalizedPerUnit,
          })
          merged.concentration = [primary, (merged.secondaryConcentration || '').trim()]
            .filter(Boolean)
            .join(' + ')
        }

        if (!merged.unitLabel?.trim()) {
          merged.unitLabel = merged.concentrationPerUnit || 'comprimido'
        }
        return merged
      }),
    }))
  }

  return (
    <ReceituarioChrome
      section="catalogo"
      title="Catálogo de Fármacos"
      subtitle="Banco persistente, editável e reutilizável no modal de nova receita."
      actions={
        <>
          <Link to="/receituario-vet/nova-receita" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm">
            <span className="material-symbols-outlined text-[18px]">description</span>
            Nova Receita
          </Link>
          <button type="button" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={onNew}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Novo Fármaco
          </button>
          <button type="button" className="rxv-btn-primary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={onSave}>
            <span className="material-symbols-outlined text-[18px]">save</span>
            Salvar Alterações
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <aside className="rxv-card p-4 xl:col-span-3">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[color:var(--rxv-muted)]">Fármacos cadastrados</h3>
          <div className="max-h-[72vh] space-y-2 overflow-y-auto pr-1">
            {catalog.map((drug) => (
              <button
                type="button"
                key={drug.id}
                className={`w-full rounded-xl border px-3 py-2 text-left ${
                  selectedId === drug.id
                    ? 'border-[#61eb48]/45 bg-[#61eb48]/10'
                    : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60'
                }`}
                onClick={() => selectDrug(drug)}
              >
                <p className="text-sm font-semibold">{drug.name || 'Novo fármaco'}</p>
                <p className="text-xs text-[color:var(--rxv-muted)]">{drug.presentations.length} apresentações</p>
              </button>
            ))}
          </div>
        </aside>

        <main className="space-y-6 xl:col-span-9">
          <section className="rxv-card p-5">
            <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Informações Gerais</h2>
              <button type="button" className="rxv-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs text-red-300 hover:text-red-200" onClick={onDelete}>
                <span className="material-symbols-outlined text-[16px]">delete</span>
                Excluir
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="text-sm md:col-span-2">
                Nome do fármaco
                <input className="mt-1 w-full px-3 py-2" value={draft.name} onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))} />
              </label>
              <div className="rounded-lg border border-[color:var(--rxv-border)]/70 bg-[color:var(--rxv-surface-2)]/60 p-3 text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                O tipo de farmácia agora é definido por apresentação comercial (abaixo). Isso permite múltiplas opções no mesmo fármaco.
              </div>
              <label className="text-sm">
                Via principal
                <select className="mt-1 w-full px-3 py-2" value={draft.routeGroup} onChange={(e) => setDraft((prev) => ({ ...prev, routeGroup: e.target.value as RouteGroup }))}>
                  {ROUTE_OPTIONS.map((route) => (
                    <option key={route} value={route}>
                      {route}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Unidade de dose padrão
                <input
                  list="rx-dose-unit-options"
                  className="mt-1 w-full px-3 py-2"
                  value={draft.doseUnit}
                  onChange={(e) => setDraft((prev) => ({ ...prev, doseUnit: e.target.value }))}
                />
                <datalist id="rx-dose-unit-options">
                  {['mg/kg', 'mcg/kg', 'g/kg', 'mL/kg', 'UI/kg', 'comprimido/kg', 'gota/kg', 'mg', 'mL', 'comprimido', 'gota', 'cápsula'].map((unit) => (
                    <option key={unit} value={unit} />
                  ))}
                </datalist>
              </label>
              <div className="text-sm md:col-span-2">
                <p className="mb-1">Espécies alvo</p>
                <div className="flex flex-wrap gap-2">
                  {SPECIES_TARGET_OPTIONS.map((option) => {
                    const checked = draft.speciesTargets.includes(option.value)
                    return (
                      <label
                        key={option.value}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
                          checked
                            ? 'border-[#61eb48]/45 bg-[#61eb48]/12 text-[#c8ffc0]'
                            : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 text-[color:var(--rxv-muted)]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5"
                          checked={checked}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              speciesTargets: e.target.checked
                                ? Array.from(new Set([...prev.speciesTargets, option.value]))
                                : prev.speciesTargets.filter((entry) => entry !== option.value),
                            }))
                          }
                        />
                        {option.label}
                      </label>
                    )
                  })}
                </div>
              </div>
              <label className="inline-flex items-center gap-2 text-sm md:col-span-2">
                <input type="checkbox" className="h-4 w-4" checked={draft.controlled} onChange={(e) => setDraft((prev) => ({ ...prev, controlled: e.target.checked }))} />
                Medicamento controlado
              </label>
              <label className="text-sm md:col-span-2">
                Notas internas
                <textarea className="mt-1 w-full px-3 py-2" rows={3} value={draft.notes} onChange={(e) => setDraft((prev) => ({ ...prev, notes: e.target.value }))} />
              </label>
            </div>
          </section>

          <section className="rxv-card p-5">
            <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Apresentações</h2>
              <button
                type="button"
                className="rxv-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs"
                onClick={() => setDraft((prev) => ({ ...prev, presentations: [...prev.presentations, createPresentation()] }))}
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                Nova apresentação
              </button>
            </div>
            <div className="space-y-3">
              {draft.presentations.map((presentation, index) => (
                <div key={presentation.id} className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60 p-3">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                    <label className="text-xs md:col-span-3">
                      Forma farmacêutica
                      <select
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.name}
                        onChange={(e) => updatePresentationAt(index, { name: e.target.value })}
                      >
                        {PRESENTATION_TYPE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs md:col-span-3">
                      Concentração (texto)
                      <input
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.concentration}
                        onChange={(e) => updatePresentationAt(index, { concentration: e.target.value }, { parseConcentration: true })}
                      />
                    </label>
                    <label className="text-xs md:col-span-3">
                      Componente adicional (opcional)
                      <input
                        className="mt-1 w-full px-3 py-2"
                        placeholder="Ex.: 40 mg (trimetoprima)"
                        value={presentation.secondaryConcentration || ''}
                        onChange={(e) => updatePresentationAt(index, { secondaryConcentration: e.target.value }, { syncConcentration: true })}
                      />
                    </label>
                    <label className="text-xs md:col-span-2">
                      Unidade da apresentação
                      <select
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.unitLabel}
                        onChange={(e) => updatePresentationAt(index, { unitLabel: e.target.value })}
                      >
                        {CONCENTRATION_PER_UNIT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs md:col-span-3">
                      Apresentação comercial (nome do produto)
                      <input
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.commercialName || ''}
                        onChange={(e) => updatePresentationAt(index, { commercialName: e.target.value })}
                      />
                    </label>
                    <label className="text-xs md:col-span-2">
                      Valor
                      <input
                        type="number"
                        step="0.01"
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.concentrationValue || ''}
                        onChange={(e) => updatePresentationAt(index, { concentrationValue: e.target.value }, { syncConcentration: true })}
                        placeholder="Ex.: 250"
                      />
                    </label>
                    <label className="text-xs md:col-span-2">
                      Unidade do valor
                      <select
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.concentrationUnit || 'mg'}
                        onChange={(e) => updatePresentationAt(index, { concentrationUnit: e.target.value }, { syncConcentration: true })}
                      >
                        {CONCENTRATION_VALUE_UNIT_OPTIONS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs md:col-span-2">
                      Por valor
                      <input
                        type="number"
                        step="0.01"
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.concentrationPerValue || '1'}
                        onChange={(e) => updatePresentationAt(index, { concentrationPerValue: e.target.value || '1' }, { syncConcentration: true })}
                        placeholder="Ex.: 1"
                      />
                    </label>
                    <label className="text-xs md:col-span-2">
                      Por unidade
                      <select
                        className="mt-1 w-full px-3 py-2"
                        value={presentation.concentrationPerUnit || 'comprimido'}
                        onChange={(e) =>
                          updatePresentationAt(
                            index,
                            { concentrationPerUnit: e.target.value, unitLabel: presentation.unitLabel || e.target.value },
                            { syncConcentration: true }
                          )
                        }
                      >
                        {CONCENTRATION_PER_UNIT_OPTIONS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="md:col-span-1 md:flex md:items-end md:justify-end">
                      <button
                        type="button"
                        className="rxv-btn-secondary inline-flex items-center gap-1 px-2 py-1 text-xs text-red-300 hover:text-red-200"
                        onClick={() => setDraft((prev) => ({ ...prev, presentations: prev.presentations.filter((entry) => entry.id !== presentation.id) }))}
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        Del
                      </button>
                    </div>
                    <label className="text-xs md:col-span-4">
                      Preço médio (opcional)
                      <input
                        className="mt-1 w-full px-3 py-2"
                        placeholder="Ex.: R$ 79,90"
                        value={presentation.averagePrice || ''}
                        onChange={(e) => updatePresentationAt(index, { averagePrice: formatPriceBRLInput(e.target.value) })}
                      />
                    </label>
                    <div className="text-xs md:col-span-8">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">Tipos de farmácia desta apresentação</p>
                      <div className="flex flex-wrap gap-2">
                        {PHARMACY_OPTIONS.map((option) => {
                          const selectedTags = normalizePharmacyTags(presentation.pharmacyTags)
                          const isChecked = selectedTags.includes(option.value)
                          const isOnlySelected = isChecked && selectedTags.length === 1
                          return (
                            <label
                              key={`${presentation.id}-${option.value}`}
                              className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${
                                isChecked
                                  ? 'border-[#61eb48]/45 bg-[#61eb48]/12 text-[#c8ffc0]'
                                  : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 text-[color:var(--rxv-muted)]'
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="h-3.5 w-3.5"
                                checked={isChecked}
                                disabled={isOnlySelected}
                                onChange={(e) =>
                                  setDraft((prev) => ({
                                    ...prev,
                                    presentations: prev.presentations.map((entry, i) => {
                                      if (i !== index) return entry
                                      const currentTags = normalizePharmacyTags(entry.pharmacyTags)
                                      const nextTags = e.target.checked
                                        ? Array.from(new Set([...currentTags, option.value]))
                                        : currentTags.filter((tag) => tag !== option.value)
                                      return {
                                        ...entry,
                                        pharmacyTags: normalizePharmacyTags(nextTags),
                                      }
                                    }),
                                  }))
                                }
                              />
                              {option.label}
                            </label>
                          )
                        })}
                      </div>
                      <p className="mt-1 text-[11px] text-[color:var(--rxv-muted)]">
                        Na Nova Receita, o usuário poderá escolher apenas entre as farmácias marcadas aqui.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {saved ? (
        <div className="fixed bottom-6 right-6 z-[120] rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] px-4 py-3 text-sm font-semibold text-[#67e952]">
          Catálogo salvo com sucesso.
        </div>
      ) : null}
    </ReceituarioChrome>
  )
}




