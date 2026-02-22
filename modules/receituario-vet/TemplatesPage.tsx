import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ReceituarioChrome from './ReceituarioChrome'
import {
  findSpecialControlTemplate,
  RxTemplateStyle,
  TemplateZoneKey,
  createDefaultTemplateStyle,
  loadRxDb,
  removeTemplate,
  saveRxDb,
  setActiveTemplate,
  upsertTemplate,
} from './rxDb'
import { createDefaultItem, createDefaultPrescriptionState } from './rxDefaults'
import { renderRxToPrintDoc } from './rxRenderer'
import { RxPrintView } from './RxPrintView'

const ZONE_LABELS: Array<{ key: TemplateZoneKey; label: string }> = [
  { key: 'header', label: 'Cabeçalho' },
  { key: 'patient', label: 'Dados do paciente' },
  { key: 'body', label: 'Corpo da receita' },
  { key: 'recommendations', label: 'Recomendações' },
  { key: 'signature', label: 'Assinatura' },
]

function cloneTemplate(template: RxTemplateStyle): RxTemplateStyle {
  return JSON.parse(JSON.stringify(template)) as RxTemplateStyle
}

function cloneWithDefaults(template?: RxTemplateStyle): RxTemplateStyle {
  if (!template) return createDefaultTemplateStyle()
  return {
    ...cloneTemplate(template),
    zoneStyles: template.zoneStyles || {},
  }
}

function resolveRequestedTemplateId(search: string, templates: RxTemplateStyle[]): string | undefined {
  const params = new URLSearchParams(search)
  const byId = params.get('template')
  if (byId && templates.some((entry) => entry.id === byId)) return byId
  if (params.get('kind') === 'special-control') {
    return findSpecialControlTemplate(templates)?.id
  }
  return undefined
}

function formatTemplateName(name: string): string {
  const normalized = (name || '').trim()
  if (normalized.length <= 25) return normalized
  return `${normalized.slice(0, 25)}…`
}

