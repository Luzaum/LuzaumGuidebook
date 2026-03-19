/**
 * Validation script for calculatePracticalEquivalent v2
 * Run: npx tsx scripts/validate-rxUiHelpers.ts
 */

import {
  calculatePracticalEquivalent,
  type PracticalEquivalentInput,
  type PracticalEquivalentResult,
  type Presentation,
} from '../modules/receituario-vet/rxUiHelpers';

interface TestCase {
  name: string;
  input: PracticalEquivalentInput;
  expected: {
    success: boolean;
    equivalentValue?: number;
    labelContains?: string;
    alert?: boolean; // true = should have alert, false = no alert
    alertSeverity?: string;
    reasonCode?: string;
    pharmacyLabel?: string;
  };
}

const CASES: TestCase[] = [
  // ---- Exemplo 1: Comprimido simples — fração exata 1/4 ----
  {
    name: '57 mg/comp, dose 14.25 mg → 1/4 comprimido',
    input: {
      totalDosePerAdmin: 14.25,
      doseUnit: 'mg',
      presentation: {
        value: 57, value_unit: 'mg',
        per_value: 1, per_unit: 'comprimido',
        pharmaceutical_form: 'Comprimido',
        pharmacy_veterinary: true,
      },
    },
    expected: {
      success: true,
      equivalentValue: 0.25,
      labelContains: '1/4 comprimido',
      alert: false,
      pharmacyLabel: 'Veterinária',
    },
  },
  // ---- Exemplo 2: Líquido com per_value > 1 ----
  {
    name: '20 mg/5 mL, dose 10 mg → 2,5 mL',
    input: {
      totalDosePerAdmin: 10,
      doseUnit: 'mg',
      presentation: {
        value: 20, value_unit: 'mg',
        per_value: 5, per_unit: 'mL',
        pharmaceutical_form: 'Suspensão oral',
      },
    },
    expected: {
      success: true,
      equivalentValue: 2.5,
      labelContains: '2,50 mL',
      alert: false,
    },
  },
  // ---- Exemplo 3: Cápsula sem arredondamento ----
  {
    name: '100 mg/cáps, dose 40 mg → 0,4 cáps (teórico) + alerta danger',
    input: {
      totalDosePerAdmin: 40,
      doseUnit: 'mg',
      presentation: {
        value: 100, value_unit: 'mg',
        per_value: 1, per_unit: 'cápsula',
        pharmaceutical_form: 'Cápsula',
        pharmacy_human: true,
      },
    },
    expected: {
      success: true,
      equivalentValue: 0.4,
      labelContains: 'teórico',
      alert: true,
      alertSeverity: 'danger',
      pharmacyLabel: 'Humana',
    },
  },
  // ---- Exemplo 4: Comprimido fração < 1/4 ----
  {
    name: '227 mg/comp, dose 45 mg → ~ 0.198 comprimido + alerta warning',
    input: {
      totalDosePerAdmin: 45,
      doseUnit: 'mg',
      presentation: {
        value: 227, value_unit: 'mg',
        per_value: 1, per_unit: 'comprimido',
        pharmaceutical_form: 'Comprimido',
      },
    },
    expected: {
      success: true,
      equivalentValue: 45 / 227,
      labelContains: 'comprimido',
      alert: true,
      alertSeverity: 'warning',
    },
  },
  // ---- Exemplo 5: Conversão mcg → mg ----
  {
    name: '500 mcg dose vs 0.5 mg/comp → 1 comprimido',
    input: {
      totalDosePerAdmin: 500,
      doseUnit: 'mcg',
      presentation: {
        value: 0.5, value_unit: 'mg',
        per_value: 1, per_unit: 'comprimido',
        pharmaceutical_form: 'Comprimido',
      },
    },
    expected: {
      success: true,
      equivalentValue: 1.0,
      labelContains: '1 comprimido',
      alert: false,
    },
  },
  // ---- Exemplo 6: Unidades incompatíveis ----
  {
    name: 'UI vs mg → incompatível → success: false',
    input: {
      totalDosePerAdmin: 100,
      doseUnit: 'UI',
      presentation: {
        value: 50, value_unit: 'mg',
        per_value: 1, per_unit: 'comprimido',
        pharmaceutical_form: 'Comprimido',
      },
    },
    expected: {
      success: false,
      reasonCode: 'unit_mismatch',
    },
  },
  // ---- Exemplo 7: Gotas (líquido) com volume pequeno ----
  {
    name: '500 mg/mL gotas, dose 25 mg → 0,05 mL + alerta info (volume pequeno)',
    input: {
      totalDosePerAdmin: 25,
      doseUnit: 'mg',
      presentation: {
        value: 500, value_unit: 'mg',
        per_value: 1, per_unit: 'mL',
        pharmaceutical_form: 'Gotas',
      },
    },
    expected: {
      success: true,
      equivalentValue: 0.05,
      labelContains: '0,05',
      alert: true,
      alertSeverity: 'info',
    },
  },
  // ---- Exemplo 8 (novo): Divisão pouco prática ----
  {
    name: 'Comprimido 100 mg, dose 33 mg → 0,33 comp → alerta divisão impraticável',
    input: {
      totalDosePerAdmin: 33,
      doseUnit: 'mg',
      presentation: {
        value: 100, value_unit: 'mg',
        per_value: 1, per_unit: 'comprimido',
        pharmaceutical_form: 'Comprimido',
      },
    },
    expected: {
      success: true,
      equivalentValue: 0.33,
      labelContains: 'comprimido',
      alert: true,
      alertSeverity: 'info',
    },
  },
  // ---- Exemplo 9 (novo): 1,67 comprimidos — impraticável ----
  {
    name: 'Comprimido 150 mg, dose 250 mg → 1,67 comp → alerta divisão impraticável',
    input: {
      totalDosePerAdmin: 250,
      doseUnit: 'mg',
      presentation: {
        value: 150, value_unit: 'mg',
        per_value: 1, per_unit: 'comprimido',
        pharmaceutical_form: 'Comprimido',
      },
    },
    expected: {
      success: true,
      labelContains: 'comprimido',
      alert: true,
      alertSeverity: 'info',
    },
  },
  // ---- Exemplo 10: Cápsula exata (sem alerta) ----
  {
    name: '50 mg/cáps, dose 100 mg → 2 cápsulas, sem alerta',
    input: {
      totalDosePerAdmin: 100,
      doseUnit: 'mg',
      presentation: {
        value: 50, value_unit: 'mg',
        per_value: 1, per_unit: 'cápsula',
        pharmaceutical_form: 'Cápsula',
      },
    },
    expected: {
      success: true,
      equivalentValue: 2,
      labelContains: '2 cápsulas',
      alert: false,
    },
  },
  // ---- Exemplo 11: Manipulado label ----
  {
    name: 'Label farmácia: Manipulado',
    input: {
      totalDosePerAdmin: 50,
      doseUnit: 'mg',
      presentation: {
        value: 50, value_unit: 'mg',
        per_value: 1, per_unit: 'cápsula',
        pharmaceutical_form: 'Cápsula',
        pharmacy_compounding: true,
      },
    },
    expected: {
      success: true,
      pharmacyLabel: 'Manipulado',
    },
  },
  // ---- Exemplo 12: Missing strength ----
  {
    name: 'Apresentação sem value → missing_presentation_strength',
    input: {
      totalDosePerAdmin: 50,
      doseUnit: 'mg',
      presentation: {
        value: null, value_unit: 'mg',
        per_value: 1, per_unit: 'comprimido',
        pharmaceutical_form: 'Comprimido',
      },
    },
    expected: {
      success: false,
      reasonCode: 'missing_presentation_strength',
    },
  },
  // ---- Exemplo 13: Líquido per_value=5 com round_ml_to ----
  {
    name: '40mg/2mL, dose 15mg → 0,75 mL (precisão fine)',
    input: {
      totalDosePerAdmin: 15,
      doseUnit: 'mg',
      presentation: {
        value: 40, value_unit: 'mg',
        per_value: 2, per_unit: 'mL',
        pharmaceutical_form: 'Solução injetável',
        metadata: { dose_engine: { round_ml_to: 0.1 } },
      },
    },
    expected: {
      success: true,
      equivalentValue: 0.75, // 15 / (40/2) = 15/20 = 0.75
      labelContains: '0,8', // rounded to 0.1
      alert: false,
    },
  },
];

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

