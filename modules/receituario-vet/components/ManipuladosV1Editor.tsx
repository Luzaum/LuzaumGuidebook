import React, { useMemo, useState } from 'react'
import { RxvButton, RxvCard, RxvField, RxvInput, RxvSectionHeader, RxvSelect, RxvTextarea, RxvToggle } from '../../../src/components/receituario/RxvComponents'
import { buildGeneratedUsageText, MANIPULADO_V1_FLAVORS, MANIPULADO_V1_FORMS, normalizeManipuladoV1, type ManipuladoV1Formula } from '../manipuladosV1'
import { parseManipuladoV1FromText } from '../manipuladosV1Parser'
import {
  getManipuladoV1PrintLineLeft,
  getManipuladoV1PrintLineRight,
  renderManipuladoV1PharmacyInstruction,
  renderManipuladoV1Recommendations,
  renderManipuladoV1TutorInstruction,
} from '../manipuladosV1Render'

// ─── opções ──────────────────────────────────────────────────────────────────

const POSOLOGY_MODE_OPTIONS = [
  { value: 'fixed_per_animal', label: 'Dose fixa por animal' },
  { value: 'mg_per_kg_dose', label: 'mg/kg por dose (calculado pelo peso)' },
  { value: 'mg_per_m2_dose', label: 'mg/m² por dose (oncologia)' },
  { value: 'fixed_per_application', label: 'Dose fixa por aplicação ou unidade' },
  { value: 'fixed_concentration', label: 'Concentração fixa' },
  { value: 'variant_table', label: 'Tabela por variante clínica' },
]

const FREQUENCY_SELECT_OPTIONS = [
  { value: 'q6h', label: 'A cada 6 horas' },
  { value: 'q8h', label: 'A cada 8 horas' },
  { value: 'q12h', label: 'A cada 12 horas' },
  { value: 'q24h', label: 'A cada 24 horas' },
  { value: '_1x_dia', label: '1x ao dia' },
  { value: '_2x_dia', label: '2x ao dia' },
  { value: '_3x_dia', label: '3x ao dia' },
  { value: 'custom', label: 'Personalizada (texto livre)' },
]

const FREQ_OPTION_TO_MODE: Record<string, { mode: string; label: string }> = {
  q6h: { mode: 'q6h', label: 'a cada 6 horas' },
  q8h: { mode: 'q8h', label: 'a cada 8 horas' },
  q12h: { mode: 'q12h', label: 'a cada 12 horas' },
  q24h: { mode: 'q24h', label: 'a cada 24 horas' },
  _1x_dia: { mode: 'q24h', label: '1x ao dia' },
  _2x_dia: { mode: 'custom', label: '2x ao dia' },
  _3x_dia: { mode: 'custom', label: '3x ao dia' },
}

function resolveFrequencySelectValue(formula: ManipuladoV1Formula): string {
  const label = formula.prescribing.frequency_label
  if (label === '1x ao dia') return '_1x_dia'
  if (label === '2x ao dia') return '_2x_dia'
  if (label === '3x ao dia') return '_3x_dia'
  const mode = formula.prescribing.frequency_mode
  if (mode === 'single_dose' || mode === 'continuous_use' || mode === 'until_recheck' || mode === 'until_finished') return 'custom'
  if (['q6h', 'q8h', 'q12h', 'q24h'].includes(mode)) return mode
  return 'custom'
}

const PRIMARY_ROUTE_OPTIONS = [
  { value: 'ORAL', label: 'Via oral' },
  { value: 'TRANSDÉRMICO', label: 'Transdérmico' },
  { value: 'TÓPICO', label: 'Tópico (uso cutâneo)' },
  { value: 'OTOLÓGICO', label: 'Otológico' },
  { value: 'USO EXTERNO', label: 'Uso externo (geral)' },
]

function getDoseUnitOptions(posologyMode: string): { value: string; label: string }[] {
  if (posologyMode === 'mg_per_kg_dose') {
    return [
      { value: 'mg/kg', label: 'mg/kg' },
      { value: 'mcg/kg', label: 'mcg/kg' },
      { value: 'g/kg', label: 'g/kg' },
      { value: 'mL/kg', label: 'mL/kg' },
      { value: 'UI/kg', label: 'UI/kg' },
    ]
  }
  if (posologyMode === 'mg_per_m2_dose') {
    return [
      { value: 'mg/m²', label: 'mg/m²' },
      { value: 'mcg/m²', label: 'mcg/m²' },
      { value: 'g/m²', label: 'g/m²' },
      { value: 'UI/m²', label: 'UI/m²' },
    ]
  }
  return [
    { value: 'mg', label: 'mg' },
    { value: 'mcg', label: 'mcg' },
    { value: 'g', label: 'g' },
    { value: 'mL', label: 'mL' },
    { value: 'UI', label: 'UI' },
    { value: 'mg/dose', label: 'mg/dose' },
    { value: 'mcg/dose', label: 'mcg/dose' },
    { value: 'g/dose', label: 'g/dose' },
    { value: 'mL/dose', label: 'mL/dose' },
    { value: 'UI/dose', label: 'UI/dose' },
    { value: 'mg/mL', label: 'mg/mL' },
    { value: 'mg/biscoito', label: 'mg/biscoito' },
    { value: 'mg/cápsula', label: 'mg/cápsula' },
    { value: 'mg/petisco', label: 'mg/petisco' },
    { value: 'mg/sachê', label: 'mg/sachê' },
    { value: 'mg/aplicação', label: 'mg/aplicação' },
    { value: 'mg/unidade', label: 'mg/unidade' },
  ]
}

