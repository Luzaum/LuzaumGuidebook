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

const FREQUENCY_MODE_OPTIONS = [
  { value: 'q6h', label: 'A cada 6 horas' },
  { value: 'q8h', label: 'A cada 8 horas' },
  { value: 'q12h', label: 'A cada 12 horas' },
  { value: 'q24h', label: 'A cada 24 horas (1x ao dia)' },
  { value: 'one_to_two_daily', label: '1–2 vezes ao dia' },
  { value: 'single_dose', label: 'Dose única' },
  { value: 'continuous_use', label: 'Uso contínuo' },
  { value: 'until_recheck', label: 'Até reavaliação médica' },
  { value: 'until_finished', label: 'Até terminar o medicamento' },
  { value: 'custom', label: 'Personalizada (texto livre)' },
]

/** Label automática para o texto de frequência */
function autoFrequencyLabel(mode: string): string {
  const map: Record<string, string> = {
    q6h: 'a cada 6 horas',
    q8h: 'a cada 8 horas',
    q12h: 'a cada 12 horas',
    q24h: 'a cada 24 horas',
    one_to_two_daily: '1–2 vezes ao dia',
    single_dose: 'dose única',
    continuous_use: 'uso contínuo',
    until_recheck: 'até reavaliação',
    until_finished: 'até terminar o medicamento',
  }
  return map[mode] || ''
}

const PRIMARY_ROUTE_OPTIONS = [
  { value: 'ORAL', label: 'Via oral' },
  { value: 'TRANSDÉRMICO', label: 'Transdérmico' },
  { value: 'TÓPICO', label: 'Tópico (uso cutâneo)' },
  { value: 'OTOLÓGICO', label: 'Otológico' },
  { value: 'USO EXTERNO', label: 'Uso externo (geral)' },
]

const DOSE_UNIT_OPTIONS = [
  { value: 'mg', label: 'mg' },
  { value: 'mcg', label: 'mcg' },
  { value: 'g', label: 'g' },
  { value: 'mL', label: 'mL' },
  { value: 'dose', label: 'dose' },
  { value: 'UI', label: 'UI' },
]

