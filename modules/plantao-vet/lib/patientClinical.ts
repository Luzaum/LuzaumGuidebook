import {
  AppetiteLevel,
  ExamCategory,
  MedicationEntry,
  NutritionSupport,
  PatientExamRecord,
  PatientVitalsRecord,
  ShiftPatient,
} from '../types';

export function getActiveMedicationEntries(patient: ShiftPatient) {
  if (patient.medicationEntries.length > 0) {
    return patient.medicationEntries.filter((medication) => medication.status === 'active');
  }

  return patient.medicationsInUse.map<MedicationEntry>((name, index) => ({
    id: `legacy-${patient.id}-${index}`,
    name,
    dose: '',
    frequency: '',
    route: '',
    observations: '',
    status: 'active',
    startedAt: null,
    suspendedAt: null,
    createdAt: patient.createdAt,
    updatedAt: patient.updatedAt,
  }));
}

export function getLatestVitalsRecord(patient: ShiftPatient): PatientVitalsRecord | null {
  return [...patient.vitalsRecords].sort((left, right) => right.recordedAt.localeCompare(left.recordedAt))[0] || null;
}

export function getRecentExamRecords(patient: ShiftPatient, limit = 2): PatientExamRecord[] {
  return [...patient.examRecords].sort((left, right) => right.recordedAt.localeCompare(left.recordedAt)).slice(0, limit);
}

export function getLatestWeightLabel(patient: ShiftPatient) {
  return patient.nutritionSupport.currentWeight || patient.weightLabel || '';
}

export function getNutritionSummary(patient: ShiftPatient) {
  const nutrition = patient.nutritionSupport;
  const segments = [
    nutrition.dietType ? `Dieta: ${nutrition.dietType}` : '',
    nutrition.feedingRoute ? `Via: ${nutrition.feedingRoute}` : '',
    nutrition.ingestedPercentage ? `Ingestao: ${nutrition.ingestedPercentage}` : '',
    nutrition.fluidTherapy ? `Fluido: ${nutrition.fluidTherapy}` : '',
  ].filter(Boolean);

  return segments.join(' • ');
}

export function getExamCategoryLabel(category: ExamCategory) {
  switch (category) {
    case 'hemogram':
      return 'Hemograma';
    case 'biochemical':
      return 'Bioquimico';
    case 'electrolytes':
      return 'Eletrolitos';
    case 'urinalysis':
      return 'Urinalise';
    case 'blood_gas':
      return 'Gasometria';
    case 'imaging':
      return 'Imagem';
    case 'rapid':
      return 'Rapidos';
    case 'other':
    default:
      return 'Outros';
  }
}

export function getAppetiteLabel(value: AppetiteLevel) {
  switch (value) {
    case 'good':
      return 'Bom';
    case 'partial':
      return 'Parcial';
    case 'poor':
      return 'Baixo';
    case 'none':
      return 'Ausente';
    case 'unknown':
    default:
      return 'Nao informado';
  }
}

export function getTubeTypeLabel(type: NutritionSupport['tubeType']) {
  switch (type) {
    case 'nasoesophageal':
      return 'Nasoesofagica';
    case 'nasogastric':
      return 'Nasogastrica';
    case 'esophagostomy':
      return 'Esofagostomia';
    case 'gastrostomy':
      return 'Gastrostomia';
    case 'other':
      return 'Outra';
    case 'none':
    default:
      return 'Sem sonda';
  }
}

export function getVitalTrend(currentValue: string, previousValue: string) {
  const current = Number(currentValue.replace(',', '.'));
  const previous = Number(previousValue.replace(',', '.'));

  if (Number.isNaN(current) || Number.isNaN(previous) || current === previous) {
    return 'stable';
  }

  return current > previous ? 'up' : 'down';
}
