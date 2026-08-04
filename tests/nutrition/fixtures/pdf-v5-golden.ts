import type { NutritionClinicalRecord, StoredCalculationReport } from '../../../modules/energia-vet/types'
import { REPORT_V4_SAMPLE } from './report-v4-sample'

const baseEvaluation = REPORT_V4_SAMPLE.formula.evaluation
const baseFeedingPlan = REPORT_V4_SAMPLE.formula.feedingPlan

function withClinicalRecord(report: StoredCalculationReport, record: NutritionClinicalRecord): StoredCalculationReport {
  return { ...report, clinicalRecord: record }
}

/** Caso 1 — Cão saudável, manutenção, dieta comercial, 2 refeições. */
export const PDF_GOLDEN_HEALTHY_DOG: StoredCalculationReport = {
  ...REPORT_V4_SAMPLE,
  id: 'pdf-golden-healthy-dog',
  patient: {
    ...REPORT_V4_SAMPLE.patient,
    name: 'Thor',
    breed: 'Labrador',
    bcs: 5,
    muscleCondition: 'normal',
  },
  energy: {
    ...REPORT_V4_SAMPLE.energy,
    resolvedProfileLabel: 'Cão adulto com atividade moderada',
  },
  clinicalRecord: {
    rerKcalDay: 534,
    maintenanceRangeMin: 724,
    maintenanceRangeMax: 838,
    prescribedKcalDay: 760,
    weightBasisLabel: 'Peso atual',
    energyProfileLabel: 'Cão adulto com atividade moderada',
    confidenceLabel: 'Moderada',
    methodSummary: 'Estimativa baseada no perfil energético selecionado.',
    muscleConditionLabel: 'Normal',
  },
}

/** Caso 2 — Gato em perda de peso com petiscos limitados. */
export const PDF_GOLDEN_CAT_WEIGHT_LOSS: StoredCalculationReport = {
  ...REPORT_V4_SAMPLE,
  id: 'pdf-golden-cat-weight-loss',
  patient: {
    ...REPORT_V4_SAMPLE.patient,
    name: 'Mimi',
    species: 'cat',
    sex: 'female',
    currentWeight: 5,
    bcs: 7,
    muscleCondition: 'mild_loss',
    dietHistory: {
      documented: true,
      treatsKcalPerDay: 25,
    },
  },
  target: {
    ...REPORT_V4_SAMPLE.target,
    goal: 'weight_loss',
    targetWeight: 4.2,
    targetEnergy: 180,
  },
  diet: {
    ...REPORT_V4_SAMPLE.diet,
    targetEnergy: 180,
    totalAsFedGrams: 48,
    gramsPerMeal: 24,
  },
  formula: {
    ...REPORT_V4_SAMPLE.formula,
    contributions: [
      {
        foodId: 'racao-gato-light',
        foodName: 'Ração gato light',
        inclusionPct: 100,
        gramsDryMatter: 43,
        gramsAsFed: 48,
        deliveredKcal: 180,
      },
    ],
    feedingPlan: {
      ...baseFeedingPlan,
      totalAsFedGrams: 48,
      meals: [
        { label: '1ª alimentação', time: '08:00', gramsAsFed: 24 },
        { label: '2ª alimentação', time: '20:00', gramsAsFed: 24 },
      ],
    },
  },
  clinicalRecord: {
    rerKcalDay: 200,
    maintenanceRangeMin: 220,
    maintenanceRangeMax: 260,
    prescribedKcalDay: 180,
    weightBasisLabel: 'Peso ideal',
    energyProfileLabel: 'Gato adulto castrado — meta AAHA',
    confidenceLabel: 'Moderada',
    methodSummary: 'Redução calórica controlada para emagrecimento.',
    muscleConditionLabel: 'Perda leve',
    targetWeightMethod: 'Peso-alvo estimado pela condição corporal',
  },
}

/** Caso 3 — Dieta caseira com vários ingredientes e transição. */
export const PDF_GOLDEN_HOMEMADE: StoredCalculationReport = {
  ...REPORT_V4_SAMPLE,
  id: 'pdf-golden-homemade',
  diet: {
    ...REPORT_V4_SAMPLE.diet,
    dietType: 'natural',
    totalAsFedGrams: 180,
  },
  formula: {
    ...REPORT_V4_SAMPLE.formula,
    contributions: [
      { foodId: 'frango', foodName: 'Peito de frango cozido, sem pele', inclusionPct: 45, gramsDryMatter: 70, gramsAsFed: 85, deliveredKcal: 140 },
      { foodId: 'arroz', foodName: 'Arroz branco cozido, sem sal', inclusionPct: 35, gramsDryMatter: 52, gramsAsFed: 60, deliveredKcal: 80 },
      { foodId: 'abobora', foodName: 'Abóbora-cabotiá cozida', inclusionPct: 15, gramsDryMatter: 8, gramsAsFed: 35, deliveredKcal: 12 },
      { foodId: 'balanceador', foodName: 'Suplemento balanceador', inclusionPct: 5, gramsDryMatter: 5, gramsAsFed: 5, deliveredKcal: 20 },
    ],
    feedingPlan: {
      ...baseFeedingPlan,
      totalAsFedGrams: 185,
      meals: [
        { label: '1ª alimentação', time: '08:00', gramsAsFed: 92 },
        { label: '2ª alimentação', time: '20:00', gramsAsFed: 93 },
      ],
    },
  },
  clinicalRecord: PDF_GOLDEN_HEALTHY_DOG.clinicalRecord,
}

