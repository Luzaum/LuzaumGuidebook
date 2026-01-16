import { NormalizedFindings } from '../../types/case'

export type NeuroLocation =
  | 'FOREBRAIN'
  | 'BRAINSTEM'
  | 'CEREBELLUM'
  | 'VESTIBULAR_PERIPHERAL'
  | 'VESTIBULAR_CENTRAL'
  | 'SPINAL_C1_C5'
  | 'SPINAL_C6_T2'
  | 'SPINAL_T3_L3'
  | 'SPINAL_L4_S3'
  | 'PNS_NMJ_MUSCLE'
  | 'MULTIFOCAL_DIFFUSE'

export interface LocalizationResult {
  location: NeuroLocation
  motorNeuronPattern: string
  laterality: 'left' | 'right' | 'bilateral' | 'unknown'
  confidence: number
  reasons: string[]
  redFlags: string[]
}

interface LocalizationRule {
  id: string
  priority: number
  location: NeuroLocation
  motorNeuronPattern: string
  confidenceBase: number
  check: (findings: NormalizedFindings) => boolean
  reasons: (findings: NormalizedFindings) => string[]
  redFlags: (findings: NormalizedFindings) => string[]
}

const rules: LocalizationRule[] = [
  // T3-L3 (Most common - high priority)
  {
    id: 'T3_L3_UMN_CLASSIC',
    priority: 95,
    location: 'SPINAL_T3_L3',
    motorNeuronPattern: 'UMN para pélvicos',
    confidenceBase: 0.85,
    check: (f) =>
      f.gaitThoracic === 'normal' &&
      (f.gaitPelvic === 'paresis' ||
        f.gaitPelvic === 'plegia' ||
        f.gaitPelvic === 'ataxia') &&
      (f.patellarLeft === 'normal' ||
        f.patellarLeft === 'increased' ||
        f.patellarRight === 'normal' ||
        f.patellarRight === 'increased'),
    reasons: (f) =>
      [
        'Membros torácicos preservados com déficit em pélvicos',
        'Reflexo patelar normal ou aumentado (padrão UMN)',
        'Padrão CLÁSSICO de lesão toracolombar',
        f.spinalPainThoracolumbar !== 'none' ? 'Dor toracolombar presente' : '',
      ].filter(Boolean),
    redFlags: (f) => {
      const flags: string[] = []
      if (f.deepPain === 'absent')
        flags.push(
          '⚠️ DOR PROFUNDA AUSENTE - Prognóstico reservado, emergência cirúrgica',
        )
      if (f.gaitPelvic === 'plegia')
        flags.push('Plegia pélvica - avaliar urgência cirúrgica')
      if (f.spinalPainThoracolumbar === 'severe')
        flags.push('Dor severa - analgesia imediata')
      return flags
    },
  },

  // L4-S3 (LMN pattern)
  {
    id: 'L4_S3_LMN',
    priority: 90,
    location: 'SPINAL_L4_S3',
    motorNeuronPattern: 'LMN para pélvicos',
    confidenceBase: 0.8,
    check: (f) =>
      f.gaitThoracic === 'normal' &&
      (f.gaitPelvic === 'paresis' || f.gaitPelvic === 'plegia') &&
      (f.patellarLeft === 'decreased' ||
        f.patellarLeft === 'absent' ||
        f.patellarRight === 'decreased' ||
        f.patellarRight === 'absent'),
    reasons: (f) => [
      'Membros torácicos normais',
      'Déficit em pélvicos com reflexo patelar diminuído/ausente',
      'Padrão LMN indica lesão em intumescência lombossacra (L4-S3)',
      'Atrofia muscular rápida esperada (1-2 semanas)',
    ],
    redFlags: (f) => {
      const flags: string[] = []
      flags.push('Avaliar incontinência urinária/fecal')
      if (f.deepPain === 'absent')
        flags.push('⚠️ Dor profunda ausente - prognóstico grave')
      flags.push('Atrofia muscular neurogênica rápida esperada')
      return flags
    },
  },

  // C1-C5 (All 4 limbs UMN)
  {
    id: 'C1_C5_UMN',
    priority: 85,
    location: 'SPINAL_C1_C5',
    motorNeuronPattern: 'UMN em todos os membros',
    confidenceBase: 0.75,
    check: (f) =>
      (f.gaitThoracic === 'ataxia' || f.gaitThoracic === 'paresis') &&
      (f.gaitPelvic === 'ataxia' || f.gaitPelvic === 'paresis') &&
      f.all4PosturalsAffected &&
      f.umnPattern,
    reasons: (f) =>
      [
        'Déficits em todos os 4 membros',
        'Padrão UMN (reflexos normais ou aumentados)',
        'Reações posturais afetadas em 4 membros',
        f.spinalPainCervical !== 'none' ? 'Dor cervical presente' : '',
      ].filter(Boolean),
    redFlags: (f) => {
      const flags: string[] = []
      if (f.mentation !== 'normal')
        flags.push('Alteração de mentação - considerar lesão intracraniana')
      flags.push('Risco de progressão para tetraplegia')
      if (f.spinalPainCervical === 'severe')
        flags.push('⚠️ Dor cervical severa - NUNCA forçar mobilização')
      return flags
    },
  },

  // Vestibular Peripheral
  {
    id: 'VESTIBULAR_PERIPHERAL',
    priority: 80,
    location: 'VESTIBULAR_PERIPHERAL',
    motorNeuronPattern: 'Sem déficit motor primário',
    confidenceBase: 0.7,
    check: (f) =>
      f.mentation === 'normal' &&
      f.headTilt &&
      f.nystagmusPresent &&
      !f.multiCranialDeficits &&
      f.gaitThoracic === 'normal' &&
      f.gaitPelvic === 'normal',
    reasons: (f) => [
      'Mentação NORMAL (diferencia de central)',
      'Head tilt + nistagmo presentes',
      'Ausência de déficits proprioceptivos',
      'Ausência de múltiplos déficits de nervos cranianos',
      'Prognóstico geralmente BOM',
    ],
    redFlags: (f) => [],
  },

  // Vestibular Central
  {
    id: 'VESTIBULAR_CENTRAL',
    priority: 85,
    location: 'VESTIBULAR_CENTRAL',
    motorNeuronPattern: 'Possível UMN ipsilateral',
    confidenceBase: 0.75,
    check: (f) =>
      (f.mentation === 'depressed' || f.mentation === 'stupor') &&
      f.headTilt &&
      (f.nystagmusPresent || f.multiCranialDeficits || !f.pelvicOnlyDeficit),
    reasons: (f) =>
      [
        '⚠️ Mentação ALTERADA (diferencia de periférico)',
        'Head tilt presente',
        f.multiCranialDeficits ? 'Múltiplos nervos cranianos afetados' : '',
        'Possíveis déficits proprioceptivos associados',
        'Prognóstico mais RESERVADO que periférico',
      ].filter(Boolean),
    redFlags: (f) => {
      const flags: string[] = []
      flags.push('Diferenciar de lesão de tronco encefálico')
      if (f.mentation === 'stupor')
        flags.push('⚠️ EMERGÊNCIA - risco de progressão')
      return flags
    },
  },

  // Brainstem
  {
    id: 'BRAINSTEM',
    priority: 90,
    location: 'BRAINSTEM',
    motorNeuronPattern: 'UMN ipsilateral',
    confidenceBase: 0.8,
    check: (f) =>
      (f.mentation === 'stupor' || f.mentation === 'coma') &&
      f.multiCranialDeficits,
    reasons: (f) => [
      '⚠️ EMERGÊNCIA NEUROLÓGICA',
      'Alteração grave de consciência',
      'Múltiplos déficits de nervos cranianos',
      'Indica lesão de TRONCO ENCEFÁLICO',
      'Prognóstico RESERVADO',
    ],
    redFlags: (f) => {
      const flags: string[] = []
      flags.push('🚨 EMERGÊNCIA MÁXIMA')
      flags.push('Risco de herniação cerebral')
      flags.push('Avaliar reflexos de tronco para prognóstico')
      if (f.mentation === 'coma') flags.push('Coma - prognóstico muito grave')
      return flags
    },
  },

  // Forebrain
  {
    id: 'FOREBRAIN',
    priority: 75,
    location: 'FOREBRAIN',
    motorNeuronPattern: 'UMN contralateral',
    confidenceBase: 0.65,
    check: (f) =>
      (f.mentation === 'depressed' || f.mentation === 'stupor') &&
      !f.multiCranialDeficits &&
      f.asymmetricPosturals,
    reasons: (f) => [
      'Alteração de mentação/comportamento',
      'Déficits posturais contralaterais à lesão',
      'Ausência de múltiplos déficits de nervos cranianos',
      'Sugere lesão PROSENCEFÁLICA',
      'Investigar histórico de convulsões',
    ],
    redFlags: (f) => {
      const flags: string[] = []
      if (f.mentation === 'stupor')
        flags.push('Progressão rápida sugere lesão expansiva')
      flags.push('Considerar hipertensão intracraniana')
      return flags
    },
  },

  // Multifocal/Diffuse
  {
    id: 'MULTIFOCAL',
    priority: 70,
    location: 'MULTIFOCAL_DIFFUSE',
    motorNeuronPattern: 'Variável',
    confidenceBase: 0.6,
    check: (f) =>
      f.lmnPattern && f.all4PosturalsAffected && f.mentation === 'normal',
    reasons: (f) => [
      'LMN generalizado com mentação preservada',
      'Sugere polineuropatia, NMJ ou miopatia',
      'Investigar causas metabólicas/tóxicas/imunomediadas',
    ],
    redFlags: (f) => {
      const flags: string[] = []
      flags.push('Risco de insuficiência respiratória (NMJ)')
      flags.push('Avaliar deglutição')
      flags.push('Investigar causas sistêmicas')
      return flags
    },
  },
]