let passed = 0;
let failed = 0;

for (const tc of CASES) {
  const result = calculatePracticalEquivalent(tc.input);
  const errors: string[] = [];

  // Check success
  if (result.success !== tc.expected.success) {
    errors.push(`success: expected ${tc.expected.success}, got ${result.success}`);
  }

  // Check equivalentValue (with tolerance)
  if (tc.expected.equivalentValue !== undefined) {
    if (Math.abs(result.equivalentValue - tc.expected.equivalentValue) > 0.02) {
      errors.push(`equivalentValue: expected ~${tc.expected.equivalentValue}, got ${result.equivalentValue}`);
    }
  }

  // Check label
  if (tc.expected.labelContains) {
    if (!result.label.includes(tc.expected.labelContains)) {
      errors.push(`label: expected to contain '${tc.expected.labelContains}', got '${result.label}'`);
    }
  }

  // Check alert presence
  if (tc.expected.alert === true && !result.alert) {
    errors.push(`alert: expected an alert but got none`);
  }
  if (tc.expected.alert === false && result.alert) {
    errors.push(`alert: expected NO alert but got '${result.alert}'`);
  }

  // Check alertSeverity
  if (tc.expected.alertSeverity && result.alertSeverity !== tc.expected.alertSeverity) {
    errors.push(`alertSeverity: expected '${tc.expected.alertSeverity}', got '${result.alertSeverity}'`);
  }

  // Check reasonCode
  if (tc.expected.reasonCode && result.reasonCode !== tc.expected.reasonCode) {
    errors.push(`reasonCode: expected '${tc.expected.reasonCode}', got '${result.reasonCode}'`);
  }

  // Check pharmacyLabel
  if (tc.expected.pharmacyLabel && result.pharmacyLabel !== tc.expected.pharmacyLabel) {
    errors.push(`pharmacyLabel: expected '${tc.expected.pharmacyLabel}', got '${result.pharmacyLabel}'`);
  }

  if (errors.length === 0) {
    passed++;
    console.log(`  ✅ ${tc.name}`);
  } else {
    failed++;
    console.log(`  ❌ ${tc.name}`);
    errors.forEach(e => console.log(`     └─ ${e}`));
    console.log(`     └─ Full result:`, JSON.stringify(result, null, 2));
  }
}

console.log(`\n${'═'.repeat(60)}`);
console.log(`  Resultado: ${passed} passed, ${failed} failed (${CASES.length} total)`);
console.log(`${'═'.repeat(60)}`);

if (failed > 0) process.exit(1);
