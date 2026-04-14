import React, { useState, useEffect, useMemo } from 'react'
import { Antibiotic, Species, ComorbidityState } from '../types'
import { pkpdForClass, subclassFor, getComorbidityWarnings } from '../utils/pkpdUtils'
import { CLASS_STYLE } from '../constants'
import Modal from './Modal'
import type { DiseaseRef } from '../utils/legacyDiseaseDrugIndex'

interface DrugCardProps {
  drug: Antibiotic
  cls: string
  highlight?: boolean
  linkedDiseases?: DiseaseRef[]
  onOpenLegacyDisease?: (diseaseName: string) => void
}

const comorbLabels: { [key in keyof ComorbidityState]: string } = {
  renal: 'Renal',
  hepatic: 'Hepática',
  septic: 'Séptica',
  cardiac: 'Cardíaca',
  neurological: 'Neurológica',
}

const inputClass =
  'w-full rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 abv-input'

const InfoRow: React.FC<{ label: string; text?: string; children?: React.ReactNode }> = ({ label, text, children }) => {
  if (!text && !children) return null
  return (
    <div className="text-sm">
      <p className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
        {label}
      </p>
      <div className="leading-normal" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {text || children}
      </div>
    </div>
  )
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h4
    className="mb-2 mt-4 border-b pb-1 text-base font-semibold"
    style={{ color: 'hsl(var(--foreground))', borderColor: 'hsl(var(--border))' }}
  >
    {title}
  </h4>
)

const parseDose = (t: string) => {
  const s = String(t || '')
    .replace(/[≤≥~≈≃]/g, '')
    .replace(/,/, '.')
  const r = s.match(/(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)\s*mg\s*\/\s*kg/i)
  if (r) return { min: +r[1], max: +r[2] }
  const m = s.match(/(\d+(?:\.\d+)?)\s*mg\s*\/\s*kg/i)
  if (m) return { min: +m[1], max: +m[1] }
  return { min: NaN, max: NaN }
}

