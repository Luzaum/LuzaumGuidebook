import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { RxPrintView } from './RxPrintView'
import { createDefaultItem, createDefaultPrescriptionState } from './rxDefaults'
import { renderRxToPrintDoc } from './rxRenderer'
import { findSpecialControlTemplate, loadRxDb } from './rxDb'
import type { PharmacyType } from './rxTypes'
import { useClinic } from '../../src/components/ClinicProvider'
import {
  searchMedications,
  getMedicationPresentations,
  type MedicationPresentationRecord,
  type MedicationSearchResult,
} from '../../src/lib/clinicRecords'

type ControlledMedicationEntry = MedicationSearchResult & {
  presentations: MedicationPresentationRecord[]
}

function inferPharmacyType(presentation?: MedicationPresentationRecord): PharmacyType {
  if (!presentation) return 'veterinária'
  if (presentation.pharmacy_compounding) return 'manipulacao'
  if (presentation.pharmacy_human) return 'humana'
  return 'veterinária'
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

function controlledItemFromMedication(entry: ControlledMedicationEntry, index: number) {
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
  item.routeGroup = 'ORAL'
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

export default function ControleEspecialPage() {
  const navigate = useNavigate()
  const { clinicId } = useClinic()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [controlledCatalog, setControlledCatalog] = useState<ControlledMedicationEntry[]>([])

  const refreshControlledCatalog = useCallback(async () => {
    if (!clinicId) {
      setControlledCatalog([])
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const medications = await searchMedications(clinicId, '', 200)
      const controlled = medications.filter((entry) => entry.is_controlled)
      const withPresentations = await Promise.all(
        controlled.map(async (entry) => ({
          ...entry,
          presentations: await getMedicationPresentations(clinicId, entry.id),
        }))
      )
      setControlledCatalog(
        withPresentations.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
      )
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
    const items = controlledCatalog.slice(0, 3).map((entry, idx) => controlledItemFromMedication(entry, idx))

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
      subtitle="Medicamentos controlados do catálogo atual, com prévia do modelo especial e atalhos diretos para ajuste."
      actions={
        <>
          <Link to="/receituario-vet/catalogo3" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm">
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            Abrir Catálogo
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
              <h2 className="text-lg font-bold">Medicamentos controlados</h2>
              <p className="text-xs text-[color:var(--rxv-muted)]">Leitura direta do catálogo atual da clínica e do catálogo global.</p>
            </div>
            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
              {controlledCatalog.length} controlado(s)
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
                Carregando medicamentos controlados...
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-6 text-sm text-red-200">
                Falha ao carregar o catálogo controlado: {error}
              </div>
            ) : controlledCatalog.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-4 py-6 text-sm text-[color:var(--rxv-muted)]">
                Nenhum medicamento controlado encontrado no catálogo atual.
              </div>
            ) : (
              controlledCatalog.map((entry) => {
                const presentation = entry.presentations[0]
                return (
                  <article key={entry.id} className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-[color:var(--rxv-text)]">{entry.name}</h3>
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
              <p className="text-xs text-[color:var(--rxv-muted)]">Renderização do documento especial usando os medicamentos controlados do catálogo atual.</p>
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
