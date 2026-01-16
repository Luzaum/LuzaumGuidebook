import { DiagnosticPlan, NeuroLocalization, PatientProfile } from '../types'

export function getDiagnosticPlan(
  localization: NeuroLocalization,
  patient: PatientProfile,
): DiagnosticPlan[] {
  const plans: DiagnosticPlan[] = []

  // Basic workup for everyone
  plans.push({
    test: 'Hemograma e Bioquímica Sanguínea',
    priority: 1,
    rationale:
      'Avaliação sistêmica básica para excluir causas metabólicas ou infecciosas.',
    expectedYield: 'Baixo para causas primárias, alto para metabólicas.',
  })

  // Localization specific
  if (
    localization.primary.includes('Cérebro') ||
    localization.primary.includes('Tronco') ||
    localization.primary.includes('Vestibular Central')
  ) {
    plans.push({
      test: 'Ressonância Magnética (RM) de Encéfalo',
      priority: 2,
      rationale:
        'Exame de escolha para avaliação de lesões intracranianas.',
      expectedYield: 'Alto para neoplasias, inflamatórias e vasculares.',
    })
    plans.push({
      test: 'Análise de Líquor',
      priority: 3,
      rationale: 'Avaliar processos inflamatórios/infecciosos.',
      expectedYield: 'Alto para meningite/encefalite.',
    })
  }

  if (
    localization.primary.includes('T3-L3') ||
    localization.primary.includes('L4-S3') ||
    localization.primary.includes('C1-C5') ||
    localization.primary.includes('C6-T2')
  ) {
    plans.push({
      test: 'Ressonância Magnética (RM) de Coluna',
      priority: 2,
      rationale: 'Avaliar compressão medular, discos e tecidos moles.',
      expectedYield: 'Alto para IVDD, neoplasias, mielites.',
    })
    plans.push({
      test: 'Radiografias de Coluna',
      priority: 3,
      rationale: 'Triagem para fraturas, discospondilite e alterações ósseas.',
      expectedYield: 'Moderado.',
    })
  }

  if (patient.comorbidities.includes('cardiopata')) {
    plans.push({
      test: 'Ecocardiograma',
      priority: 3,
      rationale: 'Avaliar cardiopatias associadas a eventos tromboembólicos.',
      expectedYield: 'Moderado.',
    })
  }

  if (patient.comorbidities.includes('endocrino')) {
    plans.push({
      test: 'Perfil Endócrino (T4, cortisol)',
      priority: 3,
      rationale: 'Hipotireoidismo pode causar neuropatias.',
      expectedYield: 'Baixo (mas importante excluir)',
    })
  }

  return plans
}