export function analyzeNeuroLocalization(
  findings: NormalizedFindings,
): LocalizationResult[] {
  const results: LocalizationResult[] = []

  for (const rule of rules) {
    if (rule.check(findings)) {
      results.push({
        location: rule.location,
        motorNeuronPattern: rule.motorNeuronPattern,
        laterality: findings.asymmetricPosturals ? 'unknown' : 'bilateral',
        confidence: rule.confidenceBase,
        reasons: rule.reasons(findings),
        redFlags: rule.redFlags(findings),
      })
    }
  }

  return results.sort((a, b) => b.confidence - a.confidence)
}

export function getLocationDisplayName(location: NeuroLocation): string {
  const names: Record<NeuroLocation, string> = {
    FOREBRAIN: 'Prosencéfalo',
    BRAINSTEM: 'Tronco Encefálico',
    CEREBELLUM: 'Cerebelo',
    VESTIBULAR_PERIPHERAL: 'Sistema Vestibular Periférico',
    VESTIBULAR_CENTRAL: 'Sistema Vestibular Central',
    SPINAL_C1_C5: 'Medula Espinhal C1-C5',
    SPINAL_C6_T2: 'Medula Espinhal C6-T2',
    SPINAL_T3_L3: 'Medula Espinhal T3-L3',
    SPINAL_L4_S3: 'Medula Espinhal L4-S3',
    PNS_NMJ_MUSCLE: 'Nervos Periféricos/NMJ/Músculo',
    MULTIFOCAL_DIFFUSE: 'Multifocal/Difuso',
  }
  return names[location]
}
