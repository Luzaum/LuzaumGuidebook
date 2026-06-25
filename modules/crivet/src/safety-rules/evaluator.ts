import { CalculationInput, CalculationResult } from '../shared/types/calculation';
import { DrugAlert } from '../shared/types/drug';
import { getDrugById } from '../catalog/drugs';

export interface SafetyEvaluation {
  alerts: DrugAlert[];
  warnings: string[];
}

export const evaluateSafety = (input: CalculationInput, result: CalculationResult): SafetyEvaluation => {
  const alerts: DrugAlert[] = [];
  const warnings: string[] = [];

  const catalogDrug = getDrugById(input.drug.id);

  (input.drug.alerts || []).forEach((alert) => {
    let conditionFn = alert.condition;
    
    // Recover condition function if lost during JSON serialization/deserialization
    if (typeof conditionFn !== 'function' && catalogDrug) {
      const catalogAlert = catalogDrug.alerts.find((a) => a.id === alert.id);
      if (catalogAlert && typeof catalogAlert.condition === 'function') {
        conditionFn = catalogAlert.condition;
      }
    }

    if (typeof conditionFn === 'function') {
      try {
        if (conditionFn(input.patient, input.dose, input.doseUnit, input.diluent, input.accessType)) {
          alerts.push(alert);
        }
      } catch (e) {
        console.error(`Error evaluating condition for alert ${alert.id}:`, e);
      }
    }
  });

  if (input.diluent !== 'Nenhum') {
    if (input.drug.safetyMetadata.notRecommendedDiluents.includes(input.diluent)) {
      warnings.push(`INCOMPATIBILIDADE: ${input.drug.namePt} não é recomendado com ${input.diluent}.`);
    } else if (!input.drug.safetyMetadata.allowedDiluents.includes(input.diluent)) {
      warnings.push(`Atenção: ${input.diluent} não está na lista de diluentes permitidos para ${input.drug.namePt}.`);
    } else if (input.diluent !== input.drug.safetyMetadata.preferredDiluent) {
      warnings.push(`Nota: O diluente preferencial para ${input.drug.namePt} é ${input.drug.safetyMetadata.preferredDiluent}.`);
    }
  }

  if (!result.isImpossible) {
    if (result.drugVolume < 0.05) {
      alerts.push({
        id: 'very-small-drug-volume',
        condition: () => true,
        message: `Volume de fármaco extremamente pequeno (${result.drugVolume.toFixed(2)} mL). Revise taxa da bomba, volume do preparo ou estratégia para reduzir risco de erro de aspiração.`,
        level: 'danger',
      });
    } else if (result.drugVolume < 0.1) {
      warnings.push(
        `Volume de fármaco muito pequeno (${result.drugVolume.toFixed(2)} mL). Risco de erro de aspiração. Considere pré-diluição ou aumentar o volume total da solução.`,
      );
    }

    if (result.diluentVolume < 0) {
      warnings.push('Volume de diluente negativo. O volume de fármaco excede o volume total desejado.');
    }
  }

  if (input.drug.safetyMetadata.centralAccessRequired && input.accessType !== 'central') {
    alerts.push({
      id: 'central-access-required',
      condition: () => true,
      message: `ACESSO CENTRAL OBRIGATÓRIO: ${input.drug.namePt} deve ser administrado em via central.`,
      level: 'danger',
    });
  } else if (input.drug.safetyMetadata.centralAccessPreferred && input.accessType !== 'central') {
    warnings.push(`Acesso central é preferível para a administração de ${input.drug.namePt}.`);
  }

  if (input.drug.safetyMetadata.syringePumpRequired && input.pumpType !== 'syringe') {
    warnings.push(`Bomba de seringa é fortemente recomendada para maior precisão com ${input.drug.namePt}.`);
  }

  if (input.drug.safetyMetadata.photosensitive) {
    warnings.push('FOTOPROTEÇÃO: Este fármaco requer equipo e bolsa fotoprotetores.');
  }

  if (input.drug.safetyMetadata.dedicatedLineRequired) {
    warnings.push('LINHA DEDICADA: Recomenda-se administrar este fármaco em via exclusiva.');
  }

  return { alerts, warnings };
};