const DrugCard: React.FC<DrugCardProps> = ({
  drug,
  cls,
  highlight = false,
  linkedDiseases = [],
  onOpenLegacyDisease,
}) => {
  const pk = pkpdForClass(cls)
  const sub = subclassFor(drug.name, cls)
  const st = CLASS_STYLE[sub] || CLASS_STYLE.penicilina

  const [species, setSpecies] = useState<Species>('Cão')
  const [kg, setKg] = useState(10)
  const [conc, setConc] = useState(50)
  const [form, setForm] = useState('Líquido (mg/mL)')
  const [comorbidities, setComorbidities] = useState<ComorbidityState>({
    renal: false,
    hepatic: false,
    septic: false,
    cardiac: false,
    neurological: false,
  })
  const [modalInfo, setModalInfo] = useState<{ title: string; content: string } | null>(null)

  const baseDog = useMemo(() => parseDose(drug.dose_dog), [drug.dose_dog])
  const baseCat = useMemo(() => parseDose(drug.dose_cat), [drug.dose_cat])

  const [mgkg, setMgkg] = useState(Number.isFinite(baseDog.min) ? baseDog.min : 10)

  useEffect(() => {
    const baseDose = species === 'Cão' ? baseDog : baseCat
    setMgkg(Number.isFinite(baseDose.min) ? baseDose.min : 10)
  }, [species, baseDog, baseCat])

  const roundTabs = (x: number) => Math.round(x * 4) / 4
  const roundVol = (x: number) => Math.round(x * 100) / 100

  const loading = comorbidities.septic && pk.hydro === 'hidrofílico' ? 1.25 : 1
  const b = species === 'Cão' ? baseDog : baseCat
  const calcEnabled = Number.isFinite(b.min)
  const totalMg = calcEnabled ? kg * mgkg * loading : NaN
  const vol = calcEnabled && form.startsWith('Líquido') ? totalMg / Math.max(conc, 1) : NaN
  const tabs = calcEnabled && form.startsWith('Comprimido') ? totalMg / Math.max(conc, 1) : NaN

  const doseHint =
    species === 'Cão'
      ? Number.isFinite(baseDog.min)
        ? `${baseDog.min}${baseDog.max !== baseDog.min ? '–' + baseDog.max : ''}`
        : '—'
      : Number.isFinite(baseCat.min)
        ? `${baseCat.min}${baseCat.max !== baseCat.min ? '–' + baseCat.max : ''}`
        : '—'

  const comorbWarnings = getComorbidityWarnings(sub, comorbidities)

  const statBoxStyle = {
    borderColor: 'hsl(var(--border))',
    background: 'color-mix(in srgb, hsl(var(--muted)) 35%, hsl(var(--card)))',
    color: 'hsl(var(--foreground))',
  } as const

  return (
    <div
      className="flex h-full flex-col rounded-xl border p-4 shadow-sm"
      style={{
        background: st.bg,
        borderColor: st.border,
        boxShadow: highlight
          ? '0 0 0 3px color-mix(in srgb, hsl(var(--ring)) 65%, transparent)'
          : '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }}
    >
      <div className="mb-1 flex items-center gap-3">
        <span className="text-2xl" title={cls}>
          {st.emoji}
        </span>
        <div>
          <h3 className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
            {drug.name}
          </h3>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Classe: {cls} · PK/PD: <b>{pk.pd}</b> · Perfil: <b>{pk.hydro}</b> · Elim.: <b>{pk.elim}</b>
          </p>
        </div>
      </div>

      <div className="grid gap-x-4 md:grid-cols-2">
        <div>
          <SectionHeader title="Mecanismo de Ação" />
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {drug.mechanism || pk.moa}
          </p>
        </div>
        <div>
          <SectionHeader title="Indicações Comuns" />
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {drug.indications}
          </p>
        </div>
      </div>

      {linkedDiseases.length > 0 && onOpenLegacyDisease && (
        <div className="mt-2">
          <SectionHeader title="No guia por doença (catálogo clássico)" />
          <p className="mb-2 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Abre a condição no fluxo por suspeita, com 1ª linha e alternativas.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {linkedDiseases.slice(0, 12).map((r) => (
              <button
                key={`${r.system}-${r.name}`}
                type="button"
                className="rounded-full border px-2.5 py-1 text-left text-[11px] font-medium transition hover:opacity-90"
                style={{
                  borderColor: 'color-mix(in srgb, hsl(var(--primary)) 35%, hsl(var(--border)))',
                  background: 'color-mix(in srgb, hsl(var(--primary)) 10%, hsl(var(--card)))',
                  color: 'hsl(var(--foreground))',
                }}
                title={r.system}
                onClick={() => onOpenLegacyDisease(r.name)}
              >
                {r.name}
              </button>
            ))}
            {linkedDiseases.length > 12 && (
              <span className="self-center text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                +{linkedDiseases.length - 12} outras
              </span>
            )}
          </div>
        </div>
      )}

      <SectionHeader title="Espectro de Ação" />
      <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {drug.spectrum}
      </p>

      <SectionHeader title="Dosagem Padrão" />
      <div className="mt-1 grid gap-x-4 text-sm md:grid-cols-2">
        <div>
          <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Cão:
          </span>{' '}
          <span style={{ color: 'hsl(var(--muted-foreground))' }}>{drug.dose_dog || '—'}</span>
        </div>
        <div>
          <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Gato:
          </span>{' '}
          <span style={{ color: 'hsl(var(--muted-foreground))' }}>{drug.dose_cat || '—'}</span>
        </div>
      </div>

      <InfoRow label="Preparo e Administração" text={drug.prep_admin} />
      {drug.infusion && <InfoRow label="Infusão" text={drug.infusion} />}
      {drug.infusion_why && (
        <p
          className="mt-1 rounded-md border p-2 text-xs"
          style={{
            borderColor: 'color-mix(in srgb, var(--chart-2) 35%, hsl(var(--border)))',
            background: 'color-mix(in srgb, var(--chart-2) 12%, hsl(var(--card)))',
            color: 'hsl(var(--foreground))',
          }}
        >
          {drug.infusion_why}
        </p>
      )}

      {drug.cautions && (
        <div
          className="mt-3 rounded-md border p-2 text-sm"
          style={{
            borderColor: 'color-mix(in srgb, var(--chart-5) 35%, hsl(var(--border)))',
            background: 'color-mix(in srgb, var(--chart-5) 10%, hsl(var(--card)))',
            color: 'hsl(var(--foreground))',
          }}
        >
          <b>Cautelas:</b> {drug.cautions}
        </div>
      )}

      <div
        className="mt-4 flex flex-grow flex-col rounded-lg border p-3"
        style={{
          borderColor: 'hsl(var(--border))',
          background: 'color-mix(in srgb, hsl(var(--card)) 92%, hsl(var(--foreground)) 4%)',
        }}
      >
        <h4 className="mb-3 font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
          Calculadora de dose
        </h4>
        <fieldset disabled={!calcEnabled} className={!calcEnabled ? 'pointer-events-none opacity-50' : ''}>
          <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
            <div>
              <label className="mb-1 block font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                Espécie
              </label>
              <select value={species} onChange={(e) => setSpecies(e.target.value as Species)} className={inputClass}>
                <option>Cão</option>
                <option>Gato</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                Peso (kg)
              </label>
              <input
                type="number"
                value={kg}
                onChange={(e) => setKg(parseFloat(e.target.value || '0'))}
                step="0.1"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                Dose (mg/kg)
              </label>
              <input
                type="number"
                value={mgkg}
                onChange={(e) => setMgkg(parseFloat(e.target.value || '0'))}
                step="0.1"
                className={inputClass}
              />
              <p className="mt-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Sugestão: {doseHint}
              </p>
            </div>
            <div>
              <label className="mb-1 block font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                Forma
              </label>
              <select value={form} onChange={(e) => setForm(e.target.value)} className={`${inputClass} mb-1`}>
                <option>Líquido (mg/mL)</option>
                <option>Comprimido (mg)</option>
              </select>
              <input
                type="number"
                placeholder="Concentração"
                value={conc}
                onChange={(e) => setConc(parseFloat(e.target.value || '1'))}
                step="1"
                className={inputClass}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            {(Object.keys(comorbidities) as Array<keyof ComorbidityState>).map((k) => (
              <label key={k} className="inline-flex items-center gap-2 font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                <input
                  type="checkbox"
                  className="rounded shadow-sm"
                  style={{ accentColor: 'hsl(var(--primary))' }}
                  checked={comorbidities[k]}
                  onChange={(e) => setComorbidities({ ...comorbidities, [k]: e.target.checked })}
                />
                {comorbLabels[k]}
              </label>
            ))}
          </div>
          {comorbWarnings.length > 0 && (
            <div
              className="mt-3 space-y-1 rounded-md border p-2 text-sm"
              style={{
                borderColor: 'color-mix(in srgb, hsl(var(--destructive)) 40%, hsl(var(--border)))',
                background: 'color-mix(in srgb, hsl(var(--destructive)) 10%, hsl(var(--card)))',
                color: 'hsl(var(--foreground))',
              }}
            >
              <p className="font-bold">Alertas de comorbidade</p>
              <ul className="list-inside list-disc text-xs">
                {comorbWarnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}
        </fieldset>

        <div className="mt-4 grid grid-cols-1 gap-3 text-center md:grid-cols-3">
          <div className="rounded-lg border p-2" style={statBoxStyle}>
            <div className="text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Dose total
            </div>
            <div className="text-lg font-bold">{Number.isFinite(totalMg) ? totalMg.toFixed(2) : '—'} mg</div>
          </div>
          <div
            className="rounded-lg border p-2"
            style={{ borderColor: 'hsl(var(--border))', background: 'color-mix(in srgb, hsl(var(--primary)) 10%, hsl(var(--card)))' }}
          >
            <div className="text-xs font-medium" style={{ color: 'hsl(var(--foreground))' }}>
              {form.startsWith('Líquido') ? 'Volume/dose' : 'Comprimidos/dose'}
            </div>
            <div className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              {form.startsWith('Líquido')
                ? Number.isFinite(vol)
                  ? `${roundVol(vol).toFixed(2)} mL`
                  : '—'
                : Number.isFinite(tabs)
                  ? `${roundTabs(tabs).toFixed(2)} un`
                  : '—'}
            </div>
          </div>
          <div className="rounded-lg border p-2" style={statBoxStyle}>
            <div className="text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Ajuste séptico
            </div>
            <div className="text-lg font-bold">
              {comorbidities.septic && pk.hydro === 'hidrofílico' ? '×1,25 aplicado' : 'N/A'}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-2 text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Fontes base: Plumb&apos;s, BSAVA, Nelson &amp; Couto.
      </div>
      <Modal open={!!modalInfo} title={modalInfo?.title || 'Informação'} onClose={() => setModalInfo(null)}>
        {modalInfo?.content}
      </Modal>
    </div>
  )
}

export default DrugCard
