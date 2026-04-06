import React from 'react'
import { RxTemplateStyle, TemplateZoneKey } from './rxDb'
import { PrintDoc } from './rxTypes'
import { sanitizeVisibleText } from './textSanitizer'

interface RxPrintViewProps {
  doc: PrintDoc
  compact?: boolean
  fitToWidth?: boolean
  zoom?: number
  template?: Partial<RxTemplateStyle>
  signatureDataUrl?: string
  mapaSignatureDataUrl?: string
  logoDataUrl?: string
  prescriberPhone?: string
  prescriberAddressLine?: string
  tutorCpf?: string
  targetPharmacy?: 'veterin\u00e1ria' | 'humana' | 'manipulacao' | 'mista'
  inlineEditNote?: string
  interactive?: boolean
  activeZone?: TemplateZoneKey
  onZoneSelect?: (zone: TemplateZoneKey) => void
  selectedItemId?: string
  onItemSelect?: (itemId: string) => void
  zoneTextOverrides?: Partial<Record<TemplateZoneKey, string>>
}

function sanitizePrintText(value: string): string {
  return sanitizeVisibleText(String(value || ''))
    .replace(/\s+/g, ' ')
    .trim()
}

const BASE_TEMPLATE: RxTemplateStyle = {
  id: 'rx_classic_vertical_v1',
  name: 'Receita cl\u00e1ssica vertical',
  documentKindTarget: 'standard',
  layoutVariant: 'classic-vertical',
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSizePt: 12,
  headingSizePt: 16,
  lineHeight: 1.55,
  accentColor: '#111827',
  textColor: '#111827',
  paperBg: '#ffffff',
  paperSize: 'A4',
  showLetterhead: true,
  showSignature: true,
  showMapaSignature: false,
  showTimestamp: true,
  extraNotes: '',
  zoneStyles: {},
  updatedAt: '',
}

function weightFromPreset(weight?: 'normal' | 'medium' | 'bold'): number | undefined {
  if (weight === 'normal') return 400
  if (weight === 'medium') return 500
  if (weight === 'bold') return 700
  return undefined
}

function zoneRing(interactive: boolean, activeZone: TemplateZoneKey | undefined, zone: TemplateZoneKey) {
  if (!interactive) return ''
  if (activeZone === zone) return 'ring-2 ring-[#39ff14] ring-offset-2 ring-offset-white'
  return 'hover:ring-1 hover:ring-[#39ff14]/70 cursor-pointer'
}

function parseHexColor(value: string): [number, number, number] | null {
  const normalized = (value || '').trim()
  if (!normalized) return null
  const hex = normalized.startsWith('#') ? normalized.slice(1) : normalized
  if (hex.length === 3) {
    const r = Number.parseInt(hex[0] + hex[0], 16)
    const g = Number.parseInt(hex[1] + hex[1], 16)
    const b = Number.parseInt(hex[2] + hex[2], 16)
    if ([r, g, b].some(Number.isNaN)) return null
    return [r, g, b]
  }
  if (hex.length === 6) {
    const r = Number.parseInt(hex.slice(0, 2), 16)
    const g = Number.parseInt(hex.slice(2, 4), 16)
    const b = Number.parseInt(hex.slice(4, 6), 16)
    if ([r, g, b].some(Number.isNaN)) return null
    return [r, g, b]
  }
  return null
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const linear = [r, g, b].map((channel) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
}

function ensureReadableColor(color: string, background: string, fallback = '#1f2937'): string {
  const fg = parseHexColor(color)
  const bg = parseHexColor(background)
  if (!fg || !bg) return color || fallback
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  return contrast >= 4.5 ? color : fallback
}

function highlightInstructionSegments(text: string): React.ReactNode[] {
  const source = text || ''
  if (!source.trim()) return [source]

  const pattern =
    /(Administrar [^,.;]*|\d+(?:[.,]\d+)?\s*[a-zA-Z�-�%�/]+(?:\s+por dose)?|por via [^,.;]*|a cada \d+\s*horas|uma vez por dia|\d+\s*vez(?:es)? por dia|durante \d+\s*dias|em uso cont[i�]nuo|at[e�] reavalia[c�][a�]o cl[i�]nica|at[e�] terminar o medicamento|iniciando em \d{2}\/\d{2}\/\d{4} �s \d{2}:\d{2}|iniciando �s \d{2}:\d{2})/gi

  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = pattern.exec(source)) !== null) {
    const start = match.index
    const end = start + match[0].length
    if (start > lastIndex) {
      nodes.push(<React.Fragment key={`t-${key++}`}>{source.slice(lastIndex, start)}</React.Fragment>)
    }
    nodes.push(<strong key={`b-${key++}`}>{source.slice(start, end)}</strong>)
    lastIndex = end
  }
  if (lastIndex < source.length) {
    nodes.push(<React.Fragment key={`t-${key++}`}>{source.slice(lastIndex)}</React.Fragment>)
  }
  return nodes
}