const PERIOD_MODE_OPTIONS = [
  { value: '__closed', label: 'Duração fechada' },
  { value: '__single', label: 'Dose única' },
  { value: '__continuous', label: 'Uso contínuo' },
  { value: '__recheck', label: 'Até reavaliação' },
  { value: '__finished', label: 'Até terminar o medicamento' },
  { value: 'custom', label: 'Personalizada (texto livre)' },
]

const DURATION_FIXED_UNIT_OPTIONS = [
  { value: 'dias', label: 'dias' },
  { value: 'semanas', label: 'semanas' },
  { value: 'meses', label: 'meses' },
]

const FINAL_UNIT_OPTIONS = [
  { value: 'doses', label: 'doses' },
  { value: 'aplicacoes', label: 'aplicações' },
  { value: 'capsulas', label: 'cápsulas' },
  { value: 'biscoitos', label: 'biscoitos' },
  { value: 'mL', label: 'mL' },
  { value: 'saches', label: 'sachês' },
  { value: 'petiscos', label: 'petiscos' },
  { value: 'unidades', label: 'unidades' },
]

const INGREDIENT_ROLE_OPTIONS = [
  { value: 'active', label: 'Ativo' },
  { value: 'vehicle', label: 'Veículo' },
  { value: 'excipient', label: 'Excipiente' },
  { value: 'base', label: 'Base / Q.S.P.' },
]

const INGREDIENT_RULE_OPTIONS = [
  { value: 'fixed', label: 'Quantidade fixa' },
  { value: 'per_kg', label: 'Por kg de peso vivo' },
  { value: 'per_m2', label: 'Por m² de superfície corporal' },
  { value: 'weight_range', label: 'Tabela por faixa de peso' },
  { value: 'concentration', label: 'Por concentração final' },
]

const BASE_VEHICLE_SUGGESTIONS = [
  'Pasta oral palatável',
  'Gel transdérmico adequado',
  'Veículo neutro q.s.p.',
  'Suspensão oral estabilizada',
  'Óleo de coco fracionado',
  'Propilenoglicol q.s.p.',
  'Metilcelulose 1%',
  'Creme base não iônico',
  'Solução fisiológica 0,9%',
  'Vaselina sólida',
  'Shampoo base neutro',
  'Carbopol 0,5%',
  'Álcool etílico 70%',
]

const INGREDIENT_UNIT_SUGGESTIONS = [
  'mg', 'mcg', 'g', 'mL', 'UI',
  'mg/kg', 'mcg/kg', 'g/kg', 'mL/kg',
  'mg/m²', 'mcg/m²', 'g/m²',
  'mg/dose', 'mcg/dose', 'g/dose', 'mL/dose',
  'mg/mL', 'mg/biscoito', 'mg/cápsula', 'mg/petisco', 'mg/sachê', 'mg/unidade',
  '%', 'gotas',
]

// ─── resolvers de período ─────────────────────────────────────────────────────

function resolvePeriodMode(formula: ManipuladoV1Formula): string {
  const label = formula.prescribing.duration_label?.trim().toLowerCase()
  if (label === 'dose única' || label === 'dose unica') return '__single'
  if (label === 'uso contínuo' || label === 'uso continuo') return '__continuous'
  if (label === 'até reavaliação' || label === 'ate reavaliacao') return '__recheck'
  if (label === 'até terminar o medicamento' || label === 'ate terminar o medicamento') return '__finished'
  const unit = formula.prescribing.duration_unit
  if (unit === 'custom') return 'custom'
  return '__closed'
}

function handlePeriodModeChange(
  current: ManipuladoV1Formula,
  selected: string,
): Partial<ManipuladoV1Formula['prescribing']> {
  if (selected === '__single') return { duration_unit: 'dose', duration_value: 1, duration_label: 'dose única' }
  if (selected === '__continuous') return { duration_unit: 'dias', duration_value: null, duration_label: 'uso contínuo' }
  if (selected === '__recheck') return { duration_unit: 'dias', duration_value: null, duration_label: 'até reavaliação' }
  if (selected === '__finished') return { duration_unit: 'dias', duration_value: null, duration_label: 'até terminar o medicamento' }
  if (selected === 'custom') return { duration_unit: 'custom', duration_value: null, duration_label: '' }
  // __closed: keep existing value/unit or default to dias
  return {
    duration_unit: current.prescribing.duration_unit === 'dose' || current.prescribing.duration_unit === 'custom'
      ? 'dias'
      : current.prescribing.duration_unit,
    duration_label: '',
  }
}

