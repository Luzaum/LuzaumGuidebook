import { NeuroLocation } from './neuroLocalization'
import {
  PatientProfile,
  ClinicalHistory,
  NormalizedFindings,
} from '../../types/case'
import { getDifferentialDiagnoses } from '../differentials/differentialDiagnosisMap'

export interface DifferentialDiagnosis {
  name: string
  score: number
  justifications: string[]
  diagnostics: string[]
  treatment: string[]
}

export function generateDifferentials(
  location: NeuroLocation,
  patient: PatientProfile,
  history: ClinicalHistory,
  findings: NormalizedFindings,
): DifferentialDiagnosis[] {
  // Map location to string for differential map
  const locationKey = getLocationKey(location)

  // Get base differentials from map
  const baseDifferentials = getDifferentialDiagnoses(
    locationKey,
    patient.species,
    patient.ageYears ||
      (patient.ageRange === 'pediatric'
        ? 1
        : patient.ageRange === 'geriatric'
          ? 10
          : 5),
    history.course,
    findings.spinalPainPresent,
  )

  // Score and rank
  return baseDifferentials
    .map((dx) => {
      const justifications: string[] = []
      let score = dx.finalScore || dx.weight

      // Add patient-specific justifications
      justifications.push(
        `${patient.species === 'dog' ? 'Cão' : 'Gato'}, ${patient.ageRange === 'pediatric' ? 'jovem' : patient.ageRange === 'geriatric' ? 'idoso' : 'adulto'}`,
      )
      justifications.push(
        `Curso ${history.course === 'peracute' ? 'peragudo' : history.course === 'acute' ? 'agudo' : history.course === 'subacute' ? 'subagudo' : history.course === 'chronic' ? 'crônico' : 'episódico'}`,
      )

      // Pain adjustments
      if (findings.spinalPainPresent && dx.painExpected) {
        score *= 1.3
        justifications.push(`Dor espinhal presente (compatível)`)
      } else if (!findings.spinalPainPresent && !dx.painExpected) {
        score *= 1.2
        justifications.push(`Ausência de dor (compatível com ${dx.name})`)
      }

      // Deep pain adjustments
      if (findings.deepPain === 'absent') {
        if (dx.name.includes('Hérnia de Disco')) {
          score *= 1.4
          justifications.push(`⚠️ Dor profunda ausente - IVDD grave`)
        }
        if (dx.name.includes('Trauma')) {
          score *= 1.3
          justifications.push(`⚠️ Dor profunda ausente - trauma severo`)
        }
      }

      // Course-specific adjustments
      if (history.course === 'peracute') {
        if (dx.name.includes('Infarto') || dx.name.includes('FCE')) {
          score *= 1.5
          justifications.push(`Início peragudo típico de FCE`)
        }
        if (dx.name.includes('Trauma')) {
          score *= 1.4
          justifications.push(`Início peragudo compatível com trauma`)
        }
      }

      if (history.course === 'chronic' || history.course === 'progressive') {
        if (dx.name.includes('Neoplasia')) {
          score *= 1.4
          justifications.push(`Curso crônico/progressivo típico de neoplasia`)
        }
        if (dx.name.includes('Degenerativa')) {
          score *= 1.3
          justifications.push(`Progressão lenta típica de doença degenerativa`)
        }
      }

      // Trauma history
      if (history.trauma && dx.name.includes('Trauma')) {
        score *= 1.6
        justifications.push(`Histórico de trauma relatado`)
      }

      // Comorbidities
      if (
        patient.comorbidities.includes('cardiopata') &&
        dx.name.includes('Infarto')
      ) {
        score *= 1.3
        justifications.push(`Cardiopatia aumenta risco de eventos vasculares`)
      }

      return {
        name: dx.name,
        score,
        justifications: justifications.slice(0, 6),
        diagnostics: dx.diagnostics.firstLine,
        treatment: dx.treatment.immediate,
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

function getLocationKey(location: NeuroLocation): string {
  const mapping: Record<NeuroLocation, string> = {
    SPINAL_T3_L3: 'Medula espinhal T3-L3',
    SPINAL_L4_S3: 'Medula espinhal L4-S3',
    SPINAL_C1_C5: 'Medula espinhal C1-C5',
    SPINAL_C6_T2: 'Medula espinhal C6-T2',
    VESTIBULAR_PERIPHERAL: 'Sistema vestibular periférico',
    VESTIBULAR_CENTRAL: 'Sistema vestibular central',
    FOREBRAIN: 'Prosencéfalo',
    BRAINSTEM: 'Tronco encefálico',
    CEREBELLUM: 'Cerebelo',
    PNS_NMJ_MUSCLE: 'Nervos periféricos',
    MULTIFOCAL_DIFFUSE: 'Multifocal/Difuso',
  }
  return mapping[location] || 'Medula espinhal T3-L3'
}
