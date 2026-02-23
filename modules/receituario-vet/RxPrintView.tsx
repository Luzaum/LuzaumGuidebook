import React from 'react'
import { RxTemplateStyle, TemplateZoneKey } from './rxDb'
import { PrintDoc } from './rxTypes'

interface RxPrintViewProps {
  doc: PrintDoc
  compact?: boolean
  zoom?: number
  template?: Partial<RxTemplateStyle>
  signatureDataUrl?: string
  mapaSignatureDataUrl?: string
  logoDataUrl?: string
  prescriberPhone?: string
  prescriberAddressLine?: string
  tutorCpf?: string
  targetPharmacy?: 'veterinária' | 'humana' | 'manipulacao' | 'mista'
  inlineEditNote?: string
  interactive?: boolean
  activeZone?: TemplateZoneKey
  onZoneSelect?: (zone: TemplateZoneKey) => void
  selectedItemId?: string
  onItemSelect?: (itemId: string) => void
  zoneTextOverrides?: Partial<Record<TemplateZoneKey, string>>
}

const BASE_TEMPLATE: RxTemplateStyle = {
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
    /(\d+(?:[.,]\d+)?\s*[a-zA-ZÀ-ÿ%µ/]+(?:\s+por dose)?|por via [^,.;]*|a cada \d+\s*horas|uma vez por dia|\d+\s*vez(?:es)? por dia|durante \d+\s*dias|com uso contínuo até reavaliação do paciente|até terminar o medicamento)/gi

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

export function RxPrintView({
  doc,
  compact = false,
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
  const sheetStyle: React.CSSProperties = compact
    ? paperStyle
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
    <div className="rxv-print-preview rounded-xl border border-slate-300 bg-white text-slate-900 shadow-2xl" style={rootStyle}>
      <div className="border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">
        Visualização rápida
      </div>
      <div className={compact ? 'p-4' : 'p-6'} style={sheetStyle} data-rx-print-canvas="sheet">
        {cfg.showLetterhead ? (
          <>
            <p
              className="mb-2 text-center text-[11px] font-black uppercase tracking-[0.28em]"
              style={{ color: doc.documentKind === 'special-control' ? '#1f2937' : '#334155' }}
            >
              {doc.documentKind === 'special-control' ? 'RECEITUÁRIO DE CONTROLE ESPECIAL' : 'RECEITUÁRIO'}
            </p>
            <div
              className={`mb-6 rounded-lg border-2 border-slate-300 p-4 transition ${zoneRing(interactive, activeZone, 'header')}`}
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
                        <img src={logoDataUrl} alt="Logo da clínica" className="h-full w-full object-cover" />
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
                        {doc.clinicName}
                      </h2>
                      <p className="text-xs text-slate-600">
                        {doc.prescriberName} - {doc.prescriberCrmv}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Data: {doc.dateLabel}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : null}

        <div
          className={`mb-6 rounded-lg border border-slate-200 bg-slate-50 p-3 transition ${zoneRing(interactive, activeZone, 'patient')}`}
          style={zoneStyle('patient', { fontSize: `${zoneFontPt('patient', Math.max(cfg.fontSizePt - 1, 10))}pt` })}
          {...makeZoneProps('patient')}
        >
          {patientOverride ? (
            <p className="whitespace-pre-line">{patientOverride}</p>
          ) : (
            <>
              <p>
                <span className="font-bold">Paciente:</span> {doc.patientLine}
              </p>
              <p>
                <span className="font-bold">Responsável:</span> {doc.tutorLine}
              </p>
              {doc.addressLine ? (
                <p>
                  <span className="font-bold">Endereço:</span> {doc.addressLine}
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
                    {section.title}
                  </h3>
                  <div className="h-px flex-1 bg-slate-300"></div>
                </div>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <article
                      key={item.id}
                      className={`rounded border border-slate-200 p-3 transition ${itemRing(item.id)}`}
                      {...makeItemProps(item.id)}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <h4
                          style={{
                            textDecoration: item.titleUnderline ? 'underline' : 'none',
                            textDecorationColor: sectionAccent,
                            textDecorationThickness: item.titleUnderline ? '2px' : undefined,
                            textUnderlineOffset: item.titleUnderline ? '2px' : undefined,
                            fontWeight: item.titleBold ? 700 : 400,
                          }}
                        >
                          {item.index}. {item.title}
                        </h4>
                        {item.status !== 'ok' ? (
                          <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                            incompleto
                          </span>
                        ) : null}
                      </div>
                      {item.subtitle ? <p className="mb-1" style={{ fontSize: `${Math.max(zoneFontPt('body', cfg.fontSizePt) - 2, 9)}pt`, color: '#64748b' }}>{item.subtitle}</p> : null}
                      <p className="whitespace-pre-line leading-relaxed" style={{ fontSize: `${Math.max(zoneFontPt('body', cfg.fontSizePt) - 1, 10)}pt` }}>
                        {highlightInstructionSegments(item.instruction)}
                      </p>
                      {item.cautions.length ? (
                        <div className="mt-2 space-y-1">
                          {item.cautions.map((line, idx) => (
                            <p key={`${item.id}-c-${idx}`} className="font-bold" style={{ fontSize: `${Math.max(zoneFontPt('body', cfg.fontSizePt) - 1, 10)}pt` }}>
                              {line}
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
            className={`mt-6 rounded border border-slate-200 p-3 transition ${zoneRing(interactive, activeZone, 'recommendations')}`}
            style={zoneStyle('recommendations', { fontSize: `${zoneFontPt('recommendations', cfg.fontSizePt)}pt` })}
            {...makeZoneProps('recommendations')}
          >
            {recommendationsOverride ? (
              <p className="whitespace-pre-line">{recommendationsOverride}</p>
            ) : (
              <>
                <h3 className="mb-2 uppercase tracking-wide" style={{ fontSize: `${Math.max(zoneFontPt('recommendations', cfg.fontSizePt), 10)}pt`, fontWeight: zoneWeight('recommendations', 800) }}>
                  RECOMENDAÇÕES
                </h3>
                {doc.recommendations.map((line, idx) => (
                  <p key={`rec-${idx}`} className="whitespace-pre-line" style={{ fontSize: `${Math.max(zoneFontPt('recommendations', cfg.fontSizePt) - 1, 10)}pt` }}>
                    - {line}
                  </p>
                ))}
                {doc.exams.length > 0 ? (
                  <div className="mt-3">
                    <h4 className="uppercase" style={{ fontSize: `${Math.max(zoneFontPt('recommendations', cfg.fontSizePt) - 1, 9)}pt`, fontWeight: zoneWeight('recommendations', 800) }}>Exames sugeridos</h4>
                    {doc.exams.map((exam, idx) => (
                      <p key={`exam-${idx}`} style={{ fontSize: `${Math.max(zoneFontPt('recommendations', cfg.fontSizePt) - 1, 10)}pt`, fontWeight: zoneWeight('recommendations', 600) }}>
                        - {exam}
                      </p>
                    ))}
                  </div>
                ) : null}
                {inlineEditNote ? (
                  <div className="mt-3 rounded border border-slate-300 bg-slate-50 p-2 text-sm">
                    <p className="font-bold">Observação adicional</p>
                    <p className="whitespace-pre-line">{inlineEditNote}</p>
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
              <strong>Dados do proprietário e animal:</strong> {doc.tutorLine} • CPF: {tutorCpf || '___________________'}
              {' • '}Endereço: {doc.addressLine || '________________________________'}
              {' • '}Paciente: {doc.patientLine}
            </p>
          </section>
        ) : null}

        {doc.documentKind === 'special-control' ? (
          <section className="mt-4 rounded border border-slate-300 bg-slate-50 p-3 text-[11px]" style={{ color: '#1f2937' }}>
            <p className="mb-2 font-bold">1ª via - Farmácia | 2ª via - Paciente</p>
            <p className="mb-3">
              Farmácia veterinária ({targetPharmacy === 'veterinária' || targetPharmacy === 'mista' ? 'X' : ' '}) {'  '}
              Farmácia de manipulação ({targetPharmacy === 'manipulacao' || targetPharmacy === 'mista' ? 'X' : ' '}) {'  '}
              Farmácia humana ({targetPharmacy === 'humana' || targetPharmacy === 'mista' ? 'X' : ' '})
            </p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="rounded border border-slate-300 p-2">
                <p className="mb-1 font-bold">Identificação do comprador</p>
                <p>Nome: ________________________________</p>
                <p>RG: _________________________________</p>
                <p>Endereço: ___________________________</p>
                <p>Cidade/UF: __________________________</p>
              </div>
              <div className="rounded border border-slate-300 p-2">
                <p className="mb-1 font-bold">Identificação do fornecedor</p>
                <p>Farmácia: ____________________________</p>
                <p>Farmacêutico: ________________________</p>
                <p>Assinatura: __________________________</p>
                <p>Data: ____ / ____ / ______</p>
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
