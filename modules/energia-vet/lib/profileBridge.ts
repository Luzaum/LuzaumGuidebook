import type { Species } from '../types'
import type { TherapeuticProfileId } from './clinical/therapeuticProfiles'
import { getClinicalProfileIdsFromSelections } from './clinicalProfiles'

/**
 * Ponte entre perfis energéticos (livros), estados FEDIAF legados e exigências nutricionais.
 * Referências: Applied Veterinary Clinical Nutrition cap. 3; FEDIAF 2025; SACN/GENUTRI.
 */
export const PROFILE_BRIDGE_VERSION = 'vetius-profile-bridge-2026.08'

/** Perfil energético do livro → perfil de exigência FEDIAF para comparação nutricional. */
export const BOOK_ENERGY_TO_REQUIREMENT_PROFILE: Record<string, string> = {
  dog_puppy_0_4: 'fediaf-dog-early-growth-1000kcal',
  dog_puppy_4_adult: 'fediaf-dog-late-growth-1000kcal',
  dog_adult_neutered: 'fediaf-dog-adult-95-1000kcal',
  dog_adult_intact: 'fediaf-dog-adult-110-1000kcal',
  dog_adult_inactive: 'fediaf-dog-adult-95-1000kcal',
  dog_work_light: 'fediaf-dog-adult-110-1000kcal',
  dog_work_moderate: 'fediaf-dog-adult-110-1000kcal',
  dog_work_heavy: 'fediaf-dog-adult-110-1000kcal',
  dog_gestation: 'fediaf-dog-early-growth-1000kcal',
  dog_lactation: 'fediaf-dog-early-growth-1000kcal',
  dog_nrc_active_pet: 'fediaf-dog-adult-110-1000kcal',
  dog_nrc_young_active: 'fediaf-dog-adult-110-1000kcal',
  dog_nrc_inactive: 'fediaf-dog-adult-95-1000kcal',
  dog_nrc_senior_active: 'fediaf-dog-adult-95-1000kcal',
  dog_senior: 'fediaf-dog-adult-95-1000kcal',
  dog_weight_loss: 'fediaf-dog-adult-95-1000kcal',
  dog_weight_gain: 'fediaf-dog-adult-110-1000kcal',
  dog_critical_care: 'fediaf-dog-adult-110-1000kcal',

  cat_kitten: 'fediaf-cat-growth-1000kcal',
  cat_adult_neutered: 'fediaf-cat-adult-75-1000kcal',
  cat_adult_intact: 'fediaf-cat-adult-100-1000kcal',
  cat_adult_inactive: 'fediaf-cat-adult-75-1000kcal',
  cat_senior: 'fediaf-cat-adult-75-1000kcal',
  cat_gestation: 'fediaf-cat-growth-1000kcal',
  cat_lactation: 'fediaf-cat-growth-1000kcal',
  cat_nrc_lean: 'fediaf-cat-adult-100-1000kcal',
  cat_nrc_overweight: 'fediaf-cat-adult-75-1000kcal',
  cat_elderly: 'fediaf-cat-adult-75-1000kcal',
  cat_weight_loss: 'fediaf-cat-adult-75-1000kcal',
  cat_weight_gain: 'fediaf-cat-growth-1000kcal',
  cat_critical_care: 'fediaf-cat-adult-100-1000kcal',
}

