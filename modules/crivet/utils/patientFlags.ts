import type { PhysiologyState, Comorbidity } from '../types/patient'
import type { PatientFlag } from '../types/patientFlags'

/**
 * Converte condições do paciente (PhysiologyState e Comorbidity) para PatientFlag
 */
export function convertToPatientFlags(
  physiology: PhysiologyState,
  comorbidities: Comorbidity[],
): PatientFlag[] {
  const flags: PatientFlag[] = []

  // Idade fisiológica
  if (physiology === 'Neonato' || physiology === 'Filhote') {
    flags.push('neonato')
  }
  if (physiology === 'Idoso') {
    flags.push('geriatrico')
  }

  // Comorbidades
  if (comorbidities.includes('Hepatopata')) {
    flags.push('hepatopata')
    // Nota: shunt seria uma comorbidade separada se houver no futuro
  }
  if (comorbidities.includes('Renopata')) {
    flags.push('renopata')
  }
  if (comorbidities.includes('Cardiopata')) {
    flags.push('cardiopata_icc')
  }
  if (comorbidities.includes('Endocrinopata')) {
    // Por enquanto, marcamos como endocrino genérico
    // Se no futuro houver distinção entre Addison/Diabetes, ajustar aqui
    flags.push('endocrino_diabetes') // default
  }

  return flags
}
