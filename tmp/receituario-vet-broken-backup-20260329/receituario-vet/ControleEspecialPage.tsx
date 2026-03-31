import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { RxPrintView } from './RxPrintView'
import { createDefaultItem, createDefaultPrescriptionState } from './rxDefaults'
import { renderRxToPrintDoc } from './rxRenderer'
import { findSpecialControlTemplate, loadRxDb } from './rxDb'
import type { PharmacyType, RouteGroup } from './rxTypes'
import { useClinic } from '../../src/components/ClinicProvider'
import {
  searchMedications,
  getMedicationPresentations,
  type MedicationPresentationRecord,
  type MedicationSearchResult,
} from '../../src/lib/clinicRecords'
import {
  getCompoundedMedicationBundle,
  listCompoundedMedications,
  type CompoundedMedicationBundle,
} from '../../src/lib/compoundedRecords'
import { buildCompoundedConcentrationText, buildCompoundedPrescriptionItem } from './compoundedItemBuilder'

type StandardControlledEntry = MedicationSearchResult & {
  kind: 'standard'
  presentations: MedicationPresentationRecord[]
}

type CompoundedControlledEntry = {
  kind: 'compounded'
  bundle: CompoundedMedicationBundle
}

type ControlledCatalogEntry = StandardControlledEntry | CompoundedControlledEntry

function inferPharmacyType(presentation?: MedicationPresentationRecord): PharmacyType {
  if (!presentation) return 'veterinária'
  if (presentation.pharmacy_compounding) return 'manipulacao'
  if (presentation.pharmacy_human) return 'humana'
  return 'veterinária'
}

function mapRouteToGroup(route?: string | null): RouteGroup {
  const normalized = String(route || '').trim().toLowerCase()
  if (!normalized) return 'ORAL'
  if (normalized.includes('oft')) return 'OFTALMICO'
  if (normalized.includes('oto')) return 'OTOLOGICO'
  if (normalized.includes('top')) return 'TOPICO'
  if (normalized.includes('nasal')) return 'INTRANASAL'
  if (normalized.includes('retal')) return 'RETAL'
  if (normalized.includes('sc') || normalized.includes('subcut')) return 'SC'
  if (normalized === 'im' || normalized.includes('intramus')) return 'IM'
  if (normalized === 'iv' || normalized.includes('intraven')) return 'IV'
  if (normalized.includes('inal')) return 'INALATORIO'
  if (normalized.includes('transd')) return 'TRANSDERMICO'
  return 'ORAL'
}

function buildPresentationSummary(presentation?: MedicationPresentationRecord): string {
  if (!presentation) return 'Sem apresentação cadastrada'
  return [
    presentation.pharmaceutical_form,
    presentation.commercial_name,
    presentation.concentration_text,
  ]
    .filter(Boolean)
    .join(' • ')
}

function controlledItemFromStandard(entry: StandardControlledEntry, index: number) {
  const item = createDefaultItem('medication')
  const presentation = entry.presentations[0]
  item.name = entry.name
  item.controlled = true
  item.is_controlled = true
  item.medication_id = entry.id
  item.presentation_id = presentation?.id
  item.presentation = presentation?.pharmaceutical_form || 'Apresentação'
  item.concentration = presentation?.concentration_text || ''
  item.commercialName = presentation?.commercial_name || ''
  item.routeGroup = mapRouteToGroup(entry.default_route)
  item.doseUnit = presentation?.per_unit?.toLowerCase() === 'ml' ? 'mL' : 'mg/kg'
  item.pharmacyType = inferPharmacyType(presentation)
  item.doseValue = item.doseUnit.includes('/kg') ? '2' : '1'
  item.frequencyType = 'everyHours'
  item.everyHours = index % 2 === 0 ? '12' : '8'
  item.durationDays = '7'
  item.autoInstruction = true
  item.manualEdited = false
  return item
}