function renderPlainRecommendation(line: string): string {
  return sanitizePrintText(String(line || '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^-\s*/, '')
    .trim())
}

function splitItemMeta(subtitle: string): { presentation: string; meta: string } {
  const raw = sanitizePrintText(subtitle || '').trim()
  if (!raw) return { presentation: '', meta: '' }
  const parts = raw.split(/\s+�\s+/).map((entry) => entry.trim()).filter(Boolean)
  if (parts.length === 1) return { presentation: parts[0], meta: '' }
  return {
    presentation: parts[0],
    meta: parts.slice(1).join(' � '),
  }
}

export function RxPrintView({
  doc,
  compact = false,
  fitToWidth = false,
  zoom,
  template,
  signatureDataUrl,
  mapaSignatureDataUrl,
  logoDataUrl,
  prescriberPhone,
  prescriberAddressLine,
  tutorCpf,
  targetPharmacy,
  inlineEditNote,
  interactive = false,
  activeZone,
  onZoneSelect,
  selectedItemId,
  onItemSelect,
  zoneTextOverrides,
}: RxPrintViewProps) {
  const cfg = { ...BASE_TEMPLATE, ...(template || {}) }
  const isClassic = cfg.layoutVariant === 'classic-vertical'
  const safeTextColor = ensureReadableColor(cfg.textColor, cfg.paperBg, '#1f2937')
  const zoneFontPt = (zone: TemplateZoneKey, fallback: number) => cfg.zoneStyles?.[zone]?.fontSizePt || fallback
  const zoneWeight = (zone: TemplateZoneKey, fallback: number) => weightFromPreset(cfg.zoneStyles?.[zone]?.fontWeight) || fallback

  const paperStyle: React.CSSProperties = {
    fontFamily: cfg.fontFamily,
    fontSize: `${cfg.fontSizePt}pt`,
    lineHeight: cfg.lineHeight,
    color: safeTextColor,
    background: cfg.paperBg,
  }
  const paperWidth = cfg.paperSize === 'A5' ? '148mm' : '210mm'
  const paperHeight = cfg.paperSize === 'A5' ? '210mm' : '297mm'
  const sheetStyle: React.CSSProperties = (compact || fitToWidth)
    ? {
        ...paperStyle,
        width: '100%',
        maxWidth: '100%',
        minHeight: fitToWidth ? paperHeight : undefined,
      }
    : {
        ...paperStyle,
        width: paperWidth,
        minHeight: paperHeight,
        margin: '0 auto',
      }

  const zoneStyle = (zone: TemplateZoneKey, base: React.CSSProperties = {}): React.CSSProperties => {
    const custom = cfg.zoneStyles?.[zone]
    const baseColor = typeof base.color === 'string' ? base.color : safeTextColor
    const candidateColor = custom?.textColor || baseColor
    return {
      ...base,
      fontFamily: custom?.fontFamily || base.fontFamily,
      fontSize: custom?.fontSizePt ? `${custom.fontSizePt}pt` : base.fontSize,
      color: ensureReadableColor(candidateColor, cfg.paperBg, '#1f2937'),
      fontWeight: weightFromPreset(custom?.fontWeight) || base.fontWeight,
      fontStyle: custom?.italic ? 'italic' : base.fontStyle,
      textDecoration: custom?.underline ? 'underline' : base.textDecoration,
    }
  }

  const accentColorFor = (zone: TemplateZoneKey) => cfg.zoneStyles?.[zone]?.accentColor || cfg.accentColor

  const makeZoneProps = (zone: TemplateZoneKey) => {
    if (!interactive) return {}
    return {
      role: 'button',
      tabIndex: 0,
      onClick: () => onZoneSelect?.(zone),
      onKeyDown: (ev: React.KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault()
          onZoneSelect?.(zone)
        }
      },
    }
  }

  const makeItemProps = (itemId: string) => {
    if (!interactive) return {}
    return {
      role: 'button',
      tabIndex: 0,
      onClick: (ev: React.MouseEvent) => {
        ev.stopPropagation()
        onItemSelect?.(itemId)
      },
      onKeyDown: (ev: React.KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault()
          ev.stopPropagation()
          onItemSelect?.(itemId)
        }
      },
    }
  }

  const itemRing = (itemId: string) => {
    if (!interactive) return ''
    if (selectedItemId === itemId) return 'ring-2 ring-[#39ff14] ring-offset-2 ring-offset-white'
    return 'hover:ring-1 hover:ring-[#39ff14]/70 cursor-pointer'
  }

  const rootStyle = zoom ? ({ zoom } as React.CSSProperties) : undefined
  const zoneOverride = (zone: TemplateZoneKey) => (zoneTextOverrides?.[zone] || '').trim()
  const headerOverride = zoneOverride('header')
  const patientOverride = zoneOverride('patient')
  const bodyOverride = zoneOverride('body')
  const recommendationsOverride = zoneOverride('recommendations')
  const signatureOverride = zoneOverride('signature')

  return (
    <div className={`rxv-print-preview bg-white text-slate-900 ${(compact || fitToWidth) ? 'w-full overflow-hidden rounded-none border-0 shadow-none' : 'rounded-xl border border-slate-300 shadow-2xl'}`} style={rootStyle}>
      {!compact && !fitToWidth ? (
        <div className="border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">
          {sanitizeVisibleText('Visualização rápida')}
        </div>
      ) : null}
      <div className={(compact || fitToWidth) ? 'w-full p-5 xl:p-6' : 'p-6'} style={sheetStyle} data-rx-print-canvas="sheet">
        {cfg.showLetterhead ? (
          <>
            <p
              className="mb-2 text-center text-[11px] font-black uppercase tracking-[0.28em]"
              style={{ color: doc.documentKind === 'special-control' ? '#1f2937' : '#334155' }}
            >
              {doc.documentKind === 'special-control' ? sanitizeVisibleText('RECEITUÁRIO DE CONTROLE ESPECIAL') : sanitizeVisibleText('RECEITUÁRIO')}
            </p>
            <div
              className={`mb-6 ${isClassic ? 'border-b border-slate-400 pb-4' : 'rounded-lg border-2 border-slate-300 p-4'} transition ${zoneRing(interactive, activeZone, 'header')}`}
              style={zoneStyle('header')}
              {...makeZoneProps('header')}
            >
              {headerOverride ? (
                <p className="whitespace-pre-line">{headerOverride}</p>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-300 bg-slate-50">
                      {logoDataUrl ? (
                        <img src={logoDataUrl} alt={sanitizeVisibleText('Logo da clínica')} className="h-full w-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-[26px] text-slate-400">local_hospital</span>
                      )}
                    </div>
                    <div>
                      <h2
                        className="uppercase tracking-wide"
                        style={{
                          fontSize: `${cfg.headingSizePt}px`,
                          color: zoneStyle('header').color,
                          fontWeight: zoneWeight('header', 800),
                        }}
                      >
                        {sanitizePrintText(doc.clinicName)}
                      </h2>
                      <p className="text-xs text-slate-600">
                        {sanitizePrintText(doc.prescriberName)} - {sanitizePrintText(doc.prescriberCrmv)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Data: {sanitizePrintText(doc.dateLabel)}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : null}

        <div
          className={`mb-6 ${isClassic ? 'border-b border-slate-300 pb-3' : 'rounded-lg border border-slate-200 bg-slate-50 p-3'} transition ${zoneRing(interactive, activeZone, 'patient')}`}
          style={zoneStyle('patient', { fontSize: `${zoneFontPt('patient', Math.max(cfg.fontSizePt - 1, 10))}pt` })}
          {...makeZoneProps('patient')}
        >
          {patientOverride ? (
            <p className="whitespace-pre-line">{patientOverride}</p>
          ) : (
            <>
              <p>
              {' • '}{sanitizeVisibleText('Paciente:')} {doc.patientLine}
              </p>
              <p>
                <span className="font-bold">{sanitizeVisibleText('Responsável:')}</span> {sanitizePrintText(doc.tutorLine)}
              </p>
              {doc.addressLine ? (
                <p>
                  <span className="font-bold">{sanitizeVisibleText('Endereço:')}</span> {sanitizePrintText(doc.addressLine)}
                </p>
              ) : null}
            </>
          )}
        </div>

        <div
          className={`space-y-5 rounded transition ${zoneRing(interactive, activeZone, 'body')}`}
          style={zoneStyle('body', { fontSize: `${zoneFontPt('body', cfg.fontSizePt)}pt` })}
          {...makeZoneProps('body')}
        >
          {bodyOverride ? (
            <article className="rounded border border-slate-200 p-3">
              <p className="whitespace-pre-line leading-relaxed">{bodyOverride}</p>
            </article>
          ) : doc.sections.map((section) => {
            const sectionAccent = accentColorFor('body')
            return (
              <div key={section.key}>
                {isClassic ? (
                  <div className="mb-3 border-b border-slate-300 pb-1">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: safeTextColor }}>
                      {sanitizePrintText(section.title)}
                    </h3>
                  </div>
                ) : (
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-300"></div>
                    <h3
                      className="rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.2em]"
                      style={{
                        color: sectionAccent,
                        borderColor: `${sectionAccent}66`,
                        background: `${sectionAccent}12`,
                      }}
                    >
                      {sanitizePrintText(section.title)}
                    </h3>
                    <div className="h-px flex-1 bg-slate-300"></div>
                  </div>
                )}
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <article
                      key={item.id}
                      className={`${isClassic ? 'border-b border-slate-200 pb-3 last:border-b-0' : 'rounded border border-slate-200 p-3'} transition ${itemRing(item.id)}`}
                      {...makeItemProps(item.id)}
                    >
                      <div className="mb-1 flex items-center justify-end gap-2">
                        {item.status !== 'ok' ? (
                          <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                            incompleto
                          </span>
                        ) : null}
                      </div>
                      <div className="mb-2 space-y-2">
                        <div className="flex w-full items-end gap-3 overflow-hidden">
                          <h4
                            className="shrink-0 text-[11pt]"
                            style={{
                              color: '#111827',
                              textDecoration: item.titleUnderline ? 'underline' : 'none',
                              textDecorationColor: sectionAccent,
                              textDecorationThickness: item.titleUnderline ? '2px' : undefined,
                              textUnderlineOffset: item.titleUnderline ? '2px' : undefined,
                              fontWeight: item.titleBold ? 700 : 400,
                            }}
                          >
                            {item.index}.
                          </h4>
                          <p
                            className="shrink-0 whitespace-nowrap text-[10pt] font-semibold tracking-[0.02em]"
                            style={{ color: '#0f172a' }}
                          >
                            {sanitizePrintText(item.title)}
                          </p>
                          <span
                            className="min-w-[16px] flex-1 overflow-hidden whitespace-nowrap self-end leading-none"
                            style={{ color: 'rgba(51,65,85,0.7)', letterSpacing: '0.12em', fontSize: '10pt' }}
                          >{'................................................................................................................................................................................................................................................................................'}</span>
                          <p
                            className="shrink-0 whitespace-nowrap text-right text-[9.6pt] font-semibold"
                            style={{ color: '#1e293b' }}
                          >
                            {sanitizePrintText(item.subtitle || sanitizeVisibleText('Dispensação'))}
                          </p>
                        </div>
                      </div>
                      <p className="whitespace-pre-line leading-relaxed" style={{ fontSize: `${Math.max(zoneFontPt('body', cfg.fontSizePt) - 1, 10)}pt`, color: '#111827' }}>
                        {highlightInstructionSegments(sanitizePrintText(item.instruction))}
                      </p>
                      {item.cautions.length ? (
                        <div className="mt-2 space-y-1">
                          {item.cautions
                            .filter((line) => /^manipula/i.test(sanitizePrintText(line)))
                            .map((line, idx) => (
                              <p key={`${item.id}-m-${idx}`} className="whitespace-pre-wrap" style={{ fontSize: `${Math.max(zoneFontPt('body', cfg.fontSizePt) - 1, 10)}pt`, color: '#111827' }}>
                                {sanitizePrintText(line)}
                              </p>
                            ))}
                          {item.cautions
                            .filter((line) => !/^manipula/i.test(sanitizePrintText(line)))
                            .map((line, idx) => (
                              <p key={`${item.id}-c-${idx}`} className={isClassic ? 'whitespace-pre-wrap' : 'font-bold whitespace-pre-wrap'} style={{ fontSize: `${Math.max(zoneFontPt('body', cfg.fontSizePt) - 1, 10)}pt`, color: '#111827' }}>
                                • {sanitizePrintText(line).replace(/^Orientações ao tutor:\s*/i, '')}
                              </p>
                            ))}
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {doc.documentKind !== 'special-control' && (doc.recommendations.length > 0 || doc.exams.length > 0 || inlineEditNote) && (
          <section
            className={`mt-6 ${isClassic ? 'border-t border-slate-300 pt-4' : 'rounded border border-slate-200 p-3'} transition ${zoneRing(interactive, activeZone, 'recommendations')}`}
            style={zoneStyle('recommendations', { fontSize: `${zoneFontPt('recommendations', cfg.fontSizePt)}pt` })}
            {...makeZoneProps('recommendations')}
          >
            {recommendationsOverride ? (
              <p className="whitespace-pre-line">{recommendationsOverride}</p>
            ) : (
              <>
                <h3 className="mb-2 uppercase tracking-wide" style={{ fontSize: `${Math.max(zoneFontPt('recommendations', cfg.fontSizePt), 10)}pt`, fontWeight: zoneWeight('recommendations', 800) }}>
                  {sanitizeVisibleText('RECOMENDAÇÕES')}
                </h3>
                {doc.recommendations.map((line, idx) => (
                  <p key={`rec-${idx}`} className="whitespace-pre-line" style={{ fontSize: `${Math.max(zoneFontPt('recommendations', cfg.fontSizePt) - 1, 10)}pt` }}>
                        {idx + 1}. {renderPlainRecommendation(line)}
                  </p>
                ))}
                {doc.exams.length > 0 ? (
                  <div className="mt-3">
                    <h4 className="uppercase" style={{ fontSize: `${Math.max(zoneFontPt('recommendations', cfg.fontSizePt) - 1, 9)}pt`, fontWeight: zoneWeight('recommendations', 800) }}>Exames sugeridos</h4>
                    {doc.exams.map((exam, idx) => (
                      <p key={`exam-${idx}`} style={{ fontSize: `${Math.max(zoneFontPt('recommendations', cfg.fontSizePt) - 1, 10)}pt`, fontWeight: zoneWeight('recommendations', 600) }}>
                        {idx + 1}. {sanitizePrintText(exam)}
                      </p>
                    ))}
                  </div>
                ) : null}
                {inlineEditNote ? (
                  <div className="mt-3 rounded border border-slate-300 bg-slate-50 p-2 text-sm">
                    <p className="font-bold">{sanitizeVisibleText('Observação adicional')}</p>
                    <p className="whitespace-pre-line">{sanitizePrintText(inlineEditNote)}</p>
                  </div>
                ) : null}
              </>
            )}
          </section>
        )}

        {doc.documentKind === 'special-control' ? (
          <section className="mt-4 space-y-3 rounded border border-slate-300 bg-slate-50 p-3 text-[11px]" style={{ color: '#1f2937' }}>
            <p>
              <strong>Dados do emitente:</strong> {doc.prescriberName} • {doc.prescriberCrmv}
              {prescriberAddressLine ? ` • ${prescriberAddressLine}` : ''}
              {prescriberPhone ? ` • ${prescriberPhone}` : ''}
            </p>
            <p>
              <strong>{sanitizeVisibleText('Dados do proprietário e animal:')}</strong> {doc.tutorLine} • CPF: {tutorCpf || '___________________'}
              {' • '}{sanitizeVisibleText('Endereço:')} {doc.addressLine || '________________________________'}
              {' • '}{sanitizeVisibleText('Paciente:')} {doc.patientLine}
            </p>
          </section>
        ) : null}

        {doc.documentKind === 'special-control' ? (
          <section className="mt-4 rounded border border-slate-300 bg-slate-50 p-3 text-[11px]" style={{ color: '#1f2937' }}>
            <p className="mb-2 font-bold">{sanitizeVisibleText('1ª via - Farmácia | 2ª via - Paciente')}</p>
            <p className="mb-3">
              {sanitizeVisibleText('Farmácia veterinária')} ({targetPharmacy === 'veterinária' || targetPharmacy === 'mista' ? 'X' : ' '}) {'  '}
              {sanitizeVisibleText('Farmácia de manipulação')} ({targetPharmacy === 'manipulacao' || targetPharmacy === 'mista' ? 'X' : ' '}) {'  '}
              {sanitizeVisibleText('Farmácia humana')} ({targetPharmacy === 'humana' || targetPharmacy === 'mista' ? 'X' : ' '})
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-300 p-3 space-y-2.5">
                <p className="mb-2 font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1">{sanitizeVisibleText('Identificação do comprador')}</p>
                <div className="flex items-end"><span className="shrink-0 mr-2 font-medium">Nome:</span><div className="flex-1 border-b border-slate-400"></div></div>
                <div className="flex items-end"><span className="shrink-0 mr-2 font-medium">RG:</span><div className="flex-1 border-b border-slate-400"></div></div>
                <div className="flex items-end"><span className="shrink-0 mr-2 font-medium">{sanitizeVisibleText('Endereço:')}</span><div className="flex-1 border-b border-slate-400"></div></div>
                <div className="flex items-end"><span className="shrink-0 mr-2 font-medium">Cidade/UF:</span><div className="flex-1 border-b border-slate-400"></div></div>
              </div>
              <div className="rounded-lg border border-slate-300 p-3 space-y-2.5">
                <p className="mb-2 font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1">{sanitizeVisibleText('Identificação do fornecedor')}</p>
                <div className="flex items-end"><span className="shrink-0 mr-2 font-medium">{sanitizeVisibleText('Farmácia:')}</span><div className="flex-1 border-b border-slate-400"></div></div>
                <div className="flex items-end"><span className="shrink-0 mr-2 font-medium">{sanitizeVisibleText('Farmacêutico:')}</span><div className="flex-1 border-b border-slate-400"></div></div>
                <div className="flex items-end"><span className="shrink-0 mr-2 font-medium">Assinatura:</span><div className="flex-1 border-b border-slate-400"></div></div>
                <div className="flex items-end"><span className="shrink-0 mr-2 font-medium">Data:</span><div className="w-8 border-b border-slate-400 mx-1"></div>/<div className="w-8 border-b border-slate-400 mx-1"></div>/<div className="w-12 border-b border-slate-400 ml-1 flex-1"></div></div>
              </div>
            </div>
          </section>
        ) : null}

        {cfg.showSignature ? (
          <div
            className={`mt-8 border-t border-slate-300 pt-6 transition ${zoneRing(interactive, activeZone, 'signature')}`}
            style={zoneStyle('signature', { fontSize: `${zoneFontPt('signature', cfg.fontSizePt)}pt` })}
            {...makeZoneProps('signature')}
          >
            {signatureOverride ? <p className="mb-4 whitespace-pre-line">{signatureOverride}</p> : null}
            <div className={`mx-auto grid w-full gap-5 ${doc.documentKind === 'special-control' && cfg.showMapaSignature ? 'max-w-3xl grid-cols-1 md:grid-cols-2' : 'max-w-sm grid-cols-1'}`}>
              <div className="flex flex-col items-center">
                <div className="mb-2 h-16 flex items-center justify-center">
                  {signatureDataUrl ? (
                    <img src={signatureDataUrl} alt="Assinatura digital" className="max-h-16 w-auto object-contain" />
                  ) : (
                    <span className="text-sm text-slate-400">Sem assinatura CRMV</span>
                  )}
                </div>
                <div className="h-px w-full bg-slate-500"></div>
                <p className="mt-1 text-center text-xs font-bold">{doc.prescriberName}</p>
                <p className="text-center text-[11px] text-slate-500">Assinatura CRMV</p>
              </div>

              {doc.documentKind === 'special-control' && cfg.showMapaSignature ? (
                <div className="flex flex-col items-center">
                  <div className="mb-2 h-16 flex items-center justify-center">
                    {mapaSignatureDataUrl ? (
                      <img src={mapaSignatureDataUrl} alt="Assinatura GOV.BR" className="max-h-16 w-auto object-contain" />
                    ) : (
                      <div className="h-16 w-32" aria-hidden="true" />
                    )}
                  </div>
                  <div className="h-px w-full bg-slate-500"></div>
                  <p className="mt-1 text-center text-xs font-bold">{doc.prescriberName}</p>
                  <p className="text-center text-[11px] text-slate-500">Assinatura GOV.BR</p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default RxPrintView