export default function TemplatesPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const previousRoute = ((location.state as { from?: string } | null)?.from || '').trim()
  const initialDb = useMemo(() => loadRxDb(), [])
  const initialRequestedTemplateId = useMemo(
    () => resolveRequestedTemplateId(location.search, initialDb.templates),
    [initialDb.templates, location.search]
  )
  const initialSelectedId = initialRequestedTemplateId || initialDb.activeTemplateId || initialDb.templates[0]?.id
  const [db, setDb] = useState(initialDb)
  const [selectedId, setSelectedId] = useState(initialSelectedId)
  const [draft, setDraft] = useState<RxTemplateStyle>(() => cloneWithDefaults(initialDb.templates.find((entry) => entry.id === selectedId) || createDefaultTemplateStyle()))
  const [jsonDraft, setJsonDraft] = useState(JSON.stringify(draft, null, 2))
  const [activeZone, setActiveZone] = useState<TemplateZoneKey>('body')
  const [error, setError] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [previewProfile] = useState(() => {
    const pool = initialDb.prescriberProfiles.length > 0 ? initialDb.prescriberProfiles : [initialDb.profile]
    const withAssets = pool.filter((entry) => !!entry.signatureDataUrl || !!entry.clinicLogoDataUrl)
    const source = (withAssets.length > 0 ? withAssets : pool)[Math.floor(Math.random() * (withAssets.length > 0 ? withAssets.length : pool.length))]
    return source
  })

  const previewDoc = useMemo(() => {
    const base = createDefaultPrescriptionState()
    const med = createDefaultItem('medication')
    med.routeGroup = 'ORAL'
    med.autoInstruction = false
    med.manualEdited = true

    const isSpecialTemplate = draft.documentKindTarget === 'special-control' || draft.id === 'rx_br_control_special'
    if (isSpecialTemplate) {
      med.name = 'Amoxicilina + Clavulanato'
      med.presentation = 'Comprimido'
      med.concentration = '250 mg/comprimido'
      med.doseValue = '1'
      med.doseUnit = 'comprimido'
      med.timesPerDay = '2'
      med.durationDays = '7'
      med.instruction = 'Administrar 1 comprimido a cada 12 horas, por 7 dias.'
      med.controlled = true

      return renderRxToPrintDoc(
        {
          ...base,
          items: [med],
        },
        { renderMode: 'template', documentKind: 'special-control' }
      )
    }

    med.name = 'Dipirona Sódica'
    med.presentation = 'Gotas'
    med.concentration = '500 mg/mL'
    med.doseValue = '25'
    med.doseUnit = 'mg/kg'
    med.frequencyType = 'everyHours'
    med.everyHours = '8'
    med.durationDays = '3'
    med.instruction = 'Administrar dose conforme peso, via oral, a cada 8 horas.'

    return renderRxToPrintDoc(
      {
        ...base,
        items: [med],
      },
      { renderMode: 'template', documentKind: 'standard' }
    )
  }, [draft.documentKindTarget, draft.id])
  const activeZoneStyle = draft.zoneStyles?.[activeZone] || {}
  const previewZoom = draft.documentKindTarget === 'special-control' ? 0.62 : 0.78

  const selectTemplate = useCallback((templateId: string) => {
    const next = db.templates.find((entry) => entry.id === templateId)
    if (!next) return
    setSelectedId(templateId)
    const cloned = cloneWithDefaults(next)
    setDraft(cloned)
    setJsonDraft(JSON.stringify(cloned, null, 2))
    setError('')
  }, [db.templates])

  useEffect(() => {
    const requestedTemplateId = resolveRequestedTemplateId(location.search, db.templates)
    if (!requestedTemplateId) return
    if (requestedTemplateId !== selectedId) {
      selectTemplate(requestedTemplateId)
    }
    navigate({ pathname: location.pathname, search: '' }, { replace: true })
  }, [db.templates, location.pathname, location.search, navigate, selectTemplate, selectedId])

  const pushToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2200)
  }

  const saveTemplate = () => {
    const payload = {
      ...draft,
      showMapaSignature: draft.documentKindTarget === 'special-control' ? draft.showMapaSignature : false,
      updatedAt: new Date().toISOString(),
    }
    let nextDb = loadRxDb()
    if (payload.documentKindTarget === 'special-control') {
      nextDb = {
        ...nextDb,
        templates: nextDb.templates.map((entry) =>
          entry.id === payload.id ? entry : { ...entry, documentKindTarget: 'standard' }
        ),
      }
    }
    nextDb = upsertTemplate(nextDb, payload)
    nextDb = setActiveTemplate(nextDb, payload.id)
    saveRxDb(nextDb)
    setDb(nextDb)
    setSelectedId(payload.id)
    setJsonDraft(JSON.stringify(payload, null, 2))
    pushToast('Template salvo com sucesso.')
  }

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonDraft) as Partial<RxTemplateStyle>
      const next: RxTemplateStyle = {
        ...createDefaultTemplateStyle(parsed.id || `template-${Date.now().toString(36)}`, parsed.name || 'Template customizado'),
        ...parsed,
        zoneStyles: parsed.zoneStyles || {},
        updatedAt: new Date().toISOString(),
      }
      setDraft(next)
      setError('')
      pushToast('JSON aplicado no editor.')
    } catch {
      setError('JSON inválido. Verifique a estrutura e tente novamente.')
    }
  }

  const createTemplate = () => {
    const next = createDefaultTemplateStyle(`template-${Date.now().toString(36)}`, 'Novo template')
    setSelectedId(next.id)
    setDraft(next)
    setJsonDraft(JSON.stringify(next, null, 2))
    setError('')
  }

  const deleteTemplate = () => {
    const nextDb = removeTemplate(loadRxDb(), draft.id)
    saveRxDb(nextDb)
    setDb(nextDb)
    const fallback = nextDb.templates[0]
    if (fallback) {
      setSelectedId(fallback.id)
      const cloned = cloneWithDefaults(fallback)
      setDraft(cloned)
      setJsonDraft(JSON.stringify(cloned, null, 2))
    }
    pushToast('Template removido.')
  }

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(draft, null, 2))
      pushToast('JSON copiado para a área de transferência.')
    } catch {
      pushToast('Não foi possível copiar o JSON.')
    }
  }

  const updateZoneStyle = (patch: Partial<RxTemplateStyle['zoneStyles'][TemplateZoneKey]>) => {
    setDraft((prev) => ({
      ...prev,
      zoneStyles: {
        ...(prev.zoneStyles || {}),
        [activeZone]: {
          ...(prev.zoneStyles?.[activeZone] || {}),
          ...patch,
        },
      },
    }))
  }

  return (
    <ReceituarioChrome
      section="templates"
      title="Editor de Templates"
      subtitle="Altere fontes, cores e formatação por JSON ou clicando diretamente nas áreas da receita." 
      actions={
        <>
          <button
            type="button"
            className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm"
            onClick={() => {
              if (previousRoute) {
                navigate(previousRoute)
                return
              }
              navigate(-1)
            }}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Voltar
          </button>
          <Link to="/receituario-vet/nova-receita" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm">
            <span className="material-symbols-outlined text-[18px]">description</span>
            Nova Receita
          </Link>
          <button type="button" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={createTemplate}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Novo template
          </button>
          <button type="button" className="rxv-btn-primary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={saveTemplate}>
            <span className="material-symbols-outlined text-[18px]">save</span>
            Salvar template
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <aside className="rxv-card p-4 xl:col-span-3">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[color:var(--rxv-muted)]">Templates</h3>
          <div className="space-y-2">
            {db.templates.map((template) => (
              <button
                type="button"
                key={template.id}
                className={`w-full rounded-xl border px-3 py-2 text-left ${selectedId === template.id ? 'border-[#61eb48]/45 bg-[#61eb48]/10' : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/60'}`}
                onClick={() => selectTemplate(template.id)}
              >
                <p className="max-w-[25ch] break-words text-sm font-semibold leading-tight">{formatTemplateName(template.name)}</p>
                <p className="text-xs text-[color:var(--rxv-muted)]">{template.id}</p>
              </button>
            ))}
          </div>
          <button type="button" className="mt-4 w-full rounded-lg border border-red-700/60 px-3 py-2 text-sm text-red-300 hover:bg-red-900/20" onClick={deleteTemplate}>
            Remover template atual
          </button>
        </aside>

        <main className="space-y-6 xl:col-span-5">
          <section className="rxv-card p-5">
            <h2 className="mb-4 text-lg font-bold">Configuração visual global</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                Nome do template
                <input className="mt-1 w-full px-3 py-2" value={draft.name} onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                ID do template
                <input className="mt-1 w-full px-3 py-2" value={draft.id} onChange={(e) => setDraft((prev) => ({ ...prev, id: e.target.value }))} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                Fonte padrão
                <input className="mt-1 w-full px-3 py-2" value={draft.fontFamily} onChange={(e) => setDraft((prev) => ({ ...prev, fontFamily: e.target.value }))} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Fonte base (pt)
                <input type="number" min={9} max={20} className="mt-1 w-full px-3 py-2" value={draft.fontSizePt} onChange={(e) => setDraft((prev) => ({ ...prev, fontSizePt: Number(e.target.value || 12) }))} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Título (pt)
                <input type="number" min={12} max={32} className="mt-1 w-full px-3 py-2" value={draft.headingSizePt} onChange={(e) => setDraft((prev) => ({ ...prev, headingSizePt: Number(e.target.value || 18) }))} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Line-height
                <input type="number" step="0.05" min={1} max={2} className="mt-1 w-full px-3 py-2" value={draft.lineHeight} onChange={(e) => setDraft((prev) => ({ ...prev, lineHeight: Number(e.target.value || 1.45) }))} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Papel
                <select className="mt-1 w-full px-3 py-2" value={draft.paperSize} onChange={(e) => setDraft((prev) => ({ ...prev, paperSize: e.target.value as 'A4' | 'A5' }))}>
                  <option value="A4">A4</option>
                  <option value="A5">A5</option>
                </select>
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Cor de destaque
                <input type="color" className="mt-1 h-10 w-full rounded border border-[color:var(--rxv-border)] bg-transparent p-1" value={draft.accentColor} onChange={(e) => setDraft((prev) => ({ ...prev, accentColor: e.target.value }))} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Cor do texto
                <input type="color" className="mt-1 h-10 w-full rounded border border-[color:var(--rxv-border)] bg-transparent p-1" value={draft.textColor} onChange={(e) => setDraft((prev) => ({ ...prev, textColor: e.target.value }))} />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                Cor do papel
                <input type="color" className="mt-1 h-10 w-full rounded border border-[color:var(--rxv-border)] bg-transparent p-1" value={draft.paperBg} onChange={(e) => setDraft((prev) => ({ ...prev, paperBg: e.target.value }))} />
              </label>
            </div>
          </section>

          <section className="rxv-card p-5">
            <h2 className="mb-4 text-lg font-bold">Edição interativa por área</h2>
            <p className="mb-3 text-xs text-[color:var(--rxv-muted)]">
              Passe o mouse e clique no preview para selecionar uma área da receita e ajustar fonte/cor localmente.
            </p>
            <div className="mb-3 flex flex-wrap gap-2">
              {ZONE_LABELS.map((zone) => (
                <button
                  type="button"
                  key={zone.key}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${activeZone === zone.key ? 'border-[#61eb48]/45 bg-[#61eb48]/10 text-[#61eb48]' : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]'}`}
                  onClick={() => setActiveZone(zone.key)}
                >
                  {zone.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                Fonte da área
                <select
                  className="mt-1 w-full px-3 py-2"
                  value={activeZoneStyle.fontFamily || ''}
                  onChange={(e) => updateZoneStyle({ fontFamily: e.target.value || undefined })}
                >
                  <option value="">Usar padrão global</option>
                  <option value="Manrope, Arial, sans-serif">Manrope</option>
                  <option value="Arial, Helvetica, sans-serif">Arial</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="'Roboto Mono', monospace">Roboto Mono</option>
                </select>
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Tamanho local (pt)
                <input
                  type="number"
                  min={8}
                  max={26}
                  className="mt-1 w-full px-3 py-2"
                  value={activeZoneStyle.fontSizePt ?? ''}
                  onChange={(e) => updateZoneStyle({ fontSizePt: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="Padrão"
                />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Peso da fonte
                <select
                  className="mt-1 w-full px-3 py-2"
                  value={activeZoneStyle.fontWeight || ''}
                  onChange={(e) => updateZoneStyle({ fontWeight: (e.target.value || undefined) as 'normal' | 'medium' | 'bold' | undefined })}
                >
                  <option value="">Padrão</option>
                  <option value="normal">Normal</option>
                  <option value="medium">Médio</option>
                  <option value="bold">Negrito</option>
                </select>
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Cor do texto local
                <input
                  type="color"
                  className="mt-1 h-10 w-full rounded border border-[color:var(--rxv-border)] bg-transparent p-1"
                  value={activeZoneStyle.textColor || '#1f2937'}
                  onChange={(e) => updateZoneStyle({ textColor: e.target.value })}
                />
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Cor de destaque local
                <input
                  type="color"
                  className="mt-1 h-10 w-full rounded border border-[color:var(--rxv-border)] bg-transparent p-1"
                  value={activeZoneStyle.accentColor || '#1d4ed8'}
                  onChange={(e) => updateZoneStyle({ accentColor: e.target.value })}
                />
              </label>
              <label className="flex items-center gap-2 text-sm md:col-span-2">
                <input type="checkbox" checked={!!activeZoneStyle.italic} onChange={(e) => updateZoneStyle({ italic: e.target.checked || undefined })} className="h-4 w-4 rounded" />
                Itálico local
              </label>
              <label className="flex items-center gap-2 text-sm md:col-span-2">
                <input type="checkbox" checked={!!activeZoneStyle.underline} onChange={(e) => updateZoneStyle({ underline: e.target.checked || undefined })} className="h-4 w-4 rounded" />
                Sublinhado local
              </label>
              <label className="flex items-center gap-2 text-sm md:col-span-2">
                <input type="checkbox" checked={draft.showLetterhead} onChange={(e) => setDraft((prev) => ({ ...prev, showLetterhead: e.target.checked }))} className="h-4 w-4 rounded" />
                Exibir papel timbrado
              </label>
              <label className="flex items-center gap-2 text-sm md:col-span-2">
                <input type="checkbox" checked={draft.showSignature} onChange={(e) => setDraft((prev) => ({ ...prev, showSignature: e.target.checked }))} className="h-4 w-4 rounded" />
                Exibir assinatura digital
              </label>
              <label className="flex items-center gap-2 text-sm md:col-span-2">
                <input
                  type="checkbox"
                  checked={draft.documentKindTarget === 'special-control'}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      documentKindTarget: e.target.checked ? 'special-control' : 'standard',
                      showMapaSignature: e.target.checked ? prev.showMapaSignature : false,
                    }))
                  }
                  className="h-4 w-4 rounded"
                />
                Esta é uma receita de controle especial
              </label>
              <label className={`flex items-center gap-2 text-sm md:col-span-2 ${draft.documentKindTarget === 'special-control' ? '' : 'opacity-60'}`}>
                <input
                  type="checkbox"
                  checked={draft.showMapaSignature}
                  disabled={draft.documentKindTarget !== 'special-control'}
                  onChange={(e) => setDraft((prev) => ({ ...prev, showMapaSignature: e.target.checked }))}
                  className="h-4 w-4 rounded"
                />
                Exibir assinatura GOV.BR junto da assinatura CRMV
              </label>
              <label className="flex items-center gap-2 text-sm md:col-span-2">
                <input type="checkbox" checked={draft.showTimestamp} onChange={(e) => setDraft((prev) => ({ ...prev, showTimestamp: e.target.checked }))} className="h-4 w-4 rounded" />
                Exibir carimbo de data/hora
              </label>
              <label className="text-xs text-[color:var(--rxv-muted)] md:col-span-2">
                Notas extras
                <textarea className="mt-1 w-full px-3 py-2" rows={3} value={draft.extraNotes} onChange={(e) => setDraft((prev) => ({ ...prev, extraNotes: e.target.value }))} />
              </label>
            </div>
          </section>

          <section className="rxv-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">Template JSON</h2>
              <div className="flex gap-2">
                <button type="button" className="rxv-btn-secondary px-3 py-1.5 text-xs" onClick={() => setJsonDraft(JSON.stringify(draft, null, 2))}>Atualizar JSON</button>
                <button type="button" className="rxv-btn-secondary px-3 py-1.5 text-xs" onClick={copyJson}>Copiar JSON</button>
                <button type="button" className="rxv-btn-secondary px-3 py-1.5 text-xs" onClick={applyJson}>Aplicar JSON</button>
              </div>
            </div>
            <textarea className="w-full px-3 py-2 font-mono text-xs" rows={16} value={jsonDraft} onChange={(e) => setJsonDraft(e.target.value)} />
            {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
          </section>
        </main>

        <aside className="xl:col-span-4">
          <div className="sticky top-24 max-h-[calc(100vh-120px)] space-y-3 overflow-y-auto pr-1">
            <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-2 text-xs text-[color:var(--rxv-muted)]">
              Área ativa: <strong className="text-[color:var(--rxv-text)]">{ZONE_LABELS.find((zone) => zone.key === activeZone)?.label}</strong>
            </div>
            <RxPrintView
              doc={previewDoc}
              compact
              zoom={previewZoom}
              template={draft}
              signatureDataUrl={previewProfile.signatureDataUrl}
              mapaSignatureDataUrl={previewProfile.mapaSignatureDataUrl}
              logoDataUrl={previewProfile.clinicLogoDataUrl}
              prescriberPhone={previewProfile.clinicPhone}
              prescriberAddressLine={previewProfile.clinicAddress}
              targetPharmacy={draft.documentKindTarget === 'special-control' || draft.id === 'rx_br_control_special' ? 'humana' : undefined}
              interactive
              activeZone={activeZone}
              onZoneSelect={setActiveZone}
            />
          </div>
        </aside>
      </div>

      {toast ? (
        <div className="fixed bottom-6 right-6 z-[120] rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] px-4 py-3 text-sm font-semibold text-[#67e952]">
          {toast}
        </div>
      ) : null}
    </ReceituarioChrome>
  )
}

