import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import { RxPrintView } from './RxPrintView'
import { createDefaultItem, createDefaultPrescriptionState } from './rxDefaults'
import { renderRxToPrintDoc } from './rxRenderer'
import { CatalogDrug, findSpecialControlTemplate, loadRxDb } from './rxDb'
import { PharmacyType } from './rxTypes'

function buildCatalogControlledTargetPharmacy(
  controlledCatalog: CatalogDrug[]
): 'veterinaria' | 'humana' | 'manipulacao' | 'mista' {
  const tags = new Set<PharmacyType>()
  controlledCatalog.forEach((drug) => {
    if (drug.presentations.length > 0) {
      drug.presentations.forEach((presentation) => {
        const values = presentation.pharmacyTags?.length ? presentation.pharmacyTags : [drug.pharmacyType]
        values.forEach((value) => tags.add(value))
      })
    } else {
      tags.add(drug.pharmacyType)
    }
  })

  const hasVeterinaria = tags.has('veterinaria')
  const hasHumana = tags.has('humana')
  const hasManipulacao = tags.has('manipulacao')
  const selectedCount = Number(hasVeterinaria) + Number(hasHumana) + Number(hasManipulacao)
  if (selectedCount > 1) return 'mista'
  if (hasManipulacao) return 'manipulacao'
  if (hasHumana) return 'humana'
  return 'veterinaria'
}

function controlledItemFromDrug(drug: CatalogDrug, index: number) {
  const item = createDefaultItem('medication')
  const presentation = drug.presentations[0]
  item.name = drug.name
  item.catalogDrugId = drug.id
  item.controlled = true
  item.presentation = presentation?.name || 'Comprimido'
  item.concentration = presentation?.concentration || ''
  item.commercialName = presentation?.commercialName || ''
  item.routeGroup = drug.routeGroup || 'ORAL'
  item.doseUnit = drug.doseUnit || 'mg/kg'
  item.pharmacyType = (presentation?.pharmacyTags?.[0] || drug.pharmacyType || 'veterinaria') as PharmacyType
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
  const [db, setDb] = useState(() => loadRxDb())

  const refreshDb = useCallback(() => {
    setDb(loadRxDb())
  }, [])

  useEffect(() => {
    refreshDb()
    const intervalId = window.setInterval(refreshDb, 1400)
    const onStorage = () => refreshDb()
    const onFocus = () => refreshDb()
    const onVisibility = () => {
      if (document.visibilityState === 'visible') refreshDb()
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [refreshDb])

  const controlledCatalog = useMemo(
    () => db.catalog.filter((drug) => drug.controlled).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [db.catalog]
  )

  const specialTemplate = useMemo(
    () => findSpecialControlTemplate(db.templates) || db.templates.find((entry) => entry.id === 'rx_br_control_special') || db.templates[0],
    [db.templates]
  )

  const previewProfile = useMemo(() => db.prescriberProfiles[0] || db.profile, [db.prescriberProfiles, db.profile])

  const controlledTargetPharmacy = useMemo(
    () => buildCatalogControlledTargetPharmacy(controlledCatalog),
    [controlledCatalog]
  )

  const previewDoc = useMemo(() => {
    const base = createDefaultPrescriptionState()
    const items = controlledCatalog.slice(0, 3).map((drug, idx) => controlledItemFromDrug(drug, idx))

    const previewItems = items.length
      ? items
      : [
          {
            ...createDefaultItem('medication'),
            controlled: true,
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
      title="Receituário de Controle Especial"
      subtitle="Lista viva de controlados no catálogo e prévia do modelo especial em tempo real."
      actions={
        <>
          <Link to="/receituario-vet/catalogo" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm">
            <span className="material-symbols-outlined text-[18px]">medication</span>
            Abrir Catálogo
          </Link>
          <button
            type="button"
            className="rxv-btn-primary inline-flex items-center gap-2 px-3 py-2 text-sm"
            onClick={openTemplateEditor}
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Editar receita especial
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <section className="rxv-card p-5 xl:col-span-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold">Catálogo controlado</h2>
              <p className="text-xs text-[color:var(--rxv-muted)]">Atualização automática a cada alteração no banco local.</p>
            </div>
            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
              {controlledCatalog.length} controlado(s)
            </span>
          </div>

          <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
            {controlledCatalog.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-4 py-6 text-sm text-[color:var(--rxv-muted)]">
                Nenhum fármaco controlado encontrado no catálogo.
              </div>
            ) : (
              controlledCatalog.map((drug) => {
                const pharmacyTags = Array.from(
                  new Set(
                    drug.presentations.flatMap((presentation) =>
                      presentation.pharmacyTags?.length ? presentation.pharmacyTags : [drug.pharmacyType]
                    )
                  )
                )
                return (
                  <article key={drug.id} className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-[color:var(--rxv-text)]">{drug.name}</h3>
                        <p className="text-xs text-[color:var(--rxv-muted)]">
                          {drug.presentations.length} apresentação(ões) • via {drug.routeGroup}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-1.5 text-xs font-semibold hover:border-[#61eb48]/45 hover:bg-[#61eb48]/10"
                        onClick={() => navigate(`/receituario-vet/catalogo?drug=${encodeURIComponent(drug.id)}`)}
                      >
                        Editar no catálogo
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {pharmacyTags.map((tag) => (
                        <span key={`${drug.id}-${tag}`} className="rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-2 py-0.5 text-[11px] text-[color:var(--rxv-muted)]">
                          {tag === 'humana' ? 'Farmácia humana' : tag === 'manipulacao' ? 'Manipulação' : 'Farmácia veterinária'}
                        </span>
                      ))}
                    </div>

                    {drug.presentations.length > 0 ? (
                      <ul className="mt-3 space-y-1 text-xs text-[color:var(--rxv-text)]">
                        {drug.presentations.slice(0, 4).map((presentation) => (
                          <li key={presentation.id}>
                            - {presentation.commercialName || presentation.name}{' '}
                            {presentation.concentration ? `(${presentation.concentration})` : ''}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                )
              })
            )}
          </div>
        </section>

        <section className="rxv-card p-5 xl:col-span-6">
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold">Visualização rápida da receita especial</h2>
              <p className="text-xs text-[color:var(--rxv-muted)]">Template ativo: {specialTemplate?.name || 'rx_br_control_special'}</p>
            </div>
          </div>

          <div className="group relative">
            <div className="overflow-hidden rounded-xl transition-all duration-200 group-hover:shadow-[0_0_0_2px_rgba(57,255,20,0.45),0_0_28px_rgba(57,255,20,0.18)]">
              <RxPrintView
                doc={previewDoc}
                template={specialTemplate}
                signatureDataUrl={previewProfile.signatureDataUrl}
                mapaSignatureDataUrl={previewProfile.mapaSignatureDataUrl}
                logoDataUrl={previewProfile.clinicLogoDataUrl}
                prescriberPhone={previewProfile.clinicPhone}
                prescriberAddressLine={previewProfile.clinicAddress}
                targetPharmacy={controlledTargetPharmacy}
              />
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-[#091108]/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <button
                type="button"
                className="pointer-events-auto rounded-lg border border-[#61eb48]/55 bg-[#61eb48]/15 px-4 py-2 text-sm font-bold text-[#c8ffc0] hover:bg-[#61eb48]/25"
                onClick={openTemplateEditor}
              >
                Editar essa receita
              </button>
            </div>
          </div>
        </section>
      </div>
    </ReceituarioChrome>
  )
}
