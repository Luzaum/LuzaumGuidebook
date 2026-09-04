import type { SupplementProduct } from './types'
import { PRESCRIPTION_DISCLAIMER_PT } from './types'
import { isPrescriptionAllowed, requiresVeterinaryReview } from './regulatoryValidation'

export interface PrescriptionGuardResult {
  allowed: boolean
  reasons: string[]
  disclaimers: string[]
}

export function evaluateSupplementPrescription(product: SupplementProduct): PrescriptionGuardResult {
  const reasons: string[] = []
  const disclaimers: string[] = [...PRESCRIPTION_DISCLAIMER_PT]

  if (product.catalogEligibility === 'excluded') {
    reasons.push('Produto excluído do catálogo de suplementos.')
  }
  if (product.catalogEligibility === 'staging_only') {
    reasons.push('Produto em staging — classificação ou rótulo pendente.')
  }
  if (product.medicineStatus === 'medicine_confirmed' || product.medicineStatus === 'possible_medicine') {
    reasons.push('Possível medicamento — não permitido na prescrição nutricional.')
  }
  if (product.medicineStatus === 'unknown') {
    reasons.push('Classificação regulatória desconhecida.')
  }
  if (!product.clinicalRecommendationEnabled) {
    reasons.push('Recomendação clínica desabilitada para este produto.')
  }
  if (product.labelStatus === 'pending' || product.formulaStatus === 'pending') {
    reasons.push('Rótulo ou fórmula incompleta.')
  }
  if (product.productClass === 'premix_balanceador') {
    reasons.push('Premix exige receita alimentar associada e revisão de nutricionista.')
  }
  if (requiresVeterinaryReview(product)) {
    disclaimers.push('Este produto exige revisão veterinária antes da prescrição automática.')
  }

  const allowed = isPrescriptionAllowed(product) && product.productClass !== 'premix_balanceador'

  return { allowed, reasons, disclaimers }
}