/** Perfil energético do livro → estado FEDIAF legado (API/relatórios). */
export const BOOK_ENERGY_TO_FEDIAF_STATE: Record<string, string> = {
  dog_puppy_0_4: 'dog_growth_curve_8w_4m',
  dog_puppy_4_adult: 'dog_growth_curve_4_12m',
  dog_adult_neutered: 'dog_adult_low_activity',
  dog_adult_intact: 'dog_adult_moderate_low_impact',
  dog_adult_inactive: 'dog_adult_obese_prone',
  dog_work_light: 'dog_adult_moderate_low_impact',
  dog_work_moderate: 'dog_adult_moderate_high_impact',
  dog_work_heavy: 'dog_adult_high_activity',
  dog_gestation: 'dog_gestation_last_5w',
  dog_lactation: 'dog_lactation',
  dog_nrc_active_pet: 'dog_adult_moderate_low_impact',
  dog_nrc_young_active: 'dog_young_adult_1_2',
  dog_nrc_inactive: 'dog_adult_low_activity',
  dog_nrc_senior_active: 'dog_senior_gt_7',
  dog_senior: 'dog_senior_gt_7',
  dog_weight_loss: 'dog_adult_obese_prone',
  dog_weight_gain: 'dog_adult_moderate_low_impact',
  dog_critical_care: 'dog_adult_sedentary',

  cat_kitten: 'cat_growth_0_4m',
  cat_adult_neutered: 'cat_adult_neutered_indoor',
  cat_adult_intact: 'cat_adult_active',
  cat_adult_inactive: 'cat_adult_indoor_weight_prone',
  cat_senior: 'cat_adult_neutered_indoor',
  cat_gestation: 'cat_gestation',
  cat_lactation: 'cat_lactation',
  cat_nrc_lean: 'cat_adult_active',
  cat_nrc_overweight: 'cat_adult_indoor_weight_prone',
  cat_elderly: 'cat_adult_neutered_indoor',
  cat_weight_loss: 'cat_adult_indoor_weight_prone',
  cat_weight_gain: 'cat_growth_4_9m',
  cat_critical_care: 'cat_adult_active',
}

/** SACN / Brunetto / PURINA → perfis terapêuticos V2 (consenso clínico). */
export const SACN_PROFILE_TO_THERAPEUTIC: Record<string, TherapeuticProfileId[]> = {
  'sacn-doenca-renal-cronica-caes-ms': ['renal_ckd_dog'],
  'brunetto-e-teixeira-doenca-renal-gatos-est-3-e-4': ['renal_ckd_cat', 'renal_proteinuria'],
  'brunetto-e-teixeira-doenca-renal-cronica-est-2-caes': ['renal_ckd_dog'],
  'brunetto-e-teixeira-doenca-renal-cronica-est-3-caes': ['renal_ckd_dog', 'renal_proteinuria'],
  'sacn-doenca-renal-cronica-gatos-ms': ['renal_ckd_cat'],
  'sacn-cardiovascular-caes-ms': ['cardiac_sodium_modified'],
  'sacn-cardiovascular-gatos-ms': ['cardiac_sodium_modified'],

  'sacn-dissolucao-de-estruvita-ms': ['urinary_struvite_dissolution'],
  'sacn-prevencao-de-estruvita-ms': ['urinary_struvite_prevention'],
  'sacn-urolito-de-oxalato-de-calcio-ms': ['urinary_calcium_oxalate_prevention'],
  'sacn-urolitiase-caes-ms': ['urinary_struvite_prevention', 'urinary_calcium_oxalate_prevention'],
  'sacn-urolitiase-gatos-purinas-ms': ['urinary_urate'],

  'sacn-hepatobiliar-caes-ms': ['hepatic_copper_restriction', 'hepatic_encephalopathy'],
  'sacn-hepatobiliar-gatos-ms': ['hepatic_encephalopathy', 'hepatic_ascites'],

  'sacn-alergia-alimentar-caes-ms': ['hydrolyzed_protein', 'novel_protein'],
  'sacn-alergia-alimentar-gatos-ms': ['hydrolyzed_protein', 'novel_protein'],
  'sacn-reacao-alergica-caes-ms': ['hydrolyzed_protein', 'novel_protein'],
  'sacn-reacao-alergica-gatos-ms': ['hydrolyzed_protein', 'novel_protein'],

  'sacn-cancer-caes-ms': ['critical_care_recovery'],
  'sacn-cancer-caes-contribuicao-energetica': ['critical_care_recovery'],
  'sacn-cancer-gatos-ms': ['critical_care_recovery'],
  'sacn-cancer-gatos-contribuicao-energetica': ['critical_care_recovery'],

  'sacn-diabetes-caes-ms': ['diabetes_dog'],
  'sacn-diabetes-gatos-ms': ['diabetes_cat'],

  'sacn-hiperlipidemia-caes-ms': ['hyperlipidemia_dog', 'gastrointestinal_low_fat'],

  'sacn-disfuncao-cognitiva-caes-ms': ['critical_care_recovery'],

  'sacn-insuficiencia-pancreatica-exocrina-caes-ms': ['gastrointestinal_highly_digestible'],
  'sacn-insuficiencia-pancreatica-exocrina-gatos-ms': ['gastrointestinal_highly_digestible'],

  'sacn-doenca-intestinal-inflamatoria-caes-ms': ['gastrointestinal_highly_digestible', 'fiber_responsive'],
  'sacn-doenca-intestinal-inflamatoria-gatos-ms': ['gastrointestinal_highly_digestible', 'fiber_responsive'],

  'sacn-pancreatite-aguda-e-cronica-caes-ms': ['pancreatitis_dog', 'gastrointestinal_low_fat'],
  'sacn-pancreatite-aguda-e-cronica-caes-obeso-ms': ['pancreatitis_dog', 'weight_loss_dog'],
  'sacn-pancreatite-aguda-e-cronica-gatos-ms': ['pancreatitis_cat', 'gastrointestinal_low_fat'],
  'sacn-pancreatite-aguda-e-cronica-gatos-obeso-ms': ['pancreatitis_cat', 'weight_loss_cat'],

  'sacn-linfangectasia-caes-ms': ['gastrointestinal_highly_digestible', 'gastrointestinal_low_fat'],
  'sacn-linfangectasia-gatos-ms': ['gastrointestinal_highly_digestible'],

  'purina-ileo-paralitico-100-kcal': ['critical_care_recovery', 'gastrointestinal_highly_digestible'],
}