// ─── helper ingrediente ───────────────────────────────────────────────────────

function updateIngredient(value: ManipuladoV1Formula, id: string, patch: Partial<ManipuladoV1Formula['ingredients'][number]>): ManipuladoV1Formula {
  return {
    ...value,
    ingredients: value.ingredients.map((ingredient) => ingredient.id === id ? { ...ingredient, ...patch } : ingredient),
  }
}

// ─── helpers visuais ──────────────────────────────────────────────────────────

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-[11px] leading-5 text-slate-500">{children}</p>
}

function ContextNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-amber-500/20 bg-amber-500/8 px-3 py-2 text-[11px] leading-5 text-amber-300">
      {children}
    </p>
  )
}

function SubsectionDivider({ label }: { label: string }) {
  return (
    <p className="xl:col-span-12 mt-2 text-xs font-black uppercase tracking-widest text-slate-500 border-t border-slate-800 pt-3">
      {label}
    </p>
  )
}

function HelpTooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <span className="relative ml-1 inline-flex align-middle">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-slate-600 text-[10px] font-bold text-slate-400 hover:border-[color:color-mix(in_srgb,var(--rxv-primary)_60%,transparent)] hover:text-[color:color-mix(in_srgb,var(--rxv-primary)_72%,#e2e8f0)]"
      >?</button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-6 top-0 z-50 w-72 rounded-2xl border border-[color:color-mix(in_srgb,var(--rxv-primary)_20%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_6%,var(--rxv-surface))] p-4 shadow-2xl text-xs text-slate-300 leading-5">
            {children}
            <button type="button" onClick={() => setOpen(false)} className="mt-3 block text-[10px] text-slate-500 hover:text-slate-300">Fechar ✕</button>
          </div>
        </>
      )}
    </span>
  )
}

// ─── componente ──────────────────────────────────────────────────────────────