const DURATION_UNIT_OPTIONS = [
  { value: 'dias', label: 'dias' },
  { value: 'semanas', label: 'semanas' },
  { value: 'meses', label: 'meses' },
  { value: '__single', label: 'dose única (sem duração fixa)' },
  { value: '__continuous', label: 'uso contínuo' },
  { value: '__recheck', label: 'até reavaliação' },
  { value: '__finished', label: 'até terminar o medicamento' },
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

// ─── resolvers de duração ─────────────────────────────────────────────────────

/** Lê duration_unit e converte para o value do select (inclui modos especiais) */
function resolveDurationSelectValue(formula: ManipuladoV1Formula): string {
  const label = formula.prescribing.duration_label?.trim().toLowerCase()
  if (label === 'dose única' || label === 'dose unica') return '__single'
  if (label === 'uso contínuo' || label === 'uso continuo') return '__continuous'
  if (label === 'até reavaliação' || label === 'ate reavaliacao') return '__recheck'
  if (label === 'até terminar o medicamento') return '__finished'
  return formula.prescribing.duration_unit || 'dias'
}

function handleDurationUnitChange(
  current: ManipuladoV1Formula,
  selected: string,
): Partial<ManipuladoV1Formula['prescribing']> {
  if (selected === '__single') return { duration_unit: 'dose', duration_value: 1, duration_label: 'dose única' }
  if (selected === '__continuous') return { duration_unit: 'dias', duration_value: null, duration_label: 'uso contínuo' }
  if (selected === '__recheck') return { duration_unit: 'dias', duration_value: null, duration_label: 'até reavaliação' }
  if (selected === '__finished') return { duration_unit: 'dias', duration_value: null, duration_label: 'até terminar o medicamento' }
  return { duration_unit: selected, duration_label: current.prescribing.duration_label }
}

function isSpecialDurationMode(formula: ManipuladoV1Formula): boolean {
  const v = resolveDurationSelectValue(formula)
  return v.startsWith('__')
}

// ─── helper ingrediente ───────────────────────────────────────────────────────

function updateIngredient(value: ManipuladoV1Formula, id: string, patch: Partial<ManipuladoV1Formula['ingredients'][number]>): ManipuladoV1Formula {
  return normalizeManipuladoV1({
    ...value,
    ingredients: value.ingredients.map((ingredient) => ingredient.id === id ? { ...ingredient, ...patch } : ingredient),
  })
}

// ─── componente ──────────────────────────────────────────────────────────────

export function ManipuladosV1Editor({
  value,
  onChange,
  onSave,
  onDelete,
  saving,
}: {
  value: ManipuladoV1Formula
  onChange: (next: ManipuladoV1Formula) => void
  onSave: () => void
  onDelete?: () => void
  saving?: boolean
}) {
  const [quickText, setQuickText] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const current = normalizeManipuladoV1(value)
  const previewUsage = current.prescribing.manual_usage_override || buildGeneratedUsageText(current)
  const recommendations = useMemo(() => renderManipuladoV1Recommendations(current), [current])
  const durationSelectValue = resolveDurationSelectValue(current)
  const isDoseByWeight = current.prescribing.posology_mode === 'mg_per_kg_dose' || current.prescribing.posology_mode === 'mg_per_m2_dose'

  const setFormula = (patch: Partial<ManipuladoV1Formula>) => onChange(normalizeManipuladoV1({ ...current, ...patch }))

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
            <RxvButton variant="secondary" onClick={() => onChange(parseManipuladoV1FromText(quickText, current.identity.clinic_id))}>Importar texto</RxvButton>
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
          <RxvField label="Modo posológico" className="xl:col-span-4">
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
          </RxvField>

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
            <RxvSelect value={current.prescribing.dose_unit} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, dose_unit: e.target.value } })} options={DOSE_UNIT_OPTIONS} />
          </RxvField>

          {/* Frequência */}
          <RxvField label="Frequência" className="xl:col-span-4">
            <RxvSelect
              value={current.prescribing.frequency_mode}
              onChange={(e) => {
                const mode = e.target.value
                const label = autoFrequencyLabel(mode)
                setFormula({ prescribing: { ...current.prescribing, frequency_mode: mode as any, frequency_label: label || current.prescribing.frequency_label } })
              }}
              options={FREQUENCY_MODE_OPTIONS}
            />
          </RxvField>
          <RxvField label="Texto da frequência" className="xl:col-span-4">
            <RxvInput value={current.prescribing.frequency_label} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, frequency_label: e.target.value } })} placeholder="Ex.: a cada 12 horas" />
            <FieldHint>Preenchido automaticamente ao trocar a frequência. Edite se precisar de texto personalizado.</FieldHint>
          </RxvField>

          {/* Duração */}
          <RxvField label="Duração (valor)" className="xl:col-span-2">
            <RxvInput
              value={isSpecialDurationMode(current) ? '' : (current.prescribing.duration_value ?? '')}
              onChange={(e) => setFormula({ prescribing: { ...current.prescribing, duration_value: e.target.value ? Number(String(e.target.value).replace(',', '.')) : null } })}
              disabled={isSpecialDurationMode(current)}
              placeholder="Ex.: 14"
            />
          </RxvField>
          <RxvField label="Período de uso" className="xl:col-span-3">
            <RxvSelect
              value={durationSelectValue}
              onChange={(e) => {
                const patch = handleDurationUnitChange(current, e.target.value)
                setFormula({ prescribing: { ...current.prescribing, ...patch } })
              }}
              options={DURATION_UNIT_OPTIONS}
            />
            <FieldHint>Ao selecionar "dose única", "uso contínuo" etc., o campo de valor é ocultado automaticamente.</FieldHint>
          </RxvField>
          <RxvField label="Texto do período" className="xl:col-span-3">
            <RxvInput value={current.prescribing.duration_label} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, duration_label: e.target.value } })} placeholder="Ex.: 14 dias / até reavaliação" />
          </RxvField>

          {/* Observação clínica */}
          <RxvField label="Recomendações ao tutor" className="xl:col-span-12">
            <RxvTextarea value={current.prescribing.clinical_note} onChange={(e) => setFormula({ prescribing: { ...current.prescribing, clinical_note: e.target.value } })} rows={3} placeholder="Uma recomendação por linha. Aparecerão como itens no PDF." />
            <FieldHint>Ex.: Agitar antes de usar. / Conservar sob refrigeração. / Utilizar seringa dosadora.</FieldHint>
          </RxvField>

          {/* Texto gerado */}
          <div className="xl:col-span-12">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">Texto clínico gerado automaticamente</p>
            <div className="rounded-xl border border-[#39ff14]/18 bg-black/20 px-4 py-3 text-sm text-slate-200">{previewUsage}</div>
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
          <RxvField label="Q.S.P." className="xl:col-span-4">
            <RxvInput value={current.pharmacy.qsp_text} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, qsp_text: e.target.value } })} placeholder="Ex.: 60 g, 30 unidades, 10 mL" />
            <FieldHint>Quantidade suficiente para (q.s.p.) — alvo final da formulação. Aparece no texto "Favor manipular...".</FieldHint>
          </RxvField>
          <RxvField label="Apresentação final" className="xl:col-span-4">
            <RxvInput value={current.pharmacy.total_quantity} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, total_quantity: e.target.value } })} placeholder="Ex.: 60 g (pasta), 30 cápsulas" />
            <FieldHint>Resumo para o card do catálogo e cabeçalho da receita.</FieldHint>
          </RxvField>
          <RxvField label="Unidade final" className="xl:col-span-4">
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
          <RxvField label="Base / veículo / excipiente" className="xl:col-span-4">
            <RxvInput value={current.pharmacy.base_text} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, base_text: e.target.value } })} placeholder="Ex.: pasta oral palatável, gel transdérmico adequado" />
            <FieldHint>Material de base ou veículo que complementa o ativo. Aparece no texto de manipulação.</FieldHint>
          </RxvField>
          <RxvField label="Instrução para a farmácia" className="xl:col-span-8">
            <RxvTextarea value={current.pharmacy.compounding_instructions} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, compounding_instructions: e.target.value } })} rows={3} placeholder="Observações técnicas para o farmacêutico. Ex.: misturar em câmara de fluxo laminar." />
          </RxvField>
          <RxvField label="Nota técnica da farmácia" className="xl:col-span-4">
            <RxvTextarea value={current.pharmacy.pharmaceutic_note} onChange={(e) => setFormula({ pharmacy: { ...current.pharmacy, pharmaceutic_note: e.target.value } })} rows={3} placeholder="Nota farmacotécnica interna (opcional)." />
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
                    <RxvField label="Unidade" className="xl:col-span-1">
                      <RxvInput value={ingredient.unit} onChange={(e) => onChange(updateIngredient(current, ingredient.id, { unit: e.target.value }))} />
                    </RxvField>
                  </>
                ) : (
                  <>
                    <RxvField label="Quantidade" className="xl:col-span-2">
                      <RxvInput value={ingredient.quantity ?? ''} onChange={(e) => onChange(updateIngredient(current, ingredient.id, { quantity: e.target.value ? Number(String(e.target.value).replace(',', '.')) : null }))} />
                    </RxvField>
                    <RxvField label="Unidade" className="xl:col-span-1">
                      <RxvInput value={ingredient.unit} onChange={(e) => onChange(updateIngredient(current, ingredient.id, { unit: e.target.value }))} />
                    </RxvField>
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
        </div>
      </RxvCard>

      {/* ── Bloco 4 — Preview ── */}
      <RxvCard className="p-6">
        <RxvSectionHeader icon="preview" title="Bloco 4 • Preview final" subtitle="Exatamente o que vai para a receita impressa." />
        <div className="space-y-4 rounded-2xl border border-[#39ff14]/18 bg-black/20 p-5 text-sm text-slate-200">
          <p className="font-semibold text-white">
            <span>{getManipuladoV1PrintLineLeft(current)}</span>
            <span className="mx-2 text-slate-600">{'......................................................................................'}</span>
            <span>{getManipuladoV1PrintLineRight(current)}</span>
          </p>
          <p className="leading-7">{renderManipuladoV1TutorInstruction(current)}</p>
          <p className="text-[11px] leading-6 text-slate-400">{renderManipuladoV1PharmacyInstruction(current)}</p>
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
        <RxvButton variant="primary" onClick={onSave} loading={!!saving}>Salvar fórmula</RxvButton>
      </div>
    </div>
  )
}

export default ManipuladosV1Editor
