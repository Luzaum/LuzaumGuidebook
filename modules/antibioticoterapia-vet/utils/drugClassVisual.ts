import { CLASS_STYLE } from '../constants'
import type { AntibioticClass, ClassStyle } from '../types'
import { subclassFor } from './pkpdUtils'
import { canonicalDrugName } from './textUtils'

/** Cor de cartão alinhada ao `CLASS_STYLE` do guia de antimicrobianos (subclasse PK/PD). */
export function getClassStyleForLegacyDrug(name: string, abDict: AntibioticClass): ClassStyle {
  const wanted = canonicalDrugName(name)
  for (const className of Object.keys(abDict || {})) {
    const drug = (abDict[className] || []).find((d) => canonicalDrugName(d.name) === wanted)
    if (drug) {
      const sub = subclassFor(drug.name, className)
      return CLASS_STYLE[sub] || CLASS_STYLE.penicilina
    }
  }
  return CLASS_STYLE.penicilina
}

/** Primeira cor encontrada ao partir nomes compostos ("A + B"). */
export function getClassStyleForDrugLine(name: string, abDict: AntibioticClass): ClassStyle {
  const parts = name
    .split(/\s*\+\s*|\s+seguido de\s+/i)
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length <= 1) return getClassStyleForLegacyDrug(name, abDict)
  return getClassStyleForLegacyDrug(parts[0], abDict)
}