export function resolveRequirementProfileIdForEnergyState(
  species: Species,
  stateId?: string,
  isNeutered?: boolean,
): string | undefined {
  if (stateId && BOOK_ENERGY_TO_REQUIREMENT_PROFILE[stateId]) {
    return BOOK_ENERGY_TO_REQUIREMENT_PROFILE[stateId]
  }

  if (stateId?.startsWith('dog_') || stateId?.startsWith('cat_')) {
    const fediafFallback = stateId
    if (fediafFallback.includes('growth') || fediafFallback.includes('puppy') || fediafFallback.includes('kitten')) {
      return species === 'dog' ? 'fediaf-dog-early-growth-1000kcal' : 'fediaf-cat-growth-1000kcal'
    }
    if (fediafFallback.includes('gestation') || fediafFallback.includes('lactation')) {
      return species === 'dog' ? 'fediaf-dog-early-growth-1000kcal' : 'fediaf-cat-growth-1000kcal'
    }
    if (fediafFallback.includes('obese') || fediafFallback.includes('low_activity') || fediafFallback.includes('sedentary') || fediafFallback.includes('weight_loss') || fediafFallback.includes('inactive') || fediafFallback.includes('senior') || fediafFallback.includes('indoor')) {
      return species === 'dog' ? 'fediaf-dog-adult-95-1000kcal' : 'fediaf-cat-adult-75-1000kcal'
    }
  }

  return species === 'dog'
    ? isNeutered ? 'fediaf-dog-adult-95-1000kcal' : 'fediaf-dog-adult-110-1000kcal'
    : isNeutered ? 'fediaf-cat-adult-75-1000kcal' : 'fediaf-cat-adult-100-1000kcal'
}

export function mapSacnProfileIdsToTherapeutic(profileIds: string[]): TherapeuticProfileId[] {
  const resolved = new Set<TherapeuticProfileId>()
  for (const profileId of profileIds) {
    for (const therapeuticId of SACN_PROFILE_TO_THERAPEUTIC[profileId] ?? []) {
      resolved.add(therapeuticId)
    }
  }
  return Array.from(resolved)
}

export function mapComorbiditySelectionsToTherapeuticProfilesBridge(
  species: Species,
  comorbidityIds: string[],
): TherapeuticProfileId[] {
  const sacnIds = getClinicalProfileIdsFromSelections(species, comorbidityIds)
  return mapSacnProfileIdsToTherapeutic(sacnIds)
}