function controlledItemFromCompounded(entry: CompoundedControlledEntry) {
  const regimen = entry.bundle.regimens[0]
  const base = createDefaultItem('medication', mapRouteToGroup(regimen?.route || entry.bundle.medication.default_route))
  const previewItem = regimen
    ? buildCompoundedPrescriptionItem({
      bundle: entry.bundle,
      regimen,
      patient: null,
    })
    : null

  base.name = entry.bundle.medication.name
  base.controlled = true
  base.is_controlled = true
  base.medication_id = entry.bundle.medication.id
  base.presentation = [
    entry.bundle.medication.pharmaceutical_form,
    entry.bundle.medication.default_qsp_text || entry.bundle.medication.default_quantity_text || '',
  ].filter(Boolean).join(' • ')
  base.concentration = regimen ? buildCompoundedConcentrationText(regimen) : ''
  base.commercialName = ''
  base.pharmacyType = 'manipulacao'
  base.doseUnit = previewItem?.compounded_regimen_snapshot?.fixed_administration_unit || 'mL'
  base.doseValue = previewItem?.compounded_regimen_snapshot?.fixed_administration_value?.toString() || '1'
  base.frequencyType = 'everyHours'
  base.everyHours = regimen?.frequency_value_min?.toString() || '12'
  base.durationDays = regimen?.duration_value?.toString() || '7'
  base.instruction = previewItem?.instructions || 'Administrar conforme orientação clínica.'
  base.autoInstruction = !previewItem?.instructions
  base.manualEdited = !!previewItem?.instructions
  return base
}