export function ManipuladosV1Editor({
  value,
  onChange,
  onSave,
  onDelete,
  saving,
  saveLabel,
}: {
  value: ManipuladoV1Formula
  onChange: (next: ManipuladoV1Formula) => void
  onSave: () => void
  onDelete?: () => void
  saving?: boolean
  saveLabel?: string
}) {
  const [quickText, setQuickText] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const current = value
  const previewFormula = useMemo(() => normalizeManipuladoV1(value), [value])
  const previewUsage = previewFormula.prescribing.manual_usage_override || buildGeneratedUsageText(previewFormula)
  const recommendations = useMemo(() => renderManipuladoV1Recommendations(previewFormula), [previewFormula])
  const periodMode = resolvePeriodMode(previewFormula)
  const isClosedDuration = periodMode === '__closed'
  const isCustomDuration = periodMode === 'custom'
  const isDoseByWeight = previewFormula.prescribing.posology_mode === 'mg_per_kg_dose' || previewFormula.prescribing.posology_mode === 'mg_per_m2_dose'
  const freqSelectValue = resolveFrequencySelectValue(previewFormula)

  const setFormula = (patch: Partial<ManipuladoV1Formula>) => onChange({ ...current, ...patch })

  return (
    <div className="space-y-5">
      {/* ── Importação rápida ── */}
      <RxvCard className="p-6">
        <RxvSectionHeader icon="note_stack" title="Importar por texto" subtitle="Cole uma fórmula pronta para pré-preencher automaticamente os campos." />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          <RxvField label="Texto da fórmula" className="xl:col-span-9">
            <RxvTextarea value={quickText} onChange={(e) => setQuickText(e.target.value)} rows={6} placeholder="Cole aqui o texto da fórmula. Exemplo:&#10;Aciclovir 10–25 mg/kg/dose&#10;Pasta oral sabor Frango q.s.p. 60 g&#10;Gatos. 2x ao dia por 14 dias." />
          </RxvField>
          <div className="xl:col-span-3 flex items-end">
            <RxvButton variant="secondary" onClick={() => onChange(parseManipuladoV1FromText(quickText, previewFormula.identity.clinic_id))}>Importar texto</RxvButton>
          </div>
        </div>
      </RxvCard>

      {/* ── Bloco 1 — Identidade ── */}
      <RxvCard className="p-6">
        <RxvSectionHeader icon="badge" title="Bloco 1 • Identidade" subtitle="Nome, espécie, forma e via. Só o essencial para reconhecer e listar a fórmula." />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          <RxvField label="Nome da fórmula" className="xl:col-span-6">
            <RxvInput value={current.identity.name} onChange={(e) => setFormula({ identity: { ...current.identity, name: e.target.value, slug: e.target.value } })} placeholder="Ex.: Aciclovir pasta oral sabor frango" />
          </RxvField>
          <RxvField label="Espécie-alvo" className="xl:col-span-2">
            <RxvSelect value={current.identity.species_scope} onChange={(e) => setFormula({ identity: { ...current.identity, species_scope: e.target.value as any } })} options={[{ value: 'cao', label: 'Cão' }, { value: 'gato', label: 'Gato' }, { value: 'ambos', label: 'Ambos' }]} />
          </RxvField>
          <RxvField label="Forma farmacêutica" className="xl:col-span-2">
            <RxvSelect value={current.identity.pharmaceutical_form} onChange={(e) => setFormula({ identity: { ...current.identity, pharmaceutical_form: e.target.value } })} options={[...MANIPULADO_V1_FORMS]} />
          </RxvField>
          <RxvField label="Via principal" className="xl:col-span-2">
            <RxvSelect value={current.identity.primary_route} onChange={(e) => setFormula({ identity: { ...current.identity, primary_route: e.target.value } })} options={PRIMARY_ROUTE_OPTIONS} />
          </RxvField>
          <RxvField label="Indicação clínica" className="xl:col-span-8">
            <RxvInput value={current.identity.indication_summary} onChange={(e) => setFormula({ identity: { ...current.identity, indication_summary: e.target.value } })} placeholder="Ex.: Antiviral — herpesvírus felino (FHV-1)" />
            <FieldHint>Aparece no card do catálogo e ajuda a identificar o item na busca.</FieldHint>
          </RxvField>
          <RxvField label="Descrição complementar" className="xl:col-span-4">
            <RxvInput value={current.identity.description} onChange={(e) => setFormula({ identity: { ...current.identity, description: e.target.value } })} placeholder="Informação adicional (opcional)" />
          </RxvField>
          <div className="xl:col-span-12 flex flex-wrap gap-4">
            <RxvToggle checked={current.identity.sale_classification === 'controlled'} onChange={(checked) => setFormula({ identity: { ...current.identity, sale_classification: checked ? 'controlled' : 'free' } })} label="Medicamento controlado" />
            <RxvToggle checked={current.identity.is_active} onChange={(checked) => setFormula({ identity: { ...current.identity, is_active: checked } })} label="Visível no catálogo" />
          </div>
        </div>
      </RxvCard>

      {/* ── Bloco 2 — Como prescrever ── */}
      <RxvCard className="p-6">
        <RxvSectionHeader icon="stethoscope" title="Bloco 2 • Como prescrever" subtitle="Dose, frequência, duração e texto clínico automático." />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">

          {/* Posologia */}
          <div className="xl:col-span-4">
            <div className="flex items-center mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modo posológico</span>
              <HelpTooltip>
                <p className="font-bold text-white mb-1">Modo posológico</p>
                <p>Define como a dose é calculada:</p>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li><strong>Dose fixa</strong>: mesma dose para todos os animais</li>
                  <li><strong>mg/kg</strong>: calculado pelo peso do paciente</li>
                  <li><strong>mg/m²</strong>: oncologia, calculado pela superfície corporal</li>
                  <li><strong>Por aplicação</strong>: dose por unidade (ex.: 1 cápsula, 1 biscoito)</li>
                </ul>
              </HelpTooltip>
            </div>
            <RxvSelect
              value={current.prescribing.posology_mode}
              onChange={(e) => setFormula({ prescribing: { ...current.prescribing, posology_mode: e.target.value as any } })}
              options={POSOLOGY_MODE_OPTIONS}
            />
            <FieldHint>
              {current.prescribing.posology_mode === 'mg_per_kg_dose' && 'Informe dose mínima e máxima. O médico calcula pelo peso do paciente na hora da prescrição.'}
              {current.prescribing.posology_mode === 'fixed_per_animal' && 'Dose igual independente do peso. Preencha só a dose mínima.'}
              {current.prescribing.posology_mode === 'mg_per_m2_dose' && 'Usada em oncologia. O cálculo usa a superfície corporal do paciente.'}
              {current.prescribing.posology_mode === 'fixed_per_application' && 'Dose fixa por aplicação ou unidade (ex.: 1 cápsula, 1 biscoito).'}
            </FieldHint>
          </div>

          {isDoseByWeight ? (
            <>
              <RxvField label="Dose mínima" className="xl:col-span-2">
                <RxvInput value={current.prescribing.dose_min ?? ''} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, dose_min: e.target.value ? Number(String(e.target.value).replace(',', '.')) : null } })} placeholder="Ex.: 10" />
              </RxvField>
              <RxvField label="Dose máxima" className="xl:col-span-2">
                <RxvInput value={current.prescribing.dose_max ?? ''} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, dose_max: e.target.value ? Number(String(e.target.value).replace(',', '.')) : null } })} placeholder="Ex.: 25" />
              </RxvField>
            </>
          ) : (
            <RxvField label="Dose" className="xl:col-span-2">
              <RxvInput value={current.prescribing.dose_min ?? ''} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, dose_min: e.target.value ? Number(String(e.target.value).replace(',', '.')) : null } })} placeholder="Ex.: 5" />
            </RxvField>
          )}

          <RxvField label="Unidade da dose" className="xl:col-span-2">
            <RxvSelect value={current.prescribing.dose_unit} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, dose_unit: e.target.value } })} options={getDoseUnitOptions(current.prescribing.posology_mode)} />
          </RxvField>

          {/* Frequência */}
          <SubsectionDivider label="Frequência" />

          {/* Toggle Dose única */}
          <div className="xl:col-span-12 flex flex-wrap items-center gap-6">
            <RxvToggle
              checked={current.prescribing.frequency_mode === 'single_dose'}
              onChange={(checked) => {
                if (checked) {
                  setFormula({ prescribing: { ...current.prescribing, frequency_mode: 'single_dose' as any, frequency_label: 'em dose única' } })
                } else {
                  setFormula({ prescribing: { ...current.prescribing, frequency_mode: 'q12h' as any, frequency_label: 'a cada 12 horas' } })
                }
              }}
              label="Dose única"
            />
            {current.prescribing.frequency_mode === 'single_dose' && (
              <RxvToggle
                checked={!!(current.prescribing as any)._repeat_periodically}
                onChange={(checked) => {
                  setFormula({
                    prescribing: {
                      ...current.prescribing,
                      _repeat_periodically: checked,
                      frequency_label: checked
                        ? `em dose única, repetir a cada ${(current.prescribing as any)._repeat_every_value || 30} ${(current.prescribing as any)._repeat_every_unit || 'dias'}`
                        : 'em dose única',
                    } as any,
                  })
                }}
                label="Repetir periodicamente"
              />
            )}
          </div>

          {/* Campos de repetição periódica */}
          {current.prescribing.frequency_mode === 'single_dose' && (current.prescribing as any)._repeat_periodically && (
            <>
              <RxvField label="Repetir a cada" className="xl:col-span-2">
                <RxvInput
                  type="number"
                  min="1"
                  value={(current.prescribing as any)._repeat_every_value || ''}
                  onChange={(e) => {
                    const val = e.target.value
                    const unit = (current.prescribing as any)._repeat_every_unit || 'dias'
                    setFormula({ prescribing: { ...current.prescribing, _repeat_every_value: val, frequency_label: val ? `em dose única, repetir a cada ${val} ${unit}` : 'em dose única' } as any })
                  }}
                  placeholder="Ex: 30"
                />
              </RxvField>
              <RxvField label="Unidade" className="xl:col-span-2">
                <RxvSelect
                  value={(current.prescribing as any)._repeat_every_unit || 'dias'}
                  onChange={(e) => {
                    const unit = e.target.value
                    const val = (current.prescribing as any)._repeat_every_value || ''
                    setFormula({ prescribing: { ...current.prescribing, _repeat_every_unit: unit, frequency_label: val ? `em dose única, repetir a cada ${val} ${unit}` : 'em dose única' } as any })
                  }}
                  options={[{ value: 'dias', label: 'dias' }, { value: 'semanas', label: 'semanas' }, { value: 'meses', label: 'meses' }]}
                />
              </RxvField>
            </>
          )}

          {/* Select de frequência recorrente — escondido quando dose única */}
          {current.prescribing.frequency_mode !== 'single_dose' && (
            <>
              <div className="xl:col-span-4">
                <div className="flex items-center mb-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modo de frequência</span>
                  <HelpTooltip>
                    <p className="font-bold text-white mb-1">Frequência de administração</p>
                    <p>Selecione o intervalo padrão. Para frequências personalizadas (ex.: "2x ao dia às 8h e 20h"), use <strong>Personalizada</strong> e edite o texto abaixo.</p>
                  </HelpTooltip>
                </div>
                <RxvSelect
                  value={freqSelectValue}
                  onChange={(e) => {
                    const selected = e.target.value
                    if (selected === 'custom') {
                      setFormula({ prescribing: { ...current.prescribing, frequency_mode: 'custom' as any } })
                    } else {
                      const mapped = FREQ_OPTION_TO_MODE[selected]
                      if (mapped) {
                        setFormula({ prescribing: { ...current.prescribing, frequency_mode: mapped.mode as any, frequency_label: mapped.label } })
                      }
                    }
                  }}
                  options={FREQUENCY_SELECT_OPTIONS}
                />
              </div>
              <RxvField label="Texto da frequência" className="xl:col-span-4">
                <RxvInput value={current.prescribing.frequency_label} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, frequency_label: e.target.value } })} placeholder="Ex.: a cada 12 horas" />
                <FieldHint>Preenchido automaticamente ao trocar a frequência. Edite se precisar de texto personalizado.</FieldHint>
              </RxvField>
            </>
          )}

          {/* Duração do tratamento */}
          <SubsectionDivider label="Duração do tratamento" />

          <div className="xl:col-span-3">
            <div className="flex items-center mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Período de uso</span>
              <HelpTooltip>
                <p className="font-bold text-white mb-1">Período de uso</p>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li><strong>Duração fechada</strong>: número de dias/semanas/meses</li>
                  <li><strong>Dose única</strong>: administrar uma única vez</li>
                  <li><strong>Uso contínuo</strong>: sem data de término definida</li>
                  <li><strong>Até reavaliação</strong>: usar até retorno ao veterinário</li>
                  <li><strong>Até terminar</strong>: usar todo o medicamento manipulado</li>
                </ul>
              </HelpTooltip>
            </div>
            <RxvSelect
              value={periodMode}
              onChange={(e) => {
                const patch = handlePeriodModeChange(current, e.target.value)
                setFormula({ prescribing: { ...current.prescribing, ...patch } })
              }}
              options={PERIOD_MODE_OPTIONS}
            />
          </div>

          {isClosedDuration ? (
            <>
              <RxvField label="Valor" className="xl:col-span-2">
                <RxvInput
                  value={current.prescribing.duration_value ?? ''}
                  onChange={(e) => {
                    const v = e.target.value ? Number(String(e.target.value).replace(',', '.')) : null
                    const unit = current.prescribing.duration_unit || 'dias'
                    setFormula({ prescribing: { ...current.prescribing, duration_value: v, duration_label: v ? `${v} ${unit}` : '' } })
                  }}
                  placeholder="Ex.: 14"
                />
              </RxvField>
              <RxvField label="Unidade" className="xl:col-span-2">
                <RxvSelect
                  value={current.prescribing.duration_unit || 'dias'}
                  onChange={(e) => {
                    const unit = e.target.value
                    const v = current.prescribing.duration_value
                    setFormula({ prescribing: { ...current.prescribing, duration_unit: unit, duration_label: v ? `${v} ${unit}` : '' } })
                  }}
                  options={DURATION_FIXED_UNIT_OPTIONS}
                />
              </RxvField>
            </>
          ) : isCustomDuration ? (
            <RxvField label="Texto do período" className="xl:col-span-4">
              <RxvInput value={current.prescribing.duration_label} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, duration_label: e.target.value } })} placeholder="Ex.: 14 dias / até reavaliação" />
            </RxvField>
          ) : null}

          {/* Observação clínica */}
          <RxvField label="Recomendações ao tutor" className="xl:col-span-12">
            <RxvTextarea value={current.prescribing.clinical_note} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, clinical_note: e.target.value } })} rows={3} placeholder="Uma recomendação por linha. Aparecerão como itens no PDF." />
            <FieldHint>Ex.: Agitar antes de usar. / Conservar sob refrigeração. / Utilizar seringa dosadora.</FieldHint>
          </RxvField>

          {/* Texto gerado */}
          <div className="xl:col-span-12">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">Texto clínico gerado automaticamente</p>
            <div className="rounded-xl border border-[color:color-mix(in_srgb,var(--rxv-primary)_18%,transparent)] bg-black/20 px-4 py-3 text-sm text-slate-200">{previewUsage}</div>
          </div>

          {/* Campos avançados (início + override) */}
          <div className="xl:col-span-12">
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-300"
            >
              <span className="material-symbols-outlined text-[16px]">{showAdvanced ? 'expand_less' : 'expand_more'}</span>
              {showAdvanced ? 'Ocultar campos avançados' : 'Campos avançados (início e texto manual)'}
            </button>
          </div>

          {showAdvanced ? (
            <>
              <RxvField label="Início da medicação" className="xl:col-span-4">
                <RxvInput value={current.prescribing.start_text} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, start_text: e.target.value } })} placeholder="Ex.: às 20:00 do dia 30/03/2026" />
                <ContextNote>Campo de contexto prescritivo. Normalmente preenchido na Nova Receita 2.0, não no catálogo-base.</ContextNote>
              </RxvField>
              <RxvField label="Substituição manual do texto clínico" className="xl:col-span-8">
                <RxvTextarea value={current.prescribing.manual_usage_override} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, manual_usage_override: e.target.value } })} rows={3} placeholder="Só preencha se quiser reescrever completamente o texto automático acima." />
                <ContextNote>Ao preencher, o texto automático é ignorado por completo. Deixe vazio para usar o gerado automaticamente.</ContextNote>
              </RxvField>
            </>
          ) : null}
        </div>
      </RxvCard>

      {/* ── Bloco 3 — Farmácia ── */}
      <RxvCard className="p-6">
        <RxvSectionHeader icon="science" title="Bloco 3 • Como a farmácia manipula" subtitle="Q.S.P., base, sabor e ingredientes. Nada aqui imprime na instrução ao tutor." />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <div className="flex items-center mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Q.S.P. (quantidade total a manipular)</span>
              <HelpTooltip>
                <p className="font-bold text-white mb-1">Q.S.P.</p>
                <p>Quantidade suficiente para — é o alvo final da formulação. Exemplos: <strong>60 g</strong>, <strong>30 cápsulas</strong>, <strong>10 mL</strong>.</p>
                <p className="mt-1">Aparece no texto "Favor manipular..." enviado à farmácia.</p>
              </HelpTooltip>
            </div>
            <RxvInput value={current.pharmacy.qsp_text} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, qsp_text: e.target.value } })} placeholder="Ex.: 60 g, 30 unidades, 10 mL" />
            <FieldHint>Quantidade suficiente para (q.s.p.) — alvo final da formulação.</FieldHint>
          </div>
          <RxvField label="Unidade final" className="xl:col-span-2">
            <RxvSelect value={current.pharmacy.final_unit} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, final_unit: e.target.value as any } })} options={FINAL_UNIT_OPTIONS} />
          </RxvField>
          <RxvField label="Sabor" className="xl:col-span-4">
            <RxvSelect value={current.pharmacy.flavor_mode} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, flavor_mode: e.target.value } })} options={[...MANIPULADO_V1_FLAVORS]} />
          </RxvField>
          {current.pharmacy.flavor_mode === 'Outro' ? (
            <RxvField label="Sabor personalizado" className="xl:col-span-4">
              <RxvInput value={current.pharmacy.flavor_text} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, flavor_text: e.target.value } })} placeholder="Descreva o sabor" />
            </RxvField>
          ) : null}
          <div className="xl:col-span-4">
            <div className="flex items-center mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Base / veículo / excipiente</span>
              <HelpTooltip>
                <p className="font-bold text-white mb-1">Base / veículo</p>
                <p>Material que compõe o volume ou a forma final da fórmula. Exemplos:</p>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>Pasta oral palatável</li>
                  <li>Gel transdérmico adequado</li>
                  <li>Suspensão oral estabilizada</li>
                </ul>
              </HelpTooltip>
            </div>
            <>
              <input
                list="manipulado-base-suggestions"
                value={current.pharmacy.base_text}
                onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, base_text: e.target.value } })}
                placeholder="Ex.: pasta oral palatável, gel transdérmico"
                className="w-full rounded-xl border border-slate-700 bg-black/30 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_50%,transparent)] focus:outline-none"
              />
              <datalist id="manipulado-base-suggestions">
                {BASE_VEHICLE_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
              </datalist>
            </>
            <FieldHint>Material de base ou veículo que complementa o ativo. Aparece no texto de manipulação.</FieldHint>
          </div>
          <RxvField label="Instrução para a farmácia" className="xl:col-span-8">
            <RxvTextarea value={current.pharmacy.compounding_instructions} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, compounding_instructions: e.target.value } })} rows={3} placeholder="Observações técnicas para o farmacêutico. Ex.: misturar em câmara de fluxo laminar." />
          </RxvField>
          <RxvField label="Recomendações ao tutor" className="xl:col-span-4">
            <RxvTextarea value={current.pharmacy.pharmaceutic_note} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, pharmaceutic_note: e.target.value } })} rows={3} placeholder="Recomendações extras ao tutor (opcional)." />
            <FieldHint>Aparecerá como recomendação adicional no PDF se preenchido.</FieldHint>
          </RxvField>
        </div>

        {/* Ingredientes */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-black text-white">Ingredientes</p>
            <RxvButton variant="secondary" onClick={() => setFormula({ ingredients: [...current.ingredients, { id: crypto.randomUUID(), name: '', quantity: null, unit: 'mg', role: 'active', rule: 'fixed', note: '', min_quantity: null, max_quantity: null, weight_range_text: '' }] })}>Adicionar ingrediente</RxvButton>
          </div>
          {current.ingredients.map((ingredient, index) => {
            const isPer = ingredient.rule === 'per_kg' || ingredient.rule === 'per_m2'
            return (
              <div key={ingredient.id} className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-800 bg-black/20 p-4 xl:grid-cols-12">
                <RxvField label={`Ingrediente ${index + 1}`} className="xl:col-span-4">
                  <RxvInput value={ingredient.name} onChange={(e) => onChange(updateIngredient(current, ingredient.id, { name: e.target.value }))} placeholder="Nome do ingrediente" />
                </RxvField>
                <RxvField label="Função" className="xl:col-span-2">
                  <RxvSelect value={ingredient.role} onChange={(e) => onChange(updateIngredient(current, ingredient.id, { role: e.target.value as any }))} options={INGREDIENT_ROLE_OPTIONS} />
                </RxvField>
                <RxvField label="Regra de quantidade" className="xl:col-span-3">
                  <RxvSelect value={ingredient.rule} onChange={(e) => onChange(updateIngredient(current, ingredient.id, { rule: e.target.value as any }))} options={INGREDIENT_RULE_OPTIONS} />
                </RxvField>
                {isPer ? (
                  <>
                    <RxvField label="Qtd. mín." className="xl:col-span-1">
                      <RxvInput value={ingredient.min_quantity ?? ''} onChange={(e) => onChange(updateIngredient(current, ingredient.id, { min_quantity: e.target.value ? Number(String(e.target.value).replace(',', '.')) : null }))} placeholder="10" />
                    </RxvField>
                    <RxvField label="Qtd. máx." className="xl:col-span-1">
                      <RxvInput value={ingredient.max_quantity ?? ''} onChange={(e) => onChange(updateIngredient(current, ingredient.id, { max_quantity: e.target.value ? Number(String(e.target.value).replace(',', '.')) : null }))} placeholder="25" />
                    </RxvField>
                    <div className="xl:col-span-1">
                      <RxvField label="Unidade">
                        <input
                          list="manipulado-ingredient-units"
                          value={ingredient.unit}
                          onChange={(e) => onChange(updateIngredient(current, ingredient.id, { unit: e.target.value }))}
                          className="w-full rounded-xl border border-slate-700 bg-black/30 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_50%,transparent)] focus:outline-none"
                        />
                      </RxvField>
                    </div>
                  </>
                ) : (
                  <>
                    <RxvField label="Quantidade" className="xl:col-span-2">
                      <RxvInput value={ingredient.quantity ?? ''} onChange={(e) => onChange(updateIngredient(current, ingredient.id, { quantity: e.target.value ? Number(String(e.target.value).replace(',', '.')) : null }))} />
                    </RxvField>
                    <div className="xl:col-span-1">
                      <RxvField label="Unidade">
                        <input
                          list="manipulado-ingredient-units"
                          value={ingredient.unit}
                          onChange={(e) => onChange(updateIngredient(current, ingredient.id, { unit: e.target.value }))}
                          className="w-full rounded-xl border border-slate-700 bg-black/30 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_50%,transparent)] focus:outline-none"
                        />
                      </RxvField>
                    </div>
                  </>
                )}
                <RxvField label="Observação do ingrediente" className="xl:col-span-10">
                  <RxvInput value={ingredient.note} onChange={(e) => onChange(updateIngredient(current, ingredient.id, { note: e.target.value }))} placeholder="Nota técnica ou farmacotécnica (opcional)" />
                </RxvField>
                <div className="xl:col-span-2 flex items-end justify-end">
                  <RxvButton variant="ghost" onClick={() => setFormula({ ingredients: current.ingredients.filter((entry) => entry.id !== ingredient.id) })}>Remover</RxvButton>
                </div>
              </div>
            )
          })}
          {/* Shared datalist for ingredient units */}
          <datalist id="manipulado-ingredient-units">
            {INGREDIENT_UNIT_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
          </datalist>
        </div>
      </RxvCard>

      {/* ── Bloco 4 — Preview ── */}
      <RxvCard className="p-6">
        <RxvSectionHeader icon="preview" title="Bloco 4 • Preview final" subtitle="Exatamente o que vai para a receita impressa." />
        <div className="space-y-4 rounded-2xl border border-[color:color-mix(in_srgb,var(--rxv-primary)_18%,transparent)] bg-black/20 p-5 text-sm text-slate-200">
          <p className="font-semibold text-white">
            <span>{getManipuladoV1PrintLineLeft(previewFormula)}</span>
            <span className="mx-2 text-slate-600">{'......................................................................................'}</span>
            <span>{getManipuladoV1PrintLineRight(previewFormula)}</span>
          </p>
          <p className="leading-7">{renderManipuladoV1TutorInstruction(previewFormula)}</p>
          <p className="text-[11px] leading-6 text-slate-400">{renderManipuladoV1PharmacyInstruction(previewFormula)}</p>
          {recommendations.length ? (
            <div>
              <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-slate-500">Recomendações ao tutor</p>
              <ul className="list-disc space-y-1 pl-5 leading-6">
                {recommendations.map((entry) => <li key={entry}>{entry}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      </RxvCard>

      <div className="flex items-center justify-end gap-3">
        {onDelete ? <RxvButton variant="ghost" onClick={onDelete}>Excluir fórmula</RxvButton> : null}
        <RxvButton variant="primary" onClick={onSave} loading={!!saving}>{saveLabel ?? 'Salvar fórmula'}</RxvButton>
      </div>
    </div>
  )
}

export default ManipuladosV1Editor
