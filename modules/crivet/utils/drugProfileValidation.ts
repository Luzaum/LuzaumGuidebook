/**
 * CRIVET 2.0 - Sistema de Validação de Perfis de Fármacos
 * Verifica se todas as informações obrigatórias estão presentes
 */

import type { DrugProfile } from '../types/drugProfile'

export type MissingField = {
  section: string
  field: string
  severity: 'critical' | 'warning' | 'info'
  description: string
}

export type ValidationResult = {
  isValid: boolean
  completeness: number // 0-100%
  missing: MissingField[]
  warnings: string[]
}

const REQUIRED_FIELDS: Array<{
  path: string
  section: string
  severity: 'critical' | 'warning' | 'info'
  description: string
  check: (profile: Partial<DrugProfile>) => boolean
}> = [
  // Seção 1: Identidade (CRÍTICOS)
  {
    path: 'drug_id',
    section: 'Identidade',
    severity: 'critical',
    description: 'ID único do fármaco (slug)',
    check: (p) => !!p.drug_id && typeof p.drug_id === 'string',
  },
  {
    path: 'name_pt',
    section: 'Identidade',
    severity: 'critical',
    description: 'Nome em português',
    check: (p) => !!p.name_pt && typeof p.name_pt === 'string',
  },
  {
    path: 'name_en',
    section: 'Identidade',
    severity: 'warning',
    description: 'Nome em inglês',
    check: (p) => !!p.name_en && typeof p.name_en === 'string',
  },
  {
    path: 'class',
    section: 'Identidade',
    severity: 'critical',
    description: 'Classes farmacológicas',
    check: (p) => Array.isArray(p.class) && p.class.length > 0,
  },
  {
    path: 'core_concepts.taglines',
    section: 'Conceitos Centrais',
    severity: 'warning',
    description: 'Taglines (2-5 frases curtas)',
    check: (p) => Array.isArray(p.core_concepts?.taglines) && p.core_concepts.taglines.length >= 2,
  },

  // Seção 2: Perfil Farmacológico (WARNING/INFO)
  {
    path: 'core_concepts.mechanism',
    section: 'Mecanismo de Ação',
    severity: 'warning',
    description: 'Descrição do mecanismo de ação',
    check: (p) => !!p.core_concepts?.mechanism,
  },
  {
    path: 'core_concepts.pharmacodynamics',
    section: 'Farmacodinâmica',
    severity: 'info',
    description: 'Início, pico, duração de ação',
    check: (p) => !!p.core_concepts?.pharmacodynamics,
  },
  {
    path: 'core_concepts.pharmacokinetics',
    section: 'Farmacocinética',
    severity: 'warning',
    description: 'Metabolismo e excreção',
    check: (p) => !!p.core_concepts?.pharmacokinetics,
  },
  {
    path: 'species_notes',
    section: 'Notas por Espécie',
    severity: 'warning',
    description: 'Particularidades cão vs gato',
    check: (p) => !!p.species_notes && (!!p.species_notes.dogs || !!p.species_notes.cats),
  },

  // Seção 3: Indicações e Contraindicações
  {
    path: 'indications',
    section: 'Indicações',
    severity: 'critical',
    description: 'Quando usar o fármaco',
    check: (p) => !!p.indications && (Array.isArray(p.indications.primary) || Array.isArray(p.indications.secondary)),
  },
  {
    path: 'contraindications',
    section: 'Contraindicações',
    severity: 'critical',
    description: 'Quando NÃO usar (absolutas e relativas)',
    check: (p) => !!p.contraindications && Array.isArray(p.contraindications.absolute),
  },

  // Seção 4: Doses (CRÍTICO - é uma calculadora!)
  {
    path: 'doses',
    section: 'Doses',
    severity: 'critical',
    description: 'Doses para cão e gato',
    check: (p) => !!p.doses && !!p.doses.dog && !!p.doses.cat,
  },
  {
    path: 'doses.unit_standard_cri',
    section: 'Doses',
    severity: 'critical',
    description: 'Unidade padrão para CRI',
    check: (p) => !!p.doses?.unit_standard_cri,
  },
  {
    path: 'doses.dog.cri',
    section: 'Doses - Cão',
    severity: 'critical',
    description: 'Doses de CRI para cães',
    check: (p) => !!(p.doses?.dog?.cri?.mcgkgmin || p.doses?.dog?.cri?.mgkgh),
  },
  {
    path: 'doses.cat.cri',
    section: 'Doses - Gato',
    severity: 'critical',
    description: 'Doses de CRI para gatos',
    check: (p) => !!(p.doses?.cat?.cri?.mcgkgmin || p.doses?.cat?.cri?.mgkgh),
  },

  // Seção 5: Apresentações
  {
    path: 'presentations',
    section: 'Apresentações',
    severity: 'critical',
    description: 'Concentrações comerciais disponíveis',
    check: (p) => Array.isArray(p.presentations) && p.presentations.length > 0,
  },

  // Seção 6: Diluição
  {
    path: 'dilution_and_preparation',
    section: 'Diluição e Preparo',
    severity: 'critical',
    description: 'Regras de diluição e preparo',
    check: (p) => !!p.dilution_and_preparation,
  },
  {
    path: 'dilution_and_preparation.recommended_targets',
    section: 'Diluição',
    severity: 'warning',
    description: 'Concentrações-alvo recomendadas',
    check: (p) => Array.isArray(p.dilution_and_preparation?.recommended_targets) && p.dilution_and_preparation!.recommended_targets.length > 0,
  },

  // Seção 7: Compatibilidade
  {
    path: 'compatibility',
    section: 'Compatibilidade',
    severity: 'critical',
    description: 'Incompatibilidades (bloqueio de erros)',
    check: (p) => !!p.compatibility,
  },

  // Seção 10: Alertas por Comorbidade
  {
    path: 'alerts_by_comorbidity',
    section: 'Alertas Clínicos',
    severity: 'warning',
    description: 'Alertas para comorbidades comuns',
    check: (p) => Array.isArray(p.alerts_by_comorbidity) && p.alerts_by_comorbidity.length > 0,
  },

  // Seção 11: Presets
  {
    path: 'presets',
    section: 'Presets',
    severity: 'warning',
    description: 'Presets nomeados por cenário',
    check: (p) => Array.isArray(p.presets) && p.presets.length > 0,
  },

  // Seção 12: Templates de Cálculo
  {
    path: 'calculation_templates',
    section: 'Templates de Cálculo',
    severity: 'warning',
    description: 'Algoritmos de cálculo (CRI/bolus)',
    check: (p) => !!p.calculation_templates && (!!p.calculation_templates.cri || !!p.calculation_templates.bolus),
  },
]