export default function ControleEspecialPage() {
  const navigate = useNavigate()
  const { clinicId } = useClinic()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [controlledCatalog, setControlledCatalog] = useState<ControlledCatalogEntry[]>([])

  const refreshControlledCatalog = useCallback(async () => {
    if (!clinicId) {
      setControlledCatalog([])
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const [medications, compoundedRows] = await Promise.all([
        searchMedications(clinicId, '', 200),
        listCompoundedMedications(clinicId, { controlledOnly: true }),
      ])

      const controlledStandard = medications.filter((entry) => entry.is_controlled)
      const standardWithPresentations = await Promise.all(
        controlledStandard.map(async (entry) => ({
          ...entry,
          kind: 'standard' as const,
          presentations: await getMedicationPresentations(clinicId, entry.id),
        }))
      )

      const compoundedBundles = await Promise.all(
        compoundedRows.map(async (entry) => await getCompoundedMedicationBundle(clinicId, entry.id))
      )

      const compoundedEntries: CompoundedControlledEntry[] = compoundedBundles
        .filter(Boolean)
        .map((bundle) => ({
          kind: 'compounded' as const,
          bundle: bundle as CompoundedMedicationBundle,
        }))

      const merged: ControlledCatalogEntry[] = [
        ...standardWithPresentations,
        ...compoundedEntries,
      ].sort((a, b) => {
        const nameA = a.kind === 'standard' ? a.name : a.bundle.medication.name
        const nameB = b.kind === 'standard' ? b.name : b.bundle.medication.name
        return nameA.localeCompare(nameB, 'pt-BR')
      })

      setControlledCatalog(merged)
    } catch (err) {
      console.error('[ControleEspecial] Erro ao carregar catálogo controlado', err)
      setError(err instanceof Error ? err.message : String(err))
      setControlledCatalog([])
    } finally {
      setIsLoading(false)
    }
  }, [clinicId])

  useEffect(() => {
    void refreshControlledCatalog()
  }, [refreshControlledCatalog])

  const db = useMemo(() => loadRxDb(), [])

  const specialTemplate = useMemo(
    () => findSpecialControlTemplate(db.templates) || db.templates.find((entry) => entry.id === 'rx_br_control_special') || db.templates[0],
    [db.templates]
  )

  const previewProfile = useMemo(() => db.prescriberProfiles[0] || db.profile, [db.prescriberProfiles, db.profile])

  const controlledTargetPharmacy = useMemo(() => {
    const tags = new Set<PharmacyType>()
    controlledCatalog.forEach((entry) => {
      if (entry.kind === 'compounded') {
        tags.add('manipulacao')
        return
      }
      if (entry.presentations.length === 0) {
        tags.add('veterinária')
        return
      }
      entry.presentations.forEach((presentation) => tags.add(inferPharmacyType(presentation)))
    })
    const hasVet = tags.has('veterinária')
    const hasHum = tags.has('humana')
    const hasComp = tags.has('manipulacao')
    const selectedCount = Number(hasVet) + Number(hasHum) + Number(hasComp)
    if (selectedCount > 1) return 'mista'
    if (hasComp) return 'manipulacao'
    if (hasHum) return 'humana'
    return 'veterinária'
  }, [controlledCatalog])

  const previewDoc = useMemo(() => {
    const base = createDefaultPrescriptionState()
    const items = controlledCatalog.slice(0, 3).map((entry, idx) => (
      entry.kind === 'standard'
        ? controlledItemFromStandard(entry, idx)
        : controlledItemFromCompounded(entry)
    ))

    const previewItems = items.length
      ? items
      : [
        {
          ...createDefaultItem('medication'),
          controlled: true,
          is_controlled: true,
          name: 'Tramadol',
          presentation: 'Comprimido',
          concentration: '50 mg/comprimido',
          routeGroup: 'ORAL' as const,
          doseUnit: 'mg/kg',
          doseValue: '2',
          frequencyType: 'everyHours' as const,
          everyHours: '12',
          durationDays: '7',
        },
      ]

    return renderRxToPrintDoc(
      {
        ...base,
        prescriber: {
          ...base.prescriber,
          name: previewProfile.fullName || base.prescriber.name,
          crmv: `CRMV-${previewProfile.uf || 'SP'} ${previewProfile.crmv || ''}`.trim(),
          clinicName: previewProfile.clinicName || base.prescriber.clinicName,
        },
        patient: {
          ...base.patient,
          name: 'Paciente Exemplo',
          species: 'Canina',
          breed: 'Sem raça definida',
          weightKg: '12,5',
        },
        tutor: {
          ...base.tutor,
          name: 'Tutor Exemplo',
          cpf: '123.456.789-10',
          addressLine: 'Rua Exemplo, 100 - Centro',
          city: 'São Paulo',
          state: 'SP',
        },
        items: previewItems,
      },
      { renderMode: 'template', documentKind: 'special-control' }
    )
  }, [controlledCatalog, previewProfile])

  const openTemplateEditor = () => {
    const templateId = specialTemplate?.id || 'rx_br_control_special'
    navigate(`/receituario-vet/templates?template=${encodeURIComponent(templateId)}&kind=special-control`)
  }

  return (
    <ReceituarioChrome
      section="controle"
      title="Controle Especial"
      subtitle="Monitoramento dos itens controlados do catálogo padrão e dos manipulados, com prévia do documento especial."
      actions={
        <>
          <Link to="/receituario-vet/catalogo3" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm">
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            Catálogo 3.0
          </Link>
          <Link to="/receituario-vet/manipulados" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm">
            <span className="material-symbols-outlined text-[18px]">science</span>
            Manipulados
          </Link>
          <button
            type="button"
            className="rxv-btn-primary inline-flex items-center gap-2 px-3 py-2 text-sm"
            onClick={openTemplateEditor}
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Editar modelo especial
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <section className="rxv-card p-5 xl:col-span-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold">Itens controlados</h2>
              <p className="text-xs text-[color:var(--rxv-muted)]">Leitura direta do catálogo padrão e do catálogo de manipulados da clínica.</p>
            </div>
            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
              {controlledCatalog.length} item(ns)
            </span>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[color:var(--rxv-muted)]">
            <span className="rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-2.5 py-1">
              Origem alvo: {controlledTargetPharmacy}
            </span>
            <button
              type="button"
              className="rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-2.5 py-1 font-semibold hover:border-[#61eb48]/45 hover:bg-[#61eb48]/10"
              onClick={() => void refreshControlledCatalog()}
            >
              Atualizar lista
            </button>
          </div>

          <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="rounded-xl border border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-4 py-6 text-sm text-[color:var(--rxv-muted)]">
                Carregando itens controlados...
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-6 text-sm text-red-200">
                Falha ao carregar o catálogo controlado: {error}
              </div>
            ) : controlledCatalog.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-4 py-6 text-sm text-[color:var(--rxv-muted)]">
                Nenhum item controlado encontrado no catálogo atual.
              </div>
            ) : (
              controlledCatalog.map((entry) => {
                if (entry.kind === 'compounded') {
                  const regimen = entry.bundle.regimens[0]
                  return (
                    <article key={entry.bundle.medication.id} className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-[color:var(--rxv-text)]">{entry.bundle.medication.name}</h3>
                            <span className="rounded border border-[#39ff14]/30 bg-[#39ff14]/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-[#98f98e]">
                              Manipulado
                            </span>
                            <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-red-300">
                              Controlado
                            </span>
                          </div>
                          <p className="text-xs text-[color:var(--rxv-muted)]">
                            Catálogo magistral da clínica
                          </p>
                        </div>
                        <button
                          type="button"
                          className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-1.5 text-xs font-semibold hover:border-[#61eb48]/45 hover:bg-[#61eb48]/10"
                          onClick={() => navigate('/receituario-vet/manipulados')}
                        >
                          Ver manipulado
                        </button>
                      </div>

                      <div className="mt-3 rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 px-3 py-3 text-sm">
                        <p className="font-semibold text-[color:var(--rxv-text)]">
                          {[entry.bundle.medication.pharmaceutical_form, entry.bundle.medication.default_qsp_text || entry.bundle.medication.default_quantity_text].filter(Boolean).join(' • ')}
                        </p>
                        <p className="mt-1 text-xs text-[color:var(--rxv-muted)]">
                          {regimen ? `Regime: ${regimen.regimen_name || regimen.species}` : 'Sem regime recomendado'}
                        </p>
                      </div>
                    </article>
                  )
                }

                const presentation = entry.presentations[0]
                return (
                  <article key={entry.id} className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-[color:var(--rxv-text)]">{entry.name}</h3>
                          <span className="rounded border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-cyan-300">
                            Padrão
                          </span>
                          <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-red-300">
                            Controlado
                          </span>
                        </div>
                        <p className="text-xs text-[color:var(--rxv-muted)]">
                          {entry.scope === 'global' ? 'Catálogo global' : 'Catálogo da clínica'} • {entry.presentations.length} apresentação(ões)
                        </p>
                      </div>
                      <button
                        type="button"
                        className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-1.5 text-xs font-semibold hover:border-[#61eb48]/45 hover:bg-[#61eb48]/10"
                        onClick={() => navigate('/receituario-vet/catalogo3')}
                      >
                        Ver no catálogo
                      </button>
                    </div>

                    <div className="mt-3 rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 px-3 py-3 text-sm">
                      <p className="font-semibold text-[color:var(--rxv-text)]">{buildPresentationSummary(presentation)}</p>
                      <p className="mt-1 text-xs text-[color:var(--rxv-muted)]">
                        Origem de farmácia: {inferPharmacyType(presentation)}
                      </p>
                    </div>
                  </article>
                )
              })
            )}
          </div>
        </section>

        <section className="rxv-card p-5 xl:col-span-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold">Prévia do modelo especial</h2>
              <p className="text-xs text-[color:var(--rxv-muted)]">Renderização do documento especial usando os itens controlados atuais.</p>
            </div>
            <span className="rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-2.5 py-1 text-xs font-semibold text-[color:var(--rxv-muted)]">
              {specialTemplate?.name || 'Modelo especial'}
            </span>
          </div>

          <div className="rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/50 p-3">
            <RxPrintView doc={previewDoc} template={specialTemplate} compact />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <button
              type="button"
              className="rxv-btn-secondary inline-flex items-center justify-center gap-2 px-4 py-2 text-sm"
              onClick={() => navigate('/receituario-vet/nova-receita-2')}
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              Abrir Nova Receita
            </button>
            <button
              type="button"
              className="rxv-btn-primary inline-flex items-center justify-center gap-2 px-4 py-2 text-sm"
              onClick={openTemplateEditor}
            >
              <span className="material-symbols-outlined text-[18px]">palette</span>
              Ajustar template especial
            </button>
          </div>
        </section>
      </div>
    </ReceituarioChrome>
  )
}
