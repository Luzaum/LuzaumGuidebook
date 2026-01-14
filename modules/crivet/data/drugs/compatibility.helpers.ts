import type { DrugCompatibility, CompatibilityItem } from '../../types/drug'
import { ketamineCompatibility } from './ketamine.compat'
import { midazolamCompatibility } from './midazolam.compat'
import { fentanylCompatibility } from './fentanyl.compat'
import { remifentanilCompatibility } from './remifentanil.compat'

// Helper para converter ketamineCompatibility para DrugCompatibility
export function ketamineCompatibilityToDrugCompatibility(): DrugCompatibility {
  return {
    compatibleDiluent: ketamineCompatibility.compatibleDiluent || [],
    compatibleMeds: ketamineCompatibility.cocktailOftenUsed || [],
    incompatibilities: ketamineCompatibility.physicalIncompatibilities?.map((item) => ({
      name: item.drug,
      severity: item.severity as 'critical' | 'warning' | 'info',
      message: item.why,
    })) as CompatibilityItem[],
  }
}

// Helper para converter midazolamCompatibility para DrugCompatibility
export function midazolamCompatibilityToDrugCompatibility(): DrugCompatibility {
  return {
    compatibleDiluent: midazolamCompatibility.compatibleDiluent || [],
    compatibleMeds: midazolamCompatibility.compatibleMedsSameSyringeOrBag || [],
    incompatibilities: midazolamCompatibility.cautions?.map((caution) => ({
      name: 'Atenção',
      severity: 'warning' as const,
      message: caution,
    })) as CompatibilityItem[],
  }
}

// Helper para converter fentanylCompatibility para DrugCompatibility
export function fentanylCompatibilityToDrugCompatibility(): DrugCompatibility {
  const materialWarnings: string[] = []
  if (fentanylCompatibility.materialWarning) {
    materialWarnings.push(fentanylCompatibility.materialWarning)
  }
  if (fentanylCompatibility.practicalWarnings) {
    materialWarnings.push(...fentanylCompatibility.practicalWarnings)
  }

  return {
    diluents: [
      {
        diluentId: 'NaCl_09',
        label: 'NaCl 0,9%',
        status: 'compatible',
        reason: 'Estável e amplamente usado em infusão.',
      },
      {
        diluentId: 'RL',
        label: 'Ringer Lactato',
        status: 'compatible',
        reason: 'Compatível em uso clínico para infusão.',
      },
      {
        diluentId: 'D5W',
        label: 'Glicose 5%',
        status: 'compatible',
        reason: 'Compatível; atenção em diabéticos por conta do veículo.',
      },
    ],
    compatibleDiluent: fentanylCompatibility.compatibleDiluent || [], // DEPRECATED - manter para compatibilidade
    compatibleMeds: fentanylCompatibility.compatibleMeds || [],
    incompatibilities: fentanylCompatibility.incompatibilities?.map((item) => ({
      name: item.drug,
      severity: item.severity,
      message: item.why,
    })) as CompatibilityItem[],
    materialWarnings,
  }
}

// Helper para converter remifentanilCompatibility para DrugCompatibility
export function remifentanilCompatibilityToDrugCompatibility(): DrugCompatibility {
  return {
    compatibleDiluent: remifentanilCompatibility.compatibleDiluent || [],
    compatibleMeds: remifentanilCompatibility.compatibleMeds || [],
    incompatibilities: [
      ...(remifentanilCompatibility.incompatibilities?.map((item) => ({
        name: item.drug,
        severity: item.severity,
        message: item.why,
      })) as CompatibilityItem[] || []),
      ...(remifentanilCompatibility.cautions?.map((caution) => ({
        name: 'Atenção',
        severity: 'warning' as const,
        message: caution,
      })) as CompatibilityItem[] || []),
    ],
  }
}

// Compatibility padrão (quando não há dados)
export const defaultCompatibility: DrugCompatibility = {
  diluents: [
    {
      diluentId: 'NaCl_09',
      label: 'NaCl 0,9%',
      status: 'unknown',
      reason: 'Dados de compatibilidade não disponíveis.',
    },
    {
      diluentId: 'RL',
      label: 'Ringer Lactato',
      status: 'unknown',
      reason: 'Dados de compatibilidade não disponíveis.',
    },
    {
      diluentId: 'D5W',
      label: 'Glicose 5%',
      status: 'unknown',
      reason: 'Dados de compatibilidade não disponíveis.',
    },
  ],
  compatibleDiluent: [],
  compatibleMeds: [],
  incompatibilities: [],
  materialWarnings: [],
}