export function validateDrugProfile(profile: Partial<DrugProfile>): ValidationResult {
  const missing: MissingField[] = []
  const warnings: string[] = []

  // Verifica cada campo obrigatório
  for (const field of REQUIRED_FIELDS) {
    if (!field.check(profile)) {
      missing.push({
        section: field.section,
        field: field.path,
        severity: field.severity,
        description: field.description,
      })

      if (field.severity === 'critical') {
        warnings.push(`Campo crítico faltando: ${field.path} (${field.description})`)
      }
    }
  }

  // Calcula completude
  const totalFields = REQUIRED_FIELDS.length
  const missingCount = missing.length
  const completeness = Math.max(0, Math.round(((totalFields - missingCount) / totalFields) * 100))

  // Validações adicionais
  if (!profile.doses?.dog?.bolus && !profile.doses?.dog?.cri) {
    warnings.push('Cão deve ter pelo menos bolus OU CRI definidos')
  }

  if (!profile.doses?.cat?.bolus && !profile.doses?.cat?.cri) {
    warnings.push('Gato deve ter pelo menos bolus OU CRI definidos')
  }

  // Verifica se há incompatibilidades definidas (importante para segurança)
  if (!profile.compatibility?.incompatible || profile.compatibility.incompatible.length === 0) {
    warnings.push('Nenhuma incompatibilidade definida - verificar se está correto')
  }

  return {
    isValid: missing.filter((m) => m.severity === 'critical').length === 0,
    completeness,
    missing,
    warnings,
  }
}

export function getMissingFieldsBySection(validation: ValidationResult): Record<string, MissingField[]> {
  const bySection: Record<string, MissingField[]> = {}

  for (const field of validation.missing) {
    if (!bySection[field.section]) {
      bySection[field.section] = []
    }
    bySection[field.section].push(field)
  }

  return bySection
}

export function formatValidationReport(validation: ValidationResult): string {
  const lines: string[] = []
  lines.push(`Completude: ${validation.completeness}%`)
  lines.push(`Valido: ${validation.isValid ? 'SIM' : 'NÃO'}`)
  lines.push('')

  if (validation.missing.length > 0) {
    lines.push('Campos Faltando:')
    const bySection = getMissingFieldsBySection(validation)

    for (const [section, fields] of Object.entries(bySection)) {
      lines.push(`\n${section}:`)
      for (const field of fields) {
        const icon = field.severity === 'critical' ? '🔴' : field.severity === 'warning' ? '🟡' : '🔵'
        lines.push(`  ${icon} ${field.field}: ${field.description}`)
      }
    }
  }

  if (validation.warnings.length > 0) {
    lines.push('\nAvisos:')
    for (const warning of validation.warnings) {
      lines.push(`  ⚠️ ${warning}`)
    }
  }

  return lines.join('\n')
}
