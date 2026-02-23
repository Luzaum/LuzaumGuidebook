import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { RxPrintView } from './RxPrintView'
import { buildAutoInstruction, renderRxToPrintDoc, resolveFrequency, splitPrescriptionByControl } from './rxRenderer'
import { createDefaultPrescriptionState } from './rxDefaults'
import { loadRxDraft, saveRxDraft } from './rxStorage'
import {
  findSpecialControlTemplate,
  RxTemplateStyle,
  TemplateZoneKey,
  loadRxDb,
  saveRxDb,
  setActiveTemplate,
  upsertClientFromPrescription,
  upsertHistoryFromPrescription,
  upsertPatientFromPrescription,
  upsertTemplate,
} from './rxDb'
import { PrescriptionItem, PrescriptionState, PrintDoc, RouteGroup, SpecialControlPharmacy } from './rxTypes'

interface ShareState {
  open: boolean
  whatsappPhone: string
  whatsappMessage: string
  email: string
  emailSubject: string
  includeBcc: boolean
}

type ReviewSelection =
  | { kind: 'item'; itemId: string }
  | { kind: 'zone'; zone: TemplateZoneKey }
  | null
type PrintableDocKind = 'standard' | 'special-control'
type ZoneTextOverrideState = Record<PrintableDocKind, Partial<Record<TemplateZoneKey, string>>>

const ROUTE_OPTIONS: Array<{ value: RouteGroup; label: string }> = [
  { value: 'ORAL', label: 'Oral' },
  { value: 'OTOLOGICO', label: 'Otológico' },
  { value: 'OFTALMICO', label: 'Oftálmico' },
  { value: 'TOPICO', label: 'Tópico' },
  { value: 'INTRANASAL', label: 'Intranasal' },
  { value: 'RETAL', label: 'Retal' },
  { value: 'SC', label: 'Subcutâneo (SC)' },
  { value: 'IM', label: 'Intramuscular (IM)' },
  { value: 'IV', label: 'Intravenoso (IV)' },
  { value: 'INALATORIO', label: 'Inalatório' },
  { value: 'TRANSDERMICO', label: 'Transdérmico' },
  { value: 'OUTROS', label: 'Outros' },
]

const DOSE_UNIT_OPTIONS = ['mg/kg', 'mcg/kg', 'g/kg', 'mL/kg', 'UI/kg', 'comprimido/kg', 'gota/kg', 'mg', 'mL', 'comprimido', 'gota', 'cápsula']

function resolveDocKindKey(doc?: PrintDoc | null): PrintableDocKind {
  return doc?.documentKind === 'special-control' ? 'special-control' : 'standard'
}

function buildZoneDefaultText(
  doc: PrintDoc,
  zone: TemplateZoneKey,
  inlineEditNote: string
): string {
  if (zone === 'header') {
    return [
      `Clínica: ${doc.clinicName}`,
      `Prescritor: ${doc.prescriberName} - ${doc.prescriberCrmv}`,
      `Data: ${doc.dateLabel}`,
    ].join('\n')
  }

  if (zone === 'patient') {
    return [
      `Paciente: ${doc.patientLine}`,
      `Responsável: ${doc.tutorLine}`,
      doc.addressLine ? `Endereço: ${doc.addressLine}` : '',
    ]
      .filter(Boolean)
      .join('\n')
  }

  if (zone === 'body') {
    return doc.sections
      .map((section) => {
        const items = section.items
          .map((item) => {
            const cautions = item.cautions.length ? `\nCautelas: ${item.cautions.join(' | ')}` : ''
            const subtitle = item.subtitle ? `\n${item.subtitle}` : ''
            return `${item.index}. ${item.title}${subtitle}\n${item.instruction}${cautions}`
          })
          .join('\n\n')
        return `${section.title}\n${items}`
      })
      .join('\n\n')
  }

  if (zone === 'recommendations') {
    const lines: string[] = []
    if (doc.recommendations.length) {
      lines.push('RECOMENDAÇÕES:')
      doc.recommendations.forEach((line) => lines.push(`- ${line}`))
    }
    if (doc.exams.length) {
      if (lines.length) lines.push('')
      lines.push('EXAMES SUGERIDOS:')
      doc.exams.forEach((line) => lines.push(`- ${line}`))
    }
    if (inlineEditNote.trim()) {
      if (lines.length) lines.push('')
      lines.push('OBSERVAÇÃO ADICIONAL:')
      lines.push(inlineEditNote.trim())
    }
    return lines.join('\n')
  }

  if (zone === 'signature') {
    return `${doc.prescriberName}\n${doc.prescriberCrmv}`
  }

  return ''
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

function normalizeWhatsAppPhone(value: string): string {
  const digits = onlyDigits(value)
  if (!digits) return ''
  if (digits.startsWith('00')) return digits.slice(2)
  if (digits.startsWith('55')) return digits
  if (digits.length === 10 || digits.length === 11) return `55${digits}`
  return digits
}

function sanitizeFilePart(value: string): string {
  return (value || 'SEM_DADO')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase()
}

function buildPdfFileBaseName(patientName: string, tutorName: string): string {
  const date = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')
  return `${sanitizeFilePart(patientName)}_${sanitizeFilePart(tutorName)}_${date}`
}

async function buildPdfFileFromPreview(args: {
  patientName: string
  tutorName: string
  previewElements: Array<HTMLElement>
  paperSize: 'A4' | 'A5'
}): Promise<File> {
  const { patientName, tutorName, previewElements, paperSize } = args
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: paperSize === 'A5' ? 'a5' : 'a4',
  })

  for (let idx = 0; idx < previewElements.length; idx += 1) {
    const element = previewElements[idx]
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
    })
    const img = canvas.toDataURL('image/png')
    if (idx > 0) pdf.addPage()
    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()
    pdf.addImage(img, 'PNG', 0, 0, pageW, pageH, undefined, 'FAST')
  }

  const fileName = `${buildPdfFileBaseName(patientName, tutorName)}.pdf`
  const blob = pdf.output('blob')
  return new File([blob], fileName, { type: 'application/pdf' })
}

