/**
 * Loader para biblioteca de diferenciais em JSON
 * Carrega diferenciais estruturados por eixo neurológico
 */

import type { Differential, NeuroAxis } from '../../types/analysis'
import vestibularPerifericoData from './vestibular_periferico.json'
import vestibularCentralData from './vestibular_central.json'
import cerebeloData from './cerebelo.json'
import medulaT3L3Data from './medula_t3_l3.json'
import medulaL4S3Data from './medula_l4_s3.json'
import caudaEquinaData from './cauda_equina.json'
import neuromuscularData from './neuromuscular.json'
import multifocalOuDifusaData from './multifocal_ou_difusa.json'

type DifferentialJSON = {
  name: string
  category: Differential['category']
  rules: {
    course: string[]
    ageStages: string[]
    species: string[]
    redFlagsBoost: string[]
    comorbidityCautions: string[]
  }
  whyTemplates: string[]
  diagnostics: Array<{
    test: string
    priority: 'ALTA' | 'MEDIA' | 'BAIXA'
    whatItAssesses: string
    expectedFindings: string
    limitations: string
  }>
  treatment: {
    '0-6H': {
      plan: string[]
      cautions: string[]
    }
    DEFINITIVO: {
      plan: string[]
      cautions: string[]
    }
  }
}

type LoadedDifferential = {
  name: string
  category: Differential['category']
  rules: DifferentialJSON['rules']
  whyTemplates: string[]
  diagnostics: DifferentialJSON['diagnostics']
  treatment: Array<{
    phase: '0-6H' | 'DEFINITIVO'
    plan: string[]
    cautions: string[]
  }>
  compatibleAxes: NeuroAxis[]
}

// Mapeamento de arquivos JSON para eixos neurológicos
const DIFFERENTIAL_LIBRARY: Record<string, LoadedDifferential[]> = {
  VESTIBULAR_PERIFERICO: (vestibularPerifericoData as DifferentialJSON[]).map((dx) => ({
    name: dx.name,
    category: dx.category,
    rules: dx.rules,
    whyTemplates: dx.whyTemplates,
    diagnostics: dx.diagnostics,
    treatment: [
      { phase: '0-6H' as const, plan: dx.treatment['0-6H'].plan, cautions: dx.treatment['0-6H'].cautions },
      {
        phase: 'DEFINITIVO' as const,
        plan: dx.treatment.DEFINITIVO.plan,
        cautions: dx.treatment.DEFINITIVO.cautions,
      },
    ],
    compatibleAxes: ['VESTIBULAR_PERIFERICO'] as NeuroAxis[],
  })),

  VESTIBULAR_CENTRAL: (vestibularCentralData as DifferentialJSON[]).map((dx) => ({
    name: dx.name,
    category: dx.category,
    rules: dx.rules,
    whyTemplates: dx.whyTemplates,
    diagnostics: dx.diagnostics,
    treatment: [
      { phase: '0-6H' as const, plan: dx.treatment['0-6H'].plan, cautions: dx.treatment['0-6H'].cautions },
      {
        phase: 'DEFINITIVO' as const,
        plan: dx.treatment.DEFINITIVO.plan,
        cautions: dx.treatment.DEFINITIVO.cautions,
      },
    ],
    compatibleAxes: ['VESTIBULAR_CENTRAL'] as NeuroAxis[],
  })),

  CEREBELO: (cerebeloData as DifferentialJSON[]).map((dx) => ({
    name: dx.name,
    category: dx.category,
    rules: dx.rules,
    whyTemplates: dx.whyTemplates,
    diagnostics: dx.diagnostics,
    treatment: [
      { phase: '0-6H' as const, plan: dx.treatment['0-6H'].plan, cautions: dx.treatment['0-6H'].cautions },
      {
        phase: 'DEFINITIVO' as const,
        plan: dx.treatment.DEFINITIVO.plan,
        cautions: dx.treatment.DEFINITIVO.cautions,
      },
    ],
    compatibleAxes: ['CEREBELO'] as NeuroAxis[],
  })),

  MEDULA_T3_L3: (medulaT3L3Data as DifferentialJSON[]).map((dx) => ({
    name: dx.name,
    category: dx.category,
    rules: dx.rules,
    whyTemplates: dx.whyTemplates,
    diagnostics: dx.diagnostics,
    treatment: [
      { phase: '0-6H' as const, plan: dx.treatment['0-6H'].plan, cautions: dx.treatment['0-6H'].cautions },
      {
        phase: 'DEFINITIVO' as const,
        plan: dx.treatment.DEFINITIVO.plan,
        cautions: dx.treatment.DEFINITIVO.cautions,
      },
    ],
    compatibleAxes: ['MEDULA_T3_L3'] as NeuroAxis[],
  })),

  MEDULA_L4_S3: (medulaL4S3Data as DifferentialJSON[]).map((dx) => ({
    name: dx.name,
    category: dx.category,
    rules: dx.rules,
    whyTemplates: dx.whyTemplates,
    diagnostics: dx.diagnostics,
    treatment: [
      { phase: '0-6H' as const, plan: dx.treatment['0-6H'].plan, cautions: dx.treatment['0-6H'].cautions },
      {
        phase: 'DEFINITIVO' as const,
        plan: dx.treatment.DEFINITIVO.plan,
        cautions: dx.treatment.DEFINITIVO.cautions,
      },
    ],
    compatibleAxes: ['MEDULA_L4_S3'] as NeuroAxis[],
  })),

  CAUDA_EQUINA: (caudaEquinaData as DifferentialJSON[]).map((dx) => ({
    name: dx.name,
    category: dx.category,
    rules: dx.rules,
    whyTemplates: dx.whyTemplates,
    diagnostics: dx.diagnostics,
    treatment: [
      { phase: '0-6H' as const, plan: dx.treatment['0-6H'].plan, cautions: dx.treatment['0-6H'].cautions },
      {
        phase: 'DEFINITIVO' as const,
        plan: dx.treatment.DEFINITIVO.plan,
        cautions: dx.treatment.DEFINITIVO.cautions,
      },
    ],
    compatibleAxes: ['CAUDA_EQUINA'] as NeuroAxis[],
  })),

  NEUROMUSCULAR: (neuromuscularData as DifferentialJSON[]).map((dx) => ({
    name: dx.name,
    category: dx.category,
    rules: dx.rules,
    whyTemplates: dx.whyTemplates,
    diagnostics: dx.diagnostics,
    treatment: [
      { phase: '0-6H' as const, plan: dx.treatment['0-6H'].plan, cautions: dx.treatment['0-6H'].cautions },
      {
        phase: 'DEFINITIVO' as const,
        plan: dx.treatment.DEFINITIVO.plan,
        cautions: dx.treatment.DEFINITIVO.cautions,
      },
    ],
    compatibleAxes: ['NEUROMUSCULAR'] as NeuroAxis[],
  })),

  MULTIFOCAL_OU_DIFUSA: (multifocalOuDifusaData as DifferentialJSON[]).map((dx) => ({
    name: dx.name,
    category: dx.category,
    rules: dx.rules,
    whyTemplates: dx.whyTemplates,
    diagnostics: dx.diagnostics,
    treatment: [
      { phase: '0-6H' as const, plan: dx.treatment['0-6H'].plan, cautions: dx.treatment['0-6H'].cautions },
      {
        phase: 'DEFINITIVO' as const,
        plan: dx.treatment.DEFINITIVO.plan,
        cautions: dx.treatment.DEFINITIVO.cautions,
      },
    ],
    compatibleAxes: ['MULTIFOCAL_OU_DIFUSA'] as NeuroAxis[],
  })),
}

