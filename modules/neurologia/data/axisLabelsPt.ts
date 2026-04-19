import type { MotorPattern, NeuroAxis } from '../types/analysis'
import type { NeuroLocalizationResult } from '../types/analysis'

/** Rótulos em PT para resumos e UI (coerentes com o motor de neurolocalização). */
export const NEURO_AXIS_LABELS_PT: Record<NeuroAxis, string> = {
  PROSENCEFALO: 'Prosencéfalo',
  TRONCO_ENCEFALICO: 'Tronco encefálico',
  CEREBELO: 'Cerebelo',
  VESTIBULAR_PERIFERICO: 'Vestibular periférico',
  VESTIBULAR_CENTRAL: 'Vestibular central',
  MEDULA_C1_C5: 'Medula C1–C5',
  MEDULA_C6_T2: 'Medula C6–T2',
  MEDULA_T3_L3: 'Medula T3–L3',
  MEDULA_L4_S3: 'Medula L4–S3',
  CAUDA_EQUINA: 'Cauda equina',
  NEUROMUSCULAR: 'Unidade neuromuscular',
  MULTIFOCAL_OU_DIFUSA: 'Multifocal / difuso',
  INDETERMINADO: 'Indeterminado',
}

export const MOTOR_PATTERN_LABELS_PT: Record<MotorPattern, string> = {
  UMN: 'Neurônio motor superior (UMN)',
  LMN: 'Neurônio motor inferior (LMN)',
  VESTIBULAR: 'Padrão vestibular',
  CEREBELAR: 'Padrão cerebelar',
  NEUROMUSCULAR: 'Padrão neuromuscular',
  INDEFINIDO: 'Indefinido',
}

export const DISTRIBUTION_LABELS_PT: Record<NeuroLocalizationResult['distribution'], string> = {
  FOCAL: 'Focal',
  MULTIFOCAL: 'Multifocal',
  DIFUSA: 'Difusa',
  INDETERMINADA: 'Indeterminada',
}