async function tryShareFile(file: File, title: string, text: string): Promise<boolean> {
  if (!('share' in navigator)) return false
  const n = navigator as Navigator & { canShare?: (data: ShareData) => boolean }
  const payload: ShareData = { title, text, files: [file] }
  if (typeof n.canShare === 'function' && !n.canShare(payload)) return false
  try {
    await navigator.share(payload)
    return true
  } catch {
    return false
  }
}

function triggerFileDownload(file: File) {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function patchItemInState(prev: PrescriptionState, itemId: string, updater: (item: PrescriptionItem) => PrescriptionItem): PrescriptionState {
  const idx = prev.items.findIndex((entry) => entry.id === itemId)
  if (idx < 0) return prev

  const now = new Date().toISOString()
  let nextItem = { ...updater(prev.items[idx]), updatedAt: now }
  let nextItems = prev.items.map((entry) => (entry.id === itemId ? nextItem : entry))

  if (nextItem.autoInstruction && !nextItem.manualEdited) {
    const tempState: PrescriptionState = { ...prev, items: nextItems }
    nextItem = { ...nextItem, instruction: buildAutoInstruction(nextItem, tempState), updatedAt: now }
    nextItems = nextItems.map((entry) => (entry.id === itemId ? nextItem : entry))
  }

  return {
    ...prev,
    items: nextItems,
    updatedAt: now,
  }
}

export default function RxPrintPage() {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const mode = useMemo(() => new URLSearchParams(location.search).get('mode') || 'final', [location.search])
  const isReviewMode = mode === 'review'

  const db = useMemo(() => loadRxDb(), [])
  const [prescription, setPrescription] = useState<PrescriptionState>(() => {
    const draft = loadRxDraft()
    if (draft && (!id || draft.id === id)) return draft
    return createDefaultPrescriptionState()
  })
  const [selection, setSelection] = useState<ReviewSelection>(null)

  const rawActiveTemplate = useMemo(() => {
    const preferredStandardId = prescription.recommendations.standardTemplateId
    const found = preferredStandardId
      ? db.templates.find((entry) => entry.id === preferredStandardId && entry.documentKindTarget !== 'special-control')
      : db.templates.find((entry) => entry.id === db.activeTemplateId)
    return found || db.templates[0]
  }, [db.activeTemplateId, db.templates, prescription.recommendations.standardTemplateId])
  const activeTemplate = useMemo(() => {
    if (!rawActiveTemplate) return db.templates[0]
    if (rawActiveTemplate.documentKindTarget !== 'special-control') return rawActiveTemplate
    return db.templates.find((entry) => entry.documentKindTarget !== 'special-control') || rawActiveTemplate
  }, [db.templates, rawActiveTemplate])

  const selectedPrescriberProfile = useMemo(
    () => db.prescriberProfiles.find((entry) => entry.id === prescription.prescriber.profileId) || db.profile,
    [db.prescriberProfiles, db.profile, prescription.prescriber.profileId]
  )

  const [templateDraft, setTemplateDraft] = useState<RxTemplateStyle>(
    activeTemplate || {
      id: 'rx_br_v1_clean',
      name: 'rx_br_v1_clean',
      documentKindTarget: 'standard',
      fontFamily: 'Manrope, Arial, sans-serif',
      fontSizePt: 12,
      headingSizePt: 18,
      lineHeight: 1.45,
      accentColor: '#1d4ed8',
      textColor: '#1f2937',
      paperBg: '#ffffff',
      paperSize: 'A4',
      showLetterhead: true,
      showSignature: true,
      showMapaSignature: false,
      showTimestamp: true,
      extraNotes: '',
      zoneStyles: {},
      updatedAt: new Date().toISOString(),
    }
  )
  const [activeDocIndex, setActiveDocIndex] = useState(0)
  const [docViewMode, setDocViewMode] = useState<'single' | 'side-by-side'>('single')
  const [inlineEditNote, setInlineEditNote] = useState('')
  const [zoneTextOverrides, setZoneTextOverrides] = useState<ZoneTextOverrideState>({
    standard: {},
    'special-control': {},
  })
  const [toast, setToast] = useState<string | null>(null)
  const [share, setShare] = useState<ShareState>({
    open: false,
    whatsappPhone: prescription.tutor.phone || '',
    whatsappMessage: `Olá ${prescription.tutor.name || ''}, aqui está a receita do paciente ${prescription.patient.name || ''}.`,
    email: '',
    emailSubject: `Receita Veterinária - ${selectedPrescriberProfile.clinicName || 'VETIUS'}`,
    includeBcc: false,
  })
  const previewSheetRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (!isReviewMode) return
    const timeout = window.setTimeout(() => saveRxDraft(prescription), 350)
    return () => window.clearTimeout(timeout)
  }, [isReviewMode, prescription])

  const splitDocs = useMemo(() => splitPrescriptionByControl(prescription), [prescription])
  const hasSpecialControlDocs = useMemo(
    () => (splitDocs.specialControl?.items.length || 0) > 0,
    [splitDocs.specialControl]
  )
  const selectableTemplates = useMemo(() => {
    const list = db.templates.filter((entry) => entry.documentKindTarget !== 'special-control')
    return list.length ? list : [activeTemplate]
  }, [activeTemplate, db.templates])
  const specialSelectableTemplates = useMemo(() => {
    const list = db.templates.filter((entry) => entry.documentKindTarget === 'special-control')
    return list.length ? list : db.templates
  }, [db.templates])

  const printDocs = useMemo(() => {
    const renderMode = mode === 'template' ? 'template' : 'final'
    const docs: Array<ReturnType<typeof renderRxToPrintDoc>> = []
    if (splitDocs.standard) docs.push(renderRxToPrintDoc(splitDocs.standard, { renderMode, documentKind: 'standard' }))
    if (splitDocs.specialControl) docs.push(renderRxToPrintDoc(splitDocs.specialControl, { renderMode, documentKind: 'special-control' }))
    if (!docs.length) docs.push(renderRxToPrintDoc(prescription, { renderMode, documentKind: 'standard' }))
    return docs
  }, [mode, prescription, splitDocs.specialControl, splitDocs.standard])

  const specialControlTemplate = useMemo(() => {
    const preferredSpecialId = prescription.recommendations.specialControlTemplateId
    const fixed =
      (preferredSpecialId
        ? db.templates.find((entry) => entry.id === preferredSpecialId && entry.documentKindTarget === 'special-control')
        : null) ||
      findSpecialControlTemplate(db.templates) ||
      db.templates.find((entry) => entry.id === 'rx_br_control_special')
    return fixed || templateDraft
  }, [db.templates, prescription.recommendations.specialControlTemplateId, templateDraft])

  const specialControlTargetPharmacy = useMemo<SpecialControlPharmacy>(() => {
    const selected = prescription.recommendations.specialControlPharmacy
    if (selected === 'humana' || selected === 'manipulacao' || selected === 'veterinária') return selected
    return 'veterinária'
  }, [prescription.recommendations.specialControlPharmacy])

  const templateForDoc = (doc: ReturnType<typeof renderRxToPrintDoc>) => {
    if (doc.documentKind === 'special-control') return specialControlTemplate
    return templateDraft.documentKindTarget === 'special-control' ? activeTemplate : templateDraft
  }

  const activeDoc = printDocs[activeDocIndex] || printDocs[0] || null
  const activeDocKind = resolveDocKindKey(activeDoc)
  const activeDocLabel = activeDoc?.documentKind === 'special-control' ? 'Receita de controle especial' : 'Receita padrão'
  const specialDocIndex = useMemo(() => printDocs.findIndex((entry) => entry.documentKind === 'special-control'), [printDocs])
  const activeDocItemIds = useMemo(() => {
    if (!activeDoc) return [] as string[]
    return activeDoc.sections.flatMap((section) => section.items.map((item) => item.id))
  }, [activeDoc])

  useEffect(() => {
    if (activeDocIndex < printDocs.length) return
    setActiveDocIndex(Math.max(0, printDocs.length - 1))
  }, [activeDocIndex, printDocs.length])

  useEffect(() => {
    if (printDocs.length > 1) return
    setDocViewMode('single')
  }, [printDocs.length])

  useEffect(() => {
    if (hasSpecialControlDocs) return
    if (templateDraft.documentKindTarget !== 'special-control') return
    setTemplateDraft(activeTemplate)
  }, [activeTemplate, hasSpecialControlDocs, templateDraft.documentKindTarget])

  useEffect(() => {
    if (!isReviewMode) return
    const validItemIds = activeDocItemIds.filter((entryId) => prescription.items.some((entry) => entry.id === entryId))
    if (selection?.kind === 'item' && validItemIds.includes(selection.itemId)) return
    if (validItemIds.length > 0) {
      setSelection({ kind: 'item', itemId: validItemIds[0] })
      return
    }
    setSelection({ kind: 'zone', zone: 'body' })
  }, [activeDocItemIds, isReviewMode, prescription.items, selection])

  const selectedItem = useMemo(() => {
    if (selection?.kind !== 'item') return null
    return prescription.items.find((entry) => entry.id === selection.itemId) || null
  }, [prescription.items, selection])
  const activeZoneOverrideText =
    selection?.kind === 'zone' ? zoneTextOverrides[activeDocKind]?.[selection.zone] || '' : ''
  const activeZoneDefaultText = useMemo(() => {
    if (!activeDoc || selection?.kind !== 'zone') return ''
    return buildZoneDefaultText(activeDoc, selection.zone, inlineEditNote)
  }, [activeDoc, inlineEditNote, selection])

  const pushToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2600)
  }

  const updatePrescription = (updater: (prev: PrescriptionState) => PrescriptionState) => {
    setPrescription((prev) => ({ ...updater(prev), updatedAt: new Date().toISOString() }))
  }

  const patchSelectedItem = (updater: (item: PrescriptionItem) => PrescriptionItem) => {
    if (!selectedItem) return
    updatePrescription((prev) => patchItemInState(prev, selectedItem.id, updater))
  }

  const saveReviewDraft = () => {
    try {
      saveRxDraft(prescription)
      let nextDb = upsertPatientFromPrescription(loadRxDb(), prescription)
      nextDb = upsertClientFromPrescription(nextDb, prescription)
      nextDb = upsertHistoryFromPrescription(nextDb, prescription)
      saveRxDb(nextDb)
      pushToast('Rascunho salvo com sucesso.')
    } catch {
      pushToast('Falha ao salvar o rascunho.')
    }
  }

  const saveTemplateDraft = () => {
    const nextDb = upsertTemplate(loadRxDb(), { ...templateDraft, updatedAt: new Date().toISOString() })
    const activated = setActiveTemplate(nextDb, templateDraft.id)
    saveRxDb(activated)
    pushToast('Template salvo com sucesso.')
  }

  const buildPdfFile = async () => {
    const elements = printDocs
      .map((_, idx) => {
        const container = previewSheetRefs.current[idx]
        if (!container) return null
        return (container.querySelector('[data-rx-print-canvas="sheet"]') as HTMLElement | null) || container
      })
      .filter((entry): entry is HTMLElement => !!entry)
    if (!elements.length) throw new Error('Preview não disponível para exportação.')

    const standard = templateDraft.documentKindTarget === 'special-control' ? activeTemplate : templateDraft
    return buildPdfFileFromPreview({
      patientName: prescription.patient.name,
      tutorName: prescription.tutor.name,
      previewElements: elements,
      paperSize: standard.paperSize || 'A4',
    })
  }

  const downloadPdf = async () => {
    const file = await buildPdfFile()
    triggerFileDownload(file)
    pushToast(`PDF gerado: ${file.name}`)
  }

  const openWhatsApp = async () => {
    const phone = normalizeWhatsAppPhone(share.whatsappPhone)
    if (!phone) {
      pushToast('Informe o telefone para WhatsApp.')
      return
    }

    const message = (share.whatsappMessage || '').trim()
    const query = message ? `?text=${encodeURIComponent(message)}` : ''
    window.open(`https://wa.me/${phone}${query}`, '_blank', 'noopener,noreferrer')
    pushToast('WhatsApp aberto direto na conversa para revisão da mensagem.')

    try {
      const file = await buildPdfFile()
      triggerFileDownload(file)
      pushToast('PDF baixado para anexar na conversa do WhatsApp.')
    } catch {
      pushToast('WhatsApp aberto. Não foi possível preparar o PDF neste momento.')
    }
  }

  const openEmail = async () => {
    const file = await buildPdfFile()
    const body = share.whatsappMessage
    const shared = await tryShareFile(file, share.emailSubject, body)
    if (shared) {
      pushToast('Arquivo compartilhado com anexo.')
      return
    }

    triggerFileDownload(file)
    const bcc = share.includeBcc ? '&bcc=clínica@vetius.local' : ''
    window.location.href = `mailto:${encodeURIComponent(share.email || '')}?subject=${encodeURIComponent(share.emailSubject)}&body=${encodeURIComponent(body)}${bcc}`
    pushToast('Anexo automático indisponível neste navegador. PDF baixado para envio manual.')
  }

  const openGmail = async () => {
    const file = await buildPdfFile()
    triggerFileDownload(file)
    const body = share.whatsappMessage
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(share.email || '')}&su=${encodeURIComponent(
      share.emailSubject
    )}&body=${encodeURIComponent(body)}`
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    pushToast('Gmail aberto com mensagem pronta. PDF baixado para anexar.')
  }

  const openOutlook = async () => {
    const file = await buildPdfFile()
    triggerFileDownload(file)
    const body = share.whatsappMessage
    const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(share.email || '')}&subject=${encodeURIComponent(
      share.emailSubject
    )}&body=${encodeURIComponent(body)}`
    window.open(outlookUrl, '_blank', 'noopener,noreferrer')
    pushToast('Outlook aberto com mensagem pronta. PDF baixado para anexar.')
  }

  return (
    <div className="min-h-dvh bg-[#12230f] text-slate-100">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1920px] flex-col overflow-hidden md:flex-row">
        <section className="flex-1 preview-bg overflow-y-auto p-4 md:p-8" style={{ backgroundImage: 'radial-gradient(#274b20 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <div className="mx-auto max-w-[1160px]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-black text-white">{isReviewMode ? 'Revisão Interativa da Receita' : 'Visualização de Impressão'}</h1>
                <p className="text-sm text-slate-300">Template ativo: {templateDraft.name}</p>
                {isReviewMode ? <p className="mt-1 text-xs text-[#9bdc8f]">Passe o mouse na receita e clique em um bloco para editar.</p> : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link to="/receituario-vet/nova-receita" className="rounded-lg border border-[#345d2a] bg-[#1a2e16] px-3 py-2 text-sm font-semibold hover:bg-[#22381d]">Voltar ao editor</Link>
                <button type="button" className="rounded-lg border border-[#345d2a] bg-[#1a2e16] px-3 py-2 text-sm font-semibold hover:bg-[#22381d]" onClick={() => setShare((prev) => ({ ...prev, open: true }))}>Compartilhar receita</button>
                <button type="button" className="rounded-lg border border-[#345d2a] bg-[#1a2e16] px-3 py-2 text-sm font-semibold hover:bg-[#22381d]" onClick={() => window.print()}>Imprimir direto</button>
                <button type="button" className="rounded-lg bg-[#38ff14] px-3 py-2 text-sm font-bold text-[#10200d] hover:bg-[#2bd010]" onClick={downloadPdf}>Gerar PDF</button>
              </div>
            </div>

            {printDocs.length > 1 ? (
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2">
                <div className="text-xs text-slate-300">
                  Página {activeDocIndex + 1} de {printDocs.length} · <span className="font-semibold text-[#9eff8f]">{activeDocLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!isReviewMode ? (
                    <button
                      type="button"
                      className="rounded border border-[#335d2a] px-2 py-1 text-xs hover:bg-[#1b3015]"
                      onClick={() => setDocViewMode((prev) => (prev === 'single' ? 'side-by-side' : 'single'))}
                    >
                      {docViewMode === 'single' ? 'Ver lado a lado' : 'Ver por página'}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="rounded border border-[#335d2a] px-2 py-1 text-xs hover:bg-[#1b3015] disabled:opacity-40"
                    disabled={activeDocIndex <= 0}
                    onClick={() => setActiveDocIndex((prev) => Math.max(0, prev - 1))}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="rounded border border-[#335d2a] px-2 py-1 text-xs hover:bg-[#1b3015] disabled:opacity-40"
                    disabled={activeDocIndex >= printDocs.length - 1}
                    onClick={() => setActiveDocIndex((prev) => Math.min(printDocs.length - 1, prev + 1))}
                  >
                    →
                  </button>
                </div>
              </div>
            ) : null}

            {docViewMode === 'side-by-side' && printDocs.length > 1 && !isReviewMode ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {printDocs.map((doc, idx) => (
                  <div
                    key={`${doc.documentKind || 'standard'}-${idx}`}
                    ref={(el) => {
                      previewSheetRefs.current[idx] = el
                    }}
                    className={idx === activeDocIndex ? 'rounded-lg ring-2 ring-[#39ff14]/35' : ''}
                  >
                    <RxPrintView
                      doc={doc}
                      template={templateForDoc(doc)}
                      signatureDataUrl={selectedPrescriberProfile.signatureDataUrl}
                      mapaSignatureDataUrl={selectedPrescriberProfile.mapaSignatureDataUrl}
                      logoDataUrl={selectedPrescriberProfile.clinicLogoDataUrl}
                      prescriberPhone={selectedPrescriberProfile.clinicPhone}
                      prescriberAddressLine={selectedPrescriberProfile.clinicAddress}
                      tutorCpf={prescription.tutor.cpf || ''}
                      targetPharmacy={doc.documentKind === 'special-control' ? specialControlTargetPharmacy : undefined}
                      inlineEditNote={inlineEditNote}
                      interactive={isReviewMode}
                      activeZone={selection?.kind === 'zone' ? selection.zone : undefined}
                      selectedItemId={selection?.kind === 'item' ? selection.itemId : undefined}
                      onZoneSelect={(zone) => {
                        setActiveDocIndex(idx)
                        setSelection({ kind: 'zone', zone })
                      }}
                      onItemSelect={(itemId) => {
                        setActiveDocIndex(idx)
                        setSelection({ kind: 'item', itemId })
                      }}
                      zoneTextOverrides={zoneTextOverrides[resolveDocKindKey(doc)]}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${activeDocIndex * 100}%)` }}
                >
                  {printDocs.map((doc, idx) => (
                    <div
                      key={`${doc.documentKind || 'standard'}-${idx}`}
                      ref={(el) => {
                        previewSheetRefs.current[idx] = el
                      }}
                      className="min-w-full pr-1"
                    >
                      <RxPrintView
                        doc={doc}
                        template={templateForDoc(doc)}
                        signatureDataUrl={selectedPrescriberProfile.signatureDataUrl}
                        mapaSignatureDataUrl={selectedPrescriberProfile.mapaSignatureDataUrl}
                        logoDataUrl={selectedPrescriberProfile.clinicLogoDataUrl}
                        prescriberPhone={selectedPrescriberProfile.clinicPhone}
                        prescriberAddressLine={selectedPrescriberProfile.clinicAddress}
                        tutorCpf={prescription.tutor.cpf || ''}
                        targetPharmacy={doc.documentKind === 'special-control' ? specialControlTargetPharmacy : undefined}
                        inlineEditNote={inlineEditNote}
                        interactive={isReviewMode}
                        activeZone={selection?.kind === 'zone' ? selection.zone : undefined}
                        selectedItemId={selection?.kind === 'item' ? selection.itemId : undefined}
                        onZoneSelect={(zone) => {
                          setActiveDocIndex(idx)
                          setSelection({ kind: 'zone', zone })
                        }}
                        onItemSelect={(itemId) => {
                          setActiveDocIndex(idx)
                          setSelection({ kind: 'item', itemId })
                        }}
                        zoneTextOverrides={zoneTextOverrides[resolveDocKindKey(doc)]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <aside className="w-full border-l border-[#274b20] bg-[#10200d] p-5 md:w-[420px] md:overflow-y-auto">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-white">{isReviewMode ? 'Editor interativo' : 'Configurações de revisão'}</h2>
            <p className="text-xs text-slate-400">{isReviewMode ? 'Clique em um componente da receita para editar no painel.' : 'Edite formatação e informações sem sair da tela.'}</p>
          </div>

          <div className="flex flex-col gap-4">
            {isReviewMode ? (
              <section className="order-10 rounded-xl border border-[#315d28] bg-[#132510] p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white">{selection?.kind === 'item' ? 'Editor de Item' : 'Editor de Componente'}</h3>
                  <button type="button" className="rounded-md border border-[#345d2a] px-2 py-1 text-xs font-semibold hover:bg-[#1f3319]" onClick={saveReviewDraft}>Salvar rascunho</button>
                </div>

                {selectedItem ? (
                  <div className="space-y-3">
                    <label className="block text-xs text-slate-300">Medicamento
                      <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.name} onChange={(e) => patchSelectedItem((item) => ({ ...item, name: e.target.value }))} />
                    </label>
                    <label className="block text-xs text-slate-300">Nome comercial (opcional)
                      <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.commercialName || ''} onChange={(e) => patchSelectedItem((item) => ({ ...item, commercialName: e.target.value }))} />
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      <label className="block text-xs text-slate-300">Dose
                        <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.doseValue} onChange={(e) => patchSelectedItem((item) => ({ ...item, doseValue: e.target.value }))} />
                      </label>
                      <label className="block text-xs text-slate-300">Unidade
                        <select className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.doseUnit} onChange={(e) => patchSelectedItem((item) => ({ ...item, doseUnit: e.target.value }))}>
                          {DOSE_UNIT_OPTIONS.map((unit) => (<option key={unit} value={unit}>{unit}</option>))}
                        </select>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <label className="block text-xs text-slate-300">Frequência
                        <select className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.frequencyType} onChange={(e) => patchSelectedItem((item) => ({ ...item, frequencyType: e.target.value as PrescriptionItem['frequencyType'] }))}>
                          <option value="timesPerDay">x vezes ao dia</option>
                          <option value="everyHours">a cada X horas</option>
                        </select>
                      </label>
                      <label className="block text-xs text-slate-300">{selectedItem.frequencyType === 'everyHours' ? 'Intervalo (h)' : 'Vezes ao dia'}
                        <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.frequencyType === 'everyHours' ? selectedItem.everyHours : selectedItem.timesPerDay} onChange={(e) => patchSelectedItem((item) => item.frequencyType === 'everyHours' ? { ...item, everyHours: e.target.value, frequencyToken: '' } : { ...item, timesPerDay: e.target.value, frequencyToken: '' })} />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <label className="block text-xs text-slate-300">Duração (dias)
                        <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.durationDays} onChange={(e) => patchSelectedItem((item) => ({ ...item, durationDays: e.target.value }))} />
                      </label>
                      <label className="block text-xs text-slate-300">Via
                        <select className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.routeGroup} onChange={(e) => patchSelectedItem((item) => ({ ...item, routeGroup: e.target.value as RouteGroup }))}>
                          {ROUTE_OPTIONS.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </select>
                      </label>
                    </div>

                    <label className="block text-xs text-slate-300">Instruções ao tutor
                      <textarea rows={4} className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.instruction} onChange={(e) => patchSelectedItem((item) => ({ ...item, instruction: e.target.value, autoInstruction: false, manualEdited: true }))} />
                    </label>

                    <label className="block text-xs text-slate-300">Cautelas (uma por linha)
                      <textarea rows={3} className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.cautions.join('\n')} onChange={(e) => patchSelectedItem((item) => ({ ...item, cautions: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean) }))} />
                    </label>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded" checked={selectedItem.autoInstruction} onChange={(e) => patchSelectedItem((item) => ({ ...item, autoInstruction: e.target.checked, manualEdited: !e.target.checked ? item.manualEdited : false }))} />Instrução automática</label>
                      <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded" checked={!!selectedItem.controlled} onChange={(e) => patchSelectedItem((item) => ({ ...item, controlled: e.target.checked }))} />Controle especial</label>
                      <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded" checked={!!selectedItem.titleBold} onChange={(e) => patchSelectedItem((item) => ({ ...item, titleBold: e.target.checked }))} />Nome em negrito</label>
                      <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded" checked={!!selectedItem.titleUnderline} onChange={(e) => patchSelectedItem((item) => ({ ...item, titleUnderline: e.target.checked }))} />Nome sublinhado</label>
                    </div>

                    <p className="rounded-lg border border-[#2c5b22] bg-[#10200d] px-3 py-2 text-xs text-[#9cd78f]">Frequência atual: {resolveFrequency(selectedItem).label}</p>
                  </div>
                ) : selection?.kind === 'zone' ? (
                  <div className="space-y-3">
                    {selection.zone === 'header' ? (
                      <>
                        <label className="block text-xs text-slate-300">Nome da clínica
                          <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.clinicName} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, clinicName: e.target.value } }))} />
                        </label>
                        <label className="block text-xs text-slate-300">Nome do prescritor
                          <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.name} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, name: e.target.value } }))} />
                        </label>
                        <label className="block text-xs text-slate-300">CRMV
                          <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.crmv} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, crmv: e.target.value } }))} />
                        </label>
                      </>
                    ) : null}

                    {selection.zone === 'patient' ? (
                      <>
                        <label className="block text-xs text-slate-300">Paciente
                          <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.patient.name} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, name: e.target.value } }))} />
                        </label>
                        <label className="block text-xs text-slate-300">Tutor / responsável
                          <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.tutor.name} onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, name: e.target.value } }))} />
                        </label>
                      </>
                    ) : null}

                    {selection.zone === 'recommendations' ? (
                      <>
                        <label className="block text-xs text-slate-300">Recomendações (uma por linha)
                          <textarea rows={4} className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.recommendations.bullets.join('\n')} onChange={(e) => updatePrescription((prev) => ({ ...prev, recommendations: { ...prev.recommendations, bullets: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean) } }))} />
                        </label>
                        <label className="block text-xs text-slate-300">Exames personalizados (uma por linha)
                          <textarea rows={3} className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.recommendations.customExams.join('\n')} onChange={(e) => updatePrescription((prev) => ({ ...prev, recommendations: { ...prev.recommendations, customExams: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean) } }))} />
                        </label>
                        <label className="block text-xs text-slate-300">Observação adicional de revisão
                          <textarea rows={3} className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={inlineEditNote} onChange={(e) => setInlineEditNote(e.target.value)} />
                        </label>
                      </>
                    ) : null}

                    {selection.zone === 'signature' ? (
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded" checked={templateDraft.showSignature} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, showSignature: e.target.checked }))} />Mostrar assinatura digital</label>
                        <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded" checked={templateDraft.showTimestamp} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, showTimestamp: e.target.checked }))} />Mostrar data/hora</label>
                      </div>
                    ) : null}

                    <div className="rounded-xl border border-[#335d2a] bg-[#12230f] p-3">
                      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#9cd78f]">Edição manual da seção</p>
                      <p className="mb-2 text-[11px] text-slate-400">
                        Ao preencher, este texto substitui o conteúdo padrão da seção selecionada.
                      </p>
                      <textarea
                        rows={6}
                        className="w-full rounded-lg border border-[#335d2a] bg-[#0f1f0d] px-3 py-2 text-sm text-white"
                        placeholder={activeZoneDefaultText || 'Digite um texto livre para esta seção...'}
                        value={activeZoneOverrideText}
                        onChange={(e) =>
                          setZoneTextOverrides((prev) => ({
                            ...prev,
                            [activeDocKind]: {
                              ...(prev[activeDocKind] || {}),
                              [selection.zone]: e.target.value,
                            },
                          }))
                        }
                      />
                      <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          className="rounded border border-[#3b6c2f] px-2 py-1 text-xs hover:bg-[#1f3619]"
                          onClick={() =>
                            setZoneTextOverrides((prev) => ({
                              ...prev,
                              [activeDocKind]: {
                                ...(prev[activeDocKind] || {}),
                                [selection.zone]: '',
                              },
                            }))
                          }
                        >
                          Limpar sobrescrita
                        </button>
                      </div>
                    </div>

                    {selection.zone === 'body' ? <p className="text-xs text-slate-400">Clique em um medicamento no preview para editar seus campos.</p> : null}
                  </div>
                ) : <p className="text-sm text-slate-400">Selecione uma área da receita para começar.</p>}
              </section>
            ) : null}

            {hasSpecialControlDocs ? (
              <>
                <label className="block text-xs text-slate-400">
                  Tipo de farmácia da receita controlada
                  <select
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={prescription.recommendations.specialControlPharmacy}
                    onChange={(e) =>
                      updatePrescription((prev) => ({
                        ...prev,
                        recommendations: {
                          ...prev.recommendations,
                          specialControlPharmacy: e.target.value as SpecialControlPharmacy,
                        },
                      }))
                    }
                  >
                    <option value="veterinária">Farmácia veterinária</option>
                    <option value="manipulacao">Farmácia de manipulação</option>
                    <option value="humana">Farmácia humana</option>
                  </select>
                </label>
                <label className="block text-xs text-slate-400">
                  Template da receita controlada
                  <select
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={prescription.recommendations.specialControlTemplateId || specialControlTemplate.id}
                    onChange={(e) =>
                      updatePrescription((prev) => ({
                        ...prev,
                        recommendations: {
                          ...prev.recommendations,
                          specialControlTemplateId: e.target.value,
                        },
                      }))
                    }
                  >
                    {specialSelectableTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </label>
                {specialDocIndex >= 0 ? (
                  <button
                    type="button"
                    className="rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm font-semibold hover:bg-[#1a2f15]"
                    onClick={() => {
                      setActiveDocIndex(specialDocIndex)
                      setSelection({ kind: 'zone', zone: 'body' })
                    }}
                  >
                    Editar itens da receita controlada
                  </button>
                ) : null}
              </>
            ) : null}

            <label className="block text-xs text-slate-400">Template
              <select
                className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                value={templateDraft.id}
                onChange={(e) => {
                  const selected = selectableTemplates.find((entry) => entry.id === e.target.value)
                  if (!selected) return
                  setTemplateDraft(selected)
                  updatePrescription((prev) => ({
                    ...prev,
                    recommendations: {
                      ...prev.recommendations,
                      standardTemplateId: selected.id,
                    },
                  }))
                }}
              >
                {selectableTemplates.map((template) => (<option key={template.id} value={template.id}>{template.name}</option>))}
              </select>
            </label>

            <label className="block text-xs text-slate-400">Fonte
              <select className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={templateDraft.fontFamily} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, fontFamily: e.target.value }))}>
                <option value="Manrope, Arial, sans-serif">Manrope</option>
                <option value="Arial, Helvetica, sans-serif">Arial</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="Georgia, serif">Georgia</option>
              </select>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <label className="block text-xs text-slate-400">Fonte base
                <input type="range" min={10} max={16} value={templateDraft.fontSizePt} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, fontSizePt: Number(e.target.value) }))} className="mt-1 w-full accent-[#38ff14]" />
              </label>
              <label className="block text-xs text-slate-400">Título
                <input type="range" min={14} max={24} value={templateDraft.headingSizePt} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, headingSizePt: Number(e.target.value) }))} className="mt-1 w-full accent-[#38ff14]" />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button type="button" className="rounded-lg bg-[#38ff14] px-3 py-2 text-sm font-bold text-[#10200d] hover:bg-[#2bd010]" onClick={saveTemplateDraft}>Salvar ajustes no template</button>
              <Link
                to="/receituario-vet/templates"
                state={{ from: `${location.pathname}${location.search}` }}
                className="rounded-lg border border-[#345d2a] bg-[#1a2e16] px-3 py-2 text-center text-sm font-semibold hover:bg-[#22381d]"
              >
                Abrir editor de templates
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {share.open ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-4 py-8" onClick={() => setShare((prev) => ({ ...prev, open: false }))}>
          <div className="w-full max-w-5xl rounded-2xl border border-[#376b2e] bg-[#12230f] text-slate-100 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#376b2e] px-6 py-4">
              <div>
                <h3 className="text-xl font-bold">Compartilhar Receita</h3>
                <p className="text-sm text-slate-400">Envie por WhatsApp ou e-mail com anexo PDF.</p>
              </div>
              <button type="button" className="rounded-lg border border-[#376b2e] px-3 py-1.5 text-sm" onClick={() => setShare((prev) => ({ ...prev, open: false }))}>Fechar</button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
              <section className="rounded-xl border border-[#376b2e] bg-[#1c3617] p-4">
                <h4 className="mb-3 text-lg font-bold">WhatsApp</h4>
                <label className="block text-xs text-slate-300">Telefone do tutor
                  <input className="mt-1 w-full rounded-lg border border-[#376b2e] bg-[#12230f] px-3 py-2 text-sm" value={share.whatsappPhone} onChange={(e) => setShare((prev) => ({ ...prev, whatsappPhone: e.target.value }))} />
                </label>
                <label className="mt-3 block text-xs text-slate-300">Mensagem personalizada
                  <textarea className="mt-1 w-full rounded-lg border border-[#376b2e] bg-[#12230f] px-3 py-2 text-sm" rows={5} value={share.whatsappMessage} onChange={(e) => setShare((prev) => ({ ...prev, whatsappMessage: e.target.value }))} />
                </label>
                <button type="button" className="mt-4 w-full rounded-lg bg-[#38ff14] px-3 py-2 text-sm font-bold text-[#10200d]" onClick={openWhatsApp}>Enviar via WhatsApp</button>
              </section>

              <section className="rounded-xl border border-[#376b2e] bg-[#1c3617] p-4">
                <h4 className="mb-3 text-lg font-bold">E-mail</h4>
                <label className="block text-xs text-slate-300">E-mail do tutor
                  <input className="mt-1 w-full rounded-lg border border-[#376b2e] bg-[#12230f] px-3 py-2 text-sm" value={share.email} onChange={(e) => setShare((prev) => ({ ...prev, email: e.target.value }))} />
                </label>
                <label className="mt-3 block text-xs text-slate-300">Assunto
                  <input className="mt-1 w-full rounded-lg border border-[#376b2e] bg-[#12230f] px-3 py-2 text-sm" value={share.emailSubject} onChange={(e) => setShare((prev) => ({ ...prev, emailSubject: e.target.value }))} />
                </label>
                <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={share.includeBcc} onChange={(e) => setShare((prev) => ({ ...prev, includeBcc: e.target.checked }))} className="h-4 w-4 rounded" />Enviar cópia para a clínica</label>
                <div className="mt-4 space-y-2">
                  <button type="button" className="w-full rounded-lg border border-[#376b2e] bg-[#12230f] px-3 py-2 text-sm font-semibold" onClick={openEmail}>
                    Enviar por e-mail (padrão)
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" className="rounded-lg border border-[#376b2e] bg-[#1a2f16] px-3 py-2 text-sm font-semibold hover:bg-[#223b1e]" onClick={openGmail}>
                      Abrir no Gmail
                    </button>
                    <button type="button" className="rounded-lg border border-[#376b2e] bg-[#1a2f16] px-3 py-2 text-sm font-semibold hover:bg-[#223b1e]" onClick={openOutlook}>
                      Abrir no Outlook
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? <div className="fixed bottom-6 right-6 z-[95] rounded-xl border border-[#376b2e] bg-[#1a2e16] px-4 py-3 text-sm font-semibold text-[#9dff8d]">{toast}</div> : null}
    </div>
  )
}


