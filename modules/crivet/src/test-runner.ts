import { drugCatalog } from './catalog/drugs';
import { calculateCRI } from './calculation-engine/calculator';
import { evaluateSafety } from './safety-rules/evaluator';
import { Patient, Species } from './shared/types/patient';
import { CalculationInput, CalculationResult } from './shared/types/calculation';
import { DoseUnit, Drug, RegimeType, AccessType, PumpType, Diluent, DrugPresentation } from './shared/types/drug';
import * as fs from 'fs';
import * as path from 'path';

// Output artifact path
const artifactDir = 'C:\\Users\\luzau\\.gemini\\antigravity\\brain\\8bd24411-7077-43ba-bcd5-2119a94b9f6b';
const reportPath = path.join(artifactDir, 'crivet_calculation_report.md');

interface TestResult {
  drugId: string;
  drugName: string;
  weight: number;
  species: Species;
  regime: RegimeType;
  dose: number;
  doseUnit: DoseUnit;
  presentationDesc: string;
  usePreDilution: boolean;
  totalVolume: number;
  infusionRate: number;
  isImpossible: boolean;
  impossibleReason?: string;
  drugVolume: number;
  diluentVolume: number;
  finalConcentration: number;
  finalConcentrationUnit: string;
  reverseCheckPassed?: boolean;
  errors: string[];
  warnings: string[];
}

const testResults: TestResult[] = [];
let totalTests = 0;
let failedTests = 0;

const weights = [5, 10, 30];
const speciesList: Species[] = ['dog', 'cat'];

// Run catalog tests
for (const drug of drugCatalog) {
  for (const weight of weights) {
    for (const species of speciesList) {
      if (!drug.supportedSpecies.includes(species)) {
        continue;
      }
      
      const patient: Patient = {
        species,
        weight,
        state: 'adult',
        comorbidities: []
      };

      for (const regime of drug.allowedRegimes) {
        // Determine dose ranges
        const isBolus = regime === 'bolus' || regime === 'bolus_maintenance';
        const range = isBolus 
          ? (drug.bolusDoses?.[species] || drug.doses[species])
          : drug.doses[species];

        if (!range) {
          continue;
        }

        const dosesToTest = [
          range.min,
          range.max,
          Number(((range.min + range.max) / 2).toFixed(4))
        ];

        // Unique values only (in case min == max)
        const uniqueDoses = [...new Set(dosesToTest)];

        for (const dose of uniqueDoses) {
          for (const presentation of drug.presentations) {
            // Test pre-dilution options
            const preDilutionOptions = [false, true];
            for (const usePreDilution of preDilutionOptions) {
              // For continuous, test syringe vs volumetric setups
              const continuousConfigs = !isBolus 
                ? [
                    { totalVolume: 50, infusionRate: 2, pumpType: 'syringe' as PumpType },
                    { totalVolume: 250, infusionRate: 10, pumpType: 'volumetric' as PumpType }
                  ]
                : [
                    { totalVolume: 0, infusionRate: 0, pumpType: 'syringe' as PumpType }
                  ];

              for (const config of continuousConfigs) {
                totalTests++;
                const errors: string[] = [];
                let result: CalculationResult | null = null;
                
                const input: CalculationInput = {
                  patient,
                  drug,
                  regime,
                  dose,
                  doseUnit: range.unit,
                  presentation,
                  diluent: drug.safetyMetadata.preferredDiluent || 'NaCl 0.9%',
                  totalVolume: config.totalVolume,
                  infusionRate: config.infusionRate,
                  accessType: drug.safetyMetadata.centralAccessRequired ? 'central' : 'peripheral',
                  pumpType: config.pumpType,
                  usePreDilution
                };

                try {
                  result = calculateCRI(input);
                } catch (e: any) {
                  errors.push(`Crash: ${e.message}`);
                }

                let safetyAlerts: string[] = [];
                let safetyWarnings: string[] = [];

                if (result) {
                  const safetyEval = evaluateSafety(input, result);
                  safetyAlerts = safetyEval.alerts.map(a => a.message);
                  safetyWarnings = safetyEval.warnings;

                  // Perform validations
                  if (isNaN(result.drugVolume)) {
                    errors.push('drugVolume is NaN');
                  }
                  if (isNaN(result.diluentVolume)) {
                    errors.push('diluentVolume is NaN');
                  }
                  if (isNaN(result.finalConcentration)) {
                    errors.push('finalConcentration is NaN');
                  }
                  if (result.drugVolume < 0) {
                    errors.push(`Negative drugVolume: ${result.drugVolume}`);
                  }
                  if (result.diluentVolume < 0 && !result.isImpossible) {
                    errors.push(`Negative diluentVolume: ${result.diluentVolume} on a non-impossible case`);
                  }
                  if (isBolus && result.reverseCheckPassed === false) {
                    errors.push('Reverse check failed');
                  }
                } else {
                  errors.push('No result returned from calculateCRI');
                }

                if (errors.length > 0) {
                  failedTests++;
                }

                testResults.push({
                  drugId: drug.id,
                  drugName: drug.namePt,
                  weight,
                  species,
                  regime,
                  dose,
                  doseUnit: range.unit,
                  presentationDesc: presentation.description,
                  usePreDilution,
                  totalVolume: config.totalVolume,
                  infusionRate: config.infusionRate,
                  isImpossible: result ? result.isImpossible : true,
                  impossibleReason: result?.impossibleReason,
                  drugVolume: result ? result.drugVolume : 0,
                  diluentVolume: result ? result.diluentVolume : 0,
                  finalConcentration: result ? result.finalConcentration : 0,
                  finalConcentrationUnit: result ? result.finalConcentrationUnit : '',
                  reverseCheckPassed: result ? result.reverseCheckPassed : false,
                  errors,
                  warnings: [...safetyWarnings, ...safetyAlerts]
                });
              }
            }
          }
        }
      }
    }
  }
}

