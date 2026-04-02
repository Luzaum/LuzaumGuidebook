import { jsPDF } from 'jspdf'
import type { StoredCalculationReport } from '../types'
import { getFoodById, getRequirementById } from './genutriData'
import { getHumanRequirementLabel } from './clinicalProfiles'
import { getPhysiologicStateById } from './nutrition'

function line(value?: string | null) {
  return value && value.trim() ? value.trim() : 'Nao informado'
}

function getSpeciesLabel(species?: string) {
  if (species === 'dog') return 'Cao'
  if (species === 'cat') return 'Gato'
  return 'Nao informado'
}

function getGoalLabel(goal?: string) {
  if (goal === 'weight_loss') return 'Perda de peso'
  if (goal === 'weight_gain') return 'Ganho de peso'
  return 'Manutencao'
}

function getDietTypeLabel(dietType?: string) {
  if (dietType === 'commercial') return 'Comercial'
  if (dietType === 'natural') return '100% natural'
  if (dietType === 'hybrid') return 'Hibrida'
  return 'Nao informado'
}

export function buildReportText(report: StoredCalculationReport) {
  const requirement = getRequirementById(report.diet.requirementProfileId)
  const physiologicStateLabel = getPhysiologicStateById(report.energy.stateId ?? '')?.label ?? 'Nao informado'
  const programmedFeeding = report.formula.programmedFeeding ?? report.diet.programmedFeeding

  const foods = report.formula.contributions.map((item) => {
    const food = getFoodById(item.foodId)
    const rawEntry = report.diet.entries.find((entry) => entry.foodId === item.foodId)
    return `${item.foodName}: ${rawEntry?.inclusionPct?.toFixed(1) ?? item.inclusionPct.toFixed(1)}%, ${item.gramsAsFed.toFixed(1)} g/dia, ${item.deliveredKcal.toFixed(1)} kcal/dia, categoria ${food?.categoryNormalized ?? 'nao cadastrada'}`
  })

  const programmedLines = programmedFeeding
    ? programmedFeeding.meals.flatMap((meal) => [
        `${meal.label} - ${meal.time} - total ${meal.totalGrams} g`,
        ...meal.items.map((item) => `  ${item.foodName}: ${item.gramsAsFed} g | Comeu? Sim/nao | Pesar sobra`),
      ])
    : ['Nao configurada']

  const sections = [
    'Vetius - NutricaoVET',
    '',
    `Data/Hora: ${new Date(report.createdAt).toLocaleString('pt-BR')}`,
    '',
    'Identificacao do paciente',
    `Paciente: ${line(report.patient.name)}`,
    `Tutor: ${line(report.patient.ownerName)}`,
    `Especie: ${getSpeciesLabel(report.patient.species)}`,
    `Sexo: ${report.patient.sex === 'female' ? 'Femea' : report.patient.sex === 'male' ? 'Macho' : 'Nao informado'}`,
    `Castrado: ${report.patient.isNeutered ? 'Sim' : 'Nao'}`,
    `Peso atual: ${report.patient.currentWeight != null ? `${report.patient.currentWeight.toFixed(2)} kg` : 'Nao informado'}`,
    `Peso usado: ${report.energy.weightUsed != null ? `${report.energy.weightUsed.toFixed(2)} kg` : 'Nao informado'}`,
    '',
    'Dados clinicos',
    `Estado fisiologico final: ${physiologicStateLabel}`,
    `Perfil clinico: ${getHumanRequirementLabel(requirement)}`,
    `Modo energia: ${report.energy.energyProfileMode === 'clinical' ? 'Clinica customizada' : 'FEDIAF oficial'}`,
    `Indoor: ${report.patient.isIndoor ? 'Sim' : 'Nao'}`,
    `Hospitalizado: ${report.patient.isHospitalized ? 'Sim' : 'Nao'}`,
    '',
    'Calculo energetico',
    `RER: ${report.energy.rer != null ? `${report.energy.rer.toFixed(1)} kcal/dia` : 'Nao informado'}`,
    `Energia final estimada: ${report.energy.mer != null ? `${report.energy.mer.toFixed(1)} kcal/dia` : 'Nao informado'}`,
    `Energia-alvo: ${report.target.targetEnergy != null ? `${report.target.targetEnergy.toFixed(1)} kcal/dia` : 'Nao informado'}`,
    `Horas de atividade: ${report.energy.activityHoursPerDay != null ? report.energy.activityHoursPerDay.toFixed(1) : 'Nao informado'}`,
    `Impacto da atividade: ${report.energy.activityImpact === 'high' ? 'Alto impacto' : report.energy.activityImpact === 'low' ? 'Baixo impacto' : 'Nao informado'}`,
    `Predisposicao a obesidade: ${report.energy.obesityProne ? 'Sim' : 'Nao'}`,
    '',
    'Meta nutricional',
    `Objetivo: ${getGoalLabel(report.target.goal)}`,
    `Peso-alvo: ${report.target.targetWeight != null ? `${report.target.targetWeight.toFixed(2)} kg` : 'Nao informado'}`,
    `Diferenca de peso: ${report.target.targetWeight != null && report.patient.currentWeight != null ? `${(report.target.targetWeight - report.patient.currentWeight).toFixed(2)} kg` : 'Nao informado'}`,
    '',
    'Plano alimentar',
    `Tipo de dieta: ${getDietTypeLabel(report.diet.dietType)}`,
    `Modo de formulacao: ${report.diet.formulationMode === 'complement' ? 'Complementar outras %' : 'Manual'}`,
    `Refeicoes por dia: ${report.diet.mealsPerDay}`,
    `Quantidade por refeicao: ${report.diet.gramsPerMeal != null ? `${report.diet.gramsPerMeal.toFixed(1)} g` : 'Nao informado'}`,
    '',
    'Alimentos selecionados',
    ...foods,
    '',
    'Resumo nutricional',
    `Energia entregue: ${report.diet.targetEnergy != null ? `${report.diet.targetEnergy.toFixed(1)} kcal/dia` : 'Nao informado'}`,
    `Proteina: ${report.formula.evaluation.totalDelivered.crudeProteinPct != null ? `${report.formula.evaluation.totalDelivered.crudeProteinPct.toFixed(2)} g/dia` : 'Nao informado'}`,
    `Gordura: ${report.formula.evaluation.totalDelivered.etherExtractPct != null ? `${report.formula.evaluation.totalDelivered.etherExtractPct.toFixed(2)} g/dia` : 'Nao informado'}`,
    `Carboidrato: ${report.formula.evaluation.totalDelivered.nitrogenFreeExtractPct != null ? `${report.formula.evaluation.totalDelivered.nitrogenFreeExtractPct.toFixed(2)} g/dia` : 'Nao informado'}`,
    `Fibra: ${report.formula.evaluation.totalDelivered.crudeFiberPct != null ? `${report.formula.evaluation.totalDelivered.crudeFiberPct.toFixed(2)} g/dia` : 'Nao informado'}`,
    '',
    'Particao energetica',
    ...report.formula.evaluation.macroSplit.map((item) => `${item.label}: ${item.percent.toFixed(1)}% (${item.grams.toFixed(1)} g)`),
    '',
    'Contribuicao por alimento',
    ...report.formula.contributions.map((item) => `${item.foodName}: ${item.gramsAsFed.toFixed(1)} g/dia | ${item.deliveredKcal.toFixed(1)} kcal/dia`),
    '',
    'FICHA DE ALIMENTACAO',
    `Animal: ${line(report.patient.name)}`,
    `Numero de alimentacoes: ${programmedFeeding?.mealsPerDay ?? 'Nao informado'}`,
    ...programmedLines,
    '',
    'Observacoes finais',
    ...report.formula.feedingPlan.instructions,
    '',
    'Documento gerado por Vetius NutricaoVET',
  ]

  return sections.join('\n')
}

export function exportReportPdf(report: StoredCalculationReport) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const text = buildReportText(report)
  const lines = doc.splitTextToSize(text, 180)
  let cursorY = 16

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)

  for (const outputLine of lines) {
    if (cursorY > 280) {
      doc.addPage()
      cursorY = 16
    }
    doc.text(outputLine, 15, cursorY)
    cursorY += 6
  }

  const patientName = line(report.patient.name).replace(/[^a-zA-Z0-9-_]+/g, '_')
  doc.save(`energia-vet_${patientName}_${new Date(report.createdAt).toISOString().slice(0, 10)}.pdf`)
}
