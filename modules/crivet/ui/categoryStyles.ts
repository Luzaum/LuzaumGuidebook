import type { DrugCategory as OldDrugCategory } from '../data/drugs'

export type DrugCategory =
  | 'anestesico'
  | 'vasopressor'
  | 'antibiotico'
  | 'infusao_combinada'
  | 'endocrino'
  | 'antiemetico'

export const CATEGORY_STYLES: Record<DrugCategory, { label: string; className: string }> = {
  anestesico: {
    label: 'Anestésico',
    className: 'border-lime-400/40 bg-lime-500/15 text-lime-300',
  },
  vasopressor: {
    label: 'Vasopressor',
    className: 'border-red-400/40 bg-red-500/15 text-red-200',
  },
  antibiotico: {
    label: 'Antibiótico',
    className: 'border-orange-400/40 bg-orange-500/15 text-orange-200',
  },
  infusao_combinada: {
    label: 'Infusão combinada',
    className: 'border-purple-400/40 bg-purple-500/15 text-purple-200',
  },
  endocrino: {
    label: 'Endócrino',
    className: 'border-yellow-400/40 bg-yellow-500/15 text-yellow-200',
  },
  antiemetico: {
    label: 'Antiemético',
    className: 'border-slate-400/40 bg-slate-500/15 text-slate-200',
  },
}

// Mapear categorias antigas para novas
export function mapCategoryToStyle(category: OldDrugCategory): DrugCategory {
  if (category === 'Analgésicos e Anestésicos') return 'anestesico'
  if (category === 'Agentes Cardiovasculares') return 'vasopressor'
  if (category === 'Antimicrobianos') return 'antibiotico'
  if (category === 'Infusões Combinadas') return 'infusao_combinada'
  if (category === 'Endócrino') return 'endocrino'
  if (category === 'Antieméticos / Pró-cinéticos') return 'antiemetico'
  return 'anestesico' // default
}