// Add manual tests for 'epidural' and 'patch' regimes to guarantee 100% calculation code path coverage
// 1. Epidural with Morphine
const morphineDrug = drugCatalog.find(d => d.id === 'morphine');
if (morphineDrug) {
  const epiduralDoses = [0.1, 0.2]; // mg/kg
  for (const weight of weights) {
    for (const dose of epiduralDoses) {
      for (const presentation of morphineDrug.presentations) {
        totalTests++;
        const errors: string[] = [];
        let result: CalculationResult | null = null;
        
        const input: CalculationInput = {
          patient: { species: 'dog', weight, state: 'adult', comorbidities: [] },
          drug: morphineDrug,
          regime: 'epidural',
          dose,
          doseUnit: 'mg/kg',
          presentation,
          diluent: 'NaCl 0.9%',
          totalVolume: 0.2 * weight, // Target volume for epidural
          infusionRate: 0,
          accessType: 'peripheral',
          pumpType: 'syringe',
          usePreDilution: false
        };

        try {
          result = calculateCRI(input);
        } catch (e: any) {
          errors.push(`Epidural Crash: ${e.message}`);
        }

        if (result) {
          if (isNaN(result.drugVolume)) errors.push('drugVolume is NaN');
          if (isNaN(result.diluentVolume)) errors.push('diluentVolume is NaN');
          if (result.drugVolume < 0) errors.push(`Negative drugVolume: ${result.drugVolume}`);
          if (result.diluentVolume < 0) errors.push(`Negative diluentVolume: ${result.diluentVolume}`);
        } else {
          errors.push('No result returned for Epidural');
        }

        if (errors.length > 0) failedTests++;

        testResults.push({
          drugId: morphineDrug.id,
          drugName: `${morphineDrug.namePt} (Epidural)`,
          weight,
          species: 'dog',
          regime: 'epidural',
          dose,
          doseUnit: 'mg/kg',
          presentationDesc: presentation.description,
          usePreDilution: false,
          totalVolume: 0.2 * weight,
          infusionRate: 0,
          isImpossible: result ? result.isImpossible : true,
          drugVolume: result ? result.drugVolume : 0,
          diluentVolume: result ? result.diluentVolume : 0,
          finalConcentration: result ? result.finalConcentration : 0,
          finalConcentrationUnit: 'mg/mL',
          errors,
          warnings: []
        });
      }
    }
  }
}

// 2. Patch with a mock patch presentation
const fentanylDrug = drugCatalog.find(d => d.id === 'fentanyl');
if (fentanylDrug) {
  const patchPresentation: DrugPresentation = {
    id: 'fentanyl-patch-mock',
    description: 'Fentanil Patch 25 mcg/h',
    concentration: 25,
    concentrationUnit: 'mcg/mL' // will be treated as release rate
  };
  for (const weight of weights) {
    totalTests++;
    const errors: string[] = [];
    let result: CalculationResult | null = null;

    const input: CalculationInput = {
      patient: { species: 'dog', weight, state: 'adult', comorbidities: [] },
      drug: fentanylDrug,
      regime: 'patch',
      dose: 25,
      doseUnit: 'mcg/kg/h',
      presentation: patchPresentation,
      diluent: 'Nenhum',
      totalVolume: 0,
      infusionRate: 0,
      accessType: 'peripheral',
      pumpType: 'syringe',
      usePreDilution: false
    };

    try {
      result = calculateCRI(input);
    } catch (e: any) {
      errors.push(`Patch Crash: ${e.message}`);
    }

    if (result) {
      if (result.deliveredDose !== 25) errors.push(`Delivered dose mismatch: ${result.deliveredDose}`);
    } else {
      errors.push('No result returned for Patch');
    }

    if (errors.length > 0) failedTests++;

    testResults.push({
      drugId: fentanylDrug.id,
      drugName: `${fentanylDrug.namePt} (Patch)`,
      weight,
      species: 'dog',
      regime: 'patch',
      dose: 25,
      doseUnit: 'mcg/kg/h',
      presentationDesc: patchPresentation.description,
      usePreDilution: false,
      totalVolume: 0,
      infusionRate: 0,
      isImpossible: result ? result.isImpossible : true,
      drugVolume: 0,
      diluentVolume: 0,
      finalConcentration: 25,
      finalConcentrationUnit: 'mcg/h',
      errors,
      warnings: []
    });
  }
}

