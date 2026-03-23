import { CalculationInput, CalculationResult } from '../shared/types/calculation';
import { DrugAlert } from '../shared/types/drug';

export interface SafetyEvaluation {
  alerts: DrugAlert[];
  warnings: string[];
}

export const evaluateSafety = (input: CalculationInput, result: CalculationResult): SafetyEvaluation => {
  const alerts: DrugAlert[] = [];
  const warnings: string[] = [];

  input.drug.alerts.forEach((alert) => {
    if (alert.condition(input.patient, input.dose, input.doseUnit, input.diluent, input.accessType)) {
      alerts.push(alert);
    }
  });

  if (input.diluent !== 'Nenhum') {
    if (input.drug.safetyMetadata.notRecommendedDiluents.includes(input.diluent)) {
      warnings.push(`INCOMPATIBILIDADE: ${input.drug.namePt} nao e recomendado com ${input.diluent}.`);
    } else if (!input.drug.safetyMetadata.allowedDiluents.includes(input.diluent)) {
      warnings.push(`Atencao: ${input.diluent} nao esta na lista de diluentes permitidos para ${input.drug.namePt}.`);
    } else if (input.diluent !== input.drug.safetyMetadata.preferredDiluent) {
      warnings.push(`Nota: O diluente preferencial para ${input.drug.namePt} e ${input.drug.safetyMetadata.preferredDiluent}.`);
    }
  }

  if (!result.isImpossible) {
    if (result.drugVolume < 0.05) {
      alerts.push({
        id: 'very-small-drug-volume',
        condition: () => true,
        message: `Volume de farmaco extremamente pequeno (${result.drugVolume.toFixed(2)} mL). Revise taxa da bomba, volume do preparo ou estrategia para reduzir risco de erro de aspiracao.`,
        level: 'danger',
      });
    } else if (result.drugVolume < 0.1) {
      warnings.push(
        `Volume de farmaco muito pequeno (${result.drugVolume.toFixed(2)} mL). Risco de erro de aspiracao. Considere pre-diluicao ou aumentar o volume total da solucao.`,
      );
    }

    if (result.diluentVolume < 0) {
      warnings.push('Volume de diluente negativo. O volume de farmaco excede o volume total desejado.');
    }
  }

  if (input.drug.safetyMetadata.centralAccessRequired && input.accessType !== 'central') {
    alerts.push({
      id: 'central-access-required',
      condition: () => true,
      message: `ACESSO CENTRAL OBRIGATORIO: ${input.drug.namePt} deve ser administrado em via central.`,
      level: 'danger',
    });
  } else if (input.drug.safetyMetadata.centralAccessPreferred && input.accessType !== 'central') {
    warnings.push(`Acesso central e preferivel para a administracao de ${input.drug.namePt}.`);
  }

  if (input.drug.safetyMetadata.syringePumpRequired && input.pumpType !== 'syringe') {
    warnings.push(`Bomba de seringa e fortemente recomendada para maior precisao com ${input.drug.namePt}.`);
  }

  if (input.drug.safetyMetadata.photosensitive) {
    warnings.push('FOTOPROTECAO: Este farmaco requer equipo e bolsa fotoprotetores.');
  }

  if (input.drug.safetyMetadata.dedicatedLineRequired) {
    warnings.push('LINHA DEDICADA: Recomenda-se administrar este farmaco em via exclusiva.');
  }

  return { alerts, warnings };
};