/** Caso 4 — Gato com perfil renal e potássio não informado. */
export const PDF_GOLDEN_CKD_CAT: StoredCalculationReport = {
  ...PDF_GOLDEN_CAT_WEIGHT_LOSS,
  id: 'pdf-golden-ckd-cat',
  patient: {
    ...PDF_GOLDEN_CAT_WEIGHT_LOSS.patient,
    comorbidityIds: ['ckd_cat'],
    isHospitalized: false,
  },
  formula: {
    ...PDF_GOLDEN_CAT_WEIGHT_LOSS.formula,
    evaluation: {
      ...baseEvaluation,
      adequacy: [
        {
          key: 'phosphorusPct',
          label: 'Fósforo',
          profileId: 'renal',
          deliveredValue: 0.8,
          unit: 'g/dia',
          status: 'adequate',
          reason: 'Dentro da faixa proposta para perfil renal.',
          basisLabel: 'por dia',
          target: { raw: '0.6–1.0 g/dia' },
        },
        {
          key: 'potassiumPct',
          label: 'Potássio',
          profileId: 'renal',
          deliveredValue: null,
          unit: 'g/dia',
          status: 'insufficient_data',
          reason: 'Dados insuficientes para avaliação.',
          basisLabel: 'por dia',
          target: { raw: 'Conforme exames' },
        },
      ],
      missingDataFlags: ['Potássio', 'Sódio'],
    },
  },
  therapeuticReview: {
    activeProfileIds: ['ckd_cat'],
    ruleSetVersion: '2026.01',
    profiles: [
      {
        profileId: 'ckd_cat',
        profileName: 'Doença renal crônica felina',
        ruleSetVersion: '2026.01',
        status: 'caution',
        goals: [
          { label: 'Fósforo', status: 'match', messagePt: 'dentro da faixa proposta' },
          { label: 'Potássio', status: 'missing', messagePt: 'avaliação dependente dos exames' },
        ],
      },
    ],
    conflicts: [],
    monitoringRecommendations: ['Monitorar fósforo sérico e pressão arterial.'],
    overallStatus: 'caution',
  },
}

/** Caso 5 — Paciente hospitalizado com sonda. */
export const PDF_GOLDEN_HOSPITAL: StoredCalculationReport = {
  ...REPORT_V4_SAMPLE,
  id: 'pdf-golden-hospital',
  patient: {
    ...REPORT_V4_SAMPLE.patient,
    name: 'Luna',
    isHospitalized: true,
  },
  hospital: {
    feedingRoute: 'tube',
    refeedingRiskLevel: 'moderate',
    recentIntakePercent: 50,
    progressionProtocol: '4_days',
    progressionPlan: [{ day: 1, percentRER: 25, kcalTarget: 125 }],
  },
  energy: {
    ...REPORT_V4_SAMPLE.energy,
    rer: 500,
  },
  clinicalRecord: {
    rerKcalDay: 500,
    prescribedKcalDay: 125,
    weightBasisLabel: 'Peso atual',
    energyProfileLabel: 'Suporte hospitalar',
    confidenceLabel: 'Moderada',
    methodSummary: 'Realimentação enteral progressiva.',
  },
}

/** Caso 6 — Alto risco de realimentação (20% RER). */
export const PDF_GOLDEN_HIGH_RISK_REFEEDING: StoredCalculationReport = {
  ...PDF_GOLDEN_HOSPITAL,
  id: 'pdf-golden-high-risk-refeeding',
  hospital: {
    feedingRoute: 'tube',
    refeedingRiskLevel: 'high',
    recentIntakePercent: 0,
    daysAnorexic: 6,
    progressionProtocol: '4_days',
    progressionPlan: [{ day: 1, percentRER: 20, kcalTarget: 100 }],
    electrolytes: { phosphorus: 0.8, potassium: 0.9, magnesium: 0.7, glucose: 60 },
  },
  energy: {
    ...REPORT_V4_SAMPLE.energy,
    rer: 500,
  },
  clinicalRecord: {
    rerKcalDay: 500,
    prescribedKcalDay: 100,
    weightBasisLabel: 'Peso atual',
    energyProfileLabel: 'Realimentação cautelosa',
    confidenceLabel: 'Baixa',
    methodSummary: 'Início em 20% do RER com monitoramento eletrolítico.',
  },
}

export const PDF_GOLDEN_CASES = [
  { id: 'healthy-dog', report: PDF_GOLDEN_HEALTHY_DOG },
  { id: 'cat-weight-loss', report: PDF_GOLDEN_CAT_WEIGHT_LOSS },
  { id: 'homemade', report: PDF_GOLDEN_HOMEMADE },
  { id: 'ckd-cat', report: PDF_GOLDEN_CKD_CAT },
  { id: 'hospital', report: PDF_GOLDEN_HOSPITAL },
  { id: 'high-risk-refeeding', report: PDF_GOLDEN_HIGH_RISK_REFEEDING },
] as const

export function withTransitionRows(report: StoredCalculationReport): StoredCalculationReport {
  return report
}

export { withClinicalRecord }