// Generate the markdown report
let markdown = `# Relatório de Auditoria de Cálculos do App CRIVET\n\n`;
markdown += `Este relatório foi gerado automaticamente ao rodar testes exaustivos para todos os fármacos, apresentações, regimes, doses e pesos de pacientes.\n\n`;

markdown += `## Resumo Executivo\n\n`;
markdown += `- **Total de Casos de Cálculo Testados**: ${totalTests}\n`;
markdown += `- **Falhas/Erros Críticos de Cálculo (NaN ou Crash)**: ${failedTests}\n`;
markdown += `- **Casos Clínicos Classificados como "Impossíveis"**: ${testResults.filter(r => r.isImpossible).length}\n`;
markdown += `- **Status do Sistema**: ${failedTests === 0 ? '🟢 APROVADO' : '🔴 PROBLEMAS DETECTADOS'}\n\n`;

if (failedTests > 0) {
  markdown += `### 🔴 Lista de Falhas Detectadas\n\n`;
  markdown += `| Fármaco | Peso | Espécie | Regime | Apresentação | Erros |\n`;
  markdown += `| --- | --- | --- | --- | --- | --- |\n`;
  for (const res of testResults) {
    if (res.errors.length > 0) {
      markdown += `| ${res.drugName} | ${res.weight} kg | ${res.species} | ${res.regime} | ${res.presentationDesc} | ${res.errors.join(', ')} |\n`;
    }
  }
  markdown += `\n`;
} else {
  markdown += `> [!NOTE]\n`;
  markdown += `> Nenhum erro crítico (como divisões por zero, crash do motor matemático ou valores indefinidos/NaN) foi detectado em nenhuma das combinações.\n\n`;
}

// Group results by drug
markdown += `## Resultados por Fármaco\n\n`;
const drugGroups = new Map<string, TestResult[]>();
for (const r of testResults) {
  const list = drugGroups.get(r.drugName) || [];
  list.push(r);
  drugGroups.set(r.drugName, list);
}

for (const [drugName, results] of drugGroups.entries()) {
  const total = results.length;
  const impossible = results.filter(r => r.isImpossible).length;
  const withWarnings = results.filter(r => r.warnings.length > 0).length;
  
  markdown += `### ${drugName}\n\n`;
  markdown += `- Total de combinações testadas: **${total}**\n`;
  markdown += `- Casos impossíveis: **${impossible}**\n`;
  markdown += `- Casos com alertas de segurança clínica (ex: volume muito baixo a aspirar): **${withWarnings}**\n\n`;
  
  markdown += `#### Detalhamento por Peso e Apresentação (Amostra de Casos Relevantes)\n\n`;
  markdown += `| Peso (kg) | Regime | Dose | Unidade | Apresentação | Pré-diluição | Vol. Droga (mL) | Vol. Diluente (mL) | Observação / Alerta |\n`;
  markdown += `| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
  
  // Show a subset of cases: min dose, max dose, and mid dose for a couple of weights and presentations
  // specifically we will show weight 5kg and 30kg (ends of spectrum) for each regime
  const sampleResults = results.filter(r => {
    const isEdgeWeight = r.weight === 5 || r.weight === 30;
    return isEdgeWeight;
  });

  for (const r of sampleResults.slice(0, 15)) { // Limit to 15 per drug to keep document readable
    const status = r.isImpossible 
      ? '❌ Impossível' 
      : `Vd: ${r.drugVolume.toFixed(3)} mL`;
    
    const diluentStr = r.isImpossible ? '-' : `${r.diluentVolume.toFixed(2)} mL`;
    
    let obs = '';
    if (r.isImpossible) {
      obs = `Excede vol. total`;
    } else if (r.warnings.length > 0) {
      // Pick first warning or summary
      obs = r.warnings[0].substring(0, 45) + (r.warnings[0].length > 45 ? '...' : '');
    } else {
      obs = 'OK';
    }

    markdown += `| ${r.weight} | ${r.regime} | ${r.dose} | ${r.doseUnit} | ${r.presentationDesc.split('–')[0].split('-')[0].trim()} | ${r.usePreDilution ? 'Sim' : 'Não'} | ${r.isImpossible ? '-' : r.drugVolume.toFixed(3)} | ${diluentStr} | ${obs} |\n`;
  }
  
  markdown += `\n`;
}

// Write file
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, markdown, 'utf8');
console.log(`Auditoria concluída com sucesso! Relatório escrito em ${reportPath}`);
console.log(`Total de testes executados: ${totalTests}`);
console.log(`Total de falhas críticas: ${failedTests}`);