/**
 * Obtém diferenciais da biblioteca JSON para um eixo específico
 */
export function getDifferentialsFromLibrary(axis: NeuroAxis): LoadedDifferential[] {
  return DIFFERENTIAL_LIBRARY[axis] || []
}

/**
 * Verifica se um eixo tem biblioteca JSON disponível
 */
export function hasLibraryForAxis(axis: NeuroAxis): boolean {
  return axis in DIFFERENTIAL_LIBRARY
}

/**
 * Converte LoadedDifferential para Differential (formato usado pelo sistema)
 */
export function convertToDifferential(
  loaded: LoadedDifferential,
  patient: { species: string | null; lifeStage: string | null; comorbidities: string[] },
  history: {
    temporalPattern: string | null
    evolutionPattern: string | null
    trauma: boolean
    redFlags: string[]
  },
): Differential {
  // Escolher um template "why" aleatoriamente (ou o primeiro)
  const why = [loaded.whyTemplates[0] || `Suspeita de ${loaded.name} baseada em neurolocalização e achados clínicos.`]

  // Adicionar justificativas adicionais baseadas em regras
  if (history.temporalPattern && loaded.rules.course.includes(history.temporalPattern.toUpperCase())) {
    why.push(`Curso temporal (${history.temporalPattern}) compatível.`)
  }

  if (patient.species && loaded.rules.species.includes(patient.species.toUpperCase().substring(0, 3).toUpperCase())) {
    why.push(`Espécie (${patient.species === 'dog' ? 'cão' : 'gato'}) compatível.`)
  }

  if (patient.lifeStage && loaded.rules.ageStages.includes(patient.lifeStage.toUpperCase())) {
    why.push(`Idade (${patient.lifeStage}) compatível.`)
  }

  // Adicionar cautelas por comorbidades
  const relevantCautions = loaded.rules.comorbidityCautions.filter((c) => {
    const comorbIds = Array.isArray(patient.comorbidities) 
      ? (typeof patient.comorbidities[0] === 'string'
          ? patient.comorbidities as string[]
          : patient.comorbidities.map((item: any) => item.key || item))
      : []
    return comorbIds.includes(c.toLowerCase())
  })

  // Gerar ID único baseado no nome
  const ddxId = loaded.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/\s+/g, '_').replace(/_+/g, '_')

  return {
    id: ddxId,
    name: loaded.name,
    category: loaded.category,
    likelihood: 0, // Será calculado pelo sistema de scoring
    why,
    diagnostics: loaded.diagnostics.map((d) => ({
      test: d.test,
      priority: d.priority,
      whatItAdds: d.whatItAssesses,
      expectedFindings: d.expectedFindings,
      limitations: d.limitations,
    })),
    treatment: loaded.treatment,
  }
}

/**
 * Lista todos os eixos que têm biblioteca JSON disponível
 */
export function getAvailableAxes(): NeuroAxis[] {
  return Object.keys(DIFFERENTIAL_LIBRARY) as NeuroAxis[]
}
