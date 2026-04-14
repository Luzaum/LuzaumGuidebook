import React from 'react'
import { AntibioticClass, ComorbidityState } from '../types'
import { canonicalDrugName } from '../utils/textUtils'
import { pkpdForClass, subclassFor, getComorbidityWarnings } from '../utils/pkpdUtils'
import { CLASS_STYLE } from '../constants'
import Icon from './Icon'

const DrugItem: React.FC<{
  name: string
  abDict: AntibioticClass
  onSeeGuide: (drugName: string) => void
  comorbidities: ComorbidityState
}> = ({ name, abDict, onSeeGuide, comorbidities }) => {
  const wantedFullName = canonicalDrugName(name)
  let foundDrug = null
  let foundClass = null

  for (const k of Object.keys(abDict || {})) {
    const drug = (abDict[k] || []).find((d) => canonicalDrugName(d.name) === wantedFullName)
    if (drug) {
      foundDrug = drug
      foundClass = k
      break
    }
  }

  if (!foundDrug || !foundClass) {
    return (
      <div className="mt-2 p-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        (Sem dados da ficha de antibiótico para: {name})
      </div>
    )
  }

  const pk = pkpdForClass(foundClass)
  const sub = subclassFor(foundDrug.name, foundClass)
  const st = CLASS_STYLE[sub] || CLASS_STYLE.penicilina
  const warnings = getComorbidityWarnings(sub, comorbidities)

  return (
    <div className="mt-2 rounded-lg border p-3 text-sm shadow-sm" style={{ background: st.bg, borderColor: st.border }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-base font-bold" style={{ color: 'hsl(var(--foreground))' }}>
            {foundDrug.name}
          </div>
          <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Classe: {foundClass} · PK/PD: {pk.pd} · Eliminação: {pk.elim}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onSeeGuide(foundDrug!.name)}
          className="ml-2 inline-flex flex-shrink-0 items-center gap-1 text-xs underline-offset-2 hover:underline"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <Icon name="open" className="h-4 w-4" /> Guia
        </button>
      </div>

      <div className="mt-2 space-y-1 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        <div>
          <b style={{ color: 'hsl(var(--foreground))' }}>MOA:</b> {foundDrug.mechanism || pk.moa}
        </div>
        <div>
          <b style={{ color: 'hsl(var(--foreground))' }}>Espectro:</b> {foundDrug.spectrum || '—'}
        </div>
      </div>

      <div className="mt-2 grid gap-x-4 gap-y-1 text-xs md:grid-cols-2" style={{ color: 'hsl(var(--foreground))' }}>
        <div>
          <b>Dose cão:</b> {foundDrug.dose_dog || '—'}
        </div>
        <div>
          <b>Dose gato:</b> {foundDrug.dose_cat || '—'}
        </div>
      </div>

      {warnings.length > 0 && (
        <div
          className="mt-2 space-y-1 rounded-md border p-2 text-sm"
          style={{
            borderColor: 'color-mix(in srgb, hsl(var(--destructive)) 40%, hsl(var(--border)))',
            background: 'color-mix(in srgb, hsl(var(--destructive)) 10%, hsl(var(--card)))',
            color: 'hsl(var(--foreground))',
          }}
        >
          <div className="font-bold">Alertas de comorbidade</div>
          <ul className="list-inside list-disc text-xs">
            {warnings.map((warn, i) => (
              <li key={i}>{warn}</li>
            ))}
          </ul>
        </div>
      )}
      {foundDrug.cautions && (
        <div
          className="mt-2 rounded-md border p-2 text-sm"
          style={{
            borderColor: 'color-mix(in srgb, var(--chart-5) 35%, hsl(var(--border)))',
            background: 'color-mix(in srgb, var(--chart-5) 10%, hsl(var(--card)))',
            color: 'hsl(var(--foreground))',
          }}
        >
          <b>Cautelas:</b> {foundDrug.cautions}
        </div>
      )}
    </div>
  )
}

const InlineDrugSummary: React.FC<{
  name: string
  abDict: AntibioticClass
  onSeeGuide: (drugName: string) => void
  comorbidities: ComorbidityState
}> = ({ name, abDict, onSeeGuide, comorbidities }) => {
  const canonicalFullName = canonicalDrugName(name)
  let drugExists = false
  for (const key in abDict) {
    if (abDict[key].some((d) => canonicalDrugName(d.name) === canonicalFullName)) {
      drugExists = true
      break
    }
  }

  if (drugExists) {
    return <DrugItem name={name} abDict={abDict} onSeeGuide={onSeeGuide} comorbidities={comorbidities} />
  }

  const separatorRegex = /\s*\+\s*|\s+seguido de\s+/i
  const parts = name
    .split(separatorRegex)
    .map((p) => p.trim())
    .filter(Boolean)

  if (parts.length <= 1) {
    return <DrugItem name={name} abDict={abDict} onSeeGuide={onSeeGuide} comorbidities={comorbidities} />
  }

  return (
    <div className="space-y-2">
      {parts.map((partName, index) => (
        <DrugItem key={`${partName}-${index}`} name={partName} abDict={abDict} onSeeGuide={onSeeGuide} comorbidities={comorbidities} />
      ))}
    </div>
  )
}

export default InlineDrugSummary
